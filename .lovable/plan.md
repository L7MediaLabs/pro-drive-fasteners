# Elevate Product Pages to L-Cleats Editorial Standard

This is a large multi-page restructure. To keep quality high and let you course-correct after each batch, I'll ship it in **4 sequential batches**, each fully working and reviewable before the next.

Before starting, I'll read `src/routes/l-cleats.tsx` end-to-end and extract the reusable pattern into shared primitives so every page benefits from one source of truth (and future edits touch one file, not ten).

---

## Step 0 — Shared primitives (one commit, prerequisite for all batches)

New file `src/components/editorial.tsx` exporting:

- `<CinematicHero>` — full-bleed dark section, background image at opacity 0.22–0.28, gradient overlay, display headline, kicker, description, badge pills row.
- `<BadgePill>` — yellow-bordered pill used inside hero.
- `<TabNav>` / `<TabPanel>` — accessible tab primitive matching the L-Cleats gauge tab styling (yellow underline active state, keyboard nav).
- `<SplitLayout>` — 2-col grid: gallery column (masterpack hero + 2-up detail grid) + content column (spec cards + ProductGrid).
- `<SpecCardGrid>` — 2×2 / 4-col responsive grid of `<SpecCard label value />` with yellow top border.
- `<LifestyleBanner>` — 360px full-bleed image section, gradient overlay, headline + body + CTA button.
- `<TechReference>` — wrapper for depth guides / charts / matrices with the L-Cleats card treatment (yellow top border, monospace measurements).
- `<RelatedProducts>` — horizontal scroller taking `Product[]`, used in every page footer.
- `<PageDisclaimers>` — collapsible `<details>` footer bundling Prop 65 + E-G galvanized + third-party trademark disclaimers. Props toggle which disclaimers appear.

All primitives use existing tokens (`--pd-yellow`, `--pd-dark`, `--pd-light-bg`) and existing font hierarchy. No new colors, no new fonts.

I'll also add a small helper `pickRelated(currentCategory)` in `src/data/products.ts` that returns 4 products from other categories for the Related Products scroller.

---

## Batch 1 — Highest impact, fastener core

1. **`/staples`** — full rebuild per spec: cinematic hero, 5 gauge tabs, split layouts per tab, mid-page lifestyle banner, and the **Staple Subfloor Depth Chart** (3-column reference cards: 2", 1-3/4", 1-1/2" with all crown/penetration/tongue rows from R22 pg. 5, monospace).
2. **`/brads-finish-nails`** — cinematic hero, visual 2×3 nail-family selector grid (angled-line SVG per angle) that scrolls to each section, keep existing tool quick-nav, mid-page lifestyle banner, and the **18 GA Brad Size Comparison Chart** (horizontal proportional bars AX08→AX22, .0468" shank noted).
3. **`/mallets`** — cinematic hero, 4 tabs (Mallets / Caps / Poly Faces / Dead Blow), lifestyle banner between Caps and Poly Faces, **Mallet Comparison Chart** (5 models with weight scale bars), and elevated **Hardness Scale** infographic (5 gradient bars Soft→Tough with application copy).

Deliverable: three pages live, review-ready.

## Batch 2 — Ancillary product pages

4. **`/tapping-blocks`** — cinematic hero, 3 dedicated split-layout sections (TB-PRO-312, 561-TB, 392-TB), 3-column comparison grid.
5. **`/air-tools`** — cinematic hero, 3 tabs (Brad Nailers / Air Hoses / Fittings), full spec tables for BRAD18/BRAD16, hose feature comparison, 4-item fittings grid.
6. **`/divergent-staples`** — cinematic hero, grouped sections (Pad Staples / Hammer Tacker / Stair Tread) with compatible tools and application notes.

## Batch 3 — Refinements + smaller pages

7. **`/tapping-rings`** — keep existing structure, add **Application Matrix** (5×3 star grid: Parquet/Vinyl/Laminate/Engineered/Wide Plank × Red/Orange/Yellow) styled with ring colors.
8. **`/split-head-hammer-faces`** — cinematic hero (simpler, single-product), feature/spec block, CTA.
9. **`/tipper-de-tipper`** — cinematic hero, feature block, embed the demo video using the existing `videos.tipper` Google Drive IDs already in `src/data/images.ts`.
10. **`/accessories`** — cinematic hero, feature block, CTA.

## Batch 4 — Global polish

11. Add `<RelatedProducts>` scroller to every product page footer.
12. Add `<PageDisclaimers>` (Prop 65 + E-G galvanized + trademark) to every product page footer, replacing scattered `FastenerDisclaimer` usage where appropriate (component still exists for backward compat).
13. Normalize every CTA to "Request Distributor Pricing" → `/contact`. Grep for any lingering price text or generic "Get Pricing" and swap.
14. Final pass: run `bun run build`, click through each page in Playwright at 1280×1800, capture screenshots for you to review.

---

## Technical notes

- **No new dependencies.** Charts and matrices are hand-built with CSS grid + inline SVG. framer-motion is already in the project if we want subtle entrance animation on the hero — I'll use it sparingly, one animation per hero.
- **Data source unchanged.** All product data continues to flow through `src/data/prodrive_master_catalog.csv` → `src/data/products.ts`. New reference charts (depth chart, size chart, comparison, matrix) are static content co-located in the route file since they're page-specific editorial, not catalog data.
- **Images.** Uses whatever is currently in `src/data/images.ts`. Where a hero background image is missing for a category (likely `/air-tools`, `/divergent-staples`, `/tapping-blocks`), I'll use an existing category photo rather than generating new imagery; flag the gap in that batch's summary so you can decide whether to commission photography.
- **SEO.** Each rebuilt page keeps its `head()` metadata; where a route currently lacks unique `og:title`/`og:description` I'll add them.
- **Accessibility.** Tabs use `role="tablist"`, arrow-key navigation, and `aria-controls`. Charts have `<caption>` or `aria-label` describing the data.

## Assumptions I'm making (correct me if wrong)

1. Depth-chart numbers you provided for the staples reference are authoritative; I'll transcribe them exactly as given.
2. "Related Products" pulls from `ALL_PRODUCTS`, excluding the current page's category, shuffled deterministically by SKU so it's stable across renders.
3. The nail-family visual selector uses inline SVG angled lines (not photos of tools) since we don't have per-angle tool photography.
4. For Tipper video embed, I'll use `videos.tipper.commercial` as the primary; swap if you prefer `operation_guide`.

## What you'll see between batches

After each batch I'll post a short summary listing pages shipped, screenshots, and any gaps (missing photography, etc.) so you can redirect the next batch if needed.

Ready to start with **Step 0 (shared primitives) + Batch 1 (`/staples`, `/brads-finish-nails`, `/mallets`)** on approval.
