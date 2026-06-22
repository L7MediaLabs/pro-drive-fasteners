import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Products | Pro-Drive Fasteners®" },
      { name: "description", content: "Complete Pro-Drive product line — staples, L-Cleats, brads, mallets, tapping tools, air tools, and accessories." },
    ],
  }),
  component: AllProducts,
});

const cats = [
  { code: "CAT-01", name: "Flooring Staples", desc: "15.5 GA, 15 GA, 16 GA, and 18 GA staples.", to: "/staples" },
  { code: "CAT-02", name: "L-Cleats", desc: "16 GA and 18 GA L-Cleats with depth guide.", to: "/l-cleats" },
  { code: "CAT-03", name: "Brads & Finish Nails", desc: "15/16/18 GA finish nails and 23 GA micro pins.", to: "/brads-finish-nails" },
  { code: "CAT-04", name: "Divergent Staples", desc: "Pad, carpet, stair tread, and specialty staples.", to: "/divergent-staples" },
  { code: "CAT-05", name: "Mallets & Caps", desc: "Mallets, urethane striking faces, dead blow options.", to: "/mallets" },
  { code: "CAT-06", name: "Split Head Hammer Faces", desc: "Non-marring replacement faces for Garland® mallets.", to: "/split-head-hammer-faces" },
  { code: "CAT-07", name: "Tapping Rings", desc: "Red, Orange, Yellow tapping rings.", to: "/tapping-rings" },
  { code: "CAT-08", name: "Tapping Blocks", desc: "Heavy-duty blocks including ONE TAP™.", to: "/tapping-blocks" },
  { code: "CAT-09", name: "Tipper-De-Tipper™", desc: "Safe cap replacement system.", to: "/tipper-de-tipper" },
  { code: "CAT-10", name: "Air Tools & Hoses", desc: "Brad nailers, braided hoses, and fittings.", to: "/air-tools" },
  { code: "CAT-11", name: "Accessories", desc: "Maintenance kits and retail displays.", to: "/accessories" },
];

function AllProducts() {
  return (
    <div>
      <header style={{ background: "var(--pd-yellow)" }} className="px-[6%] pt-12 pb-10">
        <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Catalog</div>
        <h1 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: "clamp(38px, 7vw, 64px)" }}>All Products</h1>
        <p className="mt-3 max-w-[560px]" style={{ color: "rgba(25,20,0,0.65)", fontSize: 15 }}>
          Browse the complete Pro-Drive line of fasteners, installation tools, and equipment.
        </p>
      </header>
      <section className="px-[6%] py-12" style={{ background: "var(--pd-light-bg)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 2 }}>
          {cats.map(c => (
            <Link key={c.code} to={c.to} className="bg-white block" style={{ borderLeft: "4px solid var(--pd-yellow)", padding: "28px 24px" }}>
              <div className="pd-label" style={{ color: "rgba(0,0,0,0.3)", letterSpacing: "0.15em" }}>{c.code}</div>
              <div className="mt-1" style={{ fontWeight: 800, fontSize: 20, color: "var(--pd-dark)" }}>{c.name}</div>
              <p className="mt-1.5" style={{ fontSize: 13, color: "var(--pd-muted)", lineHeight: 1.65 }}>{c.desc}</p>
              <div className="pd-label mt-4" style={{ color: "var(--pd-gold)", fontSize: 10 }}>View →</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
