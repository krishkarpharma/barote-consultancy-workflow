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
import { Separator } from "@/components/ui/separator";
import { FileText, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { PlanLayoutDetails, RoomDetail } from "../types";
import type { PlanLayoutPrintData } from "../utils/formTemplates";

interface Props {
  initial?: PlanLayoutDetails | null;
  onGenerate: (details: PlanLayoutPrintData) => void;
  onClose: () => void;
  mobileNumber?: string;
}

const FRONT_OPTIONS = ["North", "South", "East", "West"];
const SIDE_OPTIONS = ["East", "West", "North", "South"];

const ENTRANCE_TYPE_OPTIONS = [
  "Door",
  "Full Wall Shutter",
  "Half Wall Shutter",
  "Half Wall Opening",
  "No Wall / Open",
  "Other",
] as const;

type EntranceTypeOption = (typeof ENTRANCE_TYPE_OPTIONS)[number];

function defaultEntranceType(): EntranceTypeOption {
  return "Full Wall Shutter";
}

function emptyRoom(): RoomDetail {
  return {
    length: 0,
    width: 0,
    entranceType: "Full Wall Shutter",
    roomName: undefined,
    whichSide: undefined,
    entranceSide: undefined,
  };
}

interface LocalFormState extends PlanLayoutDetails {
  // rooms carry entranceType + optional custom label per room
  rooms: Array<RoomDetail & { entranceLabel?: string }>;
}

function emptyDetails(): LocalFormState {
  return {
    boundaryEast: "",
    boundaryWest: "",
    boundaryNorth: "",
    boundarySouth: "",
    premisesLength: 0,
    premisesWidth: 0,
    rooms: [],
    frontOfShop: "North",
  };
}

function fromInitial(initial: PlanLayoutDetails): LocalFormState {
  return {
    ...initial,
    rooms: (initial.rooms || []).map((r) => ({
      ...r,
      entranceType: r.entranceType || "Full Wall Shutter",
    })),
  };
}

// ─── Real-time SVG preview ────────────────────────────────────────────────────
const _SHUTTER_COLOR = "#06B6D4";
const _DOOR_ARC_COLOR = "#555";

/**
 * Compute pixel position of a room given the position of a reference room
 * and the side the new room is on (whichSide).
 */
function placeRoom(
  refPos: { x: number; y: number; w: number; h: number },
  side: string,
  rw: number,
  rh: number,
): { x: number; y: number } {
  if (side === "East") return { x: refPos.x + refPos.w, y: refPos.y };
  if (side === "West") return { x: refPos.x - rw, y: refPos.y };
  if (side === "North") return { x: refPos.x, y: refPos.y - rh };
  // South (default)
  return { x: refPos.x, y: refPos.y + refPos.h };
}

/**
 * Determine which wall of a room the entrance is on, given entranceSide.
 * Returns an SVG element string.
 */
function renderEntranceOnSide(
  pos: { x: number; y: number; w: number; h: number },
  entranceSide: string,
  et: string,
  _entranceLabel: string,
  _shuttT: number,
): string {
  const { x, y, w, h } = pos;
  const isHorizontal = entranceSide === "North" || entranceSide === "South";
  const dim = isHorizontal ? w : h;

  // For No Wall / Open: entire wall open — draw nothing
  if (et === "No Wall / Open") return "";

  // Gap size per entrance type
  let gapSize: number;
  if (et === "Half Wall Opening" || et === "Half Wall Shutter") {
    gapSize = dim * 0.5;
  } else if (et === "Full Wall Shutter") {
    gapSize = dim * 0.6;
  } else {
    // Door, Other — 30% gap
    gapSize = dim * 0.3;
  }

  // Wall endpoints
  let wx1: number;
  let wy1: number;
  let wx2: number;
  let wy2: number;

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
    // South
    wx1 = x;
    wy1 = y + h;
    wx2 = x + w;
    wy2 = y + h;
  }

  // Gap center and endpoints
  const wallCenter = isHorizontal ? x + w / 2 : y + h / 2;
  const gapStart = wallCenter - gapSize / 2;
  const gapEnd = gapStart + gapSize;

  if (isHorizontal) {
    // Horizontal wall (North or South)
    const wy = wy1; // wall Y coordinate
    const seg1 =
      gapStart > wx1
        ? `<line x1="${wx1}" y1="${wy}" x2="${gapStart}" y2="${wy}" stroke="#000" stroke-width="2.5"/>`
        : "";
    const seg2 =
      gapEnd < wx2
        ? `<line x1="${gapEnd}" y1="${wy}" x2="${wx2}" y2="${wy}" stroke="#000" stroke-width="2.5"/>`
        : "";

    let shutterRect = "";
    if (et === "Full Wall Shutter") {
      shutterRect = `<rect x="${gapStart}" y="${wy - 4}" width="${gapSize}" height="8" fill="${_SHUTTER_COLOR}" stroke="#0891B2" stroke-width="1"/>`;
    } else if (et === "Half Wall Shutter") {
      shutterRect = `<rect x="${gapStart}" y="${wy - 4}" width="${gapSize}" height="8" fill="${_SHUTTER_COLOR}" stroke="#0891B2" stroke-width="1"/>`;
    } else if (et === "Half Wall Opening") {
      shutterRect = `<rect x="${gapStart}" y="${wy - 3}" width="${gapSize}" height="6" fill="#BAE6FD" stroke="${_SHUTTER_COLOR}" stroke-width="1" stroke-dasharray="3,2"/>`;
    }
    // Door / Other: gap only, no symbol
    return `${seg1}${seg2}${shutterRect}`;
  }

  // Vertical wall (East or West)
  const wx = wx1; // wall X coordinate
  const seg1 =
    gapStart > wy1
      ? `<line x1="${wx}" y1="${wy1}" x2="${wx}" y2="${gapStart}" stroke="#000" stroke-width="2.5"/>`
      : "";
  const seg2 =
    gapEnd < wy2
      ? `<line x1="${wx}" y1="${gapEnd}" x2="${wx}" y2="${wy2}" stroke="#000" stroke-width="2.5"/>`
      : "";

  let shutterRect = "";
  if (et === "Full Wall Shutter") {
    shutterRect = `<rect x="${wx - 4}" y="${gapStart}" width="8" height="${gapSize}" fill="${_SHUTTER_COLOR}" stroke="#0891B2" stroke-width="1"/>`;
  } else if (et === "Half Wall Shutter") {
    shutterRect = `<rect x="${wx - 4}" y="${gapStart}" width="8" height="${gapSize}" fill="${_SHUTTER_COLOR}" stroke="#0891B2" stroke-width="1"/>`;
  } else if (et === "Half Wall Opening") {
    shutterRect = `<rect x="${wx - 3}" y="${gapStart}" width="6" height="${gapSize}" fill="#BAE6FD" stroke="${_SHUTTER_COLOR}" stroke-width="1" stroke-dasharray="3,2"/>`;
  }
  // Door / Other: gap only, no symbol
  return `${seg1}${seg2}${shutterRect}`;
}

