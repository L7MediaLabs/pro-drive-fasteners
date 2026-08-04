export type SiteVideo = {
  title: string;
  /** Embed URL. YouTube Shorts must use the standard /embed/<id> form on the
   * privacy-enhanced youtube-nocookie.com domain, with no ?si= share token. */
  src: string;
  tag: string;
  desc: string;
  /** true = vertical 9:16 Short, false/undefined = landscape 16:9 */
  portrait?: boolean;
  /** Cross-link to the product this video demonstrates */
  product?: { sku: string; name: string; href: string };
};

export const VIDEOS: SiteVideo[] = [
  {
    title: "Glue-Down Tapping Ring Installation Demo",
    src: "https://player.vimeo.com/video/1201923351?color=FFCD00&title=0&byline=0&portrait=0",
    tag: "Tapping Rings",
    desc: "See the Pro-Drive Tapping Ring in action on glue-down vinyl and laminate flooring. Demonstrates proper technique and force distribution.",
  },
  {
    title: "V-Cap Install",
    src: "https://www.youtube-nocookie.com/embed/DD6Jg3go5FQ",
    tag: "Mallet Caps",
    desc: "The V-Cap mallet cap being clicked down and installed. Final cut with voiceover.",
    portrait: true,
    product: {
      sku: "100-V-CAP",
      name: 'White V-Cap for 24oz Mallet 2"',
      href: "/mallets?tab=caps",
    },
  },
];

export const V_CAP_VIDEO = VIDEOS.find(v => v.title === "V-Cap Install")!;
