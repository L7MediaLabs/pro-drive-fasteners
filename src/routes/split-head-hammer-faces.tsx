import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Callout } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import { SPLIT_HEAD } from "../data/products";

export const Route = createFileRoute("/split-head-hammer-faces")({
  head: () => ({
    meta: [
      { title: "Split Head Hammer Faces | Pro-Drive Fasteners®" },
      { name: "description", content: "Non-marring rubber replacement faces for Garland® split-head mallets. 1-1/2\" and 2\" sizes." },
    ],
  }),
  component: SplitHead,
});

function SplitHead() {
  return (
    <div>
      <PageHeader
        breadcrumb="Split Head Hammer Faces"
        title="Split Head Hammer Faces"
        description="Non-marring rubber replacement faces for Garland® split-head mallets."
      />
      <section className="px-[6%] py-12" style={{ background: "var(--pd-light-bg)" }}>
        <ProductGrid products={SPLIT_HEAD} />
        <Callout>Replacement caps only — mallets not included. Designed for Garland® split-head mallets. Easy to install. Durable for pre-finished and unfinished wood. NON-MARRING.</Callout>
      </section>
    </div>
  );
}
