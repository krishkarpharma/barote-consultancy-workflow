import Debug "mo:core/Debug";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Types "../types/applications";
import AppLib "../lib/applications";

mixin (
  applications : List.List<Types.Application>,
  feeTemplates : List.List<Types.FeeTemplate>,
  companyInfo : { var value : Types.CompanyInfo },
  nextAppId : { var value : Nat },
  nextFeeTemplateId : { var value : Nat },
  nextDocId : { var value : Nat },
  nextNoteId : { var value : Nat },
  appYearCounter : List.List<(Nat, Nat)>,
) {

  // ── Private: year-aware counter ───────────────────────────────────

  func getYearCounter(year : Nat) : Nat {
    switch (appYearCounter.find(func((y, _)) { y == year })) {
      case (?(_, c)) c;
      case null 0;
    }
  };

  func incrementYearCounter(year : Nat) : Nat {
    let current = getYearCounter(year);
    let next = current + 1;
    var updated = false;
    appYearCounter.mapInPlace(func((y, c)) {
      if (y == year) { updated := true; (y, next) } else { (y, c) }
    });
    if (not updated) {
      appYearCounter.add((year, next));
    };
    next
  };

  func currentYear() : Nat {
    let nowSec : Nat = Int.abs(Time.now() / 1_000_000_000);
    let secondsPerYear : Nat = 365 * 24 * 3600;
    1970 + nowSec / secondsPerYear
  };

  // ── Applications ──────────────────────────────────────────────────

  public func createApplication(
    input : Types.CreateApplicationInput,
  ) : async { #ok : Types.Application; #err : Text } {
    let year = currentYear();
    let counter = incrementYearCounter(year);
    let id = nextAppId.value;
    nextAppId.value += 1;
    let docStart = nextDocId.value;
    let app = AppLib.createApplication(
      applications, id, year, counter, input, docStart,
    );
    nextDocId.value += app.documents.size();
    #ok(app)
  };

  public query func getApplication(id : Nat) : async ?Types.Application {
    AppLib.getApplication(applications, id)
  };

  public func updateApplication(
    input : Types.UpdateApplicationInput,
  ) : async { #ok : Types.Application; #err : Text } {
    switch (AppLib.updateApplication(applications, input)) {
      case null { #err("Application not found") };
      case (?app) { #ok(app) };
    }
  };

  public func deleteApplication(id : Nat) : async { #ok : (); #err : Text } {
    if (AppLib.deleteApplication(applications, id)) {
      #ok(())
    } else {
      #err("Application not found")
    }
  };

  public query func listApplications(
    filters : Types.ApplicationFilters,
  ) : async [Types.AppSummary] {
    AppLib.listApplications(applications, filters)
  };

  public query func searchApplications(
    filter : Types.SearchFilter,
  ) : async [Types.AppSummary] {
    AppLib.searchApplications(applications, filter)
  };

  // ── Document operations ───────────────────────────────────────────

  public func updateDocumentItem(
    input : Types.UpdateDocumentInput,
  ) : async { #ok : Types.Application; #err : Text } {
    switch (AppLib.toggleDocument(applications, input.applicationId, input.documentId, input.isChecked)) {
      case null { #err("Application or document not found") };
      case (?app) { #ok(app) };
    }
  };

  public func addNote(
    applicationId : Nat,
    noteText : Text,
  ) : async { #ok : Types.Application; #err : Text } {
    let noteId = nextNoteId.value;
    nextNoteId.value += 1;
    switch (AppLib.addNote(applications, applicationId, noteText, noteId)) {
      case null { #err("Application not found") };
      case (?app) { #ok(app) };
    }
  };

  public func addCustomDocumentItem(
    applicationId : Nat,
    name : Text,
    category : Text,
  ) : async { #ok : Types.Application; #err : Text } {
    let docId = nextDocId.value;
    nextDocId.value += 1;
    switch (AppLib.addCustomDocument(applications, applicationId, name, category, docId)) {
      case null { #err("Application not found or not of type Other") };
      case (?app) { #ok(app) };
    }
  };

  public func removeCustomDocumentItem(
    applicationId : Nat,
    documentId : Nat,
  ) : async { #ok : Types.Application; #err : Text } {
    switch (AppLib.removeCustomDocument(applications, applicationId, documentId)) {
      case null { #err("Application not found or not of type Other") };
      case (?app) { #ok(app) };
    }
  };

  // ── Dashboard ─────────────────────────────────────────────────────

  public query func getDashboardStats() : async Types.DashboardStats {
    AppLib.getDashboardStats(applications)
  };

  // ── Reports ───────────────────────────────────────────────────────

  public query func getFeesReport(
    filter : Types.ReportFilter,
  ) : async Types.FeesReport {
    AppLib.getFeesReport(applications, filter)
  };

  public query func getRenewalReminders(days : Nat) : async [Types.AppSummary] {
    AppLib.getRenewalReminders(applications, days)
  };

  public query func getApplicationsForReport(
    filter : Types.ReportFilter,
  ) : async [Types.AppSummary] {
    AppLib.getApplicationsForReport(applications, filter)
  };

  // ── Fee templates ─────────────────────────────────────────────────

  public func createFeeTemplate(
    name : Text,
    serviceType : ?Types.ServiceType,
    amount : Nat,
    description : Text,
  ) : async Types.FeeTemplate {
    let id = nextFeeTemplateId.value;
    nextFeeTemplateId.value += 1;
    AppLib.createFeeTemplate(feeTemplates, id, name, serviceType, amount, description)
  };

  public func updateFeeTemplate(
    id : Nat,
    name : ?Text,
    serviceType : ?(?Types.ServiceType),
    amount : ?Nat,
    description : ?Text,
  ) : async ?Types.FeeTemplate {
    AppLib.updateFeeTemplate(feeTemplates, id, name, serviceType, amount, description)
  };

  public func deleteFeeTemplate(id : Nat) : async Bool {
    AppLib.deleteFeeTemplate(feeTemplates, id)
  };

  public query func listFeeTemplates() : async [Types.FeeTemplate] {
    AppLib.listFeeTemplates(feeTemplates)
  };

  // ── Company info ──────────────────────────────────────────────────

  public query func getCompanyInfo() : async Types.CompanyInfo {
    companyInfo.value
  };

  public func setCompanyInfo(info : Types.CompanyInfo) : async () {
    companyInfo.value := info;
  };

  // ── Pharmacist management (per-application) ───────────────────────

  /// Add a pharmacist entry to an application.
  public func addApplicationPharmacist(
    appId      : Nat,
    pharmacist : Types.ApplicationPharmacist,
  ) : async { #ok : Types.Application; #err : Text } {
    AppLib.addApplicationPharmacist(applications, appId, pharmacist)
  };

  /// Update an existing pharmacist entry on an application.
  public func updateApplicationPharmacist(
    appId        : Nat,
    pharmacistId : Text,
    pharmacist   : Types.ApplicationPharmacist,
  ) : async { #ok : Types.Application; #err : Text } {
    AppLib.updateApplicationPharmacist(applications, appId, pharmacistId, pharmacist)
  };

  /// Remove a pharmacist entry from an application.
  public func removeApplicationPharmacist(
    appId        : Nat,
    pharmacistId : Text,
  ) : async { #ok : Types.Application; #err : Text } {
    AppLib.removeApplicationPharmacist(applications, appId, pharmacistId)
  };

  /// Return all pharmacist entries for an application.
  public query func getApplicationPharmacists(
    appId : Nat,
  ) : async { #ok : [Types.ApplicationPharmacist]; #err : Text } {
    AppLib.getApplicationPharmacists(applications, appId)
  };

  // ── Plan Layout management (per-application) ──────────────────────

  /// Set (replace) the plan layout details for an application.
  public func setApplicationPlanLayout(
    appId   : Nat,
    details : Types.PlanLayoutDetails,
  ) : async { #ok : Types.Application; #err : Text } {
    AppLib.setApplicationPlanLayout(applications, appId, details)
  };

  /// Return the plan layout details for an application.
  public query func getApplicationPlanLayout(
    appId : Nat,
  ) : async { #ok : ?Types.PlanLayoutDetails; #err : Text } {
    AppLib.getApplicationPlanLayout(applications, appId)
  };

  // ── Portal Credential management (per-application) ───────────────

  /// Replace the full portal credentials list for an application (by text appId).
  public func updatePortalCredentials(
    appId       : Text,
    credentials : [Types.PortalCredential],
  ) : async { #ok : Types.Application; #err : Text } {
    AppLib.updatePortalCredentials(applications, appId, credentials)
  };

  /// Add a single portal credential to an application.
  public func addPortalCredential(
    appId      : Nat,
    credential : Types.PortalCredential,
  ) : async { #ok : Types.Application; #err : Text } {
    AppLib.addPortalCredential(applications, appId, credential)
  };

  /// Update a single portal credential entry on an application.
  public func updatePortalCredential(
    appId        : Nat,
    credentialId : Text,
    credential   : Types.PortalCredential,
  ) : async { #ok : Types.Application; #err : Text } {
    AppLib.updatePortalCredential(applications, appId, credentialId, credential)
  };

  /// Remove a portal credential entry from an application.
  public func removePortalCredential(
    appId        : Nat,
    credentialId : Text,
  ) : async { #ok : Types.Application; #err : Text } {
    AppLib.removePortalCredential(applications, appId, credentialId)
  };

  /// Return all portal credentials for an application.
  public query func getPortalCredentials(
    appId : Nat,
  ) : async { #ok : [Types.PortalCredential]; #err : Text } {
    AppLib.getPortalCredentials(applications, appId)
  };

};
