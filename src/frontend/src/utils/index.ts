import { ApplicationStatus, ServiceType } from "../types";

// ─── Date helpers ─────────────────────────────────────────────────────────────

/** Convert a nanosecond bigint timestamp to a Date */
export function nsToDate(ns: bigint): Date {
  return new Date(Number(ns / 1_000_000n));
}

export function formatDate(
  ns: bigint | undefined | null,
  fallback = "—",
): string {
  if (ns == null) return fallback;
  return nsToDate(ns).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(ns: bigint): string {
  return nsToDate(ns).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Returns true if deadline is within 7 days from now */
export function isDeadlineUrgent(ns: bigint | undefined | null): boolean {
  if (ns == null) return false;
  const deadline = nsToDate(ns);
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
}

/** Returns true if deadline has passed */
export function isOverdue(ns: bigint | undefined | null): boolean {
  if (ns == null) return false;
  return nsToDate(ns).getTime() < Date.now();
}

// ─── Currency helpers ─────────────────────────────────────────────────────────

export function formatCurrency(amount: bigint | number): string {
  const val = typeof amount === "bigint" ? Number(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

// ─── Label helpers ────────────────────────────────────────────────────────────

export function getStatusLabel(status: ApplicationStatus): string {
  const map: Record<ApplicationStatus, string> = {
    [ApplicationStatus.New]: "New",
    [ApplicationStatus.OnHold]: "On Hold",
    [ApplicationStatus.UnderReview]: "Under Review",
    [ApplicationStatus.FeesReceived]: "Fees Received",
    [ApplicationStatus.DocumentsCollected]: "Docs Collected",
    [ApplicationStatus.DocumentsPending]: "Docs Pending",
    [ApplicationStatus.Approved]: "Approved",
    [ApplicationStatus.Rejected]: "Rejected",
    [ApplicationStatus.ApplicationFiled]: "Filed",
    [ApplicationStatus.FeesPending]: "Fees Pending",
    [ApplicationStatus.Completed]: "Completed",
  };
  return map[status] ?? status;
}

export function getServiceTypeLabel(st: ServiceType): string {
  const map: Record<ServiceType, string> = {
    [ServiceType.DrugLicenceNewFirm]: "Drug Licence (New Firm)",
    [ServiceType.DrugLicenceRenewal]: "Drug Licence (Renewal)",
    [ServiceType.DrugLicenceChangePremise]: "Drug Licence (Change Premise)",
    [ServiceType.DrugLicenceAlterationOfPremise]: "Drug Licence (Alteration)",
    [ServiceType.DrugLicenceAddPharmacist]: "Drug Licence - Add Pharmacist",
    [ServiceType.DrugLicenceRemovePharmacist]:
      "Drug Licence - Remove Pharmacist",
    [ServiceType.DrugLicenceChangeConstitution]:
      "Drug Licence (Change Constitution)",
    [ServiceType.FoodLicenceNew]: "Food Licence / FSSAI (New)",
    [ServiceType.FoodLicenceRenewal]: "Food Licence / FSSAI (Renewal)",
    [ServiceType.GSTRegistration]: "GST Registration",
    [ServiceType.MSMEUdyam]: "MSME / Udyam",
    [ServiceType.Other]: "Other",
  };
  return map[st] ?? st;
}

// ─── CSV Export ───────────────────────────────────────────────────────────────

export function exportToCSV(
  filename: string,
  headers: string[],
  rows: (string | number)[][][],
): void {
  const escapeCell = (v: string | number) =>
    `"${String(v).replace(/"/g, '""')}"`;
  const lines = [
    headers.map(escapeCell).join(","),
    ...rows.map((row) => row.map(([v]) => escapeCell(v)).join(",")),
  ];
  const blob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Status CSS class helper ──────────────────────────────────────────────────

export function getStatusClass(status: ApplicationStatus): string {
  const map: Record<ApplicationStatus, string> = {
    [ApplicationStatus.New]: "status-pending",
    [ApplicationStatus.OnHold]: "status-on-hold",
    [ApplicationStatus.UnderReview]: "status-in-progress",
    [ApplicationStatus.FeesReceived]: "status-in-progress",
    [ApplicationStatus.DocumentsCollected]: "status-in-progress",
    [ApplicationStatus.DocumentsPending]: "status-pending",
    [ApplicationStatus.Approved]: "status-completed",
    [ApplicationStatus.Rejected]:
      "status-badge bg-destructive/15 text-destructive",
    [ApplicationStatus.ApplicationFiled]: "status-in-progress",
    [ApplicationStatus.FeesPending]: "status-pending",
    [ApplicationStatus.Completed]:
      "status-badge bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  };
  return map[status] ?? "status-badge";
}
