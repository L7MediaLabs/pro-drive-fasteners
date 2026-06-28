import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ProductGrid } from "../components/ProductCard";
import { LCLEATS_16, LCLEATS_18 } from "../data/products";
import { images } from "../data/images";

export const Route = createFileRoute("/l-cleats")({
  head: () => ({
    meta: [
      { title: "L-Cleats | Pro-Drive Fasteners®" },
      { name: "description", content: "16 GA and 18 GA L-Cleats for hardwood and maple flooring. Guaranteed not to jam in any major brand of tool." },
      { property: "og:title", content: "L-Cleats — Pro-Drive Fasteners®" },
      { property: "og:description", content: "Precision-formed 16 GA and 18 GA L-Cleats. Guaranteed not to jam." },
      { property: "og:image", content: images.lCleats.banner },
      { property: "twitter:image", content: images.lCleats.banner },
    ],
  }),
  component: LCleats,
});

type Gauge = "16" | "18";

const gaugeData: Record<Gauge, {
  label: string;
  tagline: string;
  masterpack: string;
  innerpack: string;
  products: typeof LCLEATS_16;
  spec: { k: string; v: string }[];
}> = {
  "16": {
    label: "16 Gauge",
    tagline: "Heavy-duty hold for solid hardwood — 1-1/2\", 1-3/4\", and 2\" lengths.",
    masterpack: images.lCleats.masterpack16,
    innerpack: images.lCleats.innerpack16,
    products: LCLEATS_16,
    spec: [
      { k: "Gauge", v: "16" },
      { k: "Lengths", v: '1-1/2" · 1-3/4" · 2"' },
      { k: "Pack", v: "1,000 ct × 5 boxes" },
      { k: "Application", v: "3/4\" Solid Hardwood" },
    ],
  },
  "18": {
    label: "18 Gauge",
    tagline: "Lighter-gauge cleats for thin-profile and engineered flooring.",
    masterpack: images.lCleats.masterpack18,
    innerpack: images.lCleats.innerpack18,
    products: LCLEATS_18,
    spec: [
      { k: "Gauge", v: "18" },
      { k: "Lengths", v: '1-1/4" · 1-1/2" · 1-3/4"' },
      { k: "Pack", v: "1,000 ct × 5 boxes" },
      { k: "Application", v: "Thin-Profile / Engineered" },
    ],
  },
};

