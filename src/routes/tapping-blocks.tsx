import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import { TAPPING_BLOCKS } from "../data/products";

export const Route = createFileRoute("/tapping-blocks")({
  head: () => ({
    meta: [
      { title: "Tapping Blocks | Pro-Drive Fasteners®" },
      { name: "description", content: "Heavy-duty tapping blocks for every flooring requirement. ONE TAP™, 561 Tapping Block, Wide Plank Wood Driving Tool." },
    ],
  }),
  component: Blocks,
});

function Blocks() {
  return (
    <div>
      <PageHeader
        breadcrumb="Tapping Blocks"
        title="Tapping Blocks"
        description="Heavy-duty tapping blocks for every flooring requirement. From standard installation to wide plank glue-down."
      />
      <section className="px-[6%] py-12" style={{ background: "var(--pd-light-bg)" }}>
        <ProductGrid products={TAPPING_BLOCKS} />
      </section>
    </div>
  );
}
