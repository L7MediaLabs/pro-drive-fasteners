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
  staplesP08_01: "/__l5e/assets-v1/3fcfa264-9500-4d12-ba7b-f69f06293313/lcleats_175_16ga_box.png",
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
  tdtTip1:       "/__l5e/assets-v1/56499957-8e22-4d0e-a20a-9680c27a657c/tdt_tip1.png",
  tdtTip2:       "/__l5e/assets-v1/b3aab7c3-66df-4500-9877-4dcf144995c2/tdt_tip2.png",
  tdtTip3:       "/__l5e/assets-v1/e007e127-d77f-4b29-acf9-e13e0a3c4d03/tdt_tip3.png",
  tdtDetip1:     "/__l5e/assets-v1/5a80d76b-59c4-4c69-8d2b-170038e256d8/tdt_detip1.png",
  tdtDetip2:     "/__l5e/assets-v1/73bf56e2-f11f-4fc1-b50d-a7babb922acb/tdt_detip2.png",
  tdtDetip3:     "/__l5e/assets-v1/bc474793-e942-49ce-b630-8c52aef4bc32/tdt_detip3.png",
} as const;

// ─── Evie's photos (repo assets) ─────────────────────────────────────────────
// Import as static assets so Vite handles hashing + CDN in production
import lcleatStripHero    from "../assets/products/lCleats/lcleat_strip_hero.jpg";
import malletM1w          from "../assets/products/mallets/mallet_m1w.png.asset.json";
import malletM5w          from "../assets/products/mallets/mallet_m5w.png.asset.json";
import malletR5w          from "../assets/products/mallets/mallet_r5w.png.asset.json";
import malletDhw          from "../assets/products/mallets/mallet_dhw.png.asset.json";
import malletVcap         from "../assets/products/mallets/mallet_vcap.png.asset.json";
import malletCapsDisplay  from "../assets/products/mallets/mallet_caps_display.png.asset.json";
import capCap600W         from "../assets/products/mallets/cap600w.png.asset.json";
import capCap601B         from "../assets/products/mallets/cap601b.png.asset.json";
import capCap602G         from "../assets/products/mallets/cap602g.png.asset.json";
import cap100Vcap         from "../assets/products/mallets/cap_100vcap.png.asset.json";
import capCap600PA        from "../assets/products/mallets/cap600pa.png.asset.json";
import polyfaceSoft       from "../assets/products/mallets/polyface_soft.png.asset.json";
import polyfaceSoftMedium from "../assets/products/mallets/polyface_soft_medium.png.asset.json";
import polyfaceMedium     from "../assets/products/mallets/polyface_medium.png.asset.json";
import polyfaceHard       from "../assets/products/mallets/polyface_hard.png.asset.json";
import polyfaceTough      from "../assets/products/mallets/polyface_tough.png.asset.json";
// Generic poly dead blow render — fallback for variants without a dedicated photo
import polyDeadblow       from "../assets/products/mallets/poly_deadblow.png.asset.json";
import deadblowOrangeBlack from "../assets/products/mallets/deadblow_200l_o_bl.jpg.asset.json";
import deadblowOrangeBrown from "../assets/products/mallets/deadblow_200l_obr.jpg.asset.json";
import deadblow200l2000   from "../assets/products/mallets/deadblow_200l_2000_photo.jpg.asset.json";
import deadblow200l1000   from "../assets/products/mallets/deadblow_200l_1000_photo.jpg.asset.json";
import malletHeritageLath from "../assets/products/mallets/mallet_heritage_lath.jpg.asset.json";
import malletCapsOpenBox  from "../assets/products/mallets/mallet_caps_display_openbox.jpg.asset.json";
import splitheadHero      from "../assets/products/splithead/splithead_hero.png.asset.json";
import splithead23004     from "../assets/products/splithead/splithead_23004_200_face.jpg.asset.json";
import splithead23002     from "../assets/products/splithead/splithead_23002_150_face.jpg.asset.json";
import s155Masterpack     from "../assets/products/staples/staples_155_masterpack.png.asset.json";
import s155_1_5in         from "../assets/products/staples/staples_155_1_5in.png.asset.json";
import s155_2in_1000      from "../assets/products/staples/staples_155_2in_1000.png.asset.json";
import s155_2in_5000      from "../assets/products/staples/staples_155_2in_5000.png.asset.json";
import s155_2in_7720      from "../assets/products/staples/staples_155_2in_7720.png.asset.json";
import s155_175in_box     from "../assets/products/staples/staples_155_175in_box_v2.png.asset.json";

