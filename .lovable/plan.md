## Imagery overhaul — working plan

We'll walk the product catalog section by section. For each one I'll: (1) audit what's currently mapped on the page, (2) take the new photos you send, (3) upload them to the Lovable CDN, (4) remap `src/data/images.ts` and the route file so the right photo lands in the right slot, (5) remove/retire any old renders that were mis-mapped.

### Order of sections
1. **Staples & L-Cleats** (starting now)
2. Mallets
3. Tapping Blocks
4. Tapping Rings (already partially done — will verify)
5. Tipper / De-Tipper
6. Air Tools (brads, hoses, fittings)
7. Divergent Staples
8. Accessories (ORK-6, etc.)

### Section 1 — Staples & L-Cleats

Pages in scope: `src/routes/staples.tsx`, `src/routes/l-cleats.tsx`, plus any card thumbnails on `src/routes/products.tsx` and the home page that pull from `images.staples.*` / `images.lCleats.*`.

Steps once you send the photos:
- Confirm each photo's intended slot (hero, product card, packaging shot, gallery, lifestyle background, etc.).
- Upload each to the CDN via `lovable-assets create` under `src/assets/products/staples/` or `src/assets/products/lCleats/`.
- Update `src/data/images.ts` — replace the mis-mapped catalog renders in the `staples` / `lCleats` blocks with the new pointers, keep only the renders that are still accurate.
- Update the route files so each `<img>` uses the correct key, and fix any card that's currently showing the wrong product.
- Verify visually in the preview before moving to the next section.

### What I need from you next
Drop the Staples & L-Cleats photos into the chat. For each one (or as a batch), tell me:
- Which product it is (e.g. "15ga staple", "16ga L-cleat 1-3/4", packaging, lifestyle, etc.).
- Whether it's meant as the hero, a card thumbnail, packaging detail, or gallery.

If you'd rather just dump the photos and let me guess placement from filenames + the current page, that works too — I'll propose a mapping before committing.

### Catalog content pass (after imagery)
Once the images are locked, we do a full text/spec pass against the master catalog to catch missing copy, and I'll flag every chart/diagram/visual the pages are still missing so you can queue them up for creation.
