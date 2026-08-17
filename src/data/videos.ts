export type SiteVideo = {
  title: string;
  /** Embed URL. YouTube Shorts must use the standard /embed/<id> form on the
   * privacy-enhanced youtube-nocookie.com domain, with no ?si= share token. */
  src: string;
  tag: string;
  desc: string;
  /** true = vertical 9:16 Short, false/undefined = landscape 16:9 */
  portrait?: boolean;
  /** true = only shown on its product page, not in the /videos index */
  productPageOnly?: boolean;
  /** Cross-link to the product this video demonstrates */
  product?: { sku: string; name: string; href: string };
  /** Language variants of the SAME video. English is variants[0] and default. */
  languages?: VideoLanguage[];
};

export type VideoLanguage = {
  /** BCP-47 code, used for lang attributes and iframe titles */
  code: string;
  /** Label shown to users, written in its own language */
  label: string;
  /** Language name in English, for the iframe title */
  englishName: string;
  src: string;
};

/**
 * MASTER GATE for the client-supplied translated tapping ring videos.
 * false = only the English cut renders; no language selector is shown.
 * Flip to true once the client approves the re-recorded translations.
 */
export const SHOW_TRANSLATED_VIDEOS = true;

const vimeo = (id: string) =>
  `https://player.vimeo.com/video/${id}?color=FFCD00&title=0&byline=0&portrait=0&dnt=1`;

/**
 * OPEN CLIENT REQUEST (flagged Aug 16, 2026):
 * Hollis asked for the SHORTER tapping ring cut (1:20) instead of the 2:13
 * version. Pro-Drive has only supplied the 2:13 masters, in all five
 * languages, so every ID below is still the long cut. Replace these IDs once
 * the 1:20 re-cuts are delivered (English + Spanish, Portuguese, Ukrainian,
 * Vietnamese). Do not trim client-side; the shorter cut must come from them.
 */
export const TAPPING_RING_LANGUAGES: VideoLanguage[] = [
  { code: "en", label: "English", englishName: "English", src: vimeo("1201923351") },
  { code: "es", label: "Espa\u00f1ol", englishName: "Spanish", src: vimeo("1218136467") },
  { code: "pt", label: "Portugu\u00eas", englishName: "Portuguese", src: vimeo("1218136510") },
  { code: "uk", label: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430", englishName: "Ukrainian", src: vimeo("1218136535") },
  { code: "vi", label: "Ti\u1ebfng Vi\u1ec7t", englishName: "Vietnamese", src: vimeo("1218136550") },
];

export const VIDEOS: SiteVideo[] = [
  {
    title: "Series 5 Tipper-De-Tipper \u2014 Commercial (1:20)",
    src: "https://www.youtube-nocookie.com/embed/QsrVfPwt4A4",
    tag: "Tipper-De-Tipper",
    desc: "The Series 5 Tipper-De-Tipper commercial cut \u2014 one minute twenty seconds. Replaces and removes mallet caps in under 30 seconds with no risk of injury.",
    product: {
      sku: "TDT-5",
      name: "Series 5 Tipper-De-Tipper",
      href: "/tipper-de-tipper",
    },
  },
  {

    title: "Tapping Ring \u2014 Quick View (Short)",
    src: "https://www.youtube-nocookie.com/embed/DDbBkiX1iEM",
    tag: "Tapping Rings",
    desc: "A shorter cut of the glue-down tapping ring demonstration, covering the same install steps in about 30 seconds less. English only \u2014 the translated versions are made from the full demo below.",
    portrait: true,
    product: {
      sku: "V-6RING-Y",
      name: "Yellow Tapping Ring",
      href: "/tapping-rings",
    },
  },
  {
    title: "Glue-Down Tapping Ring Installation Demo (Full Demo)",
    src: "https://player.vimeo.com/video/1201923351?color=FFCD00&title=0&byline=0&portrait=0",
    tag: "Tapping Rings",
    desc: "See the Pro-Drive Tapping Ring in action on glue-down vinyl and laminate flooring. Demonstrates proper technique and force distribution.",
    languages: TAPPING_RING_LANGUAGES,
  },
  {
    title: "V-Cap Install",
    src: "https://www.youtube-nocookie.com/embed/DD6Jg3go5FQ",
    tag: "Mallet Caps",
    desc: "The V-Cap mallet cap being clicked down and installed. Final cut with voiceover.",
    portrait: true,
    productPageOnly: true,
    product: {
      sku: "100-V-CAP",
      name: 'White V-Cap for 24oz Mallet 2"',
      href: "/mallets?tab=caps",
    },
  },
];

export const TAPPING_RING_SHORT = VIDEOS.find(v => v.title.includes("Quick View"))!;
export const TAPPING_RING_FULL = VIDEOS.find(v => v.title.includes("Full Demo"))!;

export const V_CAP_VIDEO = VIDEOS.find(v => v.title === "V-Cap Install")!;