import fn1532_200         from "../assets/products/finishNails/fn1532_200.png.asset.json";
import fn1520_125         from "../assets/products/finishNails/fn1520_125.png.asset.json";
import fn1524_150         from "../assets/products/finishNails/fn1524_150.png.asset.json";
import da21_200           from "../assets/products/finishNails/da21_200.png.asset.json";
import finishNailsStrip   from "../assets/products/finishNails/finish_nails_strip.png.asset.json";
import finishNailsStripHD from "../assets/products/finishNails/finish_nails_strip_hd.png";
import brad18_500         from "../assets/products/brads/axx08eaa-500.png.asset.json";
import brad18_625         from "../assets/products/brads/axx10eaa-625.png.asset.json";
import brad18_100         from "../assets/products/brads/axx13eaa-100.png.asset.json";
import brad18_125         from "../assets/products/brads/axx15eaa-125.png.asset.json";
import brad18_150         from "../assets/products/brads/axx17eaa-150.png.asset.json";
import brad18_200         from "../assets/products/brads/axx21eaa-200.png.asset.json";
import c50200Box          from "../assets/products/brads/c50_200_box.png.asset.json";
import famFn15_25         from "../assets/products/finishNails/families/fn15_25.png.asset.json";
import famDa15_34         from "../assets/products/finishNails/families/da15_34.png.asset.json";
import famC16Straight     from "../assets/products/finishNails/families/c16_straight.png.asset.json";
import famAfn16_20        from "../assets/products/finishNails/families/afn16_20.png.asset.json";
import famBrad18Straight  from "../assets/products/finishNails/families/brad18_straight.png.asset.json";
import famPin23Micro      from "../assets/products/finishNails/families/pin23_micro.png.asset.json";
import lcleatVertical     from "../assets/products/lCleats/lcleat_vertical.jpg";
import lcleatStanding     from "../assets/products/lCleats/lcleat_standing.jpg";
import lcleatBanner       from "../assets/products/lCleats/lcleat_banner.jpg";
import lcleatLifestyle    from "../assets/products/lCleats/lcleat_lifestyle.jpg";
import lcleat16gaMaster   from "../assets/products/lCleats/lcleat_16ga_masterpack.jpg";
import lcleat16gaInner    from "../assets/products/lCleats/lcleat_16ga_innerpack.jpg";
import lcleat18gaMaster   from "../assets/products/lCleats/lcleat_18ga_masterpack.jpg";
import lcleat18gaInner    from "../assets/products/lCleats/lcleat_18ga_innerpack.jpg";
import lcleatLc175_16     from "../assets/products/lCleats/lcleat_lc175_16.jpg";
import lcleatLc200_16     from "../assets/products/lcleats/lc-200-16-masterpack.png.asset.json";

