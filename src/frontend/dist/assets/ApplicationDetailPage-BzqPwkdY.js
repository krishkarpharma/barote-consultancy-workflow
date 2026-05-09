import { c as createLucideIcon, d as useQueryClient, r as reactExports, j as jsxRuntimeExports, B as Button, F as FileText, f as BillStatus, P as PaymentMode, X, L as Label, I as Input, S as ServiceType, U as User, g as Primitive, a as cn, h as useParams, b as useNavigate, A as ApplicationStatus, E as EyeOff, i as Eye } from "./index-BaKwMJOS.js";
import { R as Receipt, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter, A as AlertDialog, e as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, h as AlertDialogDescription, i as AlertDialogFooter, j as AlertDialogCancel, k as AlertDialogAction, l as AlertDialogTrigger, T as Textarea, P as Pencil } from "./dialog-ClEKZtoU.js";
import { B as Badge } from "./badge-BNst8HUv.js";
import { C as Checkbox } from "./checkbox-CqrHZUDl.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Cd_o80Bj.js";
import { S as Skeleton } from "./skeleton-Dj-iI3Sb.js";
import { u as useQuery } from "./useQuery-8ND6lXoR.js";
import { u as useMutation, a as ue, T as Trash2 } from "./index-BwOopk-B.js";
import { u as useBackend } from "./useBackend-CAwnRSrn.js";
import { f as formatCurrency, a as formatDate, g as getServiceTypeLabel, b as formatDateTime } from "./index-Cd6EN6bb.js";
import { p as printBill, a as printReceipt } from "./billTemplates-BvlAwhqh.js";
import { C as ChevronUp, a as ChevronDown, b as Check } from "./index-CaVeNIJ0.js";
import { P as Plus } from "./plus-BoDfY95M.js";
import { L as LoaderCircle } from "./loader-circle-CZdGrW1W.js";
import { S as StatusBadge } from "./StatusBadge-C64VtDF7.js";
import { A as ArrowLeft, S as Save } from "./save-CiVTqYf2.js";
import "./index-MAa7LfqA.js";
import "./index-Bz9Vyaf-.js";
import "./index-Dj7rYGXi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode);
function todayInputValue() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function dateToNs(dateStr) {
  return BigInt(new Date(dateStr).getTime()) * 1000000n;
}
function nsToMs(ns) {
  return Number(ns) / 1e6;
}
function formatNs(ns) {
  const d = new Date(nsToMs(ns));
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}
function paymentLabel(mode) {
  const map = {
    [PaymentMode.Cash]: "Cash",
    [PaymentMode.Cheque]: "Cheque",
    [PaymentMode.BankTransfer]: "Bank Transfer",
    [PaymentMode.UPI]: "UPI",
    [PaymentMode.Card]: "Card",
    [PaymentMode.Other]: "Other"
  };
  return map[mode] ?? String(mode);
}
function statusBadge(status) {
  if (status === BillStatus.fullyPaid)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-green-200 text-xs", children: "Fully Paid" });
  if (status === BillStatus.partiallyPaid)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-100 text-amber-700 border-amber-200 text-xs", children: "Partial" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border-red-200 text-xs", children: "Unpaid" });
}
function genReceiptNumber() {
  const yr = (/* @__PURE__ */ new Date()).getFullYear();
  const seq = String(Math.floor(Math.random() * 9e3) + 1e3);
  return `RCPT-${yr}-${seq}`;
}
let _rowId = 0;
function newRow(description = "", amount = "", quantity = "1") {
  return { id: ++_rowId, description, amount, quantity };
}
function BillGenerateModal({
  app,
  companyInfo,
  feeItems,
  serviceCharges,
  onClose,
  onSaved
}) {
  const { createBill } = useBackend();
  const [lineItems, setLineItems] = reactExports.useState(() => [newRow()]);
  const [discount, setDiscount] = reactExports.useState("");
  const [paymentReceived, setPaymentReceived] = reactExports.useState("");
  const [paymentMode, setPaymentMode] = reactExports.useState(PaymentMode.Cash);
  const [paymentDate, setPaymentDate] = reactExports.useState(todayInputValue());
  const [selectedFeeItemId, setSelectedFeeItemId] = reactExports.useState("");
  const [selectedChargeId, setSelectedChargeId] = reactExports.useState("");
  const subtotal = lineItems.reduce(
    (s, li) => s + (Number.parseFloat(li.amount) || 0) * (Number.parseInt(li.quantity) || 1),
    0
  );
  const discountVal = Number.parseFloat(discount) || 0;
  const total = Math.max(0, subtotal - discountVal);
  const received = Number.parseFloat(paymentReceived) || 0;
  const balance = Math.max(0, total - received);
  const saveMutation = useMutation({
    mutationFn: () => {
      const items = lineItems.filter((li) => li.description.trim()).map((li) => ({
        description: li.description.trim(),
        amount: Number.parseFloat(li.amount) || 0,
        quantity: BigInt(Number.parseInt(li.quantity) || 1)
      }));
      const dateNs = dateToNs(paymentDate);
      return createBill(app.id, items, received, paymentMode, dateNs);
    },
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      ue.success("Bill saved");
      onSaved();
      onClose();
    },
    onError: () => ue.error("Failed to save bill")
  });
  function setLI(rowId, field, val) {
    setLineItems(
      (prev) => prev.map((li) => li.id === rowId ? { ...li, [field]: val } : li)
    );
  }
  function addFromFeeItem(id) {
    if (!id) return;
    const item = feeItems.find((f) => f.id === id);
    if (!item) return;
    setLineItems((p) => [
      ...p,
      newRow(item.name, String(item.defaultAmount), "1")
    ]);
    setSelectedFeeItemId("");
  }
  function addFromServiceCharge(idStr) {
    if (!idStr) return;
    const charge = serviceCharges.find((c) => c.id.toString() === idStr);
    if (!charge) return;
    setLineItems((p) => [
      ...p,
      newRow(charge.description, String(charge.amount), "1")
    ]);
    setSelectedChargeId("");
  }
  const allSources = [
    ...feeItems.map((f) => ({
      key: `fee-${f.id}`,
      label: `${f.name} — ₹${f.defaultAmount.toLocaleString("en-IN")}`,
      add: () => addFromFeeItem(f.id)
    })),
    ...serviceCharges.map((c) => ({
      key: `sc-${c.id}`,
      label: `${c.description} — ₹${c.amount.toLocaleString("en-IN")}`,
      add: () => addFromServiceCharge(c.id.toString())
    }))
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4",
      "data-ocid": "bills.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Generate Bill" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              app.businessName,
              " · ",
              getServiceTypeLabel(app.serviceType)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              type: "button",
              "data-ocid": "bills.close_button",
              onClick: onClose,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-lg bg-primary/5 border border-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: companyInfo.name || "Barote Consultancy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: companyInfo.address })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Bill To (Firm)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium bg-muted/30 rounded px-3 py-2 truncate", children: app.businessName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Firm ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm bg-muted/30 rounded px-3 py-2 truncate", children: app.firmId || app.applicationId })
            ] })
          ] }),
          allSources.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-primary uppercase tracking-wide", children: "Quick Add from Fee Master" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: selectedFeeItemId || selectedChargeId,
                onValueChange: (val) => {
                  const src = allSources.find((s) => s.key === val);
                  if (src) src.add();
                  setSelectedFeeItemId("");
                  setSelectedChargeId("");
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      "data-ocid": "bills.fee_master.select",
                      className: "bg-card",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a fee item to add as line…" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    feeItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Fee Master" }),
                      feeItems.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: `fee-${f.id}`, children: [
                        f.name,
                        " — ₹",
                        f.defaultAmount.toLocaleString("en-IN")
                      ] }, `fee-${f.id}`))
                    ] }),
                    serviceCharges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-1", children: "Service Charges" }),
                      serviceCharges.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: `sc-${c.id}`, children: [
                        c.description,
                        " — ₹",
                        c.amount.toLocaleString("en-IN")
                      ] }, `sc-${c.id}`))
                    ] })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold", children: "Itemized Charges" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  type: "button",
                  "data-ocid": "bills.add_line_item.button",
                  onClick: () => setLineItems((p) => [...p, newRow()]),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                    " Add Line"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:grid sm:grid-cols-[1fr_90px_70px_80px_32px] gap-1.5 mb-1 text-xs text-muted-foreground px-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Amount (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: lineItems.map((li, idx) => {
              const lineTotal = (Number.parseFloat(li.amount) || 0) * (Number.parseInt(li.quantity) || 1);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_90px_70px_80px_32px] gap-1.5 items-center",
                  "data-ocid": `bills.line_item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        placeholder: "Description",
                        "data-ocid": `bills.line_desc.${idx + 1}.input`,
                        value: li.description,
                        onChange: (e) => setLI(li.id, "description", e.target.value)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        placeholder: "Amount",
                        type: "number",
                        min: "0",
                        className: "w-full sm:w-auto",
                        "data-ocid": `bills.line_amount.${idx + 1}.input`,
                        value: li.amount,
                        onChange: (e) => setLI(li.id, "amount", e.target.value)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        placeholder: "Qty",
                        type: "number",
                        min: "1",
                        className: "w-full sm:w-auto hidden sm:block",
                        "data-ocid": `bills.line_qty.${idx + 1}.input`,
                        value: li.quantity,
                        onChange: (e) => setLI(li.id, "quantity", e.target.value)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex items-center justify-end text-sm font-medium text-foreground", children: formatCurrency(lineTotal) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        type: "button",
                        className: "shrink-0 text-muted-foreground hover:text-destructive h-9 w-9",
                        "data-ocid": `bills.remove_line.${idx + 1}`,
                        onClick: () => setLineItems((p) => {
                          if (p.length === 1) return p;
                          return p.filter((r) => r.id !== li.id);
                        }),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ]
                },
                li.id
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Sub-total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatCurrency(subtotal) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-muted-foreground whitespace-nowrap", children: "Discount (₹)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: "0",
                    placeholder: "0",
                    className: "w-32 text-right",
                    "data-ocid": "bills.discount.input",
                    value: discount,
                    onChange: (e) => setDiscount(e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-bold text-foreground pt-1 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grand Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-base", children: formatCurrency(total) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold", children: "Payment Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bill-received", className: "text-xs", children: "Amount Received (₹)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "bill-received",
                    type: "number",
                    min: "0",
                    "data-ocid": "bills.payment_received.input",
                    value: paymentReceived,
                    onChange: (e) => setPaymentReceived(e.target.value),
                    placeholder: "0"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bill-mode", className: "text-xs", children: "Payment Mode" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: paymentMode,
                    onValueChange: (v) => setPaymentMode(v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "bill-mode",
                          "data-ocid": "bills.payment_mode.select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.Cash, children: "Cash" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.Cheque, children: "Cheque" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.UPI, children: "UPI" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.BankTransfer, children: "Bank Transfer" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.Card, children: "Card" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.Other, children: "Other" })
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bill-date", className: "text-xs", children: "Payment Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "bill-date",
                    type: "date",
                    "data-ocid": "bills.payment_date.input",
                    value: paymentDate,
                    onChange: (e) => setPaymentDate(e.target.value)
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center justify-between p-3 rounded-lg ${balance > 0 ? "bg-amber-50 border border-amber-200" : "bg-primary/5 border border-primary/20"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Balance Pending" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-lg font-bold ${balance > 0 ? "text-amber-700" : "text-primary"}`,
                      children: formatCurrency(balance)
                    }
                  )
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 p-5 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              type: "button",
              "data-ocid": "bills.cancel_button",
              onClick: onClose,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "bills.save_button",
              disabled: saveMutation.isPending || lineItems.every((li) => !li.description.trim()),
              onClick: () => saveMutation.mutate(),
              children: [
                saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-1.5" }) : null,
                "Save Bill"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function ReceiptModal({
  bill,
  app,
  companyInfo,
  onClose,
  onSaved
}) {
  const { createReceipt, updateBillFromReceipt } = useBackend();
  const [receiptNumber, setReceiptNumber] = reactExports.useState(genReceiptNumber);
  const [receiptDate, setReceiptDate] = reactExports.useState(todayInputValue());
  const [amountReceived, setAmountReceived] = reactExports.useState("");
  const [paymentMode, setPaymentMode] = reactExports.useState(PaymentMode.Cash);
  const [referenceNo, setReferenceNo] = reactExports.useState("");
  const [remarks, setRemarks] = reactExports.useState("");
  const [amountError, setAmountError] = reactExports.useState("");
  const pendingAmount = bill.pendingAmount ?? bill.balancePending ?? 0;
  const alreadyPaid = bill.paidAmount ?? bill.paymentReceived ?? 0;
  const saveMutation = useMutation({
    mutationFn: async (printAfter) => {
      const amt = Number.parseFloat(amountReceived);
      if (!amt || amt <= 0) throw new Error("Enter a valid amount");
      if (amt > pendingAmount + 1e-3)
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
        remarks.trim() || null
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      await updateBillFromReceipt(bill.id);
      if (printAfter) {
        printReceipt(res.ok, bill, app, companyInfo);
      }
      return res.ok;
    },
    onSuccess: (_, printAfter) => {
      ue.success(
        printAfter ? "Receipt saved — opening PDF…" : "Receipt saved"
      );
      onSaved();
      onClose();
    },
    onError: (err) => {
      if (err.message.includes("Amount")) {
        setAmountError(err.message);
      } else {
        ue.error(err.message || "Failed to save receipt");
      }
    }
  });
  function validateAmount(val) {
    setAmountReceived(val);
    const amt = Number.parseFloat(val);
    if (amt > pendingAmount + 1e-3) {
      setAmountError(
        `Cannot exceed pending amount ${formatCurrency(pendingAmount)}`
      );
    } else {
      setAmountError("");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4",
      "data-ocid": "receipt.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-xl w-full max-w-lg max-h-[92vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Generate Receipt" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "For bill ",
              bill.billNumber
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              type: "button",
              "data-ocid": "receipt.close_button",
              onClick: onClose,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Firm Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: app.businessName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Firm ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: app.firmId || app.applicationId })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Bill No." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium font-mono", children: bill.billNumber })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Total Bill Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatCurrency(bill.totalAmount) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Already Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-primary", children: formatCurrency(alreadyPaid) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Pending Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-amber-700", children: formatCurrency(pendingAmount) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rcpt-no", className: "text-xs", children: "Receipt Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "rcpt-no",
                "data-ocid": "receipt.number.input",
                value: receiptNumber,
                onChange: (e) => setReceiptNumber(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rcpt-date", className: "text-xs", children: "Receipt Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "rcpt-date",
                type: "date",
                "data-ocid": "receipt.date.input",
                value: receiptDate,
                onChange: (e) => setReceiptDate(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rcpt-amount", className: "text-xs", children: "Amount Received Now (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "rcpt-amount",
                type: "number",
                min: "0",
                step: "0.01",
                "data-ocid": "receipt.amount.input",
                value: amountReceived,
                onChange: (e) => validateAmount(e.target.value),
                className: amountError ? "border-destructive" : "",
                placeholder: `Max ${formatCurrency(pendingAmount)}`
              }
            ),
            amountError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive mt-1",
                "data-ocid": "receipt.amount.field_error",
                children: amountError
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Payment Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: paymentMode,
                onValueChange: (v) => setPaymentMode(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "receipt.payment_mode.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.Cash, children: "Cash" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.Cheque, children: "Cheque" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.UPI, children: "UPI" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.BankTransfer, children: "Bank Transfer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.Other, children: "Other" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rcpt-ref", className: "text-xs", children: "Reference No. / Transaction ID (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "rcpt-ref",
                "data-ocid": "receipt.reference.input",
                value: referenceNo,
                onChange: (e) => setReferenceNo(e.target.value),
                placeholder: "Cheque no., UPI ref, etc."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rcpt-remarks", className: "text-xs", children: "Remarks (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "rcpt-remarks",
                "data-ocid": "receipt.remarks.input",
                value: remarks,
                onChange: (e) => setRemarks(e.target.value),
                placeholder: "Any notes"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 p-5 border-t border-border flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              type: "button",
              "data-ocid": "receipt.cancel_button",
              onClick: onClose,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              type: "button",
              "data-ocid": "receipt.save_button",
              disabled: saveMutation.isPending || !!amountError || !amountReceived,
              onClick: () => saveMutation.mutate(false),
              children: [
                saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-1" }) : null,
                "Save"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "receipt.save_print_button",
              disabled: saveMutation.isPending || !!amountError || !amountReceived,
              onClick: () => saveMutation.mutate(true),
              children: [
                saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4 mr-1" }),
                "Save & Print"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function ReceiptHistory({ bill, app, companyInfo }) {
  const { getReceiptsByBill } = useBackend();
  const { data: receipts = [], isLoading } = useQuery({
    queryKey: ["receipts", bill.id.toString()],
    queryFn: () => getReceiptsByBill(bill.id.toString())
  });
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3", "data-ocid": "receipt_history.loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded" }) });
  if (receipts.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "px-3 pb-3 text-xs text-muted-foreground italic",
        "data-ocid": "receipt_history.empty_state",
        children: "No receipts yet for this bill."
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto px-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", "data-ocid": "receipt_history.table", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-1.5 pr-2", children: "Receipt No." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-1.5 pr-2", children: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-1.5 pr-2", children: "Amount" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-1.5 pr-2", children: "Mode" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-1.5 pr-2", children: "Ref." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-1.5" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: receipts.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border/40 last:border-0",
        "data-ocid": `receipt_history.item.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono font-medium text-primary", children: r.receiptNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 text-muted-foreground", children: formatNs(r.receiptDate) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 text-right font-medium", children: formatCurrency(r.amountReceived) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 text-muted-foreground", children: paymentLabel(r.paymentMode) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 text-muted-foreground max-w-[80px] truncate", children: r.referenceNo ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              type: "button",
              className: "h-7 px-2 text-xs",
              "data-ocid": `receipt_history.print.${idx + 1}`,
              onClick: () => printReceipt(r, bill, app, companyInfo),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-3 h-3 mr-1" }),
                " Print"
              ]
            }
          ) })
        ]
      },
      r.id
    )) })
  ] }) });
}
function BillRow({
  bill,
  app,
  companyInfo,
  idx,
  onReceiptSaved
}) {
  const [showHistory, setShowHistory] = reactExports.useState(false);
  const [showReceiptModal, setShowReceiptModal] = reactExports.useState(false);
  const isFullyPaid = bill.status === BillStatus.fullyPaid;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors",
        "data-ocid": `bills.item.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-medium text-primary", children: bill.billNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(bill.paymentDate) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-2 text-right font-medium text-sm", children: formatCurrency(bill.totalAmount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-2 text-right text-sm text-primary", children: formatCurrency(bill.paidAmount ?? bill.paymentReceived) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: (bill.pendingAmount ?? bill.balancePending) > 0 ? "text-amber-600 font-semibold text-sm" : "text-muted-foreground text-sm",
              children: formatCurrency(bill.pendingAmount ?? bill.balancePending)
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-2", children: statusBadge(bill.status) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                type: "button",
                className: "text-xs h-8 px-2",
                "data-ocid": `bills.toggle_history.${idx + 1}`,
                onClick: () => setShowHistory((v) => !v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-3 h-3 mr-1" }),
                  showHistory ? "Hide" : "History"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                type: "button",
                className: "text-xs h-8 px-2",
                "data-ocid": `bills.print_bill.${idx + 1}`,
                onClick: () => printBill(bill, app, companyInfo),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-3 h-3 mr-1" }),
                  " Bill"
                ]
              }
            ),
            !isFullyPaid && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                type: "button",
                className: "text-xs h-8 px-2",
                "data-ocid": `bills.generate_receipt.${idx + 1}`,
                onClick: () => setShowReceiptModal(true),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 mr-1" }),
                  " Receipt"
                ]
              }
            )
          ] }) })
        ]
      },
      bill.id.toString()
    ),
    showHistory && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptHistory, { bill, app, companyInfo }) }) }),
    showReceiptModal && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReceiptModal,
      {
        bill,
        app,
        companyInfo,
        onClose: () => setShowReceiptModal(false),
        onSaved: () => {
          setShowReceiptModal(false);
          onReceiptSaved();
        }
      }
    ) }) })
  ] });
}
function ExpenseModal({ app, onClose, onSaved }) {
  const { createExpense } = useBackend();
  const [expenseDate, setExpenseDate] = reactExports.useState(todayInputValue());
  const [description, setDescription] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("Government");
  const [amount, setAmount] = reactExports.useState("");
  const [paymentMode, setPaymentMode] = reactExports.useState(PaymentMode.Cash);
  const [referenceNo, setReferenceNo] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
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
        notes.trim() || null
      );
    },
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      ue.success("Expense recorded");
      onSaved();
      onClose();
    },
    onError: () => ue.error("Failed to save expense")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4",
      "data-ocid": "expense.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Add Expense" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              type: "button",
              "data-ocid": "expense.close_button",
              onClick: onClose,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "exp-date", className: "text-xs", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "exp-date",
                type: "date",
                "data-ocid": "expense.date.input",
                value: expenseDate,
                onChange: (e) => setExpenseDate(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "exp-desc", className: "text-xs", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "exp-desc",
                "data-ocid": "expense.description.input",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                placeholder: "Government licence fee, filing charge…"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "expense.category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Government", children: "Government" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Professional", children: "Professional" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Miscellaneous", children: "Miscellaneous" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "exp-amount", className: "text-xs", children: "Amount (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "exp-amount",
                type: "number",
                min: "0",
                "data-ocid": "expense.amount.input",
                value: amount,
                onChange: (e) => setAmount(e.target.value),
                placeholder: "0"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Payment Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: paymentMode,
                onValueChange: (v) => setPaymentMode(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "expense.payment_mode.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.Cash, children: "Cash" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.Cheque, children: "Cheque" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.UPI, children: "UPI" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.BankTransfer, children: "Bank Transfer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMode.Other, children: "Other" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "exp-ref", className: "text-xs", children: "Reference No. (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "exp-ref",
                "data-ocid": "expense.reference.input",
                value: referenceNo,
                onChange: (e) => setReferenceNo(e.target.value),
                placeholder: "Challan no., UTR, etc."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "exp-notes", className: "text-xs", children: "Notes (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "exp-notes",
                "data-ocid": "expense.notes.input",
                value: notes,
                onChange: (e) => setNotes(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 p-5 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              type: "button",
              "data-ocid": "expense.cancel_button",
              onClick: onClose,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "expense.save_button",
              disabled: saveMutation.isPending || !description.trim() || !amount,
              onClick: () => saveMutation.mutate(),
              children: [
                saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-1" }) : null,
                "Save Expense"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function BillsSection({ app, companyInfo }) {
  const {
    getBillsByApplication,
    getServiceChargesByServiceType,
    getExpensesByApplication,
    listFeeItems
  } = useBackend();
  const qc = useQueryClient();
  const [showSection, setShowSection] = reactExports.useState(false);
  const [showBillModal, setShowBillModal] = reactExports.useState(false);
  const [showExpenseModal, setShowExpenseModal] = reactExports.useState(false);
  const { data: bills = [], isLoading: billsLoading } = useQuery({
    queryKey: ["bills", app.id.toString()],
    queryFn: () => getBillsByApplication(app.id),
    enabled: showSection
  });
  const { data: expenses = [], isLoading: expensesLoading } = useQuery({
    queryKey: ["expenses", app.id.toString()],
    queryFn: () => getExpensesByApplication(app.id.toString()),
    enabled: showSection
  });
  const { data: serviceCharges = [] } = useQuery({
    queryKey: ["serviceCharges", app.serviceType],
    queryFn: () => getServiceChargesByServiceType(app.serviceType),
    enabled: showSection
  });
  const { data: feeItems = [] } = useQuery({
    queryKey: ["feeItems"],
    queryFn: () => listFeeItems(),
    enabled: showSection
  });
  function invalidate() {
    qc.invalidateQueries({ queryKey: ["bills", app.id.toString()] });
    qc.invalidateQueries({ queryKey: ["expenses", app.id.toString()] });
  }
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "bills.section.toggle",
          className: "flex items-center justify-between w-full text-left",
          onClick: () => setShowSection((v) => !v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: [
              "Bills & Receipts",
              bills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-2", children: bills.length })
            ] }),
            showSection ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
          ]
        }
      ),
      showSection && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Bills" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                type: "button",
                "data-ocid": "bills.generate_bill.button",
                onClick: () => setShowBillModal(true),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 mr-1.5" }),
                  "Generate Bill"
                ]
              }
            )
          ] }),
          billsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "bills.loading_state", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded" })
          ] }) : bills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-8 text-muted-foreground",
              "data-ocid": "bills.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 mx-auto mb-2 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No bills generated yet." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: 'Click "Generate Bill" to create one.' })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "bills.table", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-2 pr-2", children: "Bill / Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-2 pr-2", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-2 pr-2", children: "Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-2 pr-2", children: "Pending" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-2 pr-2", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-2", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bills.map((bill, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              BillRow,
              {
                bill,
                app,
                companyInfo,
                idx,
                onReceiptSaved: () => qc.invalidateQueries({
                  queryKey: ["bills", app.id.toString()]
                })
              },
              bill.id.toString()
            )) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
              "Expenses",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "(Govt. / Other Fees Paid)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                type: "button",
                "data-ocid": "bills.add_expense.button",
                onClick: () => setShowExpenseModal(true),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
                  "Add Expense"
                ]
              }
            )
          ] }),
          expensesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded" }) : expenses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-center py-6 text-muted-foreground",
              "data-ocid": "expenses.empty_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No expenses recorded." })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-sm",
                "data-ocid": "expenses.table",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-2 pr-2", children: "Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-2 pr-2", children: "Description" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-2 pr-2", children: "Category" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-2 pr-2", children: "Amount" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-2", children: "Mode" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: expenses.map((exp, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors",
                      "data-ocid": `expenses.item.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-2 text-muted-foreground text-xs", children: formatNs(exp.expenseDate) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-2 max-w-[160px] truncate", children: exp.description }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: exp.category }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-2 text-right font-medium", children: formatCurrency(exp.amount) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-muted-foreground text-xs", children: paymentLabel(exp.paymentMode) })
                      ]
                    },
                    exp.id
                  )) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-2 pt-2 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold", children: [
              "Total Expenses: ",
              formatCurrency(totalExpenses)
            ] }) })
          ] })
        ] })
      ] })
    ] }),
    showBillModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BillGenerateModal,
      {
        app,
        companyInfo,
        feeItems,
        serviceCharges,
        onClose: () => setShowBillModal(false),
        onSaved: invalidate
      }
    ),
    showExpenseModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExpenseModal,
      {
        app,
        onClose: () => setShowExpenseModal(false),
        onSaved: invalidate
      }
    )
  ] });
}
const QUALIFICATIONS = ["D.Pharm", "B.Pharm", "M.Pharm"];
const EMPTY_FORM = {
  fullName: "",
  registrationNumber: "",
  qualification: "D.Pharm",
  aadhaarNumber: "",
  mobileNumber: "",
  address: "",
  dateOfJoining: "",
  dateOfLeaving: "",
  resignationDate: ""
};
function genId() {
  return `ph-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
function PharmacistDetailsSection({ appId, serviceType }) {
  const qc = useQueryClient();
  const {
    getApplicationPharmacists,
    addApplicationPharmacist,
    updateApplicationPharmacist,
    removeApplicationPharmacist
  } = useBackend();
  const isRemoveCtx = serviceType === ServiceType.DrugLicenceRemovePharmacist;
  const { data: rawPharmacists, isLoading } = useQuery(
    {
      queryKey: ["appPharmacists", appId.toString()],
      queryFn: async () => {
        const res = await getApplicationPharmacists(appId);
        if (res.__kind__ === "err") return [];
        const raw = res.ok;
        return Array.isArray(raw) ? raw : [];
      }
    }
  );
  const pharmacists = Array.isArray(rawPharmacists) ? rawPharmacists : [];
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(
    null
  );
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  function openAdd() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }
  function openEdit(ph) {
    setEditTarget(ph);
    setForm({
      fullName: ph.fullName,
      registrationNumber: ph.registrationNumber,
      qualification: ph.qualification,
      aadhaarNumber: ph.aadhaarNumber,
      mobileNumber: ph.mobileNumber,
      address: ph.address,
      dateOfJoining: ph.dateOfJoining,
      dateOfLeaving: ph.dateOfLeaving,
      resignationDate: ph.resignationDate ?? ""
    });
    setShowForm(true);
  }
  function setF(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }
  function invalidate() {
    qc.invalidateQueries({
      queryKey: ["appPharmacists", appId.toString()]
    });
    qc.invalidateQueries({ queryKey: ["application", appId.toString()] });
  }
  const addMutation = useMutation({
    mutationFn: (ph) => addApplicationPharmacist(appId, ph),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      ue.success("Pharmacist added");
      invalidate();
      setShowForm(false);
    },
    onError: () => ue.error("Failed to add pharmacist")
  });
  const updateMutation = useMutation({
    mutationFn: ({
      pharmacistId,
      ph
    }) => updateApplicationPharmacist(appId, pharmacistId, ph),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      ue.success("Pharmacist updated");
      invalidate();
      setShowForm(false);
    },
    onError: () => ue.error("Failed to update pharmacist")
  });
  const deleteMutation = useMutation({
    mutationFn: (pharmacistId) => removeApplicationPharmacist(appId, pharmacistId),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      ue.success("Pharmacist removed");
      invalidate();
      setDeleteTarget(null);
    },
    onError: () => ue.error("Failed to remove pharmacist")
  });
  function handleSubmit() {
    const ph = {
      id: (editTarget == null ? void 0 : editTarget.id) ?? genId(),
      ...form
    };
    if (editTarget) {
      updateMutation.mutate({ pharmacistId: editTarget.id, ph });
    } else {
      addMutation.mutate(ph);
    }
  }
  const isPending = addMutation.isPending || updateMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "bg-card border border-border rounded-lg p-6",
      "data-ocid": "pharmacist_details.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Pharmacist Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: isRemoveCtx ? "Pharmacists being removed from this licence" : "Pharmacists associated with this application" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              "data-ocid": "pharmacist_details.add_button",
              onClick: openAdd,
              className: "gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                "Add Pharmacist"
              ]
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "pharmacist_details.loading_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" })
        ] }) : pharmacists.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-10 text-center",
            "data-ocid": "pharmacist_details.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-muted-foreground mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No pharmacists added yet." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: 'Click "Add Pharmacist" to add one.' })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: pharmacists.map((ph, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": `pharmacist_details.item.${idx + 1}`,
            className: "p-4 rounded-lg border border-border bg-muted/10",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: ph.fullName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: ph.qualification })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                  "Reg. No.: ",
                  ph.registrationNumber
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mt-2", children: [
                  ph.mobileNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Mobile:" }),
                    " ",
                    ph.mobileNumber
                  ] }),
                  ph.aadhaarNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Aadhaar:" }),
                    " ",
                    ph.aadhaarNumber
                  ] }),
                  ph.dateOfJoining && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Joining:" }),
                    " ",
                    ph.dateOfJoining
                  ] }),
                  isRemoveCtx && ph.dateOfLeaving && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Leaving:" }),
                    " ",
                    ph.dateOfLeaving
                  ] }),
                  isRemoveCtx && ph.resignationDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Resignation Date:" }),
                    " ",
                    ph.resignationDate
                  ] }),
                  ph.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground sm:col-span-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Address:" }),
                    " ",
                    ph.address
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-7 w-7",
                    "data-ocid": `pharmacist_details.edit_button.${idx + 1}`,
                    onClick: () => openEdit(ph),
                    "aria-label": "Edit pharmacist",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-7 w-7 text-destructive hover:text-destructive",
                    "data-ocid": `pharmacist_details.delete_button.${idx + 1}`,
                    onClick: () => setDeleteTarget(ph),
                    "aria-label": "Delete pharmacist",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                )
              ] })
            ] })
          },
          ph.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: showForm,
            onOpenChange: (v) => {
              if (!v) setShowForm(false);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DialogContent,
              {
                className: "max-w-lg max-h-[90vh] overflow-y-auto",
                "data-ocid": "pharmacist_details.dialog",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? "Edit Pharmacist" : "Add Pharmacist" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ph-fullName", children: [
                        "Full Name ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ph-fullName",
                          "data-ocid": "pharmacist_details.full_name.input",
                          value: form.fullName,
                          onChange: (e) => setF("fullName", e.target.value),
                          placeholder: "e.g. Dr. Ramesh Patil"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ph-regNo", children: [
                        "Registration No. ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ph-regNo",
                          "data-ocid": "pharmacist_details.registration_number.input",
                          value: form.registrationNumber,
                          onChange: (e) => setF("registrationNumber", e.target.value),
                          placeholder: "e.g. MH-12345"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ph-qual", children: "Qualification" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: form.qualification,
                          onValueChange: (v) => setF("qualification", v),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                id: "ph-qual",
                                "data-ocid": "pharmacist_details.qualification.select",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: QUALIFICATIONS.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: q, children: q }, q)) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ph-aadhaar", children: "Aadhaar Number" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ph-aadhaar",
                          "data-ocid": "pharmacist_details.aadhaar_number.input",
                          value: form.aadhaarNumber,
                          onChange: (e) => setF("aadhaarNumber", e.target.value),
                          placeholder: "XXXX XXXX XXXX",
                          maxLength: 14
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ph-mobile", children: "Mobile Number" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ph-mobile",
                          "data-ocid": "pharmacist_details.mobile_number.input",
                          value: form.mobileNumber,
                          onChange: (e) => setF("mobileNumber", e.target.value),
                          placeholder: "+91 98765 43210",
                          type: "tel"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ph-address", children: "Address" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ph-address",
                          "data-ocid": "pharmacist_details.address.input",
                          value: form.address,
                          onChange: (e) => setF("address", e.target.value),
                          placeholder: "Full residential address"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ph-joining", children: "Date of Joining" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ph-joining",
                          "data-ocid": "pharmacist_details.date_of_joining.input",
                          value: form.dateOfJoining,
                          onChange: (e) => setF("dateOfJoining", e.target.value),
                          placeholder: "DD/MM/YYYY"
                        }
                      )
                    ] }),
                    isRemoveCtx && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ph-leaving", children: [
                        "Date of Leaving ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ph-leaving",
                          "data-ocid": "pharmacist_details.date_of_leaving.input",
                          value: form.dateOfLeaving,
                          onChange: (e) => setF("dateOfLeaving", e.target.value),
                          placeholder: "DD/MM/YYYY"
                        }
                      )
                    ] }),
                    isRemoveCtx && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ph-resignation-date", children: "Resignation Date" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ph-resignation-date",
                          type: "date",
                          "data-ocid": "pharmacist_details.resignation_date.input",
                          value: form.resignationDate,
                          onChange: (e) => setF("resignationDate", e.target.value),
                          placeholder: "DD/MM/YYYY"
                        }
                      )
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        "data-ocid": "pharmacist_details.cancel_button",
                        onClick: () => setShowForm(false),
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        "data-ocid": "pharmacist_details.submit_button",
                        disabled: isPending || !form.fullName.trim() || !form.registrationNumber.trim(),
                        onClick: handleSubmit,
                        className: "gap-1.5",
                        children: [
                          isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }),
                          editTarget ? "Save Changes" : "Add Pharmacist"
                        ]
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialog,
          {
            open: !!deleteTarget,
            onOpenChange: (v) => !v && setDeleteTarget(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "pharmacist_details.delete_dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Remove Pharmacist?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  "This will permanently remove",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget == null ? void 0 : deleteTarget.fullName }),
                  " from this application. This action cannot be undone."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "pharmacist_details.delete_cancel_button", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    "data-ocid": "pharmacist_details.delete_confirm_button",
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    disabled: deleteMutation.isPending,
                    onClick: () => deleteTarget && deleteMutation.mutate(deleteTarget.id),
                    children: deleteMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Remove"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const FRONT_OPTIONS = ["North", "South", "East", "West"];
const SIDE_OPTIONS = ["East", "West", "North", "South"];
const ENTRANCE_TYPE_OPTIONS = [
  "Door",
  "Full Wall Shutter",
  "Half Wall Shutter",
  "Half Wall Opening",
  "No Wall / Open",
  "Other"
];
function defaultEntranceType() {
  return "Full Wall Shutter";
}
function emptyRoom() {
  return {
    length: 0,
    width: 0,
    entranceType: "Full Wall Shutter",
    roomName: void 0,
    whichSide: void 0,
    entranceSide: void 0
  };
}
function emptyDetails() {
  return {
    boundaryEast: "",
    boundaryWest: "",
    boundaryNorth: "",
    boundarySouth: "",
    premisesLength: 0,
    premisesWidth: 0,
    rooms: [],
    frontOfShop: "North"
  };
}
function fromInitial(initial) {
  return {
    ...initial,
    rooms: (initial.rooms || []).map((r) => ({
      ...r,
      entranceType: r.entranceType || "Full Wall Shutter"
    }))
  };
}
const _SHUTTER_COLOR = "#06B6D4";
function placeRoom(refPos, side, rw, rh) {
  if (side === "East") return { x: refPos.x + refPos.w, y: refPos.y };
  if (side === "West") return { x: refPos.x - rw, y: refPos.y };
  if (side === "North") return { x: refPos.x, y: refPos.y - rh };
  return { x: refPos.x, y: refPos.y + refPos.h };
}
function renderEntranceOnSide(pos, entranceSide, et, _entranceLabel, _shuttT) {
  const { x, y, w, h } = pos;
  const isHorizontal = entranceSide === "North" || entranceSide === "South";
  const dim = isHorizontal ? w : h;
  if (et === "No Wall / Open") return "";
  let gapSize;
  if (et === "Half Wall Opening" || et === "Half Wall Shutter") {
    gapSize = dim * 0.5;
  } else if (et === "Full Wall Shutter") {
    gapSize = dim * 0.6;
  } else {
    gapSize = dim * 0.3;
  }
  let wx1;
  let wy1;
  let wx2;
  let wy2;
  if (entranceSide === "North") {
    wx1 = x;
    wy1 = y;
    wx2 = x + w;
    wy2 = y;
  } else if (entranceSide === "East") {
    wx1 = x + w;
    wy1 = y;
    wx2 = x + w;
    wy2 = y + h;
  } else if (entranceSide === "West") {
    wx1 = x;
    wy1 = y;
    wx2 = x;
    wy2 = y + h;
  } else {
    wx1 = x;
    wy1 = y + h;
    wx2 = x + w;
    wy2 = y + h;
  }
  const wallCenter = isHorizontal ? x + w / 2 : y + h / 2;
  const gapStart = wallCenter - gapSize / 2;
  const gapEnd = gapStart + gapSize;
  if (isHorizontal) {
    const wy = wy1;
    const seg12 = gapStart > wx1 ? `<line x1="${wx1}" y1="${wy}" x2="${gapStart}" y2="${wy}" stroke="#000" stroke-width="2.5"/>` : "";
    const seg22 = gapEnd < wx2 ? `<line x1="${gapEnd}" y1="${wy}" x2="${wx2}" y2="${wy}" stroke="#000" stroke-width="2.5"/>` : "";
    let shutterRect2 = "";
    if (et === "Full Wall Shutter") {
      shutterRect2 = `<rect x="${gapStart}" y="${wy - 4}" width="${gapSize}" height="8" fill="${_SHUTTER_COLOR}" stroke="#0891B2" stroke-width="1"/>`;
    } else if (et === "Half Wall Shutter") {
      shutterRect2 = `<rect x="${gapStart}" y="${wy - 4}" width="${gapSize}" height="8" fill="${_SHUTTER_COLOR}" stroke="#0891B2" stroke-width="1"/>`;
    } else if (et === "Half Wall Opening") {
      shutterRect2 = `<rect x="${gapStart}" y="${wy - 3}" width="${gapSize}" height="6" fill="#BAE6FD" stroke="${_SHUTTER_COLOR}" stroke-width="1" stroke-dasharray="3,2"/>`;
    }
    return `${seg12}${seg22}${shutterRect2}`;
  }
  const wx = wx1;
  const seg1 = gapStart > wy1 ? `<line x1="${wx}" y1="${wy1}" x2="${wx}" y2="${gapStart}" stroke="#000" stroke-width="2.5"/>` : "";
  const seg2 = gapEnd < wy2 ? `<line x1="${wx}" y1="${gapEnd}" x2="${wx}" y2="${wy2}" stroke="#000" stroke-width="2.5"/>` : "";
  let shutterRect = "";
  if (et === "Full Wall Shutter") {
    shutterRect = `<rect x="${wx - 4}" y="${gapStart}" width="8" height="${gapSize}" fill="${_SHUTTER_COLOR}" stroke="#0891B2" stroke-width="1"/>`;
  } else if (et === "Half Wall Shutter") {
    shutterRect = `<rect x="${wx - 4}" y="${gapStart}" width="8" height="${gapSize}" fill="${_SHUTTER_COLOR}" stroke="#0891B2" stroke-width="1"/>`;
  } else if (et === "Half Wall Opening") {
    shutterRect = `<rect x="${wx - 3}" y="${gapStart}" width="6" height="${gapSize}" fill="#BAE6FD" stroke="${_SHUTTER_COLOR}" stroke-width="1" stroke-dasharray="3,2"/>`;
  }
  return `${seg1}${seg2}${shutterRect}`;
}
function buildPreviewSvg(form) {
  const SVG_W = 460;
  const SVG_H = 380;
  const MARGIN = 44;
  const WALL_STROKE = 2.5;
  const rooms = Array.isArray(form.rooms) ? form.rooms : [];
  const rpFt = [];
  rooms.forEach((room, i) => {
    const rw = Math.max(room.length || 1, 0.5);
    const rh = Math.max(room.width || 1, 0.5);
    const pos = i === 0 ? { x: 0, y: 0 } : placeRoom(rpFt[i - 1], room.whichSide || "East", rw, rh);
    rpFt.push({ x: pos.x, y: pos.y, w: rw, h: rh });
  });
  const minFx = rpFt.length ? Math.min(...rpFt.map((p) => p.x)) : 0;
  const minFy = rpFt.length ? Math.min(...rpFt.map((p) => p.y)) : 0;
  const maxFx = rpFt.length ? Math.max(...rpFt.map((p) => p.x + p.w)) : form.premisesLength || 10;
  const maxFy = rpFt.length ? Math.max(...rpFt.map((p) => p.y + p.h)) : form.premisesWidth || 8;
  const totalFW = Math.max(maxFx - minFx, 0.01);
  const totalFH = Math.max(maxFy - minFy, 0.01);
  const drawW = SVG_W - MARGIN * 2;
  const drawH = SVG_H - MARGIN * 2;
  const isSingleRoom = rooms.length === 1;
  const baseScaleX = drawW / totalFW;
  const baseScaleY = drawH / totalFH;
  const baseScale = Math.min(baseScaleX, baseScaleY);
  const scale = isSingleRoom ? baseScale * 0.5 : baseScale;
  const scaledW = totalFW * scale;
  const scaledH = totalFH * scale;
  const offsetX = MARGIN + (drawW - scaledW) / 2;
  const offsetY = MARGIN + (drawH - scaledH) / 2;
  const rp = rpFt.map((r) => ({
    x: offsetX + (r.x - minFx) * scale,
    y: offsetY + (r.y - minFy) * scale,
    w: Math.max(r.w * scale, 20),
    h: Math.max(r.h * scale, 20)
  }));
  const bMinX = rp.length ? Math.min(...rp.map((p) => p.x)) : MARGIN;
  const bMinY = rp.length ? Math.min(...rp.map((p) => p.y)) : MARGIN;
  const bMaxX = rp.length ? Math.max(...rp.map((p) => p.x + p.w)) : MARGIN + drawW;
  const bMaxY = rp.length ? Math.max(...rp.map((p) => p.y + p.h)) : MARGIN + drawH;
  const midX = (bMinX + bMaxX) / 2;
  const midY = (bMinY + bMaxY) / 2;
  const compass = `
    <text x="${midX}" y="${bMinY - 10}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">N</text>
    <text x="${midX}" y="${bMaxY + 20}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">S</text>
    <text x="${bMinX - 14}" y="${midY + 5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">W</text>
    <text x="${bMaxX + 14}" y="${midY + 5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">E</text>`;
  function opp(side) {
    if (side === "North") return "South";
    if (side === "South") return "North";
    if (side === "East") return "West";
    return "East";
  }
  const openPassage = rooms.map((room, i) => {
    if (i === 0) return false;
    const ws = room.whichSide || "East";
    const roomEntersFacingPrev = (room.entranceSide || "") === opp(ws);
    const prevRoom = rooms[i - 1];
    const prevEntersFacingNext = prevRoom && (prevRoom.entranceSide || (i === 1 ? form.frontOfShop : "")) === ws;
    return roomEntersFacingPrev || !!prevEntersFacingNext;
  });
  let roomSvg = "";
  let wallSvg = "";
  let dimSvg = "";
  if (rooms.length === 0) {
    roomSvg = `<rect x="${MARGIN}" y="${MARGIN}" width="${drawW}" height="${drawH}" fill="#fafafa" stroke="#000" stroke-width="${WALL_STROKE}"/>`;
  } else {
    rooms.forEach((room, i) => {
      const { x: rx, y: ry, w: rw, h: rh } = rp[i];
      const cx = rx + rw / 2;
      const cy = ry + rh / 2;
      const fontSize = rw < 60 ? 10 : 13;
      roomSvg += `<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="#f0f7ff"/>`;
      roomSvg += `
        <text x="${cx}" y="${cy - 5}" text-anchor="middle" font-size="${fontSize}" font-weight="bold" fill="#1e40af">Room No ${i + 1}</text>
        <text x="${cx}" y="${cy + fontSize}" text-anchor="middle" font-size="9" fill="#555">${room.length}×${room.width} ft</text>`;
      const esSide = i === 0 ? form.frontOfShop || "South" : room.entranceSide || "South";
      const et = room.entranceType || "Full Wall Shutter";
      const sharedSide = i > 0 ? opp(room.whichSide || "East") : null;
      const sharedIsOpen = i > 0 ? openPassage[i] : false;
      const nextRoom = rooms[i + 1];
      const skipTowardNextSide = nextRoom ? nextRoom.whichSide || "East" : null;
      const sides = [
        { name: "North", x1: rx, y1: ry, x2: rx + rw, y2: ry },
        { name: "South", x1: rx, y1: ry + rh, x2: rx + rw, y2: ry + rh },
        { name: "West", x1: rx, y1: ry, x2: rx, y2: ry + rh },
        { name: "East", x1: rx + rw, y1: ry, x2: rx + rw, y2: ry + rh }
      ];
      for (const s of sides) {
        if (skipTowardNextSide !== null && s.name === skipTowardNextSide)
          continue;
        const isSharedWithPrev = sharedSide !== null && s.name === sharedSide;
        if (isSharedWithPrev) {
          if (sharedIsOpen) {
            const thisEntranceIsOnShared = esSide === sharedSide;
            const prevRoom = rooms[i - 1];
            i - 1 === 0 ? form.frontOfShop || "South" : (prevRoom == null ? void 0 : prevRoom.entranceSide) || "South";
            const prevEt = (prevRoom == null ? void 0 : prevRoom.entranceType) || "Full Wall Shutter";
            const useEt = thisEntranceIsOnShared ? et : prevEt;
            wallSvg += renderEntranceOnSide(rp[i], sharedSide, useEt);
          } else {
            wallSvg += `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="#000" stroke-width="${WALL_STROKE}" stroke-linecap="square"/>`;
          }
          continue;
        }
        if (s.name === esSide) {
          wallSvg += renderEntranceOnSide(rp[i], esSide, et);
          continue;
        }
        wallSvg += `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="#000" stroke-width="${WALL_STROKE}" stroke-linecap="square"/>`;
      }
      const dimFs = rw < 60 ? 8 : 10;
      dimSvg += `<text x="${cx}" y="${ry - 5}" text-anchor="middle" font-size="${dimFs}" font-weight="bold" fill="#1e3a8a">${room.width} FT</text>`;
      dimSvg += `<text x="${rx + rw + 4}" y="${cy + 4}" text-anchor="start" font-size="${dimFs}" font-weight="bold" fill="#1e3a8a">${room.length} FT</text>`;
    });
  }
  return `<svg width="${SVG_W}" height="${SVG_H}" viewBox="0 0 ${SVG_W} ${SVG_H}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    ${roomSvg}
    ${wallSvg}
    ${compass}
    ${dimSvg}
  </svg>`;
}
function PlanLayoutModal({
  initial,
  onGenerate,
  onClose,
  mobileNumber
}) {
  const [form, setForm] = reactExports.useState(
    initial ? fromInitial(initial) : emptyDetails()
  );
  function setField(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function addRoom() {
    setForm((f) => ({ ...f, rooms: [...f.rooms, emptyRoom()] }));
  }
  function removeRoom(i) {
    setForm((f) => ({ ...f, rooms: f.rooms.filter((_, idx) => idx !== i) }));
  }
  function updateRoom(i, patch) {
    setForm((f) => ({
      ...f,
      rooms: f.rooms.map((r, idx) => idx === i ? { ...r, ...patch } : r)
    }));
  }
  function handleGenerate() {
    const printData = {
      boundaryEast: form.boundaryEast,
      boundaryWest: form.boundaryWest,
      boundaryNorth: form.boundaryNorth,
      boundarySouth: form.boundarySouth,
      premisesLength: form.premisesLength,
      premisesWidth: form.premisesWidth,
      rooms: form.rooms,
      frontOfShop: form.frontOfShop
    };
    onGenerate(printData);
  }
  const previewSvg = buildPreviewSvg(form);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
      "data-ocid": "plan_layout_modal.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-xl w-full max-w-3xl max-h-[92vh] flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Plan Layout Details" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Close",
              "data-ocid": "plan_layout_modal.close_button",
              onClick: onClose,
              className: "text-muted-foreground hover:text-foreground transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto flex-1 px-6 py-5 space-y-6", children: [
          mobileNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-muted/20 border border-border text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-medium", children: [
              "Mobile No.:",
              " "
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: mobileNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-primary mb-3", children: "Premises Boundaries" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
              ["boundaryNorth", "North"],
              ["boundarySouth", "South"],
              ["boundaryEast", "East"],
              ["boundaryWest", "West"]
            ].map(([field, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `pld-${field}`, children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: `pld-${field}`,
                  "data-ocid": `plan_layout_modal.${field}.input`,
                  placeholder: `${label} boundary`,
                  value: form[field],
                  onChange: (e) => setField(field, e.target.value)
                }
              )
            ] }, field)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-primary mb-3", children: "Premises Dimensions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pld-length", children: "Length (ft)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "pld-length",
                    type: "number",
                    min: 0,
                    "data-ocid": "plan_layout_modal.premises_length.input",
                    placeholder: "e.g. 20",
                    value: form.premisesLength || "",
                    onChange: (e) => setField(
                      "premisesLength",
                      Number.parseFloat(e.target.value) || 0
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pld-width", children: "Width (ft)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "pld-width",
                    type: "number",
                    min: 0,
                    "data-ocid": "plan_layout_modal.premises_width.input",
                    placeholder: "e.g. 15",
                    value: form.premisesWidth || "",
                    onChange: (e) => setField(
                      "premisesWidth",
                      Number.parseFloat(e.target.value) || 0
                    )
                  }
                )
              ] })
            ] }),
            form.rooms.length > 0 ? (() => {
              const totalSqFt = form.rooms.reduce(
                (s, r) => s + (r.length || 0) * (r.width || 0),
                0
              );
              const roomParts = form.rooms.map((_, idx) => `Room ${idx + 1}`).join(" + ");
              const calcParts = form.rooms.map(
                (r, idx) => `(${r.length || 0} × ${r.width || 0})${idx < form.rooms.length - 1 ? " + " : ""}`
              ).join("");
              const sqMtr = (totalSqFt * 0.0929).toFixed(2);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
                  "Area = ",
                  roomParts,
                  " = ",
                  calcParts,
                  " Sq. Ft."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  "=",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                    totalSqFt.toFixed(2),
                    " Sq. Ft."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  "=",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                    sqMtr,
                    " Sq. Mtr."
                  ] })
                ] })
              ] });
            })() : form.premisesLength > 0 && form.premisesWidth > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
                "Area = ",
                form.premisesLength,
                " × ",
                form.premisesWidth,
                " Sq. Ft."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                "=",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                  (form.premisesLength * form.premisesWidth).toFixed(2),
                  " Sq. Ft."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                "=",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                  (form.premisesLength * form.premisesWidth * 0.0929).toFixed(2),
                  " ",
                  "Sq. Mtr."
                ] })
              ] })
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-primary mb-3", children: "Front of Shop / Entrance Direction" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xs space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pld-front", children: "Direction facing the entrance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.frontOfShop,
                  onValueChange: (v) => setField("frontOfShop", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        id: "pld-front",
                        "data-ocid": "plan_layout_modal.front_of_shop.select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      FRONT_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o, children: o }, o)),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Custom", children: "Custom" })
                    ] })
                  ]
                }
              ),
              form.frontOfShop === "Custom" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "mt-2",
                  "data-ocid": "plan_layout_modal.front_of_shop_custom.input",
                  placeholder: "Describe front side",
                  onChange: (e) => setField("frontOfShop", e.target.value)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold uppercase tracking-wider text-primary", children: [
                "Rooms (",
                form.rooms.length,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  "data-ocid": "plan_layout_modal.add_room.button",
                  onClick: addRoom,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                    "Add Room"
                  ]
                }
              )
            ] }),
            form.rooms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-muted-foreground py-3 text-center border border-dashed border-border rounded-lg",
                "data-ocid": "plan_layout_modal.rooms.empty_state",
                children: 'No rooms added. Click "Add Room" to add one.'
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: form.rooms.map((room, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `plan_layout_modal.room.${i + 1}`,
                className: "p-3 rounded-lg border border-border bg-muted/10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-foreground", children: [
                      "Room No ",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "aria-label": "Remove room",
                        "data-ocid": `plan_layout_modal.remove_room.${i + 1}`,
                        onClick: () => removeRoom(i),
                        className: "text-muted-foreground hover:text-destructive transition-colors",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }),
                  i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `room-side-${i}`, className: "text-xs", children: [
                        "Room No ",
                        i + 1,
                        " is on which side of Room No ",
                        i,
                        "?"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: room.whichSide || "",
                          onValueChange: (v) => updateRoom(i, { whichSide: v }),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                id: `room-side-${i}`,
                                "data-ocid": `plan_layout_modal.room_which_side.${i + 1}`,
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select side" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SIDE_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: `room-entrance-side-${i}`,
                          className: "text-xs",
                          children: [
                            "Entrance Side for Room No ",
                            i + 1,
                            ":"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: room.entranceSide || "",
                          onValueChange: (v) => updateRoom(i, { entranceSide: v }),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                id: `room-entrance-side-${i}`,
                                "data-ocid": `plan_layout_modal.room_entrance_side.${i + 1}`,
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select side" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SIDE_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `room-length-${i}`, children: "Length (ft)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: `room-length-${i}`,
                          type: "number",
                          min: 0,
                          "data-ocid": `plan_layout_modal.room_length.${i + 1}`,
                          placeholder: "0",
                          value: room.length || "",
                          onChange: (e) => updateRoom(i, {
                            length: Number.parseFloat(e.target.value) || 0
                          })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `room-width-${i}`, children: "Width (ft)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: `room-width-${i}`,
                          type: "number",
                          min: 0,
                          "data-ocid": `plan_layout_modal.room_width.${i + 1}`,
                          placeholder: "0",
                          value: room.width || "",
                          onChange: (e) => updateRoom(i, {
                            width: Number.parseFloat(e.target.value) || 0
                          })
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 items-end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `room-entrance-${i}`, children: "Entrance Type" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: room.entranceType || defaultEntranceType(),
                          onValueChange: (v) => updateRoom(i, {
                            entranceType: v,
                            entranceLabel: ""
                          }),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                id: `room-entrance-${i}`,
                                "data-ocid": `plan_layout_modal.room_entrance_type.${i + 1}`,
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ENTRANCE_TYPE_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, children: opt }, opt)) })
                          ]
                        }
                      )
                    ] }),
                    room.entranceType === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `room-entrance-label-${i}`, children: "Custom Label" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: `room-entrance-label-${i}`,
                          "data-ocid": `plan_layout_modal.room_entrance_label.${i + 1}`,
                          placeholder: "e.g. Sliding door",
                          value: room.entranceLabel || "",
                          onChange: (e) => updateRoom(i, { entranceLabel: e.target.value })
                        }
                      )
                    ] }),
                    room.length > 0 && room.width > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground self-end pb-1", children: [
                      "Area: ",
                      (room.length * room.width).toFixed(2),
                      " Sq. Ft."
                    ] })
                  ] })
                ]
              },
              `roomcard-${i + 1}`
            )) })
          ] }),
          form.rooms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-primary mb-3", children: "Live Floor Plan Preview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "border border-border rounded-lg bg-background overflow-hidden",
                  dangerouslySetInnerHTML: { __html: previewSvg }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 text-center", children: "Rooms placed by the selected side. Entrance drawn on the specified wall of each room." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 px-6 py-4 border-t border-border shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              "data-ocid": "plan_layout_modal.cancel_button",
              onClick: onClose,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "plan_layout_modal.generate_button",
              onClick: handleGenerate,
              className: "bg-primary text-primary-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 mr-1.5" }),
                "Generate PDF"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function fmtDate(ts) {
  const d = ts && ts !== 0n ? new Date(Number(ts) / 1e6) : /* @__PURE__ */ new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
function getApplicationHeading(serviceType) {
  const st = serviceType || "";
  if (st.includes("NewFirm") || st.includes("New Firm") || st === "DrugLicenceNewFirm")
    return "Application for New Firm's Drug License";
  if (st.includes("ChangePremise") || st.includes("Change Premise") || st.includes("Change of Premise"))
    return "Application for Change of Premises";
  if (st.includes("Alteration"))
    return "Application for Alteration of Premises";
  if (st.includes("AddPharmacist") || st.includes("Add Pharmacist"))
    return "Application for Addition of Pharmacist";
  if (st.includes("RemovePharmacist") || st.includes("Remove Pharmacist"))
    return "Application for Removal of Pharmacist";
  if (st.includes("Renewal")) return "Application for Renewal of Drug License";
  const pretty = st.replace(/([A-Z])/g, " $1").trim();
  return `Application for ${pretty}`;
}
const PRINT_CSS = `
  * { box-sizing: border-box; font-family: 'Arial Narrow', Arial, sans-serif; }
  @media print {
    body { margin: 0; padding: 0; }
    .no-print { display: none !important; }
    @page { margin: 5mm; size: A4; }
    html, body { height: 100%; }
    .page { page-break-after: avoid; page-break-inside: avoid; }
    body { font-family: 'Arial Narrow', Arial, sans-serif !important; font-size: 12px !important; }
    * { font-family: 'Arial Narrow', Arial, sans-serif !important; }
    h1 { font-size: 14px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    h2 { font-size: 12px !important; font-weight: bold !important; margin-bottom: 2px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    th { font-size: 12px !important; font-weight: bold !important; font-family: 'Arial Narrow', Arial, sans-serif !important; padding: 2px 4px !important; }
    td { padding: 2px 4px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; font-size: 12px !important; }
    p { margin: 1px 0 !important; line-height: 1.2 !important; font-size: 12px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    div, span, li, ol, ul { font-family: 'Arial Narrow', Arial, sans-serif !important; font-size: 12px !important; }
    .header { padding: 4px 6px 3px !important; margin-bottom: 3px !important; }
    .header h1 { font-size: 14px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    .header p { font-size: 12px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    section, .section { margin-bottom: 2px !important; padding: 0 !important; }
    table { margin-bottom: 2px !important; border-collapse: collapse !important; }
    .area-block { padding: 3px 6px !important; margin: 2px 0 !important; font-size: 12px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    .area-block p { font-size: 12px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; margin: 1px 0 !important; }
    .plan-page { display: flex !important; flex-direction: column !important; height: 277mm !important; width: 200mm !important; overflow: hidden !important; }
    .plan-top { flex-shrink: 0 !important; }
    .plan-diagram-area { flex: 1 1 auto !important; display: flex !important; align-items: stretch !important; overflow: hidden !important; }
    .plan-diagram-area svg { width: 100% !important; height: 100% !important; display: block !important; }
    .plan-diagram { display: block !important; width: 100% !important; height: 100% !important; }
    .sig-block { flex-shrink: 0 !important; margin-top: 0 !important; padding-top: 3px !important; }
    .sig-line { font-size: 12px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; font-weight: bold !important; }
    .side-by-side { font-size: 12px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    .side-by-side td { padding: 2px 4px !important; font-size: 12px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    .side-by-side th { padding: 2px 4px !important; font-size: 12px !important; font-weight: bold !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    .firm-details-table td { padding: 2px 4px !important; font-size: 12px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    .firm-details-table .label { font-size: 12px !important; font-weight: bold !important; font-family: 'Arial Narrow', Arial, sans-serif !important; padding: 2px 4px !important; }
    .app-heading { font-size: 12px !important; font-weight: bold !important; margin: 2px 0 3px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    .wm-footer { display: block !important; }
    .pl-h2 { font-size: 12px !important; font-weight: bold !important; margin: 1px 0 2px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    .col-heading { font-size: 12px !important; font-weight: bold !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    .label { font-size: 12px !important; font-weight: bold !important; font-family: 'Arial Narrow', Arial, sans-serif !important; }
    .bdr-tbl td { font-size: 12px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; padding: 2px 4px !important; }
    .boundary-table td { font-size: 12px !important; font-family: 'Arial Narrow', Arial, sans-serif !important; padding: 2px 4px !important; }
  }
  body { font-family: 'Arial Narrow', Arial, sans-serif; font-size: 12px; color: #000; }
  .page { max-width: 800px; margin: 0 auto; padding: 16px; }
  h1 { font-size: 14pt; text-align: center; margin-bottom: 4px; font-family: 'Arial Narrow', Arial, sans-serif; }
  h2 { font-size: 12pt; font-weight: bold; text-align: center; margin-top: 2px; margin-bottom: 12px; font-family: 'Arial Narrow', Arial, sans-serif; }
  .pl-h2 { font-size: 12pt; text-align: center; margin: 4px 0 6px; font-weight: bold; font-family: 'Arial Narrow', Arial, sans-serif; }
  .app-heading { font-size: 12pt; font-weight: bold; text-align: center; margin: 4px 0 8px; font-family: 'Arial Narrow', Arial, sans-serif; }
  .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 6px; margin-bottom: 8px; background-color: #B2EBF2; padding: 8px 8px 6px; }
  .header h1 { font-size: 14pt; margin: 0; color: #000; font-family: 'Arial Narrow', Arial, sans-serif; }
  .header p { margin: 2px 0; font-size: 12px; color: #000; font-family: 'Arial Narrow', Arial, sans-serif; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  th { padding: 2px 4px; font-family: 'Arial Narrow', Arial, sans-serif; font-size: 12px; font-weight: bold; vertical-align: top; }
  td { padding: 3px 6px; vertical-align: top; font-family: 'Arial Narrow', Arial, sans-serif; font-size: 12px; }
  .label { font-weight: bold; width: 160px; font-family: 'Arial Narrow', Arial, sans-serif; font-size: 12px; }
  .sig-block { margin-top: 30px; display: flex; justify-content: space-between; }
  .sig-line { border-top: 1px solid #000; width: 200px; padding-top: 4px; font-size: 12px; font-weight: bold; font-family: 'Arial Narrow', Arial, sans-serif; }
  p { line-height: 1.5; margin: 3px 0; font-family: 'Arial Narrow', Arial, sans-serif; font-size: 12px; }
  .print-btn { position: fixed; top: 10px; right: 10px; padding: 8px 16px; background: #0ea5e9; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 12pt; }
  .area-block { border: 1px solid #000; padding: 4px 8px; margin: 3px 0; display: inline-block; min-width: 260px; font-size: 12px; font-family: 'Arial Narrow', Arial, sans-serif; }
  .area-block p { margin: 1px 0; line-height: 1.3; font-size: 12px; font-family: 'Arial Narrow', Arial, sans-serif; }
  .boundary-table td { border: 1px solid #000; padding: 2px 4px; font-size: 12px; font-family: 'Arial Narrow', Arial, sans-serif; }
  .plan-diagram { display: block; width: 100%; height: 100%; }
  .plan-page { display: flex; flex-direction: column; }
  .plan-top { flex-shrink: 0; }
  .plan-diagram-area { flex: 1 1 auto; display: flex; align-items: stretch; overflow: hidden; min-height: 180px; }
  .plan-diagram-area svg { width: 100%; height: 100%; display: block; }
  .wm-footer { display: none; position: fixed; bottom: 8mm; left: 0; right: 0; text-align: center; font-size: 15pt; font-weight: bold; color: rgba(0,150,180,0.18); pointer-events: none; z-index: 9999; letter-spacing: 2px; }
  .side-by-side { display: flex; gap: 0; width: 100%; margin-bottom: 3px; border: 1px solid #000; }
  .side-by-side .col { flex: 1; padding: 2px 4px; }
  .side-by-side .col:first-child { border-right: 1px solid #000; }
  .side-by-side .col-heading { font-weight: bold; font-size: 12px; margin-bottom: 2px; border-bottom: 1px solid #ccc; padding-bottom: 2px; font-family: 'Arial Narrow', Arial, sans-serif; }
  .side-by-side table { width: 100%; margin-bottom: 0; }
  .side-by-side td { font-size: 12px; padding: 2px 4px; border: none; font-family: 'Arial Narrow', Arial, sans-serif; }
  .side-by-side th { font-size: 12px; padding: 2px 4px; font-weight: bold; font-family: 'Arial Narrow', Arial, sans-serif; }
  .side-by-side .bdr-tbl td { border: 1px solid #000; padding: 2px 4px; font-size: 12px; font-family: 'Arial Narrow', Arial, sans-serif; }
  .firm-details-table td { padding: 2px 4px; font-size: 12px; font-family: 'Arial Narrow', Arial, sans-serif; }
  .firm-details-table .label { font-size: 12px; font-weight: bold; font-family: 'Arial Narrow', Arial, sans-serif; width: 150px; }
`;
function openPrint(html) {
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Print</title><style>${PRINT_CSS}</style></head><body>
    <button class="print-btn no-print" onclick="window.print()">🖨️ Print</button>
    <div class="wm-footer">Barote Consultancy</div>
    ${html}
  </body></html>`);
  w.document.close();
}
function companyHeader(app) {
  const firm = app.businessName || "___________";
  const addr = app.firmAddress || "___________";
  return `<div class="header">
    <h1>${firm}</h1>
    <p>${addr}</p>
  </div>`;
}
function fdaCoveringLetterSubject(serviceType, firmName) {
  const st = serviceType || "";
  const msFirm = `M/s ${firmName}`;
  if (st.includes("NewFirm") || st.includes("New Firm"))
    return `Sub: Application for Grant of New Drug License – ${msFirm}`;
  if (st.includes("ChangePremise") || st.includes("Change Premise"))
    return `Sub: Application for Change of Premises – ${msFirm}`;
  if (st.includes("Alteration"))
    return `Sub: Application for Alteration of Premises – ${msFirm}`;
  if (st.includes("AddPharmacist") || st.includes("Add Pharmacist"))
    return `Sub: Application for Addition of Pharmacist – ${msFirm}`;
  if (st.includes("RemovePharmacist") || st.includes("Remove Pharmacist"))
    return `Sub: Application for Removal of Pharmacist – ${msFirm}`;
  if (st.includes("Renewal"))
    return `Sub: Application for Renewal of Drug License – ${msFirm}`;
  if (st.toLowerCase().includes("fssai") || st.toLowerCase().includes("food"))
    return `Sub: Application for FSSAI Food Licence – ${msFirm}`;
  if (st.toUpperCase().includes("GST"))
    return `Sub: Application for GST Registration – ${msFirm}`;
  if (st.toLowerCase().includes("msme") || st.toLowerCase().includes("udyam"))
    return `Sub: Application for MSME/Udyam Registration – ${msFirm}`;
  const pretty = st.replace(/([A-Z])/g, " $1").trim();
  return `Sub: Application for ${pretty} – ${msFirm}`;
}
function fdaCoveringLetterBody(app, owner, firm, addr) {
  var _a, _b, _c;
  const st = app.serviceType || "";
  if (st.includes("NewFirm") || st.includes("New Firm")) {
    return `<p>I, <strong>${owner}</strong>, Proprietor/Authorised Person of M/s <strong>${firm}</strong>, situated at <strong>${addr}</strong>, hereby submit this application for the grant of a new Drug License for the above-mentioned premises.</p>
    <p>All required documents as per the Drugs and Cosmetics Act, 1940, and rules thereunder are enclosed herewith for your kind perusal and consideration.</p>
    <p>I request you to kindly inspect the premises at your earliest convenience and grant the Drug License.</p>`;
  }
  if (st.includes("ChangePremise") || st.includes("Change Premise")) {
    const oldAddr = app.changePremiseOldAddress || "___________";
    const newAddr = app.changePremiseNewAddress || "___________";
    return `<p>I, <strong>${owner}</strong>, Proprietor/Authorised Person of M/s <strong>${firm}</strong>, request your kind approval for the change of premises of the drug establishment from:</p>
    <p><strong>Old Address:</strong> ${oldAddr}</p>
    <p><strong>New Address:</strong> ${newAddr}</p>
    <p>All required documents including the revised plan layout of the new premises are enclosed herewith. I undertake to comply with all provisions of the Drugs and Cosmetics Act, 1940.</p>`;
  }
  if (st.includes("Alteration")) {
    const oldArea = app.alterationOldArea != null ? `${app.alterationOldArea} Sq. Ft.` : "___________";
    const newArea = app.alterationProposedArea != null ? `${app.alterationProposedArea} Sq. Ft.` : "___________";
    return `<p>I, <strong>${owner}</strong>, Proprietor/Authorised Person of M/s <strong>${firm}</strong>, situated at <strong>${addr}</strong>, hereby apply for approval for the alteration/modification of the existing premises.</p>
    <p><strong>Old Area:</strong> ${oldArea} &nbsp;|&nbsp; <strong>Proposed Area After Alteration:</strong> ${newArea}</p>
    <p>The revised plan layout and supporting documents are enclosed herewith. I undertake that the alterations will be carried out as per the approved plan and in compliance with the Drugs and Cosmetics Act, 1940.</p>`;
  }
  if (st.includes("AddPharmacist") || st.includes("Add Pharmacist")) {
    let body = `<p>I, <strong>${owner}</strong>, Proprietor/Authorised Person of M/s <strong>${firm}</strong>, situated at <strong>${addr}</strong>, hereby request your approval for the addition of a new Registered Pharmacist at the said premises.</p>
    <p>The appointment letter, pharmacist's registration certificate, and other required documents are enclosed herewith for your reference.</p>`;
    if (app.resignOldPharmacist) {
      const oldName = app.oldPharmacistName || "___________";
      const oldReg = app.oldPharmacistRegNo || "___________";
      const oldDate = app.oldPharmacistResignationDate || "___________";
      body += `<p>Additionally, please be informed that the previous pharmacist, <strong>${oldName}</strong> (Reg. No.: ${oldReg}), has tendered resignation with effect from <strong>${oldDate}</strong>. The resignation letter and acceptance are enclosed separately.</p>`;
    }
    return body;
  }
  if (st.includes("RemovePharmacist") || st.includes("Remove Pharmacist")) {
    const phName = Array.isArray(app.pharmacists) && ((_a = app.pharmacists[0]) == null ? void 0 : _a.fullName) ? app.pharmacists[0].fullName : "___________";
    const phReg = Array.isArray(app.pharmacists) && ((_b = app.pharmacists[0]) == null ? void 0 : _b.registrationNumber) ? app.pharmacists[0].registrationNumber : "___________";
    const phLeaving = Array.isArray(app.pharmacists) && ((_c = app.pharmacists[0]) == null ? void 0 : _c.dateOfLeaving) ? app.pharmacists[0].dateOfLeaving : "___________";
    return `<p>I, <strong>${owner}</strong>, Proprietor/Authorised Person of M/s <strong>${firm}</strong>, situated at <strong>${addr}</strong>, hereby submit this application for acceptance of the resignation of the Registered Pharmacist:</p>
    <p><strong>Pharmacist Name:</strong> ${phName} &nbsp;|&nbsp; <strong>Reg. No.:</strong> ${phReg} &nbsp;|&nbsp; <strong>Date of Resignation:</strong> ${phLeaving}</p>
    <p>The resignation letter and other required documents are enclosed herewith for your kind consideration.</p>`;
  }
  if (st.includes("Renewal")) {
    return `<p>I, <strong>${owner}</strong>, Proprietor/Authorised Person of M/s <strong>${firm}</strong>, situated at <strong>${addr}</strong>, hereby apply for the renewal of the Drug License for the above-mentioned premises.</p>
    <p>All required documents are enclosed herewith. I request you to kindly process the renewal at the earliest.</p>`;
  }
  if (st.toLowerCase().includes("fssai") || st.toLowerCase().includes("food")) {
    return `<p>I, <strong>${owner}</strong>, Proprietor/Authorised Person of M/s <strong>${firm}</strong>, situated at <strong>${addr}</strong>, hereby submit this application for the grant/renewal of FSSAI Food Licence for the above-mentioned premises.</p>
    <p>All required documents as per the Food Safety and Standards Act, 2006, are enclosed herewith for your kind perusal.</p>`;
  }
  if (st.toUpperCase().includes("GST")) {
    return `<p>I, <strong>${owner}</strong>, Proprietor/Authorised Person of M/s <strong>${firm}</strong>, situated at <strong>${addr}</strong>, hereby submit this application for GST Registration assistance.</p>
    <p>All required documents are enclosed herewith for your kind perusal and necessary action.</p>`;
  }
  if (st.toLowerCase().includes("msme") || st.toLowerCase().includes("udyam")) {
    return `<p>I, <strong>${owner}</strong>, Proprietor/Authorised Person of M/s <strong>${firm}</strong>, situated at <strong>${addr}</strong>, hereby submit this application for MSME/Udyam Registration.</p>
    <p>All required documents are enclosed herewith. I request your kind assistance in processing this registration.</p>`;
  }
  const pretty = st.replace(/([A-Z])/g, " $1").trim();
  return `<p>I, <strong>${owner}</strong>, Proprietor/Authorised Person of M/s <strong>${firm}</strong>, situated at <strong>${addr}</strong>, hereby submit the application for <strong>${pretty}</strong>.</p>
  <p>All required documents are enclosed herewith for your kind perusal and necessary action.</p>`;
}
function escSvg(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderPdfEntrance(pos, entranceSide, et, _entranceLabel, _shuttT, _shutterColor) {
  const { x, y, w, h } = pos;
  const isHoriz = entranceSide === "North" || entranceSide === "South";
  const dim = isHoriz ? w : h;
  if (et === "No Wall / Open") return "";
  let gapSize;
  if (et === "Half Wall Opening" || et === "Half Wall Shutter") {
    gapSize = dim * 0.5;
  } else if (et === "Full Wall Shutter") {
    gapSize = dim * 0.6;
  } else {
    gapSize = dim * 0.3;
  }
  const wallCenter = isHoriz ? x + w / 2 : y + h / 2;
  const gapStart = wallCenter - gapSize / 2;
  const gapEnd = gapStart + gapSize;
  let seg1 = "";
  let seg2 = "";
  let shutterRect = "";
  if (isHoriz) {
    const wy = entranceSide === "North" ? y : y + h;
    const wallX1 = x;
    const wallX2 = x + w;
    if (gapStart > wallX1) {
      seg1 = `<line x1="${wallX1}" y1="${wy}" x2="${gapStart}" y2="${wy}" stroke="#000" stroke-width="2.5"/>`;
    }
    if (gapEnd < wallX2) {
      seg2 = `<line x1="${gapEnd}" y1="${wy}" x2="${wallX2}" y2="${wy}" stroke="#000" stroke-width="2.5"/>`;
    }
    if (et === "Full Wall Shutter") {
      shutterRect = `<rect x="${gapStart}" y="${wy - 4}" width="${gapSize}" height="8" fill="#06B6D4" stroke="#0891B2" stroke-width="1"/>`;
    } else if (et === "Half Wall Shutter") {
      shutterRect = `<rect x="${gapStart}" y="${wy - 4}" width="${gapSize}" height="8" fill="#06B6D4" stroke="#0891B2" stroke-width="1"/>`;
    } else if (et === "Half Wall Opening") {
      shutterRect = `<rect x="${gapStart}" y="${wy - 3}" width="${gapSize}" height="6" fill="#BAE6FD" stroke="#06B6D4" stroke-width="1" stroke-dasharray="3,2"/>`;
    }
  } else {
    const wx = entranceSide === "East" ? x + w : x;
    const wallY1 = y;
    const wallY2 = y + h;
    if (gapStart > wallY1) {
      seg1 = `<line x1="${wx}" y1="${wallY1}" x2="${wx}" y2="${gapStart}" stroke="#000" stroke-width="2.5"/>`;
    }
    if (gapEnd < wallY2) {
      seg2 = `<line x1="${wx}" y1="${gapEnd}" x2="${wx}" y2="${wallY2}" stroke="#000" stroke-width="2.5"/>`;
    }
    if (et === "Full Wall Shutter") {
      shutterRect = `<rect x="${wx - 4}" y="${gapStart}" width="8" height="${gapSize}" fill="#06B6D4" stroke="#0891B2" stroke-width="1"/>`;
    } else if (et === "Half Wall Shutter") {
      shutterRect = `<rect x="${wx - 4}" y="${gapStart}" width="8" height="${gapSize}" fill="#06B6D4" stroke="#0891B2" stroke-width="1"/>`;
    } else if (et === "Half Wall Opening") {
      shutterRect = `<rect x="${wx - 3}" y="${gapStart}" width="6" height="${gapSize}" fill="#BAE6FD" stroke="#06B6D4" stroke-width="1" stroke-dasharray="3,2"/>`;
    }
  }
  return `${seg1}${seg2}${shutterRect}`;
}
function placeRoomPdf(ref, side, rw, rh) {
  if (side === "East") return { x: ref.x + ref.w, y: ref.y };
  if (side === "West") return { x: ref.x - rw, y: ref.y };
  if (side === "North") return { x: ref.x, y: ref.y - rh };
  return { x: ref.x, y: ref.y + ref.h };
}
function buildPlanDiagram(details, availH = 650, availW = 780) {
  const WALL = 3;
  const rooms = Array.isArray(details.rooms) ? details.rooms : [];
  const rpFt = [];
  if (rooms.length > 0) {
    rooms.forEach((room, i) => {
      const rw = Math.max(room.length || 1, 0.5);
      const rh = Math.max(room.width || 1, 0.5);
      const pos = i === 0 ? { x: 0, y: 0 } : placeRoomPdf(rpFt[i - 1], room.whichSide || "East", rw, rh);
      rpFt.push({ x: pos.x, y: pos.y, w: rw, h: rh });
    });
  } else {
    const l = details.premisesLength > 0 ? details.premisesLength : 10;
    const w = details.premisesWidth > 0 ? details.premisesWidth : 8;
    rpFt.push({ x: 0, y: 0, w: l, h: w });
  }
  const minFx = Math.min(...rpFt.map((p) => p.x));
  const minFy = Math.min(...rpFt.map((p) => p.y));
  const maxFx = Math.max(...rpFt.map((p) => p.x + p.w));
  const maxFy = Math.max(...rpFt.map((p) => p.y + p.h));
  const totalFW = maxFx - minFx;
  const totalFH = maxFy - minFy;
  const DIM_PAD = 36;
  const drawW = availW - DIM_PAD * 2;
  const drawH = availH - DIM_PAD * 2;
  const isSingleRoom = rooms.length <= 1;
  const baseScaleX = drawW / Math.max(totalFW, 0.01);
  const baseScaleY = drawH / Math.max(totalFH, 0.01);
  const baseScale = Math.min(baseScaleX, baseScaleY);
  const scale = isSingleRoom ? baseScale * 0.5 : baseScale;
  const scaledW = totalFW * scale;
  const scaledH = totalFH * scale;
  const centerOffX = (drawW - scaledW) / 2;
  const centerOffY = (drawH - scaledH) / 2;
  const rp = rpFt.map(
    (r) => ({
      x: centerOffX + (r.x - minFx) * scale,
      y: centerOffY + (r.y - minFy) * scale,
      w: Math.max(r.w * scale, 10),
      h: Math.max(r.h * scale, 10)
    })
  );
  const rpMinX = Math.min(...rp.map((p) => p.x));
  const rpMinY = Math.min(...rp.map((p) => p.y));
  const rpMaxX = Math.max(...rp.map((p) => p.x + p.w));
  const rpMaxY = Math.max(...rp.map((p) => p.y + p.h));
  const vbX = rpMinX - DIM_PAD;
  const vbY = rpMinY - DIM_PAD;
  const vbW = rpMaxX - rpMinX + DIM_PAD * 2;
  const vbH = rpMaxY - rpMinY + DIM_PAD * 2;
  function opposite(side) {
    if (side === "North") return "South";
    if (side === "South") return "North";
    if (side === "East") return "West";
    return "East";
  }
  const openPassage = rooms.map((room, i) => {
    if (i === 0) return false;
    const ws = room.whichSide || "East";
    const roomEntersFacingPrev = (room.entranceSide || "") === opposite(ws);
    const prevRoom = rooms[i - 1];
    const prevEsSide = i === 1 ? details.frontOfShop || "South" : (prevRoom == null ? void 0 : prevRoom.entranceSide) || "";
    const prevEntersFacingNext = prevRoom && prevEsSide === ws;
    return roomEntersFacingPrev || !!prevEntersFacingNext;
  });
  let roomSvg = "";
  let entranceSvg = "";
  let dimSvg = "";
  if (rooms.length === 0) {
    const solo = rp[0];
    if (solo) {
      const frontSide = details.frontOfShop || "South";
      const et = "Full Wall Shutter";
      roomSvg = `<rect x="${solo.x}" y="${solo.y}" width="${solo.w}" height="${solo.h}" fill="#f0f7ff"/>`;
      const allSidesS = [
        {
          name: "North",
          x1: solo.x,
          y1: solo.y,
          x2: solo.x + solo.w,
          y2: solo.y
        },
        {
          name: "South",
          x1: solo.x,
          y1: solo.y + solo.h,
          x2: solo.x + solo.w,
          y2: solo.y + solo.h
        },
        {
          name: "West",
          x1: solo.x,
          y1: solo.y,
          x2: solo.x,
          y2: solo.y + solo.h
        },
        {
          name: "East",
          x1: solo.x + solo.w,
          y1: solo.y,
          x2: solo.x + solo.w,
          y2: solo.y + solo.h
        }
      ];
      for (const s of allSidesS) {
        if (s.name === frontSide) {
          entranceSvg += renderPdfEntrance(solo, frontSide, et);
        } else {
          roomSvg += `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="#000" stroke-width="${WALL}" stroke-linecap="square"/>`;
        }
      }
    }
  } else {
    rooms.forEach((room, i) => {
      if (!rp[i]) return;
      const { x, y, w, h } = rp[i];
      const cx = x + w / 2;
      const cy = y + h / 2;
      const fs = Math.max(Math.min(16, w < 80 ? 9 : 14), 8);
      roomSvg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f0f7ff"/>`;
      const esSide = i === 0 ? details.frontOfShop || "South" : room.entranceSide || "South";
      const et = room.entranceType || "Full Wall Shutter";
      const sharedSide = i > 0 ? opposite(room.whichSide || "East") : null;
      const sharedIsOpen = i > 0 ? openPassage[i] : false;
      const nextRoom = rooms[i + 1];
      const skipTowardNextSide = nextRoom ? nextRoom.whichSide || "East" : null;
      const allSides = [
        { name: "North", x1: x, y1: y, x2: x + w, y2: y },
        { name: "South", x1: x, y1: y + h, x2: x + w, y2: y + h },
        { name: "West", x1: x, y1: y, x2: x, y2: y + h },
        { name: "East", x1: x + w, y1: y, x2: x + w, y2: y + h }
      ];
      for (const s of allSides) {
        if (skipTowardNextSide !== null && s.name === skipTowardNextSide)
          continue;
        const isSharedWithPrev = sharedSide !== null && s.name === sharedSide;
        if (isSharedWithPrev) {
          if (sharedIsOpen) {
            const thisEntranceIsOnShared = esSide === sharedSide;
            const prevRoom = rooms[i - 1];
            const prevEt = (prevRoom == null ? void 0 : prevRoom.entranceType) || "Full Wall Shutter";
            const useEt = thisEntranceIsOnShared ? et : prevEt;
            entranceSvg += renderPdfEntrance(
              rp[i],
              sharedSide,
              useEt
            );
          } else {
            roomSvg += `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="#000" stroke-width="${WALL}" stroke-linecap="square"/>`;
          }
          continue;
        }
        if (s.name === esSide) {
          entranceSvg += renderPdfEntrance(rp[i], esSide, et);
          continue;
        }
        roomSvg += `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="#000" stroke-width="${WALL}" stroke-linecap="square"/>`;
      }
      roomSvg += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="${fs}" font-weight="bold" fill="#1e40af">${escSvg(`Room No ${i + 1}`)}</text>`;
      const dimFs = Math.max(Math.min(12, w < 60 ? 8 : 11), 7);
      dimSvg += `<text x="${cx}" y="${y - 5}" text-anchor="middle" font-size="${dimFs}" font-weight="bold" fill="#1e3a8a">${escSvg(String(room.width))} FT</text>`;
      dimSvg += `<text x="${x + w + 5}" y="${cy + 4}" text-anchor="start" font-size="${dimFs}" font-weight="bold" fill="#1e3a8a">${escSvg(String(room.length))} FT</text>`;
    });
  }
  const midX = (rpMinX + rpMaxX) / 2;
  const midY = (rpMinY + rpMaxY) / 2;
  const compass = `
    <text x="${midX}" y="${rpMinY - DIM_PAD + 14}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">N</text>
    <text x="${midX}" y="${rpMaxY + DIM_PAD - 4}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">S</text>
    <text x="${rpMinX - DIM_PAD + 14}" y="${midY + 5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">W</text>
    <text x="${rpMaxX + DIM_PAD - 4}" y="${midY + 5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">E</text>`;
  return `<svg class="plan-diagram" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    ${roomSvg}
    ${entranceSvg}
    ${compass}
    ${dimSvg}
  </svg>`;
}
function personBlock(index, name, address, email, mobile, idCardNo) {
  const label = index !== null ? `<p><strong>${index}.</strong></p>` : "";
  return `${label}
    <table style="margin-bottom:6px">
      <tr><td class="label">Name:</td><td>${name || "___________"}</td></tr>
      <tr><td class="label">Address:</td><td>${address || "___________"}</td></tr>
      <tr><td class="label">Email ID:</td><td>${email || "___________"}</td></tr>
      <tr><td class="label">Mobile No.:</td><td>${mobile || "___________"}</td></tr>
      <tr><td class="label">ID Card No:</td><td>${idCardNo || "___________"}</td></tr>
    </table>`;
}
function buildAnnexureDirPersons(btd, app) {
  const idCard = (p) => p.aadhaarNo || p.panNo || "___________";
  if (!btd || btd.businessType === "Proprietary") {
    const propName = (btd == null ? void 0 : btd.proprietorName) || app.proprietorName || "___________";
    const propAddr = (btd == null ? void 0 : btd.proprietorAddress) || app.firmAddress || "___________";
    const propEmail = (btd == null ? void 0 : btd.proprietorEmail) || "___________";
    const propMobile = (btd == null ? void 0 : btd.proprietorMobile) || app.mobileNumber || "___________";
    const propId = idCard({
      aadhaarNo: btd == null ? void 0 : btd.aadhaarNo,
      panNo: btd == null ? void 0 : btd.panNo
    });
    return {
      roleLabel: "Proprietor",
      personsHtml: personBlock(
        null,
        propName,
        propAddr,
        propEmail,
        propMobile,
        propId
      )
    };
  }
  const sep = '<hr style="border:none;border-top:1px solid #ccc;margin:6px 0"/>';
  const empty = personBlock(
    null,
    "___________",
    "___________",
    "___________",
    "___________",
    "___________"
  );
  if (btd.businessType === "Partnership") {
    const persons = btd.partners || [];
    return {
      roleLabel: "Partners",
      personsHtml: persons.length ? persons.map(
        (p, i) => personBlock(
          i + 1,
          p.name,
          p.address,
          p.email,
          p.mobile,
          idCard(p)
        )
      ).join(sep) : empty
    };
  }
  if (btd.businessType === "LLP") {
    const persons = btd.designatedPartners || [];
    return {
      roleLabel: "Designated Partners",
      personsHtml: persons.length ? persons.map(
        (p, i) => personBlock(
          i + 1,
          p.name,
          p.address,
          p.email,
          p.mobile,
          idCard(p)
        )
      ).join(sep) : empty
    };
  }
  if (btd.businessType === "Pvt. Ltd." || btd.businessType === "Ltd.") {
    const persons = btd.directors || [];
    return {
      roleLabel: "Directors",
      personsHtml: persons.length ? persons.map(
        (p, i) => personBlock(
          i + 1,
          p.name,
          p.address,
          p.email,
          p.mobile,
          idCard(p)
        )
      ).join(sep) : empty
    };
  }
  if (btd.businessType === "Trust" || btd.businessType === "Society") {
    const persons = btd.trustees || [];
    return {
      roleLabel: "Trustees / Office Bearers",
      personsHtml: persons.length ? persons.map(
        (p, i) => personBlock(
          i + 1,
          p.name,
          p.address,
          p.email,
          p.mobile,
          idCard(p)
        )
      ).join(sep) : empty
    };
  }
  if (btd.businessType === "Other") {
    return {
      roleLabel: "Authorized Person",
      personsHtml: personBlock(
        null,
        btd.authorizedPersonName,
        btd.authorizedPersonAddress,
        "___________",
        btd.authorizedPersonMobile,
        btd.authorizedPersonAadhaar || btd.authorizedPersonPan || "___________"
      )
    };
  }
  return {
    roleLabel: "Applicant",
    personsHtml: personBlock(
      null,
      app.proprietorName || "___________",
      app.firmAddress || "___________",
      "___________",
      app.mobileNumber || "___________",
      "___________"
    )
  };
}
const FORM_TYPES = [
  { key: "fda_covering_letter", label: "FDA Covering Letter" },
  { key: "plan_layout", label: "Plan Layout" },
  { key: "annexure_dir", label: "Annexure DIR" },
  {
    key: "job_appointment_pharmacist",
    label: "Job Appointment Letter (Pharmacist)"
  },
  {
    key: "job_acceptance_pharmacist",
    label: "Job Acceptance Letter (Pharmacist)"
  },
  {
    key: "resignation_acceptance_pharmacist",
    label: "Resignation & Acceptance Letter (Pharmacist)"
  },
  { key: "change_premise", label: "Application for Change of Premise" },
  { key: "alteration_premise", label: "Application for Alteration of Premise" }
];
function printForm(formKey, app, masterData, pharmacists, planLayoutDetails) {
  var _a, _b, _c, _d, _e;
  const date = fmtDate(app.applicationDate);
  const header = companyHeader(app);
  const firm = app.businessName || "___________";
  const owner = app.proprietorName || "___________";
  const addr = app.firmAddress || "___________";
  const mobile = app.mobileNumber || "___________";
  const firmId = app.firmId || "___________";
  const appPharmacists = Array.isArray(pharmacists) ? pharmacists : [];
  const firstPh = appPharmacists[0];
  const phName = (firstPh == null ? void 0 : firstPh.fullName) ?? ((_a = masterData == null ? void 0 : masterData.pharmacist) == null ? void 0 : _a.name) ?? "___________";
  const phReg = (firstPh == null ? void 0 : firstPh.registrationNumber) ?? ((_b = masterData == null ? void 0 : masterData.pharmacist) == null ? void 0 : _b.registrationNumber) ?? "___________";
  const phQual = (firstPh == null ? void 0 : firstPh.qualification) ?? ((_c = masterData == null ? void 0 : masterData.pharmacist) == null ? void 0 : _c.qualification) ?? "___________";
  const phAddr = (firstPh == null ? void 0 : firstPh.address) ?? ((_d = masterData == null ? void 0 : masterData.pharmacist) == null ? void 0 : _d.address) ?? "___________";
  const phContact = (firstPh == null ? void 0 : firstPh.mobileNumber) ?? ((_e = masterData == null ? void 0 : masterData.pharmacist) == null ? void 0 : _e.contact) ?? "___________";
  const phJoining = (firstPh == null ? void 0 : firstPh.dateOfJoining) ?? "___________";
  void (masterData == null ? void 0 : masterData.fda);
  switch (formKey) {
    case "fda_covering_letter": {
      const ci = masterData == null ? void 0 : masterData.companyInfo;
      const DEFAULT_FDA = "Assistant Commissioner, Food & Drug Administration (Drug) Buldhana (MH)";
      const fdaAddr = app.fdaAddress || (ci == null ? void 0 : ci.fdaAddress) || DEFAULT_FDA;
      const today = fmtDate(void 0);
      const subject = fdaCoveringLetterSubject(app.serviceType, firm);
      const bodyHtml = fdaCoveringLetterBody(app, owner, firm, addr);
      openPrint(`<div class="page">
        ${header}
        <p style="margin-top:8px"><strong>Date:</strong> ${today}</p>
        <p style="margin-top:10px"><strong>To,</strong><br>${fdaAddr.replace(/\n/g, "<br>")}</p>
        <p style="margin-top:10px"><strong>${subject}</strong></p>
        <p>Respected Sir/Madam,</p>
        ${bodyHtml}
        <table style="margin-top:12px;margin-bottom:8px;border:1px solid #ccc">
          <tr style="background:#f0f0f0">
            <td colspan="2" style="border:1px solid #ccc;padding:5px;font-weight:bold">Applicant / Firm Details</td>
          </tr>
          <tr>
            <td class="label" style="border:1px solid #ccc;padding:5px">Firm Name:</td>
            <td style="border:1px solid #ccc;padding:5px">${firm}</td>
          </tr>
          <tr>
            <td class="label" style="border:1px solid #ccc;padding:5px">Firm ID:</td>
            <td style="border:1px solid #ccc;padding:5px">${firmId}</td>
          </tr>
          <tr>
            <td class="label" style="border:1px solid #ccc;padding:5px">Address:</td>
            <td style="border:1px solid #ccc;padding:5px">${addr}</td>
          </tr>
          <tr>
            <td class="label" style="border:1px solid #ccc;padding:5px">Proprietor / Authorised Person:</td>
            <td style="border:1px solid #ccc;padding:5px">${owner}</td>
          </tr>
          <tr>
            <td class="label" style="border:1px solid #ccc;padding:5px">Mobile / Contact:</td>
            <td style="border:1px solid #ccc;padding:5px">${mobile}</td>
          </tr>
          <tr>
            <td class="label" style="border:1px solid #ccc;padding:5px">Service Type:</td>
            <td style="border:1px solid #ccc;padding:5px">${app.serviceType.replace(/([A-Z])/g, " $1").trim()}</td>
          </tr>
        </table>
        <p style="margin-top:10px">Yours faithfully,</p>
        <div class="sig-block" style="margin-top:36px">
          <div>
            <div class="sig-line">Signature of Applicant / Proprietor</div>
            <p>${firm}</p>
            <p>Date: ${today}</p>
          </div>
        </div>
      </div>`);
      break;
    }
    case "plan_layout": {
      const pld = planLayoutDetails;
      const isAlt = String(app.serviceType).includes("Alteration");
      const isChgPrem = String(app.serviceType).includes("ChangePremise");
      const displayAddr = isChgPrem && app.changePremiseNewAddress ? app.changePremiseNewAddress : addr;
      const appHeading = `<p class="app-heading">${getApplicationHeading(app.serviceType)}</p>`;
      const roomsTableInner = pld && Array.isArray(pld.rooms) && pld.rooms.length > 0 ? `<table style="border-collapse:collapse;width:100%;font-family:'Arial Narrow',Arial,sans-serif;font-size:12px">
              <tr style="background:#f0f0f0">
                <th style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">Room</th>
                <th style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">L (ft)</th>
                <th style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">W (ft)</th>
                <th style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">Area</th>
              </tr>
              ${pld.rooms.map(
        (r, idx) => `<tr>
                  <td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">No ${idx + 1}</td>
                  <td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${r.length}</td>
                  <td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${r.width}</td>
                  <td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${(r.length * r.width).toFixed(1)}</td>
                </tr>`
      ).join("")}
            </table>` : "<em style='font-size:12px;font-family:Arial Narrow,Arial,sans-serif'>No rooms entered</em>";
      const boundaryTableInner = pld ? `<table class="bdr-tbl" style="border-collapse:collapse;width:100%;font-family:'Arial Narrow',Arial,sans-serif;font-size:12px">
            <tr><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">East:</td><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${pld.boundaryEast || "—"}</td></tr>
            <tr><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">West:</td><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${pld.boundaryWest || "—"}</td></tr>
            <tr><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">North:</td><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${pld.boundaryNorth || "—"}</td></tr>
            <tr><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">South:</td><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${pld.boundarySouth || "—"}</td></tr>
          </table>` : "<em style='font-size:12px;font-family:Arial Narrow,Arial,sans-serif'>No boundary details</em>";
      const sideBySide = `<div class="side-by-side">
        <div class="col">
          <div class="col-heading">Room Details</div>
          ${roomsTableInner}
        </div>
        <div class="col">
          <div class="col-heading">Boundary Details</div>
          ${boundaryTableInner}
        </div>
      </div>`;
      let areaBlock = "";
      if (pld) {
        if (Array.isArray(pld.rooms) && pld.rooms.length > 0) {
          const roomAreas = pld.rooms.map((r) => r.length * r.width);
          const totalSqFt = roomAreas.reduce((s, a) => s + a, 0);
          const totalSqMtr = (totalSqFt * 0.0929).toFixed(2);
          const roomLabels = pld.rooms.map((_, i) => `Room ${i + 1}`).join(" + ");
          const calcParts = pld.rooms.map(
            (r, i) => `(${r.length} × ${r.width})${i < pld.rooms.length - 1 ? " + " : ""}`
          ).join("");
          const indivAreas = roomAreas.map((a) => a.toFixed(2)).join(" + ");
          areaBlock = `<div class="area-block">
            <p><strong>Area = ${roomLabels} = ${calcParts} Sq. Ft.</strong></p>
            <p>&nbsp;&nbsp;= ${indivAreas} Sq. Ft.</p>
            <p>&nbsp;&nbsp;= <strong>${totalSqFt.toFixed(2)} Sq. Ft.</strong></p>
            <p>&nbsp;&nbsp;= <strong>${totalSqMtr} Sq. Mtr.</strong></p>
          </div>`;
        } else {
          const sqFt = (pld.premisesLength * pld.premisesWidth).toFixed(2);
          const sqMtr = (pld.premisesLength * pld.premisesWidth * 0.0929).toFixed(2);
          areaBlock = `<div class="area-block">
            <p><strong>Area = ${pld.premisesLength} × ${pld.premisesWidth} Sq. Ft.</strong></p>
            <p>&nbsp;&nbsp;= <strong>${sqFt} Sq. Ft.</strong></p>
            <p>&nbsp;&nbsp;= <strong>${sqMtr} Sq. Mtr.</strong></p>
          </div>`;
        }
      }
      const diagram = pld ? buildPlanDiagram(pld, 650, 780) : "";
      const alterationSection = isAlt ? `<div class="area-block" style="margin-bottom:4px">
            <p><strong>Alteration Details</strong></p>
            <p>Old Area of Firm: <strong>${app.alterationOldArea != null ? `${app.alterationOldArea} Sq. Ft.` : "___________"}</strong></p>
            <p>Proposed Area (After Alteration): <strong>${app.alterationProposedArea != null ? `${app.alterationProposedArea} Sq. Ft.` : "___________"}</strong></p>
          </div>` : "";
      openPrint(`<div class="plan-page">
        <div class="plan-top">
          ${header}
          ${appHeading}
          <p class="pl-h2" style="margin:2px 0 3px;font-family:'Arial Narrow',Arial,sans-serif;font-size:12px;font-weight:bold">PLAN LAYOUT OF PREMISES</p>
          <table class="firm-details-table" style="margin-bottom:3px;font-family:'Arial Narrow',Arial,sans-serif;font-size:12px;border-collapse:collapse;width:100%">
            <tr>
              <td class="label" style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold;padding:2px 4px">Firm Name:</td>
              <td style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;padding:2px 4px">${firm}</td>
              <td class="label" style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold;padding:2px 4px">Firm ID:</td>
              <td style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;padding:2px 4px">${firmId}</td>
            </tr>
            <tr>
              <td class="label" style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold;padding:2px 4px">Proprietor / Owner:</td>
              <td style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;padding:2px 4px">${owner}</td>
              <td class="label" style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold;padding:2px 4px">Mobile No.:</td>
              <td style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;padding:2px 4px">${mobile}</td>
            </tr>
            <tr>
              <td class="label" style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold;padding:2px 4px">Address of Premises:</td>
              <td colspan="3" style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;padding:2px 4px">${displayAddr}</td>
            </tr>
            <tr>
              <td class="label" style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold;padding:2px 4px">Application Date:</td>
              <td style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;padding:2px 4px">${date}</td>
              ${pld ? `<td class="label" style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold;padding:2px 4px">Front of Shop:</td><td style="font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;padding:2px 4px">${pld.frontOfShop}</td>` : "<td></td><td></td>"}
            </tr>
          </table>
          ${alterationSection}
          ${sideBySide}
          <p style="margin:2px 0 0;font-size:12px;font-weight:bold;font-family:'Arial Narrow',Arial,sans-serif"><strong>Premises Dimensions / Area Calculation:</strong></p>
          ${areaBlock}
        </div>
        <div class="plan-diagram-area">
          ${diagram}
        </div>
          <div style="display:flex;justify-content:space-between;padding-top:6px;border-top:1px solid #000;margin-top:2px">
            <div>
              <div style="width:220px;padding-top:4px;padding-bottom:2px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold;border-top:1px solid #000">Sign of Shop Owner</div>
            </div>
            <div>
              <div style="width:220px;padding-top:4px;padding-bottom:2px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold;border-top:1px solid #000">Sign. of DI / AC. FDA</div>
            </div>
          </div>
      </div>`);
      break;
    }
    case "annexure_dir": {
      const btd = app.businessTypeData;
      const { roleLabel, personsHtml } = buildAnnexureDirPersons(btd, app);
      const entityRef = (btd == null ? void 0 : btd.businessType) === "Trust" || (btd == null ? void 0 : btd.businessType) === "Society" ? "the organization" : (btd == null ? void 0 : btd.businessType) === "Pvt. Ltd." || (btd == null ? void 0 : btd.businessType) === "Ltd." ? "the Company" : "M/s";
      openPrint(`<div class="page">
        ${header}
        <h2>ANNEXURE – DIR</h2>
        <p>Date: ${date}</p>
        <p>To,<br>The Licensing Authority,<br>Drug Inspector</p>
        <p>Sir/Madam,</p>
        <p>We, the undersigned ${roleLabel} of ${entityRef} <strong>${firm}</strong> situated at <strong>${addr}</strong>, hereby declare that:</p>
        <ol>
          <li>The premises are owned/leased/rented and are suitable for storing and dispensing medicines.</li>
          <li>All necessary storage conditions (temperature, humidity, etc.) are maintained.</li>
          <li>A qualified registered pharmacist is in full-time employment at the said premises.</li>
          <li>We undertake to comply with all provisions of the Drugs and Cosmetics Act, 1940, and the rules thereunder.</li>
        </ol>
        <p>We declare that the above information is true and correct to the best of our knowledge.</p>
        <p><strong>Details of ${roleLabel}:</strong></p>
        ${personsHtml}
        <div class="sig-block">
          <div><div class="sig-line">Signature of Applicant</div><p>${owner}</p></div>
          <div><div class="sig-line">Date: ${date}</div></div>
        </div>
      </div>`);
      break;
    }
    case "job_appointment_pharmacist": {
      const list = appPharmacists.length > 0 ? appPharmacists : [null];
      const pages = list.map((ph) => {
        const name = (ph == null ? void 0 : ph.fullName) ?? phName;
        const reg = (ph == null ? void 0 : ph.registrationNumber) ?? phReg;
        const qual = (ph == null ? void 0 : ph.qualification) ?? phQual;
        const address = (ph == null ? void 0 : ph.address) ?? phAddr;
        const contact = (ph == null ? void 0 : ph.mobileNumber) ?? phContact;
        const joining = (ph == null ? void 0 : ph.dateOfJoining) ?? phJoining;
        return `<div class="page" style="page-break-after:always">
          ${header}
          <h2>JOB APPOINTMENT LETTER (PHARMACIST)</h2>
          <p>Date: ${date}</p>
          <p>To,<br>${name}<br>${address}${contact !== "___________" ? `<br>Contact: ${contact}` : ""}</p>
          <p>Dear Sir/Madam,</p>
          <p>We are pleased to inform you that you have been appointed as a <strong>Registered Pharmacist</strong> at M/s <strong>${firm}</strong>, located at <strong>${addr}</strong>.</p>
          <table>
            <tr><td class="label">Designation:</td><td>Registered Pharmacist</td></tr>
            <tr><td class="label">Pharmacist Name:</td><td>${name}</td></tr>
            <tr><td class="label">Registration No.:</td><td>${reg}</td></tr>
            <tr><td class="label">Qualification:</td><td>${qual}</td></tr>
            <tr><td class="label">Date of Joining:</td><td>${joining || "___________"}</td></tr>
            <tr><td class="label">Working Hours:</td><td>As per establishment norms</td></tr>
            <tr><td class="label">Salary/Remuneration:</td><td>As mutually agreed</td></tr>
          </table>
          <p>You are required to comply with all applicable provisions of the Drugs and Cosmetics Act, 1940, and rules thereunder.</p>
          <p>Please sign and return the duplicate copy of this letter as acceptance.</p>
          <div class="sig-block">
            <div><div class="sig-line">Proprietor / Authorised Signatory</div><p>${owner}</p><p>${firm}</p></div>
            <div><div class="sig-line">Acknowledged By</div><p>Name: ${name}</p><p>Reg. No.: ${reg}</p></div>
          </div>
        </div>`;
      });
      openPrint(pages.join(""));
      break;
    }
    case "job_acceptance_pharmacist":
      openPrint(`<div class="page">
        ${header}
        <h2>JOB ACCEPTANCE LETTER (PHARMACIST)</h2>
        <p>Date: ${date}</p>
        <p>To,<br><strong>${owner}</strong><br>Proprietor, M/s ${firm}<br>${addr}</p>
        <p>Dear Sir/Madam,</p>
        <p>I, ${phName}, Registered Pharmacist (Reg. No.: ${phReg}), hereby accept the appointment as Pharmacist at M/s <strong>${firm}</strong>, located at <strong>${addr}</strong>.</p>
        <p>I confirm that:</p>
        <ol>
          <li>I hold a valid pharmacy registration certificate.</li>
          <li>I am not employed full-time at any other pharmacy establishment simultaneously.</li>
          <li>I shall comply with all provisions of the Drugs and Cosmetics Act, 1940.</li>
        </ol>
        <p>I shall be available at the premises during all hours of business.</p>
        <div class="sig-block">
          <div><div class="sig-line">Signature of Pharmacist</div><p>Name: ${phName}</p><p>Reg. No.: ${phReg}</p><p>Qualification: ${phQual}</p><p>Date: ${date}</p></div>
          <div><div class="sig-line">Witness</div><p>Name: ___________</p></div>
        </div>
      </div>`);
      break;
    case "resignation_acceptance_pharmacist": {
      const list = appPharmacists.length > 0 ? appPharmacists : [null];
      const pages = list.map((ph) => {
        var _a2, _b2;
        const name = (ph == null ? void 0 : ph.fullName) ?? phName;
        const reg = (ph == null ? void 0 : ph.registrationNumber) ?? phReg;
        const resignDate = ((_a2 = ph == null ? void 0 : ph.resignationDate) == null ? void 0 : _a2.trim()) ? ph.resignationDate : (ph == null ? void 0 : ph.dateOfLeaving) ?? "___________";
        const resignDateRow = ((_b2 = ph == null ? void 0 : ph.resignationDate) == null ? void 0 : _b2.trim()) ? `<tr><td class="label">Resignation Date:</td><td>${ph.resignationDate}</td></tr>` : "";
        return `<div class="page" style="page-break-after:always">
          ${header}
          <h2>RESIGNATION &amp; ACCEPTANCE LETTER (PHARMACIST)</h2>
          <p><strong>— Resignation Letter —</strong></p>
          <p>Date: ${date}</p>
          <p>To,<br><strong>${owner}</strong><br>Proprietor, M/s ${firm}<br>${addr}</p>
          <p>Dear Sir/Madam,</p>
          <p>I, ${name} (Reg. No.: ${reg}), hereby tender my resignation from the post of Registered Pharmacist at M/s <strong>${firm}</strong>, with effect from ${resignDate}.</p>
          ${resignDateRow ? `<table style="margin-bottom:8px">${resignDateRow}</table>` : ""}
          <div class="sig-block" style="margin-top:16px;margin-bottom:20px">
            <div><div class="sig-line">Signature of Pharmacist</div><p>Name: ${name}</p><p>Reg. No.: ${reg}</p></div>
            <div><div class="sig-line">Date</div></div>
          </div>
          <hr/>
          <p style="margin-top:12px"><strong>— Acceptance of Resignation —</strong></p>
          <p>Date: ${date}</p>
          <p>To,<br>${name}</p>
          <p>Dear Sir/Madam,</p>
          <p>This is to acknowledge receipt of your resignation letter dated ___________. Your resignation from the position of Registered Pharmacist at M/s <strong>${firm}</strong> is hereby accepted with effect from ${resignDate}.</p>
          <p>We wish you success in your future endeavours.</p>
          <div class="sig-block">
            <div><div class="sig-line">Proprietor / Authorised Signatory</div><p>${owner}</p><p>${firm}</p></div>
          </div>
        </div>`;
      });
      openPrint(pages.join(""));
      break;
    }
    case "old_pharmacist_resignation": {
      const oldName = app.oldPharmacistName || "___________";
      const oldReg = app.oldPharmacistRegNo || "___________";
      const oldResignDate = app.oldPharmacistResignationDate || "___________";
      openPrint(`<div class="page">
        ${header}
        <h2>RESIGNATION &amp; ACCEPTANCE LETTER (PHARMACIST)</h2>
        <p><strong>— Resignation Letter (Old Pharmacist) —</strong></p>
        <p>Date: ${date}</p>
        <p>To,<br><strong>${owner}</strong><br>Proprietor, M/s ${firm}<br>${addr}</p>
        <p>Dear Sir/Madam,</p>
        <p>I, ${oldName} (Reg. No.: ${oldReg}), hereby tender my resignation from the post of Registered Pharmacist at M/s <strong>${firm}</strong>, with effect from ${oldResignDate}.</p>
        <table style="margin-bottom:8px">
          <tr><td class="label">Pharmacist Name:</td><td>${oldName}</td></tr>
          <tr><td class="label">Registration No.:</td><td>${oldReg}</td></tr>
          <tr><td class="label">Resignation Date:</td><td>${oldResignDate}</td></tr>
        </table>
        <div class="sig-block" style="margin-top:16px;margin-bottom:20px">
          <div><div class="sig-line">Signature of Pharmacist</div><p>Name: ${oldName}</p><p>Reg. No.: ${oldReg}</p></div>
          <div><div class="sig-line">Date</div></div>
        </div>
        <hr/>
        <p style="margin-top:12px"><strong>— Acceptance of Resignation —</strong></p>
        <p>Date: ${date}</p>
        <p>To,<br>${oldName}</p>
        <p>Dear Sir/Madam,</p>
        <p>This is to acknowledge receipt of your resignation letter dated ___________. Your resignation from the position of Registered Pharmacist at M/s <strong>${firm}</strong> is hereby accepted with effect from ${oldResignDate}.</p>
        <p>We wish you all the best in your future endeavours.</p>
        <div class="sig-block">
          <div><div class="sig-line">Proprietor / Authorised Signatory</div><p>${owner}</p><p>${firm}</p></div>
        </div>
      </div>`);
      break;
    }
    case "change_premise": {
      const oldAddr = app.changePremiseOldAddress || addr;
      const newAddr = app.changePremiseNewAddress || "___________";
      openPrint(`<div class="page">
        ${header}
        <h2>APPLICATION FOR CHANGE OF PREMISE</h2>
        <p>Date: ${date}</p>
        <p>To,<br>The Licensing Authority,<br>Drug Inspector,<br>[District/Zone]</p>
        <p>Subject: Application for Change of Premises for Drug Licence</p>
        <p>Sir/Madam,</p>
        <p>I, <strong>${owner}</strong>, Proprietor/Partner of M/s <strong>${firm}</strong>, hereby apply for the change of premises for Drug Licence as detailed below:</p>
        <table>
          <tr><td class="label">Firm Name:</td><td>${firm}</td></tr>
          <tr><td class="label">Firm ID:</td><td>${firmId}</td></tr>
          <tr><td class="label">Old Address:</td><td>${oldAddr}</td></tr>
          <tr><td class="label">New Address:</td><td>${newAddr}</td></tr>
          <tr><td class="label">Reason for Change:</td><td>___________</td></tr>
          <tr><td class="label">Application Date:</td><td>${date}</td></tr>
        </table>
        <p>I enclose herewith the required documents and undertake to comply with all applicable provisions of the Drugs and Cosmetics Act, 1940.</p>
        <div class="sig-block">
          <div><div class="sig-line">Signature of Applicant</div><p>${owner}</p><p>${firm}</p></div>
          <div><div class="sig-line">Date: ${date}</div></div>
        </div>
      </div>`);
      break;
    }
    case "alteration_premise": {
      const oldArea = app.alterationOldArea != null ? `${app.alterationOldArea} Sq. Ft.` : "___________";
      const proposedArea = app.alterationProposedArea != null ? `${app.alterationProposedArea} Sq. Ft.` : "___________";
      openPrint(`<div class="page">
        ${header}
        <h2>APPLICATION FOR ALTERATION OF PREMISE</h2>
        <p>Date: ${date}</p>
        <p>To,<br>The Licensing Authority,<br>Drug Inspector,<br>[District/Zone]</p>
        <p>Subject: Application for Alteration/Modification of Existing Premises</p>
        <p>Sir/Madam,</p>
        <p>I, <strong>${owner}</strong>, Proprietor/Partner of M/s <strong>${firm}</strong>, holding Drug Licence at <strong>${addr}</strong>, hereby apply for approval to carry out the following alterations to the existing premises:</p>
        <table>
          <tr><td class="label">Firm Name:</td><td>${firm}</td></tr>
          <tr><td class="label">Address:</td><td>${addr}</td></tr>
          <tr><td class="label">Firm ID:</td><td>${firmId}</td></tr>
          <tr><td class="label">Old Area of Firm:</td><td>${oldArea}</td></tr>
          <tr><td class="label">Proposed Area (After Alteration):</td><td>${proposedArea}</td></tr>
          <tr><td class="label">Nature of Alteration:</td><td>___________</td></tr>
          <tr><td class="label">Reason:</td><td>___________</td></tr>
        </table>
        <p>I enclose the revised plan layout and other required documents. I undertake that the alterations will be carried out as per the approved plan and in compliance with the Drugs and Cosmetics Act, 1940.</p>
        <div class="sig-block">
          <div><div class="sig-line">Signature of Applicant</div><p>${owner}</p><p>${firm}</p></div>
          <div><div class="sig-line">Date: ${date}</div></div>
        </div>
      </div>`);
      break;
    }
  }
}
const STATUS_OPTIONS = Object.values(ApplicationStatus);
const SERVICE_OPTIONS = Object.values(ServiceType);
function dateNsToInput(ns) {
  if (!ns) return "";
  return new Date(Number(ns / 1000000n)).toISOString().split("T")[0];
}
function inputToNs(val) {
  if (!val) return void 0;
  return BigInt(new Date(val).getTime()) * 1000000n;
}
function buildEditForm(app, fallbackFdaAddress = "") {
  return {
    firmId: app.firmId,
    businessName: app.businessName,
    proprietorName: app.proprietorName,
    firmAddress: app.firmAddress,
    mobileNumber: app.mobileNumber,
    email: app.email,
    businessType: app.businessType,
    serviceType: app.serviceType,
    status: app.status,
    applicationDate: dateNsToInput(app.applicationDate),
    expectedCompletionDate: dateNsToInput(app.expectedCompletionDate),
    renewalDate: dateNsToInput(app.renewalDate),
    totalFees: String(app.totalFees),
    amountCollected: String(app.amountCollected),
    changePremiseOldAddress: app.changePremiseOldAddress ?? "",
    changePremiseNewAddress: app.changePremiseNewAddress ?? "",
    alterationOldArea: app.alterationOldArea != null ? String(app.alterationOldArea) : "",
    alterationProposedArea: app.alterationProposedArea != null ? String(app.alterationProposedArea) : "",
    fdaAddress: app.fdaAddress || fallbackFdaAddress,
    resignOldPharmacist: app.resignOldPharmacist ?? false,
    oldPharmacistName: app.oldPharmacistName ?? "",
    oldPharmacistRegNo: app.oldPharmacistRegNo ?? "",
    oldPharmacistResignationDate: app.oldPharmacistResignationDate ?? ""
  };
}
function ApplicationDetailPage() {
  var _a, _b, _c;
  const { id } = useParams({ from: "/applications/$id" });
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    getApplication,
    updateApplication,
    deleteApplication,
    addNote,
    getCompanyInfo,
    getPharmacistDetails,
    getFdaOfficeDetails,
    getApplicationPharmacists,
    setApplicationPlanLayout,
    addPortalCredential,
    updatePortalCredential,
    removePortalCredential
  } = useBackend();
  const { data: app, isLoading } = useQuery({
    queryKey: ["application", id],
    queryFn: () => getApplication(BigInt(id)),
    refetchInterval: 6e4
  });
  const { data: companyInfo } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo
  });
  const { data: pharmacistDetails } = useQuery({
    queryKey: ["pharmacistDetails"],
    queryFn: getPharmacistDetails
  });
  const { data: fdaOfficeDetails } = useQuery({
    queryKey: ["fdaOfficeDetails"],
    queryFn: getFdaOfficeDetails
  });
  const { data: appPharmacistsResult } = useQuery({
    queryKey: ["appPharmacists", id],
    queryFn: () => getApplicationPharmacists(BigInt(id))
  });
  const appPharmacists = (() => {
    if (!appPharmacistsResult) return [];
    if (appPharmacistsResult.__kind__ === "ok") {
      const raw = appPharmacistsResult.ok;
      return Array.isArray(raw) ? raw : [];
    }
    return [];
  })();
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [editForm, setEditForm] = reactExports.useState(null);
  const [noteText, setNoteText] = reactExports.useState("");
  const [showForms, setShowForms] = reactExports.useState(false);
  const [showPlanModal, setShowPlanModal] = reactExports.useState(false);
  const [editingFirmId, setEditingFirmId] = reactExports.useState(false);
  const [firmIdDraft, setFirmIdDraft] = reactExports.useState("");
  const [editingPassword, setEditingPassword] = reactExports.useState(false);
  const [passwordDraft, setPasswordDraft] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showPasswordDisplay, setShowPasswordDisplay] = reactExports.useState(false);
  const [editingDirectLink, setEditingDirectLink] = reactExports.useState(false);
  const [directLinkDraft, setDirectLinkDraft] = reactExports.useState("");
  const PORTAL_NAMES = [
    "FDA",
    "FSSAI",
    "GST",
    "Udyam",
    "MCA",
    "Shops",
    "Custom"
  ];
  const [showCredModal, setShowCredModal] = reactExports.useState(false);
  const [credModalMode, setCredModalMode] = reactExports.useState("add");
  const [credDraft, setCredDraft] = reactExports.useState({
    id: "",
    portalName: "FDA",
    userId: "",
    password: "",
    directLink: ""
  });
  const [credShowPassword, setCredShowPassword] = reactExports.useState(false);
  const [credDeleteId, setCredDeleteId] = reactExports.useState(null);
  const [credPasswordVisible, setCredPasswordVisible] = reactExports.useState({});
  const savePlanLayout = useMutation({
    mutationFn: (details) => setApplicationPlanLayout(BigInt(id), details),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      qc.setQueryData(["application", id], res.ok);
      qc.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: () => ue.error("Failed to save plan layout")
  });
  const updateMutation = useMutation({
    mutationFn: (input) => updateApplication(input),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      ue.success("Application updated");
      qc.setQueryData(["application", id], res.ok);
      qc.invalidateQueries({ queryKey: ["applications"] });
      setIsEditing(false);
    },
    onError: () => ue.error("Update failed")
  });
  const firmIdMutation = useMutation({
    mutationFn: (newFirmId) => updateApplication({ id: BigInt(id), firmId: newFirmId }),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      ue.success("Firm ID updated");
      qc.setQueryData(["application", id], res.ok);
      qc.invalidateQueries({ queryKey: ["applications"] });
      setEditingFirmId(false);
    },
    onError: () => ue.error("Failed to update Firm ID")
  });
  const firmPasswordMutation = useMutation({
    mutationFn: (newPassword) => updateApplication({ id: BigInt(id), firmPassword: newPassword }),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      ue.success("Portal password updated");
      qc.setQueryData(["application", id], res.ok);
      qc.invalidateQueries({ queryKey: ["applications"] });
      setEditingPassword(false);
      setPasswordDraft("");
    },
    onError: () => ue.error("Failed to update portal password")
  });
  const directLinkMutation = useMutation({
    mutationFn: (newLink) => updateApplication({ id: BigInt(id), directLink: newLink }),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      ue.success("Portal link updated");
      qc.setQueryData(["application", id], res.ok);
      qc.invalidateQueries({ queryKey: ["applications"] });
      setEditingDirectLink(false);
      setDirectLinkDraft("");
    },
    onError: () => ue.error("Failed to update portal link")
  });
  const completeMutation = useMutation({
    mutationFn: () => updateApplication({
      id: BigInt(id),
      status: ApplicationStatus.Completed
    }),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      ue.success("Application marked as Completed");
      qc.setQueryData(["application", id], res.ok);
      qc.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: () => ue.error("Failed to mark as Completed")
  });
  const deleteMutation = useMutation({
    mutationFn: () => deleteApplication(BigInt(id)),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      ue.success("Application deleted");
      qc.invalidateQueries({ queryKey: ["applications"] });
      navigate({ to: "/applications" });
    },
    onError: () => ue.error("Delete failed")
  });
  const noteMutation = useMutation({
    mutationFn: (text) => addNote(BigInt(id), text),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      qc.setQueryData(["application", id], res.ok);
      setNoteText("");
      ue.success("Note added");
    }
  });
  const addCredMutation = useMutation({
    mutationFn: (cred) => addPortalCredential(BigInt(id), cred),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      qc.setQueryData(["application", id], res.ok);
      setShowCredModal(false);
      ue.success("Credential added");
    },
    onError: () => ue.error("Failed to add credential")
  });
  const updateCredMutation = useMutation({
    mutationFn: ({
      credId,
      cred
    }) => updatePortalCredential(BigInt(id), credId, cred),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      qc.setQueryData(["application", id], res.ok);
      setShowCredModal(false);
      ue.success("Credential updated");
    },
    onError: () => ue.error("Failed to update credential")
  });
  const removeCredMutation = useMutation({
    mutationFn: (credId) => removePortalCredential(BigInt(id), credId),
    onSuccess: (res) => {
      if (res.__kind__ === "err") {
        ue.error(res.err);
        return;
      }
      qc.setQueryData(["application", id], res.ok);
      setCredDeleteId(null);
      ue.success("Credential removed");
    },
    onError: () => ue.error("Failed to remove credential")
  });
  function startEdit() {
    if (!app) return;
    const fallbackFda = (companyInfo == null ? void 0 : companyInfo.fdaAddress) ?? "";
    setEditForm(buildEditForm(app, fallbackFda));
    setIsEditing(true);
  }
  function cancelEdit() {
    setIsEditing(false);
    setEditForm(null);
  }
  function saveEdit() {
    if (!editForm) return;
    const isChangePremise = editForm.serviceType === ServiceType.DrugLicenceChangePremise;
    const isAlteration = editForm.serviceType === ServiceType.DrugLicenceAlterationOfPremise;
    const isAddPharmacist = editForm.serviceType === ServiceType.DrugLicenceAddPharmacist;
    const input = {
      id: BigInt(id),
      firmId: editForm.firmId,
      businessName: editForm.businessName,
      proprietorName: editForm.proprietorName,
      firmAddress: editForm.firmAddress,
      mobileNumber: editForm.mobileNumber,
      email: editForm.email,
      businessType: editForm.businessType,
      serviceType: editForm.serviceType,
      status: editForm.status,
      applicationDate: inputToNs(editForm.applicationDate),
      expectedCompletionDate: inputToNs(editForm.expectedCompletionDate),
      renewalDate: inputToNs(editForm.renewalDate),
      totalFees: BigInt(Math.round(Number(editForm.totalFees) || 0)),
      amountCollected: BigInt(
        Math.round(Number(editForm.amountCollected) || 0)
      ),
      fdaAddress: editForm.fdaAddress,
      ...isChangePremise && {
        changePremiseOldAddress: editForm.changePremiseOldAddress,
        changePremiseNewAddress: editForm.changePremiseNewAddress
      },
      ...isAlteration && {
        alterationOldArea: editForm.alterationOldArea ? Number(editForm.alterationOldArea) : void 0,
        alterationProposedArea: editForm.alterationProposedArea ? Number(editForm.alterationProposedArea) : void 0
      },
      ...isAddPharmacist && {
        resignOldPharmacist: editForm.resignOldPharmacist,
        oldPharmacistName: editForm.oldPharmacistName,
        oldPharmacistRegNo: editForm.oldPharmacistRegNo,
        oldPharmacistResignationDate: editForm.oldPharmacistResignationDate
      }
    };
    updateMutation.mutate(input);
  }
  function setEF(k, v) {
    setEditForm((f) => f ? { ...f, [k]: v } : f);
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "application_detail.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-lg" })
    ] });
  }
  if (!app) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24",
        "data-ocid": "application_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold", children: "Application not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "link",
              onClick: () => navigate({ to: "/applications" }),
              children: "Back to Applications"
            }
          )
        ]
      }
    );
  }
  const amountPending = app.totalFees - app.amountCollected;
  const sortedNotes = [...app.notes].sort(
    (a, b) => Number(b.createdAt - a.createdAt)
  );
  const BASIC_FIELDS = [
    ["Firm ID", "firmId"],
    ["Business Name", "businessName"],
    ["Proprietor Name", "proprietorName"],
    ["Mobile Number", "mobileNumber"],
    ["Email", "email"],
    ["Business Type", "businessType"]
  ];
  const DATE_FIELDS = [
    ["Application Date", "applicationDate"],
    ["Expected Completion", "expectedCompletionDate"],
    ["Renewal Date", "renewalDate"]
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto space-y-5 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            "data-ocid": "application_detail.back_button",
            onClick: () => navigate({ to: "/applications" }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold font-mono", children: app.applicationId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: app.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: app.businessName })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 ml-11 sm:ml-0", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            "data-ocid": "application_detail.cancel_button",
            onClick: cancelEdit,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Cancel"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            "data-ocid": "application_detail.save_button",
            onClick: saveEdit,
            disabled: updateMutation.isPending,
            children: [
              updateMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Save"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            "data-ocid": "application_detail.edit_button",
            onClick: startEdit,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Edit"
            ]
          }
        ),
        app.status !== ApplicationStatus.Completed && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              "data-ocid": "application_detail.complete_button",
              className: "bg-sky-500 hover:bg-sky-600 text-white border-0",
              disabled: completeMutation.isPending,
              children: [
                completeMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Mark as Completed"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "application_detail.complete_dialog", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Mark Application as Completed?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "This will mark the application as",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Completed" }),
                  ". This action indicates all work for this application is done."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 border border-border px-4 py-3 text-sm space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                      "Firm ID:",
                      " "
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: app.firmId || app.applicationId })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                      "Service Type:",
                      " "
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: getServiceTypeLabel(app.serviceType) })
                  ] })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "application_detail.complete_cancel_button", children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                AlertDialogAction,
                {
                  "data-ocid": "application_detail.complete_confirm_button",
                  className: "bg-sky-500 hover:bg-sky-600 text-white",
                  onClick: () => completeMutation.mutate(),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-1.5" }),
                    "Mark as Completed"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "application_detail.delete_button",
              className: "text-destructive border-destructive/30 hover:bg-destructive/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Delete"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "application_detail.dialog", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Application?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                "This will permanently delete",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: app.applicationId }),
                " (",
                app.businessName,
                "). This action cannot be undone."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "application_detail.cancel_button", children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AlertDialogAction,
                {
                  "data-ocid": "application_detail.confirm_button",
                  onClick: () => deleteMutation.mutate(),
                  className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                  children: deleteMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Delete"
                }
              )
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4", children: "Basic Information" }),
      isEditing && editForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        BASIC_FIELDS.map(([label, field]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `edit-${field}`, children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: `edit-${field}`,
              "data-ocid": `application_detail.${field}.input`,
              value: editForm[field],
              onChange: (e) => setEF(field, e.target.value)
            }
          )
        ] }, field)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-firmAddress", children: "Firm Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "edit-firmAddress",
              "data-ocid": "application_detail.firmAddress.input",
              value: editForm.firmAddress,
              onChange: (e) => setEF("firmAddress", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-serviceType", children: "Service Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: editForm.serviceType,
              onValueChange: (v) => setEF("serviceType", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "edit-serviceType",
                    "data-ocid": "application_detail.serviceType.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SERVICE_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: getServiceTypeLabel(s) }, s)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-status", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: editForm.status,
              onValueChange: (v) => setEF("status", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "edit-status",
                    "data-ocid": "application_detail.status.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s.replace(/([A-Z])/g, " $1").trim() }, s)) })
              ]
            }
          )
        ] }),
        DATE_FIELDS.map(([label, field]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `edit-${field}`, children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: `edit-${field}`,
              type: "date",
              "data-ocid": `application_detail.${field}.input`,
              value: editForm[field],
              onChange: (e) => setEF(field, e.target.value)
            }
          )
        ] }, field)),
        editForm.serviceType === ServiceType.DrugLicenceChangePremise && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-changePremiseOldAddress", children: "Old Premises Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "edit-changePremiseOldAddress",
                "data-ocid": "application_detail.change_premise_old_address.input",
                value: editForm.changePremiseOldAddress,
                onChange: (e) => setEF("changePremiseOldAddress", e.target.value),
                placeholder: "Enter old/previous premises address",
                className: "min-h-[72px] resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-changePremiseNewAddress", children: "New Premises Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "edit-changePremiseNewAddress",
                "data-ocid": "application_detail.change_premise_new_address.input",
                value: editForm.changePremiseNewAddress,
                onChange: (e) => setEF("changePremiseNewAddress", e.target.value),
                placeholder: "Enter new/proposed premises address",
                className: "min-h-[72px] resize-none"
              }
            )
          ] })
        ] }),
        editForm.serviceType === ServiceType.DrugLicenceAlterationOfPremise && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-alterationOldArea", children: "Old Area of Firm (Sq. Ft.)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-alterationOldArea",
                "data-ocid": "application_detail.alteration_old_area.input",
                type: "number",
                min: "0",
                value: editForm.alterationOldArea,
                onChange: (e) => setEF("alterationOldArea", e.target.value),
                placeholder: "e.g. 150"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-alterationProposedArea", children: "Proposed Area After Alteration (Sq. Ft.)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-alterationProposedArea",
                "data-ocid": "application_detail.alteration_proposed_area.input",
                type: "number",
                min: "0",
                value: editForm.alterationProposedArea,
                onChange: (e) => setEF("alterationProposedArea", e.target.value),
                placeholder: "e.g. 200"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-fdaAddress", children: "Covering Letter — FDA Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "edit-fdaAddress",
              "data-ocid": "application_detail.fda_address.input",
              value: editForm.fdaAddress,
              onChange: (e) => setEF("fdaAddress", e.target.value),
              placeholder: "Assistant Commissioner, Food & Drug Administration (Drug) Buldhana (MH)",
              className: "min-h-[72px] resize-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Used when generating the FDA Covering Letter for this application" })
        ] }),
        editForm.serviceType === ServiceType.DrugLicenceAddPharmacist && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-3 border border-border rounded-lg p-4 bg-muted/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: "edit-resignOldPharmacist",
                "data-ocid": "application_detail.resign_old_pharmacist.checkbox",
                checked: editForm.resignOldPharmacist,
                onCheckedChange: (v) => setEF("resignOldPharmacist", !!v)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "edit-resignOldPharmacist",
                className: "font-medium cursor-pointer",
                children: "Also Resign Old Pharmacist?"
              }
            )
          ] }),
          editForm.resignOldPharmacist && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sm:col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Resignation of Old Pharmacist" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-oldPharmacistName", children: "Old Pharmacist Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-oldPharmacistName",
                  "data-ocid": "application_detail.old_pharmacist_name.input",
                  value: editForm.oldPharmacistName,
                  onChange: (e) => setEF("oldPharmacistName", e.target.value),
                  placeholder: "Full name of old pharmacist"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-oldPharmacistRegNo", children: "Old Pharmacist Registration No." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-oldPharmacistRegNo",
                  "data-ocid": "application_detail.old_pharmacist_reg_no.input",
                  value: editForm.oldPharmacistRegNo,
                  onChange: (e) => setEF("oldPharmacistRegNo", e.target.value),
                  placeholder: "e.g. MH-12345"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-oldPharmacistResignationDate", children: "Date of Resignation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-oldPharmacistResignationDate",
                  type: "date",
                  "data-ocid": "application_detail.old_pharmacist_resignation_date.input",
                  value: editForm.oldPharmacistResignationDate,
                  onChange: (e) => setEF("oldPharmacistResignationDate", e.target.value)
                }
              )
            ] })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4", children: [
        [
          ["Application ID", app.applicationId],
          ["Business Name", app.businessName],
          ["Proprietor", app.proprietorName],
          ["Mobile", app.mobileNumber],
          ["Email", app.email || "—"],
          ["Business Type", app.businessType],
          ["Service Type", getServiceTypeLabel(app.serviceType)],
          ["Application Date", formatDate(app.applicationDate)],
          [
            "Expected Completion",
            formatDate(app.expectedCompletionDate) || "—"
          ],
          ["Renewal Date", formatDate(app.renewalDate) || "—"]
        ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-sm font-medium text-foreground mt-0.5 break-words", children: value })
        ] }, label)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Firm ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5", children: editingFirmId ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-7 text-sm py-0 px-2",
                "data-ocid": "application_detail.firm_id_inline.input",
                value: firmIdDraft,
                onChange: (e) => setFirmIdDraft(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter" && firmIdDraft.trim()) {
                    firmIdMutation.mutate(firmIdDraft.trim());
                  } else if (e.key === "Escape") {
                    setEditingFirmId(false);
                  }
                },
                autoFocus: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-primary",
                "data-ocid": "application_detail.firm_id_save.button",
                disabled: !firmIdDraft.trim() || firmIdMutation.isPending,
                onClick: () => {
                  if (firmIdDraft.trim())
                    firmIdMutation.mutate(firmIdDraft.trim());
                },
                "aria-label": "Save Firm ID",
                children: firmIdMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-muted-foreground",
                "data-ocid": "application_detail.firm_id_cancel.button",
                onClick: () => setEditingFirmId(false),
                "aria-label": "Cancel Firm ID edit",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground break-words", children: app.firmId || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity",
                "data-ocid": "application_detail.firm_id_edit.button",
                onClick: () => {
                  setFirmIdDraft(app.firmId);
                  setEditingFirmId(true);
                },
                "aria-label": "Edit Firm ID",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" })
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Portal Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5", children: editingPassword ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "h-7 text-sm py-0 px-2 pr-7",
                  type: showPassword ? "text" : "password",
                  "data-ocid": "application_detail.firm_password.input",
                  value: passwordDraft,
                  onChange: (e) => setPasswordDraft(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter")
                      firmPasswordMutation.mutate(passwordDraft);
                    else if (e.key === "Escape")
                      setEditingPassword(false);
                  },
                  autoFocus: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Toggle password visibility",
                  className: "absolute right-1.5 text-muted-foreground hover:text-foreground",
                  onClick: () => setShowPassword((v) => !v),
                  children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-primary",
                "data-ocid": "application_detail.firm_password_save.button",
                disabled: firmPasswordMutation.isPending,
                onClick: () => firmPasswordMutation.mutate(passwordDraft),
                "aria-label": "Save portal password",
                children: firmPasswordMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-muted-foreground",
                "data-ocid": "application_detail.firm_password_cancel.button",
                onClick: () => setEditingPassword(false),
                "aria-label": "Cancel password edit",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: ((_a = app.firmPassword) == null ? void 0 : _a[0]) ? showPasswordDisplay ? app.firmPassword[0] : "••••••••" : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Not set" }) }),
            ((_b = app.firmPassword) == null ? void 0 : _b[0]) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Toggle show/hide password",
                className: "text-muted-foreground hover:text-foreground",
                onClick: () => setShowPasswordDisplay((v) => !v),
                children: showPasswordDisplay ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity",
                "data-ocid": "application_detail.firm_password_edit.button",
                onClick: () => {
                  var _a2;
                  setPasswordDraft(((_a2 = app.firmPassword) == null ? void 0 : _a2[0]) ?? "");
                  setShowPassword(false);
                  setEditingPassword(true);
                },
                "aria-label": "Edit portal password",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" })
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Portal Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5", children: editingDirectLink ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-7 text-sm py-0 px-2",
                type: "url",
                "data-ocid": "application_detail.direct_link.input",
                value: directLinkDraft,
                onChange: (e) => setDirectLinkDraft(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter")
                    directLinkMutation.mutate(directLinkDraft.trim());
                  else if (e.key === "Escape")
                    setEditingDirectLink(false);
                },
                autoFocus: true,
                placeholder: "https://..."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-primary",
                "data-ocid": "application_detail.direct_link_save.button",
                disabled: directLinkMutation.isPending,
                onClick: () => directLinkMutation.mutate(directLinkDraft.trim()),
                "aria-label": "Save portal link",
                children: directLinkMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-muted-foreground",
                "data-ocid": "application_detail.direct_link_cancel.button",
                onClick: () => setEditingDirectLink(false),
                "aria-label": "Cancel link edit",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 group", children: [
            ((_c = app.directLink) == null ? void 0 : _c[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: app.directLink[0],
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-sm font-medium text-primary hover:underline flex items-center gap-1 break-all",
                "data-ocid": "application_detail.direct_link.link",
                children: [
                  app.directLink[0],
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 shrink-0" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Not set" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity",
                "data-ocid": "application_detail.direct_link_edit.button",
                onClick: () => {
                  var _a2;
                  setDirectLinkDraft(((_a2 = app.directLink) == null ? void 0 : _a2[0]) ?? "");
                  setEditingDirectLink(true);
                },
                "aria-label": "Edit portal link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" })
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-sm font-medium text-foreground mt-0.5 break-words", children: app.firmAddress })
        ] }),
        app.serviceType === ServiceType.DrugLicenceChangePremise && (app.changePremiseOldAddress || app.changePremiseNewAddress) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          app.changePremiseOldAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Old Premises Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-sm font-medium text-foreground mt-0.5 break-words", children: app.changePremiseOldAddress })
          ] }),
          app.changePremiseNewAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "New Premises Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-sm font-medium text-foreground mt-0.5 break-words", children: app.changePremiseNewAddress })
          ] })
        ] }),
        app.serviceType === ServiceType.DrugLicenceAlterationOfPremise && (app.alterationOldArea != null || app.alterationProposedArea != null) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          app.alterationOldArea != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Old Area of Firm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "text-sm font-medium text-foreground mt-0.5", children: [
              app.alterationOldArea,
              " Sq. Ft."
            ] })
          ] }),
          app.alterationProposedArea != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Proposed Area After Alteration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "text-sm font-medium text-foreground mt-0.5", children: [
              app.alterationProposedArea,
              " Sq. Ft."
            ] })
          ] })
        ] }),
        app.fdaAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Covering Letter — FDA Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-sm font-medium text-foreground mt-0.5 break-words whitespace-pre-wrap", children: app.fdaAddress })
        ] }),
        app.serviceType === ServiceType.DrugLicenceAddPharmacist && app.resignOldPharmacist && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-3 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Old Pharmacist Resignation" }) }),
          app.oldPharmacistName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Old Pharmacist Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-sm font-medium text-foreground mt-0.5", children: app.oldPharmacistName })
          ] }),
          app.oldPharmacistRegNo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Old Pharmacist Reg. No." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-sm font-medium text-foreground mt-0.5", children: app.oldPharmacistRegNo })
          ] }),
          app.oldPharmacistResignationDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Date of Resignation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-sm font-medium text-foreground mt-0.5", children: app.oldPharmacistResignationDate })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4", children: "Fees" }),
      isEditing && editForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-totalFees", children: "Total Fees (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "edit-totalFees",
              "data-ocid": "application_detail.total_fees.input",
              type: "number",
              min: "0",
              value: editForm.totalFees,
              onChange: (e) => setEF("totalFees", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-amountCollected", children: "Amount Collected (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "edit-amountCollected",
              "data-ocid": "application_detail.amount_collected.input",
              type: "number",
              min: "0",
              value: editForm.amountCollected,
              onChange: (e) => setEF("amountCollected", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount Pending (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-input flex items-center font-semibold text-accent", children: [
            "₹",
            Math.max(
              0,
              Number(editForm.totalFees || 0) - Number(editForm.amountCollected || 0)
            ).toLocaleString("en-IN")
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 rounded-lg bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Total Fees" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: formatCurrency(app.totalFees) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 rounded-lg bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Collected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: formatCurrency(app.amountCollected) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `text-center p-4 rounded-lg ${amountPending > 0n ? "alert-warning" : "bg-muted/30"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Pending" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-xl font-bold ${amountPending > 0n ? "text-accent" : "text-foreground"}`,
                  children: formatCurrency(amountPending > 0n ? amountPending : 0n)
                }
              )
            ]
          }
        )
      ] })
    ] }),
    (app.serviceType === ServiceType.DrugLicenceNewFirm || app.serviceType === ServiceType.DrugLicenceAddPharmacist || app.serviceType === ServiceType.DrugLicenceRemovePharmacist) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PharmacistDetailsSection,
      {
        appId: BigInt(id),
        serviceType: app.serviceType
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4", children: "Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4", children: sortedNotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No notes yet." }) : sortedNotes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-3 rounded-md bg-muted/20 border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap", children: note.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: formatDateTime(note.createdAt) })
          ]
        },
        note.id.toString()
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            "data-ocid": "application_detail.note.textarea",
            value: noteText,
            onChange: (e) => setNoteText(e.target.value),
            placeholder: "Add a note…",
            rows: 2,
            className: "flex-1 resize-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "application_detail.add_note.button",
            onClick: () => {
              if (noteText.trim()) noteMutation.mutate(noteText.trim());
            },
            disabled: !noteText.trim() || noteMutation.isPending,
            className: "self-end",
            children: noteMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Add"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-card border border-border rounded-lg p-6",
        "data-ocid": "portal_credentials.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Portal Credentials" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                "data-ocid": "portal_credentials.open_modal_button",
                onClick: () => {
                  setCredModalMode("add");
                  setCredDraft({
                    id: "",
                    portalName: "FDA",
                    userId: "",
                    password: "",
                    directLink: ""
                  });
                  setCredShowPassword(false);
                  setShowCredModal(true);
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                  "Add New"
                ]
              }
            )
          ] }),
          (() => {
            const creds = Array.isArray(app.portalCredentials) ? app.portalCredentials : [];
            if (creds.length === 0) {
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center py-6 text-muted-foreground",
                  "data-ocid": "portal_credentials.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No portal credentials saved yet." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: 'Click "Add New" to save government portal login details.' })
                  ]
                }
              );
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: creds.map((cred, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border border-border bg-muted/10 p-4",
                "data-ocid": `portal_credentials.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "text-xs font-semibold",
                        children: cred.portalName
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "icon",
                          className: "h-7 w-7 text-muted-foreground hover:text-primary",
                          "data-ocid": `portal_credentials.edit_button.${idx + 1}`,
                          "aria-label": "Edit credential",
                          onClick: () => {
                            setCredDraft({ ...cred });
                            setCredModalMode("edit");
                            setCredShowPassword(false);
                            setShowCredModal(true);
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "icon",
                          className: "h-7 w-7 text-muted-foreground hover:text-destructive",
                          "data-ocid": `portal_credentials.delete_button.${idx + 1}`,
                          "aria-label": "Delete credential",
                          onClick: () => setCredDeleteId(cred.id),
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "User ID" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium text-foreground break-all mt-0.5", children: cred.userId || "—" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Password" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "font-medium text-foreground mt-0.5 flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-all", children: credPasswordVisible[cred.id] ? cred.password || "—" : cred.password ? "••••••••" : "—" }),
                        cred.password && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "aria-label": "Toggle password visibility",
                            className: "text-muted-foreground hover:text-foreground shrink-0",
                            "data-ocid": `portal_credentials.toggle.${idx + 1}`,
                            onClick: () => setCredPasswordVisible((v) => ({
                              ...v,
                              [cred.id]: !v[cred.id]
                            })),
                            children: credPasswordVisible[cred.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ] })
                    ] }),
                    cred.directLink && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Portal Link" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "a",
                        {
                          href: cred.directLink,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className: "text-primary hover:underline text-sm flex items-center gap-1 break-all",
                          "data-ocid": `portal_credentials.link.${idx + 1}`,
                          children: [
                            cred.directLink,
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 shrink-0" })
                          ]
                        }
                      ) })
                    ] })
                  ] })
                ]
              },
              cred.id
            )) });
          })(),
          showCredModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50",
              "data-ocid": "portal_credentials.dialog",
              onClick: (e) => {
                if (e.target === e.currentTarget) setShowCredModal(false);
              },
              onKeyDown: (e) => {
                if (e.key === "Escape") setShowCredModal(false);
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-t-2xl sm:rounded-xl w-full sm:max-w-md p-6 shadow-xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground", children: credModalMode === "add" ? "Add Portal Credential" : "Edit Portal Credential" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7",
                      "data-ocid": "portal_credentials.close_button",
                      onClick: () => setShowCredModal(false),
                      "aria-label": "Close modal",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cred-portal-name", children: "Portal Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: credDraft.portalName,
                        onValueChange: (v) => setCredDraft((d) => ({ ...d, portalName: v })),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            SelectTrigger,
                            {
                              id: "cred-portal-name",
                              "data-ocid": "portal_credentials.portalName.select",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PORTAL_NAMES.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: name, children: name }, name)) })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cred-user-id", children: "User ID / Username" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "cred-user-id",
                        "data-ocid": "portal_credentials.userId.input",
                        value: credDraft.userId,
                        onChange: (e) => setCredDraft((d) => ({ ...d, userId: e.target.value })),
                        placeholder: "Enter user ID or username",
                        autoComplete: "off"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cred-password", children: "Password" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "cred-password",
                          "data-ocid": "portal_credentials.password.input",
                          type: credShowPassword ? "text" : "password",
                          value: credDraft.password,
                          onChange: (e) => setCredDraft((d) => ({
                            ...d,
                            password: e.target.value
                          })),
                          placeholder: "Enter portal password",
                          className: "pr-9",
                          autoComplete: "new-password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "aria-label": "Toggle password visibility",
                          className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                          onClick: () => setCredShowPassword((v) => !v),
                          children: credShowPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cred-direct-link", children: "Direct Portal Link (URL)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "cred-direct-link",
                        "data-ocid": "portal_credentials.directLink.input",
                        type: "url",
                        value: credDraft.directLink,
                        onChange: (e) => setCredDraft((d) => ({
                          ...d,
                          directLink: e.target.value
                        })),
                        placeholder: "https://..."
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        className: "flex-1",
                        "data-ocid": "portal_credentials.cancel_button",
                        onClick: () => setShowCredModal(false),
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        className: "flex-1",
                        "data-ocid": "portal_credentials.submit_button",
                        disabled: addCredMutation.isPending || updateCredMutation.isPending,
                        onClick: () => {
                          if (!credDraft.portalName.trim()) return;
                          if (credModalMode === "add") {
                            const newCred = {
                              ...credDraft,
                              id: `cred-${Date.now()}-${Math.random().toString(36).slice(2)}`
                            };
                            addCredMutation.mutate(newCred);
                          } else {
                            updateCredMutation.mutate({
                              credId: credDraft.id,
                              cred: credDraft
                            });
                          }
                        },
                        children: addCredMutation.isPending || updateCredMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : credModalMode === "add" ? "Add" : "Save"
                      }
                    )
                  ] })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialog,
            {
              open: credDeleteId !== null,
              onOpenChange: (open) => {
                if (!open) setCredDeleteId(null);
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "portal_credentials.dialog", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Remove Credential?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will permanently remove this portal credential. This cannot be undone." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogCancel,
                    {
                      "data-ocid": "portal_credentials.cancel_button",
                      onClick: () => setCredDeleteId(null),
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogAction,
                    {
                      "data-ocid": "portal_credentials.confirm_button",
                      className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                      disabled: removeCredMutation.isPending,
                      onClick: () => {
                        if (credDeleteId) removeCredMutation.mutate(credDeleteId);
                      },
                      children: removeCredMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Remove"
                    }
                  )
                ] })
              ] })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-4 rounded-lg bg-primary/5 border border-primary/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "FDA Covering Letter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Generate a formal covering letter addressed to the FDA for this application" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "application_detail.generate_covering_letter.primary_button",
            className: "bg-primary text-primary-foreground hover:bg-primary/90 shrink-0",
            onClick: () => printForm(
              "fda_covering_letter",
              app,
              {
                pharmacist: pharmacistDetails,
                fda: fdaOfficeDetails,
                companyInfo: companyInfo ?? null
              },
              appPharmacists
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 mr-2" }),
              "Generate Covering Letter"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "application_detail.forms.toggle",
          className: "flex items-center justify-between w-full text-left",
          onClick: () => setShowForms((v) => !v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: [
              "Generate Forms",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-2", children: FORM_TYPES.length })
            ] }),
            showForms ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
          ]
        }
      ),
      showForms && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-md border border-border bg-muted/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium truncate", children: "View Ledger" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "application_detail.view_ledger.button",
              onClick: () => navigate({ to: "/reports" }),
              className: "ml-2 shrink-0",
              children: "Open"
            }
          )
        ] }),
        FORM_TYPES.map((formType) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 rounded-md border border-border bg-muted/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium truncate", children: formType.label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  "data-ocid": `application_detail.print_form.${formType.key}`,
                  onClick: () => {
                    if (formType.key === "plan_layout") {
                      setShowPlanModal(true);
                    } else {
                      printForm(
                        formType.key,
                        app,
                        {
                          pharmacist: pharmacistDetails,
                          fda: fdaOfficeDetails,
                          companyInfo: companyInfo ?? null
                        },
                        appPharmacists
                      );
                    }
                  },
                  className: "ml-2 shrink-0",
                  children: "Print"
                }
              )
            ]
          },
          formType.key
        )),
        app.resignOldPharmacist && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-md border border-primary/30 bg-primary/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium truncate", children: "Old Pharmacist Resignation Letter" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "application_detail.print_form.old_pharmacist_resignation",
              onClick: () => printForm(
                "old_pharmacist_resignation",
                app,
                {
                  pharmacist: pharmacistDetails,
                  fda: fdaOfficeDetails,
                  companyInfo: companyInfo ?? null
                },
                appPharmacists
              ),
              className: "ml-2 shrink-0",
              children: "Print"
            }
          )
        ] })
      ] })
    ] }),
    showPlanModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PlanLayoutModal,
      {
        initial: app.planLayoutDetails ?? null,
        mobileNumber: app.mobileNumber,
        onClose: () => setShowPlanModal(false),
        onGenerate: (details) => {
          const saveDetails = {
            boundaryEast: details.boundaryEast,
            boundaryWest: details.boundaryWest,
            boundaryNorth: details.boundaryNorth,
            boundarySouth: details.boundarySouth,
            premisesLength: details.premisesLength,
            premisesWidth: details.premisesWidth,
            rooms: details.rooms,
            frontOfShop: details.frontOfShop
          };
          savePlanLayout.mutate(saveDetails);
          setShowPlanModal(false);
          printForm(
            "plan_layout",
            app,
            { pharmacist: pharmacistDetails, fda: fdaOfficeDetails },
            appPharmacists,
            details
          );
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BillsSection,
      {
        app,
        companyInfo: companyInfo ?? {
          name: "Barote Consultancy",
          address: "",
          phone: "",
          email: "",
          fdaAddress: ""
        }
      }
    )
  ] });
}
export {
  ApplicationDetailPage as default
};
