/**
 * Editorial product media — the "lead with the product, not the carton" pattern
 * approved on /l-cleats and rolled out across the fastener pages.
 *
 * Client reasoning (Hollis, Aug call):
 *  - one box/carton photo per SECTION, so a buyer can picture the box on a shelf
 *  - individual cards lead with THE PRODUCT itself, so the eye lands on the
 *    fastener, its length and its specs — not on repeated box artwork
 *
 * Every drawing here is generated from that SKU's own catalog dimensions, so a
 * card never shows another product's photograph. Within one family all cards
 * share a single pixels-per-inch scale, exactly like the L-Cleat silhouettes.
 */
import { useState } from "react";
import { RAW_CATALOG } from "@/data/products";
import { ImageLightbox } from "./ImageLightbox";

// ─── Dimensions, straight from the catalog row for that SKU ──────────────────
export type SkuDims = {
  lenIn: number;
  lenLabel: string;
  crownIn?: number;
  crownLabel?: string;
  gauge?: string;
};

function fracToDec(raw: string): number | null {
  const s = raw.replace(/"/g, "").replace(/leg/i, "").trim();
  if (!s) return null;
  if (s.includes("-")) {
    const [w, f] = s.split("-");
    const [n, d] = f.split("/").map(Number);
    if (!d) return null;
    return Number(w) + n / d;
  }
  if (s.includes("/")) {
    const [n, d] = s.split("/").map(Number);
    if (!d) return null;
    return n / d;
  }
  const v = Number(s);
  return Number.isFinite(v) ? v : null;
}

const DIMS: Record<string, SkuDims> = {};
for (const row of RAW_CATALOG) {
  const lenIn = fracToDec(row.length_in ?? "");
  if (lenIn == null) continue;
  const crownIn = fracToDec(row.crown ?? "");
  DIMS[row.id] = {
    lenIn,
    lenLabel: (row.length_in ?? "").replace(/\s*leg$/i, ""),
    crownIn: crownIn ?? undefined,
    crownLabel: row.crown || undefined,
    gauge: row.gauge || undefined,
  };
}

export function dimsFor(sku: string): SkuDims | undefined {
  return DIMS[sku];
}

/** Longest fastener in a family — used so every card shares one scale. */
export function maxLenIn(skus: { id: string }[], fallback = 2): number {
  const lens = skus.map(p => DIMS[p.id]?.lenIn).filter((n): n is number => !!n);
  return lens.length ? Math.max(...lens) : fallback;
}

// Drawn wire/shank thickness by gauge. Radial scale is exaggerated for
// legibility at card size (the same convention the reference charts use);
// length is always true to scale.
function wirePx(gauge?: string): number {
  switch (gauge) {
    case "15": return 5.4;
    case "15.5": return 5;
    case "16": return 4.4;
    case "18": return 3.4;
    case "19": return 3.1;
    case "20": return 2.9;
    case "23": return 2.2;
    default: return 4;
  }
}

const MEDIA_H = 150;      // rendered height inside the card's 170px media band
const DRAW_H = 122;       // pixels available for fastener length

const LABEL = { fill: "#6E6E76", fontFamily: "Assistant, sans-serif", fontWeight: 800, fontSize: 9 } as const;
const STEEL = { fill: "#E7E7EC", stroke: "#4A4A52", strokeWidth: 0.9 } as const;

// ─── Staple ──────────────────────────────────────────────────────────────────
/**
 * Crown bar across the top with two parallel legs — drawn from the SKU's own
 * crown width and leg length. `familyMax` keeps every card in the tab on one
 * scale so a 3/4" leg visibly reads shorter than a 2" leg.
 */
export function StapleMedia({ sku, familyMax }: { sku: string; familyMax: number }) {
  const d = DIMS[sku];
  if (!d) return null;
  const ppi = DRAW_H / familyMax;
  const wire = wirePx(d.gauge);
  const legPx = d.lenIn * ppi;
  const crownPx = Math.max(wire * 3, (d.crownIn ?? 0.5) * ppi * 1.9);

  const top = 14;
  const dimX = crownPx + 26;
  const w = dimX + 46;
  const h = top + legPx + wire + 16;

  return (
    <svg
      viewBox={`0 0 ${w} ${Math.max(h, DRAW_H + 34)}`}
      style={{ height: MEDIA_H, width: "auto" }}
      role="img"
      aria-label={`${d.lenLabel} leg${d.crownLabel ? `, ${d.crownLabel} crown` : ""} ${d.gauge ?? ""} GA staple, drawn to scale`}
    >
      <g transform="translate(8 0)">
        {/* crown bar */}
        <rect x={0} y={top} width={crownPx} height={wire} {...STEEL} />
        {/* legs */}
        <rect x={0} y={top + wire} width={wire} height={legPx} {...STEEL} />
        <rect x={crownPx - wire} y={top + wire} width={wire} height={legPx} {...STEEL} />
        {/* chisel points */}
        <path d={`M 0 ${top + wire + legPx} L ${wire} ${top + wire + legPx - wire * 1.1} L ${wire} ${top + wire + legPx}Z`} fill="#4A4A52" opacity="0.55" />
        <path d={`M ${crownPx} ${top + wire + legPx} L ${crownPx - wire} ${top + wire + legPx - wire * 1.1} L ${crownPx - wire} ${top + wire + legPx} Z`} fill="#4A4A52" opacity="0.55" />

        {/* crown dimension */}
        {d.crownLabel && (
          <g {...LABEL}>
            <line x1={0} y1={top - 6} x2={crownPx} y2={top - 6} stroke="#B9B9C0" strokeWidth="0.8" />
            <text x={crownPx + 4} y={top - 3}>{d.crownLabel}</text>
          </g>
        )}

        {/* leg-length dimension */}
        <g {...LABEL}>
          <line x1={dimX} y1={top + wire} x2={dimX} y2={top + wire + legPx} stroke="#B9B9C0" strokeWidth="0.8" />
          <line x1={dimX - 3} y1={top + wire} x2={dimX + 3} y2={top + wire} stroke="#B9B9C0" strokeWidth="0.8" />
          <line x1={dimX - 3} y1={top + wire + legPx} x2={dimX + 3} y2={top + wire + legPx} stroke="#B9B9C0" strokeWidth="0.8" />
          <text x={dimX + 6} y={top + wire + legPx / 2 + 3}>{d.lenLabel}</text>
        </g>
      </g>
    </svg>
  );
}

// ─── Nail / brad / pin ───────────────────────────────────────────────────────
export type NailHead = "brad" | "thead" | "fn" | "pin";

/**
 * Single fastener in elevation: shank to scale from the SKU's length, with the
 * head profile that family actually uses (T-head on 16 GA, small cap head on
 * 18 GA brads, headless 23 GA pins).
 */
export function NailMedia({
  sku,
  familyMax,
  head = "brad",
}: {
  sku: string;
  familyMax: number;
  head?: NailHead;
}) {
  const d = DIMS[sku];
  if (!d) return null;
  const ppi = DRAW_H / familyMax;
  const shank = wirePx(d.gauge);
  const lenPx = d.lenIn * ppi;

  const headW = head === "thead" ? shank * 3.4 : head === "fn" ? shank * 2.6 : head === "brad" ? shank * 2.2 : shank;
  const headH = head === "pin" ? 0 : head === "thead" ? shank * 1.5 : shank * 1.2;

  const cx = Math.max(headW, 12);
  const top = 16;
  const dimX = cx + shank / 2 + 22;
  const w = dimX + 46;
  const h = top + headH + lenPx + 16;

  return (
    <svg
      viewBox={`0 0 ${w} ${Math.max(h, DRAW_H + 40)}`}
      style={{ height: MEDIA_H, width: "auto" }}
      role="img"
      aria-label={`${d.lenLabel} ${d.gauge ?? ""} GA fastener, drawn to scale`}
    >
      {/* head */}
      {headH > 0 && (
        head === "thead"
          ? <rect x={cx - shank / 2} y={top} width={headW} height={headH} {...STEEL} />
          : <rect x={cx - headW / 2} y={top} width={headW} height={headH} {...STEEL} />
      )}
      {/* shank */}
      <rect x={cx - shank / 2} y={top + headH} width={shank} height={lenPx} {...STEEL} />
      {/* chisel point */}
      <path
        d={`M ${cx - shank / 2} ${top + headH + lenPx} L ${cx + shank / 2} ${top + headH + lenPx - shank * 1.2} L ${cx + shank / 2} ${top + headH + lenPx} Z`}
        fill="#4A4A52"
        opacity="0.55"
      />
      {/* length dimension */}
      <g {...LABEL}>
        <line x1={dimX} y1={top + headH} x2={dimX} y2={top + headH + lenPx} stroke="#B9B9C0" strokeWidth="0.8" />
        <line x1={dimX - 3} y1={top + headH} x2={dimX + 3} y2={top + headH} stroke="#B9B9C0" strokeWidth="0.8" />
        <line x1={dimX - 3} y1={top + headH + lenPx} x2={dimX + 3} y2={top + headH + lenPx} stroke="#B9B9C0" strokeWidth="0.8" />
        <text x={dimX + 6} y={top + headH + lenPx / 2 + 3}>{d.lenLabel}</text>
      </g>
    </svg>
  );
}

// ─── Section-level shelf reference photo ─────────────────────────────────────
/**
 * The one carton/box photo per section. Presented once, clearly, as the
 * "what it looks like on the shelf" reference — click to enlarge, because the
 * printed item number and QTY are unreadable at section size.
 */
export function ShelfPhoto({
  src,
  alt,
  label,
  caption,
}: {
  src: string;
  alt: string;
  label: string;
  caption?: string;
}) {
  const [zoom, setZoom] = useState(false);
  return (
    <div className="bg-white p-4" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
      <button
        type="button"
        onClick={() => setZoom(true)}
        aria-label={`Enlarge packaging photo — ${label}`}
        className="w-full cursor-zoom-in"
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
        />
      </button>
      <div className="pd-label mt-3" style={{ color: "var(--pd-gold)", fontSize: 11 }}>{label}</div>
      {caption && (
        <div className="mt-1" style={{ color: "var(--pd-muted)", fontSize: 11.5, lineHeight: 1.5 }}>{caption}</div>
      )}
      {zoom && <ImageLightbox src={src} alt={alt} name={label} onClose={() => setZoom(false)} />}
    </div>
  );
}
