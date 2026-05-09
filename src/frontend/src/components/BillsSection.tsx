import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Loader2,
  Minus,
  Plus,
  Printer,
  Receipt,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useBackend } from "../hooks/useBackend";
import type {
  Application,
  Bill,
  BillLineItem,
  CompanyInfo,
  Expense,
  FeeItem,
  Receipt as ReceiptType,
  ServiceCharge,
} from "../types";
import { BillStatus, PaymentMode } from "../types";
import { formatCurrency, formatDate, getServiceTypeLabel } from "../utils";
import {
  printBill,
  printReceipt as printReceiptPdf,
} from "../utils/billTemplates";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function todayInputValue(): string {
  return new Date().toISOString().split("T")[0];
}

function dateToNs(dateStr: string): bigint {
  return BigInt(new Date(dateStr).getTime()) * 1_000_000n;
}

function nsToMs(ns: bigint): number {
  return Number(ns) / 1_000_000;
}

function formatNs(ns: bigint): string {
  const d = new Date(nsToMs(ns));
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function paymentLabel(mode: PaymentMode): string {
  const map: Record<PaymentMode, string> = {
    [PaymentMode.Cash]: "Cash",
    [PaymentMode.Cheque]: "Cheque",
    [PaymentMode.BankTransfer]: "Bank Transfer",
    [PaymentMode.UPI]: "UPI",
    [PaymentMode.Card]: "Card",
    [PaymentMode.Other]: "Other",
  };
  return map[mode] ?? String(mode);
}

function statusBadge(status: BillStatus) {
  if (status === BillStatus.fullyPaid)
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
        Fully Paid
      </Badge>
    );
  if (status === BillStatus.partiallyPaid)
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
        Partial
      </Badge>
    );
  return (
    <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
      Unpaid
    </Badge>
  );
}

