import { useCallback } from "react";
import type { None, PortalCredential, Some } from "../backend";
import { getActor } from "../contexts/AuthContext";
import { useAuth } from "../contexts/AuthContext";
import type {
  ApplicationFilters,
  ApplicationPharmacist,
  BillLineItem,
  CompanyInfo,
  CreateApplicationInput,
  FdaOfficeDetails,
  PharmacistDetails,
  PlanLayoutDetails,
  ReportFilter,
  SearchFilter,
  UpdateApplicationInput,
  UpdateDocumentInput,
} from "../types";
import type { PaymentMode, Role, ServiceType } from "../types";

export function useBackend() {
  const { session } = useAuth();
  const token = session?.token ?? "";

  const actor = useCallback(() => getActor(), []);

  // ─── Auth ───────────────────────────────────────────────────────────────────
  const isFirstRun = useCallback(() => actor().isFirstRun(), [actor]);

  const setupAdmin = useCallback(
    async (username: string, passwordHash: string, displayName: string) =>
      actor().setupAdmin(username, passwordHash, displayName),
    [actor],
  );

  const changePassword = useCallback(
    async (userId: bigint, newPasswordHash: string) =>
      actor().changePassword(token, userId, newPasswordHash),
    [actor, token],
  );

  // ─── Applications ────────────────────────────────────────────────────────────
  const createApplication = useCallback(
    (input: CreateApplicationInput) => actor().createApplication(input),
    [actor],
  );

  const getApplication = useCallback(
    (id: bigint) => actor().getApplication(id),
    [actor],
  );

  const updateApplication = useCallback(
    (input: UpdateApplicationInput) => actor().updateApplication(input),
    [actor],
  );

  const deleteApplication = useCallback(
    (id: bigint) => actor().deleteApplication(id),
    [actor],
  );

  const listApplications = useCallback(
    (filters: ApplicationFilters) => actor().listApplications(filters),
    [actor],
  );

  const searchApplications = useCallback(
    (filter: SearchFilter) => actor().searchApplications(filter),
    [actor],
  );

  // ─── Documents ───────────────────────────────────────────────────────────────
  const updateDocumentItem = useCallback(
    (input: UpdateDocumentInput) => actor().updateDocumentItem(input),
    [actor],
  );

  const addCustomDocumentItem = useCallback(
    (applicationId: bigint, name: string, category: string) =>
      actor().addCustomDocumentItem(applicationId, name, category),
    [actor],
  );

  const removeCustomDocumentItem = useCallback(
    (applicationId: bigint, documentId: bigint) =>
      actor().removeCustomDocumentItem(applicationId, documentId),
    [actor],
  );

  // ─── Notes ───────────────────────────────────────────────────────────────────
  const addNote = useCallback(
    (applicationId: bigint, noteText: string) =>
      actor().addNote(applicationId, noteText),
    [actor],
  );

  // ─── Dashboard & Reports ─────────────────────────────────────────────────────
  const getDashboardStats = useCallback(
    () => actor().getDashboardStats(),
    [actor],
  );

  const getFeesReport = useCallback(
    (filter: ReportFilter) => actor().getFeesReport(filter),
    [actor],
  );

  const getRenewalReminders = useCallback(
    (days: bigint) => actor().getRenewalReminders(days),
    [actor],
  );

  const getApplicationsForReport = useCallback(
    (filter: ReportFilter) => actor().getApplicationsForReport(filter),
    [actor],
  );

  // ─── Fee Templates ────────────────────────────────────────────────────────────
  const listFeeTemplates = useCallback(
    () => actor().listFeeTemplates(),
    [actor],
  );

  const createFeeTemplate = useCallback(
    (
      name: string,
      serviceType: ServiceType | null,
      amount: bigint,
      description: string,
    ) => actor().createFeeTemplate(name, serviceType, amount, description),
    [actor],
  );

  const updateFeeTemplate = useCallback(
    (
      id: bigint,
      name: string | null,
      serviceType: Some<ServiceType | null> | None,
      amount: bigint | null,
      description: string | null,
    ) => actor().updateFeeTemplate(id, name, serviceType, amount, description),
    [actor],
  );

  const deleteFeeTemplate = useCallback(
    (id: bigint) => actor().deleteFeeTemplate(id),
    [actor],
  );

  // ─── Company Info ────────────────────────────────────────────────────────────
  const getCompanyInfo = useCallback(() => actor().getCompanyInfo(), [actor]);

  const setCompanyInfo = useCallback(
    (info: CompanyInfo) => actor().setCompanyInfo(info),
    [actor],
  );

  // ─── Service Charges ─────────────────────────────────────────────────────────
  const listServiceCharges = useCallback(
    () => actor().listServiceCharges(),
    [actor],
  );

  const createServiceCharge = useCallback(
    (serviceType: ServiceType, description: string, amount: number) =>
      actor().createServiceCharge(token, serviceType, description, amount),
    [actor, token],
  );

  const updateServiceCharge = useCallback(
    (
      id: bigint,
      serviceType: ServiceType | null,
      description: string | null,
      amount: number | null,
    ) =>
      actor().updateServiceCharge(token, id, serviceType, description, amount),
    [actor, token],
  );

  const deleteServiceCharge = useCallback(
    (id: bigint) => actor().deleteServiceCharge(token, id),
    [actor, token],
  );

  const getServiceChargesByServiceType = useCallback(
    (serviceType: ServiceType) =>
      actor().getServiceChargesByServiceType(serviceType),
    [actor],
  );

  // ─── Bills ───────────────────────────────────────────────────────────────────
  const createBill = useCallback(
    (
      applicationId: bigint,
      lineItems: BillLineItem[],
      paymentReceived: number,
      paymentMode: PaymentMode,
      paymentDate: bigint,
    ) =>
      actor().createBill(
        token,
        applicationId,
        lineItems,
        paymentReceived,
        paymentMode,
        paymentDate,
      ),
    [actor, token],
  );

  const getBillsByApplication = useCallback(
    (applicationId: bigint) => actor().getBillsByApplication(applicationId),
    [actor],
  );

  const getBill = useCallback((id: bigint) => actor().getBill(id), [actor]);

  // ─── Receipts ─────────────────────────────────────────────────────────────────
  const createReceipt = useCallback(
    (
      billId: string,
      applicationId: string,
      firmName: string,
      firmId: string,
      receiptDate: bigint,
      amountReceived: number,
      paymentMode: PaymentMode,
      referenceNo: string | null,
      remarks: string | null,
    ) =>
      actor().createReceipt(
        token,
        billId,
        applicationId,
        firmName,
        firmId,
        receiptDate,
        amountReceived,
        paymentMode,
        referenceNo,
        remarks,
      ),
    [actor, token],
  );

  const getReceiptsByBill = useCallback(
    (billId: string) => actor().getReceiptsByBill(billId),
    [actor],
  );

  const getReceiptsByApplication = useCallback(
    (applicationId: string) => actor().getReceiptsByApplication(applicationId),
    [actor],
  );

  const updateBillFromReceipt = useCallback(
    (billId: bigint) => actor().updateBillFromReceipt(token, billId),
    [actor, token],
  );

  // ─── Expenses ─────────────────────────────────────────────────────────────────
  const createExpense = useCallback(
    (
      applicationId: string,
      expenseDate: bigint,
      description: string,
      category: string,
      amount: number,
      paymentMode: PaymentMode,
      referenceNo: string | null,
      notes: string | null,
    ) =>
      actor().createExpense(
        token,
        applicationId,
        expenseDate,
        description,
        category,
        amount,
        paymentMode,
        referenceNo,
        notes,
      ),
    [actor, token],
  );

  const getExpensesByApplication = useCallback(
    (applicationId: string) => actor().getExpensesByApplication(applicationId),
    [actor],
  );

  // ─── Fee Items (Fee Master) ────────────────────────────────────────────────────
  const listFeeItems = useCallback(() => actor().listFeeItems(), [actor]);

  const createFeeItem = useCallback(
    (
      name: string,
      description: string | null,
      defaultAmount: number,
      category: string,
    ) =>
      actor().createFeeItem(token, name, description, defaultAmount, category),
    [actor, token],
  );

  const updateFeeItem = useCallback(
    (
      id: string,
      name: string | null,
      description:
        | import("../backend").Some<string | null>
        | import("../backend").None,
      defaultAmount: number | null,
      category: string | null,
    ) =>
      actor().updateFeeItem(
        token,
        id,
        name,
        description,
        defaultAmount,
        category,
      ),
    [actor, token],
  );

  const deleteFeeItem = useCallback(
    (id: string) => actor().deleteFeeItem(token, id),
    [actor, token],
  );

  const getApplicationLedger = useCallback(
    (applicationId: string, appIdNat: bigint) =>
      actor().getApplicationLedger(applicationId, appIdNat),
    [actor],
  );

  const getMonthlyCollection = useCallback(
    (year: bigint, month: bigint) => actor().getMonthlyCollection(year, month),
    [actor],
  );

  // ─── Pharmacist Details ──────────────────────────────────────────────────────
  const getPharmacistDetails = useCallback(
    () => actor().getPharmacistDetails(),
    [actor],
  );

  const setPharmacistDetails = useCallback(
    (details: PharmacistDetails) =>
      actor().setPharmacistDetails(token, details),
    [actor, token],
  );

  // ─── FDA Office Details ──────────────────────────────────────────────────────
  const getFdaOfficeDetails = useCallback(
    () => actor().getFdaOfficeDetails(),
    [actor],
  );

  const setFdaOfficeDetails = useCallback(
    (details: FdaOfficeDetails) => actor().setFdaOfficeDetails(token, details),
    [actor, token],
  );

  // ─── Application Pharmacists ─────────────────────────────────────────────────
  const addApplicationPharmacist = useCallback(
    (appId: bigint, pharmacist: ApplicationPharmacist) =>
      actor().addApplicationPharmacist(appId, pharmacist),
    [actor],
  );

  const updateApplicationPharmacist = useCallback(
    (appId: bigint, pharmacistId: string, pharmacist: ApplicationPharmacist) =>
      actor().updateApplicationPharmacist(appId, pharmacistId, pharmacist),
    [actor],
  );

  const removeApplicationPharmacist = useCallback(
    (appId: bigint, pharmacistId: string) =>
      actor().removeApplicationPharmacist(appId, pharmacistId),
    [actor],
  );

  const getApplicationPharmacists = useCallback(
    (appId: bigint) => actor().getApplicationPharmacists(appId),
    [actor],
  );

  // ─── Portal Credentials ───────────────────────────────────────────────────────
  const addPortalCredential = useCallback(
    (appId: bigint, credential: PortalCredential) =>
      actor().addPortalCredential(appId, credential),
    [actor],
  );

  const updatePortalCredential = useCallback(
    (appId: bigint, credentialId: string, credential: PortalCredential) =>
      actor().updatePortalCredential(appId, credentialId, credential),
    [actor],
  );

  const removePortalCredential = useCallback(
    (appId: bigint, credentialId: string) =>
      actor().removePortalCredential(appId, credentialId),
    [actor],
  );

  const getPortalCredentials = useCallback(
    (appId: bigint) => actor().getPortalCredentials(appId),
    [actor],
  );

  // ─── Application Plan Layout ──────────────────────────────────────────────────
  const setApplicationPlanLayout = useCallback(
    (appId: bigint, details: PlanLayoutDetails) =>
      actor().setApplicationPlanLayout(appId, details),
    [actor],
  );

  const getApplicationPlanLayout = useCallback(
    (appId: bigint) => actor().getApplicationPlanLayout(appId),
    [actor],
  );

  // ─── User Management (Admin) ─────────────────────────────────────────────────
  const listUsers = useCallback(() => actor().listUsers(token), [actor, token]);

  const createUser = useCallback(
    (username: string, passwordHash: string, role: Role, displayName: string) =>
      actor().createUser(token, username, passwordHash, role, displayName),
    [actor, token],
  );

  const updateUser = useCallback(
    (
      userId: bigint,
      updates: { displayName?: string; role?: Role; isActive?: boolean },
    ) => actor().updateUser(token, userId, updates),
    [actor, token],
  );

  const deleteUser = useCallback(
    (userId: bigint) => actor().deleteUser(token, userId),
    [actor, token],
  );

  return {
    token,
    isFirstRun,
    setupAdmin,
    changePassword,
    createApplication,
    getApplication,
    updateApplication,
    deleteApplication,
    listApplications,
    searchApplications,
    updateDocumentItem,
    addCustomDocumentItem,
    removeCustomDocumentItem,
    addNote,
    getDashboardStats,
    getFeesReport,
    getRenewalReminders,
    getApplicationsForReport,
    listFeeTemplates,
    createFeeTemplate,
    updateFeeTemplate,
    deleteFeeTemplate,
    getCompanyInfo,
    setCompanyInfo,
    listServiceCharges,
    createServiceCharge,
    updateServiceCharge,
    deleteServiceCharge,
    getServiceChargesByServiceType,
    createBill,
    getBillsByApplication,
    getBill,
    createReceipt,
    getReceiptsByBill,
    getReceiptsByApplication,
    updateBillFromReceipt,
    createExpense,
    getExpensesByApplication,
    listFeeItems,
    createFeeItem,
    updateFeeItem,
    deleteFeeItem,
    getApplicationLedger,
    getMonthlyCollection,
    getPharmacistDetails,
    setPharmacistDetails,
    getFdaOfficeDetails,
    setFdaOfficeDetails,
    addApplicationPharmacist,
    updateApplicationPharmacist,
    removeApplicationPharmacist,
    getApplicationPharmacists,
    setApplicationPlanLayout,
    getApplicationPlanLayout,
    addPortalCredential,
    updatePortalCredential,
    removePortalCredential,
    getPortalCredentials,
    listUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}
