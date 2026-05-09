module {

  // -----------------------------------------------------------------------
  // Enumerations
  // -----------------------------------------------------------------------

  public type ServiceType = {
    #DrugLicenceNewFirm;
    #DrugLicenceRenewal;
    #DrugLicenceChangePremise;
    #DrugLicenceAlterationOfPremise;
    #DrugLicenceChangeConstitution;
    #DrugLicenceAddPharmacist;
    #DrugLicenceRemovePharmacist;
    #FoodLicenceNew;
    #FoodLicenceRenewal;
    #GSTRegistration;
    #MSMEUdyam;
    #Other;
  };

  public type ApplicationStatus = {
    #New;
    #FeesReceived;
    #FeesPending;
    #DocumentsPending;
    #DocumentsCollected;
    #ApplicationFiled;
    #UnderReview;
    #Approved;
    #Rejected;
    #OnHold;
    #Completed;
  };

  // -----------------------------------------------------------------------
  // Business Type enum
  // -----------------------------------------------------------------------

  public type BusinessType = {
    #proprietary;
    #partnership;
    #llp;
    #pvtLtd;
    #ltd;
    #trust;
    #society;
    #other;
  };

  // -----------------------------------------------------------------------
  // Person / entity sub-record types (reused across business type sections)
  // -----------------------------------------------------------------------

  /// Generic person entry used for partners, designated partners, directors, etc.
  public type PersonEntry = {
    id          : Text;
    name        : Text;
    address     : Text;
    mobile      : Text;
    aadhaarNo   : Text;
    panNo       : Text;
    dateOfBirth : Text;
    email       : Text;
    din         : Text;   // Director Identification Number (empty when not applicable)
  };

  /// Trustee / office bearer entry (Trust and Society variants)
  public type TrusteeEntry = {
    id        : Text;
    name      : Text;
    address   : Text;
    mobile    : Text;
    aadhaarNo : Text;
    panNo     : Text;
    email     : Text;
  };

  // -----------------------------------------------------------------------
  // Business Type Data — conditional section per business type
  // -----------------------------------------------------------------------

  public type BusinessTypeData = {
    /// Proprietary firm
    #proprietary : {
      proprietorName    : Text;
      proprietorAddress : Text;
      proprietorMobile  : Text;
      proprietorEmail   : Text;
      aadhaarNo         : Text;
      panNo             : Text;
      dateOfBirth       : Text;
    };
    /// Partnership firm — multiple partners
    #partnership : {
      partners : [PersonEntry];
    };
    /// Limited Liability Partnership — multiple designated partners
    #llp : {
      designatedPartners : [PersonEntry];
    };
    /// Private Limited Company
    #pvtLtd : {
      cin                    : Text;
      registeredOfficeAddress : Text;
      directors              : [PersonEntry];
    };
    /// Public Limited Company
    #ltd : {
      cin                    : Text;
      registeredOfficeAddress : Text;
      directors              : [PersonEntry];
    };
    /// Trust
    #trust : {
      trustName      : Text;
      registrationNo : Text;
      trustees       : [TrusteeEntry];
    };
    /// Society
    #society : {
      societyName    : Text;
      registrationNo : Text;
      trustees       : [TrusteeEntry];
    };
    /// Other — generic authorized person
    #other : {
      authorizedPersonName    : Text;
      authorizedPersonAddress : Text;
      authorizedPersonMobile  : Text;
      authorizedPersonAadhaar : Text;
      authorizedPersonPan     : Text;
      otherDescription        : Text;
    };
  };

  // -----------------------------------------------------------------------
  // Portal credentials (multiple per application)
  // -----------------------------------------------------------------------

  public type PortalCredential = {
    id         : Text;
    portalName : Text;   // "FDA" | "FSSAI" | "GST" | "Udyam" | custom
    userId     : Text;
    password   : Text;
    directLink : Text;
  };

  // -----------------------------------------------------------------------
  // Sub-record types
  // -----------------------------------------------------------------------

  public type DocumentItem = {
    id        : Nat;
    name      : Text;
    category  : Text;
    isChecked : Bool;
    checkedAt : ?Int;
  };

  public type NoteEntry = {
    id        : Nat;
    text      : Text;
    createdAt : Int;
  };

  public type ActivityEntry = {
    id          : Nat;
    action      : Text;
    description : Text;
    timestamp   : Int;
  };

  // -----------------------------------------------------------------------
  // Pharmacist (per-application, multiple entries allowed)
  // -----------------------------------------------------------------------

  public type ApplicationPharmacist = {
    id                 : Text;
    fullName           : Text;
    registrationNumber : Text;
    qualification      : Text;   // "D.Pharm" | "B.Pharm" | "M.Pharm"
    aadhaarNumber      : Text;
    mobileNumber       : Text;
    address            : Text;
    dateOfJoining      : Text;
    dateOfLeaving      : Text;   // empty string when not applicable
    resignationDate    : Text;   // resignation date for Remove Pharmacist flow; empty string by default
  };

  // -----------------------------------------------------------------------
  // Plan Layout (per-application)
  // -----------------------------------------------------------------------

  public type RoomDetail = {
    roomName     : ?Text;  // optional — rooms identified by auto-assigned label (Room No 1, 2…)
    length       : Float;
    width        : Float;
    entranceType : Text;   // "door" | "fullShutter" | "halfShutter" | "open" | "halfWallOpening" | custom
    whichSide    : ?Text;  // direction this room is relative to previous room (East/West/North/South); null for Room No 1
    entranceSide : ?Text;  // wall side where the entrance is drawn (East/West/North/South)
  };

  public type PlanLayoutDetails = {
    boundaryEast   : Text;
    boundaryWest   : Text;
    boundaryNorth  : Text;
    boundarySouth  : Text;
    premisesLength : Float;
    premisesWidth  : Float;
    rooms          : [RoomDetail];
    frontOfShop    : Text;
  };

  // -----------------------------------------------------------------------
  // Billing types
  // -----------------------------------------------------------------------

  public type BillLineItem = {
    description : Text;
    amount      : Float;
    quantity    : Nat;    // default 1
  };

  public type PaymentMode = {
    #Cash;
    #Cheque;
    #BankTransfer;
    #UPI;
    #Card;
    #Other;
  };

  /// Distinguishes income receipts from government-fee expense entries.
  public type PaymentOption = {
    #receipt;   // income / professional fee
    #expense;   // government fees paid on behalf of client
  };

  public type BillStatus = {
    #unpaid;
    #partiallyPaid;
    #fullyPaid;
  };

  public type Bill = {
    id              : Nat;
    applicationId   : Nat;
    billNumber      : Text;         // BILL-YYYY-NNNN
    lineItems       : [BillLineItem];
    totalAmount     : Float;
    paymentReceived : Float;
    paymentMode     : PaymentMode;
    paymentDate     : Int;
    balancePending  : Float;
    // Receipt-linked aggregates (computed from linked Receipt records)
    paidAmount      : Float;        // sum of all receipt amountReceived for this bill
    pendingAmount   : Float;        // totalAmount - paidAmount
    status          : BillStatus;   // unpaid / partiallyPaid / fullyPaid
    createdAt       : Int;
  };

  /// A payment receipt linked to a specific Bill.
  public type Receipt = {
    id             : Text;
    receiptNumber  : Text;          // RCPT-YYYY-NNNN
    billId         : Text;          // links to Bill.billNumber or numeric id as Text
    applicationId  : Text;
    firmName       : Text;
    firmId         : Text;
    receiptDate    : Int;
    amountReceived : Float;
    paymentMode    : PaymentMode;
    referenceNo    : ?Text;
    remarks        : ?Text;
    createdAt      : Int;
  };

  /// A government-fee expense entry recorded against an application.
  public type Expense = {
    id            : Text;
    applicationId : Text;
    expenseDate   : Int;
    description   : Text;
    category      : Text;           // e.g. "Government" | "Professional" | "Miscellaneous"
    amount        : Float;
    paymentMode   : PaymentMode;
    referenceNo   : ?Text;
    notes         : ?Text;
    createdAt     : Int;
  };

  /// A single row in an application ledger (Bill / Receipt / Expense).
  public type LedgerEntry = {
    date            : Int;
    transactionType : Text;         // "Bill" | "Receipt" | "Expense"
    description     : Text;
    debit           : Float;
    credit          : Float;
    reference       : Text;
    applicationId   : Text;
  };

  /// Fee Master item — admin-managed pre-defined fee.
  public type FeeItem = {
    id            : Text;
    name          : Text;
    description   : ?Text;
    defaultAmount : Float;
    category      : Text;           // e.g. "Government" | "Professional" | "Miscellaneous"
    createdAt     : Int;
  };

  // -----------------------------------------------------------------------
  // Master data types
  // -----------------------------------------------------------------------

  public type PharmacistDetails = {
    name               : Text;
    registrationNumber : Text;
    qualification      : Text;
    address            : Text;
    contact            : Text;
  };

  public type FdaOfficeDetails = {
    officeName  : Text;
    address     : Text;
    officerName : Text;
    contact     : Text;
  };

  // -----------------------------------------------------------------------
  // Service charges
  // -----------------------------------------------------------------------

  public type ServiceCharge = {
    id          : Nat;
    serviceType : ServiceType;
    description : Text;
    amount      : Float;
  };

  // -----------------------------------------------------------------------
  // Core application record
  // -----------------------------------------------------------------------

  public type Application = {
    id                     : Nat;
    applicationId          : Text;       // BAR-YYYY-NNNN
    firmId                 : Text;
    businessName           : Text;
    proprietorName         : Text;
    firmAddress            : Text;
    mobileNumber           : Text;
    email                  : Text;
    businessType           : Text;       // text enum value for backward compat
    businessTypeData       : ?BusinessTypeData;
    serviceType            : ServiceType;
    applicationDate        : Int;
    expectedCompletionDate : ?Int;
    renewalDate            : ?Int;
    status                 : ApplicationStatus;
    totalFees              : Nat;
    amountCollected        : Nat;
    amountPending          : Nat;
    selectedFeeTemplates   : [Nat];
    documents              : [DocumentItem];
    notes                  : [NoteEntry];
    activityLog            : [ActivityEntry];
    pharmacists            : [ApplicationPharmacist];   // always an array, never null
    planLayoutDetails      : ?PlanLayoutDetails;
    firmPassword           : ?Text;
    directLink             : ?Text;
    portalCredentials      : [PortalCredential];        // always an array, never null
    // Change of Premise specific fields
    changePremiseOldAddress : ?Text;   // old premises address (Change of Premise only)
    changePremiseNewAddress : ?Text;   // new/proposed premises address (Change of Premise only)
    // Alteration of Premise specific fields
    alterationOldArea      : ?Float;   // old area in Sq. Ft. (Alteration of Premise only)
    alterationProposedArea : ?Float;   // proposed area after alteration in Sq. Ft. (Alteration of Premise only)
    // Add Pharmacist: optional resignation of old pharmacist
    resignOldPharmacist        : Bool;   // default false
    oldPharmacistName          : Text;   // default ""
    oldPharmacistRegNo         : Text;   // default ""
    oldPharmacistResignationDate : Text; // default ""
    // Per-application FDA covering letter address
    fdaAddress             : Text;       // default "" (pre-filled from CompanyInfo.fdaAddress on creation)
    createdAt              : Int;
    updatedAt              : Int;
  };

  // -----------------------------------------------------------------------
  // Lightweight summary for lists / dashboard
  // -----------------------------------------------------------------------

  public type AppSummary = {
    id                     : Nat;
    applicationId          : Text;
    firmId                 : Text;
    businessName           : Text;
    proprietorName         : Text;
    serviceType            : ServiceType;
    status                 : ApplicationStatus;
    expectedCompletionDate : ?Int;
    renewalDate            : ?Int;
    amountPending          : Nat;
    updatedAt              : Int;
  };

  // -----------------------------------------------------------------------
  // Mutation input types
  // -----------------------------------------------------------------------

  public type CreateApplicationInput = {
    firmId                 : Text;
    businessName           : Text;
    proprietorName         : Text;
    firmAddress            : Text;
    mobileNumber           : Text;
    email                  : Text;
    businessType           : Text;
    businessTypeData       : ?BusinessTypeData;
    serviceType            : ServiceType;
    applicationDate        : Int;
    expectedCompletionDate : ?Int;
    renewalDate            : ?Int;
    status                 : ApplicationStatus;
    totalFees              : Nat;
    amountCollected        : Nat;
    selectedFeeTemplates   : [Nat];
    fdaAddress             : Text;   // pre-filled from Settings on the frontend; stored as-is
  };

  public type UpdateApplicationInput = {
    id                     : Nat;
    firmId                 : ?Text;
    businessName           : ?Text;
    proprietorName         : ?Text;
    firmAddress            : ?Text;
    mobileNumber           : ?Text;
    email                  : ?Text;
    businessType           : ?Text;
    businessTypeData       : ?BusinessTypeData;
    serviceType            : ?ServiceType;
    applicationDate        : ?Int;
    expectedCompletionDate : ?Int;
    renewalDate            : ?Int;
    status                 : ?ApplicationStatus;
    totalFees              : ?Nat;
    amountCollected        : ?Nat;
    selectedFeeTemplates   : ?[Nat];
    firmPassword           : ?Text;
    directLink             : ?Text;
    changePremiseOldAddress : ?Text;
    changePremiseNewAddress : ?Text;
    alterationOldArea      : ?Float;
    alterationProposedArea : ?Float;
    // Add Pharmacist old-pharmacist resignation fields
    resignOldPharmacist          : ?Bool;
    oldPharmacistName            : ?Text;
    oldPharmacistRegNo           : ?Text;
    oldPharmacistResignationDate : ?Text;
    // Per-application FDA address
    fdaAddress             : ?Text;
  };

  // -----------------------------------------------------------------------
  // Document checklist management
  // -----------------------------------------------------------------------

  public type UpdateDocumentInput = {
    applicationId : Nat;
    documentId    : Nat;
    isChecked     : Bool;
  };

  // -----------------------------------------------------------------------
  // Search and filter
  // -----------------------------------------------------------------------

  public type SearchFilter = {
    searchText  : Text;          // free-text: Firm ID, names, mobile, App ID
    serviceType : ?ServiceType;
    status      : ?ApplicationStatus;
    dateFrom    : ?Int;
    dateTo      : ?Int;
  };

  public type ApplicationFilters = {
    serviceType : ?ServiceType;
    status      : ?ApplicationStatus;
    dateFrom    : ?Int;
    dateTo      : ?Int;
  };

  // -----------------------------------------------------------------------
  // Fee templates and company settings
  // -----------------------------------------------------------------------

  public type FeeTemplate = {
    id          : Nat;
    name        : Text;
    serviceType : ?ServiceType;
    amount      : Nat;
    description : Text;
  };

  public type CompanyInfo = {
    name       : Text;
    address    : Text;
    phone      : Text;
    email      : Text;
    fdaAddress : Text;   // default: "Assistant Commissioner, Food & Drug Administration (Drug) Buldhana (MH)"
  };

  // -----------------------------------------------------------------------
  // Dashboard
  // -----------------------------------------------------------------------

  public type ServiceTypeCount = {
    serviceType : ServiceType;
    count       : Nat;
  };

  public type DashboardStats = {
    totalApplications     : Nat;
    pending               : Nat;
    inProgress            : Nat;
    submitted             : Nat;
    completed             : Nat;
    onHold                : Nat;
    documentsPendingCount : Nat;
    feesPendingCount      : Nat;
    pendingFeesTotal      : Nat;
    upcomingDeadlines     : [AppSummary];    // within 7 days
    recentActivity        : [ActivityEntry]; // last 20 across all apps
    serviceTypeStats      : [ServiceTypeCount];
  };

  // -----------------------------------------------------------------------
  // Reports
  // -----------------------------------------------------------------------

  public type ReportFilter = {
    serviceType       : ?ServiceType;
    status            : ?ApplicationStatus;
    dateFrom          : ?Int;
    dateTo            : ?Int;
    renewalDaysAhead  : ?Nat;   // e.g. 30 / 60 / 90 for renewal reminders
  };

  public type FeesReport = {
    totalBilled     : Nat;
    totalCollected  : Nat;
    totalPending    : Nat;
    applications    : [AppSummary];
  };

  public type RenewalReport = {
    applications : [AppSummary];
  };

};
