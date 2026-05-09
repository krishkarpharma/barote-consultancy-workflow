import Debug  "mo:core/Debug";
import List   "mo:core/List";
import Nat    "mo:core/Nat";
import Int    "mo:core/Int";
import Text   "mo:core/Text";
import Types  "../types/applications";

module {

  // -------------------------------------------------------------------------
  // Bill CRUD
  // -------------------------------------------------------------------------

  /// Create a new Bill for an application. Auto-generates billNumber as BILL-YYYY-NNNN.
  public func createBill(
    bills           : List.List<Types.Bill>,
    nextId          : Nat,
    year            : Nat,
    yearCounter     : Nat,
    applicationId   : Nat,
    lineItems       : [Types.BillLineItem],
    paymentReceived : Float,
    paymentMode     : Types.PaymentMode,
    paymentDate     : Int,
    createdAt       : Int,
  ) : (Types.Bill, Nat) {
    // Pad yearCounter to 4 digits for billNumber
    let padded = if (yearCounter < 10) {
      "000" # yearCounter.toText()
    } else if (yearCounter < 100) {
      "00" # yearCounter.toText()
    } else if (yearCounter < 1000) {
      "0" # yearCounter.toText()
    } else {
      yearCounter.toText()
    };

    let billNumber = "BILL-" # year.toText() # "-" # padded;

    // Calculate totalAmount as sum of all lineItem amounts
    var totalAmount : Float = 0.0;
    for (item in lineItems.vals()) {
      totalAmount += item.amount * item.quantity.toFloat();
    };

    let balancePending : Float = totalAmount - paymentReceived;

    let newBill : Types.Bill = {
      id              = nextId;
      applicationId   = applicationId;
      billNumber      = billNumber;
      lineItems       = lineItems;
      totalAmount     = totalAmount;
      paymentReceived = paymentReceived;
      paymentMode     = paymentMode;
      paymentDate     = paymentDate;
      balancePending  = balancePending;
      paidAmount      = paymentReceived;
      pendingAmount   = balancePending;
      status          = if (balancePending <= 0.0) #fullyPaid
                        else if (paymentReceived > 0.0) #partiallyPaid
                        else #unpaid;
      createdAt       = createdAt;
    };

    bills.add(newBill);
    (newBill, nextId + 1)
  };

  /// Return all Bills for a given applicationId.
  public func getBillsByApplication(
    bills         : List.List<Types.Bill>,
    applicationId : Nat,
  ) : [Types.Bill] {
    bills.filter(func(b : Types.Bill) : Bool { b.applicationId == applicationId }).toArray()
  };

  /// Return a single Bill by its id.
  public func getBill(
    bills : List.List<Types.Bill>,
    id    : Nat,
  ) : ?Types.Bill {
    bills.find(func(b : Types.Bill) : Bool { b.id == id })
  };

  // -------------------------------------------------------------------------
  // Receipt CRUD
  // -------------------------------------------------------------------------

  /// Create a receipt and link it to its bill. Auto-generates receiptNumber RCPT-YYYY-NNNN.
  public func createReceipt(
    receipts       : List.List<Types.Receipt>,
    idText         : Text,
    receiptNumber  : Text,
    billId         : Text,
    applicationId  : Text,
    firmName       : Text,
    firmId         : Text,
    receiptDate    : Int,
    amountReceived : Float,
    paymentMode    : Types.PaymentMode,
    referenceNo    : ?Text,
    remarks        : ?Text,
    createdAt      : Int,
  ) : Types.Receipt {
    let receipt : Types.Receipt = {
      id             = idText;
      receiptNumber  = receiptNumber;
      billId         = billId;
      applicationId  = applicationId;
      firmName       = firmName;
      firmId         = firmId;
      receiptDate    = receiptDate;
      amountReceived = amountReceived;
      paymentMode    = paymentMode;
      referenceNo    = referenceNo;
      remarks        = remarks;
      createdAt      = createdAt;
    };
    receipts.add(receipt);
    receipt
  };

  /// Return all receipts linked to a specific bill (by billId Text).
  public func getReceiptsByBill(
    receipts : List.List<Types.Receipt>,
    billId   : Text,
  ) : [Types.Receipt] {
    receipts.filter(func(r : Types.Receipt) : Bool { r.billId == billId }).toArray()
  };

  /// Return all receipts for a given applicationId (as Text).
  public func getReceiptsByApplication(
    receipts      : List.List<Types.Receipt>,
    applicationId : Text,
  ) : [Types.Receipt] {
    receipts.filter(func(r : Types.Receipt) : Bool { r.applicationId == applicationId }).toArray()
  };

  /// Recalculate paidAmount / pendingAmount / status on a Bill from all its receipts.
  /// Mutates the bill in the list in-place.
  public func updateBillFromReceipt(
    bills    : List.List<Types.Bill>,
    billId   : Nat,
    receipts : List.List<Types.Receipt>,
  ) : { #ok : Types.Bill; #err : Text } {
    switch (bills.findIndex(func(b : Types.Bill) : Bool { b.id == billId })) {
      case null { #err("Bill not found.") };
      case (?idx) {
        let bill = bills.at(idx);
        // Sum all receipts linked to this bill (billId stored as Text in receipts)
        let billIdText = billId.toText();
        var paid : Float = 0.0;
        receipts.forEach(func(r : Types.Receipt) {
          if (r.billId == billIdText or r.billId == bill.billNumber) {
            paid += r.amountReceived;
          };
        });
        let pending : Float = bill.totalAmount - paid;
        let newStatus : Types.BillStatus =
          if (pending <= 0.0)   #fullyPaid
          else if (paid > 0.0)  #partiallyPaid
          else                   #unpaid;
        let updated : Types.Bill = {
          bill with
          paidAmount    = paid;
          pendingAmount = pending;
          status        = newStatus;
        };
        bills.put(idx, updated);
        #ok(updated)
      };
    }
  };

  // -------------------------------------------------------------------------
  // Expense CRUD
  // -------------------------------------------------------------------------

  /// Record a government-fee or other expense against an application.
  public func createExpense(
    expenses      : List.List<Types.Expense>,
    idText        : Text,
    applicationId : Text,
    expenseDate   : Int,
    description   : Text,
    category      : Text,
    amount        : Float,
    paymentMode   : Types.PaymentMode,
    referenceNo   : ?Text,
    notes         : ?Text,
    createdAt     : Int,
  ) : Types.Expense {
    let expense : Types.Expense = {
      id            = idText;
      applicationId = applicationId;
      expenseDate   = expenseDate;
      description   = description;
      category      = category;
      amount        = amount;
      paymentMode   = paymentMode;
      referenceNo   = referenceNo;
      notes         = notes;
      createdAt     = createdAt;
    };
    expenses.add(expense);
    expense
  };

  /// Return all expenses for a given applicationId (as Text).
  public func getExpensesByApplication(
    expenses      : List.List<Types.Expense>,
    applicationId : Text,
  ) : [Types.Expense] {
    expenses.filter(func(e : Types.Expense) : Bool { e.applicationId == applicationId }).toArray()
  };

  // -------------------------------------------------------------------------
  // Ledger
  // -------------------------------------------------------------------------

  /// Build a full ledger for one application from its bills, receipts, and expenses,
  /// sorted ascending by date.
  public func getApplicationLedger(
    bills         : List.List<Types.Bill>,
    receipts      : List.List<Types.Receipt>,
    expenses      : List.List<Types.Expense>,
    applicationId : Text,
    appIdNat      : Nat,
  ) : [Types.LedgerEntry] {
    let entries = List.empty<Types.LedgerEntry>();

    // Bills — debit entries
    bills.forEach(func(b : Types.Bill) {
      if (b.applicationId == appIdNat) {
        let desc = "Bill: " # b.billNumber # " (" # b.lineItems.size().toText() # " items)";
        entries.add({
          date            = b.createdAt;
          transactionType = "Bill";
          description     = desc;
          debit           = b.totalAmount;
          credit          = 0.0;
          reference       = b.billNumber;
          applicationId   = applicationId;
        });
      };
    });

    // Receipts — credit entries
    receipts.forEach(func(r : Types.Receipt) {
      if (r.applicationId == applicationId) {
        entries.add({
          date            = r.receiptDate;
          transactionType = "Receipt";
          description     = "Receipt: " # r.receiptNumber;
          debit           = 0.0;
          credit          = r.amountReceived;
          reference       = r.receiptNumber;
          applicationId   = applicationId;
        });
      };
    });

    // Expenses — debit entries
    expenses.forEach(func(e : Types.Expense) {
      if (e.applicationId == applicationId) {
        entries.add({
          date            = e.expenseDate;
          transactionType = "Expense";
          description     = e.description;
          debit           = e.amount;
          credit          = 0.0;
          reference       = e.id;
          applicationId   = applicationId;
        });
      };
    });

    // Sort ascending by date
    entries.sortInPlace(func(a : Types.LedgerEntry, b : Types.LedgerEntry) : { #less; #equal; #greater } {
      Int.compare(a.date, b.date)
    });

    entries.toArray()
  };

  // -------------------------------------------------------------------------
  // Monthly Collection
  // -------------------------------------------------------------------------

  /// Return all receipts whose receiptDate falls within the given calendar month (year/month).
  /// month is 1-indexed (1 = January .. 12 = December).
  public func getMonthlyCollection(
    receipts : List.List<Types.Receipt>,
    year     : Nat,
    month    : Nat,
  ) : [Types.Receipt] {
    // Days per month (non-leap year approximation)
    func daysFor(m : Nat) : Int {
      switch (m) {
        case 1  31; case 2  28; case 3  31;
        case 4  30; case 5  31; case 6  30;
        case 7  31; case 8  31; case 9  30;
        case 10 31; case 11 30; case 12 31;
        case _  30;
      }
    };

    // Approximate seconds from Unix epoch to Jan 1 of target year
    let yearsFrom1970 : Int = year.toInt() - 1970;
    let yearStartSec  : Int = yearsFrom1970 * 365 * 24 * 3600;

    // Accumulate days for all months before the target month
    var daysBeforeMonth : Int = 0;
    var idx : Nat = 1;
    while (idx < month) {
      daysBeforeMonth += daysFor(idx);
      idx += 1;
    };

    let monthStartSec : Int = yearStartSec + daysBeforeMonth * 24 * 3600;
    let monthEndSec   : Int = monthStartSec + daysFor(month) * 24 * 3600;

    let startNs : Int = monthStartSec * 1_000_000_000;
    let endNs   : Int = monthEndSec   * 1_000_000_000;

    receipts.filter(func(r : Types.Receipt) : Bool {
      r.receiptDate >= startNs and r.receiptDate < endNs
    }).toArray()
  };

};

