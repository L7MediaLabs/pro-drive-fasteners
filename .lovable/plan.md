## Fix the Tapping Rings page imagery

The cards on `/tapping-rings` currently show the yellow tapping *block* image for all three rings. Swap in the actual ring photos the client just provided.

### Asset uploads (Lovable CDN)

Create asset pointers from `/mnt/user-uploads/` for:

1. `Red_tapping_ring.jpg` → Red ring (front-on)
2. `Orange_Tapping_Ring_1.jpg` → Orange ring (front-on, clean)
3. `Orange_Tapping_Ring_2.jpg` → Orange ring (front-on, with branding visible) — use as the hero/lifestyle background
4. `Orange_Tapping_Ring_3.jpg` → Orange ring (side/3D angle)
5. `LOGO_picture.jpg` → Yellow ring (front-on)

Pointers saved to `src/assets/products/tapping_rings/ring-{red|orange|orange-angle|yellow|orange-detail}.jpg.asset.json`.

### `src/data/images.ts`

Extend the `tappingRings` block with per-color URLs:

```ts
tappingRings: {
  primary: ...,           // keep existing for any other refs
  lifestyle: orangeRing2, // swap hero bg to the new orange detail shot
  red: redRing,
  orange: orangeRing1,
  orangeAngle: orangeRing3,
  yellow: yellowRing,
}
```

### `src/routes/tapping-rings.tsx`

- Add an `image` field on each ring in the `rings` array pointing to the matching photo.
- Replace the `<img src={images.tappingRings.primary} ...>` in the card with `r.image`.
- Remove the `mixBlendMode: "screen"` (it tints the white background) and the dark inner panel; use a white card image area so the rings read true to color.
- Update the hero background `<img>` to the new orange ring 2 (or keep lifestyle key now pointing to it).
- Tighten the card image height to ~220px and use `objectFit: contain` with `padding: 24px` on a white background for a clean product-shot look.

### Result

Each ring card displays its actual product photo (red ring, orange ring, yellow ring), matching the color dot beneath. Hero retains a Pro-Drive-branded ring photo as the atmospheric backdrop.