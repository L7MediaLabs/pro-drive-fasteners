import { createFileRoute, Link } from "@tanstack/react-router";
import ork6Pkg from "../assets/ork6_package.jpg.asset.json";
import ork6Pdf from "../assets/ork6_parts_diagram.pdf.asset.json";

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
  "MIII", "MIIFN", "MIIFS", "MIII886",
  "MIII812", "MFIII", "BTFP12569", "DWMIIIFN Type 0 & 1",
];

function Acc() {
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
                  Get Pricing →
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
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>What's Inside</div>
            <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 36, lineHeight: 1.1 }}>
              Every wear part, ready to install.
            </h2>
            <p className="mt-4" style={{ color: "var(--pd-muted)", fontSize: 15, lineHeight: 1.7 }}>
              The ORK-6 includes the full O-ring set, gaskets, bumpers, and small wear components that
              keep flooring tools driving cleanly through high-volume installs.
            </p>
            <a
              href={ork6Pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-btn-primary mt-6 inline-block"
              style={{ padding: "12px 22px", fontSize: 12 }}
            >
              ↓ Full Parts Diagram
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.08)" }}>
            {[
              { n: "O-Rings", d: "Complete sealing set" },
              { n: "Head Gaskets", d: "Reinforced fiber" },
              { n: "Driver Bumpers", d: "Energy-absorbing" },
              { n: "Trigger Valve Kit", d: "Bagged sub-assembly" },
              { n: "Cylinder Seals", d: "Pre-lubricated" },
              { n: "Small Hardware", d: "Pins, springs, clips" },
            ].map(item => (
              <div key={item.n} className="bg-white p-5">
                <div className="pd-label" style={{ color: "var(--pd-gold)", fontSize: 10 }}>Component</div>
                <div className="mt-1 font-bold" style={{ color: "var(--pd-dark)", fontSize: 15 }}>{item.n}</div>
                <div className="text-[12px] mt-1" style={{ color: "var(--pd-muted)" }}>{item.d}</div>
              </div>
            ))}
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
    </div>
  );
}
