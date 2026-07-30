# Pro-Drive Catalog Completeness Audit (read-only)

Source of truth: `src/data/prodrive_master_catalog.csv` (120 data rows). Rendering verified live at 1280px with headless Chromium (tabs clicked individually), plus static reconciliation of every route's data lookup.

## 1. Inventory

- **Total rows:** 120
- **Active (TRUE):** 118
- **Inactive (FALSE):** 2
- **Duplicate SKU IDs:** none

### Inactive SKUs (confirm each was intentional)
| ID | Name | Subcategory |
|---|---|---|
| 200L-OG | Poly Dead Blow — Orange/Green Caps (Special Order) | Mallets & Caps > Dead Blow Mallets |
| 200L-BR-BR | Poly Dead Blow — Brown/Brown Caps (Special Order) | Mallets & Caps > Dead Blow Mallets |

Only the two known photo-related deactivations. Nothing else was forgotten.

### Category > subcategory breakdown (active / total)
```text
Flooring Staples   15.5 GA Hardwood                          7 / 7
                   15 GA Q-Wire 7/16" Crown                  2 / 2
                   16 GA N-Wire 7/16" Crown                  6 / 6
                   18 GA M-Wire 3/8" Crown                   5 / 5
                   18 GA L-Wire 1/4" Crown (Duo-Fast 1800)   6 / 6
L-Cleats           16 GA                                     3 / 3
                   18 GA                                     3 / 3
Brads & Finish     15 GA Finish Nails (Bostitch 25°)         3 / 3
                   15 GA DA Nails (Senco 34°)                9 / 9
                   16 GA Finish Nails                        8 / 8
                   16 GA AFN Nails (Paslode 20°)             3 / 3
                   18 GA Brad Nails                          8 / 8
                   23 GA Micro Pins                          9 / 9
Divergent Staples  Pad Staples 2 / Hammer Tacker 1 / Stair Tread 1
Mallets & Caps     Mallets 5 / Mallet Caps 5 / Poly Striking Faces 5
                   Dead Blow Mallets                         4 / 6
                   Split Head Hammer Faces                   2 / 2
Tapping Tools      Tapping Blocks 3 / Tapping Rings 3 / Tipper-De-Tipper 1
Air Tools          Brad Nailers 2 / Air Hoses 4 / Fittings & Couplers 6
Accessories        Displays 1 / Maintenance 1
                                                     TOTAL 118 active
```

## 2. Rendered vs. data reconciliation

Live card counts below exclude the 6-card "Related Products" strip present on most pages.

| Route | Expected active | Rendered | Result |
|---|---|---|---|
| /staples 15.5 GA | 7 | 7 | PASS |
| /staples 15 GA Q-Wire | 2 | 2 | PASS |
| /staples 16 GA N-Wire | 6 | 6 | PASS |
| /staples 18 GA M-Wire | 5 | 5 | PASS |
| /staples 18 GA L-Wire | 6 | 6 | PASS |
| /l-cleats 16 GA / 18 GA | 3 / 3 | 3 / 3 | PASS |
| /brads-finish-nails (FN15 3, DA15 9, C16 8, AFN 3, Brad18 8, Pins23 9) | 40 | 40 | PASS |
| /divergent-staples | 4 | 4 | PASS |
| /mallets (Mallets 5, Caps 5, Poly 5, Dead Blow 4) | 19 | 19 | PASS |
| /split-head-hammer-faces | 2 | 2 | PASS |
| /tapping-blocks | 3 | 3 | PASS |
| /tapping-rings | 3 | 3 (hardcoded, not CSV-driven) | PASS with note |
| /tipper-de-tipper | 1 | 1 (hardcoded) | PASS with note |
| /air-tools Nailers | 2 | 2 (hardcoded) | PASS |
| /air-tools Hoses | 4 | 4 (hardcoded) | PASS |
| /air-tools Fittings | 6 | **4** (hardcoded) | **FAIL — 2 missing** |
| /accessories | 2 | 2 (bespoke feature blocks, not grid) | PASS with note |
| /products | category index only (11 tiles) | 11 | PASS |

