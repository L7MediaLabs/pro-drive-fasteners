import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "../data/images";

export const Route = createFileRoute("/air-tools")({
  head: () => ({
    meta: [
      { title: "Air Tools & Hoses | Pro-Drive Fasteners®" },
      { name: "description", content: "Professional-grade 16 GA and 18 GA brad nailers, E-Z Connect® braided air hoses, and industrial brass fittings." },
      { property: "og:title", content: "Air Tools & Hoses — Pro-Drive Fasteners®" },
      { property: "og:description", content: "Contractor-grade nailers, hoses, and fittings engineered for daily jobsite use." },
      { property: "og:image", content: images.airTools.hoseGroup },
      { property: "twitter:image", content: images.airTools.hoseGroup },
    ],
  }),
  component: AirTools,
});

const nailers = [
  {
    id: "BRAD16",
    name: "16 GA Brad Nailer",
    image: images.airTools.brad16,
    accent: "#3B5BA8",
    specs: ["100 brad capacity", "1\" – 2-1/2\" range", "70–110 PSI", "4.19 lbs · 10.7\" × 2.8\" × 11.1\""],
    blurb: "Heavy-duty 16 GA nailer for trim, casing, and crown molding. Drives 1\" to 2-1/2\" brads.",
  },
  {
    id: "BRAD18",
    name: "18 GA Brad Nailer",
    image: images.airTools.brad18,
    accent: "#D43D2E",
    specs: ["110 brad capacity", "5/8\" – 2\" range", "70–110 PSI", "3.06 lbs · 9.7\" × 2.4\" × 9.9\""],
    blurb: "Lightweight 18 GA brad nailer for finish work, paneling, and detail trim.",
  },
];

const hoses = [
  {
    id: "AIR-PVC-YELLOW-50",
    name: "Super-Flex Air Hose",
    color: "Yellow",
    swatch: "#FFCD00",
    bg: "linear-gradient(135deg, rgba(255,205,0,0.10), rgba(255,205,0,0.02))",
    border: "rgba(255,205,0,0.35)",
    length: "50 ft",
    psi: "300 PSI",
    image: images.airTools.hoseYellow50,
    badge: "Contractor Grade",
    bullets: ["35% lighter than rubber", "Flexible at extreme cold temps", "Oil · abrasion · heat resistant"],
  },
  {
    id: "BLUE-AIR250-50",
    name: "E-Z Connect® Hose",
    color: "Blue · 50 ft",
    swatch: "#2D8AC8",
    bg: "linear-gradient(135deg, rgba(45,138,200,0.10), rgba(45,138,200,0.02))",
    border: "rgba(45,138,200,0.35)",
    length: "50 ft",
    psi: "200 PSI",
    image: images.airTools.hoseBlue50,
    badge: "Professional Grade",
    bullets: ["50% lighter than rubber", "Reusable fittings", "6-ball industrial couplers"],
  },
  {
    id: "RED-AIR250-50R",
    name: "E-Z Connect® Hose",
    color: "Red · 50 ft",
    swatch: "#D43D2E",
    bg: "linear-gradient(135deg, rgba(212,61,46,0.10), rgba(212,61,46,0.02))",
    border: "rgba(212,61,46,0.35)",
    length: "50 ft",
    psi: "200 PSI",
    image: images.airTools.hoseRed50,
    badge: "Professional Grade",
    bullets: ["50% lighter than rubber", "Reusable fittings", "6-ball industrial couplers"],
  },
  {
    id: "BLUE-AIR250-100",
    name: "E-Z Connect® Hose",
    color: "Blue · 100 ft",
    swatch: "#2D8AC8",
    bg: "linear-gradient(135deg, rgba(45,138,200,0.10), rgba(45,138,200,0.02))",
    border: "rgba(45,138,200,0.35)",
    length: "100 ft",
    psi: "200 PSI",
    image: images.airTools.hoseBlue100,
    badge: "Professional Grade",
    bullets: ["50% lighter than rubber", "Reusable fittings", "6-ball industrial couplers"],
  },
];

