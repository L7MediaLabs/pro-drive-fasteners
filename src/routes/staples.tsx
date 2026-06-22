import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionLabel, Callout } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import { STAPLES_15_5, STAPLES_15_Q, STAPLES_16_N, STAPLES_18_M, STAPLES_18_L } from "../data/products";
import { images } from "../data/images";

export const Route = createFileRoute("/staples")({
  head: () => ({
    meta: [
      { title: "Flooring Staples | Pro-Drive Fasteners®" },
      { name: "description", content: "15.5 GA, 15 GA, 16 GA, and 18 GA flooring staples for hardwood, laminate, and engineered installations." },
      { property: "og:image", content: images.staples.hero },
      { property: "twitter:image", content: images.staples.hero },
    ],
  }),
  component: Staples,
});

function Staples() {
  return (
    <div>
      <PageHeader
        breadcrumb="Flooring Staples"
        title="Flooring Staples"
        description="Medium crown and specialty staples engineered for hardwood, laminate, and engineered flooring installations."
        bgImage={images.staples.hero}
      />
      <section className="px-[6%] py-12 space-y-12" style={{ background: "var(--pd-light-bg)" }}>
        <div>
          <SectionLabel>15.5 GA Hardwood Flooring Staples</SectionLabel>
          <div className="mt-4"><ProductGrid products={STAPLES_15_5} /></div>
          <Callout>Guaranteed to fit all standard 15.5 gauge flooring tools. Chisel point reduces splitting during installation. Contractor Bulk-Job or Job packs available.</Callout>
        </div>
        <div>
          <SectionLabel>15 GA Q-Wire Staples — 7/16" Crown</SectionLabel>
          <div className="mt-4"><ProductGrid products={STAPLES_15_Q} /></div>
          <Callout>Senco® Style. Ideal for framing, sheathing, roof decking, and furniture frames. Meets or exceeds ASTM A641. Compatible: Senco® SQS55, FASCO® F45C, Duo-Fast® MS-1580D.</Callout>
        </div>
        <div>
          <SectionLabel>16 GA N-Wire Staples — 7/16" Crown</SectionLabel>
          <div className="mt-4"><ProductGrid products={STAPLES_16_N} /></div>
          <Callout>Furniture frames, cabinet sub-assembly, millwork, door jambs. Meets or exceeds ASTM A641.</Callout>
        </div>
        <div>
          <SectionLabel>18 GA Staples — M-Wire (3/8" Crown)</SectionLabel>
          <div className="mt-4"><ProductGrid products={STAPLES_18_M} /></div>
        </div>
        <div>
          <SectionLabel>18 GA Staples — L-Wire (1/4" Crown · Duo-Fast 1800)</SectionLabel>
          <div className="mt-4"><ProductGrid products={STAPLES_18_L} /></div>
        </div>
      </section>
    </div>
  );
}
