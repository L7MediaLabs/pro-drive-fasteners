import { createFileRoute, Link } from "@tanstack/react-router";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useState } from "react";
import instagramDisplay from "../assets/instagram-display.png.asset.json";
import instagramInstall1 from "../assets/instagram-install-1.png.asset.json";
import instagramInstall2 from "../assets/instagram-install-2.png.asset.json";
import instagramRingCloseup from "../assets/instagram-ring-closeup.png.asset.json";
import instagramTools from "../assets/instagram-tools.png.asset.json";
import illoStaples from "../assets/illustrations/staples_stack.png.asset.json";
import illoCleats from "../assets/illustrations/cleats_stack.png.asset.json";
import illoNails from "../assets/illustrations/nails_stack.png.asset.json";
import badgeContractorAsset from "../assets/badge-contractor-grade.png.asset.json";
import badgeMultiAsset from "../assets/badge-multi-grade.png.asset.json";
import badgeIndustrial from "../assets/badge-industrial-grade.png.asset.json";
import { images } from "../data/images";
import { UsaFlag } from "../components/UsaFlag";

const gradeStandards = [
  {
    image: badgeContractorAsset.url,
    tier: "Tier I",
    name: "Contractor Grade",
    body: "Jobsite-ready fasteners and tools built for the daily install. Every gauge, every angle — chisel-point precision, contractor-packed.",
  },
  {
    image: badgeMultiAsset.url,
    tier: "Tier II",
    name: "Multi Grade",
    body: "Hardwood, contractor, and industrial applications in one spec. Cross-compatible fasteners that clear every major nailer without sorting.",
  },
  {
    image: badgeIndustrial.url,
    tier: "Tier III",
    name: "Industrial Grade",
    body: "Heavy-duty specifications for production shops and OEM lines. Tighter tolerances, high-cycle durability, guaranteed not to jam.",
  },
] as const;

const engineeringTriptych = [
  {
    image: illoStaples.url,
    plate: "PL. I",
    kicker: "Flooring Staples",
    title: "Crown & Chisel",
    body: "15.5, 15, 16, and 18 gauge — precision-collated for every hardwood, laminate, and specialty flooring nailer.",
    to: "/staples",
  },
  {
    image: illoCleats.url,
    plate: "PL. II",
    kicker: "L-Cleats",
    title: "The Angle That Holds",
    body: "16 GA and 18 GA L-Cleats with a barbed shank and depth guide. Guaranteed not to jam in any major brand tool.",
    to: "/l-cleats",
  },
  {
    image: illoNails.url,
    plate: "PL. III",
    kicker: "Brads & Finish Nails",
    title: "Every Angle. Every Gauge.",
    body: "15, 16, 18 GA finish nails and 23 GA micro pins — chisel-point, smooth-shank, contractor-tested.",
    to: "/brads-finish-nails",
  },
] as const;

type HeroSlide = {
  src: string;
  position?: string;
  fit?: "cover" | "contain";
};

const heroSlides: HeroSlide[] = [
  // Lead with the strongest lifestyle/product shots — box photo moved to last
  // and rendered "contained" on cream so it reads as a beauty shot, not a
  // stretched full-bleed background.
  { src: images.mallets.hero,           position: "center", fit: "cover" },
  { src: images.lCleats.lifestyle,      position: "center", fit: "cover" },
  { src: images.tappingRings.orange2,   position: "center", fit: "cover" },
  { src: images.staples.s155_2in_7720,  position: "center", fit: "contain" },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 5500);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      {heroSlides.map((s, i) => {
        const isContained = s.fit === "contain";
        return (
          <div
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === index ? 1 : 0,
              transition: "opacity 1.4s ease-in-out",
              background: isContained ? "var(--pd-cream, #F5F1E8)" : "transparent",
            }}
          >
            <img
              src={s.src}
              alt=""
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: s.fit ?? "cover",
                objectPosition: s.position ?? "center",
                opacity: isContained ? 0.6 : 0.35,
                padding: isContained ? "6% 8%" : 0,
              }}
            />
          </div>
        );
      })}
    </>
  );
}


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pro-Drive Fasteners® | Pro-Driven Flooring Products and Solutions" },
      { name: "description", content: "Premium fastening solutions for flooring professionals. 50+ years. Guaranteed to fit every major brand tool. Made in the USA." },
      { property: "og:title", content: "Pro-Drive Fasteners®" },
      { property: "og:description", content: "Premium fastening solutions for flooring professionals." },
      { property: "og:image", content: images.mallets.hero },
    ],
  }),
  component: Home,
});