function LCleats() {
  const [tab, setTab] = useState<Gauge>("16");
  const g = gaugeData[tab];

  return (
    <div>
      {/* HERO */}
      <section className="px-[6%] pt-20 pb-16 relative overflow-hidden" style={{ background: "var(--pd-dark)" }}>
        <img
          src={images.lCleats.hero}
          alt=""
          aria-hidden
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center", opacity: 0.28,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, rgba(15,15,15,0.88), rgba(15,15,15,0.55))",
          }}
        />
        <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Flooring Fasteners</div>
            <h1 className="pd-display text-white mt-3" style={{ fontSize: "clamp(40px, 7vw, 68px)", lineHeight: 1.02 }}>
              L-Cleats Engineered<br />Not To Jam.
            </h1>
            <p className="mt-5 text-white/70 max-w-xl" style={{ fontSize: 17, lineHeight: 1.6 }}>
              Precision-formed 16 GA and 18 GA L-Cleats for solid hardwood and engineered flooring.
              Guaranteed compatibility with every major brand of cleat nailer.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <div className="pd-glass-light px-4 py-2" style={{ fontSize: 12, color: "var(--pd-yellow)", letterSpacing: "0.12em", fontWeight: 700 }}>
                JAM-FREE GUARANTEE
              </div>
              <div className="pd-glass-light px-4 py-2" style={{ fontSize: 12, color: "#fff", letterSpacing: "0.12em", fontWeight: 700 }}>
                NWFA APPROVED
              </div>
              <div className="pd-glass-light px-4 py-2" style={{ fontSize: 12, color: "#fff", letterSpacing: "0.12em", fontWeight: 700 }}>
                E-G GALVANIZED
              </div>
            </div>
          </div>
          <div className="relative" style={{ aspectRatio: "4/5", maxHeight: 520 }}>
            <img
              src={images.lCleats.vertical}
              alt="Pro-Drive L-Cleat strip — vertical product detail"
              loading="eager"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                borderRadius: 4, boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </div>
      </section>

      {/* GAUGE TABS */}
      <div style={{ background: "var(--pd-darker)" }} className="px-[6%] flex gap-8 border-b border-white/5">
        {(["16", "18"] as const).map(k => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className="pd-label py-5"
            style={{
              color: tab === k ? "var(--pd-yellow)" : "rgba(255,255,255,0.45)",
              borderBottom: tab === k ? "2px solid var(--pd-yellow)" : "2px solid transparent",
              fontSize: 13,
              letterSpacing: "0.18em",
              fontWeight: 700,
            }}
          >
            {gaugeData[k].label}
          </button>
        ))}
      </div>

      {/* GAUGE DETAIL */}
      <section className="px-[6%] py-16" style={{ background: "var(--pd-light-bg)" }}>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          {/* Imagery column */}
          <div className="space-y-3">
            <div style={{ background: "#fff", padding: 16, borderTop: "3px solid var(--pd-yellow)" }}>
              <img
                src={g.masterpack}
                alt={`Pro-Drive ${g.label} L-Cleat masterpack`}
                loading="lazy"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div className="pd-label mt-3" style={{ color: "var(--pd-gold)", fontSize: 11 }}>Masterpack</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div style={{ background: "#fff", padding: 12 }}>
                <img src={g.innerpack} alt={`${g.label} inner pack`} loading="lazy" style={{ width: "100%", height: 180, objectFit: "cover" }} />
                <div className="pd-label mt-2" style={{ color: "var(--pd-muted)", fontSize: 10 }}>Inner Pack</div>
              </div>
              <div style={{ background: "#fff", padding: 12 }}>
                <img src={images.lCleats.standing} alt="L-Cleat standing detail" loading="lazy" style={{ width: "100%", height: 180, objectFit: "cover" }} />
                <div className="pd-label mt-2" style={{ color: "var(--pd-muted)", fontSize: 10 }}>Cleat Detail</div>
              </div>
            </div>
          </div>

          {/* Info + product grid */}
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>{g.label} L-Cleats</div>
            <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 38, lineHeight: 1.05 }}>
              {g.tagline}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-6" style={{ background: "rgba(0,0,0,0.08)" }}>
              {g.spec.map(s => (
                <div key={s.k} className="bg-white px-4 py-3">
                  <div className="pd-label" style={{ color: "var(--pd-muted)", fontSize: 10 }}>{s.k}</div>
                  <div className="font-bold mt-1" style={{ color: "var(--pd-dark)", fontSize: 13 }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <ProductGrid products={g.products} />
            </div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE BANNER */}
      <section className="relative overflow-hidden" style={{ height: 360 }}>
        <img
          src={images.lCleats.lifestyle}
          alt="L-Cleats installed in hardwood flooring"
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.45) 60%, rgba(15,15,15,0.15) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex items-center px-[6%]">
          <div className="max-w-xl">
            <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Built for the Job</div>
            <h3 className="pd-display text-white mt-3" style={{ fontSize: 36, lineHeight: 1.1 }}>
              Pro installers trust Pro-Drive.
            </h3>
            <p className="mt-4 text-white/75" style={{ fontSize: 15, lineHeight: 1.7 }}>
              Tight, consistent strips. Galvanized for corrosion resistance. Engineered to feed cleanly through every major brand of nailer — Bostitch, Powernail, Primatech, and more.
            </p>
            <Link to="/contact" className="pd-btn-primary mt-6 inline-block" style={{ padding: "12px 24px", fontSize: 12 }}>
              Request Pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* DEPTH GUIDE */}
      <section className="px-[6%] py-16" style={{ background: "var(--pd-light-bg)" }}>
        <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Reference</div>
        <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 36 }}>L-Cleat Depth Guide</h2>
        <p className="mt-2" style={{ color: "var(--pd-muted)" }}>Select the correct cleat length for your subfloor thickness.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-6" style={{ gap: 2 }}>
          {[
            { len: '2" L-Cleats (16 GA)', rows: ['Subfloor 5/8" → Clearance 3/4"', 'Subfloor 3/4" → Clearance 3/4"'] },
            { len: '1-3/4" L-Cleats (16 or 18 GA)', rows: ['1/2" → 31/32" + 3/4"', '9/16" → 29/32" + 3/4"', '5/8" → 7/8" + 3/4"', '3/4" → 13/16" + 3/4"'] },
            { len: '1-1/2" L-Cleats (16 or 18 GA)', rows: ['1/2" → 13/16" + 3/4"', '9/16" → 3/4" + 3/4"', '5/8" → 11/16" + 3/4"', '3/4" → 5/8" + 3/4"'] },
            { len: '1-1/4" L-Cleats (18 or 20 GA)', rows: ['5/16" → 3/4" + 3/4"', '3/8" → 11/16" + 3/4"', '1/2" → 5/8" + 3/4"'] },
          ].map(s => (
            <div key={s.len} className="bg-white p-5" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
              <div className="font-bold" style={{ color: "var(--pd-dark)", fontSize: 14 }}>{s.len}</div>
              <ul className="mt-3 space-y-1.5" style={{ fontSize: 12, color: "var(--pd-muted)", fontFamily: "ui-monospace, monospace" }}>
                {s.rows.map(r => <li key={r}>{r}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-white px-5 py-4 mt-6 text-sm" style={{ borderLeft: "3px solid var(--pd-yellow)" }}>
          Actual fastener depth can vary based on wood milling or tongue profile. This chart is for reference purposes only. Consult wood manufacturers or NWFA for correct fastener length before installation.
        </div>
      </section>
    </div>
  );
}
