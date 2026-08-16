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
      { title: "Split Head Hammer Faces | Pro-Drive Fasteners" },
      { name: "description", content: "Non-marring rubber replacement faces for Garland® split-head mallets. 1-1/2\" and 2\" sizes." },
      { property: "og:title", content: "Split Head Hammer Faces — Pro-Drive Fasteners" },
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

      <section className="px-[6%] py-14" style={{ background: "var(--pd-light-bg)" }}>
        <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Replacement Faces</div>
        <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>Two sizes. Zero marring.</h2>
        <div className="mt-6"><ProductGrid products={SPLIT_HEAD} /></div>
        <Callout>Replacement caps only — mallets not included. Designed for Garland® split-head mallets. Easy to install. Durable for pre-finished and unfinished wood. NON-MARRING.</Callout>
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
