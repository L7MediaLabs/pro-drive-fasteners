import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";

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
      <PageHeader title="About Pro-Drive" description="A premier provider of top-quality products for the flooring industry." />
      <section className="px-[6%] py-16 max-w-4xl">
        <p className="text-lg" style={{ color: "var(--pd-text)", lineHeight: 1.8 }}>
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
