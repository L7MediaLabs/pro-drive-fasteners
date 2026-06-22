import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionLabel, Callout } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import { FN15, DA15, C16, AFN, BRAD18, PINS23 } from "../data/products";

export const Route = createFileRoute("/brads-finish-nails")({
  head: () => ({
    meta: [
      { title: "Brads & Finish Nails | Pro-Drive Fasteners®" },
      { name: "description", content: "Professional grade finish nails in every angle and gauge. 15 GA, 16 GA, 18 GA, and 23 GA micro pins." },
    ],
  }),
  component: Brads,
});

const tools = [
  "Bostitch FN 25°",
  "Senco DA 34°",
  "Hitachi Straight",
  "Paslode 20°",
  "18 GA Straight",
  "23 GA Micro",
];

function Brads() {
  return (
    <div>
      <PageHeader
        breadcrumb="Brads & Finish Nails"
        title="Brads & Finish Nails"
        description="Professional grade finish nails in every angle and gauge. Contractor tested. Guaranteed not to jam."
      />
      <section className="px-[6%] py-10" style={{ background: "var(--pd-dark)" }}>
        <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>E-Z Select Guide</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-4" style={{ gap: 2 }}>
          {tools.map(t => (
            <div key={t} className="px-4 py-5 text-center" style={{ background: "rgba(255,205,0,0.08)", border: "1px solid rgba(255,205,0,0.15)" }}>
              <div style={{ color: "var(--pd-yellow)", fontWeight: 700, fontSize: 13 }}>{t}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="px-[6%] py-12 space-y-12" style={{ background: "var(--pd-light-bg)" }}>
        <div>
          <SectionLabel>15 GA FN — 25° Angle (Fits Bostitch®)</SectionLabel>
          <div className="mt-4"><ProductGrid products={FN15} /></div>
        </div>
        <div>
          <SectionLabel>15 GA DA — 34° Angle (Fits Senco®)</SectionLabel>
          <div className="mt-4"><ProductGrid products={DA15} /></div>
        </div>
        <div>
          <SectionLabel>16 GA — 0° Straight Angle</SectionLabel>
          <div className="mt-4"><ProductGrid products={C16} /></div>
        </div>
        <div>
          <SectionLabel>16 GA — 20° Paslode® Angle</SectionLabel>
          <div className="mt-4"><ProductGrid products={AFN} /></div>
        </div>
        <div>
          <SectionLabel>18 GA — 0° Straight Brad Nails</SectionLabel>
          <div className="mt-4"><ProductGrid products={BRAD18} /></div>
        </div>
        <div>
          <SectionLabel>23 GA Micro Pins</SectionLabel>
          <div className="mt-4"><ProductGrid products={PINS23} /></div>
          <Callout>Micro Pins fasten with a nearly invisible hole. Excellent for face-nailing wide plank engineered flooring.</Callout>
        </div>
      </section>
    </div>
  );
}
