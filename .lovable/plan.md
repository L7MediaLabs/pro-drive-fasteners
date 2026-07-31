## Findings needing a decision (no code changed yet)

Three issues surfaced during the audit. I'd fold these into your next batch if you agree.

### 1. Tapping block photo pair looks swapped the wrong way
`images.ts` intentionally cross-maps `tbPro` → `block_561.jpg` and `tb561` → `block_tbpro.jpg`. Result: the **TB-PRO-312 "ONE TAP™"** card shows a block labeled **561 TAPPING BLOCK**, while **561-TB** shows the block whose hang-card reads **E-Z CONNECT TAPPING BLOCK**. Proposed fix: remove the cross-map so each key uses its like-named file.

Assumption to confirm: the label printed on the product in the photo is the source of truth (561 art = 561-TB).

### 2. 392-TB photo is a bare shot with no MADE IN USA
Current `block_wideplank.jpg` is an unpackaged product shot and shows no MADE IN USA marking on the handle. If the client wants retail packaging and/or the USA marking visible, a new photo is needed — I can't fix that in code.

### 3. FS-175-5000 box art is correct but unreadable on the card
The new asset reads FS-175-5000 / QTY 5,000 correctly, but renders at ~213 px on `/staples`, so the item number can't be read. Optional: make product card images click-to-enlarge (lightbox) so box art is verifiable on the live site.

### Confirmed-good, no action
- FS-175-5000 asset and CSV mapping.
- Tipper-De-Tipper hero (`tipper_p27_img01.png`) — same machine generation as the six new step photos.
- `/mallets` "Replace caps in 30 seconds." banner image loads (cap + hammer shot); flag only if the client wants the retention ring visible.

### Technical notes
Files involved: `src/data/images.ts` (tappingBlocks map, unused `s155_175in_box_old` import can be dropped), `src/data/prodrive_master_catalog.csv` (no change needed), `src/components/ProductCard.tsx` (only if we add the lightbox).
