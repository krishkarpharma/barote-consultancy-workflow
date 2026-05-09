import { useEffect, useState } from "react";

const DISMISSED_KEY = "pwa-dismissed";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user dismissed recently
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed) {
      const dismissedAt = Number(dismissed);
      if (Date.now() - dismissedAt < DISMISS_DURATION_MS) return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      setDeferredPrompt(null);
      setVisible(false);
    });
  }

  function handleDismiss() {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      data-ocid="pwa_install.banner"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 shadow-lg"
      style={{ background: "#0EA5E9", borderRadius: "12px 12px 0 0" }}
      role="banner"
      aria-label="Install app banner"
    >
      <div className="flex flex-col gap-3 max-w-lg mx-auto">
        <p className="text-white text-sm font-medium leading-snug">
          Install Barote Consultancy App on your phone for quick access
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            data-ocid="pwa_install.install_button"
            onClick={handleInstall}
            className="flex-1 bg-white text-[#0EA5E9] font-semibold text-sm rounded-lg py-2.5 px-4 min-h-[44px] hover:bg-blue-50 transition-colors"
          >
            Install
          </button>
          <button
            type="button"
            data-ocid="pwa_install.dismiss_button"
            onClick={handleDismiss}
            className="flex-1 bg-white/20 text-white font-semibold text-sm rounded-lg py-2.5 px-4 min-h-[44px] hover:bg-white/30 transition-colors border border-white/40"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}
