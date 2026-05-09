import List    "mo:core/List";
import Map     "mo:core/Map";
import Time    "mo:core/Time";
import Int     "mo:core/Int";
import Text    "mo:core/Text";
import Runtime "mo:core/Runtime";

import AuthTypes  "../types/auth";
import AppTypes   "../types/applications";
import BillingLib "../lib/billing";
import SettingsLib "../lib/settings";

/// Billing mixin.
/// Exposes Bill creation and retrieval per application.
mixin (
  sessions         : Map.Map<Text, AuthTypes.SessionData>,
  bills            : List.List<AppTypes.Bill>,
  receipts         : List.List<AppTypes.Receipt>,
  expenses         : List.List<AppTypes.Expense>,
  feeItems         : List.List<AppTypes.FeeItem>,
  nextBillId       : { var value : Nat },
  nextReceiptSeq   : { var value : Nat },
  nextExpenseSeq   : { var value : Nat },
  billYearCounter  : List.List<(Nat, Nat)>,
  rcptYearCounter  : List.List<(Nat, Nat)>,
) {

  // -------------------------------------------------------------------------
  // Private helpers
  // -------------------------------------------------------------------------

  func requireAdminSession(token : Text) {
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

  func billCurrentYear() : Nat {
    let nowSec : Nat = Int.abs(Time.now() / 1_000_000_000);
    let secondsPerYear : Nat = 365 * 24 * 3600;
    1970 + nowSec / secondsPerYear
  };

  func getBillYearCounter(year : Nat) : Nat {
    switch (billYearCounter.find(func((y, _)) { y == year })) {
      case (?(_, c)) c;
      case null 0;
    }
  };

  func incrementBillYearCounter(year : Nat) : Nat {
    let current = getBillYearCounter(year);
    let next = current + 1;
    var updated = false;
    billYearCounter.mapInPlace(func((y, c)) {
      if (y == year) { updated := true; (y, next) } else { (y, c) }
    });
    if (not updated) {
      billYearCounter.add((year, next));
    };
    next
  };

  // -------------------------------------------------------------------------
  // Receipt / Expense numbering helpers
  // -------------------------------------------------------------------------

  func getRcptYearCounter(year : Nat) : Nat {
    switch (rcptYearCounter.find(func((y, _)) { y == year })) {
      case (?(_, c)) c;
      case null 0;
    }
  };

  func incrementRcptYearCounter(year : Nat) : Nat {
    let current = getRcptYearCounter(year);
    let next = current + 1;
    var updated = false;
    rcptYearCounter.mapInPlace(func((y, c)) {
      if (y == year) { updated := true; (y, next) } else { (y, c) }
    });
    if (not updated) { rcptYearCounter.add((year, next)) };
    next
  };

  func makeReceiptNumber(year : Nat, seq : Nat) : Text {
    let padded = if (seq < 10) "000" # seq.toText()
                 else if (seq < 100) "00" # seq.toText()
                 else if (seq < 1000) "0" # seq.toText()
                 else seq.toText();
    "RCPT-" # year.toText() # "-" # padded
  };

  // -------------------------------------------------------------------------
  // Billing API
  // -------------------------------------------------------------------------

  public func createBill(
    token           : Text,
    applicationId   : Nat,
    lineItems       : [AppTypes.BillLineItem],
    paymentReceived : Float,
    paymentMode     : AppTypes.PaymentMode,
    paymentDate     : Int,
  ) : async { #ok : AppTypes.Bill; #err : Text } {
    requireAdminSession(token);
    let year = billCurrentYear();
    let counter = incrementBillYearCounter(year);
    let id = nextBillId.value;
    nextBillId.value += 1;
    let (bill, _) = BillingLib.createBill(
      bills, id, year, counter,
      applicationId, lineItems, paymentReceived, paymentMode, paymentDate, Time.now(),
    );
    #ok(bill)
  };

  public query func getBillsByApplication(applicationId : Nat) : async [AppTypes.Bill] {
    BillingLib.getBillsByApplication(bills, applicationId)
  };

  public query func getBill(id : Nat) : async ?AppTypes.Bill {
    BillingLib.getBill(bills, id)
  };

  // -------------------------------------------------------------------------
  // Receipt API
  // -------------------------------------------------------------------------

  public func createReceipt(
    token          : Text,
    billId         : Text,
    applicationId  : Text,
    firmName       : Text,
    firmId         : Text,
    receiptDate    : Int,
    amountReceived : Float,
    paymentMode    : AppTypes.PaymentMode,
    referenceNo    : ?Text,
    remarks        : ?Text,
  ) : async { #ok : AppTypes.Receipt; #err : Text } {
    requireAdminSession(token);
    let year = billCurrentYear();
    let seq  = incrementRcptYearCounter(year);
    let rcptNum = makeReceiptNumber(year, seq);
    let idText  = "rcpt-" # Time.now().toText() # "-" # seq.toText();
    let receipt = BillingLib.createReceipt(
      receipts, idText, rcptNum, billId, applicationId,
      firmName, firmId, receiptDate, amountReceived,
      paymentMode, referenceNo, remarks, Time.now(),
    );
    #ok(receipt)
  };

  public query func getReceiptsByBill(billId : Text) : async [AppTypes.Receipt] {
    BillingLib.getReceiptsByBill(receipts, billId)
  };

  public query func getReceiptsByApplication(applicationId : Text) : async [AppTypes.Receipt] {
    BillingLib.getReceiptsByApplication(receipts, applicationId)
  };

  public func updateBillFromReceipt(
    token  : Text,
    billId : Nat,
  ) : async { #ok : AppTypes.Bill; #err : Text } {
    requireAdminSession(token);
    BillingLib.updateBillFromReceipt(bills, billId, receipts)
  };

  // -------------------------------------------------------------------------
  // Expense API
  // -------------------------------------------------------------------------

  public func createExpense(
    token         : Text,
    applicationId : Text,
    expenseDate   : Int,
    description   : Text,
    category      : Text,
    amount        : Float,
    paymentMode   : AppTypes.PaymentMode,
    referenceNo   : ?Text,
    notes         : ?Text,
  ) : async { #ok : AppTypes.Expense; #err : Text } {
    requireAdminSession(token);
    let seq    = nextExpenseSeq.value;
    nextExpenseSeq.value += 1;
    let idText = "exp-" # Time.now().toText() # "-" # seq.toText();
    let expense = BillingLib.createExpense(
      expenses, idText, applicationId, expenseDate,
      description, category, amount, paymentMode,
      referenceNo, notes, Time.now(),
    );
    #ok(expense)
  };

  public query func getExpensesByApplication(applicationId : Text) : async [AppTypes.Expense] {
    BillingLib.getExpensesByApplication(expenses, applicationId)
  };

  // -------------------------------------------------------------------------
  // Ledger API
  // -------------------------------------------------------------------------

  public query func getApplicationLedger(applicationId : Text, appIdNat : Nat) : async [AppTypes.LedgerEntry] {
    BillingLib.getApplicationLedger(bills, receipts, expenses, applicationId, appIdNat)
  };

  // -------------------------------------------------------------------------
  // Monthly Collection API
  // -------------------------------------------------------------------------

  public query func getMonthlyCollection(year : Nat, month : Nat) : async [AppTypes.Receipt] {
    BillingLib.getMonthlyCollection(receipts, year, month)
  };

  // -------------------------------------------------------------------------
  // Fee Item (Fee Master) API
  // -------------------------------------------------------------------------

  public func createFeeItem(
    token         : Text,
    name          : Text,
    description   : ?Text,
    defaultAmount : Float,
    category      : Text,
  ) : async { #ok : AppTypes.FeeItem; #err : Text } {
    requireAdminSession(token);
    let seq    = nextReceiptSeq.value;
    nextReceiptSeq.value += 1;
    let idText = "fee-" # Time.now().toText() # "-" # seq.toText();
    let item = SettingsLib.createFeeItem(
      feeItems, idText, name, description, defaultAmount, category, Time.now(),
    );
    #ok(item)
  };

  public func updateFeeItem(
    token         : Text,
    id            : Text,
    name          : ?Text,
    description   : ??Text,
    defaultAmount : ?Float,
    category      : ?Text,
  ) : async { #ok : AppTypes.FeeItem; #err : Text } {
    requireAdminSession(token);
    SettingsLib.updateFeeItem(feeItems, id, name, description, defaultAmount, category)
  };

  public func deleteFeeItem(
    token : Text,
    id    : Text,
  ) : async { #ok : (); #err : Text } {
    requireAdminSession(token);
    SettingsLib.deleteFeeItem(feeItems, id)
  };

  public query func listFeeItems() : async [AppTypes.FeeItem] {
    SettingsLib.listFeeItems(feeItems)
  };
};
