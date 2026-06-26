## Reorient: Display-Only Intelligence Dashboard

Discard the in-app processing pipeline and rebuild `/admin` as a pure display layer fed by a weekly JSON paste.

### Teardown (rollback DB2/DB6/DB7)

- Drop tables: `intelligence_weeks`, `intelligence_companies`, `intelligence_uploads` (migration).
- Delete server functions / lib files created for CSV ingest, Anthropic calls, or the state machine.
- Remove `papaparse` and any Anthropic SDK from `package.json` if installed.
- No Anthropic key requested.

### Keep

- Auth system (`/auth`, `_authenticated/route.tsx`, profiles, user_roles, has_role).
- `reports` table (untouched).
- Admin shell restructure from DB4 — refit to the new sidebar spec.

### Build (per simplified v3 spec)

1. **Migration** — create `weekly_intelligence` and `admin_settings` tables, admin-only RLS via `has_role`, required GRANTs.
2. **Types** — `src/lib/intelligence-types.ts` with `WeeklyIntelligenceData` interface + Zod schema for client-side validation.
3. **Mock data** — `src/data/mockIntelligence.ts` with 7 HOT/WARM + 27 WATCHING/NEW leads, 12 products, traffic mix per spec.
4. **Server functions** — `src/lib/intelligence.functions.ts`:
   - `getLatestIntelligence` — most recent week (full row).
   - `uploadWeeklyIntelligence` — admin-only insert.
   - `listIntelligenceWeeks` — last 10 rows ordered by `week_of` desc, projecting only `id, week_of, uploaded_at, uploaded_by` (no `data` jsonb). Used by Settings upload history.
   - `getRecipients` / `saveRecipients` — admin_settings recipients editor.
5. **Admin shell** — `src/routes/_authenticated/admin/route.tsx` with sidebar (PD INTELLIGENCE, nav, week-of status footer) + top bar; child routes: `index` (redirect to dashboard), `dashboard`, `leads`, `products`, `reports`, `settings`.
6. **Dashboard page** — empty state + loaded state: Weekly Insight card, 4 KPI cards, live ticker, Hot Leads table with Signal Stack badges, urgency tags, expandable AI context, Call Now button.
7. **Leads page** — full table with search + status/signal filters + DEMO/LIVE toggle (sessionStorage).
8. **Products page** — horizontal bar chart of productStats + Company×Product matrix.
9. **Reports page** — Craig's Opening Line card (copy button), three-source summary, white email preview, Copy + mailto Send buttons.
10. **Settings page** — Weekly Upload panel (date + JSON textarea + Zod Validate + Upload), Recipients editor, **Upload History list fed by `listIntelligenceWeeks`** (week + uploader + timestamp), terminal-style workflow doc.
11. **Footer hidden dot** — single `·` link to `/admin` in Footer copyright bar.
12. **Smoke test** — paste mock JSON, verify each page renders, DEMO toggle works, upload history populates.

### Technical Notes

- All server fns use `requireSupabaseAuth`; admin check via `supabase.rpc('has_role', ...)` inside handler for write/list endpoints.
- Loaders under `_authenticated/` call protected fns; render via `useSuspenseQuery` per project pattern.
- Validate is client-side Zod against `WeeklyIntelligenceData`; surfaces field errors inline. Upload disabled until valid.
- Styling tokens per spec: `#FFCD00`, `#080806`, `#111110`, IBM Plex Mono labels, Gotham/Assistant body. Add IBM Plex Mono + Assistant via `<link>` in `__root.tsx` head if not already loaded.
- DEMO/LIVE toggle: when DEMO, hooks return `mockIntelligence` instead of querying.
- No Anthropic, no CSV, no Edge Functions, no state machine.
