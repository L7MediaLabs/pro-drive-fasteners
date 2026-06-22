import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import { ACCESSORIES_LIST } from "../data/products";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories | Pro-Drive Fasteners®" },
      { name: "description", content: "Maintenance kits and retail display solutions for the Pro-Drive line." },
    ],
  }),
  component: Acc,
});

function Acc() {
  return (
    <div>
      <PageHeader
        breadcrumb="Accessories"
        title="Accessories"
        description="Maintenance kits and retail display solutions."
      />
      <section className="px-[6%] py-12" style={{ background: "var(--pd-light-bg)" }}>
        <ProductGrid products={ACCESSORIES_LIST} />
      </section>
    </div>
  );
}
