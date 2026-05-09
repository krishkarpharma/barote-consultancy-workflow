import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Filter, PlusCircle, Search, X } from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "../components/StatusBadge";
import { useBackend } from "../hooks/useBackend";
import type { AppSummary, ApplicationFilters } from "../types";
import { ApplicationStatus, ServiceType } from "../types";
import {
  formatCurrency,
  formatDate,
  getServiceTypeLabel,
  isDeadlineUrgent,
} from "../utils";

const STATUS_OPTIONS = Object.values(ApplicationStatus);
const SERVICE_OPTIONS = Object.values(ServiceType);

export default function ApplicationsListPage() {
  const navigate = useNavigate();
  const { listApplications } = useBackend();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">(
    "all",
  );
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "all">(
    "all",
  );
  const [showFilters, setShowFilters] = useState(false);

  const filters: ApplicationFilters = {
    ...(statusFilter !== "all" && { status: statusFilter }),
    ...(serviceFilter !== "all" && { serviceType: serviceFilter }),
  };

  const { data: apps, isLoading } = useQuery<AppSummary[]>({
    queryKey: ["applications", filters],
    queryFn: () => listApplications(filters),
    refetchInterval: 30_000,
  });

  const filtered = (apps ?? []).filter((a) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      a.applicationId.toLowerCase().includes(q) ||
      a.firmId.toLowerCase().includes(q) ||
      a.businessName.toLowerCase().includes(q) ||
      a.proprietorName.toLowerCase().includes(q)
    );
  });

  const clearFilters = () => {
    setStatusFilter("all");
    setServiceFilter("all");
    setSearch("");
  };

  const hasActiveFilters =
    statusFilter !== "all" || serviceFilter !== "all" || search.trim();

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">
            Applications
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isLoading
              ? "Loading…"
              : `${filtered.length} application${filtered.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Button
          data-ocid="applications.new_application_button"
          onClick={() => navigate({ to: "/applications/new" })}
          className="gap-2 shrink-0 min-h-[44px]"
        >
          <PlusCircle className="w-4 h-4" />
          New Application
        </Button>
      </div>

      {/* Search + filter bar */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="applications.search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by App ID, Firm ID, business name…"
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            data-ocid="applications.filter.toggle"
            onClick={() => setShowFilters((v) => !v)}
            className={showFilters ? "border-primary text-primary" : ""}
          >
            <Filter className="w-4 h-4" />
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              data-ocid="applications.clear_filters"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                Status
              </p>
              <Select
                value={statusFilter}
                onValueChange={(v) =>
                  setStatusFilter(v as ApplicationStatus | "all")
                }
              >
                <SelectTrigger data-ocid="applications.status_filter.select">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.replace(/([A-Z])/g, " $1").trim()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                Service Type
              </p>
              <Select
                value={serviceFilter}
                onValueChange={(v) =>
                  setServiceFilter(v as ServiceType | "all")
                }
              >
                <SelectTrigger data-ocid="applications.service_filter.select">
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {SERVICE_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {getServiceTypeLabel(s)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Table / Card List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no id
              <Skeleton key={i} className="h-12 w-full rounded" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="applications.empty_state"
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground">
              No applications found
            </p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              {hasActiveFilters
                ? "Try adjusting your filters"
                : "Create your first application to get started"}
            </p>
            {!hasActiveFilters && (
              <Button
                data-ocid="applications.empty_new_button"
                onClick={() => navigate({ to: "/applications/new" })}
              >
                <PlusCircle className="w-4 h-4 mr-2" /> New Application
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Mobile card layout — shown on xs/sm only */}
            <div className="sm:hidden divide-y divide-border">
              {filtered.map((app, idx) => {
                const urgent = isDeadlineUrgent(
                  app.expectedCompletionDate ?? null,
                );
                const hasPendingFees = app.amountPending > 0n;
                return (
                  <button
                    type="button"
                    key={app.id.toString()}
                    data-ocid={`applications.item.${idx + 1}`}
                    onClick={() =>
                      navigate({
                        to: "/applications/$id",
                        params: { id: app.id.toString() },
                      })
                    }
                    className={[
                      "w-full text-left",
                      "p-4 cursor-pointer transition-smooth hover:bg-muted/20 active:bg-muted/30",
                      urgent
                        ? "border-l-4 border-l-destructive bg-destructive/5"
                        : "",
                      hasPendingFees && !urgent
                        ? "border-l-4 border-l-accent"
                        : "",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-semibold text-primary">
                        {app.applicationId}
                      </span>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="font-medium text-foreground text-sm truncate">
                      {app.businessName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {app.proprietorName}
                    </p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <span className="text-xs text-muted-foreground">
                        {getServiceTypeLabel(app.serviceType)}
                      </span>
                      {hasPendingFees && (
                        <span className="text-xs font-semibold text-accent shrink-0">
                          {formatCurrency(app.amountPending)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Desktop table — hidden on mobile */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                      App ID
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                      Firm ID
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                      Business Name
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap hidden md:table-cell">
                      Service Type
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                      Status
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground whitespace-nowrap hidden lg:table-cell">
                      Expected Date
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                      Pending Fees
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app, idx) => {
                    const urgent = isDeadlineUrgent(
                      app.expectedCompletionDate ?? null,
                    );
                    const hasPendingFees = app.amountPending > 0n;
                    return (
                      <tr
                        key={app.id.toString()}
                        data-ocid={`applications.item.${idx + 1}`}
                        onClick={() =>
                          navigate({
                            to: "/applications/$id",
                            params: { id: app.id.toString() },
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            navigate({
                              to: "/applications/$id",
                              params: { id: app.id.toString() },
                            });
                        }}
                        tabIndex={0}
                        className={[
                          "border-b border-border cursor-pointer transition-smooth hover:bg-muted/20",
                          urgent ? "bg-destructive/5" : "",
                          hasPendingFees ? "border-r-4 border-r-accent" : "",
                        ].join(" ")}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-primary font-semibold whitespace-nowrap">
                          {app.applicationId}
                        </td>
                        <td className="px-4 py-3 text-foreground whitespace-nowrap">
                          {app.firmId}
                        </td>
                        <td className="px-4 py-3 min-w-0">
                          <p className="font-medium text-foreground truncate max-w-[180px]">
                            {app.businessName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                            {app.proprietorName}
                          </p>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-xs text-muted-foreground">
                            {getServiceTypeLabel(app.serviceType)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatusBadge status={app.status} />
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap hidden lg:table-cell">
                          {app.expectedCompletionDate ? (
                            <span
                              className={
                                urgent
                                  ? "text-destructive font-semibold"
                                  : "text-foreground"
                              }
                            >
                              {formatDate(app.expectedCompletionDate)}
                              {urgent && (
                                <Badge
                                  variant="destructive"
                                  className="ml-2 text-[10px] py-0 px-1.5"
                                >
                                  Urgent
                                </Badge>
                              )}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          {hasPendingFees ? (
                            <span className="font-semibold text-accent">
                              {formatCurrency(app.amountPending)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-xs">
                              —
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
