import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  FileText,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/applications", label: "Applications", icon: FileText },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/search", label: "Search", icon: Search },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ isOpen, onClose }: Props) {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      {/* Branding */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-display font-bold text-sidebar-foreground truncate leading-tight">
              Barote Consultancy
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Licence Services
            </p>
          </div>
        </div>
        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close sidebar"
          data-ocid="sidebar.close_button"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 px-3 py-4 overflow-y-auto"
        aria-label="Main navigation"
      >
        <ul className="space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = pathname === to || pathname.startsWith(`${to}/`);
            return (
              <li key={to}>
                <Link
                  to={to}
                  onClick={onClose}
                  className={[
                    "flex items-center gap-3 min-h-[44px] px-3 rounded-lg text-sm font-medium transition-colors duration-150",
                    isActive ? "sidebar-item-active" : "sidebar-item-inactive",
                  ].join(" ")}
                  data-ocid={`sidebar.${label.toLowerCase()}_link`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        {session && (
          <div className="mb-3 px-3 py-2">
            <p className="text-xs font-medium text-sidebar-foreground truncate">
              {session.displayName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session.username}
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="sidebar-item-inactive flex items-center gap-3 w-full text-left min-h-[44px] px-3 rounded-lg text-sm font-medium transition-colors duration-150"
          data-ocid="sidebar.logout_button"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:shrink-0 h-full">
        {sidebarContent}
      </aside>

      {/* Mobile overlay drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            role="button"
            tabIndex={-1}
            aria-label="Close sidebar overlay"
            aria-hidden="true"
          />
          {/* Drawer panel — slides in from left */}
          <aside className="relative w-64 flex flex-col z-50 shadow-elevated animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
