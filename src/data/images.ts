// Centralized CDN image references for Pro-Drive product photography.
// Each value is the CDN URL emitted by lovable-assets for the corresponding
// catalog asset. Reference these via `images.<category>.<key>`.

import malletsP21_01 from "../assets/products/mallets/p21_img01.png.asset.json";
import malletsP21_02 from "../assets/products/mallets/p21_img02.png.asset.json";
import malletsP22_06 from "../assets/products/mallets/p22_img06.png.asset.json";
import malletsP22_07 from "../assets/products/mallets/p22_img07.png.asset.json";
import malletsP22_08 from "../assets/products/mallets/p22_img08.png.asset.json";
import malletsP22_10 from "../assets/products/mallets/p22_img10.png.asset.json";
import malletsP23_01 from "../assets/products/mallets/p23_img01.png.asset.json";
import malletsP23_02 from "../assets/products/mallets/p23_img02.png.asset.json";
import malletsP24_02 from "../assets/products/mallets/p24_img02.png.asset.json";
import malletsP24_03 from "../assets/products/mallets/p24_img03.png.asset.json";
import malletsP5_01 from "../assets/products/mallets/p5_img1.png.asset.json";
import malletsP5_02 from "../assets/products/mallets/p5_img2.png.asset.json";
import malletsP5_03 from "../assets/products/mallets/p5_img3.png.asset.json";
import malletsP5_05 from "../assets/products/mallets/p5_img5.png.asset.json";

import staplesP04_01 from "../assets/products/staples/p04_img01.png.asset.json";
import staplesP04_08 from "../assets/products/staples/p04_img08.png.asset.json";
import staplesP05_02 from "../assets/products/staples/p05_img02.png.asset.json";
import staplesP07_02 from "../assets/products/staples/p07_img02.png.asset.json";
import staplesP08_01 from "../assets/products/staples/p08_img01.png.asset.json";

import blocksP28_03 from "../assets/products/tapping_blocks/p28_img03.png.asset.json";
import blocksP28_04 from "../assets/products/tapping_blocks/p28_img04.png.asset.json";

import ringsP26_01 from "../assets/products/tapping_rings/p26_img01.png.asset.json";
import ringsP26_03 from "../assets/products/tapping_rings/p26_img03.png.asset.json";
import ringsP26_04 from "../assets/products/tapping_rings/p26_img04.png.asset.json";

import tipperP27_01 from "../assets/products/tipper/p27_img01.png.asset.json";
import tipperP27_03 from "../assets/products/tipper/p27_img03.png.asset.json";
import tipperP27_04 from "../assets/products/tipper/p27_img04.png.asset.json";
import tipperP27_05 from "../assets/products/tipper/p27_img05.png.asset.json";
import tipperP27_06 from "../assets/products/tipper/p27_img06.png.asset.json";
import tipperP14_01 from "../assets/products/tipper/p14_img1.png.asset.json";
import tipperP14_02 from "../assets/products/tipper/p14_img2.png.asset.json";
import tipperP14_07 from "../assets/products/tipper/p14_img7.png.asset.json";

export const images = {
  mallets: {
    hero: malletsP22_07.url,
    lineup: malletsP21_02.url,
    family: malletsP22_06.url,
    dhw: malletsP22_10.url,
    capsLineup: malletsP23_01.url,
    vCapBanner: malletsP23_02.url,
    polyColors: malletsP24_02.url,
    polyDetail: malletsP24_03.url,
    misc1: malletsP21_01.url,
    misc2: malletsP22_08.url,
    galleher: [malletsP5_01.url, malletsP5_02.url, malletsP5_03.url, malletsP5_05.url],
  },
  staples: {
    hero: staplesP04_08.url,
    gauge155a: staplesP04_01.url,
    gauge155b: staplesP05_02.url,
    gauge15Banner: staplesP07_02.url,
    gauge15Vertical: staplesP08_01.url,
  },
  tappingBlocks: {
    tbPro: blocksP28_04.url,
    lifestyle: blocksP28_03.url,
  },
  tappingRings: {
    primary: ringsP26_01.url,
    lifestyle: ringsP26_03.url,
    detail: ringsP26_04.url,
  },
  tipper: {
    product: tipperP27_01.url,
    tipping: [tipperP27_03.url, tipperP27_04.url, tipperP27_05.url],
    // Only one de-tipping shot was recovered from the source archive; reuse it plus the
    // earlier catalog frames so the De-Tipping row still has three illustrations.
    deTipping: [tipperP27_06.url, tipperP14_01.url, tipperP14_02.url],
    extra: tipperP14_07.url,
  },
} as const;

export type ImageManifest = typeof images;
