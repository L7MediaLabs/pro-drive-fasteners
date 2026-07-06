import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout, InfoPanel } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import {
  CinematicHero,
  TabNav,
  LifestyleBanner,
  TechReference,
  RelatedProducts,
  PageDisclaimers,
  useTabs,
} from "../components/editorial";
import { MALLETS, MALLET_CAPS, POLY_FACES, DEAD_BLOW, pickRelated } from "../data/products";
import { images } from "../data/images";

export const Route = createFileRoute("/mallets")({
  head: () => ({
    meta: [
      { title: "Mallets & Caps | Pro-Drive Fasteners®" },
      { name: "description", content: "Mallets made in the USA from 100% premium hickory. Urethane striking faces, poly caps, and dead-blow options." },
      { property: "og:title", content: "Mallets & Caps — Pro-Drive Fasteners®" },
      { property: "og:description", content: "Built to last. Built in the USA. Patented SURE 2 LOCK™ and E-Z 2CAP® designs." },
      { property: "og:image", content: images.mallets.hero },
      { property: "twitter:image", content: images.mallets.hero },
    ],
  }),
  component: Mallets,
});

type TabKey = "mallets" | "caps" | "poly" | "deadblow";

const hardnessScale = [
  { color: "#F08A30", label: "Soft",      note: "Delicate assembly, soft materials" },
  { color: "#6B4E2E", label: "Soft/Med",  note: "General woodworking, trim" },
  { color: "#4FA85F", label: "Medium",    note: "Everyday flooring installation" },
  { color: "#C83228", label: "Hard",      note: "Dense hardwoods, tapping blocks" },
  { color: "#111",    label: "Tough",     note: "Heavy-duty demolition strikes" },
];

// Mallet comparison data
const malletCompare = [
  { model: "M1W",   handle: '15"', headOz: 41.6, cartons: 8,  bar: 0.72 }, // 2.6 lbs
  { model: "M5W",   handle: '15"', headOz: 51.2, cartons: 8,  bar: 0.89 }, // 3.2 lbs
  { model: "V-CAP", handle: '15"', headOz: 24.0, cartons: 12, bar: 0.42 }, // 24 oz
  { model: "DHW",   handle: '15"', headOz: 52.8, cartons: 8,  bar: 0.92 }, // 3.3 lbs
  { model: "R5W",   handle: '15"', headOz: 44.8, cartons: 8,  bar: 0.78 }, // 2.8 lbs
];