All 12 routes returned HTTP 200, 0 broken images, 0px horizontal overflow. Only console errors were third-party Vimeo 401/403 and permissions-policy warnings from the sandbox — no app errors.

## 3. Orphan detection — the critical finding

**Active SKUs that render nowhere on the site: 2**

| ID | Name | Where it should live |
|---|---|---|
| YELLOW-CH14 | 1/4" NPT Hose Barb Fitting | /air-tools → Fittings & Couplers |
| YELLOW-FE14 | 1/4" Ferrule | /air-tools → Fittings & Couplers |

Cause: `/air-tools` renders a hardcoded local `fittings` array of 4 items instead of the CSV-driven `FITTINGS` export (the export is imported only to build the related-products exclusion list). Both SKUs have valid image keys (`airTools.fittingCh1414`, `airTools.fittingFe14`) already present in the image manifest.

**Four more active SKUs are CSV-orphaned but visually present** (no `bySubcat()` export exists, so they'd vanish from any data-driven view, but each page hand-codes them):
V-6RING-R, V-6RING-O, V-6RING-Y (Tapping Rings) and TDT-S5 (Tipper-De-Tipper). These do appear on /tapping-rings and /tipper-de-tipper today, so nothing is missing for the client — but they're not wired to the catalog, so a CSV edit will not update those pages. Same structural caveat applies to /air-tools nailers/hoses and /accessories.

**Lookups returning 0 results:** none. All 22 `bySubcat()` and 2 `byCat()` lookups resolve to at least one active SKU.

**/products category coverage:** all 11 catalog categories/families are represented (CAT-01 … CAT-11). Nothing missing.

## 4. Data quality flags (active SKUs only)

- **Missing name:** none.
- **Unresolvable image keys:** none (every populated `image_key` resolves in `src/data/images.ts`).
- **No image at all: 52 of 118 active SKUs** — cards render text-only (graceful, no broken placeholder). Concentrated in: 16 GA N-Wire (all 6), 18 GA M-Wire (all 5), 18 GA L-Wire (all 6), 16 GA Finish Nails (all 8), 15 GA DA Nails (7 of 9), 23 GA Micro Pins (all 9), 16 GA AFN (all 3), 18 GA Brad (2), Fittings (4), Pad Staples (1), MALLET-DISP.
- **Spec gaps vs. siblings in same subcategory:**
  - `length_in` missing: TB-PRO-312 (Tapping Blocks), CAP602G (Mallet Caps)
  - `finish` missing: AIR-MP20M, AIR-SW-MP20M, YELLOW-CH14, YELLOW-FE14
  - `weight_lbs` missing: DA25-250SS, DA15-BARB, DA21-200SS, C50-200SS, C64-250SS, AFN45, 200L-2000, 200L-1000, BLUE-AIR250-100
- Minor: accessories page labels the maintenance kit `ORK6-KIT-B` while the CSV ID is `ORK-6-KIT-B`.

## Verdict

118 of 118 active SKUs exist in the data with correct categorization. **2 active SKUs (YELLOW-CH14, YELLOW-FE14) do not render anywhere on the site.** Everything else on every audited route reconciles exactly.

## Recommended follow-up (not performed — audit only)

1. Add a `FITTINGS`-driven grid (or add the two missing items to the hardcoded array) on /air-tools so all 6 fittings show.
2. Optional: add `TAPPING_RINGS` / `TIPPER` exports and convert /tapping-rings, /tipper-de-tipper, /air-tools, /accessories to CSV-driven rendering so future catalog edits propagate.
3. Optional: fill the spec gaps listed above and source photos for the 52 image-less SKUs.
4. Optional: normalize `ORK6-KIT-B` label to match the CSV ID.

Say the word and I'll implement item 1 (and any others you pick).
