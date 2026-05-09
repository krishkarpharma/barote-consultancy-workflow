import type {
  Application,
  ApplicationPharmacist,
  CompanyInfo,
  FdaOfficeDetails,
  PharmacistDetails,
  PlanLayoutDetails,
} from "../types";
import type { BusinessTypeData, PersonEntry, TrusteeEntry } from "../types";

export interface FormMasterData {
  pharmacist?: PharmacistDetails | null;
  fda?: FdaOfficeDetails | null;
  companyInfo?: CompanyInfo | null;
}

// Extended plan layout data including transient entrance info (not persisted to backend)
export interface PlanLayoutPrintData extends PlanLayoutDetails {
  numEntrances?: number;
  entrances?: Array<{ roomIndex: number; wall: string }>;
}

function fmtDate(ts?: bigint | null): string {
  const d = ts && ts !== 0n ? new Date(Number(ts) / 1_000_000) : new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function getApplicationHeading(serviceType: string): string {
  const st = serviceType || "";
  if (
    st.includes("NewFirm") ||
    st.includes("New Firm") ||
    st === "DrugLicenceNewFirm"
  )
    return "Application for New Firm's Drug License";
  if (
    st.includes("ChangePremise") ||
    st.includes("Change Premise") ||
    st.includes("Change of Premise")
  )
    return "Application for Change of Premises";
  if (st.includes("Alteration"))
    return "Application for Alteration of Premises";
  if (st.includes("AddPharmacist") || st.includes("Add Pharmacist"))
    return "Application for Addition of Pharmacist";
  if (st.includes("RemovePharmacist") || st.includes("Remove Pharmacist"))
    return "Application for Removal of Pharmacist";
  if (st.includes("Renewal")) return "Application for Renewal of Drug License";
  // Fallback: prettify camelCase/PascalCase
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

function openPrint(html: string) {
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Print</title><style>${PRINT_CSS}</style></head><body>
    <button class="print-btn no-print" onclick="window.print()">🖨️ Print</button>
    <div class="wm-footer">Barote Consultancy</div>
    ${html}
  </body></html>`);
  w.document.close();
}

// Header: no Proprietor line — removed per requirements
function companyHeader(app: Application): string {
  const firm = app.businessName || "___________";
  const addr = app.firmAddress || "___________";
  return `<div class="header">
    <h1>${firm}</h1>
    <p>${addr}</p>
  </div>`;
}

// Company/Consultancy header for FDA Covering Letter — uses CompanyInfo (Barote Consultancy details)
function _companyInfoHeader(info?: CompanyInfo | null): string {
  const name = info?.name || "Barote Consultancy";
  const addr = info?.address || "";
  const phone = info?.phone || "";
  const email = info?.email || "";
  return `<div class="header">
    <h1>${name}</h1>
    ${addr ? `<p>${addr}</p>` : ""}
    ${phone || email ? `<p>${[phone && `Ph: ${phone}`, email && `Email: ${email}`].filter(Boolean).join(" | ")}</p>` : ""}
  </div>`;
}

// Generate dynamic subject line for FDA Covering Letter
function fdaCoveringLetterSubject(
  serviceType: string,
  firmName: string,
): string {
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

// Generate dynamic body paragraph(s) for FDA Covering Letter
function fdaCoveringLetterBody(
  app: Application,
  owner: string,
  firm: string,
  addr: string,
): string {
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
    const oldArea =
      app.alterationOldArea != null
        ? `${app.alterationOldArea} Sq. Ft.`
        : "___________";
    const newArea =
      app.alterationProposedArea != null
        ? `${app.alterationProposedArea} Sq. Ft.`
        : "___________";
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
    const phName =
      Array.isArray(app.pharmacists) && app.pharmacists[0]?.fullName
        ? app.pharmacists[0].fullName
        : "___________";
    const phReg =
      Array.isArray(app.pharmacists) && app.pharmacists[0]?.registrationNumber
        ? app.pharmacists[0].registrationNumber
        : "___________";
    const phLeaving =
      Array.isArray(app.pharmacists) && app.pharmacists[0]?.dateOfLeaving
        ? app.pharmacists[0].dateOfLeaving
        : "___________";
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

  // Generic fallback
  const pretty = st.replace(/([A-Z])/g, " $1").trim();
  return `<p>I, <strong>${owner}</strong>, Proprietor/Authorised Person of M/s <strong>${firm}</strong>, situated at <strong>${addr}</strong>, hereby submit the application for <strong>${pretty}</strong>.</p>
  <p>All required documents are enclosed herewith for your kind perusal and necessary action.</p>`;
}

function escSvg(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Per-room entrance on a specific wall side ─────────────────────────────────
function renderPdfEntrance(
  pos: { x: number; y: number; w: number; h: number },
  entranceSide: string,
  et: string,
  _entranceLabel: string,
  _shuttT: number,
  _shutterColor: string,
): string {
  const { x, y, w, h } = pos;
  const isHoriz = entranceSide === "North" || entranceSide === "South";
  const dim = isHoriz ? w : h;

  // For No Wall / Open: entire wall is open, return nothing (no line anywhere)
  if (et === "No Wall / Open") return "";

  // Gap size per entrance type
  // Half Wall Shutter and Half Wall Opening: 50% of wall dimension
  // Full Wall Shutter: 60% gap (shutter rect spans full gap width)
  // Door / Other: 30% gap
  let gapSize: number;
  if (et === "Half Wall Opening" || et === "Half Wall Shutter") {
    gapSize = dim * 0.5;
  } else if (et === "Full Wall Shutter") {
    gapSize = dim * 0.6;
  } else {
    // Door, Other — 30% gap
    gapSize = dim * 0.3;
  }

  // Center of the wall (in the axis along the wall)
  const wallCenter = isHoriz ? x + w / 2 : y + h / 2;
  const gapStart = wallCenter - gapSize / 2;
  const gapEnd = gapStart + gapSize;

  let seg1 = "";
  let seg2 = "";
  let shutterRect = "";

  if (isHoriz) {
    // North wall: wy = y; South wall: wy = y+h
    const wy = entranceSide === "North" ? y : y + h;
    const wallX1 = x;
    const wallX2 = x + w;

    // Wall stub segments on BOTH sides of gap
    if (gapStart > wallX1) {
      seg1 = `<line x1="${wallX1}" y1="${wy}" x2="${gapStart}" y2="${wy}" stroke="#000" stroke-width="2.5"/>`;
    }
    if (gapEnd < wallX2) {
      seg2 = `<line x1="${gapEnd}" y1="${wy}" x2="${wallX2}" y2="${wy}" stroke="#000" stroke-width="2.5"/>`;
    }

    // Shutter rect straddling the wall line (±4px vertically)
    if (et === "Full Wall Shutter") {
      // Full shutter: Aqua Blue rect spanning full gap width
      shutterRect = `<rect x="${gapStart}" y="${wy - 4}" width="${gapSize}" height="8" fill="#06B6D4" stroke="#0891B2" stroke-width="1"/>`;
    } else if (et === "Half Wall Shutter") {
      // Half wall shutter: Aqua Blue rect spanning full gap width (gap is already 50%)
      shutterRect = `<rect x="${gapStart}" y="${wy - 4}" width="${gapSize}" height="8" fill="#06B6D4" stroke="#0891B2" stroke-width="1"/>`;
    } else if (et === "Half Wall Opening") {
      // Half wall opening: small aqua indicator (represents open archway)
      shutterRect = `<rect x="${gapStart}" y="${wy - 3}" width="${gapSize}" height="6" fill="#BAE6FD" stroke="#06B6D4" stroke-width="1" stroke-dasharray="3,2"/>`;
    }
    // Door / Other: just the open gap, no fills
  } else {
    // East wall: wx = x+w; West wall: wx = x
    const wx = entranceSide === "East" ? x + w : x;
    const wallY1 = y;
    const wallY2 = y + h;

    // Wall stub segments on BOTH sides of gap
    if (gapStart > wallY1) {
      seg1 = `<line x1="${wx}" y1="${wallY1}" x2="${wx}" y2="${gapStart}" stroke="#000" stroke-width="2.5"/>`;
    }
    if (gapEnd < wallY2) {
      seg2 = `<line x1="${wx}" y1="${gapEnd}" x2="${wx}" y2="${wallY2}" stroke="#000" stroke-width="2.5"/>`;
    }

    // Shutter rect straddling the wall line (±4px horizontally)
    if (et === "Full Wall Shutter") {
      // Full shutter: Aqua Blue rect spanning full gap height
      shutterRect = `<rect x="${wx - 4}" y="${gapStart}" width="8" height="${gapSize}" fill="#06B6D4" stroke="#0891B2" stroke-width="1"/>`;
    } else if (et === "Half Wall Shutter") {
      // Half wall shutter: Aqua Blue rect spanning full gap height (gap is already 50%)
      shutterRect = `<rect x="${wx - 4}" y="${gapStart}" width="8" height="${gapSize}" fill="#06B6D4" stroke="#0891B2" stroke-width="1"/>`;
    } else if (et === "Half Wall Opening") {
      // Half wall opening: small aqua indicator
      shutterRect = `<rect x="${wx - 3}" y="${gapStart}" width="6" height="${gapSize}" fill="#BAE6FD" stroke="#06B6D4" stroke-width="1" stroke-dasharray="3,2"/>`;
    }
    // Door / Other: just the open gap, no fills
  }

  return `${seg1}${seg2}${shutterRect}`;
}

// ── Place a room relative to a reference room ─────────────────────────────────
function placeRoomPdf(
  ref: { x: number; y: number; w: number; h: number },
  side: string,
  rw: number,
  rh: number,
): { x: number; y: number } {
  if (side === "East") return { x: ref.x + ref.w, y: ref.y };
  if (side === "West") return { x: ref.x - rw, y: ref.y };
  if (side === "North") return { x: ref.x, y: ref.y - rh };
  return { x: ref.x, y: ref.y + ref.h }; // South default
}

// Build the SVG floor-plan diagram. Rooms are placed using whichSide.
// Dimension labels are bold, NO arrows. Auto-scales via viewBox to fit one page.
// Build the SVG floor-plan diagram. Rooms are placed using whichSide.
// Dimension labels are bold, NO arrows. Dynamic scaling so everything fits on one A4 page.
// Build the SVG floor-plan diagram. Rooms are placed using whichSide.
// Dimension labels are bold, NO arrows. Dynamic scaling so everything fits on one A4 page.
// availH and availW are the available drawing area in SVG user units (points/px).
function buildPlanDiagram(
  details: PlanLayoutPrintData,
  availH = 650,
  availW = 780,
): string {
  const WALL = 3;

  const rooms = Array.isArray(details.rooms) ? details.rooms : [];

  // ── Step 1: compute natural room positions in "feet" space ───────────────────────────
  const rpFt: Array<{ x: number; y: number; w: number; h: number }> = [];

  if (rooms.length > 0) {
    rooms.forEach((room, i) => {
      const rw = Math.max(room.length || 1, 0.5);
      const rh = Math.max(room.width || 1, 0.5);
      const pos =
        i === 0
          ? { x: 0, y: 0 }
          : placeRoomPdf(rpFt[i - 1], room.whichSide || "East", rw, rh);
      rpFt.push({ x: pos.x, y: pos.y, w: rw, h: rh });
    });
  } else {
    const l = details.premisesLength > 0 ? details.premisesLength : 10;
    const w = details.premisesWidth > 0 ? details.premisesWidth : 8;
    rpFt.push({ x: 0, y: 0, w: l, h: w });
  }

  // ── Step 2: bounding box in feet space ──────────────────────────────────────────────
  const minFx = Math.min(...rpFt.map((p) => p.x));
  const minFy = Math.min(...rpFt.map((p) => p.y));
  const maxFx = Math.max(...rpFt.map((p) => p.x + p.w));
  const maxFy = Math.max(...rpFt.map((p) => p.y + p.h));
  const totalFW = maxFx - minFx;
  const totalFH = maxFy - minFy;

  // ── Step 3: available drawing space ──────────────────────────────────────────────
  const DIM_PAD = 36; // space outside rooms for compass & dimension labels
  const drawW = availW - DIM_PAD * 2;
  const drawH = availH - DIM_PAD * 2;

  // ── Step 4: uniform scale ───────────────────────────────────────────────────────
  const isSingleRoom = rooms.length <= 1;
  const baseScaleX = drawW / Math.max(totalFW, 0.01);
  const baseScaleY = drawH / Math.max(totalFH, 0.01);
  const baseScale = Math.min(baseScaleX, baseScaleY);
  const scale = isSingleRoom ? baseScale * 0.5 : baseScale;

  // ── Step 5: pixel positions (centered within drawing area) ──────────────────────────
  const scaledW = totalFW * scale;
  const scaledH = totalFH * scale;
  const centerOffX = (drawW - scaledW) / 2;
  const centerOffY = (drawH - scaledH) / 2;

  const rp: Array<{ x: number; y: number; w: number; h: number }> = rpFt.map(
    (r) => ({
      x: centerOffX + (r.x - minFx) * scale,
      y: centerOffY + (r.y - minFy) * scale,
      w: Math.max(r.w * scale, 10),
      h: Math.max(r.h * scale, 10),
    }),
  );

  // ── Step 6: viewBox ─────────────────────────────────────────────────────────────────
  const rpMinX = Math.min(...rp.map((p) => p.x));
  const rpMinY = Math.min(...rp.map((p) => p.y));
  const rpMaxX = Math.max(...rp.map((p) => p.x + p.w));
  const rpMaxY = Math.max(...rp.map((p) => p.y + p.h));
  const vbX = rpMinX - DIM_PAD;
  const vbY = rpMinY - DIM_PAD;
  const vbW = rpMaxX - rpMinX + DIM_PAD * 2;
  const vbH = rpMaxY - rpMinY + DIM_PAD * 2;

  // ── Helper: get the opposite of a compass direction ──────────────────────────────
  function opposite(side: string): string {
    if (side === "North") return "South";
    if (side === "South") return "North";
    if (side === "East") return "West";
    return "East";
  }

  // ── Step 7: Pre-compute open shared boundaries ─────────────────────────────────────────
  // openPassage[i] = true means the shared boundary between room[i] and room[i-1]
  // has an entrance/opening on it (drawn with stubs, not a full solid line).
  const openPassage: boolean[] = rooms.map((room, i) => {
    if (i === 0) return false;
    const ws = room.whichSide || "East";
    const roomEntersFacingPrev = (room.entranceSide || "") === opposite(ws);
    const prevRoom = rooms[i - 1];
    // For Room 0, entrance side comes from details.frontOfShop (not entranceSide)
    const prevEsSide =
      i === 1 ? details.frontOfShop || "South" : prevRoom?.entranceSide || "";
    const prevEntersFacingNext = prevRoom && prevEsSide === ws;
    return roomEntersFacingPrev || !!prevEntersFacingNext;
  });

  let roomSvg = "";
  let entranceSvg = "";
  let dimSvg = "";

  if (rooms.length === 0) {
    const solo = rp[0];
    if (solo) {
      // Single-room fallback (no room array): entrance uses frontOfShop
      const frontSide = details.frontOfShop || "South";
      const et = "Full Wall Shutter";
      roomSvg = `<rect x="${solo.x}" y="${solo.y}" width="${solo.w}" height="${solo.h}" fill="#f0f7ff"/>`;
      const allSidesS = [
        {
          name: "North",
          x1: solo.x,
          y1: solo.y,
          x2: solo.x + solo.w,
          y2: solo.y,
        },
        {
          name: "South",
          x1: solo.x,
          y1: solo.y + solo.h,
          x2: solo.x + solo.w,
          y2: solo.y + solo.h,
        },
        {
          name: "West",
          x1: solo.x,
          y1: solo.y,
          x2: solo.x,
          y2: solo.y + solo.h,
        },
        {
          name: "East",
          x1: solo.x + solo.w,
          y1: solo.y,
          x2: solo.x + solo.w,
          y2: solo.y + solo.h,
        },
      ];
      for (const s of allSidesS) {
        if (s.name === frontSide) {
          entranceSvg += renderPdfEntrance(solo, frontSide, et, "", 0, "");
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

      // Room fill (no stroke — walls drawn as separate lines)
      roomSvg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f0f7ff"/>`;

      // Entrance info for this room:
      const esSide =
        i === 0 ? details.frontOfShop || "South" : room.entranceSide || "South";
      const et = room.entranceType || "Full Wall Shutter";

      // The shared wall face of Room[i] with Room[i-1]:
      // whichSide="East" means Room[i] is East of Room[i-1], so Room[i]'s West is shared.
      const sharedSide = i > 0 ? opposite(room.whichSide || "East") : null;
      const sharedIsOpen = i > 0 ? openPassage[i] : false;

      // Room[i+1] will draw the shared wall on its own sharedSide.
      // So Room[i] must skip the face toward Room[i+1] to avoid double-draw.
      const nextRoom = rooms[i + 1];
      const skipTowardNextSide: string | null = nextRoom
        ? nextRoom.whichSide || "East"
        : null;

      const allSides: Array<{
        name: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
      }> = [
        { name: "North", x1: x, y1: y, x2: x + w, y2: y },
        { name: "South", x1: x, y1: y + h, x2: x + w, y2: y + h },
        { name: "West", x1: x, y1: y, x2: x, y2: y + h },
        { name: "East", x1: x + w, y1: y, x2: x + w, y2: y + h },
      ];

      for (const s of allSides) {
        // Skip the face that Room[i+1] will draw as its own sharedSide (avoid double-draw).
        if (skipTowardNextSide !== null && s.name === skipTowardNextSide)
          continue;

        // Is this the shared wall with the previous room?
        const isSharedWithPrev = sharedSide !== null && s.name === sharedSide;

        if (isSharedWithPrev) {
          // Draw the shared wall. If open (entrance connecting both rooms): stubs + symbol.
          // If no opening: full solid wall line.
          if (sharedIsOpen) {
            // Determine which entrance type to use for rendering the shared wall.
            // Prefer Room[i]'s entrance type if its entrance faces the shared wall,
            // otherwise use the previous room's entrance type.
            const thisEntranceIsOnShared = esSide === sharedSide;
            const prevRoom = rooms[i - 1];
            const prevEt = prevRoom?.entranceType || "Full Wall Shutter";
            const useEt = thisEntranceIsOnShared ? et : prevEt;
            entranceSvg += renderPdfEntrance(
              rp[i],
              sharedSide,
              useEt,
              "",
              0,
              "",
            );
          } else {
            // No opening on shared wall: draw full solid wall line
            roomSvg += `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="#000" stroke-width="${WALL}" stroke-linecap="square"/>`;
          }
          continue;
        }

        // Entrance wall (not shared): draw stubs + symbol
        if (s.name === esSide) {
          entranceSvg += renderPdfEntrance(rp[i], esSide, et, "", 0, "");
          continue;
        }

        // All other sides: draw solid black wall line
        roomSvg += `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="#000" stroke-width="${WALL}" stroke-linecap="square"/>`;
      }

      // Room label
      roomSvg += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="${fs}" font-weight="bold" fill="#1e40af">${escSvg(`Room No ${i + 1}`)}</text>`;

      // Dimension labels — bold text only, NO arrows
      const dimFs = Math.max(Math.min(12, w < 60 ? 8 : 11), 7);
      dimSvg += `<text x="${cx}" y="${y - 5}" text-anchor="middle" font-size="${dimFs}" font-weight="bold" fill="#1e3a8a">${escSvg(String(room.width))} FT</text>`;
      dimSvg += `<text x="${x + w + 5}" y="${cy + 4}" text-anchor="start" font-size="${dimFs}" font-weight="bold" fill="#1e3a8a">${escSvg(String(room.length))} FT</text>`;
    });
  }

  // Compass markers
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

function personBlock(
  index: number | null,
  name: string,
  address: string,
  email: string,
  mobile: string,
  idCardNo: string,
): string {
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

function buildAnnexureDirPersons(
  btd: BusinessTypeData | undefined | null,
  app: Application,
): { roleLabel: string; personsHtml: string } {
  const idCard = (p: { aadhaarNo?: string; panNo?: string }) =>
    p.aadhaarNo || p.panNo || "___________";

  if (!btd || btd.businessType === "Proprietary") {
    const propName =
      (btd as { proprietorName?: string } | undefined)?.proprietorName ||
      app.proprietorName ||
      "___________";
    const propAddr =
      (btd as { proprietorAddress?: string } | undefined)?.proprietorAddress ||
      app.firmAddress ||
      "___________";
    const propEmail =
      (btd as { proprietorEmail?: string } | undefined)?.proprietorEmail ||
      "___________";
    const propMobile =
      (btd as { proprietorMobile?: string } | undefined)?.proprietorMobile ||
      app.mobileNumber ||
      "___________";
    const propId = idCard({
      aadhaarNo: (btd as { aadhaarNo?: string } | undefined)?.aadhaarNo,
      panNo: (btd as { panNo?: string } | undefined)?.panNo,
    });
    return {
      roleLabel: "Proprietor",
      personsHtml: personBlock(
        null,
        propName,
        propAddr,
        propEmail,
        propMobile,
        propId,
      ),
    };
  }

  const sep =
    '<hr style="border:none;border-top:1px solid #ccc;margin:6px 0"/>';
  const empty = personBlock(
    null,
    "___________",
    "___________",
    "___________",
    "___________",
    "___________",
  );

  if (btd.businessType === "Partnership") {
    const persons = (btd.partners || []) as PersonEntry[];
    return {
      roleLabel: "Partners",
      personsHtml: persons.length
        ? persons
            .map((p, i) =>
              personBlock(
                i + 1,
                p.name,
                p.address,
                p.email,
                p.mobile,
                idCard(p),
              ),
            )
            .join(sep)
        : empty,
    };
  }

  if (btd.businessType === "LLP") {
    const persons = (btd.designatedPartners || []) as PersonEntry[];
    return {
      roleLabel: "Designated Partners",
      personsHtml: persons.length
        ? persons
            .map((p, i) =>
              personBlock(
                i + 1,
                p.name,
                p.address,
                p.email,
                p.mobile,
                idCard(p),
              ),
            )
            .join(sep)
        : empty,
    };
  }

  if (btd.businessType === "Pvt. Ltd." || btd.businessType === "Ltd.") {
    const persons = (btd.directors || []) as PersonEntry[];
    return {
      roleLabel: "Directors",
      personsHtml: persons.length
        ? persons
            .map((p, i) =>
              personBlock(
                i + 1,
                p.name,
                p.address,
                p.email,
                p.mobile,
                idCard(p),
              ),
            )
            .join(sep)
        : empty,
    };
  }

  if (btd.businessType === "Trust" || btd.businessType === "Society") {
    const persons = (btd.trustees || []) as TrusteeEntry[];
    return {
      roleLabel: "Trustees / Office Bearers",
      personsHtml: persons.length
        ? persons
            .map((p, i) =>
              personBlock(
                i + 1,
                p.name,
                p.address,
                p.email,
                p.mobile,
                idCard(p),
              ),
            )
            .join(sep)
        : empty,
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
        btd.authorizedPersonAadhaar || btd.authorizedPersonPan || "___________",
      ),
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
      "___________",
    ),
  };
}

export const FORM_TYPES = [
  { key: "fda_covering_letter", label: "FDA Covering Letter" },
  { key: "plan_layout", label: "Plan Layout" },
  { key: "annexure_dir", label: "Annexure DIR" },
  {
    key: "job_appointment_pharmacist",
    label: "Job Appointment Letter (Pharmacist)",
  },
  {
    key: "job_acceptance_pharmacist",
    label: "Job Acceptance Letter (Pharmacist)",
  },
  {
    key: "resignation_acceptance_pharmacist",
    label: "Resignation & Acceptance Letter (Pharmacist)",
  },
  { key: "change_premise", label: "Application for Change of Premise" },
  { key: "alteration_premise", label: "Application for Alteration of Premise" },
];

export function printForm(
  formKey: string,
  app: Application,
  masterData?: FormMasterData,
  pharmacists?: ApplicationPharmacist[],
  planLayoutDetails?: PlanLayoutPrintData,
) {
  const date = fmtDate(app.applicationDate);
  const header = companyHeader(app);
  const firm = app.businessName || "___________";
  const owner = app.proprietorName || "___________";
  const addr = app.firmAddress || "___________";
  const mobile = app.mobileNumber || "___________";
  const firmId = app.firmId || "___________";

  const appPharmacists = Array.isArray(pharmacists) ? pharmacists : [];
  const firstPh = appPharmacists[0];

  const phName =
    firstPh?.fullName ?? masterData?.pharmacist?.name ?? "___________";
  const phReg =
    firstPh?.registrationNumber ??
    masterData?.pharmacist?.registrationNumber ??
    "___________";
  const phQual =
    firstPh?.qualification ??
    masterData?.pharmacist?.qualification ??
    "___________";
  const phAddr =
    firstPh?.address ?? masterData?.pharmacist?.address ?? "___________";
  const phContact =
    firstPh?.mobileNumber ?? masterData?.pharmacist?.contact ?? "___________";
  const phJoining = firstPh?.dateOfJoining ?? "___________";

  // Suppress unused FDA vars (kept for future use)
  void masterData?.fda;

  switch (formKey) {
    case "fda_covering_letter": {
      const ci = masterData?.companyInfo;
      const DEFAULT_FDA =
        "Assistant Commissioner, Food & Drug Administration (Drug) Buldhana (MH)";
      const fdaAddr = app.fdaAddress || ci?.fdaAddress || DEFAULT_FDA;
      const today = fmtDate(undefined); // today's date
      const subject = fdaCoveringLetterSubject(app.serviceType, firm);
      const bodyHtml = fdaCoveringLetterBody(app, owner, firm, addr);
      // FDA Covering Letter uses client firm details in header (not Barote Consultancy)
      void ci;

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

      // For Change of Premise: show new address in header; otherwise show normal address
      const displayAddr =
        isChgPrem && app.changePremiseNewAddress
          ? app.changePremiseNewAddress
          : addr;

      const appHeading = `<p class="app-heading">${getApplicationHeading(app.serviceType)}</p>`;

      // ── Room Details table (compact, for side-by-side layout) ─────────────
      const roomsTableInner =
        pld && Array.isArray(pld.rooms) && pld.rooms.length > 0
          ? `<table style="border-collapse:collapse;width:100%;font-family:'Arial Narrow',Arial,sans-serif;font-size:12px">
              <tr style="background:#f0f0f0">
                <th style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">Room</th>
                <th style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">L (ft)</th>
                <th style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">W (ft)</th>
                <th style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">Area</th>
              </tr>
              ${pld.rooms
                .map(
                  (r, idx) =>
                    `<tr>
                  <td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">No ${idx + 1}</td>
                  <td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${r.length}</td>
                  <td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${r.width}</td>
                  <td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${(r.length * r.width).toFixed(1)}</td>
                </tr>`,
                )
                .join("")}
            </table>`
          : "<em style='font-size:12px;font-family:Arial Narrow,Arial,sans-serif'>No rooms entered</em>";

      // ── Boundary Details (for side-by-side layout) ────────────────────────
      const boundaryTableInner = pld
        ? `<table class="bdr-tbl" style="border-collapse:collapse;width:100%;font-family:'Arial Narrow',Arial,sans-serif;font-size:12px">
            <tr><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">East:</td><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${pld.boundaryEast || "—"}</td></tr>
            <tr><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">West:</td><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${pld.boundaryWest || "—"}</td></tr>
            <tr><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">North:</td><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${pld.boundaryNorth || "—"}</td></tr>
            <tr><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif;font-weight:bold">South:</td><td style="border:1px solid #000;padding:2px 4px;font-size:12px;font-family:'Arial Narrow',Arial,sans-serif">${pld.boundarySouth || "—"}</td></tr>
          </table>`
        : "<em style='font-size:12px;font-family:Arial Narrow,Arial,sans-serif'>No boundary details</em>";

      // Side-by-side block
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

      // ── Premises Dimensions — auto-calculated from rooms ──────────────────
      let areaBlock = "";
      if (pld) {
        if (Array.isArray(pld.rooms) && pld.rooms.length > 0) {
          const roomAreas = pld.rooms.map((r) => r.length * r.width);
          const totalSqFt = roomAreas.reduce((s, a) => s + a, 0);
          const totalSqMtr = (totalSqFt * 0.0929).toFixed(2);
          const roomLabels = pld.rooms
            .map((_, i) => `Room ${i + 1}`)
            .join(" + ");
          const calcParts = pld.rooms
            .map(
              (r, i) =>
                `(${r.length} × ${r.width})${i < pld.rooms.length - 1 ? " + " : ""}`,
            )
            .join("");
          const indivAreas = roomAreas.map((a) => a.toFixed(2)).join(" + ");
          areaBlock = `<div class="area-block">
            <p><strong>Area = ${roomLabels} = ${calcParts} Sq. Ft.</strong></p>
            <p>&nbsp;&nbsp;= ${indivAreas} Sq. Ft.</p>
            <p>&nbsp;&nbsp;= <strong>${totalSqFt.toFixed(2)} Sq. Ft.</strong></p>
            <p>&nbsp;&nbsp;= <strong>${totalSqMtr} Sq. Mtr.</strong></p>
          </div>`;
        } else {
          const sqFt = (pld.premisesLength * pld.premisesWidth).toFixed(2);
          const sqMtr = (
            pld.premisesLength *
            pld.premisesWidth *
            0.0929
          ).toFixed(2);
          areaBlock = `<div class="area-block">
            <p><strong>Area = ${pld.premisesLength} × ${pld.premisesWidth} Sq. Ft.</strong></p>
            <p>&nbsp;&nbsp;= <strong>${sqFt} Sq. Ft.</strong></p>
            <p>&nbsp;&nbsp;= <strong>${sqMtr} Sq. Mtr.</strong></p>
          </div>`;
        }
      }

      // availH/availW for the SVG viewBox (SVG user units ~ CSS pt at 96dpi/pt scale)
      // These represent the drawing area budget passed to buildPlanDiagram.
      const diagram = pld ? buildPlanDiagram(pld, 650, 780) : "";

      // ── Alteration area section (only for Alteration of Premise) ─────────
      const alterationSection = isAlt
        ? `<div class="area-block" style="margin-bottom:4px">
            <p><strong>Alteration Details</strong></p>
            <p>Old Area of Firm: <strong>${app.alterationOldArea != null ? `${app.alterationOldArea} Sq. Ft.` : "___________"}</strong></p>
            <p>Proposed Area (After Alteration): <strong>${app.alterationProposedArea != null ? `${app.alterationProposedArea} Sq. Ft.` : "___________"}</strong></p>
          </div>`
        : "";

      // ── Updated print order with flex-based full-page layout ─────────────
      // plan-page: flex column, fills A4 height
      // plan-top: all compact top sections (shrinks to natural height)
      // plan-diagram-area: stretches to fill ALL remaining space
      // sig-block: pinned to bottom (flex-shrink:0)
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
      const btd = (app as Application & { businessTypeData?: BusinessTypeData })
        .businessTypeData;
      const { roleLabel, personsHtml } = buildAnnexureDirPersons(btd, app);
      const entityRef =
        btd?.businessType === "Trust" || btd?.businessType === "Society"
          ? "the organization"
          : btd?.businessType === "Pvt. Ltd." || btd?.businessType === "Ltd."
            ? "the Company"
            : "M/s";
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
        const name = ph?.fullName ?? phName;
        const reg = ph?.registrationNumber ?? phReg;
        const qual = ph?.qualification ?? phQual;
        const address = ph?.address ?? phAddr;
        const contact = ph?.mobileNumber ?? phContact;
        const joining = ph?.dateOfJoining ?? phJoining;
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
        const name = ph?.fullName ?? phName;
        const reg = ph?.registrationNumber ?? phReg;
        // Prefer resignationDate over dateOfLeaving
        const resignDate = ph?.resignationDate?.trim()
          ? ph.resignationDate
          : (ph?.dateOfLeaving ?? "___________");
        const resignDateRow = ph?.resignationDate?.trim()
          ? `<tr><td class="label">Resignation Date:</td><td>${ph.resignationDate}</td></tr>`
          : "";
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
      // Resignation + Acceptance letter for the OLD pharmacist (Add Pharmacist flow)
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
      const oldArea =
        app.alterationOldArea != null
          ? `${app.alterationOldArea} Sq. Ft.`
          : "___________";
      const proposedArea =
        app.alterationProposedArea != null
          ? `${app.alterationProposedArea} Sq. Ft.`
          : "___________";
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