function Mallets() {
  const [tab, setTab] = useTabs<TabKey>("mallets");
  const allIds = [...MALLETS, ...MALLET_CAPS, ...POLY_FACES, ...DEAD_BLOW].map(p => p.id);
  const related = pickRelated(allIds, 6);

  return (
    <div>
      <CinematicHero
        kicker="Mallets & Striking Tools"
        title={<>Built to Last.<br />Built in the USA.</>}
        description="100% premium American hickory. Patented SURE 2 LOCK™ head design virtually eliminates handle loosening. Trusted by professionals who can't afford to stop."
        bgImage={images.mallets.hero}
        badges={[
          { label: "MADE IN USA" },
          { label: "PATENTED SURE 2 LOCK™" },
          { label: "PREMIUM HICKORY" },
        ]}
        rightImage={images.mallets.lineup}
        rightImageAlt="Pro-Drive mallet family"
      />

      <TabNav
        tabs={[
          { key: "mallets",  label: "Mallets" },
          { key: "caps",     label: "Mallet Caps" },
          { key: "poly",     label: "Poly Striking Faces" },
          { key: "deadblow", label: "Dead Blow" },
        ]}
        value={tab}
        onChange={setTab}
      />

      <section className="px-[6%] py-14" style={{ background: "var(--pd-light-bg)" }}>
        {tab === "mallets" && (
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Mallets</div>
            <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 34 }}>Premium American Hickory.</h2>
            <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-6 items-start">
              <ProductGrid products={MALLETS} />
              <div className="bg-white p-4" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
                <img
                  src={images.mallets.lineup}
                  alt="Pro-Drive mallet lineup"
                  loading="lazy"
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
                <div className="pd-label mt-3" style={{ color: "var(--pd-gold)" }}>Mallet Family</div>
              </div>
            </div>
            <Callout><strong>PATENTED SURE 2 LOCK™</strong> head design virtually eliminates loosening of handle — even after years of use. Epoxy-filled handle attached with steel safety wedge.</Callout>
            <InfoPanel>
              <div>Made in the USA from 100% premium hickory. Six-ring easy-grip pattern with flared handle provides slip resistance. Epoxy-filled handle attached with steel safety wedge. <strong>U.S. Patent No. 11,759,941.</strong></div>
            </InfoPanel>
          </div>
        )}

        {tab === "caps" && (
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Mallet Caps (Rubber)</div>
            <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 34 }}>Change caps in 30 seconds.</h2>
            <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-6 items-start">
              <ProductGrid products={MALLET_CAPS} />
              <div className="bg-white p-4" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
                <img
                  src={images.mallets.capsLineup}
                  alt="Pro-Drive Mallet Caps lineup"
                  loading="lazy"
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
                <div className="pd-label mt-3" style={{ color: "var(--pd-gold)" }}>Cap Lineup</div>
              </div>
            </div>
            <Callout><strong>E-Z 2CAP®</strong> — caps installed or removed in 30 seconds or less. PATENTED DESIGN.</Callout>
            <InfoPanel>
              <div>Heavy-duty chrome-plated steel retention ring. Guaranteed to fit all major brands of rubber flooring mallets — or your money back. <strong>U.S. Patent No. 11,370,097</strong>.</div>
              <div><strong style={{ color: "var(--pd-dark)" }}>Pro-Angle™ cap:</strong> Designed for engineered flooring with improved edge-clearance contact for faster installation.</div>
            </InfoPanel>
          </div>
        )}

        {tab === "poly" && (
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Urethane Striking Faces</div>
            <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 34 }}>Five hardness grades. One thread.</h2>
            <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-6 items-start">
              <ProductGrid products={POLY_FACES} />
              <div className="bg-white p-4" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
                <img
                  src={images.mallets.polyColors}
                  alt="Pro-Drive Urethane Striking Faces — hardness colors"
                  loading="lazy"
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
                <div className="pd-label mt-3" style={{ color: "var(--pd-gold)" }}>5 Hardness Colors</div>
              </div>
            </div>
            <Callout>5 colors denoting hardness. Guaranteed to fit leading brands with 3/8" x 16 standard thread. Free counter display with purchase of 16 Poly Striking Faces.</Callout>
            <InfoPanel>
              <div>Ideal replacement for 2″ poly faces. Unaffected by liquids, solvents, and lubricants. Will not damage, mar, or dent. <strong>Made in the USA.</strong></div>
            </InfoPanel>
          </div>
        )}

        {tab === "deadblow" && (
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Poly Dead Blow Mallet</div>
            <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 34 }}>Steel-shot force. Zero rebound.</h2>
            <div className="mt-6"><ProductGrid products={DEAD_BLOW} /></div>
            <Callout>Only 2.2 lbs. Head cavity partially filled with steel shot for greater striking force. Increases productivity, reduces installer fatigue.</Callout>
            <InfoPanel>
              <div>Head cavity partially filled with steel shot for greater striking force. Face absorbs a portion of blow energy, reducing rebound. 100% premium hickory handle. <strong>U.S. Patent No. 11,759,941.</strong></div>
            </InfoPanel>
          </div>
        )}
      </section>

      <LifestyleBanner
        image={images.mallets.family}
        kicker="Patented Design"
        title="Replace caps in 30 seconds."
        body="The E-Z 2CAP® patented design uses a chrome-plated steel retention ring — no glue, no wrenches. Swap between rubber cap and poly striking face on the same handle in seconds."
      />

      <TechReference
        kicker="Reference"
        title="Mallet Comparison"
        intro="All Pro-Drive mallets share a 15-inch premium hickory handle. Head weight and carton counts vary by model."
      >
        <div className="bg-white p-6" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
          <div className="grid grid-cols-[80px_1fr_80px_80px] gap-4 pb-3 mb-3 pd-label" style={{ color: "var(--pd-muted)", fontSize: 10, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <div>Model</div>
            <div>Head Weight</div>
            <div style={{ textAlign: "right" }}>Handle</div>
            <div style={{ textAlign: "right" }}>Carton</div>
          </div>
          <div className="space-y-3">
            {malletCompare.map(m => (
              <div key={m.model} className="grid grid-cols-[80px_1fr_80px_80px] gap-4 items-center">
                <div className="font-bold" style={{ color: "var(--pd-dark)", fontSize: 14 }}>{m.model}</div>
                <div>
                  <div style={{ background: "#f0efe8", height: 18, position: "relative" }}>
                    <div
                      style={{
                        width: `${m.bar * 100}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, var(--pd-yellow), #E5B800)",
                      }}
                    />
                  </div>
                  <div className="mt-1" style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--pd-muted)" }}>
                    {m.headOz} oz
                  </div>
                </div>
                <div className="text-right" style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "var(--pd-dark)" }}>{m.handle}</div>
                <div className="text-right" style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "var(--pd-dark)" }}>{m.cartons}</div>
              </div>
            ))}
          </div>
        </div>
      </TechReference>

      <TechReference
        kicker="Hardness Guide"
        title="Poly Striking Face Hardness Scale"
        intro="Choose the right durometer for your material. Softer faces protect delicate assemblies; harder faces transfer maximum energy for dense hardwoods."
      >
        <div className="space-y-2">
          {hardnessScale.map((h, i) => {
            const pct = ((i + 1) / hardnessScale.length) * 100;
            return (
              <div key={h.label} className="bg-white grid grid-cols-[110px_1fr_1.2fr] items-center gap-4 p-4" style={{ borderLeft: `4px solid ${h.color}` }}>
                <div className="flex items-center gap-2">
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: h.color, display: "inline-block", flexShrink: 0 }} />
                  <span className="font-bold" style={{ fontSize: 13, color: "var(--pd-dark)" }}>{h.label}</span>
                </div>
                <div style={{ background: "#f0efe8", height: 12 }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: h.color }} />
                </div>
                <div style={{ fontSize: 12, color: "var(--pd-muted)" }}>{h.note}</div>
              </div>
            );
          })}
        </div>
      </TechReference>

      <RelatedProducts products={related} />
      <PageDisclaimers trademarks />
    </div>
  );
}