const newProducts = [
  { name: "Tipper-De-Tipper Series 5", category: "Installation Tools", description: "The safest, fastest method to replace mallet caps. 5-station design. Fits all major brands. Available now.", link: "/tipper-de-tipper", image: images.tipper.product, alt: "Pro-Drive Fasteners® Tipper-De-Tipper Series 5" },
  { name: "One Tap Tapping Block", category: "Tapping Blocks", description: "Heavy-duty 48oz tapping block with ergonomic wooden handle. Beveled edges prevent cracking.", link: "/tapping-blocks", image: images.tappingBlocks.tbPro, alt: "Pro-Drive Fasteners® One Tap Tapping Block TB-PRO-312" },
  { name: "Split Head Hammer Faces", category: "Mallets & Caps", description: 'Non-marring replacement rubber faces for Garland® split-head mallets. 1-1/2" and 2" sizes.', link: "/split-head-hammer-faces", image: images.mallets.splitHead.hero, alt: "Pro-Drive Fasteners® Split Head Hammer Faces" },
  { name: "L-Cleats — 16 GA & 18 GA", category: "L-Cleats", description: "Complete L-Cleat line with depth guide. Guaranteed not to jam in any major brand of tool.", link: "/l-cleats", image: images.lCleats.banner, alt: "Pro-Drive Fasteners® L-Cleats 16 and 18 gauge" },
  { name: "Wide Plank Wood Driving Tool", category: "Tapping Blocks", description: '11.5" x 4.5" x 4" designed for wide plank and glue-down flooring. Works with dead-blow mallets.', link: "/tapping-blocks", image: images.tappingBlocks.widePlank, alt: "Pro-Drive Fasteners® Wide Plank Wood Driving Tool" },
] as const;

const categories = [
  { code: "CAT-01", name: "Flooring Staples", desc: "15.5 GA, 15 GA, 16 GA, and 18 GA staples for hardwood, laminate, and specialty flooring.", count: "3 gauge families →", to: "/staples" },
  { code: "CAT-02", name: "L-Cleats", desc: "16 GA and 18 GA L-Cleats with depth guide. Guaranteed not to jam in any major brand tool.", count: "2 gauge options + depth guide →", to: "/l-cleats" },
  { code: "CAT-03", name: "Brads & Finish Nails", desc: "15 GA, 16 GA, 18 GA finish nails and 23 GA micro pins. Multiple angles and stainless options.", count: "6 nail families →", to: "/brads-finish-nails" },
  { code: "CAT-04", name: "Mallets & Caps", desc: "Mallets, urethane striking faces, poly caps, and dead blow options. Made in the USA.", count: "5 mallet styles + caps →", to: "/mallets" },
  { code: "CAT-05", name: "Tapping Tools", desc: "Tapping Rings (Red, Orange, Yellow), Tapping Blocks, and the Tipper-De-Tipper.", count: "3 ring variants + 3 block styles →", to: "/tapping-rings" },
  { code: "CAT-06", name: "Air Tools & Equipment", desc: "18 GA and 16 GA brad nailers. E-Z Connect braided air hoses. Industrial fittings and couplers.", count: "Nailers + hose systems →", to: "/air-tools" },
];

const instagramPosts = [
  {
    image: instagramInstall1.url,
    alt: "Installer using a Pro-Drive Fasteners® mallet while laying flooring around a floor vent",
    label: "Field install",
    objectPosition: "center center",
  },
  {
    image: instagramInstall2.url,
    alt: "Installer using a Pro-Drive Fasteners® tapping ring during a flooring installation",
    label: "Tapping ring at work",
    objectPosition: "center center",
  },
  {
    image: instagramTools.url,
    alt: "A Pro-Drive Fasteners® tapping ring sitting in a tool bag with flooring tools",
    label: "Jobsite tools",
    objectPosition: "center center",
  },
  {
    image: instagramDisplay.url,
    alt: "Pro-Drive Fasteners® mallets and replacement caps displayed on a yellow product board",
    label: "Product lineup",
    objectPosition: "center center",
  },
  {
    image: instagramRingCloseup.url,
    alt: "Close-up of an orange Pro-Drive Fasteners® tapping ring showing the printed branding",
    label: "Ring detail",
    objectPosition: "center center",
  },
] as const;

