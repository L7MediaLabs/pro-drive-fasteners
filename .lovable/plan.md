# Verification Report — 100-V-CAP colour, Pro-Angle attribution, catalog counts

No code or data changes were made, and none are needed for item 1.

## 1. 100-V-CAP colour — no contradiction found

Nothing on the site describes `100-V-CAP` as gray/grey or any colour other than white.

- CSV row: `name` = `White V-Cap for 24oz Mallet 2"`, `notes` = `Pro-Angle™ Design; For engineered flooring`, `length_in` = `2"`, `image_key` = `mallets.caps.vcap100`
- Rendered card: SKU label `100-V-CAP`, title "White V-Cap for 24oz Mallet 2"", alt text `White V-Cap for 24oz Mallet 2"` — photo is an off-white/cream cap
- Image filename: `cap_100vcap.png` (no colour word)
- The only "Gray" strings in the app are the legitimate `CAP602G` row ("Gray Mallet Cap 2-1/2"") and the `/mallets` copy line "Non-marring, premium rubber available in White, Gray, Black, or White Pro-Angle™" — a general colour-range statement, not tied to `100-V-CAP`. `CAP602G` untouched.
- No structured data, meta, or sitemap copy references V-Cap colour.

Nothing changed.

## 2. Flag — duplicate Pro-Angle™ attribution (reported only, unchanged)

| Field | `100-V-CAP` | `CAP600PA` |
|---|---|---|
| name | White V-Cap for 24oz Mallet 2" | Pro-Angle™ Mallet Cap — White 2-1/2" |
| notes | Pro-Angle™ Design; For engineered flooring | Pro-Angle design; Improved edge clearance; faster installation; Patented E-Z 2CAP design |
| length_in | 2" | 2-1/2" |
| image_key | mallets.caps.vcap100 | mallets.caps.cap600pa |

Rendering (`/mallets` → Mallet Caps tab): both appear as cards in the same grid — `100-V-CAP` in row 1 (with `CAP601B`, `CAP602G`), `CAP600PA` in row 2 (with `CAP600W`). Both show the Pro-Angle wording in their spec/notes line, so the page currently reads as if there are two Pro-Angle caps.

Photos are clearly **two different physical products**:
- `100-V-CAP` — a short, straight-sided cylindrical cap with a flat top and a centre bore; no visible steel retention ring.
- `CAP600PA` — a taller cap with an obvious **angled/canted top face** and a chrome retention ring at the base. This is the one whose geometry visually matches the Pro-Angle™ ("improved edge clearance") description.

Page copy attribution: `src/routes/mallets.tsx` line 272 states "**Pro-Angle™ cap:** Designed for engineered flooring with improved edge-clearance contact for faster installation." — generic, not bound to either part number. Line 136 lists "White Pro-Angle™" as a rubber colour/style option, also unattributed.

Assessment to take to the client: the angled geometry in the `CAP600PA` photo supports Pro-Angle™ belonging to `CAP600PA`, which would make the Pro-Angle wording in `100-V-CAP`'s notes the stray one. Not changed pending client confirmation.

## 3. Counts and dead blow confirmation

- Active SKU count: **120** (matches expected).
- `200L-OG` and `200L-BR-BR` both render on the Dead Blow tab with their own distinct new-handle photos (orange/green and brown/brown respectively), the "(Special Order)" name suffix, the black/yellow **SPECIAL ORDER** badge, and "Special Order Only" text. No other product's photo changed.

## Pending decision (no work queued)

Once the client confirms which cap owns Pro-Angle™, the follow-up edit is a one-line `notes` change in `src/data/prodrive_master_catalog.csv` for the losing SKU.
