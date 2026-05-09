import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  BookOpen,
  CalendarClock,
  Download,
  FileBarChart,
  IndianRupee,
} from "lucide-react";
import { useCallback, useState } from "react";
import { getActorAsync, useAuth } from "../contexts/AuthContext";
import {
  type AppSummary,
  ApplicationStatus,
  type CompanyInfo,
  type FeesReport,
  type LedgerEntry,
  type Receipt,
  type ReportFilter,
  ServiceType,
} from "../types";
import {
  exportToCSV,
  printLedgerPDF,
  printMonthlyCollectionPDF,
} from "../utils/billTemplates";

// --- Helpers ---
function nsToMs(ts: bigint): number {
  return Number(ts / 1_000_000n);
}

function fmtDate(ts?: bigint): string {
  if (!ts) return "—";
  return new Date(nsToMs(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function fmtRupee(n: bigint): string {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

function daysRemaining(ts?: bigint): number | null {
  if (!ts) return null;
  const diff = nsToMs(ts) - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function serviceTypeLabel(st: ServiceType): string {
  const map: Record<ServiceType, string> = {
    [ServiceType.DrugLicenceNewFirm]: "Drug Licence – New Firm",
    [ServiceType.DrugLicenceRenewal]: "Drug Licence – Renewal",
    [ServiceType.DrugLicenceChangePremise]: "Drug Licence – Change Premise",
    [ServiceType.DrugLicenceAlterationOfPremise]: "Drug Licence – Alteration",
    [ServiceType.DrugLicenceAddPharmacist]: "Drug Licence – Add Pharmacist",
    [ServiceType.DrugLicenceRemovePharmacist]:
      "Drug Licence – Remove Pharmacist",
    [ServiceType.DrugLicenceChangeConstitution]: "Drug Licence – Constitution",
    [ServiceType.FoodLicenceNew]: "Food Licence – New",
    [ServiceType.FoodLicenceRenewal]: "Food Licence – Renewal",
    [ServiceType.GSTRegistration]: "GST Registration",
    [ServiceType.MSMEUdyam]: "MSME / Udyam",
    [ServiceType.Other]: "Other",
  };
  return map[st] ?? String(st);
}

function statusLabel(s: ApplicationStatus): string {
  const map: Record<ApplicationStatus, string> = {
    [ApplicationStatus.New]: "New",
    [ApplicationStatus.FeesPending]: "Fees Pending",
    [ApplicationStatus.FeesReceived]: "Fees Received",
    [ApplicationStatus.DocumentsPending]: "Docs Pending",
    [ApplicationStatus.DocumentsCollected]: "Docs Collected",
    [ApplicationStatus.ApplicationFiled]: "Filed",
    [ApplicationStatus.UnderReview]: "Under Review",
    [ApplicationStatus.Approved]: "Approved",
    [ApplicationStatus.Rejected]: "Rejected",
    [ApplicationStatus.OnHold]: "On Hold",
    [ApplicationStatus.Completed]: "Completed",
  };
  return map[s] ?? String(s);
}

function statusClass(s: ApplicationStatus): string {
  switch (s) {
    case ApplicationStatus.Approved:
      return "status-completed";
    case ApplicationStatus.Completed:
      return "status-badge bg-emerald-500/15 text-emerald-700 dark:text-emerald-400";
    case ApplicationStatus.Rejected:
      return "status-badge bg-destructive/10 text-destructive";
    case ApplicationStatus.UnderReview:
    case ApplicationStatus.ApplicationFiled:
      return "status-in-progress";
    case ApplicationStatus.FeesPending:
    case ApplicationStatus.DocumentsPending:
      return "status-pending";
    case ApplicationStatus.OnHold:
      return "status-on-hold";
    default:
      return "status-badge bg-muted text-muted-foreground";
  }
}

// CSV builder
function buildCsv(
  companyName: string,
  companyAddress: string,
  headers: string[],
  rows: string[][],
): string {
  const lines: string[] = [
    `"${companyName}"`,
    `"${companyAddress}"`,
    "",
    headers.map((h) => `"${h}"`).join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ];
  return lines.join("\n");
}

function downloadCsv(content: string, filename: string) {
  const blob = new Blob([`\uFEFF${content}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// --- Filter Chips ---
const ALL_STATUSES = Object.values(ApplicationStatus);
const ALL_SERVICE_TYPES = Object.values(ServiceType);

interface MultiSelectProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (vals: string[]) => void;
}

function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  const toggle = (val: string) => {
    if (selected.includes(val)) onChange(selected.filter((s) => s !== val));
    else onChange([...selected, val]);
  };
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(opt.value)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-smooth ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Shared empty / loading ---
function EmptyState({ message }: { message: string }) {
  return (
    <div
      data-ocid="reports.empty_state"
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <FileBarChart className="w-12 h-12 text-muted-foreground/40 mb-3" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}

const SKEL_ROWS = ["r0", "r1", "r2", "r3", "r4"];
const SKEL_COLS_6 = ["c0", "c1", "c2", "c3", "c4", "c5"];
const SKEL_COLS_5 = ["c0", "c1", "c2", "c3", "c4"];
const SKEL_COLS_4 = ["c0", "c1", "c2", "c3"];
const SKEL_COLS_8 = ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7"];

function TableSkeleton({ cols }: { cols: number }) {
  const colKeys =
    cols === 5
      ? SKEL_COLS_5
      : cols === 4
        ? SKEL_COLS_4
        : cols === 8
          ? SKEL_COLS_8
          : SKEL_COLS_6;
  return (
    <div data-ocid="reports.loading_state" className="space-y-2 py-4">
      {SKEL_ROWS.map((row) => (
        <div key={row} className="flex gap-4">
          {colKeys.map((col) => (
            <Skeleton key={`${row}-${col}`} className="h-8 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

// ========================================================
// APPLICATION STATUS TAB
// ========================================================
function AppStatusTab() {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(
    [],
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [results, setResults] = useState<AppSummary[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runReport = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const actor = await getActorAsync();
      const filter: ReportFilter = {};
      if (selectedStatuses.length === 1)
        filter.status = selectedStatuses[0] as ApplicationStatus;
      if (selectedServiceTypes.length === 1)
        filter.serviceType = selectedServiceTypes[0] as ServiceType;
      if (dateFrom)
        filter.dateFrom = BigInt(new Date(dateFrom).getTime()) * 1_000_000n;
      if (dateTo)
        filter.dateTo = BigInt(new Date(dateTo).getTime()) * 1_000_000n;
      const data = await actor.getApplicationsForReport(filter);
      // client-side multi-filter
      let filtered = data;
      if (selectedStatuses.length > 1)
        filtered = filtered.filter((a) =>
          selectedStatuses.includes(a.status as string),
        );
      if (selectedServiceTypes.length > 1)
        filtered = filtered.filter((a) =>
          selectedServiceTypes.includes(a.serviceType as string),
        );
      setResults(filtered);
    } catch (e) {
      setError("Failed to load report. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedStatuses, selectedServiceTypes, dateFrom, dateTo]);

  const exportCsv = () => {
    if (!results) return;
    const headers = [
      "Application ID",
      "Firm ID",
      "Business Name",
      "Service Type",
      "Status",
      "Expected Completion",
    ];
    const rows = results.map((a) => [
      a.applicationId,
      a.firmId,
      a.businessName,
      serviceTypeLabel(a.serviceType),
      statusLabel(a.status),
      fmtDate(a.expectedCompletionDate),
    ]);
    downloadCsv(
      buildCsv(
        "Barote Consultancy",
        "Licence Services Provider, India",
        headers,
        rows,
      ),
      `application-status-report-${new Date().toISOString().slice(0, 10)}.csv`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Filter Panel */}
      <div className="card-elevated rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <MultiSelect
            label="Status"
            options={ALL_STATUSES.map((s) => ({
              value: s,
              label: statusLabel(s),
            }))}
            selected={selectedStatuses}
            onChange={setSelectedStatuses}
          />
          <MultiSelect
            label="Service Type"
            options={ALL_SERVICE_TYPES.map((s) => ({
              value: s,
              label: serviceTypeLabel(s),
            }))}
            selected={selectedServiceTypes}
            onChange={setSelectedServiceTypes}
          />
        </div>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-1">
            <label
              htmlFor="status-date-from"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              From
            </label>
            <input
              id="status-date-from"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="form-input h-9 text-sm"
              data-ocid="reports.status.date_from.input"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="status-date-to"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              To
            </label>
            <input
              id="status-date-to"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="form-input h-9 text-sm"
              data-ocid="reports.status.date_to.input"
            />
          </div>
          <Button
            onClick={runReport}
            disabled={isLoading}
            className="h-9 px-5"
            data-ocid="reports.status.run_button"
          >
            {isLoading ? "Loading…" : "Run Report"}
          </Button>
          {results && results.length > 0 && (
            <Button
              variant="outline"
              onClick={exportCsv}
              className="h-9 gap-2"
              data-ocid="reports.status.export_button"
            >
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          )}
        </div>
      </div>

      {/* Results */}
      {error && (
        <div
          className="flex items-center gap-2 text-destructive text-sm p-4 bg-destructive/5 rounded-lg border border-destructive/20"
          data-ocid="reports.status.error_state"
        >
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}
      {isLoading && <TableSkeleton cols={6} />}
      {!isLoading &&
        results !== null &&
        (results.length === 0 ? (
          <EmptyState message="No applications match the selected filters." />
        ) : (
          <div className="card-elevated rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="font-semibold text-foreground">
                      Application ID
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Firm ID
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Business Name
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Service Type
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Expected Completion
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((app, idx) => (
                    <TableRow
                      key={app.applicationId}
                      data-ocid={`reports.status.item.${idx + 1}`}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <TableCell className="font-mono text-sm font-medium text-primary whitespace-nowrap">
                        {app.applicationId}
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap">
                        {app.firmId}
                      </TableCell>
                      <TableCell className="text-sm font-medium min-w-0 max-w-[200px] truncate">
                        {app.businessName}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {serviceTypeLabel(app.serviceType)}
                      </TableCell>
                      <TableCell>
                        <span className={statusClass(app.status)}>
                          {statusLabel(app.status)}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap">
                        {fmtDate(app.expectedCompletionDate)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      {!isLoading && results === null && (
        <EmptyState message="Select filters and click 'Run Report' to see results." />
      )}
    </div>
  );
}

// ========================================================
// FEES COLLECTION TAB
// ========================================================
function FeesTab() {
  const [selectedServiceType, setSelectedServiceType] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [report, setReport] = useState<FeesReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runReport = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const actor = await getActorAsync();
      const filter: ReportFilter = {};
      if (selectedServiceType !== "all")
        filter.serviceType = selectedServiceType as ServiceType;
      if (dateFrom)
        filter.dateFrom = BigInt(new Date(dateFrom).getTime()) * 1_000_000n;
      if (dateTo)
        filter.dateTo = BigInt(new Date(dateTo).getTime()) * 1_000_000n;
      const data = await actor.getFeesReport(filter);
      setReport(data);
    } catch (e) {
      setError("Failed to load fees report. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedServiceType, dateFrom, dateTo]);

  const exportCsv = () => {
    if (!report) return;
    const headers = [
      "Application ID",
      "Business Name",
      "Service Type",
      "Amount Pending",
    ];
    const rows = report.applications.map((a) => [
      a.applicationId,
      a.businessName,
      serviceTypeLabel(a.serviceType),
      `₹${Number(a.amountPending).toLocaleString("en-IN")}`,
    ]);
    downloadCsv(
      buildCsv(
        "Barote Consultancy",
        "Licence Services Provider, India",
        headers,
        rows,
      ),
      `fees-collection-report-${new Date().toISOString().slice(0, 10)}.csv`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Filter Panel */}
      <div className="card-elevated rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-1">
            <label
              htmlFor="fees-service-type"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Service Type
            </label>
            <Select
              value={selectedServiceType}
              onValueChange={setSelectedServiceType}
            >
              <SelectTrigger
                id="fees-service-type"
                className="h-9 w-56 text-sm"
                data-ocid="reports.fees.service_type.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Service Types</SelectItem>
                {ALL_SERVICE_TYPES.map((st) => (
                  <SelectItem key={st} value={st}>
                    {serviceTypeLabel(st)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="fees-date-from"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              From
            </label>
            <input
              id="fees-date-from"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="form-input h-9 text-sm"
              data-ocid="reports.fees.date_from.input"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="fees-date-to"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              To
            </label>
            <input
              id="fees-date-to"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="form-input h-9 text-sm"
              data-ocid="reports.fees.date_to.input"
            />
          </div>
          <Button
            onClick={runReport}
            disabled={isLoading}
            className="h-9 px-5"
            data-ocid="reports.fees.run_button"
          >
            {isLoading ? "Loading…" : "Run Report"}
          </Button>
          {report && report.applications.length > 0 && (
            <Button
              variant="outline"
              onClick={exportCsv}
              className="h-9 gap-2"
              data-ocid="reports.fees.export_button"
            >
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      {report && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="metric-card flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <IndianRupee className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="metric-label">Total Billed</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">
                {fmtRupee(report.totalBilled)}
              </p>
            </div>
          </div>
          <div className="metric-card flex items-start gap-3">
            <div className="p-2 rounded-lg bg-chart-4/10">
              <IndianRupee className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <p className="metric-label">Total Collected</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">
                {fmtRupee(report.totalCollected)}
              </p>
            </div>
          </div>
          <div className="alert-warning rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent/15">
              <IndianRupee className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="metric-label">Total Pending</p>
              <p className="text-2xl font-display font-bold text-accent mt-1">
                {fmtRupee(report.totalPending)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="flex items-center gap-2 text-destructive text-sm p-4 bg-destructive/5 rounded-lg border border-destructive/20"
          data-ocid="reports.fees.error_state"
        >
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {/* Table */}
      {isLoading && <TableSkeleton cols={6} />}
      {!isLoading &&
        report !== null &&
        (report.applications.length === 0 ? (
          <EmptyState message="No fee records found for the selected filters." />
        ) : (
          <div className="card-elevated rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="font-semibold text-foreground">
                      Application ID
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Business Name
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Service Type
                    </TableHead>
                    <TableHead className="font-semibold text-foreground text-right">
                      Amount Pending
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.applications.map((app, idx) => (
                    <TableRow
                      key={app.applicationId}
                      data-ocid={`reports.fees.item.${idx + 1}`}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <TableCell className="font-mono text-sm font-medium text-primary whitespace-nowrap">
                        {app.applicationId}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {app.businessName}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {serviceTypeLabel(app.serviceType)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            app.amountPending > 0n
                              ? "font-semibold text-accent"
                              : "text-muted-foreground"
                          }
                        >
                          {fmtRupee(app.amountPending)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      {!isLoading && report === null && (
        <EmptyState message="Select filters and click 'Run Report' to see results." />
      )}
    </div>
  );
}

// ========================================================
// RENEWAL REMINDERS TAB
// ========================================================
function RenewalTab() {
  const [daysAhead, setDaysAhead] = useState<30 | 60 | 90>(30);
  const [results, setResults] = useState<AppSummary[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runReport = useCallback(async (days: 30 | 60 | 90) => {
    setIsLoading(true);
    setError(null);
    try {
      const actor = await getActorAsync();
      const data = await actor.getRenewalReminders(BigInt(days));
      const sorted = [...data].sort((a, b) => {
        const da = a.renewalDate
          ? Number(a.renewalDate)
          : Number.POSITIVE_INFINITY;
        const db = b.renewalDate
          ? Number(b.renewalDate)
          : Number.POSITIVE_INFINITY;
        return da - db;
      });
      setResults(sorted);
    } catch (e) {
      setError("Failed to load renewal reminders. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDaysChange = (days: 30 | 60 | 90) => {
    setDaysAhead(days);
    runReport(days);
  };

  const exportCsv = () => {
    if (!results) return;
    const headers = [
      "Application ID",
      "Firm ID",
      "Business Name",
      "Renewal Date",
      "Days Remaining",
    ];
    const rows = results.map((a) => {
      const days = daysRemaining(a.renewalDate);
      return [
        a.applicationId,
        a.firmId,
        a.businessName,
        fmtDate(a.renewalDate),
        days !== null ? String(days) : "—",
      ];
    });
    downloadCsv(
      buildCsv(
        "Barote Consultancy",
        "Licence Services Provider, India",
        headers,
        rows,
      ),
      `renewal-reminders-${daysAhead}days-${new Date().toISOString().slice(0, 10)}.csv`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="card-elevated rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">
          Renewal window
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {([30, 60, 90] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => handleDaysChange(d)}
              data-ocid={`reports.renewal.days_${d}.toggle`}
              className={`px-5 py-2 rounded-lg text-sm font-medium border transition-smooth ${
                daysAhead === d
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              Next {d} days
            </button>
          ))}
          <button
            type="button"
            onClick={() => runReport(daysAhead)}
            disabled={isLoading}
            data-ocid="reports.renewal.run_button"
            className="px-5 py-2 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground border border-border transition-smooth hover:bg-secondary/80 disabled:opacity-50"
          >
            {isLoading ? "Loading…" : "Refresh"}
          </button>
          {results && results.length > 0 && (
            <Button
              variant="outline"
              onClick={exportCsv}
              className="h-9 gap-2"
              data-ocid="reports.renewal.export_button"
            >
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="flex items-center gap-2 text-destructive text-sm p-4 bg-destructive/5 rounded-lg border border-destructive/20"
          data-ocid="reports.renewal.error_state"
        >
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {/* Table */}
      {isLoading && <TableSkeleton cols={5} />}
      {!isLoading &&
        results !== null &&
        (results.length === 0 ? (
          <EmptyState
            message={`No renewals due within the next ${daysAhead} days.`}
          />
        ) : (
          <div className="card-elevated rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="font-semibold text-foreground">
                      Application ID
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Firm ID
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Business Name
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Renewal Date
                    </TableHead>
                    <TableHead className="font-semibold text-foreground text-right">
                      Days Remaining
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((app, idx) => {
                    const days = daysRemaining(app.renewalDate);
                    const urgent = days !== null && days < 30;
                    return (
                      <TableRow
                        key={app.applicationId}
                        data-ocid={`reports.renewal.item.${idx + 1}`}
                        className={`hover:bg-muted/20 transition-colors ${urgent ? "bg-destructive/3" : ""}`}
                      >
                        <TableCell className="font-mono text-sm font-medium text-primary whitespace-nowrap">
                          {app.applicationId}
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          {app.firmId}
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {app.businessName}
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          {fmtDate(app.renewalDate)}
                        </TableCell>
                        <TableCell className="text-right">
                          {days !== null ? (
                            <Badge
                              variant={urgent ? "destructive" : "secondary"}
                              className={
                                urgent
                                  ? "bg-destructive/10 text-destructive border-destructive/20"
                                  : ""
                              }
                            >
                              {days} {days === 1 ? "day" : "days"}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              —
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      {!isLoading && results === null && (
        <EmptyState message="Select a renewal window to see upcoming renewals." />
      )}
    </div>
  );
}

// ========================================================
// MONTHLY COLLECTION TAB
// ========================================================
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function MonthlyCollectionTab() {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1); // 1-12
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [receipts, setReceipts] = useState<Receipt[] | null>(null);
  const [modeFilter, setModeFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const yearOptions = Array.from(
    { length: 5 },
    (_, i) => now.getFullYear() - i,
  );

  const load = useCallback(async (year: number, month: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const actor = await getActorAsync();
      const data = await actor.getMonthlyCollection(
        BigInt(year),
        BigInt(month),
      );
      setReceipts(data);
    } catch (e) {
      setError("Failed to load monthly collection. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoad = () => load(selectedYear, selectedMonth);

  const monthYearLabel = `${MONTHS[selectedMonth - 1]} ${selectedYear}`;

  const filteredReceipts = receipts
    ? modeFilter === "all"
      ? receipts
      : receipts.filter((r) => r.paymentMode === modeFilter)
    : [];

  const totalCollection = filteredReceipts.reduce(
    (s, r) => s + r.amountReceived,
    0,
  );

  const byMode: Record<string, number> = {};
  if (receipts) {
    for (const r of receipts) {
      byMode[r.paymentMode] = (byMode[r.paymentMode] ?? 0) + r.amountReceived;
    }
  }

  const handleExportPDF = async () => {
    if (!receipts) return;
    const actor = await getActorAsync();
    const companyInfo = await actor.getCompanyInfo();
    printMonthlyCollectionPDF(filteredReceipts, monthYearLabel, companyInfo);
  };

  const handleExportCSV = () => {
    if (!filteredReceipts.length) return;
    exportToCSV(
      [
        "Receipt No.",
        "Date",
        "Firm Name",
        "Firm ID",
        "Amount Received (₹)",
        "Payment Mode",
        "Reference No.",
        "Remarks",
      ],
      filteredReceipts.map((r) => [
        r.receiptNumber,
        new Date(Number(r.receiptDate) / 1_000_000).toLocaleDateString("en-IN"),
        r.firmName,
        r.firmId,
        r.amountReceived,
        r.paymentMode,
        r.referenceNo ?? "",
        r.remarks ?? "",
      ]),
      `monthly-collection-${monthYearLabel.replace(" ", "-")}.csv`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="card-elevated rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Select Period</h3>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="space-y-1">
            <label
              htmlFor="reports-month-select"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Month
            </label>
            <Select
              value={String(selectedMonth)}
              onValueChange={(v) => setSelectedMonth(Number(v))}
            >
              <SelectTrigger
                id="reports-month-select"
                className="h-9 w-40 text-sm"
                data-ocid="reports.monthly.month.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((m, i) => (
                  <SelectItem key={m} value={String(i + 1)}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="reports-year-select"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Year
            </label>
            <Select
              value={String(selectedYear)}
              onValueChange={(v) => setSelectedYear(Number(v))}
            >
              <SelectTrigger
                id="reports-year-select"
                className="h-9 w-28 text-sm"
                data-ocid="reports.monthly.year.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleLoad}
            disabled={isLoading}
            className="h-9 px-5"
            data-ocid="reports.monthly.load_button"
          >
            {isLoading ? "Loading…" : "Load"}
          </Button>
        </div>

        {/* Payment mode filter chips */}
        {receipts && receipts.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Filter by Payment Mode
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["all", ...Object.keys(byMode)].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setModeFilter(mode)}
                  data-ocid={`reports.monthly.mode_filter.${mode}`}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-smooth ${
                    modeFilter === mode
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {mode === "all" ? "All" : mode}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          className="flex items-center gap-2 text-destructive text-sm p-4 bg-destructive/5 rounded-lg border border-destructive/20"
          data-ocid="reports.monthly.error_state"
        >
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {/* Summary + Export */}
      {receipts && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="metric-card flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <IndianRupee className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="metric-label">Total Collection</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">
                ₹
                {totalCollection.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          <div className="metric-card flex items-start gap-3">
            <div className="p-2 rounded-lg bg-chart-4/10">
              <FileBarChart className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <p className="metric-label">Receipts</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">
                {filteredReceipts.length}
              </p>
            </div>
          </div>
          <div className="card-elevated rounded-xl p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              By Payment Mode
            </p>
            <div className="space-y-1">
              {Object.entries(byMode).map(([mode, amt]) => (
                <div key={mode} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{mode}</span>
                  <span className="font-medium">
                    ₹{amt.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
              {Object.keys(byMode).length === 0 && (
                <p className="text-sm text-muted-foreground">—</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {isLoading && <TableSkeleton cols={8} />}
      {!isLoading &&
        receipts !== null &&
        (filteredReceipts.length === 0 ? (
          <EmptyState message="No receipts found for the selected period." />
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 justify-end">
              <Button
                variant="outline"
                onClick={handleExportPDF}
                className="h-9 gap-2"
                data-ocid="reports.monthly.export_pdf_button"
              >
                <Download className="w-4 h-4" /> Export PDF
              </Button>
              <Button
                variant="outline"
                onClick={handleExportCSV}
                className="h-9 gap-2"
                data-ocid="reports.monthly.export_csv_button"
              >
                <Download className="w-4 h-4" /> Export CSV
              </Button>
            </div>
            <div className="card-elevated rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead className="font-semibold text-foreground">
                        #
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Receipt No.
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Date
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Firm Name
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Firm ID
                      </TableHead>
                      <TableHead className="font-semibold text-foreground text-right">
                        Amount (₹)
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Payment Mode
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Reference
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReceipts.map((r, idx) => (
                      <TableRow
                        key={r.id}
                        data-ocid={`reports.monthly.item.${idx + 1}`}
                        className="hover:bg-muted/20 transition-colors"
                      >
                        <TableCell className="text-sm text-muted-foreground">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-mono text-sm font-medium text-primary whitespace-nowrap">
                          {r.receiptNumber}
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          {new Date(
                            Number(r.receiptDate) / 1_000_000,
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="text-sm font-medium min-w-0 max-w-[180px] truncate">
                          {r.firmName}
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          {r.firmId}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-sm">
                          ₹
                          {r.amountReceived.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {r.paymentMode}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {r.referenceNo ?? "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        ))}
      {!isLoading && receipts === null && (
        <EmptyState message="Select a month and year, then click Load to view collection data." />
      )}
    </div>
  );
}

// ========================================================
// LEDGER TAB
// ========================================================
function LedgerTab() {
  const [applicationId, setApplicationId] = useState("");
  const [appIdNat, setAppIdNat] = useState("");
  const [entries, setEntries] = useState<LedgerEntry[] | null>(null);
  const [appInfo, setAppInfo] = useState<{
    applicationId: string;
    businessName: string;
    firmId: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!applicationId.trim() || !appIdNat.trim()) {
      setError("Please enter both Application ID and numeric ID.");
      return;
    }
    const nat = BigInt(appIdNat.trim());
    setIsLoading(true);
    setError(null);
    try {
      const actor = await getActorAsync();
      const data = await actor.getApplicationLedger(applicationId.trim(), nat);
      // Also fetch app info for PDF
      const appData = await actor.getApplication(nat);
      setEntries(data);
      setAppInfo({
        applicationId: applicationId.trim(),
        businessName: appData?.businessName ?? applicationId.trim(),
        firmId: appData?.firmId ?? "",
      });
    } catch (e) {
      setError("Failed to load ledger. Check Application ID and try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Compute running balance
  const sorted = entries
    ? [...entries].sort((a, b) => Number(a.date) - Number(b.date))
    : [];
  let runningBalance = 0;
  const rowsWithBalance: Array<LedgerEntry & { balance: number }> = sorted.map(
    (entry) => {
      runningBalance += entry.credit - entry.debit;
      return { ...entry, balance: runningBalance };
    },
  );

  const totalDebits = sorted.reduce((s, e) => s + e.debit, 0);
  const totalCredits = sorted.reduce((s, e) => s + e.credit, 0);
  const netBalance = totalCredits - totalDebits;

  const handleExportPDF = async () => {
    if (!entries || !appInfo) return;
    const actor = await getActorAsync();
    const companyInfo: CompanyInfo = await actor.getCompanyInfo();
    printLedgerPDF(entries, appInfo, companyInfo);
  };

  const handleExportCSV = () => {
    if (!rowsWithBalance.length) return;
    exportToCSV(
      [
        "Date",
        "Transaction Type",
        "Description",
        "Debit (₹)",
        "Credit (₹)",
        "Balance (₹)",
        "Reference",
      ],
      rowsWithBalance.map((e) => [
        new Date(Number(e.date) / 1_000_000).toLocaleDateString("en-IN"),
        e.transactionType,
        e.description,
        e.debit,
        e.credit,
        e.balance,
        e.reference ?? "",
      ]),
      `ledger-${appInfo?.applicationId ?? "app"}-${new Date().toISOString().slice(0, 10)}.csv`,
    );
  };

  return (
    <div className="space-y-6">
      <div className="card-elevated rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">
          Search Application Ledger
        </h3>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="space-y-1">
            <label
              htmlFor="ledger-app-id"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Application ID (Text)
            </label>
            <input
              id="ledger-app-id"
              type="text"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              placeholder="e.g. APP-001"
              className="form-input h-9 text-sm w-48"
              data-ocid="reports.ledger.app_id.input"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="ledger-app-nat"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Application Numeric ID
            </label>
            <input
              id="ledger-app-nat"
              type="number"
              value={appIdNat}
              onChange={(e) => setAppIdNat(e.target.value)}
              placeholder="e.g. 1"
              className="form-input h-9 text-sm w-32"
              data-ocid="reports.ledger.app_nat.input"
            />
          </div>
          <Button
            onClick={load}
            disabled={isLoading}
            className="h-9 px-5"
            data-ocid="reports.ledger.load_button"
          >
            {isLoading ? "Loading…" : "Load Ledger"}
          </Button>
        </div>
      </div>

      {error && (
        <div
          className="flex items-center gap-2 text-destructive text-sm p-4 bg-destructive/5 rounded-lg border border-destructive/20"
          data-ocid="reports.ledger.error_state"
        >
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {entries && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="metric-card flex items-start gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <IndianRupee className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="metric-label">Total Debits</p>
              <p className="text-2xl font-display font-bold text-destructive mt-1">
                ₹
                {totalDebits.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          <div className="metric-card flex items-start gap-3">
            <div className="p-2 rounded-lg bg-chart-4/10">
              <IndianRupee className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <p className="metric-label">Total Credits</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">
                ₹
                {totalCredits.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          <div
            className={`metric-card flex items-start gap-3 ${netBalance < 0 ? "border-destructive/30" : "border-chart-4/30"}`}
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <IndianRupee className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="metric-label">Net Balance</p>
              <p
                className={`text-2xl font-display font-bold mt-1 ${netBalance < 0 ? "text-destructive" : "text-chart-4"}`}
              >
                ₹
                {netBalance.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      )}

      {isLoading && <TableSkeleton cols={6} />}
      {!isLoading &&
        entries !== null &&
        (rowsWithBalance.length === 0 ? (
          <EmptyState message="No ledger entries found for this application." />
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 justify-end">
              <Button
                variant="outline"
                onClick={handleExportPDF}
                className="h-9 gap-2"
                data-ocid="reports.ledger.export_pdf_button"
              >
                <Download className="w-4 h-4" /> Export PDF
              </Button>
              <Button
                variant="outline"
                onClick={handleExportCSV}
                className="h-9 gap-2"
                data-ocid="reports.ledger.export_csv_button"
              >
                <Download className="w-4 h-4" /> Export CSV
              </Button>
            </div>
            <div className="card-elevated rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead className="font-semibold text-foreground">
                        #
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Date
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Type
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Description
                      </TableHead>
                      <TableHead className="font-semibold text-foreground text-right">
                        Debit (₹)
                      </TableHead>
                      <TableHead className="font-semibold text-foreground text-right">
                        Credit (₹)
                      </TableHead>
                      <TableHead className="font-semibold text-foreground text-right">
                        Balance (₹)
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Reference
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rowsWithBalance.map((entry, idx) => (
                      <TableRow
                        key={`${String(entry.date)}-${idx}`}
                        data-ocid={`reports.ledger.item.${idx + 1}`}
                        className="hover:bg-muted/20 transition-colors"
                      >
                        <TableCell className="text-sm text-muted-foreground">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          {new Date(
                            Number(entry.date) / 1_000_000,
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {entry.transactionType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm min-w-0 max-w-[220px] truncate">
                          {entry.description}
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          {entry.debit > 0 ? (
                            <span className="text-destructive font-medium">
                              ₹
                              {entry.debit.toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          {entry.credit > 0 ? (
                            <span className="text-chart-4 font-medium">
                              ₹
                              {entry.credit.toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell
                          className={`text-right text-sm font-semibold ${entry.balance < 0 ? "text-destructive" : "text-foreground"}`}
                        >
                          ₹
                          {entry.balance.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {entry.reference ?? "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        ))}
      {!isLoading && entries === null && (
        <EmptyState message="Enter an Application ID and load to view the ledger." />
      )}
    </div>
  );
}

// ========================================================
// MAIN PAGE
// ========================================================
export default function ReportsPage() {
  const { session } = useAuth();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Please log in to view reports.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="reports.page">
      {/* Page Header */}
      <div className="flex items-center gap-3 border-b border-border pb-5">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <CalendarClock className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">
            Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Generate and export reports for Barote Consultancy
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="status" className="space-y-6">
        <div className="overflow-x-auto -mx-1 px-1">
          <TabsList className="bg-muted/40 border border-border p-1 h-auto rounded-xl gap-1 w-max min-w-full sm:w-auto">
            <TabsTrigger
              value="status"
              className="rounded-lg px-3 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm whitespace-nowrap"
              data-ocid="reports.status.tab"
            >
              App Status
            </TabsTrigger>
            <TabsTrigger
              value="fees"
              className="rounded-lg px-3 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm whitespace-nowrap"
              data-ocid="reports.fees.tab"
            >
              Fees Collection
            </TabsTrigger>
            <TabsTrigger
              value="renewal"
              className="rounded-lg px-3 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm whitespace-nowrap"
              data-ocid="reports.renewal.tab"
            >
              Renewals
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="rounded-lg px-3 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm whitespace-nowrap"
              data-ocid="reports.monthly.tab"
            >
              Monthly Collection
            </TabsTrigger>
            <TabsTrigger
              value="ledger"
              className="rounded-lg px-3 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm whitespace-nowrap"
              data-ocid="reports.ledger.tab"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 inline" />
              Ledger
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="status" className="mt-0">
          <AppStatusTab />
        </TabsContent>
        <TabsContent value="fees" className="mt-0">
          <FeesTab />
        </TabsContent>
        <TabsContent value="renewal" className="mt-0">
          <RenewalTab />
        </TabsContent>
        <TabsContent value="monthly" className="mt-0">
          <MonthlyCollectionTab />
        </TabsContent>
        <TabsContent value="ledger" className="mt-0">
          <LedgerTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
