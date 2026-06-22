import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Callout } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import { DIVERGENT } from "../data/products";

export const Route = createFileRoute("/divergent-staples")({
  head: () => ({
    meta: [
      { title: "Divergent Staples | Pro-Drive Fasteners®" },
      { name: "description", content: "Pad, carpet, stair tread, and specialty staples for bedding, insulation, roofing, upholstery, and more." },
    ],
  }),
  component: Div,
});

function Div() {
  return (
    <div>
      <PageHeader
        breadcrumb="Divergent Staples"
        title="Divergent Staples"
        description="Pad staples, carpet staples, and stair tread staples for bedding, insulation, roofing, and more."
      />
      <section className="px-[6%] py-12" style={{ background: "var(--pd-light-bg)" }}>
        <ProductGrid products={DIVERGENT} />
        <Callout>
          <strong>Applications:</strong> Bedding Carpet Pad · Insulation · Roofing · House Wrap · Light Wood Assembly · Poly Sheeting · Upholstery
        </Callout>
      </section>
    </div>
  );
}
