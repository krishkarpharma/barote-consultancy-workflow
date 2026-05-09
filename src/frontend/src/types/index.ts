// Re-export all backend types for use across the app
export type {
  Application,
  AppSummary,
  ApplicationFilters,
  CreateApplicationInput,
  UpdateApplicationInput,
  UpdateDocumentInput,
  DocumentItem,
  ActivityEntry,
  NoteEntry,
  DashboardStats,
  ServiceTypeCount,
  FeeTemplate,
  FeesReport,
  ReportFilter,
  SearchFilter,
  CompanyInfo,
  SessionData,
  LoginResult,
  UserPublic,
  UserUpdate,
  ServiceCharge,
  PharmacistDetails,
  FdaOfficeDetails,
  Bill,
  BillLineItem,
  ApplicationPharmacist,
  RoomDetail,
  PlanLayoutDetails,
  Receipt,
  Expense,
  FeeItem,
  LedgerEntry,
} from "../backend";

export {
  ApplicationStatus,
  BillStatus,
  ServiceType,
  Role,
  PaymentMode,
} from "../backend";

// Session stored in localStorage
export interface StoredSession {
  token: string;
  userId: string;
  role: string;
  displayName: string;
  username: string;
  expiresAt: number; // ms timestamp
}

export interface AuthState {
  session: StoredSession | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

// ─── Business Type ────────────────────────────────────────────────────────────

export type BusinessType =
  | "Proprietary"
  | "Partnership"
  | "LLP"
  | "Pvt. Ltd."
  | "Ltd."
  | "Trust"
  | "Society"
  | "Other";

export interface PersonEntry {
  id: string;
  name: string;
  address: string;
  mobile: string;
  aadhaarNo: string;
  panNo: string;
  dateOfBirth: string;
  email: string;
  din: string;
}

export interface TrusteeEntry {
  id: string;
  name: string;
  address: string;
  mobile: string;
  aadhaarNo: string;
  panNo: string;
  email: string;
}

export type BusinessTypeData =
  | {
      businessType: "Proprietary";
      proprietorName: string;
      proprietorAddress: string;
      proprietorMobile: string;
      proprietorEmail: string;
      aadhaarNo: string;
      panNo: string;
      dateOfBirth: string;
    }
  | {
      businessType: "Partnership";
      partners: PersonEntry[];
    }
  | {
      businessType: "LLP";
      designatedPartners: PersonEntry[];
    }
  | {
      businessType: "Pvt. Ltd." | "Ltd.";
      cin: string;
      registeredOfficeAddress: string;
      directors: PersonEntry[];
    }
  | {
      businessType: "Trust" | "Society";
      orgName: string;
      registrationNo: string;
      trustees: TrusteeEntry[];
    }
  | {
      businessType: "Other";
      authorizedPersonName: string;
      authorizedPersonAddress: string;
      authorizedPersonMobile: string;
      authorizedPersonAadhaar: string;
      authorizedPersonPan: string;
      otherDescription: string;
    };

// ─── Portal Credentials ───────────────────────────────────────────────────────

export interface PortalCredential {
  id: string;
  portalName: string;
  userId: string;
  password: string;
  directLink: string;
}

// ─── Extended Application type with frontend-only fields ─────────────────────

export interface ApplicationExtended {
  businessTypeData?: BusinessTypeData;
  portalCredentials: PortalCredential[];
}