function Home() {
  return (
    <div>
      {/* 7A Hero */}
      <section
        style={{
          background: "var(--pd-cream)",
          minHeight: "90vh",
          position: "relative",
          overflow: "hidden",
        }}
        className="flex flex-col justify-end"
      >
        <HeroSlider />
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(245,241,232,0.55) 0%, rgba(245,241,232,0.82) 70%, rgba(245,241,232,0.95) 100%)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(25,20,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(25,20,0,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "radial-gradient(ellipse 60% 45% at 70% 20%, rgba(255,205,0,0.14), transparent 70%), radial-gradient(ellipse 40% 50% at 10% 90%, rgba(77,65,14,0.08), transparent 70%)",
          }}
        />
        <div className="px-[6%] pt-20 pb-18 relative z-10" style={{ paddingBottom: 72 }}>
          <div className="flex items-center gap-4 mb-7">
            <span style={{ display: "inline-block", width: 40, height: 2, background: "var(--pd-dark)" }} />
            <span className="pd-eyebrow" style={{ color: "var(--pd-gold)" }}>Pro-Driven Flooring Products <span style={{ whiteSpace: "nowrap" }}>and Solutions</span></span>
          </div>
          <h1
            className="pd-display"
            style={{ color: "var(--pd-dark)", fontSize: "clamp(42px, 9vw, 112px)", lineHeight: 0.93, margin: 0, overflowWrap: "break-word" }}
          >
            PRO-DRIVE<br />FASTENERS<sup style={{ fontSize: "0.3em", verticalAlign: "super", marginLeft: "0.04em", lineHeight: 1 }}>&reg;</sup>
          </h1>
          <p style={{ color: "rgba(25,20,0,0.68)", maxWidth: 880, lineHeight: 1.7, fontWeight: 400, fontSize: 18 }} className="mt-7 mb-12">
            We don't follow the standards — we set them. Premium fastening solutions<br />for flooring professionals, guaranteed to fit every major brand tool.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link to="/products" className="pd-btn-primary">Browse Full Line</Link>
            <Link to="/contact" onClick={() => trackEvent("cta_click", { ctaLabel: "Contact for Pricing" })} className="pd-btn-outline-dark">Contact for Pricing</Link>
          </div>
          <div
            className="mt-16 pt-8 flex flex-wrap gap-12"
            style={{ borderTop: "1px solid rgba(25,20,0,0.12)" }}
          >
            {[
              { label: "50+ Years", value: "Industry Leading" },
              { label: "12 Product Lines", value: "All Major Brands Guaranteed" },
              { label: "Made in the USA", value: "Mallets & Specialty Tools" },
            ].map(s => (
              <div key={s.label}>
                <div className="pd-eyebrow flex items-center gap-2" style={{ color: "var(--pd-gold)", letterSpacing: "0.15em" }}>
                  {s.label.includes("USA") && <UsaFlag height={14} />}
                  {s.label}
                </div>
                <div className="mt-1" style={{ color: "var(--pd-dark)", fontWeight: 800, fontSize: 22 }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div
            className="mt-6 pt-5 flex flex-wrap items-center gap-x-10 gap-y-2"
            style={{ borderTop: "1px solid rgba(25,20,0,0.08)" }}
          >
            {[
              "50+ Years Industry Expertise",

              "Made in the USA",
              "Guaranteed to Fit Major Brands",
            ].map((label) => (
              <span
                key={label}
                className="flex items-center gap-2"
                style={{
                  fontFamily: "Assistant, sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(25,20,0,0.5)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    display: "inline-block",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--pd-gold)",
                  }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7B New Products */}
      <section className="px-[6%] py-14" style={{ background: "var(--pd-yellow)" }}>
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div>
            <div className="pd-label" style={{ color: "rgba(25,20,0,0.5)" }}>What's New</div>
            <h2 className="pd-display mt-1" style={{ color: "var(--pd-dark)", fontSize: 38 }}>Latest From Pro-Drive Fasteners®</h2>
            <p className="mt-2" style={{ color: "rgba(25,20,0,0.72)", fontSize: 15 }}>
              We are Pro-Drive Fasteners
              <sup style={{ fontSize: "0.55em", marginLeft: "0.06em", verticalAlign: "super", lineHeight: 0 }}>®</sup>
            </p>
          </div>
          <Link to="/products" className="pd-label hover:underline" style={{ color: "var(--pd-dark)", fontSize: 12 }}>View All →</Link>
        </div>
        <div className="pd-scroller flex gap-4 overflow-x-auto pb-2" style={{ scrollSnapType: "x mandatory" }}>
          {newProducts.map(p => (
            <article
              key={p.name}
              className="flex-shrink-0 flex flex-col"
              style={{ background: "var(--pd-dark)", width: 280, borderTop: "3px solid var(--pd-yellow)", scrollSnapAlign: "start" }}
            >
              <div
                style={{
                  background: "#F5F4F0",
                  height: 160,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 16,
                }}
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <span style={{ background: "rgba(255,205,0,0.15)", color: "var(--pd-yellow)", padding: "3px 8px", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>NEW</span>
                  <span style={{ color: "rgba(255,205,0,0.4)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>{p.category}</span>
                </div>
                <h3 className="text-white mt-3" style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontWeight: 300, fontSize: 13, lineHeight: 1.65 }} className="mt-1.5">{p.description}</p>
                <Link to={p.link} className="pd-label mt-4 inline-block" style={{ color: "var(--pd-yellow)", letterSpacing: "0.1em" }}>Learn More →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7C Categories */}
      <section className="px-[6%] py-20" style={{ background: "var(--pd-light-bg)" }}>
        <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Full Product Line</div>
        <h2 className="pd-display mt-2 mb-10" style={{ color: "var(--pd-dark)", fontSize: "clamp(34px, 5vw, 48px)", maxWidth: 640 }}>
          Everything You Need. One Source.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 2 }}>
          {categories.map(c => (
            <Link
              key={c.code}
              to={c.to}
              className="group bg-white block transition-colors"
              style={{ borderLeft: "4px solid var(--pd-yellow)", padding: "28px 24px" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--pd-yellow)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--pd-white)")}
            >
              <div className="pd-label" style={{ color: "rgba(0,0,0,0.3)", letterSpacing: "0.15em" }}>{c.code}</div>
              <div className="mt-1" style={{ fontWeight: 800, fontSize: 20, color: "var(--pd-dark)" }}>{c.name}</div>
              <p className="mt-1.5" style={{ fontSize: 13, color: "var(--pd-muted)", lineHeight: 1.65 }}>{c.desc}</p>
              <div className="pd-label mt-4" style={{ color: "var(--pd-gold)", letterSpacing: "0.1em" }}>{c.count}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7C.25 Grade Standards */}
      <section
        className="px-[6%] py-20"
        style={{ background: "var(--pd-dark)", position: "relative", overflow: "hidden" }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(255,205,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,205,0,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Grade Standards</div>
            <h2
              className="pd-display mt-2"
              style={{ color: "#fff", fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.02, maxWidth: 720 }}
            >
              Three tiers. One guarantee.
            </h2>
          </div>
          <p
            className="max-w-md"
            style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, fontWeight: 300 }}
          >
            Every Pro-Drive Fasteners® product is stamped to a specification tier. Match the badge to the job — from daily contractor installs to industrial production lines.
          </p>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-3" style={{ gap: 1, background: "rgba(255,205,0,0.15)" }}>
          {gradeStandards.map((g) => (
            <div
              key={g.name}
              className="flex flex-col items-center text-center"
              style={{ background: "var(--pd-dark)", padding: "40px 28px" }}
            >
              <img
                src={g.image}
                alt={`${g.name} badge`}
                loading="lazy"
                style={{ width: 148, height: 148, objectFit: "contain" }}
              />
              <div
                className="pd-label mt-6"
                style={{ color: "var(--pd-yellow)", letterSpacing: "0.2em" }}
              >
                {g.tier}
              </div>
              <div
                className="mt-2"
                style={{ color: "#fff", fontWeight: 800, fontSize: 22, letterSpacing: "0.02em" }}
              >
                {/* No ™ on Pro-Drive Fasteners®'s own grade names: protection is on the
                    badge artwork, not the name text (Carlton, Aug 13). */}
                {g.name}
              </div>
              <p
                className="mt-3"
                style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.7, fontWeight: 300, maxWidth: 300 }}
              >
                {g.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7C.5 Engineering Triptych — catalog cover illustrations */}
      <section
        style={{
          background: "#F5F4EE",
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
        className="px-[6%] py-20"
      >
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Engineered Fasteners</div>
            <h2
              className="pd-display mt-2"
              style={{ color: "var(--pd-dark)", fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.02, maxWidth: 720 }}
            >
              Every fastener, drawn from spec.
            </h2>
          </div>
          <p
            className="max-w-md"
            style={{ color: "var(--pd-muted)", fontSize: 14, lineHeight: 1.7, fontWeight: 300 }}
          >
            Three families. One standard. Illustrations from the Pro-Drive Fasteners® R22 reference catalog — the same drawings our engineers work from on the line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 1, background: "rgba(0,0,0,0.08)" }}>
          {engineeringTriptych.map((t) => (
            <Link
              key={t.plate}
              to={t.to}
              className="group block relative overflow-hidden"
              style={{ background: "#FAF9F4" }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 16,
                  left: 20,
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  color: "rgba(0,0,0,0.35)",
                  zIndex: 2,
                }}
              >
                {t.plate}
              </div>
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 16,
                  right: 20,
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  color: "rgba(0,0,0,0.35)",
                  zIndex: 2,
                }}
              >
                FIG. {String(engineeringTriptych.indexOf(t) + 1).padStart(2, "0")}
              </div>
              <div
                className="flex items-center justify-center"
                style={{
                  height: 340,
                  padding: "48px 32px 24px",
                  background:
                    "radial-gradient(ellipse 70% 55% at 50% 60%, rgba(255,205,0,0.10), transparent 70%)",
                }}
              >
                <img
                  src={t.image}
                  alt={t.title}
                  loading="lazy"
                  className="transition-transform duration-700 group-hover:scale-105"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
              <div
                className="px-7 pb-8 pt-2"
                style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div className="pd-label mt-5" style={{ color: "var(--pd-gold)", fontSize: 12 }}>{t.kicker}</div>
                <h3
                  className="mt-1.5"
                  style={{ color: "var(--pd-dark)", fontWeight: 800, fontSize: 22, lineHeight: 1.15 }}
                >
                  {t.title}
                </h3>
                <p
                  className="mt-2"
                  style={{ color: "var(--pd-muted)", fontSize: 13, lineHeight: 1.65, fontWeight: 300 }}
                >
                  {t.body}
                </p>
                <div
                  className="pd-label mt-5 inline-flex items-center gap-2 transition-colors"
                  style={{ color: "var(--pd-dark)", fontSize: 12, letterSpacing: "0.14em" }}
                >
                  Explore Family
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: "var(--pd-gold)" }}
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7D Tapping Ring Video */}
      <section className="px-[6%] py-20" style={{ background: "var(--pd-dark)" }}>

        <div className="grid lg:grid-cols-[42%_58%] gap-8 items-start">
          <div>
            <div style={{ position: "relative", paddingTop: "177.78%" }}>
              <iframe
                src="https://player.vimeo.com/video/1201923351?color=FFCD00&title=0&byline=0&portrait=0"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Glue-Down Tapping Ring Demo"
              />
            </div>
            <div className="pd-label mt-2" style={{ color: "rgba(255,205,0,0.4)" }}>Glue-Down Tapping Ring Demo</div>
          </div>
          <div>
            <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Featured Product</div>
            <h2 className="pd-display text-white mt-1" style={{ fontSize: "clamp(26px, 3.4vw, 38px)", lineHeight: 1.05 }}>Tapping Rings. Built Different.</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300, fontSize: 15, lineHeight: 1.7 }} className="mt-3">
              Available in Red, Orange, and Yellow — each engineered for specific flooring applications. Non-marring. Only 2.1 lbs.
            </p>
            <div className="mt-5">
              {[
                { color: "#C83228", name: "Red (V-6RING-R)", desc: "Parquet, Glue-Down, Vinyl, Laminate" },
                { color: "#E07020", name: "Orange (V-6RING-O)", desc: "Most flooring types · Softened density for grip" },
                { color: "var(--pd-yellow)", name: "Yellow (V-6RING-Y)", desc: "Compact, lightweight · Precision and control" },
              ].map(v => (
                <div key={v.name} className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,205,0,0.1)" }}>
                  <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: v.color, flexShrink: 0 }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white" style={{ fontSize: 14 }}>{v.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300, fontSize: 12 }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/tapping-rings" className="pd-label inline-block mt-5" style={{ color: "var(--pd-yellow)", fontSize: 12, letterSpacing: "0.1em" }}>View Tapping Rings →</Link>
          </div>
        </div>
      </section>

      {/* 7E Why */}
      <section className="px-[6%] py-20 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { n: "50+", h: "Years of Industry Expertise", b: "Hollis and Carlton Henderson have spent 50+ combined years selecting every material, setting every spec, and staying involved in every step. That's the Pro-Drive Fasteners® difference." },
            { n: "100%", h: "Guaranteed to Fit", b: "Every product is guaranteed to work in all major brand tools — or your money back." },
            { n: "Made", h: "in the USA", b: "Our mallets are crafted from 100% premium American hickory. Our products are built to professional standards — not adapted from general-purpose fasteners." },
            { n: "One", h: "Source. Everything.", b: "From staples and L-Cleats to tapping tools and air hoses — complete installation solutions." },
          ].map(x => (
            <div key={x.h}>
              <div className="pd-display" style={{ color: "var(--pd-amber-ink)", fontSize: 48 }}>{x.n}</div>
              <div className="mt-3 flex items-center gap-2" style={{ fontWeight: 700, fontSize: 17, color: "var(--pd-dark)" }}>{x.h}{x.h.includes("USA") && <UsaFlag height={15} />}</div>
              <p className="mt-2" style={{ fontSize: 13, color: "var(--pd-muted)", lineHeight: 1.75 }}>{x.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7F Distributor CTA */}
      <section className="px-[6%] py-16" style={{ background: "var(--pd-yellow)" }}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="max-w-2xl">
            <h2 className="pd-display" style={{ color: "var(--pd-dark)", fontSize: "clamp(28px, 4vw, 44px)" }}>
              <span style={{ display: "block" }}>Stock</span>
              <span style={{ display: "block" }}>
                Pro-Drive Fasteners<span style={{ fontSize: "0.55em", verticalAlign: "super", lineHeight: 0 }}>&reg;</span>.
              </span>
              <span style={{ display: "block" }}>Full Line Offering.</span>
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Made in the USA"].map(b => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2"
                  style={{
                    background: "rgba(25,20,0,0.1)",
                    padding: "4px 10px",
                    fontFamily: "Assistant, sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "rgba(25,20,0,0.6)",
                  }}
                >
                  <UsaFlag height={12} />
                  {b}
                </span>
              ))}
            </div>
            <p className="mt-3" style={{ color: "rgba(25,20,0,0.6)", fontSize: 15 }}>
              Wholesale distributor pricing available. Contact us to become an authorized distributor.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" onClick={() => trackEvent("cta_click", { ctaLabel: "Request Distributor Pricing" })} className="pd-btn-dark">Request Distributor Pricing</Link>
            <a href="#" target="_blank" rel="noreferrer" className="pd-btn-outline-dark">Download Catalog</a>
          </div>
        </div>
      </section>

      {/* 7G Instagram */}
      <section className="px-[6%] py-16" style={{ background: "var(--pd-light-bg)" }}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Follow Along</div>
            <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 38 }}>Pro-Drive Fasteners®{" "}<span style={{ whiteSpace: "nowrap" }}>on Instagram</span></h2>
            <p className="mt-3" style={{ color: "var(--pd-muted)", fontWeight: 300, fontSize: 16, maxWidth: 520, lineHeight: 1.8 }}>
              Product drops, field installs, and close-up looks at the tools flooring crews actually use.
            </p>
          </div>
          <a href="https://www.instagram.com/pro_drive_fasteners/" target="_blank" rel="noreferrer" className="pd-btn-dark">
            Follow @pro_drive_fasteners
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mt-10" style={{ gap: 12 }}>
          {instagramPosts.map((post) => (
            <a
              key={post.alt}
              href="https://www.instagram.com/pro_drive_fasteners/"
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden"
              style={{ background: "var(--pd-dark)", border: "1px solid rgba(25,20,0,0.08)" }}
            >
              <div className="aspect-square overflow-hidden" style={{ background: "var(--pd-border)" }}>
                <img
                  src={post.image}
                  alt={post.alt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: post.objectPosition,
                    transition: "transform 220ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ background: "var(--pd-white)" }}>
                <span className="pd-label" style={{ color: "var(--pd-dark)", letterSpacing: "0.1em" }}>{post.label}</span>
                <span aria-hidden style={{ color: "var(--pd-gold)", fontSize: 14 }}>↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
