import Debug "mo:core/Debug";

module {

  // Role includes all variants for backward compatibility with stored state.
  // Manager and Staff are excluded from the UI but retained here to avoid
  // stable-variable compatibility errors with existing on-chain data.
  public type Role = { #Admin; #Manager; #Staff };

  public type User = {
    id           : Nat;
    username     : Text;
    passwordHash : Text;
    role         : Role;
    displayName  : Text;
    isActive     : Bool;
    createdAt    : Int;
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

  public type CompanyInfo = {
    name    : Text;
    address : Text;
    phone   : Text;
    email   : Text;
  };

};
