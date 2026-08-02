## Goal

The three grade badges already exist in the project as high-res PNG assets — `badge-contractor-grade.png`, `badge-multi-grade.png`, and `badge-industrial-grade.png` — and all three already render in the homepage "Grade Standards" section. The two SVGs I extracted from the client PDFs last round duplicate two of them. Make the PNG set the single source of truth sitewide and remove the duplicates.

## Changes

1. **Homepage (`src/routes/index.tsx`)** — swap the Contractor and Multi imports from the SVGs to `badge-contractor-grade.png.asset.json` and `badge-multi-grade.png.asset.json`, so the section pulls all three tiers from one consistent set (Industrial already does).

2. **Flooring Staples hero (`src/routes/staples.tsx`)** — "CONTRACTOR GRADE" badge points at the Contractor PNG.

3. **Tapping Blocks hero (`src/routes/tapping-blocks.tsx`)** — same swap.

4. **Brads & Finish Nails banner (`src/routes/brads-finish-nails.tsx`)** — the "Professional grade. Contractor tested." band badge points at the Contractor PNG.

5. **L-Cleats banner (`src/routes/l-cleats.tsx`)** — the badge in the dark "Pro installers trust Pro-Drive" band points at the Contractor PNG.

6. **Delete the duplicates** — remove `src/assets/badges/grade-contractor.svg` and `src/assets/badges/grade-multigrade.svg` once nothing imports them.

No layout, sizing, or copy changes: the badge render sizes I set last round (52px in hero badge rows, 96–104px in the banners) stay exactly as they are.

## Technical notes

The PNG assets are CDN pointer files, so each call site imports the `.asset.json` and uses `.url` instead of importing the SVG module directly. `CinematicHero`'s `badges[].logo` and `LifestyleBanner`'s `badge.src` both already take a plain URL string, so no component signature changes are needed.

## Verification

`bun run build` and `bunx tsgo --noEmit` clean, then Playwright screenshots of the homepage Grade Standards section, the staples and tapping-blocks heroes, and the brads and l-cleats banners to confirm every badge renders at the right size and reads legibly against both the cream and dark backgrounds.
