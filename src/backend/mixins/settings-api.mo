import List    "mo:core/List";
import Map     "mo:core/Map";
import Time    "mo:core/Time";
import Runtime "mo:core/Runtime";

import AuthTypes   "../types/auth";
import AppTypes    "../types/applications";
import SettingsLib "../lib/settings";

/// Settings & Reports mixin.
/// Exposes fee template CRUD, service charge CRUD, master data (Pharmacist / FDA),
/// and report generation.
mixin (
  sessions            : Map.Map<Text, AuthTypes.SessionData>,
  applications        : List.List<AppTypes.Application>,
  serviceCharges      : List.List<AppTypes.ServiceCharge>,
  nextServiceChargeId : { var value : Nat },
  pharmacistStore     : { var value : ?AppTypes.PharmacistDetails },
  fdaOfficeStore      : { var value : ?AppTypes.FdaOfficeDetails },
) {

  // -------------------------------------------------------------------------
  // Private session validation
  // -------------------------------------------------------------------------

  func requireSettingsAdminSession(token : Text) {
    let now = Time.now();
    switch (sessions.get(token)) {
      case null { Runtime.trap("Invalid or expired session") };
      case (?s) {
        if (s.expiresAt < now) {
          sessions.remove(token);
          Runtime.trap("Session expired");
        };
      };
    };
  };

  // -------------------------------------------------------------------------
  // Service Charge API
  // -------------------------------------------------------------------------

  public func createServiceCharge(
    token       : Text,
    serviceType : AppTypes.ServiceType,
    description : Text,
    amount      : Float,
  ) : async { #ok : AppTypes.ServiceCharge; #err : Text } {
    requireSettingsAdminSession(token);
    let (charge, nextId) = SettingsLib.createServiceCharge(
      serviceCharges, nextServiceChargeId.value, serviceType, description, amount
    );
    nextServiceChargeId.value := nextId;
    #ok(charge)
  };

  public func updateServiceCharge(
    token       : Text,
    id          : Nat,
    serviceType : ?AppTypes.ServiceType,
    description : ?Text,
    amount      : ?Float,
  ) : async { #ok : AppTypes.ServiceCharge; #err : Text } {
    requireSettingsAdminSession(token);
    SettingsLib.updateServiceCharge(serviceCharges, id, serviceType, description, amount)
  };

  public func deleteServiceCharge(
    token : Text,
    id    : Nat,
  ) : async { #ok : (); #err : Text } {
    requireSettingsAdminSession(token);
    SettingsLib.deleteServiceCharge(serviceCharges, id)
  };

  public query func listServiceCharges() : async [AppTypes.ServiceCharge] {
    SettingsLib.listServiceCharges(serviceCharges)
  };

  public query func getServiceChargesByServiceType(
    serviceType : AppTypes.ServiceType,
  ) : async [AppTypes.ServiceCharge] {
    SettingsLib.getServiceChargesByServiceType(serviceCharges, serviceType)
  };

  // -------------------------------------------------------------------------
  // Pharmacist Details API
  // -------------------------------------------------------------------------

  public query func getPharmacistDetails() : async ?AppTypes.PharmacistDetails {
    SettingsLib.getPharmacistDetails(pharmacistStore)
  };

  public func setPharmacistDetails(
    token   : Text,
    details : AppTypes.PharmacistDetails,
  ) : async () {
    requireSettingsAdminSession(token);
    SettingsLib.setPharmacistDetails(pharmacistStore, details)
  };

  // -------------------------------------------------------------------------
  // FDA Office Details API
  // -------------------------------------------------------------------------

  public query func getFdaOfficeDetails() : async ?AppTypes.FdaOfficeDetails {
    SettingsLib.getFdaOfficeDetails(fdaOfficeStore)
  };

  public func setFdaOfficeDetails(
    token   : Text,
    details : AppTypes.FdaOfficeDetails,
  ) : async () {
    requireSettingsAdminSession(token);
    SettingsLib.setFdaOfficeDetails(fdaOfficeStore, details)
  };

  // -------------------------------------------------------------------------
  // Report API
  // -------------------------------------------------------------------------

  public query func getApplicationStatusReport(
    filter : AppTypes.ReportFilter,
  ) : async [AppTypes.AppSummary] {
    SettingsLib.getApplicationStatusReport(applications, filter)
  };

  public query func getFeesCollectionReport(
    filter : AppTypes.ReportFilter,
  ) : async AppTypes.FeesReport {
    SettingsLib.getFeesCollectionReport(applications, filter)
  };

  public query func getRenewalRemindersReport(daysAhead : Nat) : async AppTypes.RenewalReport {
    SettingsLib.getRenewalRemindersReport(applications, daysAhead, Time.now())
  };

};
