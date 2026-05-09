import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Search,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ServiceTypeBadge } from "../components/ServiceTypeBadge";
import { StatusBadge } from "../components/StatusBadge";
import { useBackend } from "../hooks/useBackend";
import { ApplicationStatus, ServiceType } from "../types";
import type { AppSummary } from "../types";
import {
  formatCurrency,
  formatDate,
  getServiceTypeLabel,
  getStatusLabel,
  isDeadlineUrgent,
} from "../utils";

// ─── URL helpers ─────────────────────────────────────────────────────────────

function readUrlParams(): Record<string, string> {
  const sp = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const [k, v] of sp.entries()) {
    out[k] = v;
  }
  return out;
}

function writeUrlParams(p: Record<string, string>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(p)) {
    if (v) sp.set(k, v);
  }
  const qs = sp.toString();
  window.history.replaceState(
    null,
    "",
    qs ? `?${qs}` : window.location.pathname,
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

type SortKey =
  | "applicationId"
  | "businessName"
  | "proprietorName"
  | "serviceType"
  | "status"
  | "expectedCompletionDate"
  | "amountPending";
type SortDir = "asc" | "desc";

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_STATUSES = Object.values(ApplicationStatus);
const ALL_SERVICE_TYPES = Object.values(ServiceType);

// ─── Param codec ─────────────────────────────────────────────────────────────

function parseParams(raw: Record<string, string>) {
  return {
    q: raw.q ?? "",
    statuses: raw.statuses
      ? (raw.statuses.split(",").filter(Boolean) as ApplicationStatus[])
      : [],
    serviceTypes: raw.serviceTypes
      ? (raw.serviceTypes.split(",").filter(Boolean) as ServiceType[])
      : [],
    dateFrom: raw.dateFrom ?? "",
    dateTo: raw.dateTo ?? "",
    sortKey: (raw.sortKey ?? "applicationId") as SortKey,
    sortDir: (raw.sortDir ?? "asc") as SortDir,
  };
}

type SearchParams = ReturnType<typeof parseParams>;

function encodeParams(p: SearchParams): Record<string, string> {
  const out: Record<string, string> = {};
  if (p.q) out.q = p.q;
  if (p.statuses.length) out.statuses = p.statuses.join(",");
  if (p.serviceTypes.length) out.serviceTypes = p.serviceTypes.join(",");
  if (p.dateFrom) out.dateFrom = p.dateFrom;
  if (p.dateTo) out.dateTo = p.dateTo;
  if (p.sortKey !== "applicationId") out.sortKey = p.sortKey;
  if (p.sortDir !== "asc") out.sortDir = p.sortDir;
  return out;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hasPendingFees(app: AppSummary): boolean {
  return app.amountPending > 0n;
}

function isUrgentDeadline(app: AppSummary): boolean {
  return (
    isDeadlineUrgent(app.expectedCompletionDate ?? null) ||
    isDeadlineUrgent(app.renewalDate ?? null)
  );
}

// ─── Sortable table header ────────────────────────────────────────────────────

interface SortHeaderProps {
  label: string;
  colKey: SortKey;
  current: SortKey;
  dir: SortDir;
  onSort: (k: SortKey) => void;
}

function SortHeader({ label, colKey, current, dir, onSort }: SortHeaderProps) {
  const active = current === colKey;
  return (
    <th
      scope="col"
      className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:text-foreground transition-colors whitespace-nowrap"
      onClick={() => onSort(colKey)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSort(colKey);
      }}
      aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
      data-ocid={`search.sort.${colKey}`}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {active ? (
          dir === "asc" ? (
            <ChevronUp className="w-3 h-3 text-primary" />
          ) : (
            <ChevronDown className="w-3 h-3 text-primary" />
          )
        ) : (
          <ChevronUp className="w-3 h-3 opacity-25" />
        )}
      </span>
    </th>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SearchPage() {
  const navigate = useNavigate();

  // Initialize from URL on mount
  const [params, setParams] = useState<SearchParams>(() =>
    parseParams(readUrlParams()),
  );
  const [localQ, setLocalQ] = useState(params.q);
  const [filtersOpen, setFiltersOpen] = useState(
    params.statuses.length > 0 ||
      params.serviceTypes.length > 0 ||
      !!params.dateFrom ||
      !!params.dateTo,
  );
  const [results, setResults] = useState<AppSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { searchApplications } = useBackend();
  const searchRef = useRef(searchApplications);
  searchRef.current = searchApplications;

  // Update params and sync to URL
  const updateParams = useCallback((patch: Partial<SearchParams>) => {
    setParams((prev) => {
      const next = { ...prev, ...patch };
      writeUrlParams(encodeParams(next));
      return next;
    });
  }, []);

  // Debounce text input → params
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQ !== params.q) {
        updateParams({ q: localQ });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localQ, params.q, updateParams]);

  // Stable string keys for deps
  const statusesKey = params.statuses.join(",");
  const serviceTypesKey = params.serviceTypes.join(",");

  // Fire search when params change
  useEffect(() => {
    const statuses = statusesKey
      ? (statusesKey.split(",") as ApplicationStatus[])
      : [];
    const serviceTypes = serviceTypesKey
      ? (serviceTypesKey.split(",") as ServiceType[])
      : [];

    const filter = {
      searchText: params.q,
      status: statuses.length === 1 ? statuses[0] : undefined,
      serviceType: serviceTypes.length === 1 ? serviceTypes[0] : undefined,
      dateFrom: params.dateFrom
        ? BigInt(new Date(params.dateFrom).getTime() * 1_000_000)
        : undefined,
      dateTo: params.dateTo
        ? BigInt(new Date(params.dateTo).getTime() * 1_000_000)
        : undefined,
    };

    setIsLoading(true);
    setHasSearched(true);
    searchRef
      .current(filter)
      .then((data) => {
        let filtered = data;
        if (statuses.length > 1) {
          filtered = filtered.filter((a) => statuses.includes(a.status));
        }
        if (serviceTypes.length > 1) {
          filtered = filtered.filter((a) =>
            serviceTypes.includes(a.serviceType),
          );
        }
        setResults(filtered);
      })
      .catch(() => setResults([]))
      .finally(() => setIsLoading(false));
  }, [params.q, statusesKey, serviceTypesKey, params.dateFrom, params.dateTo]);

  // Sort results client-side
  const sortedResults = useMemo(() => {
    const sorted = [...results];
    sorted.sort((a, b) => {
      let cmp = 0;
      switch (params.sortKey) {
        case "applicationId":
          cmp = a.applicationId.localeCompare(b.applicationId);
          break;
        case "businessName":
          cmp = a.businessName.localeCompare(b.businessName);
          break;
        case "proprietorName":
          cmp = a.proprietorName.localeCompare(b.proprietorName);
          break;
        case "serviceType":
          cmp = getServiceTypeLabel(a.serviceType).localeCompare(
            getServiceTypeLabel(b.serviceType),
          );
          break;
        case "status":
          cmp = getStatusLabel(a.status).localeCompare(
            getStatusLabel(b.status),
          );
          break;
        case "expectedCompletionDate":
          cmp = Number(
            (a.expectedCompletionDate ?? 0n) - (b.expectedCompletionDate ?? 0n),
          );
          break;
        case "amountPending":
          cmp = Number(a.amountPending - b.amountPending);
          break;
      }
      return params.sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [results, params.sortKey, params.sortDir]);

  const handleSort = (key: SortKey) => {
    updateParams({
      sortKey: key,
      sortDir:
        params.sortKey === key && params.sortDir === "asc" ? "desc" : "asc",
    });
  };

  const toggleStatus = (s: ApplicationStatus) => {
    const next = params.statuses.includes(s)
      ? params.statuses.filter((x) => x !== s)
      : [...params.statuses, s];
    updateParams({ statuses: next });
  };

  const toggleServiceType = (t: ServiceType) => {
    const next = params.serviceTypes.includes(t)
      ? params.serviceTypes.filter((x) => x !== t)
      : [...params.serviceTypes, t];
    updateParams({ serviceTypes: next });
  };

  const clearAll = () => {
    setLocalQ("");
    updateParams({
      q: "",
      statuses: [],
      serviceTypes: [],
      dateFrom: "",
      dateTo: "",
    });
  };

  const activeFilterCount =
    params.statuses.length +
    params.serviceTypes.length +
    (params.dateFrom ? 1 : 0) +
    (params.dateTo ? 1 : 0);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-5 max-w-full">
      {/* Page header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">
          Search Applications
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Search by Application ID, Firm ID, Business Name, Proprietor, or
          Mobile
        </p>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          id="search-main-input"
          data-ocid="search.search_input"
          className="pl-10 pr-10 h-11 text-base bg-card border-border focus:ring-2 focus:ring-primary"
          placeholder="Search applications…"
          value={localQ}
          onChange={(e) => setLocalQ(e.target.value)}
        />
        {localQ && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setLocalQ("")}
            aria-label="Clear search"
            data-ocid="search.clear_button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter toggle bar */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setFiltersOpen((v) => !v)}
          data-ocid="search.filter.toggle"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
              {activeFilterCount}
            </Badge>
          )}
          {filtersOpen ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </Button>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground gap-1"
            onClick={clearAll}
            data-ocid="search.filter.clear_button"
          >
            <X className="w-3 h-3" />
            Clear all
          </Button>
        )}
      </div>

      {/* Filter panel */}
      {filtersOpen && (
        <div
          className="bg-card border border-border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
          data-ocid="search.filter.panel"
        >
          {/* Status */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Status
            </p>
            <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
              {ALL_STATUSES.map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <Checkbox
                    id={`status-${s}`}
                    data-ocid={`search.filter.status.${s.toLowerCase()}`}
                    checked={params.statuses.includes(s)}
                    onCheckedChange={() => toggleStatus(s)}
                  />
                  <label
                    htmlFor={`status-${s}`}
                    className="text-sm cursor-pointer hover:text-foreground transition-colors"
                  >
                    {getStatusLabel(s)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Service Type */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Service Type
            </p>
            <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
              {ALL_SERVICE_TYPES.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Checkbox
                    id={`service-${t}`}
                    data-ocid={`search.filter.service.${t.toLowerCase()}`}
                    checked={params.serviceTypes.includes(t)}
                    onCheckedChange={() => toggleServiceType(t)}
                  />
                  <label
                    htmlFor={`service-${t}`}
                    className="text-sm cursor-pointer hover:text-foreground transition-colors"
                  >
                    {getServiceTypeLabel(t)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Date Range
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="filter-date-from"
                  className="text-xs text-muted-foreground mb-1 block"
                >
                  From
                </label>
                <Input
                  id="filter-date-from"
                  type="date"
                  data-ocid="search.filter.date_from"
                  className="h-9 text-sm bg-background border-input"
                  value={params.dateFrom}
                  onChange={(e) => updateParams({ dateFrom: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="filter-date-to"
                  className="text-xs text-muted-foreground mb-1 block"
                >
                  To
                </label>
                <Input
                  id="filter-date-to"
                  type="date"
                  data-ocid="search.filter.date_to"
                  className="h-9 text-sm bg-background border-input"
                  value={params.dateTo}
                  onChange={(e) => updateParams({ dateTo: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results area */}
      <div className="flex flex-col gap-3">
        {/* Result count */}
        {hasSearched && !isLoading && (
          <div
            className="flex items-center gap-3 flex-wrap text-sm text-muted-foreground"
            data-ocid="search.result_count"
          >
            <span>
              {sortedResults.length} result
              {sortedResults.length !== 1 ? "s" : ""} found
            </span>
            {sortedResults.some(isUrgentDeadline) && (
              <span className="inline-flex items-center gap-1 text-destructive text-xs font-medium">
                <AlertTriangle className="w-3 h-3" />
                Some deadlines urgent
              </span>
            )}
            {sortedResults.some(hasPendingFees) && (
              <span className="inline-flex items-center gap-1 text-accent text-xs font-medium">
                <Clock className="w-3 h-3" />
                Some fees pending
              </span>
            )}
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div
            className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3"
            data-ocid="search.loading_state"
          >
            {(["r0", "r1", "r2", "r3", "r4"] as const).map((rowId) => (
              <div key={rowId} className="flex gap-3">
                {(["c0", "c1", "c2", "c3", "c4", "c5", "c6"] as const).map(
                  (colId) => (
                    <Skeleton
                      key={`${rowId}-${colId}`}
                      className="h-8 flex-1"
                    />
                  ),
                )}
              </div>
            ))}
          </div>
        )}

        {/* Results table */}
        {!isLoading && hasSearched && sortedResults.length > 0 && (
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-ocid="search.table">
                <thead className="bg-muted/40 border-b border-border">
                  <tr>
                    <SortHeader
                      label="App ID"
                      colKey="applicationId"
                      current={params.sortKey}
                      dir={params.sortDir}
                      onSort={handleSort}
                    />
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                    >
                      Firm ID
                    </th>
                    <SortHeader
                      label="Business Name"
                      colKey="businessName"
                      current={params.sortKey}
                      dir={params.sortDir}
                      onSort={handleSort}
                    />
                    <SortHeader
                      label="Proprietor"
                      colKey="proprietorName"
                      current={params.sortKey}
                      dir={params.sortDir}
                      onSort={handleSort}
                    />
                    <SortHeader
                      label="Service Type"
                      colKey="serviceType"
                      current={params.sortKey}
                      dir={params.sortDir}
                      onSort={handleSort}
                    />
                    <SortHeader
                      label="Status"
                      colKey="status"
                      current={params.sortKey}
                      dir={params.sortDir}
                      onSort={handleSort}
                    />
                    <SortHeader
                      label="Expected Completion"
                      colKey="expectedCompletionDate"
                      current={params.sortKey}
                      dir={params.sortDir}
                      onSort={handleSort}
                    />
                    <SortHeader
                      label="Pending (₹)"
                      colKey="amountPending"
                      current={params.sortKey}
                      dir={params.sortDir}
                      onSort={handleSort}
                    />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sortedResults.map((app, idx) => {
                    const urgent = isUrgentDeadline(app);
                    const pendingFees = hasPendingFees(app);
                    const rowClass = urgent
                      ? "bg-destructive/5 hover:bg-destructive/10 cursor-pointer transition-colors"
                      : pendingFees
                        ? "bg-accent/5 hover:bg-accent/10 cursor-pointer transition-colors"
                        : "hover:bg-muted/30 cursor-pointer transition-colors";

                    return (
                      <tr
                        key={app.applicationId}
                        className={rowClass}
                        onClick={() =>
                          navigate({ to: `/applications/${app.id}` })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            navigate({ to: `/applications/${app.id}` });
                        }}
                        tabIndex={0}
                        data-ocid={`search.table.item.${idx + 1}`}
                      >
                        <td className="px-4 py-3 font-mono text-xs font-medium text-foreground whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5">
                            {urgent && (
                              <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0" />
                            )}
                            {pendingFees && !urgent && (
                              <Clock className="w-3 h-3 text-accent flex-shrink-0" />
                            )}
                            {app.applicationId}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs whitespace-nowrap">
                          {app.firmId}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground max-w-[180px]">
                          <span
                            className="block truncate"
                            title={app.businessName}
                          >
                            {app.businessName}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-foreground max-w-[140px]">
                          <span
                            className="block truncate"
                            title={app.proprietorName}
                          >
                            {app.proprietorName}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <ServiceTypeBadge serviceType={app.serviceType} />
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={app.status} />
                        </td>
                        <td
                          className={`px-4 py-3 whitespace-nowrap text-sm ${urgent ? "text-destructive font-semibold" : "text-foreground"}`}
                        >
                          {app.expectedCompletionDate
                            ? formatDate(app.expectedCompletionDate)
                            : "—"}
                        </td>
                        <td
                          className={`px-4 py-3 text-right tabular-nums whitespace-nowrap font-medium ${pendingFees ? "text-accent" : "text-foreground"}`}
                        >
                          {app.amountPending > 0n
                            ? formatCurrency(app.amountPending)
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && hasSearched && sortedResults.length === 0 && (
          <div
            className="bg-card border border-border rounded-lg flex flex-col items-center justify-center py-16 px-4 text-center"
            data-ocid="search.empty_state"
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              No applications found
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              No applications found matching your search. Try different keywords
              or adjust your filters.
            </p>
            {(params.q || activeFilterCount > 0) && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={clearAll}
                data-ocid="search.empty_state.clear_button"
              >
                Clear search &amp; filters
              </Button>
            )}
          </div>
        )}

        {/* Initial prompt */}
        {!hasSearched && !isLoading && (
          <div
            className="bg-card border border-border rounded-lg flex flex-col items-center justify-center py-16 px-4 text-center"
            data-ocid="search.initial_state"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              Start searching
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Enter a search term above to find applications by name, ID, mobile
              number, or firm details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
