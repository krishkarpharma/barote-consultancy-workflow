import List    "mo:core/List";
import Int     "mo:core/Int";

import Types   "../types/applications";

module {

  // -------------------------------------------------------------------------
  // Fee Template CRUD
  // -------------------------------------------------------------------------

  /// Create a new FeeTemplate. Returns the new template and the next ID counter.
  public func createFeeTemplate(
    templates   : List.List<Types.FeeTemplate>,
    nextId      : Nat,
    name        : Text,
    serviceType : ?Types.ServiceType,
    amount      : Nat,
    description : Text,
  ) : (Types.FeeTemplate, Nat) {
    let tpl : Types.FeeTemplate = {
      id          = nextId;
      name        = name;
      serviceType = serviceType;
      amount      = amount;
      description = description;
    };
    templates.add(tpl);
    (tpl, nextId + 1)
  };

  /// Update an existing FeeTemplate by id.
  public func updateFeeTemplate(
    templates   : List.List<Types.FeeTemplate>,
    id          : Nat,
    name        : ?Text,
    serviceType : ??Types.ServiceType,
    amount      : ?Nat,
    description : ?Text,
  ) : { #ok : Types.FeeTemplate; #err : Text } {
    switch (templates.findIndex(func(t : Types.FeeTemplate) : Bool { t.id == id })) {
      case null { #err("Fee template not found.") };
      case (?idx) {
        let t = templates.at(idx);
        let updated : Types.FeeTemplate = {
          t with
          name        = switch (name)        { case (?v) v; case null t.name };
          serviceType = switch (serviceType) { case (?v) v; case null t.serviceType };
          amount      = switch (amount)      { case (?v) v; case null t.amount };
          description = switch (description) { case (?v) v; case null t.description };
        };
        templates.put(idx, updated);
        #ok(updated)
      };
    };
  };

  /// Delete a FeeTemplate by id.
  public func deleteFeeTemplate(
    templates : List.List<Types.FeeTemplate>,
    id        : Nat,
  ) : { #ok : (); #err : Text } {
    switch (templates.findIndex(func(t : Types.FeeTemplate) : Bool { t.id == id })) {
      case null { #err("Fee template not found.") };
      case (?_) {
        let remaining = templates.filter(func(t : Types.FeeTemplate) : Bool { t.id != id });
        templates.clear();
        templates.append(remaining);
        #ok(())
      };
    };
  };

  /// Return all fee templates as an immutable array.
  public func listFeeTemplates(templates : List.List<Types.FeeTemplate>) : [Types.FeeTemplate] {
    templates.toArray()
  };

  /// Return a single fee template by id.
  public func getFeeTemplate(templates : List.List<Types.FeeTemplate>, id : Nat) : ?Types.FeeTemplate {
    templates.find(func(t : Types.FeeTemplate) : Bool { t.id == id })
  };

  // -------------------------------------------------------------------------
  // Private helper — Application → AppSummary
  // -------------------------------------------------------------------------

  func toSummary(app : Types.Application) : Types.AppSummary {
    {
      id                     = app.id;
      applicationId          = app.applicationId;
      firmId                 = app.firmId;
      businessName           = app.businessName;
      proprietorName         = app.proprietorName;
      serviceType            = app.serviceType;
      status                 = app.status;
      expectedCompletionDate = app.expectedCompletionDate;
      renewalDate            = app.renewalDate;
      amountPending          = app.amountPending;
      updatedAt              = app.updatedAt;
    }
  };

  /// Check whether an application matches a ReportFilter (date range + optional service/status).
  func matchesFilter(app : Types.Application, filter : Types.ReportFilter) : Bool {
    // Service type filter
    switch (filter.serviceType) {
      case (?st) { if (app.serviceType != st) { return false } };
      case null  {};
    };
    // Status filter
    switch (filter.status) {
      case (?s) { if (app.status != s) { return false } };
      case null {};
    };
    // Date range filter (based on applicationDate)
    switch (filter.dateFrom) {
      case (?from) { if (app.applicationDate < from) { return false } };
      case null    {};
    };
    switch (filter.dateTo) {
      case (?to) { if (app.applicationDate > to) { return false } };
      case null  {};
    };
    true
  };

  // -------------------------------------------------------------------------
  // Report Functions
  // -------------------------------------------------------------------------

  /// Application Status Report — return summaries matching the filter.
  public func getApplicationStatusReport(
    applications : List.List<Types.Application>,
    filter       : Types.ReportFilter,
  ) : [Types.AppSummary] {
    applications
      .filter(func(app : Types.Application) : Bool { matchesFilter(app, filter) })
      .map<Types.Application, Types.AppSummary>(func(app) { toSummary(app) })
      .toArray()
  };

  /// Fees Collection Report — aggregate totals across filtered applications.
  public func getFeesCollectionReport(
    applications : List.List<Types.Application>,
    filter       : Types.ReportFilter,
  ) : Types.FeesReport {
    let filtered = applications.filter(func(app : Types.Application) : Bool { matchesFilter(app, filter) });

    var totalBilled    : Nat = 0;
    var totalCollected : Nat = 0;
    var totalPending   : Nat = 0;

    filtered.forEach(func(app : Types.Application) {
      totalBilled    += app.totalFees;
      totalCollected += app.amountCollected;
      totalPending   += app.amountPending;
    });

    let summaries = filtered
      .map<Types.Application, Types.AppSummary>(func(app) { toSummary(app) })
      .toArray();

    {
      totalBilled    = totalBilled;
      totalCollected = totalCollected;
      totalPending   = totalPending;
      applications   = summaries;
    }
  };

  /// Renewal Reminders Report — apps whose renewalDate falls within daysAhead days from now,
  /// sorted ascending by renewalDate.
  public func getRenewalRemindersReport(
    applications : List.List<Types.Application>,
    daysAhead    : Nat,
    now          : Int,
  ) : Types.RenewalReport {
    let windowNs : Int = daysAhead.toInt() * 24 * 60 * 60 * 1_000_000_000;
    let cutoff   : Int = now + windowNs;

    let matching = applications.filter(func(app : Types.Application) : Bool {
      switch (app.renewalDate) {
        case null    { false };
        case (?rd)   { rd >= now and rd <= cutoff };
      }
    });

    // Sort ascending by renewalDate (null already filtered out)
    let sorted = matching.sort(func(a : Types.Application, b : Types.Application) : { #less; #equal; #greater } {
      let ra = switch (a.renewalDate) { case (?d) d; case null 0 };
      let rb = switch (b.renewalDate) { case (?d) d; case null 0 };
      Int.compare(ra, rb)
    });

    let summaries = sorted
      .map<Types.Application, Types.AppSummary>(func(app) { toSummary(app) })
      .toArray();

    { applications = summaries }
  };

  // -------------------------------------------------------------------------
  // Fee Master (FeeItem) CRUD
  // -------------------------------------------------------------------------

  /// Create a new FeeItem in the Fee Master. Returns the created item.
  public func createFeeItem(
    feeItems      : List.List<Types.FeeItem>,
    idText        : Text,
    name          : Text,
    description   : ?Text,
    defaultAmount : Float,
    category      : Text,
    createdAt     : Int,
  ) : Types.FeeItem {
    let item : Types.FeeItem = {
      id            = idText;
      name          = name;
      description   = description;
      defaultAmount = defaultAmount;
      category      = category;
      createdAt     = createdAt;
    };
    feeItems.add(item);
    item
  };

  /// Update an existing FeeItem by id.
  public func updateFeeItem(
    feeItems      : List.List<Types.FeeItem>,
    id            : Text,
    name          : ?Text,
    description   : ??Text,
    defaultAmount : ?Float,
    category      : ?Text,
  ) : { #ok : Types.FeeItem; #err : Text } {
    switch (feeItems.findIndex(func(f : Types.FeeItem) : Bool { f.id == id })) {
      case null { #err("Fee item not found.") };
      case (?idx) {
        let f = feeItems.at(idx);
        let updated : Types.FeeItem = {
          f with
          name          = switch (name)          { case (?v) v; case null f.name };
          description   = switch (description)   { case (?v) v; case null f.description };
          defaultAmount = switch (defaultAmount) { case (?v) v; case null f.defaultAmount };
          category      = switch (category)      { case (?v) v; case null f.category };
        };
        feeItems.put(idx, updated);
        #ok(updated)
      };
    }
  };

  /// Delete a FeeItem by id.
  public func deleteFeeItem(
    feeItems : List.List<Types.FeeItem>,
    id       : Text,
  ) : { #ok : (); #err : Text } {
    switch (feeItems.findIndex(func(f : Types.FeeItem) : Bool { f.id == id })) {
      case null { #err("Fee item not found.") };
      case (?_) {
        let remaining = feeItems.filter(func(f : Types.FeeItem) : Bool { f.id != id });
        feeItems.clear();
        feeItems.append(remaining);
        #ok(())
      };
    }
  };

  /// Return all FeeItems as an immutable array.
  public func listFeeItems(feeItems : List.List<Types.FeeItem>) : [Types.FeeItem] {
    feeItems.toArray()
  };

  // -------------------------------------------------------------------------
  // Service Charge CRUD
  // -------------------------------------------------------------------------

  /// Create a new ServiceCharge. Returns the new charge and the next ID counter.
  public func createServiceCharge(
    charges     : List.List<Types.ServiceCharge>,
    nextId      : Nat,
    serviceType : Types.ServiceType,
    description : Text,
    amount      : Float,
  ) : (Types.ServiceCharge, Nat) {
    let charge : Types.ServiceCharge = {
      id          = nextId;
      serviceType = serviceType;
      description = description;
      amount      = amount;
    };
    charges.add(charge);
    (charge, nextId + 1)
  };

  /// Update an existing ServiceCharge by id.
  public func updateServiceCharge(
    charges     : List.List<Types.ServiceCharge>,
    id          : Nat,
    serviceType : ?Types.ServiceType,
    description : ?Text,
    amount      : ?Float,
  ) : { #ok : Types.ServiceCharge; #err : Text } {
    switch (charges.findIndex(func(c : Types.ServiceCharge) : Bool { c.id == id })) {
      case null { #err("Service charge not found.") };
      case (?idx) {
        let c = charges.at(idx);
        let updated : Types.ServiceCharge = {
          c with
          serviceType = switch (serviceType) { case (?v) v; case null c.serviceType };
          description = switch (description) { case (?v) v; case null c.description };
          amount      = switch (amount)      { case (?v) v; case null c.amount };
        };
        charges.put(idx, updated);
        #ok(updated)
      };
    };
  };

  /// Delete a ServiceCharge by id.
  public func deleteServiceCharge(
    charges : List.List<Types.ServiceCharge>,
    id      : Nat,
  ) : { #ok : (); #err : Text } {
    switch (charges.findIndex(func(c : Types.ServiceCharge) : Bool { c.id == id })) {
      case null { #err("Service charge not found.") };
      case (?_) {
        let remaining = charges.filter(func(c : Types.ServiceCharge) : Bool { c.id != id });
        charges.clear();
        charges.append(remaining);
        #ok(())
      };
    };
  };

  /// Return all service charges as an immutable array.
  public func listServiceCharges(charges : List.List<Types.ServiceCharge>) : [Types.ServiceCharge] {
    charges.toArray()
  };

  /// Return all service charges for a specific service type.
  public func getServiceChargesByServiceType(
    charges     : List.List<Types.ServiceCharge>,
    serviceType : Types.ServiceType,
  ) : [Types.ServiceCharge] {
    charges.filter(func(c : Types.ServiceCharge) : Bool { c.serviceType == serviceType }).toArray()
  };

  // -------------------------------------------------------------------------
  // Pharmacist Details (single-record storage)
  // -------------------------------------------------------------------------

  /// Return the stored PharmacistDetails, if any.
  public func getPharmacistDetails(
    store : { var value : ?Types.PharmacistDetails },
  ) : ?Types.PharmacistDetails {
    store.value
  };

  /// Persist PharmacistDetails.
  public func setPharmacistDetails(
    store   : { var value : ?Types.PharmacistDetails },
    details : Types.PharmacistDetails,
  ) {
    store.value := ?details
  };

  // -------------------------------------------------------------------------
  // FDA Office Details (single-record storage)
  // -------------------------------------------------------------------------

  /// Return the stored FdaOfficeDetails, if any.
  public func getFdaOfficeDetails(
    store : { var value : ?Types.FdaOfficeDetails },
  ) : ?Types.FdaOfficeDetails {
    store.value
  };

  /// Persist FdaOfficeDetails.
  public func setFdaOfficeDetails(
    store   : { var value : ?Types.FdaOfficeDetails },
    details : Types.FdaOfficeDetails,
  ) {
    store.value := ?details
  };

};
