import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import { TAPPING_BLOCKS } from "../data/products";
import { images } from "../data/images";

export const Route = createFileRoute("/tapping-blocks")({
  head: () => ({
    meta: [
      { title: "Tapping Blocks | Pro-Drive Fasteners®" },
      { name: "description", content: "Heavy-duty tapping blocks for every flooring requirement. ONE TAP™, 561 Tapping Block, Wide Plank Wood Driving Tool." },
      { property: "og:image", content: images.tappingBlocks.lifestyle },
      { property: "twitter:image", content: images.tappingBlocks.lifestyle },
    ],
  }),
  component: Blocks,
});

const featured = [
  { id: "TB-PRO-312", title: "ONE TAP™ Tapping Block", image: images.tappingBlocks.tbPro, alt: "Pro-Drive One Tap Tapping Block TB-PRO-312" },
  { id: "561-TB", title: "561 Tapping Block", image: images.tappingBlocks.lifestyle, alt: "Pro-Drive 561 Tapping Block in use" },
  { id: "392-TB", title: "Wide Plank Wood Driving Tool", image: images.tappingBlocks.lifestyle, alt: "Pro-Drive Wide Plank Wood Driving Tool" },
];

function Blocks() {
  return (
    <div>
      <PageHeader
        breadcrumb="Tapping Blocks"
        title="Tapping Blocks"
        description="Heavy-duty tapping blocks for every flooring requirement. From standard installation to wide plank glue-down."
        bgImage={images.tappingBlocks.lifestyle}
      />
      <section className="px-[6%] py-12" style={{ background: "var(--pd-light-bg)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {featured.map(f => (
            <div key={f.id} className="bg-white flex flex-col" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
              <div style={{ background: "#F5F4F0", height: 220, display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
                <img src={f.image} alt={f.alt} loading="lazy" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
              </div>
              <div className="p-4">
                <div className="pd-label" style={{ color: "var(--pd-gold)" }}>{f.id}</div>
                <div className="mt-1 font-bold" style={{ color: "var(--pd-dark)" }}>{f.title}</div>
              </div>
            </div>
          ))}
        </div>
        <ProductGrid products={TAPPING_BLOCKS} />
      </section>
    </div>
  );
}
