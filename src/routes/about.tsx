import { createFileRoute } from "@tanstack/react-router";
import { images } from "../data/images";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Pro-Drive Fasteners®" },
      { name: "description", content: "Pro-Drive Fasteners® is a premier provider of top-quality products for the flooring industry — 50+ years of expertise." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="px-[6%] pt-12 pb-16 max-w-4xl">
        <h1 className="pd-display" style={{ fontSize: "clamp(38px, 7vw, 64px)", color: "var(--pd-dark)", lineHeight: 1.1 }}>
          About Pro-Drive
        </h1>
        <p className="mt-3 max-w-[560px]" style={{ color: "rgba(25,20,0,0.65)", fontSize: 15 }}>
          A premier provider of top-quality products for the flooring industry.
        </p>
        <p className="mt-10 text-lg" style={{ color: "var(--pd-text)", lineHeight: 1.8 }}>
          Pro-Drive Fasteners® is a family business. Founded by Hollis Henderson with his son Carlton, the company is built on more than 50 combined years of flooring industry expertise — selecting every material, setting every specification, and staying involved in every step of manufacturing. That's not a marketing line. It's how Pro-Drive has operated since day one.
        </p>
        <p className="mt-6 text-lg" style={{ color: "var(--pd-text)", lineHeight: 1.8 }}>
          Pro-Drive Fasteners® is a premier provider of top-quality products for the flooring industry. We deliver a complete line of installation solutions you can rely on — from staples, nails, and L-cleats to an ever-growing selection of sundry items.
        </p>
        <p className="mt-6 text-lg" style={{ color: "var(--pd-text)", lineHeight: 1.8 }}>
          Product development and exceptional quality are at the core of everything we do. The Pro-Drive Fasteners® team selects every material, sets all specifications, and is involved in every step of the manufacturing process to ensure our products not only meet standards but consistently exceed the demands of evolving industries.
        </p>
      </section>

      <section className="px-[6%] py-10" style={{ background: "var(--pd-yellow)" }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { v: "50+ Years", l: "In the Industry" },
            { v: "12+", l: "Product Lines" },
            { v: "Made in USA", l: "Mallets & Tools" },
            { v: "Guaranteed", l: "To Fit Major Brands" },
          ].map(s => (
            <div key={s.l}>
              <div className="pd-display" style={{ fontSize: 32, color: "var(--pd-dark)" }}>{s.v}</div>
              <div className="pd-label mt-1" style={{ color: "var(--pd-gold)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-[6%] py-20 text-center" style={{ background: "var(--pd-dark)" }}>
        <p className="pd-display text-white mx-auto max-w-4xl" style={{ fontSize: "clamp(28px, 4.5vw, 48px)", lineHeight: 1.15 }}>
          We don't follow trends — we set higher standards.<br />
          <span style={{ color: "var(--pd-yellow)" }}>Don't compromise. Drive performance with Pro-Drive Fasteners.</span>
        </p>
      </section>
    </div>
  );
}
