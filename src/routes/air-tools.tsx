import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionLabel, Callout } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import { NAILERS, HOSES, FITTINGS } from "../data/products";

export const Route = createFileRoute("/air-tools")({
  head: () => ({
    meta: [
      { title: "Air Tools & Hoses | Pro-Drive Fasteners®" },
      { name: "description", content: "Professional-grade nailers, E-Z Connect® braided air hoses, and industrial fittings for the serious installer." },
    ],
  }),
  component: AirTools,
});

function AirTools() {
  return (
    <div>
      <PageHeader
        breadcrumb="Air Tools & Hoses"
        title="Air Tools & Hoses"
        description="Professional-grade nailers, braided air hoses, and industrial fittings for the serious installer."
      />
      <section className="px-[6%] py-12 space-y-12" style={{ background: "var(--pd-light-bg)" }}>
        <div>
          <SectionLabel>Nailers</SectionLabel>
          <div className="mt-4"><ProductGrid products={NAILERS} /></div>
        </div>
        <div>
          <SectionLabel>E-Z Connect® Braided Air Hoses</SectionLabel>
          <div className="mt-4"><ProductGrid products={HOSES} /></div>
          <Callout>40–50% lighter than traditional hoses · Kink-resistant · Oil resistant · Excellent cold weather flexibility (-40°F to 140°F) · Field repairable with reusable fittings.</Callout>
        </div>
        <div>
          <SectionLabel>Fittings & Couplers</SectionLabel>
          <div className="mt-4"><ProductGrid products={FITTINGS} /></div>
        </div>
      </section>
    </div>
  );
}
