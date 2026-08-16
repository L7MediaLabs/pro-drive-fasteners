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

export const TAPPING_RING_LANGUAGES: VideoLanguage[] = [
  { code: "en", label: "English", englishName: "English", src: vimeo("1201923351") },
  { code: "es", label: "Espa\u00f1ol", englishName: "Spanish", src: vimeo("1218136467") },
  { code: "pt", label: "Portugu\u00eas", englishName: "Portuguese", src: vimeo("1218136510") },
  { code: "uk", label: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430", englishName: "Ukrainian", src: vimeo("1218136535") },
  { code: "vi", label: "Ti\u1ebfng Vi\u1ec7t", englishName: "Vietnamese", src: vimeo("1218136550") },
];

export const VIDEOS: SiteVideo[] = [
  {
    title: "Glue-Down Tapping Ring Installation Demo",
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

export const V_CAP_VIDEO = VIDEOS.find(v => v.title === "V-Cap Install")!;
