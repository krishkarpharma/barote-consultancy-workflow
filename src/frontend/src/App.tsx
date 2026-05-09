import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { type ReactNode, Suspense, lazy, useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { PWAInstallBanner } from "./components/PWAInstallBanner";
import { AuthProvider, getActorAsync } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import SetupPage from "./pages/SetupPage";

// Lazy-loaded pages
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ApplicationsPage = lazy(() => import("./pages/ApplicationsListPage"));
const NewApplicationPage = lazy(() => import("./pages/CreateApplicationPage"));
const ApplicationDetailPage = lazy(
  () => import("./pages/ApplicationDetailPage"),
);
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

function getStoredSession() {
  try {
    const raw = localStorage.getItem("barote_session");
    if (!raw) return null;
    const s = JSON.parse(raw) as { token: string; expiresAt: number };
    return Date.now() > s.expiresAt ? null : s;
  } catch {
    return null;
  }
}

// Root route
const rootRoute = createRootRoute();

// Public redirect at /
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: async () => {
    const actor = await getActorAsync();
    const isFirst = await actor.isFirstRun().catch(() => false);
    if (isFirst) throw redirect({ to: "/setup" });
    const session = getStoredSession();
    if (!session) throw redirect({ to: "/login" });
    throw redirect({ to: "/dashboard" });
  },
  component: () => null,
});

// Setup
const setupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/setup",
  component: SetupPage,
});

// Login
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Protected route wrapper — computes urgentCount from dashboard stats
function ProtectedLayout({ children }: { children: ReactNode }) {
  const [urgentCount, setUrgentCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getActorAsync()
      .then((actor) => actor.getDashboardStats())
      .then((stats) => {
        if (!cancelled) {
          setUrgentCount(
            stats.upcomingDeadlines.length + Number(stats.feesPendingCount),
          );
        }
      })
      .catch(() => {
        /* silently ignore */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Layout urgentCount={urgentCount}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        {children}
      </Suspense>
    </Layout>
  );
}

function requireAuth() {
  const session = getStoredSession();
  if (!session) throw redirect({ to: "/login" });
}

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: requireAuth,
  component: () => (
    <ProtectedLayout>
      <DashboardPage />
    </ProtectedLayout>
  ),
});

const applicationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/applications",
  beforeLoad: requireAuth,
  component: () => (
    <ProtectedLayout>
      <ApplicationsPage />
    </ProtectedLayout>
  ),
});

const newApplicationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/applications/new",
  beforeLoad: requireAuth,
  component: () => (
    <ProtectedLayout>
      <NewApplicationPage />
    </ProtectedLayout>
  ),
});

const applicationDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/applications/$id",
  beforeLoad: requireAuth,
  component: () => (
    <ProtectedLayout>
      <ApplicationDetailPage />
    </ProtectedLayout>
  ),
});

const editApplicationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/applications/$id/edit",
  beforeLoad: ({ params }: { params: { id: string } }) => {
    requireAuth();
    throw redirect({ to: "/applications/$id", params: { id: params.id } });
  },
  component: () => null,
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  beforeLoad: requireAuth,
  component: () => (
    <ProtectedLayout>
      <ReportsPage />
    </ProtectedLayout>
  ),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  beforeLoad: requireAuth,
  component: () => (
    <ProtectedLayout>
      <SearchPage />
    </ProtectedLayout>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  beforeLoad: requireAuth,
  component: () => (
    <ProtectedLayout>
      <SettingsPage />
    </ProtectedLayout>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  setupRoute,
  loginRoute,
  dashboardRoute,
  applicationsRoute,
  newApplicationRoute,
  applicationDetailRoute,
  editApplicationRoute,
  reportsRoute,
  searchRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <PWAInstallBanner />
    </AuthProvider>
  );
}
