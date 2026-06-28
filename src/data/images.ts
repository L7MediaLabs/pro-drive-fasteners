// Centralized image references for Pro-Drive product photography.
// Catalog renders → Lovable CDN (/__l5e/assets-v1/...)
// Evie's photos  → /src/assets/products/... (committed to repo)

// ─── Catalog renders (Lovable CDN) ───────────────────────────────────────────
const u = {
  malletsP21_01: "/__l5e/assets-v1/b06ca1be-bf54-4bca-ada8-4b99a9b6fbbd/mallets_p21_img01.png",
  malletsP21_02: "/__l5e/assets-v1/ed23ab93-8b4c-488a-a6bb-669ba550736d/mallets_p21_img02.png",
  malletsP22_06: "/__l5e/assets-v1/63c5fe9a-0be0-40f7-966c-6e3a12653107/mallets_p22_img06.png",
  malletsP22_07: "/__l5e/assets-v1/d4c2fe7a-72d0-45c0-883a-99594237e60c/mallets_p22_img07.png",
  malletsP22_08: "/__l5e/assets-v1/8305d29a-888c-4592-b0eb-035024089eb3/mallets_p22_img08.png",
  malletsP22_10: "/__l5e/assets-v1/3cce7883-a434-447f-b7b0-07870edd5396/mallets_p22_img10.png",
  malletsP23_01: "/__l5e/assets-v1/d1f82b75-daa8-4d73-9b48-f233ee0649fa/mallets_p23_img01.png",
  malletsP23_02: "/__l5e/assets-v1/0fa4608c-eb86-4f37-8375-e1ae7d6f861c/mallets_p23_img02.png",
  malletsP24_02: "/__l5e/assets-v1/64bfb786-baa0-4bab-8117-b5227e689617/mallets_p24_img02.png",
  malletsP24_03: "/__l5e/assets-v1/1e44c45d-100e-4ecd-a809-d7e3e715b628/mallets_p24_img03.png",
  malletsP5_01:  "/__l5e/assets-v1/5b55110a-f753-4bf0-8892-3b4a4a8e6d49/mallets_p5_img1.png",
  malletsP5_02:  "/__l5e/assets-v1/27f4bd58-cf90-4be1-9efc-ab0770858444/mallets_p5_img2.png",
  malletsP5_03:  "/__l5e/assets-v1/c8dfb7d8-ab1e-4b76-a5a3-0911feff5d4a/mallets_p5_img3.png",
  malletsP5_05:  "/__l5e/assets-v1/4b70eeeb-5d25-44ec-b82f-176e9c18d97a/mallets_p5_img5.png",
  staplesP04_01: "/__l5e/assets-v1/16187408-4842-4708-a48c-284bbda7d928/staples_p04_img01.png",
  staplesP04_08: "/__l5e/assets-v1/b19adc4f-d5a5-4225-8fb6-98d713bc718f/staples_p04_img08.png",
  staplesP05_02: "/__l5e/assets-v1/0adda93e-360c-400d-90bc-aefd8d45e13e/staples_p05_img02.png",
  staplesP07_02: "/__l5e/assets-v1/f721a7d3-90fb-48d8-abdd-f89e4f02b10c/staples_p07_img02.png",
  staplesP08_01: "/__l5e/assets-v1/961c0a9d-29b5-4146-93a8-49e1f10e60b3/staples_p08_img01.png",
  blocksP28_03:  "/__l5e/assets-v1/45bfe327-4704-4647-bda0-0c8bed1da54c/tapping_blocks_p28_img03.png",
  blocksP28_04:  "/__l5e/assets-v1/a7c08099-7f90-4f4f-aa64-68dd8966a086/tapping_blocks_p28_img04.png",
  ringsP26_01:   "/__l5e/assets-v1/59554107-918d-4c60-9332-f0d9766792f7/tapping_rings_p26_img01.png",
  ringsP26_03:   "/__l5e/assets-v1/4b7e9edd-2b7a-47db-90fa-0afb664b85d0/tapping_rings_p26_img03.png",
  ringsP26_04:   "/__l5e/assets-v1/559f31e2-8d27-45fd-b9c7-e42c35b2d9fa/tapping_rings_p26_img04.png",
  tipperP14_01:  "/__l5e/assets-v1/faeaf729-1bc1-4c88-b0cf-0cec5b4f4d1c/tipper_p14_img1.png",
  tipperP14_02:  "/__l5e/assets-v1/e893010a-a34a-4ae8-a34b-33db986c827c/tipper_p14_img2.png",
  tipperP14_07:  "/__l5e/assets-v1/63b5437f-275e-4d74-a38b-49e0458bf8a2/tipper_p14_img7.png",
  tipperP27_01:  "/__l5e/assets-v1/3b17203c-5d3a-45d1-a8f7-9820ab822ed6/tipper_p27_img01.png",
  tipperP27_03:  "/__l5e/assets-v1/f44de8c9-1240-4178-98b6-cfb30d3e6e74/tipper_p27_img03.png",
  tipperP27_04:  "/__l5e/assets-v1/ab992fea-2af7-4301-b6c8-ac89f5db711a/tipper_p27_img04.png",
  tipperP27_05:  "/__l5e/assets-v1/5b559a39-e3d4-443d-9f05-b2b5a9e448aa/tipper_p27_img05.png",
  tipperP27_06:  "/__l5e/assets-v1/63332fe8-2720-4a4c-ab0d-a18159012e01/tipper_p27_img06.png",
} as const;

