// Pro-Drive Fasteners — CSV-driven product catalog
// Single source of truth: src/data/prodrive_master_catalog.csv
// To update products: edit the CSV, commit, Lovable/Netlify rebuilds automatically.

import type { Product } from "@/components/ProductCard";
import { images } from "./images";

// ─── image_key resolver ───────────────────────────────────────────────────────
// Resolves dot-path keys like "lCleats.lc175_16" against the images manifest.
// Returns undefined for empty/unknown keys — ProductCard falls back gracefully.
function resolveImage(key: string): string | undefined {
  if (!key) return undefined;
  const parts = key.trim().split(".");
  let node: unknown = images;
  for (const p of parts) {
    if (node && typeof node === "object" && p in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  // Arrays (e.g. galleher) → first frame; only strings are valid srcs
  if (Array.isArray(node)) node = node[0];
  return typeof node === "string" ? node : undefined;
}

// ─── CSV loader ───────────────────────────────────────────────────────────────

function parseCSV(raw: string): Record<string, string>[] {
  const lines = raw.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    // Handle quoted fields containing commas
    const values: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    values.push(current.trim());
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]));
  });
}

function toProduct(row: Record<string, string>): Product {
  const specs: string[] = [];
  if (row.gauge)   specs.push(`${row.gauge} GA`);
  if (row.crown)   specs.push(`${row.crown} Crown`);
  if (row.angle)   specs.push(`${row.angle} Angle`);
  if (row.finish)  specs.push(row.finish);
  if (row.point)   specs.push(row.point);
  if (row.compatible_tools) {
    row.compatible_tools.split(";").forEach((t) => specs.push(t.trim()));
  }

  const countNum = row.count ? parseInt(row.count, 10) : null;
  const packNum  = row.pack_qty ? parseInt(row.pack_qty, 10) : null;
  const weight   = row.weight_lbs ? `${row.weight_lbs} lbs` : null;

  let pack = "";
  if (countNum && packNum && packNum > 1) {
    pack = `${countNum.toLocaleString()} x ${packNum}`;
    if (weight) pack += ` · ${weight}`;
  } else if (countNum) {
    pack = `${countNum.toLocaleString()} count`;
    if (weight) pack += ` · ${weight}`;
  } else if (row.notes) {
    pack = row.notes;
  }

  return {
    id:    row.id,
    name:  row.name,
    specs: specs.length ? specs : undefined,
    pack:  pack || undefined,
    image: resolveImage(row.image_key),
  };
}

// Vite raw import — zero runtime cost, bundled at build time
import rawCSV from "./prodrive_master_catalog.csv?raw";

const allRows = parseCSV(rawCSV);
const active  = allRows.filter((r) => r.active === "TRUE");

function bySubcat(subcategory: string) {
  return active
    .filter((r) => r.subcategory === subcategory)
    .map(toProduct);
}

function byCat(category: string) {
  return active
    .filter((r) => r.category === category)
    .map(toProduct);
}

// ─── Named exports (drop-in replacements for previous hardcoded arrays) ───────

export const STAPLES_15_5  = bySubcat("15.5 GA Hardwood");
export const STAPLES_15_Q  = bySubcat('15 GA Q-Wire 7/16" Crown');
export const STAPLES_16_N  = bySubcat('16 GA N-Wire 7/16" Crown');
export const STAPLES_18_M  = bySubcat('18 GA M-Wire 3/8" Crown');
export const STAPLES_18_L  = bySubcat('18 GA L-Wire 1/4" Crown (Duo-Fast 1800)');

export const LCLEATS_16    = bySubcat("16 GA");
export const LCLEATS_18    = bySubcat("18 GA");

export const FN15          = bySubcat("15 GA Finish Nails (Bostitch 25°)");
export const DA15          = bySubcat("15 GA DA Nails (Senco 34°)");
export const C16           = bySubcat("16 GA Finish Nails");
export const AFN           = bySubcat("16 GA AFN Nails (Paslode 20°)");
export const BRAD18        = bySubcat("18 GA Brad Nails");
export const PINS23        = bySubcat("23 GA Micro Pins");

export const DIVERGENT     = byCat("Divergent Staples");

export const MALLETS       = bySubcat("Mallets");
export const MALLET_CAPS   = bySubcat("Mallet Caps");
export const POLY_FACES    = bySubcat("Poly Striking Faces");
export const DEAD_BLOW     = bySubcat("Dead Blow Mallets");
export const SPLIT_HEAD    = bySubcat("Split Head Hammer Faces");

export const TAPPING_BLOCKS = bySubcat("Tapping Blocks");
export const NAILERS        = bySubcat("Brad Nailers");
export const HOSES          = bySubcat("Air Hoses");
export const FITTINGS       = bySubcat("Fittings & Couplers");
export const ACCESSORIES_LIST = byCat("Accessories");

// ─── Full catalog (for admin/reporting) ───────────────────────────────────────
export const ALL_PRODUCTS  = active.map(toProduct);
export const RAW_CATALOG   = active; // raw CSV rows — for InDesign data merge export
