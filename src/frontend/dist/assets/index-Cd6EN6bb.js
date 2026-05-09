import { S as ServiceType, A as ApplicationStatus } from "./index-BaKwMJOS.js";
function nsToDate(ns) {
  return new Date(Number(ns / 1000000n));
}
function formatDate(ns, fallback = "—") {
  if (ns == null) return fallback;
  return nsToDate(ns).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatDateTime(ns) {
  return nsToDate(ns).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function isDeadlineUrgent(ns) {
  if (ns == null) return false;
  const deadline = nsToDate(ns);
  const now = /* @__PURE__ */ new Date();
  const diff = deadline.getTime() - now.getTime();
  return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1e3;
}
function formatCurrency(amount) {
  const val = typeof amount === "bigint" ? Number(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(val);
}
function getStatusLabel(status) {
  const map = {
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
    [ApplicationStatus.Completed]: "Completed"
  };
  return map[status] ?? status;
}
function getServiceTypeLabel(st) {
  const map = {
    [ServiceType.DrugLicenceNewFirm]: "Drug Licence (New Firm)",
    [ServiceType.DrugLicenceRenewal]: "Drug Licence (Renewal)",
    [ServiceType.DrugLicenceChangePremise]: "Drug Licence (Change Premise)",
    [ServiceType.DrugLicenceAlterationOfPremise]: "Drug Licence (Alteration)",
    [ServiceType.DrugLicenceAddPharmacist]: "Drug Licence - Add Pharmacist",
    [ServiceType.DrugLicenceRemovePharmacist]: "Drug Licence - Remove Pharmacist",
    [ServiceType.DrugLicenceChangeConstitution]: "Drug Licence (Change Constitution)",
    [ServiceType.FoodLicenceNew]: "Food Licence / FSSAI (New)",
    [ServiceType.FoodLicenceRenewal]: "Food Licence / FSSAI (Renewal)",
    [ServiceType.GSTRegistration]: "GST Registration",
    [ServiceType.MSMEUdyam]: "MSME / Udyam",
    [ServiceType.Other]: "Other"
  };
  return map[st] ?? st;
}
function getStatusClass(status) {
  const map = {
    [ApplicationStatus.New]: "status-pending",
    [ApplicationStatus.OnHold]: "status-on-hold",
    [ApplicationStatus.UnderReview]: "status-in-progress",
    [ApplicationStatus.FeesReceived]: "status-in-progress",
    [ApplicationStatus.DocumentsCollected]: "status-in-progress",
    [ApplicationStatus.DocumentsPending]: "status-pending",
    [ApplicationStatus.Approved]: "status-completed",
    [ApplicationStatus.Rejected]: "status-badge bg-destructive/15 text-destructive",
    [ApplicationStatus.ApplicationFiled]: "status-in-progress",
    [ApplicationStatus.FeesPending]: "status-pending",
    [ApplicationStatus.Completed]: "status-badge bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
  };
  return map[status] ?? "status-badge";
}
export {
  formatDate as a,
  formatDateTime as b,
  getStatusLabel as c,
  getStatusClass as d,
  formatCurrency as f,
  getServiceTypeLabel as g,
  isDeadlineUrgent as i,
  nsToDate as n
};