// ─── Evie's photos (repo assets) ─────────────────────────────────────────────
// Import as static assets so Vite handles hashing + CDN in production
import lcleatStripHero    from "../assets/products/lCleats/lcleat_strip_hero.jpg";
import lcleatVertical     from "../assets/products/lCleats/lcleat_vertical.jpg";
import lcleatStanding     from "../assets/products/lCleats/lcleat_standing.jpg";
import lcleatBanner       from "../assets/products/lCleats/lcleat_banner.jpg";
import lcleatLifestyle    from "../assets/products/lCleats/lcleat_lifestyle.jpg";
import lcleat16gaMaster   from "../assets/products/lCleats/lcleat_16ga_masterpack.jpg";
import lcleat16gaInner    from "../assets/products/lCleats/lcleat_16ga_innerpack.jpg";
import lcleat18gaMaster   from "../assets/products/lCleats/lcleat_18ga_masterpack.jpg";
import lcleat18gaInner    from "../assets/products/lCleats/lcleat_18ga_innerpack.jpg";
import lcleatLc175_16     from "../assets/products/lCleats/lcleat_lc175_16.jpg";
import lcleatLc200_16     from "../assets/products/lCleats/lcleat_lc200_16.jpg";

import blockTbPro         from "../assets/products/tapping_blocks/block_tbpro.jpg";
import block561           from "../assets/products/tapping_blocks/block_561.jpg";
import blockWidePlank     from "../assets/products/tapping_blocks/block_wideplank.jpg";

import ringOrange1        from "../assets/products/tapping_rings/ring_orange_1.jpg";
import ringOrange2        from "../assets/products/tapping_rings/ring_orange_2.jpg";
import ringOrange3        from "../assets/products/tapping_rings/ring_orange_3.jpg";
import ringRed            from "../assets/products/tapping_rings/ring_red.jpg";
import ringLogo           from "../assets/products/tapping_rings/ring_logo.jpg";

import airtoolBrad16      from "../assets/products/airTools/airtool_brad16.jpg";
import airtoolBrad18      from "../assets/products/airTools/airtool_brad18.jpg";
import airtoolHoseGroup   from "../assets/products/airTools/airtool_hose_group.jpg";
import airtoolHoseBlue50  from "../assets/products/airTools/airtool_hose_blue50.jpg";
import airtoolHoseBlue100 from "../assets/products/airTools/airtool_hose_blue100.jpg";
import airtoolHoseRed50   from "../assets/products/airTools/airtool_hose_red50.jpg";
import airtoolHoseYellow50 from "../assets/products/airTools/airtool_hose_yellow50.jpg";
import airtoolFittingFe14 from "../assets/products/airTools/airtool_fitting_fe14.jpg";
import airtoolFittingCh1414 from "../assets/products/airTools/airtool_fitting_ch1414.jpg";

