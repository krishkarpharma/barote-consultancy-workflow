import type {
  AppSummary,
  Application,
  Bill,
  CompanyInfo,
  LedgerEntry,
  Receipt,
} from "../types";

// ─── Formatters ───────────────────────────────────────────────────────────────

function fmtDateNs(ns: bigint): string {
  const d = new Date(Number(ns) / 1_000_000);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function fmtCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

// ─── Shared CSS ───────────────────────────────────────────────────────────────

const PRINT_CSS = `
  @media print {
    body { margin: 0; padding: 0; }
    .no-print { display: none !important; }
    @page { margin: 5mm; }
    .wm-footer { display: block !important; }
  }
  * { box-sizing: border-box; }
  body { font-family: Arial, sans-serif; font-size: 11pt; color: #000; background: #fff; }
  .page { max-width: 800px; margin: 0 auto; padding: 16px 20px 40px; position: relative; min-height: 100vh; }
  .company-header {
    background-color: #B2EBF2;
    border-bottom: 2px solid #0ea5e9;
    padding: 14px 16px 12px;
    margin-bottom: 20px;
    text-align: center;
  }
  .company-header h1 { font-size: 18pt; margin: 0 0 3px; color: #000; font-weight: bold; }
  .company-header p { margin: 2px 0; font-size: 10pt; color: #111; }
  .company-header .subtitle { font-size: 9pt; color: #555; font-style: italic; }
  .doc-title {
    font-size: 14pt;
    font-weight: bold;
    text-align: center;
    margin-bottom: 16px;
    letter-spacing: 1px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;
    text-transform: uppercase;
  }
  .meta-row { display: flex; gap: 16px; margin-bottom: 4px; font-size: 10.5pt; }
  .meta-row .lbl { font-weight: bold; min-width: 130px; color: #333; }
  .meta-row .val { flex: 1; }
  .bill-to {
    border: 1px solid #b2ebf2;
    border-left: 4px solid #0ea5e9;
    background: #f0fbfd;
    padding: 10px 14px;
    margin-bottom: 16px;
    border-radius: 2px;
  }
  .bill-to h3 { font-size: 10pt; font-weight: bold; margin: 0 0 6px; text-transform: uppercase; color: #0369a1; }
  .bill-to p { margin: 2px 0; font-size: 10.5pt; }
  .items-table { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
  .items-table th {
    background: #B2EBF2;
    border: 1px solid #7dd8e8;
    padding: 7px 9px;
    text-align: left;
    font-size: 10.5pt;
    font-weight: bold;
  }
  .items-table td { border: 1px solid #e5e7eb; padding: 7px 9px; font-size: 10.5pt; }
  .items-table .num { text-align: right; font-variant-numeric: tabular-nums; }
  .items-table .sr { text-align: center; width: 32px; }
  .totals-wrap { display: flex; justify-content: flex-end; margin-bottom: 20px; }
  .totals { border-collapse: collapse; min-width: 260px; }
  .totals td { padding: 5px 10px; font-size: 10.5pt; }
  .totals .lbl { text-align: right; font-weight: bold; color: #333; }
  .totals .val { text-align: right; font-variant-numeric: tabular-nums; }
  .totals .grand-row td { background: #B2EBF2; font-size: 12pt; font-weight: bold; }
  .totals .balance-row td { background: #fef9c3; font-weight: bold; }
  .totals .paid-row td { background: #dcfce7; }
  .pay-details {
    border: 1px solid #e5e7eb;
    padding: 10px 14px;
    border-radius: 2px;
    margin-bottom: 20px;
  }
  .pay-details h3 { font-size: 10pt; font-weight: bold; margin: 0 0 6px; text-transform: uppercase; color: #555; }
  .sig-row { display: flex; justify-content: space-between; margin-top: 40px; gap: 20px; }
  .sig-box { border-top: 1px solid #000; width: 180px; padding-top: 4px; font-size: 9.5pt; text-align: center; }
  .footer-note { font-size: 8.5pt; color: #888; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 8px; margin-top: 30px; }
  .print-btn { position: fixed; top: 10px; right: 10px; padding: 8px 18px; background: #0ea5e9; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 11pt; z-index: 100; }
  .wm-footer {
    display: none;
    position: fixed;
    bottom: 6mm;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 15pt;
    font-weight: bold;
    color: rgba(0, 150, 180, 0.18);
    pointer-events: none;
    z-index: 9999;
    letter-spacing: 3px;
  }
`;

// ─── Open print window ────────────────────────────────────────────────────────

function openPrint(html: string, title: string) {
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title><style>${PRINT_CSS}</style></head><body>
    <button class="print-btn no-print" onclick="window.print()">&#128424; Print</button>
    <div class="wm-footer">Barote Consultancy</div>
    ${html}
  </body></html>`);
  w.document.close();
}

// ─── Barote Consultancy company header (Bills & Receipts ONLY) ────────────────
// ─── Company info header (Reports — sourced from Settings companyInfo) ─────────

function companyInfoHeader(info: CompanyInfo): string {
  const name = info.name || "Barote Consultancy";
  const addr = info.address || "";
  const phone = info.phone ? `Ph: ${info.phone}` : "";
  const email = info.email ? `Email: ${info.email}` : "";
  const contact = [phone, email].filter(Boolean).join(" &nbsp;|&nbsp; ");
  return `<div class="company-header">
    <h1>${name}</h1>
    ${addr ? `<p>${addr}</p>` : ""}
    ${contact ? `<p>${contact}</p>` : ""}
  </div>`;
}

function baroteHeader(info: CompanyInfo): string {
  const name = info.name || "Barote Consultancy";
  const addr = info.address || "";
  const phone = info.phone ? `Ph: ${info.phone}` : "";
  const email = info.email ? `Email: ${info.email}` : "";
  const contact = [phone, email].filter(Boolean).join(" &nbsp;|&nbsp; ");
  return `<div class="company-header">
    <h1>${name}</h1>
    ${addr ? `<p>${addr}</p>` : ""}
    ${contact ? `<p>${contact}</p>` : ""}
    <p class="subtitle">Licence &amp; Regulatory Services</p>
  </div>`;
}

// ─── printBill ────────────────────────────────────────────────────────────────

export function printBill(
  bill: Bill,
  app: Application,
  companyInfo: CompanyInfo,
) {
  const header = baroteHeader(companyInfo);
  const createdStr = fmtDateNs(bill.createdAt);
  const payDateStr = fmtDateNs(bill.paymentDate);

  const lineRows = bill.lineItems
    .map(
      (li, i) => `<tr>
      <td class="sr">${i + 1}</td>
      <td>${li.description}</td>
      <td class="num">${fmtCurrency(li.amount)}</td>
      <td class="num">${Number(li.quantity)}</td>
      <td class="num">${fmtCurrency(li.amount * Number(li.quantity))}</td>
    </tr>`,
    )
    .join("");

  const paidAmt = bill.paidAmount ?? bill.paymentReceived ?? 0;
  const pendingAmt = bill.pendingAmount ?? bill.balancePending ?? 0;

  const html = `<div class="page">
    ${header}
    <div class="doc-title">Bill / Invoice</div>
    <div style="display:flex;gap:16px;margin-bottom:16px;font-size:10.5pt;">
      <div><span style="font-weight:bold">Bill No.:</span> ${bill.billNumber}</div>
      <div><span style="font-weight:bold">Date:</span> ${createdStr}</div>
    </div>
    <div class="bill-to">
      <h3>Bill To</h3>
      <p><strong>${app.businessName}</strong></p>
      <p>Firm ID: ${app.firmId || app.applicationId}</p>
      <p>${app.firmAddress || ""}</p>
    </div>
    <table class="items-table">
      <thead>
        <tr>
          <th class="sr">#</th>
          <th>Description</th>
          <th class="num">Rate (&#8377;)</th>
          <th class="num">Qty</th>
          <th class="num">Total (&#8377;)</th>
        </tr>
      </thead>
      <tbody>${lineRows}</tbody>
    </table>
    <div class="totals-wrap">
      <table class="totals">
        <tr><td class="lbl">Sub-total:</td><td class="val">${fmtCurrency(bill.totalAmount)}</td></tr>
        <tr class="grand-row"><td class="lbl">Grand Total:</td><td class="val">${fmtCurrency(bill.totalAmount)}</td></tr>
        <tr class="paid-row"><td class="lbl">Received:</td><td class="val">${fmtCurrency(paidAmt)}</td></tr>
        <tr class="balance-row"><td class="lbl">Balance Pending:</td><td class="val">${fmtCurrency(pendingAmt)}</td></tr>
      </table>
    </div>
    <div class="pay-details">
      <h3>Payment Details</h3>
      <div class="meta-row"><span class="lbl">Payment Mode:</span><span class="val">${bill.paymentMode}</span></div>
      <div class="meta-row"><span class="lbl">Payment Date:</span><span class="val">${payDateStr}</span></div>
    </div>
    <div class="sig-row">
      <div class="sig-box">Authorised Signatory</div>
      <div class="sig-box">Received By</div>
    </div>
    <div class="footer-note">This is a computer-generated bill. Thank you for your business.</div>
  </div>`;

  openPrint(html, `Bill ${bill.billNumber}`);
}

// ─── printReceipt ─────────────────────────────────────────────────────────────
// Accepts a Receipt object (new flow) plus the linked Bill for context.
// Header: Barote Consultancy (bills/receipts rule). Client details in body.

export function printReceipt(
  receipt: Receipt,
  bill: Bill,
  app: Application,
  companyInfo: CompanyInfo,
) {
  const header = baroteHeader(companyInfo);
  const receiptDateStr = fmtDateNs(receipt.receiptDate);

  const paidBefore = Math.max(
    0,
    (bill.paidAmount ?? bill.paymentReceived ?? 0) - receipt.amountReceived,
  );
  const pendingAfter = Math.max(
    0,
    (bill.pendingAmount ?? bill.balancePending ?? 0) - receipt.amountReceived,
  );

  const html = `<div class="page">
    ${header}
    <div class="doc-title">Payment Receipt</div>
    <div style="display:flex;gap:16px;margin-bottom:16px;font-size:10.5pt;">
      <div><span style="font-weight:bold">Receipt No.:</span> ${receipt.receiptNumber}</div>
      <div><span style="font-weight:bold">Date:</span> ${receiptDateStr}</div>
    </div>
    <div class="bill-to">
      <h3>Client Details</h3>
      <p><strong>${app.businessName}</strong></p>
      <p>Firm ID: ${app.firmId || app.applicationId}</p>
      <p>${app.firmAddress || ""}</p>
    </div>
    <div class="meta-row" style="margin-bottom:12px">
      <span class="lbl">Linked Bill No.:</span>
      <span class="val">${bill.billNumber}</span>
    </div>
    <table class="items-table" style="margin-bottom:12px">
      <thead>
        <tr>
          <th>Description</th>
          <th class="num">Amount (&#8377;)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Total Bill Amount</td><td class="num">${fmtCurrency(bill.totalAmount)}</td></tr>
        <tr><td>Previously Paid</td><td class="num">${fmtCurrency(paidBefore)}</td></tr>
        <tr style="background:#dcfce7">
          <td><strong>Amount Received Now</strong></td>
          <td class="num"><strong>${fmtCurrency(receipt.amountReceived)}</strong></td>
        </tr>
      </tbody>
    </table>
    <div class="totals-wrap">
      <table class="totals">
        <tr><td class="lbl">Mode of Payment:</td><td class="val">${receipt.paymentMode}</td></tr>
        ${receipt.referenceNo ? `<tr><td class="lbl">Reference No.:</td><td class="val">${receipt.referenceNo}</td></tr>` : ""}
        ${receipt.remarks ? `<tr><td class="lbl">Remarks:</td><td class="val">${receipt.remarks}</td></tr>` : ""}
        <tr class="balance-row"><td class="lbl">Balance Remaining:</td><td class="val">${fmtCurrency(pendingAfter)}</td></tr>
      </table>
    </div>
    <div class="sig-row">
      <div class="sig-box">Authorised Signatory</div>
      <div class="sig-box">Received By</div>
    </div>
    <div class="footer-note">This is a computer-generated receipt. Please retain for your records.</div>
  </div>`;

  openPrint(html, `Receipt ${receipt.receiptNumber}`);
}

// ─── exportToCSV ──────────────────────────────────────────────────────────────

export function exportToCSV(
  headers: string[],
  rows: (string | number)[][],
  filename: string,
) {
  const lines: string[] = [
    headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(","),
    ...rows.map((row) =>
      row
        .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
        .join(","),
    ),
  ];
  const blob = new Blob([`\uFEFF${lines.join("\n")}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── printMonthlyCollectionPDF ────────────────────────────────────────────────

export function printMonthlyCollectionPDF(
  receipts: Receipt[],
  monthYearLabel: string,
  companyInfo: CompanyInfo,
) {
  const header = companyInfoHeader(companyInfo);
  const total = receipts.reduce((s, r) => s + r.amountReceived, 0);
  const byMode: Record<string, number> = {};
  for (const r of receipts) {
    const mode = String(r.paymentMode);
    byMode[mode] = (byMode[mode] ?? 0) + r.amountReceived;
  }

  const rows = receipts
    .map(
      (r, i) => `<tr>
      <td>${i + 1}</td>
      <td>${r.receiptNumber}</td>
      <td>${fmtDateNs(r.receiptDate)}</td>
      <td>${r.firmName}</td>
      <td>${r.firmId}</td>
      <td style="text-align:right">${fmtCurrency(r.amountReceived)}</td>
      <td>${r.paymentMode}</td>
      <td>${r.referenceNo ?? ""}</td>
      <td>${r.remarks ?? ""}</td>
    </tr>`,
    )
    .join("");

  const modeBreakdown = Object.entries(byMode)
    .map(
      ([mode, amt]) =>
        `<tr><td class="lbl">${mode}:</td><td class="val">${fmtCurrency(amt)}</td></tr>`,
    )
    .join("");

  const html = `<div class="page">
    ${header}
    <div class="doc-title">Monthly Collection Report &#8211; ${monthYearLabel}</div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:10pt">
      <thead style="background:#B2EBF2">
        <tr>
          <th style="border:1px solid #7dd8e8;padding:5px">#</th>
          <th style="border:1px solid #7dd8e8;padding:5px">Receipt No.</th>
          <th style="border:1px solid #7dd8e8;padding:5px">Date</th>
          <th style="border:1px solid #7dd8e8;padding:5px">Firm Name</th>
          <th style="border:1px solid #7dd8e8;padding:5px">Firm ID</th>
          <th style="border:1px solid #7dd8e8;padding:5px;text-align:right">Amount (&#8377;)</th>
          <th style="border:1px solid #7dd8e8;padding:5px">Mode</th>
          <th style="border:1px solid #7dd8e8;padding:5px">Reference</th>
          <th style="border:1px solid #7dd8e8;padding:5px">Remarks</th>
        </tr>
      </thead>
      <tbody>${rows || '<tr><td colspan="9" style="text-align:center;padding:12px;color:#888">No receipts for this period</td></tr>'}</tbody>
      <tfoot>
        <tr style="background:#dcfce7;font-weight:bold">
          <td colspan="5" style="border:1px solid #ccc;padding:5px">Total Collection</td>
          <td style="border:1px solid #ccc;padding:5px;text-align:right">${fmtCurrency(total)}</td>
          <td colspan="3" style="border:1px solid #ccc;padding:5px"></td>
        </tr>
      </tfoot>
    </table>
    <div style="margin-bottom:12px">
      <strong>Breakdown by Payment Mode:</strong>
      <table class="totals" style="margin-top:6px">
        ${modeBreakdown}
        <tr><td class="lbl">Total Receipts:</td><td class="val">${receipts.length}</td></tr>
      </table>
    </div>
    <div class="footer-note">Generated on ${new Date().toLocaleDateString("en-IN")}</div>
  </div>`;

  openPrint(html, `Monthly Collection - ${monthYearLabel}`);
}

// ─── printLedgerPDF ──────────────────────────────────────────────────────────

interface LedgerRow extends LedgerEntry {
  balance: number;
}

export function printLedgerPDF(
  entries: LedgerEntry[],
  appInfo:
    | AppSummary
    | { applicationId: string; businessName: string; firmId: string }
    | null,
  companyInfo: CompanyInfo,
) {
  const header = baroteHeader(companyInfo);
  let running = 0;

  const rows: LedgerRow[] = [...entries]
    .sort((a, b) => Number(a.date) - Number(b.date))
    .map((e) => {
      running += e.credit - e.debit;
      return { ...e, balance: running };
    });

  const totalDebits = entries.reduce((s, e) => s + e.debit, 0);
  const totalCredits = entries.reduce((s, e) => s + e.credit, 0);

  const entryRows = rows
    .map(
      (e, i) => `<tr>
        <td>${i + 1}</td>
        <td>${fmtDateNs(e.date)}</td>
        <td>${e.transactionType}</td>
        <td>${e.description}</td>
        <td style="text-align:right;color:#dc2626">${e.debit > 0 ? fmtCurrency(e.debit) : ""}</td>
        <td style="text-align:right;color:#166534">${e.credit > 0 ? fmtCurrency(e.credit) : ""}</td>
        <td style="text-align:right;font-weight:bold">${fmtCurrency(e.balance)}</td>
        <td>${e.reference ?? ""}</td>
      </tr>`,
    )
    .join("");

  const html = `<div class="page">
    ${header}
    <div class="doc-title">Application Ledger</div>
    ${appInfo ? `<p style="font-size:10pt;margin-bottom:12px"><strong>${appInfo.businessName}</strong> &nbsp;|&nbsp; Firm ID: ${appInfo.firmId} &nbsp;|&nbsp; App ID: ${appInfo.applicationId}</p>` : ""}
    <table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:9.5pt">
      <thead style="background:#B2EBF2">
        <tr>
          <th style="border:1px solid #7dd8e8;padding:4px">#</th>
          <th style="border:1px solid #7dd8e8;padding:4px">Date</th>
          <th style="border:1px solid #7dd8e8;padding:4px">Type</th>
          <th style="border:1px solid #7dd8e8;padding:4px">Description</th>
          <th style="border:1px solid #7dd8e8;padding:4px;text-align:right">Debit (&#8377;)</th>
          <th style="border:1px solid #7dd8e8;padding:4px;text-align:right">Credit (&#8377;)</th>
          <th style="border:1px solid #7dd8e8;padding:4px;text-align:right">Balance (&#8377;)</th>
          <th style="border:1px solid #7dd8e8;padding:4px">Reference</th>
        </tr>
      </thead>
      <tbody>${entryRows || '<tr><td colspan="8" style="text-align:center;padding:10px;color:#888">No ledger entries</td></tr>'}</tbody>
      <tfoot>
        <tr style="background:#e0f7fa;font-weight:bold">
          <td colspan="4" style="border:1px solid #ccc;padding:4px">Totals</td>
          <td style="border:1px solid #ccc;padding:4px;text-align:right">${fmtCurrency(totalDebits)}</td>
          <td style="border:1px solid #ccc;padding:4px;text-align:right">${fmtCurrency(totalCredits)}</td>
          <td style="border:1px solid #ccc;padding:4px;text-align:right">${fmtCurrency(totalCredits - totalDebits)}</td>
          <td style="border:1px solid #ccc;padding:4px"></td>
        </tr>
      </tfoot>
    </table>
    <div class="footer-note">Generated on ${new Date().toLocaleDateString("en-IN")}</div>
  </div>`;

  openPrint(html, `Ledger - ${appInfo?.applicationId ?? "app"}`);
}
