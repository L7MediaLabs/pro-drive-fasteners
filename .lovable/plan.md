## Verdict: MISSING RENDER (data exists) — all four tabs

The SKUs exist and are active in `src/data/prodrive_master_catalog.csv`:

| Tab | Active SKUs in catalog | Rendered on page |
|---|---|---|
| 15 GA Q-Wire | 2 (Q21, Q25) | 0 |
| 16 GA N-Wire | 6 (MC750-N11 … MC200-N21) | 0 |
| 18 GA M-Wire | 5 (M10BAB58 … M15BAB125) | 0 |
| 18 GA L-Wire | 6 (1824-L11 … 1848-L17) | 0 |
| 15.5 GA Hardwood (working) | 7 | 7 |

The page wiring is fine: every tab passes `g.products` into the same `<ProductTierSections>` block. The four broken tabs render the "PRODUCT LINE" heading with empty space below it (confirmed by screenshot — Playwright counts 0 product cards on those tabs vs. 7 on 15.5 GA; the 6 cards it sees are the Related Products strip).

### Root cause

The hand-rolled CSV parser in `src/data/products.ts` toggles `inQuotes` on every `"` and never handles the CSV-escaped double-quote (`""`). So subcategory values that contain inch marks get their quotes stripped:

```text
CSV:    "15 GA Q-Wire 7/16"" Crown"
parsed: 15 GA Q-Wire 7/16 Crown
lookup: 15 GA Q-Wire 7/16" Crown   → 0 matches
```

`15.5 GA Hardwood` has no inch mark in its subcategory, which is exactly why it's the only staples tab that works.

Same bug silently damages product **names** sitewide: `2" (50mm) Q-Wire Staple` currently renders as `2 (50mm) Q-Wire Staple`, and `crown` reads `7/16` instead of `7/16"`.

### Fix

1. `src/data/products.ts` — correct `parseCSV` to handle RFC-4180 escaped quotes: when inside quotes and the next char is also `"`, emit one literal `"` and skip ahead, instead of toggling. Also strip surrounding quotes only at the field level.
2. Re-verify all `bySubcat(...)` / `byCat(...)` exports return their expected counts (staples, l-cleats, brads, mallets, tapping, accessories) so no group regresses from names that gain back their inch marks.
3. Screenshot all five staples tabs plus `/brads-finish-nails`, `/l-cleats`, `/mallets` to confirm SKU grids and inch marks now display correctly.

No catalog data edits are needed — the rows are all there and active.