import divergent5010      from "../assets/products/divergent/divergent_5010.jpg";
import divergent7512a     from "../assets/products/divergent/divergent_7512_a.jpg";
import divergent7512b     from "../assets/products/divergent/divergent_7512_b.jpg";
import divergent5418a     from "../assets/products/divergent/divergent_5418_a.jpg";
import divergent5418b     from "../assets/products/divergent/divergent_5418_b.jpg";

import accessoriesOrk6    from "../assets/products/accessories/accessories_ork6.jpg";

// ─── Image manifest ───────────────────────────────────────────────────────────
export const images = {
  mallets: {
    hero:        u.malletsP22_07,
    lineup:      u.malletsP21_02,
    family:      u.malletsP22_06,
    dhw:         u.malletsP22_10,
    capsLineup:  u.malletsP23_01,
    vCapBanner:  u.malletsP23_02,
    polyColors:  u.malletsP24_02,
    polyDetail:  u.malletsP24_03,
    misc1:       u.malletsP21_01,
    misc2:       u.malletsP22_08,
    galleher:    [u.malletsP5_01, u.malletsP5_02, u.malletsP5_03, u.malletsP5_05],
  },
  staples: {
    hero:           u.staplesP04_08,
    gauge155a:      u.staplesP04_01,
    gauge155b:      u.staplesP05_02,
    gauge15Banner:  u.staplesP07_02,
    gauge15Vertical: u.staplesP08_01,
  },
  lCleats: {
    hero:        lcleatStripHero,
    vertical:    lcleatVertical,
    standing:    lcleatStanding,
    banner:      lcleatBanner,
    lifestyle:   lcleatLifestyle,
    masterpack16: lcleat16gaMaster,
    innerpack16:  lcleat16gaInner,
    masterpack18: lcleat18gaMaster,
    innerpack18:  lcleat18gaInner,
    lc175_16:    lcleatLc175_16,
    lc200_16:    lcleatLc200_16,
  },
  tappingBlocks: {
    tbPro:      blockTbPro,
    tb561:      block561,
    widePlank:  blockWidePlank,
    lifestyle:  u.blocksP28_03,
  },
  tappingRings: {
    primary:    u.ringsP26_01,
    lifestyle:  u.ringsP26_03,
    detail:     u.ringsP26_04,
    orange1:    ringOrange1,
    orange2:    ringOrange2,
    orange3:    ringOrange3,
    red:        ringRed,
    logo:       ringLogo,
  },
  tipper: {
    product:    u.tipperP27_01,
    tipping:    [u.tipperP27_03, u.tipperP27_04, u.tipperP27_05],
    deTipping:  [u.tipperP27_06, u.tipperP14_01, u.tipperP14_02],
    extra:      u.tipperP14_07,
  },
  airTools: {
    brad16:      airtoolBrad16,
    brad18:      airtoolBrad18,
    hoseGroup:   airtoolHoseGroup,
    hoseBlue50:  airtoolHoseBlue50,
    hoseBlue100: airtoolHoseBlue100,
    hoseRed50:   airtoolHoseRed50,
    hoseYellow50: airtoolHoseYellow50,
    fittingFe14: airtoolFittingFe14,
    fittingCh1414: airtoolFittingCh1414,
  },
  divergentStaples: {
    staple5010:  divergent5010,
    staple7512a: divergent7512a,
    staple7512b: divergent7512b,
    staple5418a: divergent5418a,
    staple5418b: divergent5418b,
  },
  accessories: {
    ork6: accessoriesOrk6,
  },
  flag: "/__l5e/assets-v1/21fec0ab-e7e9-4f98-91cb-e05584679dc5/usa-flag-clean.png",
} as const;

export type ImageManifest = typeof images;