import blockOneTap        from "../assets/tapping_block_onetap.png.asset.json";
import block561           from "../assets/products/tapping_blocks/block_561.jpg";
import blockWidePlank     from "../assets/wide_plank_driving_tool.png.asset.json";

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
    lineup:      malletCapsOpenBox.url,
    family:      u.malletsP22_06,
    m1w:         malletM1w.url,
    m5w:         malletM5w.url,
    r5w:         malletR5w.url,
    dhw:         malletDhw.url,
    vCap:        malletVcap.url,
    capsLineup:  malletCapsOpenBox.url,
    capsDisplayRender: malletCapsDisplay.url,
    vCapBanner:  malletVcap.url,
    polyColors:  u.malletsP24_02,
    polyDetail:  u.malletsP24_03,
    heritageLath: malletHeritageLath.url,
    misc1:       u.malletsP21_01,
    misc2:       u.malletsP22_08,
    galleher:    [u.malletsP5_01, u.malletsP5_02, u.malletsP5_03, u.malletsP5_05],
    caps: {
      cap600w:  capCap600W.url,
      cap601b:  capCap601B.url,
      cap602g:  capCap602G.url,
      vcap100:  cap100Vcap.url,
      cap600pa: capCap600PA.url,
    },
    poly: {
      soft:       polyfaceSoft.url,
      softMedium: polyfaceSoftMedium.url,
      medium:     polyfaceMedium.url,
      hard:       polyfaceHard.url,
      tough:      polyfaceTough.url,
    },
    // Fallback render — still used by 200L-OG and 200L-BR-BR (special order,
    // no dedicated product photo yet).
    deadBlow: polyDeadblow.url,
    deadBlowOrangeBlack: deadblowOrangeBlack.url,
    deadBlowOrangeBrown: deadblowOrangeBrown.url,
    deadBlowInsert: deadblow200l2000.url,
    deadBlowShot:   deadblow200l1000.url,
    splitHead: {
      hero:     splitheadHero.url,
      face200:  splithead23004.url,
      face150:  splithead23002.url,
    },
  },
  staples: {
    hero:           s155Masterpack.url,
    s155_masterpack: s155Masterpack.url,
    s155_1_5in:     s155_1_5in.url,
    s155_2in_1000:  s155_2in_1000.url,
    s155_2in_5000:  s155_2in_5000.url,
    s155_2in_7720:  s155_2in_7720.url,
    s155_175in_box: s155_175in_box.url,
    s155_175in_9000: s155_175in_9000.url,
    gauge155a:      s155_2in_5000.url,
    gauge155b:      s155_1_5in.url,
    gauge15Banner:  u.staplesP07_02,
    gauge15Vertical: u.staplesP08_01,
    q15BulkPack:    u.staplesP05_02,
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
    lc200_16:    lcleatLc200_16.url,
  },
  tappingBlocks: {
    // Each product uses the photo whose printed product label matches it:
    // tapping_block_onetap.png = ONE TAP heavy-duty block w/ wood handle (TB-PRO-312),
    // block_561.jpg   = "561 TAPPING BLOCK" labeled block (561-TB).
    tbPro:      blockOneTap.url,
    tb561:      block561,
    widePlank:  blockWidePlank.url,

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
    tipping:    [u.tdtTip1, u.tdtTip2, u.tdtTip3],
    deTipping:  [u.tdtDetip1, u.tdtDetip2, u.tdtDetip3],
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
  finishNails: {
    fn1532_200:  fn1532_200.url,
    fn1520_125:  fn1520_125.url,
    fn1524:      fn1524_150.url,
    da21_200:    da21_200.url,
    da21_200ss:  finishNailsStrip.url,
    c50_200:     c50200Box.url,
    strip:       finishNailsStripHD,
  },
  brads18: {
    axx08_500: brad18_500.url,
    axx10_625: brad18_625.url,
    axx13_100: brad18_100.url,
    axx15_125: brad18_125.url,
    axx17_150: brad18_150.url,
    axx21_200: brad18_200.url,
  },
  nailFamilies: {
    fn15_25:       famFn15_25.url,
    da15_34:       famDa15_34.url,
    c16_straight:  famC16Straight.url,
    afn16_20:      famAfn16_20.url,
    brad18_straight: famBrad18Straight.url,
    pin23_micro:   famPin23Micro.url,
  },
  flag: "/__l5e/assets-v1/21fec0ab-e7e9-4f98-91cb-e05584679dc5/usa-flag-clean.png",
} as const;

export type ImageManifest = typeof images;

// ─── Video assets (Google Drive embeds) ──────────────────────────────────────
// Embed pattern: https://drive.google.com/file/d/${id}/preview
export const videos = {
  tipper: {
    commercial_horizon: "1FUMcvs0KySqo0STEFD4a3hxujEZ1-64f",
    commercial:         "14NTGUSJRl2mKSUi1GzEV3YyVKGGFzfBv",
    operation_guide:    "18ZAbX4q2OA2QsEN6D_grDtrpMDy786M5",
  },
} as const;
