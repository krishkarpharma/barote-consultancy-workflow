import { k as useAuth, r as reactExports, Z as getActor } from "./index-BaKwMJOS.js";
function useBackend() {
  const { session } = useAuth();
  const token = (session == null ? void 0 : session.token) ?? "";
  const actor = reactExports.useCallback(() => getActor(), []);
  const isFirstRun = reactExports.useCallback(() => actor().isFirstRun(), [actor]);
  const setupAdmin = reactExports.useCallback(
    async (username, passwordHash, displayName) => actor().setupAdmin(username, passwordHash, displayName),
    [actor]
  );
  const changePassword = reactExports.useCallback(
    async (userId, newPasswordHash) => actor().changePassword(token, userId, newPasswordHash),
    [actor, token]
  );
  const createApplication = reactExports.useCallback(
    (input) => actor().createApplication(input),
    [actor]
  );
  const getApplication = reactExports.useCallback(
    (id) => actor().getApplication(id),
    [actor]
  );
  const updateApplication = reactExports.useCallback(
    (input) => actor().updateApplication(input),
    [actor]
  );
  const deleteApplication = reactExports.useCallback(
    (id) => actor().deleteApplication(id),
    [actor]
  );
  const listApplications = reactExports.useCallback(
    (filters) => actor().listApplications(filters),
    [actor]
  );
  const searchApplications = reactExports.useCallback(
    (filter) => actor().searchApplications(filter),
    [actor]
  );
  const updateDocumentItem = reactExports.useCallback(
    (input) => actor().updateDocumentItem(input),
    [actor]
  );
  const addCustomDocumentItem = reactExports.useCallback(
    (applicationId, name, category) => actor().addCustomDocumentItem(applicationId, name, category),
    [actor]
  );
  const removeCustomDocumentItem = reactExports.useCallback(
    (applicationId, documentId) => actor().removeCustomDocumentItem(applicationId, documentId),
    [actor]
  );
  const addNote = reactExports.useCallback(
    (applicationId, noteText) => actor().addNote(applicationId, noteText),
    [actor]
  );
  const getDashboardStats = reactExports.useCallback(
    () => actor().getDashboardStats(),
    [actor]
  );
  const getFeesReport = reactExports.useCallback(
    (filter) => actor().getFeesReport(filter),
    [actor]
  );
  const getRenewalReminders = reactExports.useCallback(
    (days) => actor().getRenewalReminders(days),
    [actor]
  );
  const getApplicationsForReport = reactExports.useCallback(
    (filter) => actor().getApplicationsForReport(filter),
    [actor]
  );
  const listFeeTemplates = reactExports.useCallback(
    () => actor().listFeeTemplates(),
    [actor]
  );
  const createFeeTemplate = reactExports.useCallback(
    (name, serviceType, amount, description) => actor().createFeeTemplate(name, serviceType, amount, description),
    [actor]
  );
  const updateFeeTemplate = reactExports.useCallback(
    (id, name, serviceType, amount, description) => actor().updateFeeTemplate(id, name, serviceType, amount, description),
    [actor]
  );
  const deleteFeeTemplate = reactExports.useCallback(
    (id) => actor().deleteFeeTemplate(id),
    [actor]
  );
  const getCompanyInfo = reactExports.useCallback(() => actor().getCompanyInfo(), [actor]);
  const setCompanyInfo = reactExports.useCallback(
    (info) => actor().setCompanyInfo(info),
    [actor]
  );
  const listServiceCharges = reactExports.useCallback(
    () => actor().listServiceCharges(),
    [actor]
  );
  const createServiceCharge = reactExports.useCallback(
    (serviceType, description, amount) => actor().createServiceCharge(token, serviceType, description, amount),
    [actor, token]
  );
  const updateServiceCharge = reactExports.useCallback(
    (id, serviceType, description, amount) => actor().updateServiceCharge(token, id, serviceType, description, amount),
    [actor, token]
  );
  const deleteServiceCharge = reactExports.useCallback(
    (id) => actor().deleteServiceCharge(token, id),
    [actor, token]
  );
  const getServiceChargesByServiceType = reactExports.useCallback(
    (serviceType) => actor().getServiceChargesByServiceType(serviceType),
    [actor]
  );
  const createBill = reactExports.useCallback(
    (applicationId, lineItems, paymentReceived, paymentMode, paymentDate) => actor().createBill(
      token,
      applicationId,
      lineItems,
      paymentReceived,
      paymentMode,
      paymentDate
    ),
    [actor, token]
  );
  const getBillsByApplication = reactExports.useCallback(
    (applicationId) => actor().getBillsByApplication(applicationId),
    [actor]
  );
  const getBill = reactExports.useCallback((id) => actor().getBill(id), [actor]);
  const createReceipt = reactExports.useCallback(
    (billId, applicationId, firmName, firmId, receiptDate, amountReceived, paymentMode, referenceNo, remarks) => actor().createReceipt(
      token,
      billId,
      applicationId,
      firmName,
      firmId,
      receiptDate,
      amountReceived,
      paymentMode,
      referenceNo,
      remarks
    ),
    [actor, token]
  );
  const getReceiptsByBill = reactExports.useCallback(
    (billId) => actor().getReceiptsByBill(billId),
    [actor]
  );
  const getReceiptsByApplication = reactExports.useCallback(
    (applicationId) => actor().getReceiptsByApplication(applicationId),
    [actor]
  );
  const updateBillFromReceipt = reactExports.useCallback(
    (billId) => actor().updateBillFromReceipt(token, billId),
    [actor, token]
  );
  const createExpense = reactExports.useCallback(
    (applicationId, expenseDate, description, category, amount, paymentMode, referenceNo, notes) => actor().createExpense(
      token,
      applicationId,
      expenseDate,
      description,
      category,
      amount,
      paymentMode,
      referenceNo,
      notes
    ),
    [actor, token]
  );
  const getExpensesByApplication = reactExports.useCallback(
    (applicationId) => actor().getExpensesByApplication(applicationId),
    [actor]
  );
  const listFeeItems = reactExports.useCallback(() => actor().listFeeItems(), [actor]);
  const createFeeItem = reactExports.useCallback(
    (name, description, defaultAmount, category) => actor().createFeeItem(token, name, description, defaultAmount, category),
    [actor, token]
  );
  const updateFeeItem = reactExports.useCallback(
    (id, name, description, defaultAmount, category) => actor().updateFeeItem(
      token,
      id,
      name,
      description,
      defaultAmount,
      category
    ),
    [actor, token]
  );
  const deleteFeeItem = reactExports.useCallback(
    (id) => actor().deleteFeeItem(token, id),
    [actor, token]
  );
  const getApplicationLedger = reactExports.useCallback(
    (applicationId, appIdNat) => actor().getApplicationLedger(applicationId, appIdNat),
    [actor]
  );
  const getMonthlyCollection = reactExports.useCallback(
    (year, month) => actor().getMonthlyCollection(year, month),
    [actor]
  );
  const getPharmacistDetails = reactExports.useCallback(
    () => actor().getPharmacistDetails(),
    [actor]
  );
  const setPharmacistDetails = reactExports.useCallback(
    (details) => actor().setPharmacistDetails(token, details),
    [actor, token]
  );
  const getFdaOfficeDetails = reactExports.useCallback(
    () => actor().getFdaOfficeDetails(),
    [actor]
  );
  const setFdaOfficeDetails = reactExports.useCallback(
    (details) => actor().setFdaOfficeDetails(token, details),
    [actor, token]
  );
  const addApplicationPharmacist = reactExports.useCallback(
    (appId, pharmacist) => actor().addApplicationPharmacist(appId, pharmacist),
    [actor]
  );
  const updateApplicationPharmacist = reactExports.useCallback(
    (appId, pharmacistId, pharmacist) => actor().updateApplicationPharmacist(appId, pharmacistId, pharmacist),
    [actor]
  );
  const removeApplicationPharmacist = reactExports.useCallback(
    (appId, pharmacistId) => actor().removeApplicationPharmacist(appId, pharmacistId),
    [actor]
  );
  const getApplicationPharmacists = reactExports.useCallback(
    (appId) => actor().getApplicationPharmacists(appId),
    [actor]
  );
  const addPortalCredential = reactExports.useCallback(
    (appId, credential) => actor().addPortalCredential(appId, credential),
    [actor]
  );
  const updatePortalCredential = reactExports.useCallback(
    (appId, credentialId, credential) => actor().updatePortalCredential(appId, credentialId, credential),
    [actor]
  );
  const removePortalCredential = reactExports.useCallback(
    (appId, credentialId) => actor().removePortalCredential(appId, credentialId),
    [actor]
  );
  const getPortalCredentials = reactExports.useCallback(
    (appId) => actor().getPortalCredentials(appId),
    [actor]
  );
  const setApplicationPlanLayout = reactExports.useCallback(
    (appId, details) => actor().setApplicationPlanLayout(appId, details),
    [actor]
  );
  const getApplicationPlanLayout = reactExports.useCallback(
    (appId) => actor().getApplicationPlanLayout(appId),
    [actor]
  );
  const listUsers = reactExports.useCallback(() => actor().listUsers(token), [actor, token]);
  const createUser = reactExports.useCallback(
    (username, passwordHash, role, displayName) => actor().createUser(token, username, passwordHash, role, displayName),
    [actor, token]
  );
  const updateUser = reactExports.useCallback(
    (userId, updates) => actor().updateUser(token, userId, updates),
    [actor, token]
  );
  const deleteUser = reactExports.useCallback(
    (userId) => actor().deleteUser(token, userId),
    [actor, token]
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
    deleteUser
  };
}
export {
  useBackend as u
};