function genReceiptNumber(): string {
  const yr = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 9000) + 1000);
  return `RCPT-${yr}-${seq}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface LineItemRow {
  id: number;
  description: string;
  amount: string;
  quantity: string;
}

let _rowId = 0;
function newRow(description = "", amount = "", quantity = "1"): LineItemRow {
  return { id: ++_rowId, description, amount, quantity };
}

// ─── Bill Generate Modal ──────────────────────────────────────────────────────

interface BillModalProps {
  app: Application;
  companyInfo: CompanyInfo;
  feeItems: FeeItem[];
  serviceCharges: ServiceCharge[];
  onClose: () => void;
  onSaved: () => void;
}

function BillGenerateModal({
  app,
  companyInfo,
  feeItems,
  serviceCharges,
  onClose,
  onSaved,
}: BillModalProps) {
  const { createBill } = useBackend();
  const [lineItems, setLineItems] = useState<LineItemRow[]>(() => [newRow()]);
  const [discount, setDiscount] = useState("");
  const [paymentReceived, setPaymentReceived] = useState("");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>(PaymentMode.Cash);
  const [paymentDate, setPaymentDate] = useState(todayInputValue());
  const [selectedFeeItemId, setSelectedFeeItemId] = useState("");
  const [selectedChargeId, setSelectedChargeId] = useState("");

  const subtotal = lineItems.reduce(
    (s, li) =>
      s +
      (Number.parseFloat(li.amount) || 0) * (Number.parseInt(li.quantity) || 1),
    0,
  );
  const discountVal = Number.parseFloat(discount) || 0;
  const total = Math.max(0, subtotal - discountVal);
  const received = Number.parseFloat(paymentReceived) || 0;
  const balance = Math.max(0, total - received);

  const saveMutation = useMutation({
    mutationFn: () => {
      const items: BillLineItem[] = lineItems
        .filter((li) => li.description.trim())
        .map((li) => ({
          description: li.description.trim(),
          amount: Number.parseFloat(li.amount) || 0,
          quantity: BigInt(Number.parseInt(li.quantity) || 1),
        }));
      const dateNs = dateToNs(paymentDate);
      return createBill(app.id, items, received, paymentMode, dateNs);
    },
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      toast.success("Bill saved");
      onSaved();
      onClose();
    },
    onError: () => toast.error("Failed to save bill"),
  });

  function setLI(
    rowId: number,
    field: "description" | "amount" | "quantity",
    val: string,
  ) {
    setLineItems((prev) =>
      prev.map((li) => (li.id === rowId ? { ...li, [field]: val } : li)),
    );
  }

  function addFromFeeItem(id: string) {
    if (!id) return;
    const item = feeItems.find((f) => f.id === id);
    if (!item) return;
    setLineItems((p) => [
      ...p,
      newRow(item.name, String(item.defaultAmount), "1"),
    ]);
    setSelectedFeeItemId("");
  }

  function addFromServiceCharge(idStr: string) {
    if (!idStr) return;
    const charge = serviceCharges.find((c) => c.id.toString() === idStr);
    if (!charge) return;
    setLineItems((p) => [
      ...p,
      newRow(charge.description, String(charge.amount), "1"),
    ]);
    setSelectedChargeId("");
  }

  const allSources = [
    ...feeItems.map((f) => ({
      key: `fee-${f.id}`,
      label: `${f.name} — ₹${f.defaultAmount.toLocaleString("en-IN")}`,
      add: () => addFromFeeItem(f.id),
    })),
    ...serviceCharges.map((c) => ({
      key: `sc-${c.id}`,
      label: `${c.description} — ₹${c.amount.toLocaleString("en-IN")}`,
      add: () => addFromServiceCharge(c.id.toString()),
    })),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
      data-ocid="bills.dialog"
    >
      <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
          <div>
            <h3 className="font-semibold text-foreground">Generate Bill</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {app.businessName} · {getServiceTypeLabel(app.serviceType)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            data-ocid="bills.close_button"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-5 space-y-5">
          {/* Company branding preview */}
          <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="font-bold text-foreground text-sm">
              {companyInfo.name || "Barote Consultancy"}
            </p>
            <p className="text-xs text-muted-foreground">
              {companyInfo.address}
            </p>
          </div>

          {/* Firm info (Bill To) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Bill To (Firm)
              </Label>
              <div className="text-sm font-medium bg-muted/30 rounded px-3 py-2 truncate">
                {app.businessName}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Firm ID</Label>
              <div className="text-sm bg-muted/30 rounded px-3 py-2 truncate">
                {app.firmId || app.applicationId}
              </div>
            </div>
          </div>

          {/* Quick-add from Fee Master / Service Charges */}
          {allSources.length > 0 && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-2">
              <Label className="text-xs font-semibold text-primary uppercase tracking-wide">
                Quick Add from Fee Master
              </Label>
              <Select
                value={selectedFeeItemId || selectedChargeId}
                onValueChange={(val) => {
                  const src = allSources.find((s) => s.key === val);
                  if (src) src.add();
                  setSelectedFeeItemId("");
                  setSelectedChargeId("");
                }}
              >
                <SelectTrigger
                  data-ocid="bills.fee_master.select"
                  className="bg-card"
                >
                  <SelectValue placeholder="Select a fee item to add as line…" />
                </SelectTrigger>
                <SelectContent>
                  {feeItems.length > 0 && (
                    <>
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Fee Master
                      </div>
                      {feeItems.map((f) => (
                        <SelectItem key={`fee-${f.id}`} value={`fee-${f.id}`}>
                          {f.name} — ₹{f.defaultAmount.toLocaleString("en-IN")}
                        </SelectItem>
                      ))}
                    </>
                  )}
                  {serviceCharges.length > 0 && (
                    <>
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-1">
                        Service Charges
                      </div>
                      {serviceCharges.map((c) => (
                        <SelectItem key={`sc-${c.id}`} value={`sc-${c.id}`}>
                          {c.description} — ₹{c.amount.toLocaleString("en-IN")}
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Itemized line items table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-semibold">Itemized Charges</Label>
              <Button
                variant="outline"
                size="sm"
                type="button"
                data-ocid="bills.add_line_item.button"
                onClick={() => setLineItems((p) => [...p, newRow()])}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Line
              </Button>
            </div>

            {/* Column headers */}
            <div className="hidden sm:grid sm:grid-cols-[1fr_90px_70px_80px_32px] gap-1.5 mb-1 text-xs text-muted-foreground px-0.5">
              <span>Description</span>
              <span>Amount (₹)</span>
              <span>Qty</span>
              <span className="text-right">Total</span>
              <span />
            </div>

            <div className="space-y-2">
              {lineItems.map((li, idx) => {
                const lineTotal =
                  (Number.parseFloat(li.amount) || 0) *
                  (Number.parseInt(li.quantity) || 1);
                return (
                  <div
                    key={li.id}
                    className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_90px_70px_80px_32px] gap-1.5 items-center"
                    data-ocid={`bills.line_item.${idx + 1}`}
                  >
                    <Input
                      placeholder="Description"
                      data-ocid={`bills.line_desc.${idx + 1}.input`}
                      value={li.description}
                      onChange={(e) =>
                        setLI(li.id, "description", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Amount"
                      type="number"
                      min="0"
                      className="w-full sm:w-auto"
                      data-ocid={`bills.line_amount.${idx + 1}.input`}
                      value={li.amount}
                      onChange={(e) => setLI(li.id, "amount", e.target.value)}
                    />
                    <Input
                      placeholder="Qty"
                      type="number"
                      min="1"
                      className="w-full sm:w-auto hidden sm:block"
                      data-ocid={`bills.line_qty.${idx + 1}.input`}
                      value={li.quantity}
                      onChange={(e) => setLI(li.id, "quantity", e.target.value)}
                    />
                    <div className="hidden sm:flex items-center justify-end text-sm font-medium text-foreground">
                      {formatCurrency(lineTotal)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      className="shrink-0 text-muted-foreground hover:text-destructive h-9 w-9"
                      data-ocid={`bills.remove_line.${idx + 1}`}
                      onClick={() =>
                        setLineItems((p) => {
                          if (p.length === 1) return p;
                          return p.filter((r) => r.id !== li.id);
                        })
                      }
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Subtotal / Discount / Total */}
            <div className="mt-3 pt-3 border-t border-border space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sub-total</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label className="text-sm text-muted-foreground whitespace-nowrap">
                  Discount (₹)
                </Label>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  className="w-32 text-right"
                  data-ocid="bills.discount.input"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="flex justify-between text-sm font-bold text-foreground pt-1 border-t border-border">
                <span>Grand Total</span>
                <span className="text-primary text-base">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment details */}
          <div className="space-y-3 pt-1">
            <Label className="text-sm font-semibold">Payment Details</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="bill-received" className="text-xs">
                  Amount Received (₹)
                </Label>
                <Input
                  id="bill-received"
                  type="number"
                  min="0"
                  data-ocid="bills.payment_received.input"
                  value={paymentReceived}
                  onChange={(e) => setPaymentReceived(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bill-mode" className="text-xs">
                  Payment Mode
                </Label>
                <Select
                  value={paymentMode}
                  onValueChange={(v) => setPaymentMode(v as PaymentMode)}
                >
                  <SelectTrigger
                    id="bill-mode"
                    data-ocid="bills.payment_mode.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PaymentMode.Cash}>Cash</SelectItem>
                    <SelectItem value={PaymentMode.Cheque}>Cheque</SelectItem>
                    <SelectItem value={PaymentMode.UPI}>UPI</SelectItem>
                    <SelectItem value={PaymentMode.BankTransfer}>
                      Bank Transfer
                    </SelectItem>
                    <SelectItem value={PaymentMode.Card}>Card</SelectItem>
                    <SelectItem value={PaymentMode.Other}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bill-date" className="text-xs">
                  Payment Date
                </Label>
                <Input
                  id="bill-date"
                  type="date"
                  data-ocid="bills.payment_date.input"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
              </div>
            </div>
            <div
              className={`flex items-center justify-between p-3 rounded-lg ${
                balance > 0
                  ? "bg-amber-50 border border-amber-200"
                  : "bg-primary/5 border border-primary/20"
              }`}
            >
              <span className="text-sm font-medium">Balance Pending</span>
              <span
                className={`text-lg font-bold ${
                  balance > 0 ? "text-amber-700" : "text-primary"
                }`}
              >
                {formatCurrency(balance)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 p-5 border-t border-border">
          <Button
            variant="outline"
            type="button"
            data-ocid="bills.cancel_button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            data-ocid="bills.save_button"
            disabled={
              saveMutation.isPending ||
              lineItems.every((li) => !li.description.trim())
            }
            onClick={() => saveMutation.mutate()}
          >
            {saveMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
            ) : null}
            Save Bill
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Receipt Modal ────────────────────────────────────────────────────────────

interface ReceiptModalProps {
  bill: Bill;
  app: Application;
  companyInfo: CompanyInfo;
  onClose: () => void;
  onSaved: () => void;
}

function ReceiptModal({
  bill,
  app,
  companyInfo,
  onClose,
  onSaved,
}: ReceiptModalProps) {
  const { createReceipt, updateBillFromReceipt } = useBackend();
  const [receiptNumber, setReceiptNumber] = useState(genReceiptNumber);
  const [receiptDate, setReceiptDate] = useState(todayInputValue());
  const [amountReceived, setAmountReceived] = useState("");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>(PaymentMode.Cash);
  const [referenceNo, setReferenceNo] = useState("");
  const [remarks, setRemarks] = useState("");
  const [amountError, setAmountError] = useState("");

  const pendingAmount = bill.pendingAmount ?? bill.balancePending ?? 0;
  const alreadyPaid = bill.paidAmount ?? bill.paymentReceived ?? 0;

  const saveMutation = useMutation({
    mutationFn: async (printAfter: boolean) => {
      const amt = Number.parseFloat(amountReceived);
      if (!amt || amt <= 0) throw new Error("Enter a valid amount");
      if (amt > pendingAmount + 0.001)
        throw new Error("Amount exceeds pending balance");

      const dateNs = dateToNs(receiptDate);
      const res = await createReceipt(
        bill.id.toString(),
        app.id.toString(),
        app.businessName,
        app.firmId || app.applicationId,
        dateNs,
        amt,
        paymentMode,
        referenceNo.trim() || null,
        remarks.trim() || null,
      );
      if (res.__kind__ === "err") throw new Error(res.err);

      await updateBillFromReceipt(bill.id);

      if (printAfter) {
        printReceiptPdf(res.ok, bill, app, companyInfo);
      }

      return res.ok;
    },
    onSuccess: (_, printAfter) => {
      toast.success(
        printAfter ? "Receipt saved — opening PDF…" : "Receipt saved",
      );
      onSaved();
      onClose();
    },
    onError: (err: Error) => {
      if (err.message.includes("Amount")) {
        setAmountError(err.message);
      } else {
        toast.error(err.message || "Failed to save receipt");
      }
    },
  });

  function validateAmount(val: string) {
    setAmountReceived(val);
    const amt = Number.parseFloat(val);
    if (amt > pendingAmount + 0.001) {
      setAmountError(
        `Cannot exceed pending amount ${formatCurrency(pendingAmount)}`,
      );
    } else {
      setAmountError("");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
      data-ocid="receipt.dialog"
    >
      <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
          <div>
            <h3 className="font-semibold text-foreground">Generate Receipt</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              For bill {bill.billNumber}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            data-ocid="receipt.close_button"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-5 space-y-4">
          {/* Read-only bill info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-muted/30 rounded p-2.5">
              <span className="text-xs text-muted-foreground block">
                Firm Name
              </span>
              <span className="font-medium">{app.businessName}</span>
            </div>
            <div className="bg-muted/30 rounded p-2.5">
              <span className="text-xs text-muted-foreground block">
                Firm ID
              </span>
              <span className="font-medium">
                {app.firmId || app.applicationId}
              </span>
            </div>
            <div className="bg-muted/30 rounded p-2.5">
              <span className="text-xs text-muted-foreground block">
                Bill No.
              </span>
              <span className="font-medium font-mono">{bill.billNumber}</span>
            </div>
            <div className="bg-muted/30 rounded p-2.5">
              <span className="text-xs text-muted-foreground block">
                Total Bill Amount
              </span>
              <span className="font-medium">
                {formatCurrency(bill.totalAmount)}
              </span>
            </div>
            <div className="bg-muted/30 rounded p-2.5">
              <span className="text-xs text-muted-foreground block">
                Already Paid
              </span>
              <span className="font-medium text-primary">
                {formatCurrency(alreadyPaid)}
              </span>
            </div>
            <div className="bg-muted/30 rounded p-2.5">
              <span className="text-xs text-muted-foreground block">
                Pending Amount
              </span>
              <span className="font-bold text-amber-700">
                {formatCurrency(pendingAmount)}
              </span>
            </div>
          </div>

          {/* Editable fields */}
          <div className="space-y-1.5">
            <Label htmlFor="rcpt-no" className="text-xs">
              Receipt Number
            </Label>
            <Input
              id="rcpt-no"
              data-ocid="receipt.number.input"
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rcpt-date" className="text-xs">
              Receipt Date
            </Label>
            <Input
              id="rcpt-date"
              type="date"
              data-ocid="receipt.date.input"
              value={receiptDate}
              onChange={(e) => setReceiptDate(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rcpt-amount" className="text-xs">
              Amount Received Now (₹)
            </Label>
            <Input
              id="rcpt-amount"
              type="number"
              min="0"
              step="0.01"
              data-ocid="receipt.amount.input"
              value={amountReceived}
              onChange={(e) => validateAmount(e.target.value)}
              className={amountError ? "border-destructive" : ""}
              placeholder={`Max ${formatCurrency(pendingAmount)}`}
            />
            {amountError && (
              <p
                className="text-xs text-destructive mt-1"
                data-ocid="receipt.amount.field_error"
              >
                {amountError}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Payment Mode</Label>
            <Select
              value={paymentMode}
              onValueChange={(v) => setPaymentMode(v as PaymentMode)}
            >
              <SelectTrigger data-ocid="receipt.payment_mode.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PaymentMode.Cash}>Cash</SelectItem>
                <SelectItem value={PaymentMode.Cheque}>Cheque</SelectItem>
                <SelectItem value={PaymentMode.UPI}>UPI</SelectItem>
                <SelectItem value={PaymentMode.BankTransfer}>
                  Bank Transfer
                </SelectItem>
                <SelectItem value={PaymentMode.Other}>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rcpt-ref" className="text-xs">
              Reference No. / Transaction ID (optional)
            </Label>
            <Input
              id="rcpt-ref"
              data-ocid="receipt.reference.input"
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
              placeholder="Cheque no., UPI ref, etc."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rcpt-remarks" className="text-xs">
              Remarks (optional)
            </Label>
            <Input
              id="rcpt-remarks"
              data-ocid="receipt.remarks.input"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Any notes"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 p-5 border-t border-border flex-wrap">
          <Button
            variant="outline"
            type="button"
            data-ocid="receipt.cancel_button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            type="button"
            data-ocid="receipt.save_button"
            disabled={
              saveMutation.isPending || !!amountError || !amountReceived
            }
            onClick={() => saveMutation.mutate(false)}
          >
            {saveMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1" />
            ) : null}
            Save
          </Button>
          <Button
            type="button"
            data-ocid="receipt.save_print_button"
            disabled={
              saveMutation.isPending || !!amountError || !amountReceived
            }
            onClick={() => saveMutation.mutate(true)}
          >
            {saveMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1" />
            ) : (
              <Printer className="w-4 h-4 mr-1" />
            )}
            Save &amp; Print
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Receipt History Row ──────────────────────────────────────────────────────

interface ReceiptHistoryProps {
  bill: Bill;
  app: Application;
  companyInfo: CompanyInfo;
}

function ReceiptHistory({ bill, app, companyInfo }: ReceiptHistoryProps) {
  const { getReceiptsByBill } = useBackend();
  const { data: receipts = [], isLoading } = useQuery<ReceiptType[]>({
    queryKey: ["receipts", bill.id.toString()],
    queryFn: () => getReceiptsByBill(bill.id.toString()),
  });

  if (isLoading)
    return (
      <div className="px-3 pb-3" data-ocid="receipt_history.loading_state">
        <Skeleton className="h-8 w-full rounded" />
      </div>
    );

  if (receipts.length === 0)
    return (
      <div
        className="px-3 pb-3 text-xs text-muted-foreground italic"
        data-ocid="receipt_history.empty_state"
      >
        No receipts yet for this bill.
      </div>
    );

  return (
    <div className="overflow-x-auto px-3 pb-3">
      <table className="w-full text-xs" data-ocid="receipt_history.table">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="text-left pb-1.5 pr-2">Receipt No.</th>
            <th className="text-left pb-1.5 pr-2">Date</th>
            <th className="text-right pb-1.5 pr-2">Amount</th>
            <th className="text-left pb-1.5 pr-2">Mode</th>
            <th className="text-left pb-1.5 pr-2">Ref.</th>
            <th className="pb-1.5" />
          </tr>
        </thead>
        <tbody>
          {receipts.map((r, idx) => (
            <tr
              key={r.id}
              className="border-b border-border/40 last:border-0"
              data-ocid={`receipt_history.item.${idx + 1}`}
            >
              <td className="py-1.5 pr-2 font-mono font-medium text-primary">
                {r.receiptNumber}
              </td>
              <td className="py-1.5 pr-2 text-muted-foreground">
                {formatNs(r.receiptDate)}
              </td>
              <td className="py-1.5 pr-2 text-right font-medium">
                {formatCurrency(r.amountReceived)}
              </td>
              <td className="py-1.5 pr-2 text-muted-foreground">
                {paymentLabel(r.paymentMode)}
              </td>
              <td className="py-1.5 pr-2 text-muted-foreground max-w-[80px] truncate">
                {r.referenceNo ?? "—"}
              </td>
              <td className="py-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="h-7 px-2 text-xs"
                  data-ocid={`receipt_history.print.${idx + 1}`}
                  onClick={() => printReceiptPdf(r, bill, app, companyInfo)}
                >
                  <Printer className="w-3 h-3 mr-1" /> Print
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Bill Row ─────────────────────────────────────────────────────────────────

interface BillRowProps {
  bill: Bill;
  app: Application;
  companyInfo: CompanyInfo;
  idx: number;
  onReceiptSaved: () => void;
}

function BillRow({
  bill,
  app,
  companyInfo,
  idx,
  onReceiptSaved,
}: BillRowProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const isFullyPaid = bill.status === BillStatus.fullyPaid;

  return (
    <>
      <tr
        key={bill.id.toString()}
        className="border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors"
        data-ocid={`bills.item.${idx + 1}`}
      >
        <td className="py-3 pr-2">
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-xs font-medium text-primary">
              {bill.billNumber}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDate(bill.paymentDate)}
            </span>
          </div>
        </td>
        <td className="py-3 pr-2 text-right font-medium text-sm">
          {formatCurrency(bill.totalAmount)}
        </td>
        <td className="py-3 pr-2 text-right text-sm text-primary">
          {formatCurrency(bill.paidAmount ?? bill.paymentReceived)}
        </td>
        <td className="py-3 pr-2 text-right">
          <span
            className={
              (bill.pendingAmount ?? bill.balancePending) > 0
                ? "text-amber-600 font-semibold text-sm"
                : "text-muted-foreground text-sm"
            }
          >
            {formatCurrency(bill.pendingAmount ?? bill.balancePending)}
          </span>
        </td>
        <td className="py-3 pr-2">{statusBadge(bill.status)}</td>
        <td className="py-3">
          <div className="flex items-center justify-end gap-1 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="text-xs h-8 px-2"
              data-ocid={`bills.toggle_history.${idx + 1}`}
              onClick={() => setShowHistory((v) => !v)}
            >
              <Receipt className="w-3 h-3 mr-1" />
              {showHistory ? "Hide" : "History"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="text-xs h-8 px-2"
              data-ocid={`bills.print_bill.${idx + 1}`}
              onClick={() => printBill(bill, app, companyInfo)}
            >
              <Printer className="w-3 h-3 mr-1" /> Bill
            </Button>
            {!isFullyPaid && (
              <Button
                size="sm"
                type="button"
                className="text-xs h-8 px-2"
                data-ocid={`bills.generate_receipt.${idx + 1}`}
                onClick={() => setShowReceiptModal(true)}
              >
                <Plus className="w-3 h-3 mr-1" /> Receipt
              </Button>
            )}
          </div>
        </td>
      </tr>
      {showHistory && (
        <tr className="bg-muted/10">
          <td colSpan={6} className="pt-1">
            <ReceiptHistory bill={bill} app={app} companyInfo={companyInfo} />
          </td>
        </tr>
      )}
      {showReceiptModal && (
        <tr>
          <td colSpan={6}>
            <ReceiptModal
              bill={bill}
              app={app}
              companyInfo={companyInfo}
              onClose={() => setShowReceiptModal(false)}
              onSaved={() => {
                setShowReceiptModal(false);
                onReceiptSaved();
              }}
            />
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Expense Modal ────────────────────────────────────────────────────────────

interface ExpenseModalProps {
  app: Application;
  onClose: () => void;
  onSaved: () => void;
}

function ExpenseModal({ app, onClose, onSaved }: ExpenseModalProps) {
  const { createExpense } = useBackend();
  const [expenseDate, setExpenseDate] = useState(todayInputValue());
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Government");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>(PaymentMode.Cash);
  const [referenceNo, setReferenceNo] = useState("");
  const [notes, setNotes] = useState("");

  const saveMutation = useMutation({
    mutationFn: () => {
      const dateNs = dateToNs(expenseDate);
      return createExpense(
        app.id.toString(),
        dateNs,
        description.trim(),
        category,
        Number.parseFloat(amount) || 0,
        paymentMode,
        referenceNo.trim() || null,
        notes.trim() || null,
      );
    },
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        toast.error(res.err);
        return;
      }
      toast.success("Expense recorded");
      onSaved();
      onClose();
    },
    onError: () => toast.error("Failed to save expense"),
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
      data-ocid="expense.dialog"
    >
      <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
          <h3 className="font-semibold text-foreground">Add Expense</h3>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            data-ocid="expense.close_button"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="exp-date" className="text-xs">
              Date
            </Label>
            <Input
              id="exp-date"
              type="date"
              data-ocid="expense.date.input"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="exp-desc" className="text-xs">
              Description
            </Label>
            <Input
              id="exp-desc"
              data-ocid="expense.description.input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Government licence fee, filing charge…"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger data-ocid="expense.category.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Government">Government</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="exp-amount" className="text-xs">
              Amount (₹)
            </Label>
            <Input
              id="exp-amount"
              type="number"
              min="0"
              data-ocid="expense.amount.input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Payment Mode</Label>
            <Select
              value={paymentMode}
              onValueChange={(v) => setPaymentMode(v as PaymentMode)}
            >
              <SelectTrigger data-ocid="expense.payment_mode.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PaymentMode.Cash}>Cash</SelectItem>
                <SelectItem value={PaymentMode.Cheque}>Cheque</SelectItem>
                <SelectItem value={PaymentMode.UPI}>UPI</SelectItem>
                <SelectItem value={PaymentMode.BankTransfer}>
                  Bank Transfer
                </SelectItem>
                <SelectItem value={PaymentMode.Other}>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="exp-ref" className="text-xs">
              Reference No. (optional)
            </Label>
            <Input
              id="exp-ref"
              data-ocid="expense.reference.input"
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
              placeholder="Challan no., UTR, etc."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="exp-notes" className="text-xs">
              Notes (optional)
            </Label>
            <Input
              id="exp-notes"
              data-ocid="expense.notes.input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 p-5 border-t border-border">
          <Button
            variant="outline"
            type="button"
            data-ocid="expense.cancel_button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            data-ocid="expense.save_button"
            disabled={saveMutation.isPending || !description.trim() || !amount}
            onClick={() => saveMutation.mutate()}
          >
            {saveMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1" />
            ) : null}
            Save Expense
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main BillsSection ────────────────────────────────────────────────────────

interface BillsSectionProps {
  app: Application;
  companyInfo: CompanyInfo;
}

export function BillsSection({ app, companyInfo }: BillsSectionProps) {
  const {
    getBillsByApplication,
    getServiceChargesByServiceType,
    getExpensesByApplication,
    listFeeItems,
  } = useBackend();
  const qc = useQueryClient();
  const [showSection, setShowSection] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const { data: bills = [], isLoading: billsLoading } = useQuery<Bill[]>({
    queryKey: ["bills", app.id.toString()],
    queryFn: () => getBillsByApplication(app.id),
    enabled: showSection,
  });

  const { data: expenses = [], isLoading: expensesLoading } = useQuery<
    Expense[]
  >({
    queryKey: ["expenses", app.id.toString()],
    queryFn: () => getExpensesByApplication(app.id.toString()),
    enabled: showSection,
  });

  const { data: serviceCharges = [] } = useQuery({
    queryKey: ["serviceCharges", app.serviceType],
    queryFn: () => getServiceChargesByServiceType(app.serviceType),
    enabled: showSection,
  });

  const { data: feeItems = [] } = useQuery<FeeItem[]>({
    queryKey: ["feeItems"],
    queryFn: () => listFeeItems(),
    enabled: showSection,
  });

  function invalidate() {
    qc.invalidateQueries({ queryKey: ["bills", app.id.toString()] });
    qc.invalidateQueries({ queryKey: ["expenses", app.id.toString()] });
  }

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <>
      <section className="bg-card border border-border rounded-lg p-6">
        <button
          type="button"
          data-ocid="bills.section.toggle"
          className="flex items-center justify-between w-full text-left"
          onClick={() => setShowSection((v) => !v)}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Bills &amp; Receipts
            {bills.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {bills.length}
              </Badge>
            )}
          </h2>
          {showSection ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {showSection && (
          <div className="mt-4 space-y-6">
            {/* Bills */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Bills</h3>
                <Button
                  size="sm"
                  type="button"
                  data-ocid="bills.generate_bill.button"
                  onClick={() => setShowBillModal(true)}
                >
                  <FileText className="w-3.5 h-3.5 mr-1.5" />
                  Generate Bill
                </Button>
              </div>

              {billsLoading ? (
                <div className="space-y-2" data-ocid="bills.loading_state">
                  <Skeleton className="h-12 w-full rounded" />
                  <Skeleton className="h-12 w-full rounded" />
                </div>
              ) : bills.length === 0 ? (
                <div
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="bills.empty_state"
                >
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No bills generated yet.</p>
                  <p className="text-xs mt-1">
                    Click "Generate Bill" to create one.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-ocid="bills.table">
                    <thead>
                      <tr className="border-b border-border text-xs text-muted-foreground">
                        <th className="text-left pb-2 pr-2">Bill / Date</th>
                        <th className="text-right pb-2 pr-2">Total</th>
                        <th className="text-right pb-2 pr-2">Paid</th>
                        <th className="text-right pb-2 pr-2">Pending</th>
                        <th className="text-left pb-2 pr-2">Status</th>
                        <th className="text-right pb-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bills.map((bill, idx) => (
                        <BillRow
                          key={bill.id.toString()}
                          bill={bill}
                          app={app}
                          companyInfo={companyInfo}
                          idx={idx}
                          onReceiptSaved={() =>
                            qc.invalidateQueries({
                              queryKey: ["bills", app.id.toString()],
                            })
                          }
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Expenses */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Expenses{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    (Govt. / Other Fees Paid)
                  </span>
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  data-ocid="bills.add_expense.button"
                  onClick={() => setShowExpenseModal(true)}
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Add Expense
                </Button>
              </div>

              {expensesLoading ? (
                <Skeleton className="h-10 w-full rounded" />
              ) : expenses.length === 0 ? (
                <div
                  className="text-center py-6 text-muted-foreground"
                  data-ocid="expenses.empty_state"
                >
                  <p className="text-sm">No expenses recorded.</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table
                      className="w-full text-sm"
                      data-ocid="expenses.table"
                    >
                      <thead>
                        <tr className="border-b border-border text-xs text-muted-foreground">
                          <th className="text-left pb-2 pr-2">Date</th>
                          <th className="text-left pb-2 pr-2">Description</th>
                          <th className="text-left pb-2 pr-2">Category</th>
                          <th className="text-right pb-2 pr-2">Amount</th>
                          <th className="text-left pb-2">Mode</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((exp, idx) => (
                          <tr
                            key={exp.id}
                            className="border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors"
                            data-ocid={`expenses.item.${idx + 1}`}
                          >
                            <td className="py-2.5 pr-2 text-muted-foreground text-xs">
                              {formatNs(exp.expenseDate)}
                            </td>
                            <td className="py-2.5 pr-2 max-w-[160px] truncate">
                              {exp.description}
                            </td>
                            <td className="py-2.5 pr-2">
                              <Badge variant="outline" className="text-xs">
                                {exp.category}
                              </Badge>
                            </td>
                            <td className="py-2.5 pr-2 text-right font-medium">
                              {formatCurrency(exp.amount)}
                            </td>
                            <td className="py-2.5 text-muted-foreground text-xs">
                              {paymentLabel(exp.paymentMode)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end mt-2 pt-2 border-t border-border">
                    <span className="text-sm font-semibold">
                      Total Expenses: {formatCurrency(totalExpenses)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </section>

      {showBillModal && (
        <BillGenerateModal
          app={app}
          companyInfo={companyInfo}
          feeItems={feeItems}
          serviceCharges={serviceCharges}
          onClose={() => setShowBillModal(false)}
          onSaved={invalidate}
        />
      )}

      {showExpenseModal && (
        <ExpenseModal
          app={app}
          onClose={() => setShowExpenseModal(false)}
          onSaved={invalidate}
        />
      )}
    </>
  );
}
