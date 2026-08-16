/**
 * Master English copy compiler (internal, admin-only).
 *
 * Reads the ACTUAL route/component sources at build time via Vite's raw glob
 * imports and extracts the user-visible strings, so the export always matches
 * what is published. Nothing here is hand-retyped and nothing is rewritten —
 * strings are emitted verbatim, in source (reading) order.
 */

import type { Product } from "@/components/ProductCard";
import {
  STAPLES_15_5,
  STAPLES_15_Q,
  STAPLES_16_N,
  STAPLES_18_M,
  STAPLES_18_L,
  LCLEATS_16,
  LCLEATS_18,
  FN15,
  DA15,
  C16,
  AFN,
  BRAD18,
  PINS23,
  DIVERGENT,
  MALLETS,
  MALLET_CAPS,
  POLY_FACES,
  DEAD_BLOW,
  SPLIT_HEAD,
  TAPPING_BLOCKS,
  NAILERS,
  HOSES,
  FITTINGS,
  ACCESSORIES_LIST,
} from "@/data/products";

/* ── raw sources ──────────────────────────────────────────────────────────── */

const ROUTE_SRC = import.meta.glob("/src/routes/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const COMPONENT_SRC = import.meta.glob("/src/components/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/* ── string extraction ────────────────────────────────────────────────────── */

const TEXT_KEYS =
  /^\s*(label|title|heading|subhead|sub|eyebrow|body|text|caption|desc|description|blurb|note|copy|tagline|headline|question|answer|q|a|cta|badge|kicker|name)\s*:\s*(["'])(.+?)\2\s*,?\s*$/;

const ATTR_TEXT = /(?:alt|aria-label|placeholder|title)=(?:"([^"]{2,})"|\{"([^"]{2,})"\})/g;

const SKIP_LINE =
  /(import\s|require\(|from\s+["']|className=|style=|viewBox|\bd=\{?"|fill=|stroke|transform=|queryKey|createFileRoute|useState|useEffect|console\.|\.asset\.json|href=|to=|src=|url\(|rgba?\(|var\(--|@keyframes|fontFamily|letterSpacing|textTransform|process\.env)/;

const CSS_PROP = /^\s*[A-Za-z-]+:\s*["'`]?[^"'`]*["'`]?,?\s*$/;

function isProse(s: string): boolean {
  const t = s.trim();
  if (t.length < 2) return false;
  if (!/[A-Za-z]/.test(t)) return false;
  if (/^[a-z][A-Za-z0-9]*$/.test(t)) return false; // identifier / css keyword
  if (/^[a-z-]+$/.test(t)) return false;
  if (/^#[0-9A-Fa-f]{3,8}$/.test(t)) return false;
  if (/\d(px|rem|em|vh|vw|%)\b/.test(t)) return false;
  if (/^(true|false|null|undefined)$/i.test(t)) return false;
  if (/^https?:\/\//.test(t)) return false;
  if (/^[/.@]/.test(t)) return false;
  if (/[{}<>=]/.test(t)) return false;
  if (/\b(flex|inherit|pointer|monospace|uppercase|nowrap|hidden|absolute|relative|sticky|center|contain|cover|solid|transparent|border-box|ease|linear)\b/.test(t) && t.length < 24)
    return false;
  return true;
}

export type CopyBlock = { section: string; lines: string[] };

/** Extract user-visible strings from a single source file, in source order. */
function extractFromSource(src: string): CopyBlock[] {
  const blocks: CopyBlock[] = [];
  let section = "General";
  let current: CopyBlock | null = null;

  const push = (s: string) => {
    const text = s
      .replace(/\s+/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\\"/g, '"')
      .trim();
    if (!isProse(text)) return;
    if (!current || current.section !== section) {
      current = { section, lines: [] };
      blocks.push(current);
    }
    if (!current.lines.includes(text)) current.lines.push(text);
  };

  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    // Section markers: JSX comments and banner comments
    const jsxComment = line.match(/^\{\/\*+\s*(.+?)\s*\*+\/\}$/);
    const banner = line.match(/^\/\/\s*─+\s*(.+?)\s*─+/);
    const marker = jsxComment?.[1] ?? banner?.[1];
    if (marker && /[A-Za-z]/.test(marker) && marker.length < 90) {
      section = marker.replace(/\s*[—–-]+\s*$/, "");
      continue;
    }
    if (line.startsWith("//") || line.startsWith("/*") || line.startsWith("*")) continue;

    // JSX text nodes: >text<
    for (const m of line.matchAll(/>([^<>{}]{2,})</g)) push(m[1]);

    // Trailing / leading JSX text on wrapped lines
    const openTail = line.match(/>([^<>{}]{2,})$/);
    if (openTail) push(openTail[1]);
    const closeHead = line.match(/^([^<>{}"'`]{2,})</);
    if (closeHead) push(closeHead[1]);

    // Attribute text
    for (const m of line.matchAll(ATTR_TEXT)) push(m[1] ?? m[2]);

    if (SKIP_LINE.test(line)) continue;

    // Object props with textual keys
    const kv = line.match(TEXT_KEYS);
    if (kv) {
      push(kv[3]);
      continue;
    }

    // Standalone quoted strings (array/bullet lists)
    const solo = line.match(/^(["'])(.+)\1,?$/);
    if (solo && !CSS_PROP.test(line)) {
      push(solo[2]);
      continue;
    }

    // Bare prose lines inside JSX (never style props / array items)
    if (
      !/["'`;=<>{}()[\]]/.test(line) &&
      /[A-Za-z]/.test(line) &&
      line.includes(" ") &&
      !line.endsWith(",") &&
      !/^[A-Za-z-]+:/.test(line)
    ) {
      push(line);
    }


    // {"literal"} JSX expressions
    for (const m of line.matchAll(/\{\s*(["'])(.{2,}?)\1\s*\}/g)) push(m[2]);
  }

  return blocks.filter((b) => b.lines.length > 0);
}

/* ── product blocks (names / SKUs / specs — verbatim) ─────────────────────── */

function productLines(list: Product[]): string[] {
  return list.map((p) => {
    const parts = [`${p.id} — ${p.name}`];
    if (p.specs?.length) parts.push(p.specs.join(" · "));
    if (p.pack) parts.push(p.pack);
    if (p.packTier) parts.push(p.packTier);
    if (p.badge) parts.push(p.badge);
    return parts.join("  |  ");
  });
}

type ProductGroup = { label: string; list: Product[] };

const PRODUCTS_BY_ROUTE: Record<string, ProductGroup[]> = {
  "/staples": [
    { label: "15.5 GA Hardwood", list: STAPLES_15_5 },
    { label: '15 GA Q-Wire 7/16" Crown', list: STAPLES_15_Q },
    { label: '16 GA N-Wire 7/16" Crown', list: STAPLES_16_N },
    { label: '18 GA M-Wire 3/8" Crown', list: STAPLES_18_M },
    { label: '18 GA L-Wire 1/4" Crown (Duo-Fast 1800)', list: STAPLES_18_L },
  ],
  "/l-cleats": [
    { label: "16 GA L-Cleats", list: LCLEATS_16 },
    { label: "18 GA L-Cleats", list: LCLEATS_18 },
  ],
  "/brads-finish-nails": [
    { label: "15 GA Finish Nails (Bostitch 25°)", list: FN15 },
    { label: "15 GA DA Nails (Senco 34°)", list: DA15 },
    { label: "16 GA Finish Nails", list: C16 },
    { label: "16 GA AFN Nails (Paslode 20°)", list: AFN },
    { label: "18 GA Brad Nails", list: BRAD18 },
    { label: "23 GA Micro Pins", list: PINS23 },
  ],
  "/divergent-staples": [{ label: "Divergent Staples", list: DIVERGENT }],
  "/mallets": [
    { label: "Mallets", list: MALLETS },
    { label: "Mallet Caps", list: MALLET_CAPS },
    { label: "Poly Striking Faces", list: POLY_FACES },
    { label: "Dead Blow Mallets", list: DEAD_BLOW },
  ],
  "/split-head-hammer-faces": [{ label: "Split Head Hammer Faces", list: SPLIT_HEAD }],
  "/tapping-blocks": [{ label: "Tapping Blocks", list: TAPPING_BLOCKS }],
  "/air-tools": [
    { label: "Brad Nailers", list: NAILERS },
    { label: "Air Hoses", list: HOSES },
    { label: "Fittings & Couplers", list: FITTINGS },
  ],
  "/accessories": [{ label: "Accessories", list: ACCESSORIES_LIST }],
};

/* ── page manifest (reading order) ────────────────────────────────────────── */

const GLOBAL_COMPONENTS: { file: string; label: string }[] = [
  { file: "Nav.tsx", label: "Global Navigation" },
  { file: "ProductSearch.tsx", label: "Global Product Search" },
  { file: "Footer.tsx", label: "Global Footer (legal block)" },
  { file: "ProductCard.tsx", label: "Shared Product Card" },
  { file: "editorial.tsx", label: "Shared Editorial Blocks" },
  { file: "productMedia.tsx", label: "Shared Product Media" },
  { file: "PageHeader.tsx", label: "Shared Page Header" },
  { file: "VideoCard.tsx", label: "Shared Video Card" },
  { file: "CounterMat.tsx", label: "Shared Counter Mat" },
  { file: "ImageLightbox.tsx", label: "Shared Image Lightbox" },
  { file: "AgencyCredit.tsx", label: "Shared Agency Credit" },
];

const PAGES: { file: string; route: string; name: string }[] = [
  { file: "index.tsx", route: "/", name: "Home" },
  { file: "staples.tsx", route: "/staples", name: "Flooring Staples" },
  { file: "l-cleats.tsx", route: "/l-cleats", name: "L-Cleats" },
  { file: "brads-finish-nails.tsx", route: "/brads-finish-nails", name: "Brads & Finish Nails" },
  { file: "divergent-staples.tsx", route: "/divergent-staples", name: "Divergent Staples" },
  { file: "mallets.tsx", route: "/mallets", name: "Mallets & Caps" },
  { file: "split-head-hammer-faces.tsx", route: "/split-head-hammer-faces", name: "Split Head Hammer Faces" },
  { file: "tapping-rings.tsx", route: "/tapping-rings", name: "Tapping Rings" },
  { file: "tapping-blocks.tsx", route: "/tapping-blocks", name: "Tapping Blocks" },
  { file: "tipper-de-tipper.tsx", route: "/tipper-de-tipper", name: "Tipper-De-Tipper" },
  { file: "air-tools.tsx", route: "/air-tools", name: "Air Tools & Hoses" },
  { file: "accessories.tsx", route: "/accessories", name: "Accessories" },
  { file: "products.tsx", route: "/products", name: "All Products" },
  { file: "videos.tsx", route: "/videos", name: "Videos" },
  { file: "about.tsx", route: "/about", name: "About" },
  { file: "contact.tsx", route: "/contact", name: "Contact" },
];

export type CopyPage = { name: string; route: string; blocks: CopyBlock[] };

export function buildMasterCopy(): {
  pages: CopyPage[];
  document: string;
  wordCount: number;
} {
  const pages: CopyPage[] = [];

  // Global / shared chrome first
  const globalBlocks: CopyBlock[] = [];
  for (const c of GLOBAL_COMPONENTS) {
    const src = COMPONENT_SRC[`/src/components/${c.file}`];
    if (!src) continue;
    for (const b of extractFromSource(src)) {
      globalBlocks.push({ section: `${c.label} — ${b.section}`, lines: b.lines });
    }
  }
  pages.push({ name: "Global / Shared", route: "(all pages)", blocks: globalBlocks });

  for (const p of PAGES) {
    const src = ROUTE_SRC[`/src/routes/${p.file}`];
    if (!src) continue;
    const blocks = extractFromSource(src);
    for (const g of PRODUCTS_BY_ROUTE[p.route] ?? []) {
      if (g.list.length)
        blocks.push({
          section: `Product listing — ${g.label} (SKUs & specs: DO NOT TRANSLATE)`,
          lines: productLines(g.list),
        });
    }
    pages.push({ name: p.name, route: p.route, blocks });
  }

  const out: string[] = [
    "PRO-DRIVE FASTENERS — MASTER WEBSITE COPY (ENGLISH)",
    "Compiled from live source. Strings are verbatim as published.",
    "",
    "DO NOT TRANSLATE: brand and product-line names (Pro-Drive, Pro-Driven, ONE TAP,",
    "SURE 2 LOCK, E-Z 2CAP, Tipper-De-Tipper, JAM-FREE), all SKU / part numbers,",
    "gauges, dimensions, fractions, counts, weights, patent and standard references.",
    "",
  ];

  for (const page of pages) {
    out.push("".padEnd(72, "="));
    out.push(`PAGE: ${page.name}   [${page.route}]`);
    out.push("".padEnd(72, "="));
    out.push("");
    for (const b of page.blocks) {
      out.push(`--- SECTION: ${b.section} ---`);
      for (const l of b.lines) out.push(l);
      out.push("");
    }
  }

  const document = out.join("\n");
  const wordCount = document.split(/\s+/).filter(Boolean).length;
  return { pages, document, wordCount };
}
