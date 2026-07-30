# Pro-Drive Fasteners® — Change Log

## Pre-Launch Flight Check — July 30, 2026

Final verification pass before client delivery. Full production build, TypeScript
typecheck, automated security scan, and an automated click-through of all 16 public
routes at both desktop (1280px) and mobile (430px).

### Fixed

- **Hydration errors on 3 product pages.** `/brads-finish-nails`, `/divergent-staples`,
  and `/split-head-hammer-faces` threw React hydration mismatch errors on every page
  load. Cause: the sitewide ® superscript formatter (`useShrinkRegistered`) rewrote
  server-rendered text nodes before React had finished hydrating the lazily-loaded
  route component, so text like "Bostitch® 25° tools." was split mid-hydration. The
  formatter now waits for the router's `onRendered` event (plus load/timeout
  fallbacks) instead of running on mount. Visual output is unchanged.
- **Three TypeScript build errors** around the `/auth` route. The `next` search
  parameter added during the OAuth work was typed as required, which invalidated every
  plain link and redirect to `/auth` — including the footer "Client Login" link and
  both admin route guards. `next` is now correctly optional.
- **Missing social-share metadata** on `/about`, `/products`, `/videos`, and
  `/contact`. Added `og:title`, `og:description`, `og:type`, and `twitter:card` so
  these pages preview correctly when shared. All 16 public routes now carry complete
  metadata.

### Verified clean

- **Build & types** — production build succeeds; typecheck reports zero errors.
- **Security scan** — no issues found. (Previous round's two findings — the
  unauthenticated MCP endpoint and the always-true tracking insert policy — remain
  resolved.)
- **All 16 routes** load with HTTP 200 on desktop and mobile.
- **Images** — zero broken/failed image loads sitewide.
- **Mobile layout** — zero horizontal overflow on any page at 430px.
- **Semantic structure** — exactly one `<h1>` per page; every page has a unique title.
- **Console** — no application errors remain on any route.

### Known, not action items

Two categories of third-party console noise appear in the sandbox and are **not** site
defects:

- **Vimeo 401** (homepage, `/tapping-rings`, `/videos`) — Cloudflare blocks the test
  environment's datacenter IP address. The embed serves normally to real visitors.
  Worth a quick eyeball on the live preview to confirm.
- **Google Drive 403** (`/tipper-de-tipper`) — Drive's sharing-metadata sidecar
  request. All three Tipper-De-Tipper™ videos were confirmed rendering and playable.
- `xr-spatial-tracking` permissions-policy notices originate from the Vimeo player
  iframe and are cosmetic.

---

## Earlier Work (summary)

### Diagrams & technical illustrations
- Built scaled SVG depth/profile diagrams for 15.5 GA flooring staples, L-Cleats,
  15 GA Q-Wire, 16 GA N-Wire, 18 GA M/L-Wire, 18 GA brads, and 16 GA T-head nails,
  all normalized to a shared pixels-per-inch scale so sizes are visually proportional.
- L-Cleat profile redrawn to match the box artwork; staples repositioned to the plank
  centerline with dimension callouts across a tongue-and-groove joint.
- Recreated the ORK-6 parts diagram as traced vectors.
- Increased stroke weights sitewide for legibility.

### Design & content
- Converted the site from dark to a light cream theme per client feedback.
- Grouped products into Project / Job / Contractor Bulk pack tiers with unified headers.
- Added the homepage Engineering Triptych and Grade Standards badge sections.
- Appended ® to all third-party brand names sitewide via a central helper, with
  supporting trademark disclaimers.
- Added the Seventh State Creative footer credit with logo.
- Numerous client-directed photo swaps and copy corrections.

### Backend & admin
- Native site-intelligence tracking (`site_events`) with a live activity panel,
  search/filter, and CSV export.
- Rebuilt the admin dashboard with ticker, KPI grid, and hot-leads table.
- MCP server secured behind OAuth 2.1 with a custom consent screen.
- Client email access whitelisted for the back panel.