function buildPreviewSvg(form: LocalFormState): string {
  const SVG_W = 460;
  const SVG_H = 380;
  const MARGIN = 44;
  const WALL_STROKE = 2.5;

  const rooms = Array.isArray(form.rooms) ? form.rooms : [];

  // ── Step 1: place rooms in "feet" space ─────────────────────────────────
  type FtPos = { x: number; y: number; w: number; h: number };
  const rpFt: FtPos[] = [];

  rooms.forEach((room, i) => {
    const rw = Math.max(room.length || 1, 0.5);
    const rh = Math.max(room.width || 1, 0.5);
    const pos =
      i === 0
        ? { x: 0, y: 0 }
        : placeRoom(rpFt[i - 1], room.whichSide || "East", rw, rh);
    rpFt.push({ x: pos.x, y: pos.y, w: rw, h: rh });
  });

  // ── Step 2: bounding box ────────────────────────────────────────────────
  const minFx = rpFt.length ? Math.min(...rpFt.map((p) => p.x)) : 0;
  const minFy = rpFt.length ? Math.min(...rpFt.map((p) => p.y)) : 0;
  const maxFx = rpFt.length
    ? Math.max(...rpFt.map((p) => p.x + p.w))
    : form.premisesLength || 10;
  const maxFy = rpFt.length
    ? Math.max(...rpFt.map((p) => p.y + p.h))
    : form.premisesWidth || 8;
  const totalFW = Math.max(maxFx - minFx, 0.01);
  const totalFH = Math.max(maxFy - minFy, 0.01);

  // ── Step 3: available drawing area ─────────────────────────────────────
  const drawW = SVG_W - MARGIN * 2;
  const drawH = SVG_H - MARGIN * 2;

  // ── Step 4: uniform scale ────────────────────────────────────────────────
  // Single room: scale to ~50% of available space (centered)
  // Multi-room: fill available space
  const isSingleRoom = rooms.length === 1;
  const baseScaleX = drawW / totalFW;
  const baseScaleY = drawH / totalFH;
  const baseScale = Math.min(baseScaleX, baseScaleY);
  const scale = isSingleRoom ? baseScale * 0.5 : baseScale;

  // ── Step 5: pixel positions (centered) ─────────────────────────────────
  const scaledW = totalFW * scale;
  const scaledH = totalFH * scale;
  const offsetX = MARGIN + (drawW - scaledW) / 2;
  const offsetY = MARGIN + (drawH - scaledH) / 2;

  const rp: FtPos[] = rpFt.map((r) => ({
    x: offsetX + (r.x - minFx) * scale,
    y: offsetY + (r.y - minFy) * scale,
    w: Math.max(r.w * scale, 20),
    h: Math.max(r.h * scale, 20),
  }));

  // ── Compass markers ─────────────────────────────────────────────────────
  const bMinX = rp.length ? Math.min(...rp.map((p) => p.x)) : MARGIN;
  const bMinY = rp.length ? Math.min(...rp.map((p) => p.y)) : MARGIN;
  const bMaxX = rp.length
    ? Math.max(...rp.map((p) => p.x + p.w))
    : MARGIN + drawW;
  const bMaxY = rp.length
    ? Math.max(...rp.map((p) => p.y + p.h))
    : MARGIN + drawH;
  const midX = (bMinX + bMaxX) / 2;
  const midY = (bMinY + bMaxY) / 2;
  const compass = `
    <text x="${midX}" y="${bMinY - 10}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">N</text>
    <text x="${midX}" y="${bMaxY + 20}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">S</text>
    <text x="${bMinX - 14}" y="${midY + 5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">W</text>
    <text x="${bMaxX + 14}" y="${midY + 5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">E</text>`;

  // ── Helper: opposite direction ──────────────────────────────────────────
  function opp(side: string): string {
    if (side === "North") return "South";
    if (side === "South") return "North";
    if (side === "East") return "West";
    return "East";
  }

  // ── Step 6: open passage pre-computation ─────────────────────────────────
  // openPassage[i] = true means the shared boundary between room[i] and room[i-1] has an
  // entrance/opening on it (drawn with stubs, not a full solid line).
  // We check BOTH directions: room[i] entering from the shared face OR room[i-1] exiting
  // toward room[i].
  const openPassage: boolean[] = rooms.map((room, i) => {
    if (i === 0) return false;
    const ws = room.whichSide || "East";
    const roomEntersFacingPrev = (room.entranceSide || "") === opp(ws);
    const prevRoom = rooms[i - 1];
    const prevEntersFacingNext =
      prevRoom &&
      (prevRoom.entranceSide || (i === 1 ? form.frontOfShop : "")) === ws;
    return roomEntersFacingPrev || !!prevEntersFacingNext;
  });

  let roomSvg = "";
  let wallSvg = "";
  let dimSvg = "";

  if (rooms.length === 0) {
    // No rooms: draw outer boundary box
    roomSvg = `<rect x="${MARGIN}" y="${MARGIN}" width="${drawW}" height="${drawH}" fill="#fafafa" stroke="#000" stroke-width="${WALL_STROKE}"/>`;
  } else {
    rooms.forEach((room, i) => {
      const { x: rx, y: ry, w: rw, h: rh } = rp[i];
      const cx = rx + rw / 2;
      const cy = ry + rh / 2;
      const fontSize = rw < 60 ? 10 : 13;

      // Fill rectangle
      roomSvg += `<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="#f0f7ff"/>`;

      // Room label
      roomSvg += `
        <text x="${cx}" y="${cy - 5}" text-anchor="middle" font-size="${fontSize}" font-weight="bold" fill="#1e40af">Room No ${i + 1}</text>
        <text x="${cx}" y="${cy + fontSize}" text-anchor="middle" font-size="9" fill="#555">${room.length}×${room.width} ft</text>`;

      // Entrance side:
      // Room 0: use frontOfShop
      // Room 1+: use room.entranceSide
      const esSide =
        i === 0 ? form.frontOfShop || "South" : room.entranceSide || "South";
      const et = room.entranceType || "Full Wall Shutter";

      // The shared wall face of Room[i] with Room[i-1]:
      // whichSide tells us which side of Room[i-1] Room[i] is placed on.
      // E.g. whichSide="East" means Room[i] is to the East of Room[i-1],
      // so Room[i]'s WEST wall is the shared face (opposite of whichSide).
      const sharedSide = i > 0 ? opp(room.whichSide || "East") : null;

      // Is there an opening on the shared wall?
      // openPassage[i] = true means the boundary between room[i] and room[i-1] is open.
      const sharedIsOpen = i > 0 ? openPassage[i] : false;

      // Determine which room "owns" drawing the shared wall to avoid double-draw.
      // Convention: Room[i] (the later room) always draws its sharedSide wall.
      // Room[i-1] must NOT draw its face toward Room[i] (nextRoom.whichSide side).
      // So for room[i-1], we skip the side that equals nextRoom.whichSide — handled below.

      // Does THIS room have a next room, and should we skip drawing the face toward it?
      // Room[i+1] sits on room[i+1].whichSide of Room[i], so Room[i]'s face toward room[i+1]
      // is room[i+1].whichSide. Room[i+1] will draw that shared wall from its own sharedSide.
      const nextRoom = rooms[i + 1];
      const skipTowardNextSide: string | null = nextRoom
        ? nextRoom.whichSide || "East"
        : null;

      const sides: Array<{
        name: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
      }> = [
        { name: "North", x1: rx, y1: ry, x2: rx + rw, y2: ry },
        { name: "South", x1: rx, y1: ry + rh, x2: rx + rw, y2: ry + rh },
        { name: "West", x1: rx, y1: ry, x2: rx, y2: ry + rh },
        { name: "East", x1: rx + rw, y1: ry, x2: rx + rw, y2: ry + rh },
      ];

      for (const s of sides) {
        // Skip the face of Room[i] that faces toward Room[i+1].
        // Room[i+1] will draw this shared wall from its sharedSide.
        if (skipTowardNextSide !== null && s.name === skipTowardNextSide)
          continue;

        // Is this the shared wall with the previous room?
        const isSharedWithPrev = sharedSide !== null && s.name === sharedSide;

        if (isSharedWithPrev) {
          // Draw the shared wall between room[i] and room[i-1].
          // If the shared boundary is open (entrance connecting the two rooms),
          // draw with entrance stubs + symbol.
          // If no opening on shared wall, draw a full solid wall line.
          if (sharedIsOpen) {
            // Determine which room's entrance is on this shared boundary.
            // Either room[i] enters from sharedSide, or room[i-1] enters toward room[i].
            // Use room[i]'s entrance type if its entrance is on the shared side,
            // otherwise use room[i-1]'s entrance type.
            const thisEntranceIsOnShared = esSide === sharedSide;
            const prevRoom = rooms[i - 1];
            const prevEsSide =
              i - 1 === 0
                ? form.frontOfShop || "South"
                : prevRoom?.entranceSide || "South";
            const prevEt = prevRoom?.entranceType || "Full Wall Shutter";
            const useEt = thisEntranceIsOnShared ? et : prevEt;
            // Draw entrance stubs + symbol on the shared wall
            // The entrance is on sharedSide of room[i]
            wallSvg += renderEntranceOnSide(rp[i], sharedSide, useEt, "", 0);
            void prevEsSide; // suppress unused warning
          } else {
            // No opening on shared wall: draw full solid wall line
            wallSvg += `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="#000" stroke-width="${WALL_STROKE}" stroke-linecap="square"/>`;
          }
          continue;
        }

        // Entrance wall (not shared): draw stubs + symbol
        if (s.name === esSide) {
          wallSvg += renderEntranceOnSide(rp[i], esSide, et, "", 0);
          continue;
        }

        // All non-entrance, non-shared, non-skipped sides: draw solid border
        wallSvg += `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="#000" stroke-width="${WALL_STROKE}" stroke-linecap="square"/>`;
      }

      // Dimension labels
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

export function PlanLayoutModal({
  initial,
  onGenerate,
  onClose,
  mobileNumber,
}: Props) {
  const [form, setForm] = useState<LocalFormState>(
    initial ? fromInitial(initial) : emptyDetails(),
  );

  function setField<K extends keyof LocalFormState>(
    k: K,
    v: LocalFormState[K],
  ) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function addRoom() {
    setForm((f) => ({ ...f, rooms: [...f.rooms, emptyRoom()] }));
  }

  function removeRoom(i: number) {
    setForm((f) => ({ ...f, rooms: f.rooms.filter((_, idx) => idx !== i) }));
  }

  function updateRoom(
    i: number,
    patch: Partial<RoomDetail & { entranceLabel?: string }>,
  ) {
    setForm((f) => ({
      ...f,
      rooms: f.rooms.map((r, idx) => (idx === i ? { ...r, ...patch } : r)),
    }));
  }

  function handleGenerate() {
    const printData: PlanLayoutPrintData = {
      boundaryEast: form.boundaryEast,
      boundaryWest: form.boundaryWest,
      boundaryNorth: form.boundaryNorth,
      boundarySouth: form.boundarySouth,
      premisesLength: form.premisesLength,
      premisesWidth: form.premisesWidth,
      rooms: form.rooms,
      frontOfShop: form.frontOfShop,
    };
    onGenerate(printData);
  }

  const previewSvg = buildPreviewSvg(form);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      data-ocid="plan_layout_modal.dialog"
    >
      <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-3xl max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Plan Layout Details
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close"
            data-ocid="plan_layout_modal.close_button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          {/* Proprietor Mobile */}
          {mobileNumber && (
            <div className="p-3 rounded-lg bg-muted/20 border border-border text-sm">
              <span className="text-muted-foreground font-medium">
                Mobile No.:{" "}
              </span>
              <span className="text-foreground font-semibold">
                {mobileNumber}
              </span>
            </div>
          )}

          {/* Premises Boundaries */}
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Premises Boundaries
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ["boundaryNorth", "North"],
                  ["boundarySouth", "South"],
                  ["boundaryEast", "East"],
                  ["boundaryWest", "West"],
                ] as [keyof PlanLayoutDetails, string][]
              ).map(([field, label]) => (
                <div key={field} className="space-y-1">
                  <Label htmlFor={`pld-${field}`}>{label}</Label>
                  <Input
                    id={`pld-${field}`}
                    data-ocid={`plan_layout_modal.${field}.input`}
                    placeholder={`${label} boundary`}
                    value={form[field] as string}
                    onChange={(e) =>
                      setField(field as keyof LocalFormState, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Premises Dimensions */}
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Premises Dimensions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="pld-length">Length (ft)</Label>
                <Input
                  id="pld-length"
                  type="number"
                  min={0}
                  data-ocid="plan_layout_modal.premises_length.input"
                  placeholder="e.g. 20"
                  value={form.premisesLength || ""}
                  onChange={(e) =>
                    setField(
                      "premisesLength",
                      Number.parseFloat(e.target.value) || 0,
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pld-width">Width (ft)</Label>
                <Input
                  id="pld-width"
                  type="number"
                  min={0}
                  data-ocid="plan_layout_modal.premises_width.input"
                  placeholder="e.g. 15"
                  value={form.premisesWidth || ""}
                  onChange={(e) =>
                    setField(
                      "premisesWidth",
                      Number.parseFloat(e.target.value) || 0,
                    )
                  }
                />
              </div>
            </div>
            {form.rooms.length > 0 ? (
              (() => {
                const totalSqFt = form.rooms.reduce(
                  (s, r) => s + (r.length || 0) * (r.width || 0),
                  0,
                );
                const roomParts = form.rooms
                  .map((_, idx) => `Room ${idx + 1}`)
                  .join(" + ");
                const calcParts = form.rooms
                  .map(
                    (r, idx) =>
                      `(${r.length || 0} × ${r.width || 0})${idx < form.rooms.length - 1 ? " + " : ""}`,
                  )
                  .join("");
                const sqMtr = (totalSqFt * 0.0929).toFixed(2);
                return (
                  <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm space-y-0.5">
                    <p className="font-medium text-foreground">
                      Area = {roomParts} = {calcParts} Sq. Ft.
                    </p>
                    <p className="text-muted-foreground">
                      ={" "}
                      <strong className="text-foreground">
                        {totalSqFt.toFixed(2)} Sq. Ft.
                      </strong>
                    </p>
                    <p className="text-muted-foreground">
                      ={" "}
                      <strong className="text-foreground">
                        {sqMtr} Sq. Mtr.
                      </strong>
                    </p>
                  </div>
                );
              })()
            ) : form.premisesLength > 0 && form.premisesWidth > 0 ? (
              <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm space-y-0.5">
                <p className="font-medium text-foreground">
                  Area = {form.premisesLength} × {form.premisesWidth} Sq. Ft.
                </p>
                <p className="text-muted-foreground">
                  ={" "}
                  <strong className="text-foreground">
                    {(form.premisesLength * form.premisesWidth).toFixed(2)} Sq.
                    Ft.
                  </strong>
                </p>
                <p className="text-muted-foreground">
                  ={" "}
                  <strong className="text-foreground">
                    {(
                      form.premisesLength *
                      form.premisesWidth *
                      0.0929
                    ).toFixed(2)}{" "}
                    Sq. Mtr.
                  </strong>
                </p>
              </div>
            ) : null}
          </section>

          <Separator />

          {/* Front of Shop */}
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Front of Shop / Entrance Direction
            </h3>
            <div className="max-w-xs space-y-1">
              <Label htmlFor="pld-front">Direction facing the entrance</Label>
              <Select
                value={form.frontOfShop}
                onValueChange={(v) => setField("frontOfShop", v)}
              >
                <SelectTrigger
                  id="pld-front"
                  data-ocid="plan_layout_modal.front_of_shop.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FRONT_OPTIONS.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              {form.frontOfShop === "Custom" && (
                <Input
                  className="mt-2"
                  data-ocid="plan_layout_modal.front_of_shop_custom.input"
                  placeholder="Describe front side"
                  onChange={(e) => setField("frontOfShop", e.target.value)}
                />
              )}
            </div>
          </section>

          <Separator />

          {/* Rooms */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Rooms ({form.rooms.length})
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-ocid="plan_layout_modal.add_room.button"
                onClick={addRoom}
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add Room
              </Button>
            </div>

            {form.rooms.length === 0 ? (
              <p
                className="text-sm text-muted-foreground py-3 text-center border border-dashed border-border rounded-lg"
                data-ocid="plan_layout_modal.rooms.empty_state"
              >
                No rooms added. Click "Add Room" to add one.
              </p>
            ) : (
              <div className="space-y-3">
                {form.rooms.map((room, i) => (
                  <div
                    key={`roomcard-${i + 1}`}
                    data-ocid={`plan_layout_modal.room.${i + 1}`}
                    className="p-3 rounded-lg border border-border bg-muted/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-foreground">
                        Room No {i + 1}
                      </span>
                      <button
                        type="button"
                        aria-label="Remove room"
                        data-ocid={`plan_layout_modal.remove_room.${i + 1}`}
                        onClick={() => removeRoom(i)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Positioning — only for rooms 2+ */}
                    {i > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="space-y-1">
                          <Label htmlFor={`room-side-${i}`} className="text-xs">
                            Room No {i + 1} is on which side of Room No {i}?
                          </Label>
                          <Select
                            value={room.whichSide || ""}
                            onValueChange={(v) =>
                              updateRoom(i, { whichSide: v })
                            }
                          >
                            <SelectTrigger
                              id={`room-side-${i}`}
                              data-ocid={`plan_layout_modal.room_which_side.${i + 1}`}
                            >
                              <SelectValue placeholder="Select side" />
                            </SelectTrigger>
                            <SelectContent>
                              {SIDE_OPTIONS.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1">
                          <Label
                            htmlFor={`room-entrance-side-${i}`}
                            className="text-xs"
                          >
                            Entrance Side for Room No {i + 1}:
                          </Label>
                          <Select
                            value={room.entranceSide || ""}
                            onValueChange={(v) =>
                              updateRoom(i, { entranceSide: v })
                            }
                          >
                            <SelectTrigger
                              id={`room-entrance-side-${i}`}
                              data-ocid={`plan_layout_modal.room_entrance_side.${i + 1}`}
                            >
                              <SelectValue placeholder="Select side" />
                            </SelectTrigger>
                            <SelectContent>
                              {SIDE_OPTIONS.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {/* Length / Width */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="space-y-1">
                        <Label htmlFor={`room-length-${i}`}>Length (ft)</Label>
                        <Input
                          id={`room-length-${i}`}
                          type="number"
                          min={0}
                          data-ocid={`plan_layout_modal.room_length.${i + 1}`}
                          placeholder="0"
                          value={room.length || ""}
                          onChange={(e) =>
                            updateRoom(i, {
                              length: Number.parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`room-width-${i}`}>Width (ft)</Label>
                        <Input
                          id={`room-width-${i}`}
                          type="number"
                          min={0}
                          data-ocid={`plan_layout_modal.room_width.${i + 1}`}
                          placeholder="0"
                          value={room.width || ""}
                          onChange={(e) =>
                            updateRoom(i, {
                              width: Number.parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Entrance Type */}
                    <div className="grid grid-cols-2 gap-2 items-end">
                      <div className="space-y-1">
                        <Label htmlFor={`room-entrance-${i}`}>
                          Entrance Type
                        </Label>
                        <Select
                          value={
                            (room.entranceType as EntranceTypeOption) ||
                            defaultEntranceType()
                          }
                          onValueChange={(v) =>
                            updateRoom(i, {
                              entranceType: v,
                              entranceLabel: "",
                            })
                          }
                        >
                          <SelectTrigger
                            id={`room-entrance-${i}`}
                            data-ocid={`plan_layout_modal.room_entrance_type.${i + 1}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ENTRANCE_TYPE_OPTIONS.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {room.entranceType === "Other" && (
                        <div className="space-y-1">
                          <Label htmlFor={`room-entrance-label-${i}`}>
                            Custom Label
                          </Label>
                          <Input
                            id={`room-entrance-label-${i}`}
                            data-ocid={`plan_layout_modal.room_entrance_label.${i + 1}`}
                            placeholder="e.g. Sliding door"
                            value={
                              (room as RoomDetail & { entranceLabel?: string })
                                .entranceLabel || ""
                            }
                            onChange={(e) =>
                              updateRoom(i, { entranceLabel: e.target.value })
                            }
                          />
                        </div>
                      )}

                      {room.length > 0 && room.width > 0 && (
                        <p className="text-xs text-muted-foreground self-end pb-1">
                          Area: {(room.length * room.width).toFixed(2)} Sq. Ft.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Live Preview */}
          {form.rooms.length > 0 && (
            <>
              <Separator />
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                  Live Floor Plan Preview
                </h3>
                <div
                  className="border border-border rounded-lg bg-background overflow-hidden"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled SVG generation
                  dangerouslySetInnerHTML={{ __html: previewSvg }}
                />
                <p className="text-xs text-muted-foreground mt-1.5 text-center">
                  Rooms placed by the selected side. Entrance drawn on the
                  specified wall of each room.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border shrink-0">
          <Button
            variant="outline"
            data-ocid="plan_layout_modal.cancel_button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            data-ocid="plan_layout_modal.generate_button"
            onClick={handleGenerate}
            className="bg-primary text-primary-foreground"
          >
            <FileText className="w-4 h-4 mr-1.5" />
            Generate PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
