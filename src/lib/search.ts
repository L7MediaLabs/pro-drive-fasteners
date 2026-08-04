// Product search normalization + index construction.
//
// Two independent normalizers run on BOTH the query and every indexed value:
//   normalizeMeasure() — inch/fraction notation ("1-1/2\"" ≡ "1 1/2" ≡ "1.5in")
//   normalizePart()    — part-number punctuation ("CZ-11-34" ≡ "cz1134")
//
// QUOTE SENSITIVITY (important): values arriving here are ALREADY unescaped by
// the CSV parser in src/data/products.ts — an RFC-4180 `""` in the file becomes
// a single `"` here. A regression this morning silently zeroed out four staple
// subcategories because escaped quotes were mishandled at parse time, so the
// normalizer below must treat a literal `"` as a strippable inch mark and must
// never assume doubled quotes or re-escape anything.

import type { Product } from "@/components/ProductCard";

// Common fraction → decimal equivalents, indexed in both directions so
// "1.5" finds 1-1/2" and vice versa.
const FRACTION_DECIMALS: Record<string, string[]> = {
  "1/2": ["0.5", ".5"],
  "1/4": ["0.25", ".25"],
  "3/4": ["0.75", ".75"],
  "3/8": ["0.375", ".375"],
  "5/8": ["0.625", ".625"],
  "7/16": ["0.4375", ".4375"],
  "1/8": ["0.125", ".125"],
  "7/8": ["0.875", ".875"],
};

/** Whole+fraction decimal equivalents, e.g. "11/2" -> "1.5". */
function decimalsFor(whole: string, frac: string): string[] {
  const parts = frac.split("/");
  const value = Number(whole) + Number(parts[0]) / Number(parts[1]);
  if (!isFinite(value)) return [];
  const out = new Set<string>();
  out.add(String(value));
  out.add(value.toFixed(2).replace(/0+$/, "").replace(/\.$/, ""));
  out.add(value.toFixed(4).replace(/0+$/, "").replace(/\.$/, ""));
  return [...out];
}

/**
 * Canonicalizes measurement notation.
 * - strips the inch mark ("), the words inch/inches, and a trailing "in"
 * - collapses `-` / space / nothing between a whole number and a fraction,
 *   so 1-1/2, 1 1/2 and 11/2 all become "11/2"
 * - rewrites decimals that have a common fraction equivalent (1.5 -> 11/2)
 */
export function normalizeMeasure(input: string): string {
  let t = (input ?? "").toLowerCase();
  t = t.replace(/[""''\u2033\u2032]/g, " "); // literal inch marks / smart quotes
  t = t.replace(/\binches\b|\binch\b/g, " ");
  t = t.replace(/(\d)\s*in\b/g, "$1");
  // whole + fraction with hyphen/space between → glued canonical form
  t = t.replace(/(\d+)[\s-]+(\d+\/\d+)/g, "$1$2");
  // decimals → fraction canonical form
  t = t.replace(/(\d*)\.(\d+)/g, (m) => {
    const v = Number(m);
    if (!isFinite(v)) return m;
    const whole = Math.floor(v);
    const rem = v - whole;
    for (const [frac, decs] of Object.entries(FRACTION_DECIMALS)) {
      const [n, d] = frac.split("/").map(Number);
      if (Math.abs(rem - n / d) < 1e-6) {
        return whole > 0 ? `${whole}${frac}` : frac;
      }
    }
    return m;
  });
  return t.replace(/\s+/g, " ").trim();
}

/** Strips hyphens, spaces, punctuation and case for part-number matching. */
export function normalizePart(input: string): string {
  return (input ?? "").toLowerCase().replace(/[^a-z0-9/]/g, "");
}

export type SearchEntry = {
  product: Product;
  /** measure-normalized free-text haystack strings */
  text: string[];
  /** part-normalized haystack strings (ids, tool models, aliases) */
  parts: string[];
};

/**
 * Hidden search aliases, keyed by stored SKU id.
 * General mechanism — displayed/stored part numbers are NEVER changed.
 * FN1524-150/FN1524-15O: R22 prints the letter O in this position; we mirror
 * the client's catalog exactly and accept both spellings at match time.
 */
export const SEARCH_ALIASES: Record<string, string[]> = {
  "FN1524-150": ["FN1524-15O", "FN1524150", "FN152415O"],
};

export function buildEntry(row: Record<string, string>, product: Product): SearchEntry {
  const text = new Set<string>();
  const parts = new Set<string>();

  const addText = (v?: string) => {
    if (!v) return;
    const n = normalizeMeasure(v);
    if (n) text.add(n);
    // index decimal equivalents of any whole+fraction or bare fraction present
    for (const m of n.matchAll(/(\d*)(\d+\/\d+)/g)) {
      const whole = m[1] || "0";
      for (const d of decimalsFor(whole, m[2])) text.add(d);
    }
    for (const [frac, decs] of Object.entries(FRACTION_DECIMALS)) {
      if (n.includes(frac)) decs.forEach((d) => text.add(d));
    }
  };
  const addPart = (v?: string) => {
    if (!v) return;
    const n = normalizePart(v);
    if (n) parts.add(n);
  };

  addPart(row.id);
  addText(row.id);
  addText(row.name);
  addText(row.category);
  addText(row.subcategory);
  addText(row.finish);
  addText(row.point);
  addText(row.length_in);
  addText(row.crown ? `${row.crown} crown` : "");
  addText(row.gauge ? `${row.gauge} ga` : "");
  addText(row.notes);
  addText(row.description);
  (product.specs ?? []).forEach(addText);

  // compatible_tools: semicolon-delimited interchange list. Index each entry
  // whole plus its individual word tokens so "Paslode", "DCN660D1" and
  // "NT65M2SM" all hit.
  for (const entry of (row.compatible_tools ?? "").split(";")) {
    const e = entry.trim();
    if (!e) continue;
    addText(e);
    addPart(e);
    for (const word of e.split(/[\s/]+/)) {
      if (!word) continue;
      addText(word);
      addPart(word);
    }
  }

  for (const alias of SEARCH_ALIASES[row.id] ?? []) {
    addText(alias);
    addPart(alias);
  }

  return { product, text: [...text], parts: [...parts] };
}

/** Lower score = better match. Returns null for no match. */
export function scoreEntry(entry: SearchEntry, rawQuery: string): number | null {
  const qText = normalizeMeasure(rawQuery);
  const qPart = normalizePart(rawQuery);
  if (!qText && !qPart) return null;

  const id = normalizePart(entry.product.id);
  if (qPart && id === qPart) return 0;
  if (qPart && id.startsWith(qPart)) return 1;
  if (qPart && entry.parts.some((p) => p === qPart)) return 2;
  if (qText && normalizeMeasure(entry.product.name).startsWith(qText)) return 3;
  if (qPart && id.includes(qPart)) return 4;
  if (qText && normalizeMeasure(entry.product.name).includes(qText)) return 5;
  if (qPart && entry.parts.some((p) => p.startsWith(qPart))) return 6;
  if (qText && entry.text.some((t) => t.includes(qText))) return 7;
  if (qPart && qPart.length >= 4 && entry.parts.some((p) => p.includes(qPart))) return 8;
  return null;
}
