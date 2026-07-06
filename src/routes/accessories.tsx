import { createFileRoute, Link } from "@tanstack/react-router";
import ork6Pkg from "../assets/ork6_package.jpg.asset.json";
import ork6Pdf from "../assets/ork6_parts_diagram.pdf.asset.json";
import { RelatedProducts, PageDisclaimers } from "../components/editorial";
import { ACCESSORIES_LIST, pickRelated } from "../data/products";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories | Pro-Drive Fasteners®" },
      { name: "description", content: "ORK-6 Maintenance Kit for MIII staplers, nailers & cleat tools. Mallet displays and Pro-Drive merchandising solutions." },
      { property: "og:title", content: "Accessories — Pro-Drive Fasteners®" },
      { property: "og:description", content: "ORK-6 Maintenance Kit and retail display solutions." },
      { property: "og:image", content: ork6Pkg.url },
      { property: "twitter:image", content: ork6Pkg.url },
    ],
  }),
  component: Acc,
});

const compatibility = [
  "MIII", "MIIIFN", "MIIIFS", "MIII886",
  "MIII812", "MFIII", "BTFP12569", "DWMIIIFN Type 0 & 1",
];

function Acc() {
  const related = pickRelated(ACCESSORIES_LIST.map(p => p.id), 6);
  return (
    <div>
      {/* HERO + ORK-6 FEATURE */}
      <section className="px-[6%] pt-20 pb-20 relative overflow-hidden" style={{ background: "var(--pd-dark)" }}>
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 80% 30%, rgba(255,205,0,0.08), transparent 55%)",
          }}
        />
        <div className="relative z-10">
          <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Accessories</div>
          <h1 className="pd-display text-white mt-3" style={{ fontSize: "clamp(40px, 7vw, 64px)", lineHeight: 1.02 }}>
            Keep Tools Running.<br />Keep Crews Working.
          </h1>
          <p className="mt-5 text-white/65 max-w-2xl" style={{ fontSize: 17, lineHeight: 1.6 }}>
            Maintenance kits engineered for the most common flooring tools, plus merchandising hardware
            that puts the Pro-Drive line front and center in your store.
          </p>

          {/* ORK-6 hero card */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 mt-12 items-center">
            <div className="relative" style={{ background: "#fff", padding: 32, borderTop: "3px solid var(--pd-yellow)" }}>
              <img
                src={ork6Pkg.url}
                alt="Pro-Drive ORK-6 Maintenance Kit retail package"
                loading="eager"
                style={{ width: "100%", height: "auto", display: "block", maxHeight: 560, objectFit: "contain", margin: "0 auto" }}
              />
              <div className="pd-label absolute top-4 left-4" style={{ background: "var(--pd-yellow)", color: "var(--pd-dark)", padding: "6px 12px", fontSize: 11, letterSpacing: "0.15em", fontWeight: 800 }}>
                MADE IN THE USA
              </div>
            </div>
            <div>
              <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>ORK6-KIT-B</div>
              <h2 className="pd-display text-white mt-2" style={{ fontSize: 42, lineHeight: 1.05 }}>
                ORK-6 Maintenance Kit
              </h2>
              <div className="text-white/70 mt-3" style={{ fontSize: 16, lineHeight: 1.6 }}>
                Complete O-ring and gasket kit for MIII staplers, nailers, and cleat tools. Everything a
                contractor needs to rebuild the most common Bostitch-pattern flooring tools — sold in
                contractor-ready retail packaging.
              </div>

              <div className="grid grid-cols-3 gap-px mt-6" style={{ background: "rgba(255,255,255,0.08)" }}>
                {[
                  { k: "Pack", v: "20 / Case" },
                  { k: "Grade", v: "Contractor" },
                  { k: "Origin", v: "USA" },
                ].map(s => (
                  <div key={s.k} className="px-4 py-3" style={{ background: "var(--pd-darker)" }}>
                    <div className="pd-label" style={{ color: "rgba(255,205,0,0.5)", fontSize: 10 }}>{s.k}</div>
                    <div className="text-white font-bold mt-1" style={{ fontSize: 14 }}>{s.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="pd-label" style={{ color: "rgba(255,205,0,0.6)", fontSize: 11 }}>Tool Compatibility</div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {compatibility.map(c => (
                    <span key={c} className="pd-glass-light px-3 py-1.5" style={{ fontSize: 11, color: "#fff", letterSpacing: "0.06em", fontWeight: 600 }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-7 flex-wrap">
                <Link to="/contact" className="pd-btn-primary" style={{ padding: "12px 22px", fontSize: 12 }}>
                  Request Distributor Pricing →
                </Link>
                <a
                  href={ork6Pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-glass-light"
                  style={{
                    padding: "12px 22px", fontSize: 12, color: "#fff",
                    letterSpacing: "0.12em", fontWeight: 700, textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 8,
                  }}
                >
                  ↓ Parts Diagram (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="px-[6%] py-16" style={{ background: "var(--pd-light-bg)" }}>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div className="max-w-xl">
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>What's Inside</div>
            <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 36, lineHeight: 1.1 }}>
              Every wear part, ready to install.
            </h2>
            <p className="mt-4" style={{ color: "var(--pd-muted)", fontSize: 15, lineHeight: 1.7 }}>
              The ORK-6 includes the full O-ring set and both piston gaskets — shown to scale below.
              Screws and washers are also in the kit but not pictured.
            </p>
          </div>
          <a
            href={ork6Pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pd-btn-primary"
            style={{ padding: "12px 22px", fontSize: 12 }}
          >
            ↓ Full Parts Diagram (PDF)
          </a>
        </div>

        <div className="bg-white p-8 md:p-12" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
          <ORK6PartsDiagram />
          <div className="mt-8 pt-6 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="pd-label" style={{ color: "var(--pd-gold)", fontSize: 10 }}>
              Items shown to scale · Screws and washers not pictured
            </div>
            <div className="pd-label" style={{ color: "var(--pd-dark)", fontSize: 10 }}>
              ORK6-KIT-B · Pro-Drive Fasteners®
            </div>
          </div>
        </div>
      </section>

      {/* DISPLAYS */}
      <section className="px-[6%] py-16" style={{ background: "var(--pd-darker)" }}>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Retail Merchandising</div>
            <h2 className="pd-display text-white mt-2" style={{ fontSize: 36 }}>Display Solutions</h2>
          </div>
          <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 460, fontSize: 14, lineHeight: 1.7 }}>
            Purpose-built fixtures for showcasing the Pro-Drive line at retail. Contact sales for availability and lead times.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <article className="pd-glass-light p-6" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
            <div className="pd-label" style={{ color: "var(--pd-yellow)", fontSize: 11 }}>MALLET-DISP</div>
            <h3 className="text-white mt-2 font-bold" style={{ fontSize: 20 }}>Mallet Display</h3>
            <p className="text-white/65 mt-2 text-sm leading-relaxed">
              Branded floor display that merchandises the full Pro-Drive mallet line. Holds up to 8 mallets in a compact, retail-friendly footprint.
            </p>
            <div className="flex gap-4 mt-4 text-[11px]" style={{ color: "var(--pd-yellow)", letterSpacing: "0.1em", fontWeight: 700 }}>
              <span>HOLDS 8 MALLETS</span>
              <span>·</span>
              <span>BRANDED FIXTURE</span>
            </div>
            <Link to="/contact" className="pd-btn-primary mt-5 inline-block" style={{ padding: "10px 20px", fontSize: 11 }}>
              Contact Sales →
            </Link>
          </article>
          <article className="pd-glass-light p-6" style={{ borderTop: "3px solid rgba(255,205,0,0.4)" }}>
            <div className="pd-label" style={{ color: "rgba(255,205,0,0.6)", fontSize: 11 }}>Custom</div>
            <h3 className="text-white mt-2 font-bold" style={{ fontSize: 20 }}>Custom POP & Co-Branded Fixtures</h3>
            <p className="text-white/65 mt-2 text-sm leading-relaxed">
              Working on a flagship distributor program or a regional rollout? Our team builds custom point-of-purchase displays
              and co-branded merchandising to fit your floor plan.
            </p>
            <Link to="/contact" className="pd-btn-primary mt-5 inline-block" style={{ padding: "10px 20px", fontSize: 11 }}>
              Start a Conversation →
            </Link>
          </article>
        </div>
      </section>

      <RelatedProducts products={related} />
      <PageDisclaimers trademarks />
    </div>
  );
}

/* ---------- ORK-6 Parts Diagram (to-scale vector recreation) ---------- */

function Ring({ cx, cy, outer, stroke }: { cx: number; cy: number; outer: number; stroke: number }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={outer - stroke / 2}
      fill="none"
      stroke="var(--pd-dark)"
      strokeWidth={stroke}
    />
  );
}

function PartLabel({
  x,
  y,
  title,
  code,
  sub,
}: {
  x: number;
  y: number;
  title: React.ReactNode;
  code: string;
  sub?: string;
}) {
  return (
    <g textAnchor="middle" style={{ fontFamily: "'Gotham Bold', system-ui, sans-serif" }}>
      <text x={x} y={y} fontSize={22} fill="var(--pd-dark)" fontWeight={600}>
        {title}
      </text>
      {sub && (
        <text x={x} y={y + 26} fontSize={20} fill="var(--pd-dark)" fontWeight={600}>
          {sub}
        </text>
      )}
      <text x={x} y={y + (sub ? 58 : 32)} fontSize={26} fill="var(--pd-dark)" fontWeight={800}>
        {code}
      </text>
    </g>
  );
}

function ORK6PartsDiagram() {
  return (
    <svg
      viewBox="0 0 1600 1150"
      role="img"
      aria-label="ORK-6 Maintenance Kit — parts diagram shown to scale"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* LEFT COLUMN — O-rings */}
      {/* 86460 Poppet Piston O-ring */}
      <Ring cx={270} cy={230} outer={170} stroke={22} />
      <PartLabel x={270} y={455} title="POPPET PISTON O-RING" code="86460" />

      {/* 850143 Poppet I.D. O-ring */}
      <Ring cx={555} cy={295} outer={62} stroke={14} />
      <PartLabel x={555} y={410} title="POPPET" sub="I.D. O-RING" code="850143" />

      {/* 86458 Plunger Internal */}
      <Ring cx={555} cy={555} outer={68} stroke={14} />
      <PartLabel x={555} y={680} title="PLUNGER" sub="O-RING (INTERNAL)" code="86458" />

      {/* 850626 Piston O-ring — largest */}
      <Ring cx={270} cy={720} outer={190} stroke={24} />
      <PartLabel x={270} y={960} title="PISTON O-RING" code="850626" />

      {/* Note block */}
      <g textAnchor="middle" style={{ fontFamily: "'Gotham Bold', system-ui, sans-serif", fontStyle: "italic" }}>
        <text x={555} y={880} fontSize={20} fill="var(--pd-dark)" fontWeight={700}>ITEMS ARE SHOWN</text>
        <text x={555} y={906} fontSize={20} fill="var(--pd-dark)" fontWeight={700}>TO SCALE. SCREWS AND</text>
        <text x={555} y={932} fontSize={20} fill="var(--pd-dark)" fontWeight={700}>WASHERS NOT PICTURED.</text>
      </g>

      {/* RIGHT COLUMN — Gaskets + more O-rings */}

      {/* #6500 BIG gasket — keyhole / teardrop shape */}
      {/*
         Composite: large upper circle + tapered neck + smaller lower stem with rounded end
         drawn as a single filled path, then punched holes.
      */}
      <g>
        <path
          d={`
            M 1000 90
            C 1130 90, 1220 200, 1220 320
            C 1220 430, 1150 495, 1080 520
            L 1075 640
            C 1075 685, 1060 705, 1035 715
            L 1000 725
            L 965 715
            C 940 705, 925 685, 925 640
            L 920 520
            C 850 495, 780 430, 780 320
            C 780 200, 870 90, 1000 90 Z
          `}
          fill="var(--pd-dark)"
        />
        {/* mounting holes (white punch-outs) */}
        <circle cx={870} cy={175} r={18} fill="#fff" />
        <circle cx={1130} cy={175} r={18} fill="#fff" />
        <circle cx={870} cy={470} r={16} fill="#fff" />
        <circle cx={1130} cy={470} r={16} fill="#fff" />
        {/* elongated bottom slot */}
        <rect x={985} y={640} width={30} height={70} rx={15} fill="#fff" />
      </g>
      <PartLabel x={1000} y={790} title="GASKET" code="#6500 BIG" />

      {/* #6500 SMALL gasket — round flange with center hole and 3 outer holes */}
      <g>
        <circle cx={1400} cy={340} r={130} fill="var(--pd-dark)" />
        <circle cx={1400} cy={340} r={50} fill="#fff" />
        <circle cx={1400} cy={230} r={16} fill="#fff" />
        <circle cx={1305} cy={395} r={16} fill="#fff" />
        <circle cx={1495} cy={395} r={16} fill="#fff" />
      </g>
      <PartLabel x={1400} y={545} title="GASKET" code="#6500 SMALL" />

      {/* 88998 Piloted Valve O-ring (lower) x2 */}
      <Ring cx={1050} cy={870} outer={95} stroke={16} />
      <PartLabel x={1050} y={1010} title="PILOTED VALVE" sub="O-RING (LOWER) × 2" code="88998" />

      {/* 85144 Plunger External */}
      <Ring cx={1400} cy={870} outer={95} stroke={16} />
      <PartLabel x={1400} y={1010} title="PLUNGER" sub="O-RING (EXTERNAL)" code="85144" />
    </svg>
  );
}

