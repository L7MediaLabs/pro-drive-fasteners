/**
 * FEATURE 2 — data source for the homepage popup video carousel.
 *
 * Slides are plain data so marketing can add/edit/reorder them without touching
 * the component. When the real video lands for a slide, fill in `videoSrc`
 * (an embed URL) and the placeholder frame is replaced automatically.
 */
export type PromoSlide = {
  id: string;
  eyebrow: string;
  heading: string;
  blurb: string;
  /** Embed URL. Leave undefined while the video is still in production. */
  videoSrc?: string;
  /** Optional in-app link for the slide's CTA. */
  to?: string;
  ctaLabel: string;
};

export const PROMO_SLIDES: PromoSlide[] = [
  {
    id: "different",
    eyebrow: "Who We Are",
    heading: "What Makes Us Different",
    blurb: "50+ years of flooring fasteners, engineered to run in every major brand tool — guaranteed not to jam.",
    to: "/about",
    ctaLabel: "Our Story",
  },
  {
    id: "vcap",
    eyebrow: "Now Available",
    heading: "V-Cap — Multi-Language Videos",
    blurb: "Installation walkthroughs for the V-Cap tapping block, recorded for English, Spanish and Portuguese crews.",
    to: "/videos",
    ctaLabel: "Watch the Videos",
  },
  {
    id: "tapping-ring",
    eyebrow: "Now Available",
    heading: "Tapping Ring — Multi-Language Videos",
    blurb: "See the tapping ring seat a plank without marring the edge — the same demo, in your crew's language.",
    to: "/tapping-rings",
    ctaLabel: "Watch the Videos",
  },
  {
    id: "custom-handle",
    eyebrow: "Custom Program",
    heading: "Custom Mallet-Handle Branding",
    blurb: "Put your shop's name on the handle. Hickory stock turned in-house on a 100-year-old lathe.",
    to: "/mallets",
    ctaLabel: "See the Mallets",
  },
  {
    id: "private-label",
    eyebrow: "For Distributors",
    heading: "Private-Label Mallet Program",
    blurb: "Your brand, our tooling. Private-label runs on mallets, caps and dead blows for distribution partners.",
    to: "/contact",
    ctaLabel: "Talk to Us",
  },
];
