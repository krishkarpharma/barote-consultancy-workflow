import { useLocation } from "@tanstack/react-router";
import { Bell, Menu } from "lucide-react";

interface Props {
  urgentCount: number;
  onMenuToggle: () => void;
}

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/applications": "Applications",
  "/applications/new": "New Application",
  "/reports": "Reports",
  "/search": "Search",
  "/settings": "Settings",
};

function getTitle(pathname: string): string {
  // Handle dynamic routes like /applications/:id
  if (pathname.match(/^\/applications\/[^/]+\/edit$/))
    return "Edit Application";
  if (pathname.match(/^\/applications\/[^/]+$/)) return "Application Details";
  return routeTitles[pathname] ?? "Barote Consultancy";
}

export function Header({ urgentCount, onMenuToggle }: Props) {
  const { pathname } = useLocation();
  const title = getTitle(pathname);

  return (
    <header
      className="h-14 bg-card border-b border-border flex items-center px-4 gap-3 shrink-0 shadow-xs"
      data-ocid="header"
    >
      {/* Hamburger — mobile only */}
      <button
        type="button"
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Open navigation"
        data-ocid="header.menu_toggle"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page title */}
      <h1 className="flex-1 text-base font-display font-semibold text-foreground truncate">
        {title}
      </h1>

      {/* Notifications bell */}
      <div className="relative">
        <button
          type="button"
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${urgentCount} urgent notifications`}
          data-ocid="header.notifications_button"
        >
          <Bell className="h-5 w-5" />
          {urgentCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 h-4 w-4 min-w-[1rem] rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center"
              aria-hidden="true"
            >
              {urgentCount > 9 ? "9+" : urgentCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
