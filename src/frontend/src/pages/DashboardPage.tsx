import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  FileText,
  IndianRupee,
  Loader2,
  Plus,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { useGetDashboardStats } from "../hooks/useQueries";
import { ServiceType } from "../types";
import {
  formatCurrency,
  getServiceTypeLabel,
  isDeadlineUrgent,
  nsToDate,
} from "../utils";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function daysRemaining(ns: bigint | undefined): number | null {
  if (!ns) return null;
  const diff = nsToDate(ns).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function isDrugLicence(st: ServiceType): boolean {
  return [
    ServiceType.DrugLicenceNewFirm,
    ServiceType.DrugLicenceRenewal,
    ServiceType.DrugLicenceChangePremise,
    ServiceType.DrugLicenceAlterationOfPremise,
    ServiceType.DrugLicenceAddPharmacist,
    ServiceType.DrugLicenceRemovePharmacist,
    ServiceType.DrugLicenceChangeConstitution,
  ].includes(st);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: bigint | number;
  icon: React.ReactNode;
  accent?: "blue" | "amber" | "red" | "green" | "muted";
  subValue?: string;
  "data-ocid"?: string;
}

function MetricCard({
  label,
  value,
  icon,
  accent = "blue",
  subValue,
  "data-ocid": ocid,
}: MetricCardProps) {
  const accentMap: Record<string, string> = {
    blue: "border-primary/40 bg-primary/5",
    amber: "border-accent/40 bg-accent/5",
    red: "border-destructive/40 bg-destructive/5",
    green: "border-chart-4/40 bg-chart-4/5",
    muted: "border-border",
  };
  const iconMap: Record<string, string> = {
    blue: "text-primary bg-primary/10",
    amber: "text-accent bg-accent/10",
    red: "text-destructive bg-destructive/10",
    green: "text-chart-4 bg-chart-4/10",
    muted: "text-muted-foreground bg-muted",
  };

  return (
    <div
      data-ocid={ocid}
      className={`metric-card border-2 ${accentMap[accent]} hover:shadow-md transition-all duration-200`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="metric-label">{label}</p>
          <p className="metric-value">
            {Number(value).toLocaleString("en-IN")}
          </p>
          {subValue && (
            <p className="text-sm font-semibold text-muted-foreground mt-1">
              {subValue}
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg ${iconMap[accent]} shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function MetricCardSkeleton() {
  return (
    <div className="metric-card border border-border">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Skeleton className="h-3 w-24 mb-3" />
          <Skeleton className="h-9 w-16" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: stats,
    isLoading,
    isError,
    isFetching,
  } = useGetDashboardStats();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
  };

  // Group service type stats — Drug Licence umbrella
  const groupedStats = (() => {
    if (!stats) return [];
    const drugTotal = stats.serviceTypeStats
      .filter((s) => isDrugLicence(s.serviceType))
      .reduce((sum, s) => sum + s.count, 0n);
    const nonDrug = stats.serviceTypeStats.filter(
      (s) => !isDrugLicence(s.serviceType),
    );
    const result: { label: string; count: bigint }[] = [];
    if (drugTotal > 0n)
      result.push({ label: "Drug Licence", count: drugTotal });
    for (const s of nonDrug)
      result.push({
        label: getServiceTypeLabel(s.serviceType),
        count: s.count,
      });
    return result
      .filter((r) => r.count > 0n)
      .sort((a, b) => Number(b.count - a.count));
  })();

  return (
    <div className="flex flex-col gap-5" data-ocid="dashboard.page">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Barote Consultancy — Licence Workflow Overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isFetching}
            data-ocid="dashboard.refresh_button"
            aria-label="Refresh dashboard"
            className="min-h-[44px]"
          >
            {isFetching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-1.5 hidden sm:inline">Refresh</span>
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm min-h-[44px]"
            onClick={() => navigate({ to: "/applications/new" })}
            data-ocid="dashboard.new_application_button"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            New Application
          </Button>
        </div>
      </div>

      {/* ── Error State ────────────────────────────────────────────── */}
      {isError && (
        <div
          className="alert-urgent rounded-lg p-4 flex items-center gap-3"
          data-ocid="dashboard.error_state"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
          <p className="text-sm text-foreground font-medium">
            Failed to load dashboard data. Please refresh to try again.
          </p>
        </div>
      )}

      {/* ── Summary Metric Cards ────────────────────────────────────── */}
      <section
        aria-label="Application summary"
        data-ocid="dashboard.summary.section"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {isLoading ? (
            <>
              <MetricCardSkeleton key="sk-total" />
              <MetricCardSkeleton key="sk-pending" />
              <MetricCardSkeleton key="sk-inprogress" />
              <MetricCardSkeleton key="sk-submitted" />
              <MetricCardSkeleton key="sk-completed" />
              <MetricCardSkeleton key="sk-onhold" />
            </>
          ) : stats ? (
            <>
              <MetricCard
                label="Total Applications"
                value={stats.totalApplications}
                icon={<FileText className="h-5 w-5" />}
                accent="blue"
                data-ocid="dashboard.total_applications.card"
              />
              <MetricCard
                label="Pending"
                value={stats.pending}
                icon={<TrendingUp className="h-5 w-5" />}
                accent="amber"
                data-ocid="dashboard.pending.card"
              />
              <MetricCard
                label="In Progress"
                value={stats.inProgress}
                icon={<Loader2 className="h-5 w-5" />}
                accent="blue"
                data-ocid="dashboard.in_progress.card"
              />
              <MetricCard
                label="Submitted"
                value={stats.submitted}
                icon={<ArrowRight className="h-5 w-5" />}
                accent="muted"
                data-ocid="dashboard.submitted.card"
              />
              <MetricCard
                label="Completed"
                value={stats.completed}
                icon={<FileText className="h-5 w-5" />}
                accent="green"
                data-ocid="dashboard.completed.card"
              />
              <MetricCard
                label="On Hold"
                value={stats.onHold}
                icon={<AlertTriangle className="h-5 w-5" />}
                accent="amber"
                data-ocid="dashboard.on_hold.card"
              />
            </>
          ) : null}
        </div>
      </section>

      {/* ── Highlight Cards Row ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Documents Pending */}
        {isLoading ? (
          <div className="metric-card border-2 border-primary/30 bg-primary/5">
            <Skeleton className="h-4 w-28 mb-3" />
            <Skeleton className="h-8 w-12" />
          </div>
        ) : stats ? (
          <div
            className="metric-card border-2 border-primary/40 bg-primary/5 hover:shadow-md transition-all duration-200"
            data-ocid="dashboard.documents_pending.card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="metric-label text-primary">Documents Pending</p>
                <p className="text-3xl font-display font-bold text-primary mt-2">
                  {Number(stats.documentsPendingCount).toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-primary/70 mt-1">
                  applications awaiting documents
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-primary/15 text-primary">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </div>
        ) : null}

        {/* Pending Fee Collections */}
        {isLoading ? (
          <div className="metric-card border-2 border-accent/30 bg-accent/5">
            <Skeleton className="h-4 w-32 mb-3" />
            <Skeleton className="h-8 w-12" />
          </div>
        ) : stats ? (
          <div
            className="metric-card border-2 border-accent/40 bg-accent/5 hover:shadow-md transition-all duration-200"
            data-ocid="dashboard.fees_pending.card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="metric-label text-accent">
                  Pending Fee Collections
                </p>
                <p className="text-3xl font-display font-bold text-accent mt-2">
                  {Number(stats.feesPendingCount).toLocaleString("en-IN")}
                </p>
                <p className="text-sm font-semibold text-accent/80 mt-1 flex items-center gap-1">
                  <IndianRupee className="h-3.5 w-3.5" />
                  {formatCurrency(stats.pendingFeesTotal).replace("₹", "")}{" "}
                  pending
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-accent/15 text-accent">
                <IndianRupee className="h-5 w-5" />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* ── Bottom Two-Column Grid ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Deadlines */}
        <div
          className="card-elevated rounded-xl overflow-hidden"
          data-ocid="dashboard.upcoming_deadlines.section"
        >
          <div className="px-4 py-3 border-b border-border bg-destructive/5 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
            <h2 className="text-sm font-semibold text-foreground">
              Upcoming Deadlines
            </h2>
            {stats && stats.upcomingDeadlines.length > 0 && (
              <span className="ml-auto inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                {stats.upcomingDeadlines.length}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="p-4 flex flex-col gap-3">
              {(["dl-sk-1", "dl-sk-2", "dl-sk-3"] as const).map((k) => (
                <div key={k} className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : !stats || stats.upcomingDeadlines.length === 0 ? (
            <div
              className="p-6 flex flex-col items-center gap-2 text-center"
              data-ocid="dashboard.upcoming_deadlines.empty_state"
            >
              <div className="p-3 rounded-full bg-muted">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">
                No upcoming deadlines
              </p>
              <p className="text-xs text-muted-foreground">
                No applications expiring within 7 days.
              </p>
            </div>
          ) : (
            <ScrollArea className="max-h-72">
              <ul className="divide-y divide-border">
                {stats.upcomingDeadlines.map((app, idx) => {
                  const days = daysRemaining(app.expectedCompletionDate);
                  const urgent = isDeadlineUrgent(app.expectedCompletionDate);
                  return (
                    <li
                      key={app.id.toString()}
                      className={`px-4 py-3 border-l-4 ${urgent ? "border-l-destructive bg-destructive/3" : "border-l-accent bg-accent/3"}`}
                      data-ocid={`dashboard.upcoming_deadlines.item.${idx + 1}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-semibold text-muted-foreground truncate">
                          {app.applicationId}
                        </span>
                        {days !== null && (
                          <span
                            className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${
                              days <= 0
                                ? "bg-destructive text-destructive-foreground"
                                : days <= 3
                                  ? "bg-destructive/20 text-destructive"
                                  : "bg-accent/20 text-accent"
                            }`}
                          >
                            {days <= 0 ? "Overdue" : `${days}d`}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground mt-0.5 truncate">
                        {app.businessName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {app.firmId}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>
          )}
        </div>

        {/* Service Type Stats */}
        <div
          className="card-elevated rounded-xl overflow-hidden"
          data-ocid="dashboard.service_type_stats.section"
        >
          <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary shrink-0" />
            <h2 className="text-sm font-semibold text-foreground">
              By Service Type
            </h2>
          </div>

          {isLoading ? (
            <div className="p-4 flex flex-col gap-3">
              {(["st-sk-1", "st-sk-2", "st-sk-3", "st-sk-4"] as const).map(
                (k) => (
                  <div key={k} className="flex items-center gap-3">
                    <Skeleton className="h-3 flex-1" />
                    <Skeleton className="h-5 w-8" />
                  </div>
                ),
              )}
            </div>
          ) : !stats || groupedStats.length === 0 ? (
            <div
              className="p-6 flex flex-col items-center gap-2 text-center"
              data-ocid="dashboard.service_type_stats.empty_state"
            >
              <div className="p-3 rounded-full bg-muted">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">No data yet</p>
            </div>
          ) : (
            <ScrollArea className="max-h-72">
              <ul className="divide-y divide-border">
                {groupedStats.map((item, idx) => {
                  const total = groupedStats.reduce(
                    (s, r) => s + Number(r.count),
                    0,
                  );
                  const pct =
                    total > 0
                      ? Math.round((Number(item.count) / total) * 100)
                      : 0;
                  return (
                    <li
                      key={item.label}
                      className="px-4 py-2.5"
                      data-ocid={`dashboard.service_type_stats.item.${idx + 1}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground truncate pr-2 max-w-[75%]">
                          {item.label}
                        </span>
                        <span className="text-xs font-bold text-primary shrink-0">
                          {Number(item.count).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary/70 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
