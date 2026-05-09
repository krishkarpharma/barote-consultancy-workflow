import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TrusteeEntry {
    id: string;
    name: string;
    email: string;
    aadhaarNo: string;
    address: string;
    panNo: string;
    mobile: string;
}
export interface ActivityEntry {
    id: bigint;
    action: string;
    description: string;
    timestamp: bigint;
}
export interface Application {
    id: bigint;
    alterationOldArea?: number;
    status: ApplicationStatus;
    expectedCompletionDate?: bigint;
    serviceType: ServiceType;
    directLink?: string;
    documents: Array<DocumentItem>;
    fdaAddress: string;
    planLayoutDetails?: PlanLayoutDetails;
    businessTypeData?: BusinessTypeData;
    applicationId: string;
    amountCollected: bigint;
    createdAt: bigint;
    businessName: string;
    businessType: string;
    mobileNumber: string;
    totalFees: bigint;
    selectedFeeTemplates: Array<bigint>;
    oldPharmacistName: string;
    email: string;
    activityLog: Array<ActivityEntry>;
    updatedAt: bigint;
    changePremiseNewAddress?: string;
    firmId: string;
    oldPharmacistResignationDate: string;
    notes: Array<NoteEntry>;
    firmPassword?: string;
    pharmacists: Array<ApplicationPharmacist>;
    oldPharmacistRegNo: string;
    amountPending: bigint;
    portalCredentials: Array<PortalCredential>;
    changePremiseOldAddress?: string;
    applicationDate: bigint;
    resignOldPharmacist: boolean;
    proprietorName: string;
    firmAddress: string;
    renewalDate?: bigint;
    alterationProposedArea?: number;
}
export interface PersonEntry {
    id: string;
    din: string;
    dateOfBirth: string;
    name: string;
    email: string;
    aadhaarNo: string;
    address: string;
    panNo: string;
    mobile: string;
}
export interface UserPublic {
    id: bigint;
    username: string;
    displayName: string;
    role: Role;
    isActive: boolean;
}
export interface UpdateDocumentInput {
    isChecked: boolean;
    applicationId: bigint;
    documentId: bigint;
}
export interface DocumentItem {
    id: bigint;
    isChecked: boolean;
    name: string;
    checkedAt?: bigint;
    category: string;
}
export interface LedgerEntry {
    transactionType: string;
    applicationId: string;
    date: bigint;
    reference: string;
    description: string;
    credit: number;
    debit: number;
}
export interface RenewalReport {
    applications: Array<AppSummary>;
}
export interface Receipt {
    id: string;
    receiptDate: bigint;
    applicationId: string;
    createdAt: bigint;
    referenceNo?: string;
    firmName: string;
    firmId: string;
    paymentMode: PaymentMode;
    amountReceived: number;
    remarks?: string;
    billId: string;
    receiptNumber: string;
}
export interface PharmacistDetails {
    contact: string;
    name: string;
    registrationNumber: string;
    address: string;
    qualification: string;
}
export interface AppSummary {
    id: bigint;
    status: ApplicationStatus;
    expectedCompletionDate?: bigint;
    serviceType: ServiceType;
    applicationId: string;
    businessName: string;
    updatedAt: bigint;
    firmId: string;
    amountPending: bigint;
    proprietorName: string;
    renewalDate?: bigint;
}
export interface CreateApplicationInput {
    status: ApplicationStatus;
    expectedCompletionDate?: bigint;
    serviceType: ServiceType;
    fdaAddress: string;
    businessTypeData?: BusinessTypeData;
    amountCollected: bigint;
    businessName: string;
    businessType: string;
    mobileNumber: string;
    totalFees: bigint;
    selectedFeeTemplates: Array<bigint>;
    email: string;
    firmId: string;
    applicationDate: bigint;
    proprietorName: string;
    firmAddress: string;
    renewalDate?: bigint;
}
export interface RoomDetail {
    whichSide?: string;
    length: number;
    width: number;
    roomName?: string;
    entranceSide?: string;
    entranceType: string;
}
export interface BillLineItem {
    description: string;
    quantity: bigint;
    amount: number;
}
export interface FdaOfficeDetails {
    contact: string;
    officeName: string;
    officerName: string;
    address: string;
}
export interface NoteEntry {
    id: bigint;
    createdAt: bigint;
    text: string;
}
export interface ServiceTypeCount {
    serviceType: ServiceType;
    count: bigint;
}
export interface SearchFilter {
    status?: ApplicationStatus;
    serviceType?: ServiceType;
    dateTo?: bigint;
    searchText: string;
    dateFrom?: bigint;
}
export interface CompanyInfo {
    fdaAddress: string;
    name: string;
    email: string;
    address: string;
    phone: string;
}
export type BusinessTypeData = {
    __kind__: "llp";
    llp: {
        designatedPartners: Array<PersonEntry>;
    };
} | {
    __kind__: "ltd";
    ltd: {
        cin: string;
        directors: Array<PersonEntry>;
        registeredOfficeAddress: string;
    };
} | {
    __kind__: "pvtLtd";
    pvtLtd: {
        cin: string;
        directors: Array<PersonEntry>;
        registeredOfficeAddress: string;
    };
} | {
    __kind__: "trust";
    trust: {
        trustName: string;
        trustees: Array<TrusteeEntry>;
        registrationNo: string;
    };
} | {
    __kind__: "other";
    other: {
        otherDescription: string;
        authorizedPersonName: string;
        authorizedPersonMobile: string;
        authorizedPersonAadhaar: string;
        authorizedPersonAddress: string;
        authorizedPersonPan: string;
    };
} | {
    __kind__: "partnership";
    partnership: {
        partners: Array<PersonEntry>;
    };
} | {
    __kind__: "society";
    society: {
        trustees: Array<TrusteeEntry>;
        registrationNo: string;
        societyName: string;
    };
} | {
    __kind__: "proprietary";
    proprietary: {
        proprietorAddress: string;
        dateOfBirth: string;
        proprietorMobile: string;
        aadhaarNo: string;
        panNo: string;
        proprietorEmail: string;
        proprietorName: string;
    };
};
export interface ApplicationFilters {
    status?: ApplicationStatus;
    serviceType?: ServiceType;
    dateTo?: bigint;
    dateFrom?: bigint;
}
export interface ApplicationPharmacist {
    id: string;
    dateOfLeaving: string;
    fullName: string;
    mobileNumber: string;
    registrationNumber: string;
    dateOfJoining: string;
    address: string;
    resignationDate: string;
    aadhaarNumber: string;
    qualification: string;
}
export interface Expense {
    id: string;
    expenseDate: bigint;
    applicationId: string;
    createdAt: bigint;
    referenceNo?: string;
    description: string;
    notes?: string;
    paymentMode: PaymentMode;
    category: string;
    amount: number;
}
export interface SessionData {
    expiresAt: bigint;
    userId: bigint;
    role: Role;
}
export interface ReportFilter {
    status?: ApplicationStatus;
    serviceType?: ServiceType;
    dateTo?: bigint;
    renewalDaysAhead?: bigint;
    dateFrom?: bigint;
}
export interface DashboardStats {
    feesPendingCount: bigint;
    submitted: bigint;
    pending: bigint;
    upcomingDeadlines: Array<AppSummary>;
    completed: bigint;
    recentActivity: Array<ActivityEntry>;
    serviceTypeStats: Array<ServiceTypeCount>;
    pendingFeesTotal: bigint;
    documentsPendingCount: bigint;
    inProgress: bigint;
    onHold: bigint;
    totalApplications: bigint;
}
export interface PortalCredential {
    id: string;
    portalName: string;
    directLink: string;
    userId: string;
    password: string;
}
export interface UpdateApplicationInput {
    id: bigint;
    alterationOldArea?: number;
    status?: ApplicationStatus;
    expectedCompletionDate?: bigint;
    serviceType?: ServiceType;
    directLink?: string;
    fdaAddress?: string;
    businessTypeData?: BusinessTypeData;
    amountCollected?: bigint;
    businessName?: string;
    businessType?: string;
    mobileNumber?: string;
    totalFees?: bigint;
    selectedFeeTemplates?: Array<bigint>;
    oldPharmacistName?: string;
    email?: string;
    changePremiseNewAddress?: string;
    firmId?: string;
    oldPharmacistResignationDate?: string;
    firmPassword?: string;
    oldPharmacistRegNo?: string;
    changePremiseOldAddress?: string;
    applicationDate?: bigint;
    resignOldPharmacist?: boolean;
    proprietorName?: string;
    firmAddress?: string;
    renewalDate?: bigint;
    alterationProposedArea?: number;
}
export interface Bill {
    id: bigint;
    status: BillStatus;
    lineItems: Array<BillLineItem>;
    applicationId: bigint;
    balancePending: number;
    createdAt: bigint;
    totalAmount: number;
    billNumber: string;
    paymentDate: bigint;
    paymentMode: PaymentMode;
    paymentReceived: number;
    paidAmount: number;
    pendingAmount: number;
}
export interface FeeTemplate {
    id: bigint;
    serviceType?: ServiceType;
    name: string;
    description: string;
    amount: bigint;
}
export interface UserUpdate {
    displayName?: string;
    role?: Role;
    isActive?: boolean;
}
export interface PlanLayoutDetails {
    boundaryEast: string;
    boundaryWest: string;
    frontOfShop: string;
    premisesWidth: number;
    premisesLength: number;
    boundarySouth: string;
    boundaryNorth: string;
    rooms: Array<RoomDetail>;
}
export interface FeesReport {
    totalCollected: bigint;
    totalBilled: bigint;
    applications: Array<AppSummary>;
    totalPending: bigint;
}
export interface LoginResult {
    user: UserPublic;
    sessionToken: string;
}
export interface FeeItem {
    id: string;
    name: string;
    createdAt: bigint;
    description?: string;
    category: string;
    defaultAmount: number;
}
export interface ServiceCharge {
    id: bigint;
    serviceType: ServiceType;
    description: string;
    amount: number;
}
export enum ApplicationStatus {
    New = "New",
    OnHold = "OnHold",
    UnderReview = "UnderReview",
    FeesReceived = "FeesReceived",
    DocumentsCollected = "DocumentsCollected",
    DocumentsPending = "DocumentsPending",
    Approved = "Approved",
    Rejected = "Rejected",
    ApplicationFiled = "ApplicationFiled",
    Completed = "Completed",
    FeesPending = "FeesPending"
}
export enum BillStatus {
    unpaid = "unpaid",
    partiallyPaid = "partiallyPaid",
    fullyPaid = "fullyPaid"
}
export enum PaymentMode {
    UPI = "UPI",
    Card = "Card",
    Cash = "Cash",
    BankTransfer = "BankTransfer",
    Other = "Other",
    Cheque = "Cheque"
}
export enum Role {
    Staff = "Staff",
    Admin = "Admin",
    Manager = "Manager"
}
export enum ServiceType {
    FoodLicenceRenewal = "FoodLicenceRenewal",
    DrugLicenceChangePremise = "DrugLicenceChangePremise",
    MSMEUdyam = "MSMEUdyam",
    DrugLicenceNewFirm = "DrugLicenceNewFirm",
    GSTRegistration = "GSTRegistration",
    DrugLicenceAlterationOfPremise = "DrugLicenceAlterationOfPremise",
    DrugLicenceRemovePharmacist = "DrugLicenceRemovePharmacist",
    DrugLicenceAddPharmacist = "DrugLicenceAddPharmacist",
    FoodLicenceNew = "FoodLicenceNew",
    Other = "Other",
    DrugLicenceChangeConstitution = "DrugLicenceChangeConstitution",
    DrugLicenceRenewal = "DrugLicenceRenewal"
}
export interface backendInterface {
    addApplicationPharmacist(appId: bigint, pharmacist: ApplicationPharmacist): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addCustomDocumentItem(applicationId: bigint, name: string, category: string): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addNote(applicationId: bigint, noteText: string): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addPortalCredential(appId: bigint, credential: PortalCredential): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Change a user's password. Admin can change any; future: self-change support.
     */
    changePassword(token: string, userId: bigint, newPasswordHash: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createApplication(input: CreateApplicationInput): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createBill(token: string, applicationId: bigint, lineItems: Array<BillLineItem>, paymentReceived: number, paymentMode: PaymentMode, paymentDate: bigint): Promise<{
        __kind__: "ok";
        ok: Bill;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createExpense(token: string, applicationId: string, expenseDate: bigint, description: string, category: string, amount: number, paymentMode: PaymentMode, referenceNo: string | null, notes: string | null): Promise<{
        __kind__: "ok";
        ok: Expense;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createFeeItem(token: string, name: string, description: string | null, defaultAmount: number, category: string): Promise<{
        __kind__: "ok";
        ok: FeeItem;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createFeeTemplate(name: string, serviceType: ServiceType | null, amount: bigint, description: string): Promise<FeeTemplate>;
    createReceipt(token: string, billId: string, applicationId: string, firmName: string, firmId: string, receiptDate: bigint, amountReceived: number, paymentMode: PaymentMode, referenceNo: string | null, remarks: string | null): Promise<{
        __kind__: "ok";
        ok: Receipt;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createServiceCharge(token: string, serviceType: ServiceType, description: string, amount: number): Promise<{
        __kind__: "ok";
        ok: ServiceCharge;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Create a new user. Requires Admin session.
     */
    createUser(token: string, username: string, passwordHash: string, role: Role, displayName: string): Promise<{
        __kind__: "ok";
        ok: UserPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteApplication(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteFeeItem(token: string, id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteFeeTemplate(id: bigint): Promise<boolean>;
    deleteServiceCharge(token: string, id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Delete a user. Requires Admin session. Cannot delete yourself.
     */
    deleteUser(token: string, userId: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getApplication(id: bigint): Promise<Application | null>;
    getApplicationLedger(applicationId: string, appIdNat: bigint): Promise<Array<LedgerEntry>>;
    getApplicationPharmacists(appId: bigint): Promise<{
        __kind__: "ok";
        ok: Array<ApplicationPharmacist>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getApplicationPlanLayout(appId: bigint): Promise<{
        __kind__: "ok";
        ok: PlanLayoutDetails | null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getApplicationStatusReport(filter: ReportFilter): Promise<Array<AppSummary>>;
    getApplicationsForReport(filter: ReportFilter): Promise<Array<AppSummary>>;
    getBill(id: bigint): Promise<Bill | null>;
    getBillsByApplication(applicationId: bigint): Promise<Array<Bill>>;
    getCompanyInfo(): Promise<CompanyInfo>;
    getDashboardStats(): Promise<DashboardStats>;
    getExpensesByApplication(applicationId: string): Promise<Array<Expense>>;
    getFdaOfficeDetails(): Promise<FdaOfficeDetails | null>;
    getFeesCollectionReport(filter: ReportFilter): Promise<FeesReport>;
    getFeesReport(filter: ReportFilter): Promise<FeesReport>;
    getMonthlyCollection(year: bigint, month: bigint): Promise<Array<Receipt>>;
    getPharmacistDetails(): Promise<PharmacistDetails | null>;
    getPortalCredentials(appId: bigint): Promise<{
        __kind__: "ok";
        ok: Array<PortalCredential>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getReceiptsByApplication(applicationId: string): Promise<Array<Receipt>>;
    getReceiptsByBill(billId: string): Promise<Array<Receipt>>;
    getRenewalReminders(days: bigint): Promise<Array<AppSummary>>;
    getRenewalRemindersReport(daysAhead: bigint): Promise<RenewalReport>;
    getServiceChargesByServiceType(serviceType: ServiceType): Promise<Array<ServiceCharge>>;
    /**
     * / Returns true when no users have been created yet (first-run setup).
     */
    isFirstRun(): Promise<boolean>;
    listApplications(filters: ApplicationFilters): Promise<Array<AppSummary>>;
    listFeeItems(): Promise<Array<FeeItem>>;
    listFeeTemplates(): Promise<Array<FeeTemplate>>;
    listServiceCharges(): Promise<Array<ServiceCharge>>;
    /**
     * / List all users. Requires Admin session.
     */
    listUsers(token: string): Promise<{
        __kind__: "ok";
        ok: Array<UserPublic>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Authenticate with username + passwordHash. Returns a session token valid for 24h.
     */
    login(username: string, passwordHash: string): Promise<{
        __kind__: "ok";
        ok: LoginResult;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Invalidate a session.
     */
    logout(token: string): Promise<void>;
    removeApplicationPharmacist(appId: bigint, pharmacistId: string): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    removeCustomDocumentItem(applicationId: bigint, documentId: bigint): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    removePortalCredential(appId: bigint, credentialId: string): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Recovery endpoint — resets credentials to username='admin' / password='12345' (SHA-256).
     * / No token required: intended for admins who have lost access.
     * / Also clears all active sessions.
     */
    resetAdminCredentials(): Promise<{
        __kind__: "ok";
        ok: UserPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchApplications(filter: SearchFilter): Promise<Array<AppSummary>>;
    setApplicationPlanLayout(appId: bigint, details: PlanLayoutDetails): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setCompanyInfo(info: CompanyInfo): Promise<void>;
    setFdaOfficeDetails(token: string, details: FdaOfficeDetails): Promise<void>;
    setPharmacistDetails(token: string, details: PharmacistDetails): Promise<void>;
    /**
     * / Create the first Admin account. Fails if any user already exists.
     */
    setupAdmin(username: string, passwordHash: string, displayName: string): Promise<{
        __kind__: "ok";
        ok: UserPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateApplication(input: UpdateApplicationInput): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateApplicationPharmacist(appId: bigint, pharmacistId: string, pharmacist: ApplicationPharmacist): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateBillFromReceipt(token: string, billId: bigint): Promise<{
        __kind__: "ok";
        ok: Bill;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateDocumentItem(input: UpdateDocumentInput): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateFeeItem(token: string, id: string, name: string | null, description: Some<string | null> | None, defaultAmount: number | null, category: string | null): Promise<{
        __kind__: "ok";
        ok: FeeItem;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateFeeTemplate(id: bigint, name: string | null, serviceType: Some<ServiceType | null> | None, amount: bigint | null, description: string | null): Promise<FeeTemplate | null>;
    updatePortalCredential(appId: bigint, credentialId: string, credential: PortalCredential): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updatePortalCredentials(appId: string, credentials: Array<PortalCredential>): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateServiceCharge(token: string, id: bigint, serviceType: ServiceType | null, description: string | null, amount: number | null): Promise<{
        __kind__: "ok";
        ok: ServiceCharge;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Update a user's display name, role, or active status. Requires Admin session.
     */
    updateUser(token: string, userId: bigint, updates: UserUpdate): Promise<{
        __kind__: "ok";
        ok: UserPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Validate an existing session token. Returns null if expired/not found.
     */
    validateSession(token: string): Promise<SessionData | null>;
}