const fittings = [
  {
    id: "AIR-MP20M",
    name: 'Industrial 6-Ball Coupler',
    sub: '1/4" NPT Male',
    image: images.airTools.fittingCh1414,
    pack: "10 per bag",
  },
  {
    id: "AIR-MIC20F",
    name: "Quick Coupler Nipple",
    sub: '1/4" NPT Female · Brass',
    image: images.airTools.fittingFe14,
    pack: "10 per bag",
  },
  {
    id: "AIR-UCB1414",
    name: 'Brass Hose Splicer',
    sub: '3/8" × 1/4" · Reusable',
    image: images.airTools.fittingCh1414,
    pack: "10 per bag",
  },
  {
    id: "AIR-SW-MP20M",
    name: "360° Swivel Nipple",
    sub: '1/4" NPT Male',
    image: images.airTools.fittingFe14,
    pack: "10 per bag",
  },
];

function AirTools() {
  return (
    <div>
      {/* HERO */}
      <section className="px-[6%] pt-20 pb-16 relative overflow-hidden" style={{ background: "var(--pd-dark)" }}>
        <img
          src={images.airTools.hoseGroup}
          alt=""
          aria-hidden
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center right", opacity: 0.32,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, rgba(15,15,15,0.92), rgba(15,15,15,0.55) 70%, rgba(15,15,15,0.2))",
          }}
        />
        <div className="relative z-10 max-w-3xl">
          <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Pneumatic System</div>
          <h1 className="pd-display text-white mt-3" style={{ fontSize: "clamp(40px, 7vw, 68px)", lineHeight: 1.02 }}>
            Air Tools<br />Built for the Trade.
          </h1>
          <p className="mt-5 text-white/70" style={{ fontSize: 17, lineHeight: 1.6, maxWidth: 620 }}>
            Contractor-grade nailers, color-coded braided hoses, and industrial brass fittings.
            Engineered together for daily jobsite use — no leaks, no kinks, no downtime.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            {["6-BALL COUPLERS", "REUSABLE FITTINGS", "−40°F TO 140°F"].map(t => (
              <div key={t} className="pd-glass-light px-4 py-2" style={{ fontSize: 12, color: "#fff", letterSpacing: "0.12em", fontWeight: 700 }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NAILERS */}
      <section className="px-[6%] py-16" style={{ background: "var(--pd-light-bg)" }}>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>01 — Brad Nailers</div>
            <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 38 }}>Pro-Drive Brad Nailers</h2>
          </div>
          <p style={{ color: "var(--pd-muted)", maxWidth: 420, fontSize: 14, lineHeight: 1.6 }}>
            Two gauges, every finish job. Tool-free depth adjust, sequential or bump fire, and a no-mar nose.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {nailers.map(n => (
            <article key={n.id} className="bg-white overflow-hidden" style={{ borderTop: `3px solid ${n.accent}`, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div className="relative" style={{ background: "#f8f8f6", padding: 32, height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={n.image} alt={`Pro-Drive ${n.name}`} loading="lazy" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                <span className="pd-label absolute top-4 left-4" style={{ background: n.accent, color: "#fff", padding: "4px 10px", fontSize: 10, letterSpacing: "0.15em" }}>{n.id}</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold" style={{ color: "var(--pd-dark)", fontSize: 22 }}>{n.name}</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--pd-muted)", lineHeight: 1.6 }}>{n.blurb}</p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-4 text-[12px]" style={{ color: "var(--pd-dark)" }}>
                  {n.specs.map(s => <li key={s} className="flex gap-2"><span style={{ color: n.accent }}>—</span>{s}</li>)}
                </ul>
                <Link to="/contact" className="pd-btn-primary mt-5 inline-block" style={{ padding: "10px 22px", fontSize: 11, width: "100%", textAlign: "center" }}>Get Pricing →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* HOSES */}
      <section className="px-[6%] py-16 relative overflow-hidden" style={{ background: "var(--pd-darker)" }}>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>02 — E-Z Connect® Air Hoses</div>
            <h2 className="pd-display text-white mt-2" style={{ fontSize: 38 }}>Color-Coded for Every Crew.</h2>
            <p className="mt-3 text-white/60 max-w-2xl" style={{ fontSize: 15, lineHeight: 1.7 }}>
              50% lighter than rubber. Kink-resistant. Oil and heat resistant. Field-repairable with reusable fittings — pick a color for each operator and stop the tangle.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {hoses.map(h => (
            <article
              key={h.id}
              className="flex flex-col"
              style={{ background: h.bg, border: `1px solid ${h.border}`, borderTop: `3px solid ${h.swatch}` }}
            >
              <div style={{ background: "#fff", padding: 16, height: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={h.image} alt={`Pro-Drive ${h.name} ${h.color}`} loading="lazy" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: "50%", background: h.swatch }} />
                  <span className="pd-label" style={{ color: "rgba(255,205,0,0.6)", fontSize: 10 }}>{h.badge}</span>
                </div>
                <h3 className="text-white mt-2" style={{ fontWeight: 800, fontSize: 17 }}>{h.name}</h3>
                <div className="text-white/60 text-sm mt-0.5">{h.color}</div>
                <div className="flex gap-4 mt-3 text-[11px]" style={{ color: "var(--pd-yellow)", letterSpacing: "0.1em", fontWeight: 700 }}>
                  <span>{h.length}</span>
                  <span>·</span>
                  <span>{h.psi}</span>
                </div>
                <ul className="mt-3 space-y-1 text-[12px] text-white/65">
                  {h.bullets.map(b => <li key={b}>— {b}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 pd-glass-light px-5 py-4 text-sm text-white/75 flex items-center gap-3 flex-wrap" style={{ borderLeft: "3px solid var(--pd-yellow)" }}>
          <span className="pd-label" style={{ color: "var(--pd-yellow)", fontSize: 11 }}>SPEC</span>
          1/4" ID · 3/8" OD · Operating range −40°F to 140°F · 6-ball industrial-grade couplers throughout the line.
        </div>
      </section>

      {/* FITTINGS */}
      <section className="px-[6%] py-16" style={{ background: "var(--pd-light-bg)" }}>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>03 — Fittings & Couplers</div>
            <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 38 }}>Solid Brass. Sold By the Bag.</h2>
          </div>
          <p style={{ color: "var(--pd-muted)", maxWidth: 420, fontSize: 14, lineHeight: 1.6 }}>
            Industrial-grade brass fittings packaged in contractor-friendly 10-counts. Mix and match across the Pro-Drive line.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {fittings.map(f => (
            <article key={f.id} className="bg-white flex flex-col" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
              <div style={{ background: "#fafaf7", padding: 24, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={f.image} alt={`Pro-Drive ${f.name}`} loading="lazy" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="pd-label" style={{ color: "var(--pd-gold)", fontSize: 10 }}>{f.id}</div>
                <h3 className="mt-1 font-bold" style={{ color: "var(--pd-dark)", fontSize: 15, lineHeight: 1.3 }}>{f.name}</h3>
                <div className="text-[12px] mt-1" style={{ color: "var(--pd-muted)" }}>{f.sub}</div>
                <div className="mt-auto pt-3 text-[12px] font-semibold" style={{ color: "var(--pd-dark)" }}>{f.pack}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="px-[6%] py-12" style={{ background: "var(--pd-dark)" }}>
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Build Your Kit</div>
            <h3 className="pd-display text-white mt-2" style={{ fontSize: 28 }}>Nailer + hose + fittings, priced for the crew.</h3>
          </div>
          <Link to="/contact" className="pd-btn-primary" style={{ padding: "14px 28px", fontSize: 12 }}>Request Pricing →</Link>
        </div>
      </section>
    </div>
  );
}
