import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ExternalBlob, createActor } from "../backend";
import type { StoredSession } from "../types";

const SESSION_KEY = "barote_session";

// No-op file handlers (this app doesn't use object storage)
const noUpload = async (
  _file: ExternalBlob,
): Promise<Uint8Array<ArrayBufferLike>> => new Uint8Array();
const noDownload = async (
  _data: Uint8Array<ArrayBufferLike>,
): Promise<ExternalBlob> => ExternalBlob.fromURL("");

/**
 * Resolve canister ID at runtime by fetching env.json (primary),
 * then falling back to Vite env vars and window injection.
 * The platform's deployment pipeline writes the real canister ID into env.json.
 */
async function resolveCanisterId(): Promise<string> {
  try {
    const res = await fetch("/env.json");
    if (res.ok) {
      const data = (await res.json()) as Record<string, string>;
      // env.json may use either key name depending on platform version
      const id = data.CANISTER_ID_BACKEND || data.backend_canister_id;
      if (id && id !== "undefined" && id.trim() !== "") {
        return id.trim();
      }
    }
  } catch {
    // Network error — fall through to compile-time fallbacks
  }

  // vite-plugin-environment injects CANISTER_* vars as process.env.CANISTER_ID_BACKEND
  // This is the standard Caffeine platform pattern — check this before VITE_ prefix vars
  const procId =
    typeof process !== "undefined"
      ? (process.env as Record<string, string | undefined>).CANISTER_ID_BACKEND
      : undefined;
  if (procId && procId !== "undefined" && procId.trim() !== "") {
    return procId.trim();
  }

  // Vite build-time injection (VITE_ prefixed)
  const viteId = import.meta.env.VITE_CANISTER_ID_BACKEND as string | undefined;
  if (viteId && viteId !== "undefined" && viteId.trim() !== "") {
    return viteId.trim();
  }

  // Runtime window injection (some platform versions inject directly on window)
  const windowId = (window as unknown as Record<string, string | undefined>)
    .CANISTER_ID_BACKEND;
  if (windowId && windowId !== "undefined" && windowId.trim() !== "") {
    return windowId.trim();
  }

  throw new Error(
    "Canister ID could not be resolved. env.json was not populated at deploy time.",
  );
}

function buildActor(canisterId: string) {
  if (!canisterId || canisterId === "undefined") {
    throw new Error(
      `Canister ID is required, but received "${canisterId}". The env.json file may not have been populated by the deployment pipeline.`,
    );
  }
  return createActor(canisterId, noUpload, noDownload, {
    agentOptions: {
      host: import.meta.env.VITE_IC_HOST || "https://icp-api.io",
    },
  });
}

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(password));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

interface AuthContextValue {
  session: StoredSession | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as StoredSession;
    if (Date.now() > s.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<StoredSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Store resolved canister ID so actor is only created after env.json fetch
  const canisterIdRef = useRef<string | null>(null);

  // Stable actor factory — always reads from the ref, never changes identity
  const getActor = useCallback(() => {
    const id = canisterIdRef.current;
    if (!id) throw new Error("Actor requested before canister ID resolved");
    return buildActor(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      let canisterId: string;
      try {
        canisterId = await resolveCanisterId();
      } catch (err) {
        console.error("[AuthContext]", err);
        if (!cancelled) setIsLoading(false);
        return;
      }

      if (cancelled) return;
      canisterIdRef.current = canisterId;

      const stored = loadSession();
      if (!stored) {
        setIsLoading(false);
        return;
      }

      // Validate stored session against backend
      try {
        const actor = buildActor(canisterId);
        const data = await actor.validateSession(stored.token);
        if (!cancelled) {
          if (data) {
            setSession(stored);
          } else {
            localStorage.removeItem(SESSION_KEY);
          }
        }
      } catch {
        // Network error — trust the stored session optimistically
        if (!cancelled) setSession(stored);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(
    async (username: string, password: string): Promise<string | null> => {
      const actor = getActor();
      const hash = await hashPassword(password);
      const result = await actor.login(username, hash);
      if (result.__kind__ === "err") return result.err;

      const { user, sessionToken } = result.ok;
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
      const stored: StoredSession = {
        token: sessionToken,
        userId: user.id.toString(),
        role: user.role,
        displayName: user.displayName,
        username: user.username,
        expiresAt,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(stored));
      setSession(stored);
      return null;
    },
    [getActor],
  );

  const logout = useCallback(async () => {
    if (session?.token) {
      try {
        const actor = getActor();
        await actor.logout(session.token);
      } catch {
        // ignore
      }
    }
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  }, [session, getActor]);

  return (
    <AuthContext.Provider value={{ session, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { hashPassword };

/**
 * Async actor factory — resolves canister ID from env.json first.
 * Use this in setup/bootstrap code that runs before AuthProvider is mounted.
 */
export async function getActorAsync() {
  const id = await resolveCanisterId();
  return buildActor(id);
}

// Module-level cache populated after first successful resolution
let _resolvedCanisterId: string | null = null;

resolveCanisterId()
  .then((id) => {
    _resolvedCanisterId = id;
  })
  .catch(() => {
    // Will surface a clear error when getActor() is called
  });

/**
 * Synchronous actor factory for use inside async callbacks (e.g. useBackend).
 * Safe to call after the AuthProvider has mounted and env.json has been fetched.
 * Throws a clear error if called before canister ID is available.
 */
export function getActor() {
  const id = _resolvedCanisterId;
  if (!id) {
    throw new Error(
      "getActor() called before canister ID was resolved from env.json. " +
        "Wait for AuthProvider to finish loading (isLoading === false) before calling backend methods.",
    );
  }
  return buildActor(id);
}
