import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import AppTypes "types/applications";
import AppMixin "mixins/applications-api";
import BillingMixin "mixins/billing-api";
import SettingsMixin "mixins/settings-api";







// ============================================================
//  AUTH DOMAIN
//  Barote Consultancy Workflow — single-actor, auth section
//  Application domain code will be appended below the AUTH
//  DOMAIN END marker in a later composition step.
// ============================================================







actor {

  // ----------------------------------------------------------
  // AUTH: Types
  // ----------------------------------------------------------

  public type Role = { #Admin; #Manager; #Staff };

  public type User = {
    id          : Nat;
    username    : Text;
    passwordHash: Text;
    role        : Role;
    displayName : Text;
    isActive    : Bool;
    createdAt   : Int;
  };

  public type UserPublic = {
    id          : Nat;
    username    : Text;
    role        : Role;
    displayName : Text;
    isActive    : Bool;
  };

  public type UserUpdate = {
    displayName : ?Text;
    role        : ?Role;
    isActive    : ?Bool;
  };

  public type SessionData = {
    userId    : Nat;
    expiresAt : Int;
    role      : Role;
  };

  public type LoginResult = {
    user         : UserPublic;
    sessionToken : Text;
  };

  // ----------------------------------------------------------
  // AUTH: Stable State
  // ----------------------------------------------------------

  // Users list (enhanced orthogonal persistence — no stable keyword needed)
  let users    : List.List<User>              = List.empty<User>();
  var nextUserId : Nat                        = 1;

  // Sessions: token -> SessionData
  let sessions : Map.Map<Text, SessionData>   = Map.empty<Text, SessionData>();

  // 24 hours in nanoseconds
  let SESSION_TTL : Int = 24 * 60 * 60 * 1_000_000_000;

  // ----------------------------------------------------------
  // AUTH: Private Helpers
  // ----------------------------------------------------------

  func userToPublic(u : User) : UserPublic {
    { id = u.id; username = u.username; role = u.role; displayName = u.displayName; isActive = u.isActive }
  };

  // Token = timestamp + userId + username hash.
  // Sufficient uniqueness for an internal single-canister tool.
  func generateToken(userId : Nat, username : Text) : Text {
    let t = Time.now();
    t.toText() # "-" # userId.toText() # "-" # username.size().toText()
  };

  func requireAdmin(token : Text) : SessionData {
    let now = Time.now();
    switch (sessions.get(token)) {
      case null { Runtime.trap("Invalid or expired session") };
      case (?s) {
        if (s.expiresAt < now) {
          sessions.remove(token);
          Runtime.trap("Session expired");
        };
        switch (s.role) {
          case (#Admin) s;
          case (_)      { Runtime.trap("Admin access required") };
        };
      };
    };
  };

  func _requireSession(token : Text) : SessionData {
    let now = Time.now();
    switch (sessions.get(token)) {
      case null { Runtime.trap("Invalid or expired session") };
      case (?s) {
        if (s.expiresAt < now) {
          sessions.remove(token);
          Runtime.trap("Session expired");
        };
        s;
      };
    };
  };

  func purgeExpiredSessions() {
    let now = Time.now();
    // Collect expired keys into an array first to avoid modifying the map while iterating
    let expiredKeys : [Text] = sessions.entries()
      .filter(func((_, s) : (Text, SessionData)) : Bool { s.expiresAt < now })
      .map<(Text, SessionData), Text>(func((k, _) : (Text, SessionData)) : Text { k })
      .toArray();
    for (k in expiredKeys.values()) { sessions.remove(k) };
  };

  // ----------------------------------------------------------
  // AUTH: Public API
  // ----------------------------------------------------------

  /// Returns true when no users have been created yet (first-run setup).
  public query func isFirstRun() : async Bool {
    users.isEmpty()
  };

  /// Create the first Admin account. Fails if any user already exists.
  public func setupAdmin(username : Text, passwordHash : Text, displayName : Text) : async { #ok : UserPublic; #err : Text } {
    if (not users.isEmpty()) {
      return #err("Setup already completed. Admin account exists.");
    };
    if (username.size() < 3) {
      return #err("Username must be at least 3 characters.");
    };
    let user : User = {
      id           = nextUserId;
      username     = username;
      passwordHash = passwordHash;
      role         = #Admin;
      displayName  = displayName;
      isActive     = true;
      createdAt    = Time.now();
    };
    nextUserId += 1;
    users.add(user);
    #ok(userToPublic(user))
  };

  /// Authenticate with username + passwordHash. Returns a session token valid for 24h.
  public func login(username : Text, passwordHash : Text) : async { #ok : LoginResult; #err : Text } {
    purgeExpiredSessions();
    let found = users.find(func(u : User) : Bool {
      u.username == username and u.passwordHash == passwordHash and u.isActive
    });
    switch (found) {
      case null { #err("Invalid username or password.") };
      case (?u) {
        let token = generateToken(u.id, u.username);
        let session : SessionData = {
          userId    = u.id;
          expiresAt = Time.now() + SESSION_TTL;
          role      = u.role;
        };
        sessions.add(token, session);
        #ok({ user = userToPublic(u); sessionToken = token })
      };
    };
  };

  /// Validate an existing session token. Returns null if expired/not found.
  public query func validateSession(token : Text) : async ?SessionData {
    let now = Time.now();
    switch (sessions.get(token)) {
      case null null;
      case (?s) {
        if (s.expiresAt < now) null else ?s
      };
    };
  };

  /// Invalidate a session.
  public func logout(token : Text) : async () {
    sessions.remove(token)
  };

  // ------------------------------------------------------------------
  // AUTH: User CRUD (Admin-only, validated by session token)
  // ------------------------------------------------------------------

  /// Create a new user. Requires Admin session.
  public func createUser(
    token       : Text,
    username    : Text,
    passwordHash: Text,
    role        : Role,
    displayName : Text,
  ) : async { #ok : UserPublic; #err : Text } {
    let _ = requireAdmin(token);
    if (username.size() < 3) {
      return #err("Username must be at least 3 characters.");
    };
    switch (users.find(func(u : User) : Bool { u.username == username })) {
      case (?_) { return #err("Username already taken.") };
      case null {};
    };
    let user : User = {
      id           = nextUserId;
      username     = username;
      passwordHash = passwordHash;
      role         = role;
      displayName  = displayName;
      isActive     = true;
      createdAt    = Time.now();
    };
    nextUserId += 1;
    users.add(user);
    #ok(userToPublic(user))
  };

  /// Update a user's display name, role, or active status. Requires Admin session.
  public func updateUser(
    token   : Text,
    userId  : Nat,
    updates : UserUpdate,
  ) : async { #ok : UserPublic; #err : Text } {
    let _ = requireAdmin(token);
    switch (users.findIndex(func(u : User) : Bool { u.id == userId })) {
      case null { #err("User not found.") };
      case (?idx) {
        let u = users.at(idx);
        let updated : User = {
          u with
          displayName = switch (updates.displayName) { case (?d) d; case null u.displayName };
          role        = switch (updates.role)        { case (?r) r; case null u.role };
          isActive    = switch (updates.isActive)    { case (?a) a; case null u.isActive };
        };
        users.put(idx, updated);
        #ok(userToPublic(updated))
      };
    };
  };

  /// Delete a user. Requires Admin session. Cannot delete yourself.
  public func deleteUser(token : Text, userId : Nat) : async { #ok : (); #err : Text } {
    let session = requireAdmin(token);
    if (session.userId == userId) {
      return #err("Cannot delete your own account.");
    };
    switch (users.findIndex(func(u : User) : Bool { u.id == userId })) {
      case null { #err("User not found.") };
      case (?_idx) {
        // Shift removal: replace with a tombstone-free approach by rebuilding
        // the list minus this element.
        let remaining = users.filter(func(u : User) : Bool { u.id != userId });
        users.clear();
        users.append(remaining);
        #ok(())
      };
    };
  };

  /// List all users. Requires Admin session.
  public func listUsers(token : Text) : async { #ok : [UserPublic]; #err : Text } {
    let _ = requireAdmin(token);
    let result = users.map<User, UserPublic>(func(u) { userToPublic(u) });
    #ok(result.toArray())
  };

  /// Change a user's password. Admin can change any; future: self-change support.
  public func changePassword(
    token          : Text,
    userId         : Nat,
    newPasswordHash: Text,
  ) : async { #ok : (); #err : Text } {
    let _ = requireAdmin(token);
    switch (users.findIndex(func(u : User) : Bool { u.id == userId })) {
      case null { #err("User not found.") };
      case (?idx) {
        let u = users.at(idx);
        users.put(idx, { u with passwordHash = newPasswordHash });
        #ok(())
      };
    };
  };

  /// Recovery endpoint — resets credentials to username='admin' / password='12345' (SHA-256).
  /// No token required: intended for admins who have lost access.
  /// Also clears all active sessions.
  public func resetAdminCredentials() : async { #ok : UserPublic; #err : Text } {
    // SHA-256 of '12345' (no salt), lowercase hex
    let RECOVERY_HASH : Text = "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5";
    let RECOVERY_USERNAME : Text = "admin";
    let RECOVERY_DISPLAY  : Text = "Admin";

    // Clear all sessions unconditionally
    sessions.clear();

    // Case 1: find existing user with username 'admin'
    switch (users.findIndex(func(u : User) : Bool { u.username == RECOVERY_USERNAME })) {
      case (?idx) {
        let u = users.at(idx);
        let updated : User = { u with passwordHash = RECOVERY_HASH; isActive = true };
        users.put(idx, updated);
        #ok(userToPublic(updated))
      };
      case null {
        // Case 2: no 'admin' user — look for any existing admin to update
        switch (users.findIndex(func(u : User) : Bool { u.role == #Admin })) {
          case (?idx) {
            let u = users.at(idx);
            let updated : User = {
              u with
              username     = RECOVERY_USERNAME;
              passwordHash = RECOVERY_HASH;
              displayName  = RECOVERY_DISPLAY;
              isActive     = true;
            };
            users.put(idx, updated);
            #ok(userToPublic(updated))
          };
          case null {
            // Case 3: no users at all — create fresh admin
            let newUser : User = {
              id           = nextUserId;
              username     = RECOVERY_USERNAME;
              passwordHash = RECOVERY_HASH;
              role         = #Admin;
              displayName  = RECOVERY_DISPLAY;
              isActive     = true;
              createdAt    = Time.now();
            };
            nextUserId += 1;
            users.add(newUser);
            #ok(userToPublic(newUser))
          };
        };
      };
    };
  };

  // ============================================================
  //  AUTH DOMAIN END
  //  Application domain code (applications, reports, settings)
  //  will be added below this line in a subsequent compose step.
  // ============================================================

  // ----------------------------------------------------------
  // APPLICATIONS: State
  // ----------------------------------------------------------

  let applications : List.List<AppTypes.Application> = List.empty<AppTypes.Application>();
  let feeTemplates : List.List<AppTypes.FeeTemplate>  = List.empty<AppTypes.FeeTemplate>();
  let appYearCounter : List.List<(Nat, Nat)>           = List.empty<(Nat, Nat)>();

  var _companyInfoVal : AppTypes.CompanyInfo = {
    name       = "Barote Consultancy";
    address    = "";
    phone      = "";
    email      = "";
    fdaAddress = "Assistant Commissioner, Food & Drug Administration (Drug) Buldhana (MH)";
  };
  let companyInfo = { var value = _companyInfoVal };

  let nextAppId         = { var value : Nat = 1 };
  let nextFeeTemplateId = { var value : Nat = 1 };
  let nextDocId         = { var value : Nat = 1 };
  let nextNoteId        = { var value : Nat = 1 };

  // ----------------------------------------------------------
  // BILLING: State
  // ----------------------------------------------------------

  let bills            : List.List<AppTypes.Bill>          = List.empty<AppTypes.Bill>();
  let receipts         : List.List<AppTypes.Receipt>       = List.empty<AppTypes.Receipt>();
  let expenses         : List.List<AppTypes.Expense>       = List.empty<AppTypes.Expense>();
  let feeItems         : List.List<AppTypes.FeeItem>       = List.empty<AppTypes.FeeItem>();
  let billYearCounter  : List.List<(Nat, Nat)>             = List.empty<(Nat, Nat)>();
  let rcptYearCounter  : List.List<(Nat, Nat)>             = List.empty<(Nat, Nat)>();
  let nextBillId       = { var value : Nat = 1 };
  let nextReceiptSeq   = { var value : Nat = 1 };
  let nextExpenseSeq   = { var value : Nat = 1 };

  // ----------------------------------------------------------
  // SETTINGS: Master data & service charges state
  // ----------------------------------------------------------

  let serviceCharges      : List.List<AppTypes.ServiceCharge> = List.empty<AppTypes.ServiceCharge>();
  let nextServiceChargeId = { var value : Nat = 1 };
  let pharmacistStore     = { var value : ?AppTypes.PharmacistDetails = null };
  let fdaOfficeStore      = { var value : ?AppTypes.FdaOfficeDetails  = null };

  // ----------------------------------------------------------
  // Applications mixin
  // ----------------------------------------------------------

  include AppMixin(
    applications,
    feeTemplates,
    companyInfo,
    nextAppId,
    nextFeeTemplateId,
    nextDocId,
    nextNoteId,
    appYearCounter,
  );

  // ----------------------------------------------------------
  // Billing mixin
  // ----------------------------------------------------------

  include BillingMixin(
    sessions,
    bills,
    receipts,
    expenses,
    feeItems,
    nextBillId,
    nextReceiptSeq,
    nextExpenseSeq,
    billYearCounter,
    rcptYearCounter,
  );

  // ----------------------------------------------------------
  // Settings mixin
  // ----------------------------------------------------------

  include SettingsMixin(
    sessions,
    applications,
    serviceCharges,
    nextServiceChargeId,
    pharmacistStore,
    fdaOfficeStore,
  );

}
