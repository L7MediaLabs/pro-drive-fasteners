# Optional follow-up: restore ® in the legal disclaimer

Verification found the trademark strip correctly scoped, with one judgment call worth a decision. Nothing is broken and no third-party mark was touched.

## The one open item

The symbol removal also stripped ® from two Footer lines that are legal notices rather than running product copy:

- Disclaimer: "This product is made and sold by Pro-Drive Fasteners and has no relationship with any of the other companies whose trademarks or item numbers are mentioned"
- Copyright: "© 2026 Pro-Drive Fasteners. All rights reserved."

Carlton's instruction was about product/brand names in copy. A disclaimer and a copyright line are formal statements, and Pro-Drive asserting a mark it does not hold in a legal sentence is the riskier direction — so the safer reading is to leave both without ®, exactly as they are now, unless Carlton says otherwise.

## Proposed change (only if approved)

Restore ® on "Pro-Drive Fasteners" in those two Footer lines only, leaving every other stripped instance alone. Also add the missing period at the end of the disclaimer sentence.

If you prefer to leave the footer as-is, skip this plan — the tree is already in a clean, self-consistent state.

## Technical notes

- File: `src/components/Footer.tsx` (disclaimer near line 105, copyright near line 116).
- The global `useShrinkRegistered()` DOM walker already renders any ® as a small superscript, so restored symbols would match the styling used on third-party marks.
- No other file, asset, or CSV row changes.
