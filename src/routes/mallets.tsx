import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionLabel, Callout } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import { MALLETS, MALLET_CAPS, POLY_FACES, DEAD_BLOW } from "../data/products";
import { images } from "../data/images";

export const Route = createFileRoute("/mallets")({
  head: () => ({
    meta: [
      { title: "Mallets & Caps | Pro-Drive Fasteners®" },
      { name: "description", content: "Mallets made in the USA from 100% premium hickory. Urethane striking faces, poly caps, and dead-blow options." },
      { property: "og:image", content: images.mallets.hero },
      { property: "twitter:image", content: images.mallets.hero },
    ],
  }),
  component: Mallets,
});

const hardness = [
  { color: "#F08A30", label: "Soft" },
  { color: "#6B4E2E", label: "Soft/Med" },
  { color: "#4FA85F", label: "Medium" },
  { color: "#C83228", label: "Hard" },
  { color: "#111", label: "Tough" },
];

function Mallets() {
  return (
    <div>
      <PageHeader
        breadcrumb="Mallets & Caps"
        title="Mallets & Caps"
        description="Made in the USA from 100% premium hickory. Guaranteed to fit leading brands."
        bgImage={images.mallets.hero}
      />
      <section className="px-[6%] py-12 space-y-12" style={{ background: "var(--pd-light-bg)" }}>
        <div>
          <SectionLabel>Mallets</SectionLabel>
          <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-4 items-start">
            <ProductGrid products={MALLETS} />
            <div className="bg-white p-4" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
              <img
                src={images.mallets.lineup}
                alt="Pro-Drive mallet lineup — M1W, M5W"
                loading="lazy"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
              <div className="pd-label mt-3" style={{ color: "var(--pd-gold)" }}>Mallet Family</div>
            </div>
          </div>
          <Callout><strong>PATENTED SURE 2 LOCK™</strong> head design virtually eliminates loosening of handle — even after years of use. Epoxy-filled handle attached with steel safety wedge.</Callout>
        </div>
        <div>
          <SectionLabel>Mallet Caps (Rubber)</SectionLabel>
          <div className="mt-4"><ProductGrid products={MALLET_CAPS} /></div>
          <Callout><strong>E-Z 2CAP®</strong> — caps installed or removed in 30 seconds or less. PATENTED DESIGN.</Callout>
        </div>
        <div>
          <SectionLabel>Urethane Striking Faces (Poly Caps)</SectionLabel>
          <div className="mt-4"><ProductGrid products={POLY_FACES} /></div>
          <div className="bg-white mt-4 p-5 flex items-center gap-6 flex-wrap" style={{ borderLeft: "3px solid var(--pd-yellow)" }}>
            <div className="pd-label" style={{ color: "var(--pd-dark)" }}>Hardness Scale</div>
            {hardness.map(h => (
              <div key={h.label} className="flex items-center gap-2">
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: h.color, display: "inline-block" }} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>{h.label}</span>
              </div>
            ))}
          </div>
          <Callout>5 colors denoting hardness. Guaranteed to fit leading brands with 3/8" x 16 standard thread. Free counter display with purchase of 16 Poly Striking Faces.</Callout>
        </div>
        <div>
          <SectionLabel>Poly Dead Blow Mallet (US Patent 11,759,941)</SectionLabel>
          <div className="mt-4"><ProductGrid products={DEAD_BLOW} /></div>
          <Callout>Only 2.2 lbs. Head cavity partially filled with steel shot for greater striking force. Increases productivity, reduces installer fatigue.</Callout>
        </div>
      </section>
    </div>
  );
}
