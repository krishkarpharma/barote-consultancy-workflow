import Debug "mo:core/Debug";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Types "../types/applications";

module {

  public type Application = Types.Application;
  public type AppSummary = Types.AppSummary;
  public type CreateApplicationInput = Types.CreateApplicationInput;
  public type UpdateApplicationInput = Types.UpdateApplicationInput;
  public type ApplicationFilters = Types.ApplicationFilters;
  public type SearchFilter = Types.SearchFilter;
  public type FeeTemplate = Types.FeeTemplate;
  public type CompanyInfo = Types.CompanyInfo;
  public type DashboardStats = Types.DashboardStats;
  public type ReportFilter = Types.ReportFilter;
  public type DocumentItem = Types.DocumentItem;
  public type NoteEntry = Types.NoteEntry;
  public type ActivityEntry = Types.ActivityEntry;
  public type ServiceType = Types.ServiceType;
  public type FeesReport = Types.FeesReport;
  public type RenewalReport = Types.RenewalReport;
  public type ServiceTypeCount = Types.ServiceTypeCount;
  public type ApplicationPharmacist = Types.ApplicationPharmacist;
  public type PlanLayoutDetails = Types.PlanLayoutDetails;
  public type PortalCredential = Types.PortalCredential;
  public type BusinessTypeData = Types.BusinessTypeData;

  // Compare ActivityEntry by timestamp (descending)
  func compareActivityDesc(a : ActivityEntry, b : ActivityEntry) : { #less; #equal; #greater } {
    Int.compare(b.timestamp, a.timestamp)
  };

  // ── Application ID generation ─────────────────────────────────────

  public func generateApplicationId(year : Nat, counter : Nat) : Text {
    let yearText = year.toText();
    let counterText = counter.toText();
    let padded = if (counterText.size() >= 4) {
      counterText
    } else {
      let sz = counterText.size();
      let needed : Nat = if (sz < 4) { 4 - sz } else { 0 };
      var pad = "";
      var i = 0;
      while (i < needed) {
        pad := pad # "0";
        i += 1;
      };
      pad # counterText
    };
    "BAR-" # yearText # "-" # padded
  };

  // ── Default document checklists ───────────────────────────────────

  func makeDoc(id : Nat, name : Text, category : Text) : DocumentItem {
    { id; name; category; isChecked = false; checkedAt = null }
  };

  func makeDocs(items : [(Text, Text)], startId : Nat) : [DocumentItem] {
    items.mapEntries(func((name, category), i) {
      makeDoc(startId + i, name, category)
    })
  };

  public func defaultDocumentsForServiceType(
    serviceType : ServiceType,
    startId : Nat,
  ) : [DocumentItem] {
    switch (serviceType) {
      case (#DrugLicenceNewFirm or #DrugLicenceRenewal or #DrugLicenceChangePremise or
           #DrugLicenceAlterationOfPremise or #DrugLicenceChangeConstitution or
           #DrugLicenceAddPharmacist or #DrugLicenceRemovePharmacist) {
        makeDocs([
          ("Aadhar Card", "Proprietor"),
          ("PAN Card", "Proprietor"),
          ("Photo", "Proprietor"),
          ("Signature", "Proprietor"),
          ("Tax Receipt", "Ownership Proof"),
          ("Assessment Copy", "Ownership Proof"),
          ("NOC", "Ownership Proof"),
          ("Rent Agreement", "Ownership Proof"),
          ("Premises Photo", "Ownership Proof"),
          ("Registration Certificate", "Pharmacist"),
          ("TC", "Pharmacist"),
          ("Mark List", "Pharmacist"),
          ("Photo", "Pharmacist"),
          ("Aadhar Card", "Pharmacist"),
          ("Signature", "Pharmacist"),
          ("Freeze Bill", "Pharmacist"),
          ("Electricity Bill", "Pharmacist"),
          ("Plan Layout", "Pharmacist"),
        ], startId)
      };
      case (#FoodLicenceNew or #FoodLicenceRenewal) {
        makeDocs([
          ("Business Registration Certificate", "Documents"),
          ("Premises Proof", "Documents"),
          ("ID Proof (Aadhaar/PAN)", "Documents"),
          ("Water Test Report", "Documents"),
          ("NOC from Local Authority", "Documents"),
          ("Premises Photos", "Documents"),
          ("Food Safety Management Plan", "Documents"),
          ("List of Food Products", "Documents"),
          ("Declaration Form", "Documents"),
        ], startId)
      };
      case (#GSTRegistration) {
        makeDocs([
          ("PAN Card", "Documents"),
          ("Aadhaar Card", "Documents"),
          ("Business Registration Proof", "Documents"),
          ("Bank Statement (cancelled cheque)", "Documents"),
          ("Address Proof", "Documents"),
          ("Passport Size Photo", "Documents"),
          ("Electricity Bill / Rent Agreement", "Documents"),
          ("Digital Signature (if applicable)", "Documents"),
        ], startId)
      };
      case (#MSMEUdyam) {
        makeDocs([
          ("Aadhaar Card", "Documents"),
          ("PAN Card", "Documents"),
          ("Bank Account Details", "Documents"),
          ("Business Name & Address Details", "Documents"),
          ("NIC Code details", "Documents"),
          ("Investment details", "Documents"),
        ], startId)
      };
      case (#Other) { [] };
    }
  };

  // ── toSummary ─────────────────────────────────────────────────────

  public func toSummary(app : Application) : AppSummary {
    {
      id = app.id;
      applicationId = app.applicationId;
      firmId = app.firmId;
      businessName = app.businessName;
      proprietorName = app.proprietorName;
      serviceType = app.serviceType;
      status = app.status;
      expectedCompletionDate = app.expectedCompletionDate;
      renewalDate = app.renewalDate;
      amountPending = app.amountPending;
      updatedAt = app.updatedAt;
    }
  };

  // ── Status text helper ────────────────────────────────────────────

  func statusToText(status : Types.ApplicationStatus) : Text {
    switch (status) {
      case (#New) "New";
      case (#FeesReceived) "FeesReceived";
      case (#FeesPending) "FeesPending";
      case (#DocumentsPending) "DocumentsPending";
      case (#DocumentsCollected) "DocumentsCollected";
      case (#ApplicationFiled) "ApplicationFiled";
      case (#UnderReview) "UnderReview";
      case (#Approved) "Approved";
      case (#Rejected) "Rejected";
      case (#OnHold) "OnHold";
      case (#Completed) "Completed";
    }
  };

  func statusEq(a : Types.ApplicationStatus, b : Types.ApplicationStatus) : Bool {
    statusToText(a) == statusToText(b)
  };

  func serviceTypeToText(s : ServiceType) : Text {
    switch (s) {
      case (#DrugLicenceNewFirm) "DrugLicenceNewFirm";
      case (#DrugLicenceRenewal) "DrugLicenceRenewal";
      case (#DrugLicenceChangePremise) "DrugLicenceChangePremise";
      case (#DrugLicenceAlterationOfPremise) "DrugLicenceAlterationOfPremise";
      case (#DrugLicenceChangeConstitution) "DrugLicenceChangeConstitution";
      case (#DrugLicenceAddPharmacist) "DrugLicenceAddPharmacist";
      case (#DrugLicenceRemovePharmacist) "DrugLicenceRemovePharmacist";
      case (#FoodLicenceNew) "FoodLicenceNew";
      case (#FoodLicenceRenewal) "FoodLicenceRenewal";
      case (#GSTRegistration) "GSTRegistration";
      case (#MSMEUdyam) "MSMEUdyam";
      case (#Other) "Other";
    }
  };

  func serviceTypeEq(a : ServiceType, b : ServiceType) : Bool {
    serviceTypeToText(a) == serviceTypeToText(b)
  };

  // ── Application CRUD ──────────────────────────────────────────────

  public func createApplication(
    applications : List.List<Application>,
    nextId : Nat,
    year : Nat,
    yearCounter : Nat,
    input : CreateApplicationInput,
    docStartId : Nat,
  ) : Application {
    let now = Time.now();
    let appId = generateApplicationId(year, yearCounter);
    let docs = defaultDocumentsForServiceType(input.serviceType, docStartId);
    let pending : Nat = if (input.totalFees >= input.amountCollected) {
      input.totalFees - input.amountCollected
    } else { 0 };
    let app : Application = {
      id = nextId;
      applicationId = appId;
      firmId = input.firmId;
      businessName = input.businessName;
      proprietorName = input.proprietorName;
      firmAddress = input.firmAddress;
      mobileNumber = input.mobileNumber;
      email = input.email;
      businessType = input.businessType;
      businessTypeData = input.businessTypeData;
      serviceType = input.serviceType;
      applicationDate = input.applicationDate;
      expectedCompletionDate = input.expectedCompletionDate;
      renewalDate = input.renewalDate;
      status = input.status;
      totalFees = input.totalFees;
      amountCollected = input.amountCollected;
      amountPending = pending;
      selectedFeeTemplates = input.selectedFeeTemplates;
      documents = docs;
      notes = [];
      activityLog = [{
        id = 1;
        action = "Created";
        description = "Application created with ID " # appId;
        timestamp = now;
      }];
      pharmacists = [];
      planLayoutDetails = null;
      firmPassword = null;
      directLink = null;
      portalCredentials = [];
      changePremiseOldAddress = null;
      changePremiseNewAddress = null;
      alterationOldArea = null;
      alterationProposedArea = null;
      resignOldPharmacist = false;
      oldPharmacistName = "";
      oldPharmacistRegNo = "";
      oldPharmacistResignationDate = "";
      fdaAddress = input.fdaAddress;
      createdAt = now;
      updatedAt = now;
    };
    applications.add(app);
    app
  };

  public func getApplication(
    applications : List.List<Application>,
    id : Nat,
  ) : ?Application {
    applications.find(func(app) { app.id == id })
  };

  public func updateApplication(
    applications : List.List<Application>,
    input : UpdateApplicationInput,
  ) : ?Application {
    let now = Time.now();
    var found : ?Application = null;

    applications.mapInPlace(func(app) {
      if (app.id != input.id) {
        app
      } else {
        let newStatus = switch (input.status) { case (?s) s; case null app.status };
        let newTotal = switch (input.totalFees) { case (?v) v; case null app.totalFees };
        let newCollected = switch (input.amountCollected) { case (?v) v; case null app.amountCollected };

        let extraLogs = List.empty<ActivityEntry>();
        var nextLogId = app.activityLog.size() + 1;

        if (not statusEq(app.status, newStatus)) {
          extraLogs.add({
            id = nextLogId;
            action = "StatusChanged";
            description = "Status changed from " # statusToText(app.status) # " to " # statusToText(newStatus);
            timestamp = now;
          });
          nextLogId += 1;
        };

        if (newTotal != app.totalFees or newCollected != app.amountCollected) {
          extraLogs.add({
            id = nextLogId;
            action = "FeesUpdated";
            description = "Fees updated: total=" # newTotal.toText() # ", collected=" # newCollected.toText();
            timestamp = now;
          });
          nextLogId += 1;
        };

        extraLogs.add({
          id = nextLogId;
          action = "Updated";
          description = "Application record updated";
          timestamp = now;
        });

        let newPending : Nat = if (newTotal >= newCollected) { newTotal - newCollected } else { 0 };
        let newLog = app.activityLog.concat(extraLogs.toArray());

        let updated : Application = {
          app with
          firmId = switch (input.firmId) { case (?v) v; case null app.firmId };
          businessName = switch (input.businessName) { case (?v) v; case null app.businessName };
          proprietorName = switch (input.proprietorName) { case (?v) v; case null app.proprietorName };
          firmAddress = switch (input.firmAddress) { case (?v) v; case null app.firmAddress };
          mobileNumber = switch (input.mobileNumber) { case (?v) v; case null app.mobileNumber };
          email = switch (input.email) { case (?v) v; case null app.email };
          businessType = switch (input.businessType) { case (?v) v; case null app.businessType };
          businessTypeData = switch (input.businessTypeData) { case (?v) ?v; case null app.businessTypeData };
          serviceType = switch (input.serviceType) { case (?v) v; case null app.serviceType };
          applicationDate = switch (input.applicationDate) { case (?v) v; case null app.applicationDate };
          expectedCompletionDate = switch (input.expectedCompletionDate) {
            case (?v) ?v; case null app.expectedCompletionDate
          };
          renewalDate = switch (input.renewalDate) { case (?v) ?v; case null app.renewalDate };
          status = newStatus;
          totalFees = newTotal;
          amountCollected = newCollected;
          amountPending = newPending;
          selectedFeeTemplates = switch (input.selectedFeeTemplates) {
            case (?v) v; case null app.selectedFeeTemplates
          };
          firmPassword = switch (input.firmPassword) { case (?v) ?v; case null app.firmPassword };
          directLink = switch (input.directLink) { case (?v) ?v; case null app.directLink };
          changePremiseOldAddress = switch (input.changePremiseOldAddress) { case (?v) ?v; case null app.changePremiseOldAddress };
          changePremiseNewAddress = switch (input.changePremiseNewAddress) { case (?v) ?v; case null app.changePremiseNewAddress };
          alterationOldArea = switch (input.alterationOldArea) { case (?v) ?v; case null app.alterationOldArea };
          alterationProposedArea = switch (input.alterationProposedArea) { case (?v) ?v; case null app.alterationProposedArea };
          resignOldPharmacist = switch (input.resignOldPharmacist) { case (?v) v; case null app.resignOldPharmacist };
          oldPharmacistName = switch (input.oldPharmacistName) { case (?v) v; case null app.oldPharmacistName };
          oldPharmacistRegNo = switch (input.oldPharmacistRegNo) { case (?v) v; case null app.oldPharmacistRegNo };
          oldPharmacistResignationDate = switch (input.oldPharmacistResignationDate) { case (?v) v; case null app.oldPharmacistResignationDate };
          fdaAddress = switch (input.fdaAddress) { case (?v) v; case null app.fdaAddress };
          activityLog = newLog;
          updatedAt = now;
        };
        found := ?updated;
        updated
      }
    });
    found
  };

  public func deleteApplication(
    applications : List.List<Application>,
    id : Nat,
  ) : Bool {
    let sizeBefore = applications.size();
    let filtered = applications.filter(func(app) { app.id != id });
    applications.clear();
    applications.append(filtered);
    applications.size() < sizeBefore
  };

  // ── Document operations ───────────────────────────────────────────

  public func toggleDocument(
    applications : List.List<Application>,
    applicationId : Nat,
    documentId : Nat,
    isChecked : Bool,
  ) : ?Application {
    let now = Time.now();
    var found : ?Application = null;
    applications.mapInPlace(func(app) {
      if (app.id != applicationId) {
        app
      } else {
        var docName = "";
        let updatedDocs = app.documents.map(func(doc : DocumentItem) : DocumentItem {
          if (doc.id == documentId) {
            docName := doc.name;
            {
              doc with
              isChecked = isChecked;
              checkedAt = if (isChecked) ?now else null;
            }
          } else { doc }
        });
        let checkedText = if (isChecked) "checked" else "unchecked";
        let logEntry : ActivityEntry = {
          id = app.activityLog.size() + 1;
          action = "DocumentUpdated";
          description = "Document " # docName # " marked as " # checkedText;
          timestamp = now;
        };
        let updated : Application = {
          app with
          documents = updatedDocs;
          activityLog = app.activityLog.concat([logEntry]);
          updatedAt = now;
        };
        found := ?updated;
        updated
      }
    });
    found
  };

  public func addNote(
    applications : List.List<Application>,
    applicationId : Nat,
    noteText : Text,
    nextNoteId : Nat,
  ) : ?Application {
    let now = Time.now();
    var found : ?Application = null;
    applications.mapInPlace(func(app) {
      if (app.id != applicationId) {
        app
      } else {
        let newNote : NoteEntry = {
          id = nextNoteId;
          text = noteText;
          createdAt = now;
        };
        let updated : Application = {
          app with
          notes = app.notes.concat([newNote]);
          updatedAt = now;
        };
        found := ?updated;
        updated
      }
    });
    found
  };

  public func addCustomDocument(
    applications : List.List<Application>,
    applicationId : Nat,
    name : Text,
    category : Text,
    nextDocId : Nat,
  ) : ?Application {
    let now = Time.now();
    var found : ?Application = null;
    applications.mapInPlace(func(app) {
      if (app.id != applicationId) {
        app
      } else {
        switch (app.serviceType) {
          case (#Other) {
            let newDoc : DocumentItem = {
              id = nextDocId;
              name = name;
              category = category;
              isChecked = false;
              checkedAt = null;
            };
            let logEntry : ActivityEntry = {
              id = app.activityLog.size() + 1;
              action = "DocumentAdded";
              description = "Custom document added: " # name;
              timestamp = now;
            };
            let updated : Application = {
              app with
              documents = app.documents.concat([newDoc]);
              activityLog = app.activityLog.concat([logEntry]);
              updatedAt = now;
            };
            found := ?updated;
            updated
          };
          case (_) { app };
        }
      }
    });
    found
  };

  public func removeCustomDocument(
    applications : List.List<Application>,
    applicationId : Nat,
    documentId : Nat,
  ) : ?Application {
    let now = Time.now();
    var found : ?Application = null;
    applications.mapInPlace(func(app) {
      if (app.id != applicationId) {
        app
      } else {
        switch (app.serviceType) {
          case (#Other) {
            let newDocs = app.documents.filter(func(d : DocumentItem) : Bool { d.id != documentId });
            let logEntry : ActivityEntry = {
              id = app.activityLog.size() + 1;
              action = "DocumentRemoved";
              description = "Custom document removed";
              timestamp = now;
            };
            let updated : Application = {
              app with
              documents = newDocs;
              activityLog = app.activityLog.concat([logEntry]);
              updatedAt = now;
            };
            found := ?updated;
            updated
          };
          case (_) { app };
        }
      }
    });
    found
  };

  // ── Pharmacist management (per-application) ───────────────────────

  /// Add a pharmacist entry to an application.
  public func addApplicationPharmacist(
    applications : List.List<Application>,
    appId        : Nat,
    pharmacist   : ApplicationPharmacist,
  ) : { #ok : Application; #err : Text } {
    switch (applications.findIndex(func(a : Application) : Bool { a.id == appId })) {
      case null { #err("Application not found") };
      case (?idx) {
        let app = applications.at(idx);
        let updated : Application = { app with pharmacists = app.pharmacists.concat([pharmacist]) };
        applications.put(idx, updated);
        #ok(updated)
      };
    }
  };

  /// Update an existing pharmacist entry on an application.
  public func updateApplicationPharmacist(
    applications  : List.List<Application>,
    appId         : Nat,
    pharmacistId  : Text,
    pharmacist    : ApplicationPharmacist,
  ) : { #ok : Application; #err : Text } {
    switch (applications.findIndex(func(a : Application) : Bool { a.id == appId })) {
      case null { #err("Application not found") };
      case (?idx) {
        let app = applications.at(idx);
        let replaced = app.pharmacists.map(
          func(p : ApplicationPharmacist) : ApplicationPharmacist { if (p.id == pharmacistId) pharmacist else p }
        );
        let updated : Application = { app with pharmacists = replaced };
        applications.put(idx, updated);
        #ok(updated)
      };
    }
  };

  /// Remove a pharmacist entry from an application.
  public func removeApplicationPharmacist(
    applications : List.List<Application>,
    appId        : Nat,
    pharmacistId : Text,
  ) : { #ok : Application; #err : Text } {
    switch (applications.findIndex(func(a : Application) : Bool { a.id == appId })) {
      case null { #err("Application not found") };
      case (?idx) {
        let app = applications.at(idx);
        let filtered = app.pharmacists.filter(func(p : ApplicationPharmacist) : Bool { p.id != pharmacistId });
        let updated : Application = { app with pharmacists = filtered };
        applications.put(idx, updated);
        #ok(updated)
      };
    }
  };

  /// Return all pharmacist entries for an application.
  public func getApplicationPharmacists(
    applications : List.List<Application>,
    appId        : Nat,
  ) : { #ok : [ApplicationPharmacist]; #err : Text } {
    switch (applications.find(func(a : Application) : Bool { a.id == appId })) {
      case null { #err("Application not found") };
      case (?app) { #ok(app.pharmacists) };
    }
  };

  // ── Plan Layout management (per-application) ──────────────────────

  /// Set (replace) the plan layout details for an application.
  public func setApplicationPlanLayout(
    applications : List.List<Application>,
    appId        : Nat,
    details      : PlanLayoutDetails,
  ) : { #ok : Application; #err : Text } {
    switch (applications.findIndex(func(a : Application) : Bool { a.id == appId })) {
      case null { #err("Application not found") };
      case (?idx) {
        let app = applications.at(idx);
        let updated : Application = { app with planLayoutDetails = ?details };
        applications.put(idx, updated);
        #ok(updated)
      };
    }
  };

  /// Return the plan layout details for an application.
  public func getApplicationPlanLayout(
    applications : List.List<Application>,
    appId        : Nat,
  ) : { #ok : ?PlanLayoutDetails; #err : Text } {
    switch (applications.find(func(a : Application) : Bool { a.id == appId })) {
      case null { #err("Application not found") };
      case (?app) { #ok(app.planLayoutDetails) };
    }
  };

  // ── List & filter ─────────────────────────────────────────────────

  public func listApplications(
    applications : List.List<Application>,
    filters : ApplicationFilters,
  ) : [AppSummary] {
    applications.filter(func(app) {
      let matchService = switch (filters.serviceType) {
        case (?st) serviceTypeEq(app.serviceType, st);
        case null true;
      };
      let matchStatus = switch (filters.status) {
        case (?s) statusEq(app.status, s);
        case null true;
      };
      let matchFrom = switch (filters.dateFrom) {
        case (?d) (app.applicationDate >= d);
        case null true;
      };
      let matchTo = switch (filters.dateTo) {
        case (?d) (app.applicationDate <= d);
        case null true;
      };
      matchService and matchStatus and matchFrom and matchTo
    }).toArray().map(func(app : Application) : AppSummary { toSummary(app) })
  };

  public func searchApplications(
    applications : List.List<Application>,
    filter : SearchFilter,
  ) : [AppSummary] {
    let q = filter.searchText.toLower();
    applications.filter(func(app) {
      let textMatch = if (q.size() == 0) {
        true
      } else {
        app.firmId.toLower().contains(#text q) or
        app.businessName.toLower().contains(#text q) or
        app.proprietorName.toLower().contains(#text q) or
        app.mobileNumber.contains(#text q) or
        app.applicationId.toLower().contains(#text q)
      };
      let matchService = switch (filter.serviceType) {
        case (?st) serviceTypeEq(app.serviceType, st);
        case null true;
      };
      let matchStatus = switch (filter.status) {
        case (?s) statusEq(app.status, s);
        case null true;
      };
      let matchFrom = switch (filter.dateFrom) {
        case (?d) (app.applicationDate >= d);
        case null true;
      };
      let matchTo = switch (filter.dateTo) {
        case (?d) (app.applicationDate <= d);
        case null true;
      };
      textMatch and matchService and matchStatus and matchFrom and matchTo
    }).toArray().map(func(app : Application) : AppSummary { toSummary(app) })
  };

  // ── Dashboard ─────────────────────────────────────────────────────

  public func getDashboardStats(
    applications : List.List<Application>,
  ) : DashboardStats {
    let now = Time.now();
    let sevenDays : Int = 7 * 24 * 60 * 60 * 1_000_000_000;
    let deadline = now + sevenDays;

    var total = 0;
    var pending = 0;
    var inProgress = 0;
    var submitted = 0;
    var completed = 0;
    var onHold = 0;
    var docsPendingCount = 0;
    var feesPendingCount = 0;
    var pendingFeesTotal = 0;

    // Use a list of (serviceType text, count) pairs for service stats
    let serviceStatsList = List.empty<(Text, Nat)>();
    let recentAll = List.empty<ActivityEntry>();
    let upcomingList = List.empty<AppSummary>();

    applications.forEach(func(app) {
      total += 1;

      switch (app.status) {
        case (#New or #FeesPending or #DocumentsPending) { pending += 1 };
        case (#FeesReceived or #DocumentsCollected or #UnderReview) { inProgress += 1 };
        case (#ApplicationFiled) { submitted += 1 };
        case (#Approved or #Rejected or #Completed) { completed += 1 };
        case (#OnHold) { onHold += 1 };
      };

      if (app.documents.any(func(d : DocumentItem) : Bool { not d.isChecked })) {
        docsPendingCount += 1;
      };

      if (app.amountPending > 0) {
        feesPendingCount += 1;
        pendingFeesTotal += app.amountPending;
      };

      switch (app.status) {
        case (#Approved or #Rejected or #Completed) {};
        case (_) {
          switch (app.expectedCompletionDate) {
            case (?d) {
              if (d <= deadline and d >= now) {
                upcomingList.add(toSummary(app));
              };
            };
            case null {};
          };
        };
      };

      // Accumulate service type count
      let stKey = serviceTypeToText(app.serviceType);
      switch (serviceStatsList.findIndex(func((k, _)) { k == stKey })) {
        case (?idx) {
          let (k, c) = serviceStatsList.at(idx);
          serviceStatsList.put(idx, (k, c + 1));
        };
        case null {
          serviceStatsList.add((stKey, 1));
        };
      };

      app.activityLog.forEach(func(entry) { recentAll.add(entry) });
    });

    // Sort activity by timestamp desc, take first 20
    let allActivity = recentAll.toArray();
    let sortedActivity = allActivity.sort(compareActivityDesc);
    let recentActivity = if (sortedActivity.size() <= 20) {
      sortedActivity
    } else {
      sortedActivity.sliceToArray(0, 20)
    };

    // Build service type stats from list
    let serviceStats = serviceStatsList.toArray().map(func((stText, count) : (Text, Nat)) : ServiceTypeCount {
      { serviceType = textToServiceType(stText); count = count }
    });

    {
      totalApplications = total;
      pending = pending;
      inProgress = inProgress;
      submitted = submitted;
      completed = completed;
      onHold = onHold;
      documentsPendingCount = docsPendingCount;
      feesPendingCount = feesPendingCount;
      pendingFeesTotal = pendingFeesTotal;
      upcomingDeadlines = upcomingList.toArray();
      recentActivity = recentActivity;
      serviceTypeStats = serviceStats;
    }
  };

  // ── Reports ───────────────────────────────────────────────────────

  public func getFeesReport(
    applications : List.List<Application>,
    filter : ReportFilter,
  ) : FeesReport {
    let filtered = applyReportFilter(applications, filter);
    var totalBilled = 0;
    var totalCollected = 0;
    var totalPending = 0;
    let summaries = filtered.map(func(app : Application) : AppSummary {
      totalBilled += app.totalFees;
      totalCollected += app.amountCollected;
      totalPending += app.amountPending;
      toSummary(app)
    });
    {
      totalBilled = totalBilled;
      totalCollected = totalCollected;
      totalPending = totalPending;
      applications = summaries;
    }
  };

  public func getRenewalReminders(
    applications : List.List<Application>,
    days : Nat,
  ) : [AppSummary] {
    let now = Time.now();
    let window : Int = days.toInt() * 24 * 60 * 60 * 1_000_000_000;
    let deadline = now + window;
    applications.filter(func(app) {
      switch (app.renewalDate) {
        case (?d) (d >= now and d <= deadline);
        case null false;
      }
    }).toArray().map(func(app : Application) : AppSummary { toSummary(app) })
  };

  public func getApplicationsForReport(
    applications : List.List<Application>,
    filter : ReportFilter,
  ) : [AppSummary] {
    applyReportFilter(applications, filter).map(func(app : Application) : AppSummary { toSummary(app) })
  };

  // ── Fee template CRUD ─────────────────────────────────────────────

  public func createFeeTemplate(
    templates : List.List<FeeTemplate>,
    nextId : Nat,
    name : Text,
    serviceType : ?ServiceType,
    amount : Nat,
    description : Text,
  ) : FeeTemplate {
    let t : FeeTemplate = {
      id = nextId;
      name = name;
      serviceType = serviceType;
      amount = amount;
      description = description;
    };
    templates.add(t);
    t
  };

  public func updateFeeTemplate(
    templates : List.List<FeeTemplate>,
    id : Nat,
    name : ?Text,
    serviceType : ?(?ServiceType),
    amount : ?Nat,
    description : ?Text,
  ) : ?FeeTemplate {
    var found : ?FeeTemplate = null;
    templates.mapInPlace(func(t) {
      if (t.id != id) {
        t
      } else {
        let updated : FeeTemplate = {
          t with
          name = switch (name) { case (?v) v; case null t.name };
          serviceType = switch (serviceType) { case (?v) v; case null t.serviceType };
          amount = switch (amount) { case (?v) v; case null t.amount };
          description = switch (description) { case (?v) v; case null t.description };
        };
        found := ?updated;
        updated
      }
    });
    found
  };

  public func deleteFeeTemplate(
    templates : List.List<FeeTemplate>,
    id : Nat,
  ) : Bool {
    let sizeBefore = templates.size();
    let filtered = templates.filter(func(t) { t.id != id });
    templates.clear();
    templates.append(filtered);
    templates.size() < sizeBefore
  };

  public func listFeeTemplates(
    templates : List.List<FeeTemplate>,
  ) : [FeeTemplate] {
    templates.toArray()
  };

  // ── Portal Credential management (per-application) ───────────────

  /// Replace the full portal credentials list for an application.
  public func updatePortalCredentials(
    applications : List.List<Application>,
    appId        : Text,
    credentials  : [PortalCredential],
  ) : { #ok : Application; #err : Text } {
    switch (applications.findIndex(func(a : Application) : Bool { a.applicationId == appId })) {
      case null { #err("Application not found") };
      case (?idx) {
        let app = applications.at(idx);
        let updated = { app with portalCredentials = credentials };
        applications.put(idx, updated);
        #ok(updated)
      };
    }
  };

  /// Add a single portal credential to an application.
  public func addPortalCredential(
    applications : List.List<Application>,
    appId        : Nat,
    credential   : PortalCredential,
  ) : { #ok : Application; #err : Text } {
    switch (applications.findIndex(func(a : Application) : Bool { a.id == appId })) {
      case null { #err("Application not found") };
      case (?idx) {
        let app = applications.at(idx);
        let updated = { app with portalCredentials = app.portalCredentials.concat([credential]) };
        applications.put(idx, updated);
        #ok(updated)
      };
    }
  };

  /// Update a single portal credential entry on an application.
  public func updatePortalCredential(
    applications  : List.List<Application>,
    appId         : Nat,
    credentialId  : Text,
    credential    : PortalCredential,
  ) : { #ok : Application; #err : Text } {
    switch (applications.findIndex(func(a : Application) : Bool { a.id == appId })) {
      case null { #err("Application not found") };
      case (?idx) {
        let app = applications.at(idx);
        let newCreds = app.portalCredentials.map(
          func(c) { if (c.id == credentialId) { credential } else { c } },
        );
        let updated = { app with portalCredentials = newCreds };
        applications.put(idx, updated);
        #ok(updated)
      };
    }
  };

  /// Remove a portal credential entry from an application.
  public func removePortalCredential(
    applications  : List.List<Application>,
    appId         : Nat,
    credentialId  : Text,
  ) : { #ok : Application; #err : Text } {
    switch (applications.findIndex(func(a : Application) : Bool { a.id == appId })) {
      case null { #err("Application not found") };
      case (?idx) {
        let app = applications.at(idx);
        let newCreds = app.portalCredentials.filter(
          func(c) { c.id != credentialId },
        );
        let updated = { app with portalCredentials = newCreds };
        applications.put(idx, updated);
        #ok(updated)
      };
    }
  };

  /// Return all portal credentials for an application.
  public func getPortalCredentials(
    applications : List.List<Application>,
    appId        : Nat,
  ) : { #ok : [PortalCredential]; #err : Text } {
    switch (applications.find(func(a : Application) : Bool { a.id == appId })) {
      case null { #err("Application not found") };
      case (?app) { #ok(app.portalCredentials) };
    }
  };



  func applyReportFilter(
    applications : List.List<Application>,
    filter : ReportFilter,
  ) : [Application] {
    applications.filter(func(app) {
      let matchService = switch (filter.serviceType) {
        case (?st) serviceTypeEq(app.serviceType, st);
        case null true;
      };
      let matchStatus = switch (filter.status) {
        case (?s) statusEq(app.status, s);
        case null true;
      };
      let matchFrom = switch (filter.dateFrom) {
        case (?d) (app.applicationDate >= d);
        case null true;
      };
      let matchTo = switch (filter.dateTo) {
        case (?d) (app.applicationDate <= d);
        case null true;
      };
      matchService and matchStatus and matchFrom and matchTo
    }).toArray()
  };

  func textToServiceType(t : Text) : ServiceType {
    switch (t) {
      case "DrugLicenceNewFirm" #DrugLicenceNewFirm;
      case "DrugLicenceRenewal" #DrugLicenceRenewal;
      case "DrugLicenceChangePremise" #DrugLicenceChangePremise;
      case "DrugLicenceAlterationOfPremise" #DrugLicenceAlterationOfPremise;
      case "DrugLicenceChangeConstitution" #DrugLicenceChangeConstitution;
      case "DrugLicenceAddPharmacist" #DrugLicenceAddPharmacist;
      case "DrugLicenceRemovePharmacist" #DrugLicenceRemovePharmacist;
      case "FoodLicenceNew" #FoodLicenceNew;
      case "FoodLicenceRenewal" #FoodLicenceRenewal;
      case "GSTRegistration" #GSTRegistration;
      case "MSMEUdyam" #MSMEUdyam;
      case _ #Other;
    }
  };

};
