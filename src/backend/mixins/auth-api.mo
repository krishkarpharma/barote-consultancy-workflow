import Debug "mo:core/Debug";
import List "mo:core/List";
import Map "mo:core/Map";
import Result "mo:core/Result";
import Time "mo:core/Time";
import Types "../types/auth";
import AuthLib "../lib/auth";

// Auth mixin — receives only the state slices it needs.
mixin (
  users       : List.List<Types.User>,
  sessions    : Map.Map<Text, Types.SessionData>,
  nextUserId  : Nat,
  companyInfo : Types.CompanyInfo,
) {

  /// Returns true if no users have been created yet (triggers first-run setup screen).
  public func isFirstRun() : async Bool {
    Debug.todo()
  };

  /// Create the initial Admin account. Fails if any user already exists.
  public func setupAdmin(
    username     : Text,
    passwordHash : Text,
    displayName  : Text,
  ) : async Result.Result<Types.UserPublic, Text> {
    Debug.todo()
  };

  /// Authenticate with username + passwordHash. Returns session token valid for 24 h.
  public func login(
    username     : Text,
    passwordHash : Text,
  ) : async Result.Result<Types.LoginResult, Text> {
    Debug.todo()
  };

  /// Validate an existing session token. Returns session data or null if expired/missing.
  public query func validateSession(token : Text) : async ?Types.SessionData {
    Debug.todo()
  };

  /// Invalidate a session (log out).
  public func logout(token : Text) : async () {
    Debug.todo()
  };

  /// Change password. Admin provides current password for self-service; requires active session.
  public func changePassword(
    token           : Text,
    currentPassword : Text,
    newPasswordHash : Text,
  ) : async Result.Result<(), Text> {
    Debug.todo()
  };

  // ----------------------------------------------------------------
  // User CRUD (Admin-only, gated by session token)
  // ----------------------------------------------------------------

  /// Create a new Admin user. Requires Admin session.
  public func createUser(
    token        : Text,
    username     : Text,
    passwordHash : Text,
    displayName  : Text,
  ) : async Result.Result<Types.UserPublic, Text> {
    Debug.todo()
  };

  /// Update a user's display name or active status. Requires Admin session.
  public func updateUser(
    token   : Text,
    userId  : Nat,
    updates : Types.UserUpdate,
  ) : async Result.Result<Types.UserPublic, Text> {
    Debug.todo()
  };

  /// Delete a user. Requires Admin session. Cannot delete own account.
  public func deleteUser(token : Text, userId : Nat) : async Result.Result<(), Text> {
    Debug.todo()
  };

  /// List all users. Requires Admin session.
  public func listUsers(token : Text) : async Result.Result<[Types.UserPublic], Text> {
    Debug.todo()
  };

  // ----------------------------------------------------------------
  // Company Info
  // ----------------------------------------------------------------

  /// Return stored company info (name, address, phone, email).
  public query func getCompanyInfo() : async Types.CompanyInfo {
    Debug.todo()
  };

  /// Update company info. Requires Admin session.
  public func updateCompanyInfo(
    token   : Text,
    newInfo : Types.CompanyInfo,
  ) : async Result.Result<Types.CompanyInfo, Text> {
    Debug.todo()
  };

};
