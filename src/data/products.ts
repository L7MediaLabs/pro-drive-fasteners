// Pro-Drive Fasteners — CSV-driven product catalog
// Single source of truth: src/data/prodrive_master_catalog.csv
// To update products: edit the CSV, commit, Lovable/Netlify rebuilds automatically.

import type { Product } from "@/components/ProductCard";
import { buildEntry, type SearchEntry } from "@/lib/search";
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

// No family/other-product fallback photography: a SKU either shows its own
// photo or the neutral in-brand placeholder. Showing another SKU's photo is
// worse than showing none (client requirement: product accuracy).


// ─── CSV loader ───────────────────────────────────────────────────────────────

function parseCSV(raw: string): Record<string, string>[] {
  const lines = raw.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    // RFC-4180: quoted fields may contain commas and escaped quotes ("")
    const values: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
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

// Pack tier ordering — used both as a label and as a sort key so matching
// count tiers group together within each product family.
// Lower rank = shown first.
function packTierFor(countNum: number | null): { label: string; rank: number } | null {
  if (!countNum) return null;
  if (countNum >= 7000) return { label: "CONTRACTOR BULK CARTONS", rank: 0 };
  if (countNum >= 4500) return { label: "JOB PACKS",               rank: 1 };
  if (countNum >= 900)  return { label: "PROJECT PACK",            rank: 2 };
  return null;
}

// ─── category → route map ────────────────────────────────────────────────────
const SUBCAT_ROUTES: Record<string, Product["href"]> = {
  "Split Head Hammer Faces": "/split-head-hammer-faces",
  "Tapping Blocks": "/tapping-blocks",
  "Tapping Rings": "/tapping-rings",
  "Tipper-De-Tipper": "/tipper-de-tipper",
};

const CAT_ROUTES: Record<string, Product["href"]> = {
  "Flooring Staples": "/staples",
  "L-Cleats": "/l-cleats",
  "Brads & Finish Nails": "/brads-finish-nails",
  "Divergent Staples": "/divergent-staples",
  "Mallets & Caps": "/mallets",
  "Tapping Tools": "/tapping-blocks",
  "Air Tools": "/air-tools",
  "Accessories": "/accessories",
};

function routeFor(row: Record<string, string>): Product["href"] {
  return SUBCAT_ROUTES[row.subcategory] ?? CAT_ROUTES[row.category] ?? "/products";
}

function toProduct(row: Record<string, string>): Product {
  const specs: string[] = [];
  if (row.gauge)   specs.push(`${row.gauge} GA`);
  if (row.crown)   specs.push(`${row.crown} Crown`);
  if (row.angle)   specs.push(`${row.angle} Angle`);
  if (row.finish)  specs.push(row.finish);
  if (row.point)   specs.push(row.point);
  // Note: compatible_tools intentionally NOT added to card specs.
  // Full interchange lists are rendered on route pages via <InterchangeList />.

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

  const tier = packTierFor(countNum);

  return {
    id:    row.id,
    name:  row.name,
    specs: specs.length ? specs : undefined,
    pack:  pack || undefined,
    packTier: tier?.label,
    packTierRank: tier?.rank,
    // Distinguishing product attribute badge (e.g. BARBED on DA15-BARB).
    // Tapping blocks are domestically manufactured — client-requested callout.
    // "Special Order Only" SKUs are flagged so distributors know they aren't stock.
    badge: row.notes && /^barbed$/i.test(row.notes.trim())
      ? "BARBED"
      : row.notes && /special order/i.test(row.notes)
        ? "SPECIAL ORDER"
        : row.subcategory?.trim() === "Tapping Blocks"
          ? "MADE IN USA"
          : undefined,


    // Only the SKU's own photo. No fallback: imageless SKUs render the
    // neutral placeholder in ProductCard.
    image: resolveImage(row.image_key),
    href: routeFor(row),

  };
}

// Group matching pack-count tiers together within each family; keep original
// CSV order for products with no tier (e.g. accessories, tools) by using a
// stable sort keyed only on packTierRank.
function sortByPackTier(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const ar = a.packTierRank ?? 99;
    const br = b.packTierRank ?? 99;
    return ar - br;
  });
}

// Vite raw import — zero runtime cost, bundled at build time
import rawCSV from "./prodrive_master_catalog.csv?raw";

const allRows = parseCSV(rawCSV);
const active  = allRows.filter((r) => r.active === "TRUE");

function bySubcat(subcategory: string) {
  return sortByPackTier(
    active.filter((r) => r.subcategory === subcategory).map(toProduct)
  );
}

function byCat(category: string) {
  return sortByPackTier(
    active.filter((r) => r.category === category).map(toProduct)
  );
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

// ─── Search index ─────────────────────────────────────────────────────────────
// Built ONLY from `active` rows, so inactive SKUs can never surface in search.
export const SEARCH_INDEX: SearchEntry[] = active.map((row) => buildEntry(row, toProduct(row)));

// ─── Related products helper ─────────────────────────────────────────────────
// Returns up to `count` products, excluding ones already shown on the page.
// Deterministic: picks the first eligible product from each *other* category
// so the strip always shows a diverse cross-section, and results are stable
// across renders (no shuffling).
export function pickRelated(excludeIds: string[], count = 4): Product[] {
  const excluded = new Set(excludeIds);
  const seenCategory = new Set<string>();
  const currentCategories = new Set(
    active.filter(r => excluded.has(r.id)).map(r => r.category)
  );
  const picks: Product[] = [];
  for (const row of active) {
    if (excluded.has(row.id)) continue;
    if (currentCategories.has(row.category)) continue;
    if (seenCategory.has(row.category)) continue;
    if (!row.image_key) continue; // only visual products in strip
    seenCategory.add(row.category);
    picks.push(toProduct(row));
    if (picks.length >= count) break;
  }
  // Fallback: fill from any remaining products if not enough categories
  if (picks.length < count) {
    for (const row of active) {
      if (excluded.has(row.id)) continue;
      if (picks.find(p => p.id === row.id)) continue;
      if (currentCategories.has(row.category)) continue;
      if (!row.image_key) continue;
      picks.push(toProduct(row));
      if (picks.length >= count) break;
    }
  }
  return picks;
}

