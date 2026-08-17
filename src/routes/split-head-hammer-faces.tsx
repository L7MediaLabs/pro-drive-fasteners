import { createFileRoute } from "@tanstack/react-router";
import { Callout, InfoPanel } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import {
  CinematicHero,
  RelatedProducts,
  PageDisclaimers,
} from "../components/editorial";
import { SPLIT_HEAD, pickRelated } from "../data/products";
import { images } from "../data/images";

export const Route = createFileRoute("/split-head-hammer-faces")({
  head: () => ({
    meta: [
      { title: "Split Head Hammer Faces | Pro-Drive Fasteners®" },
      { name: "description", content: "Non-marring rubber replacement faces for Garland® split-head mallets. 1-1/2\" and 2\" sizes." },
      { property: "og:title", content: "Split Head Hammer Faces — Pro-Drive Fasteners®" },
      { property: "og:description", content: "Non-marring replacement faces for Garland® split-head mallets." },
    ],
  }),
  component: SplitHead,
});

function SplitHead() {
  const related = pickRelated(SPLIT_HEAD.map(p => p.id), 6);
  return (
    <div>
      <CinematicHero
        kicker="Split Head Replacement"
        title={<>Non-Marring Faces.<br />Made to Fit.</>}
        description="Replacement rubber faces for Garland® split-head mallets. Available in 1-1/2 inch and 2 inch sizes. Durable for pre-finished and unfinished wood."
        bgImage={images.mallets.splitHead.hero}
        badges={[
          { label: "NON-MARRING" },
          { label: "FITS GARLAND®" },
          { label: "EASY INSTALL" },
        ]}
      />

      {/* Context only: the Garland® split-head mallet the faces fit.
          Client lock (Aug 17): the mallet itself is NOT sold. */}
      <section className="px-[6%] py-14" style={{ background: "var(--pd-cream, #F5F1E8)" }}>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div style={{ background: "#fff", padding: 20, borderTop: "3px solid var(--pd-yellow)", position: "relative" }}>
            <img
              src={images.mallets.splitHead.hero}
              alt="Garland® split-head mallet shown for fit reference only — the mallet is not offered by Pro-Drive Fasteners®"
              loading="lazy"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div
              className="pd-label"
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                background: "var(--pd-dark)",
                color: "#fff",
                padding: "6px 10px",
                fontSize: 11,
                letterSpacing: "0.16em",
                fontWeight: 800,
              }}
            >
              MALLET NOT OFFERED
            </div>
          </div>
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>For Reference Only</div>
            <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 30, lineHeight: 1.1 }}>
              MALLET NOT OFFERED.
            </h2>
            <p className="mt-4" style={{ color: "var(--pd-muted)", fontSize: 15, lineHeight: 1.65 }}>
              The Garland® split-head mallet above is shown for fit context only. We sell the
              replacement rubber faces — the mallet itself is not offered.
            </p>
            <Callout>Replacement faces only. MALLET NOT OFFERED.</Callout>
          </div>
        </div>
      </section>

      <section className="px-[6%] py-14" style={{ background: "var(--pd-light-bg)" }}>
        <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Replacement Faces</div>
        <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>Two sizes. Zero marring.</h2>
        <div className="mt-6"><ProductGrid products={SPLIT_HEAD} /></div>
        <Callout>Replacement faces only — MALLET NOT OFFERED. Designed for Garland® split-head mallets. Easy to install. Durable for pre-finished and unfinished wood. NON-MARRING.</Callout>
        <InfoPanel
          applications="Wood assembly, cabinetry, pre-finished flooring seating, upholstery frames."
          materials="Non-marring rubber compound. Retains original Garland® mallet fit."
        />
      </section>

      <RelatedProducts products={related} />
      <PageDisclaimers trademarks />
    </div>
  );
}
