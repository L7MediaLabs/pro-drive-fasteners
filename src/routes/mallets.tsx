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

const polyGuide = [
  { id: "POLY01-ORG", color: "#F08A30", name: "Orange", firmness: "Soft, flexible, and forgiving",     like: "Soft rubber sneaker sole",         thread: '3/8" 16 Thread Bolt' },
  { id: "POLY01-GRE", color: "#4FA85F", name: "Green",  firmness: "Firm but still pliable",             like: "Soft cruiser-style skateboard wheel", thread: '3/8" 16 Thread Bolt' },
  { id: "POLY01-BRO", color: "#6B4E2E", name: "Brown",  firmness: "A balanced, medium-firm feel",       like: "Harder work-boot soles",           thread: '3/8" 16 Thread Bolt' },
  { id: "POLY01-RED", color: "#C83228", name: "Red",    firmness: "Hard and durable — minimal flex",    like: "Shopping cart wheel",              thread: '3/8" 16 Thread Bolt' },
  { id: "POLY01-BLK", color: "#111",    name: "Black",  firmness: "Very firm — maximum durability",     like: "Inline skate wheel",               thread: '3/8" 16 Thread Bolt' },
];

// Mallet comparison data
const malletCompare = [
  { model: "M1W",   handle: '15"', headOz: 41.6, lbs: 2.6, cartons: 8,  bar: 0.72 },
  { model: "M5W",   handle: '15"', headOz: 51.2, lbs: 3.2, cartons: 8,  bar: 0.89 },
  { model: "V-CAP", handle: '15"', headOz: 24.0, lbs: 1.5, cartons: 12, bar: 0.42 },
  { model: "DHW",   handle: '15"', headOz: 52.8, lbs: 3.3, cartons: 8,  bar: 0.92 },
  { model: "R5W",   handle: '15"', headOz: 44.8, lbs: 2.8, cartons: 8,  bar: 0.78 },
];

const steps = [
  "Position cap on mallet head",
  "Press down firmly",
  "Twist to lock",
  "Secured — ready to work",
];

function Check({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
        <circle cx="9" cy="9" r="9" fill="var(--pd-dark)" />
        <path d="M5 9l2.5 2.5L13 6" stroke="var(--pd-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 14, lineHeight: 1.5, color: "var(--pd-dark)" }}>{children}</span>
    </div>
  );
}

function EZ2CapBanner() {
  return (
    <section style={{ background: "var(--pd-yellow)" }} className="my-8">
      <div className="px-[6%] py-12">
        {/* Headline */}
        <h2 className="pd-display" style={{ color: "var(--pd-dark)", fontSize: 32 }}>
          E-Z 2CAP<sup style={{ fontSize: 14, verticalAlign: "super" }}>®</sup> patented feature
        </h2>
        <p className="mt-2" style={{ color: "var(--pd-dark)", fontSize: 16, opacity: 0.9 }}>
          Patented design makes our caps easier &amp; faster to install!
        </p>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 mt-8 items-start">
          {/* Left column */}
          <div>
            {/* 4-Step Visual Strip */}
            <div className="flex items-start gap-0 mb-8">
              {steps.map((label, i) => (
                <div key={i} className="flex-1 flex flex-col items-center text-center relative">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "var(--pd-dark)",
                      color: "var(--pd-yellow)",
                      fontWeight: 700,
                      fontSize: 15,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                    }}
                  >
                    {i + 1}
                  </div>
                  {/* connecting line */}
                  {i < steps.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        top: 18,
                        left: "50%",
                        width: "100%",
                        height: 2,
                        background: "var(--pd-dark)",
                        opacity: 0.25,
                        zIndex: 1,
                      }}
                    />
                  )}
                  <div className="mt-3 px-1" style={{ fontSize: 12, lineHeight: 1.35, color: "var(--pd-dark)", fontWeight: 600 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Selling points */}
            <div className="space-y-3">
              <Check>Universal application for Unfinished and Pre-Finished flooring installations</Check>
              <Check>Non-marring, premium rubber available in White, Gray, Black, or White Pro-Angle™</Check>
            </div>

            {/* Patent badge */}
            <div
              className="inline-block mt-6 px-3 py-1.5"
              style={{
                border: "1.5px solid var(--pd-dark)",
                borderRadius: 4,
                fontSize: 11,
                fontWeight: 600,
                color: "var(--pd-dark)",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              U.S. Patent No. 11,370,097
            </div>
          </div>

          {/* Right column — stat + guarantee */}
          <div className="flex flex-col gap-6">
            {/* 30 seconds stat */}
            <div
              className="p-6 text-center"
              style={{
                background: "var(--pd-dark)",
                borderRadius: 6,
              }}
            >
              <div className="flex items-baseline justify-center gap-2">
                <span className="pd-display" style={{ color: "var(--pd-yellow)", fontSize: 64, lineHeight: 1 }}>30</span>
                <span style={{ color: "var(--pd-yellow)", fontWeight: 700, fontSize: 18 }}>seconds</span>
              </div>
              <p className="mt-2" style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>
                Caps removed &amp; installed in 30 seconds or less!
              </p>
            </div>

            {/* Guarantee badge */}
            <div
              className="p-5"
              style={{
                background: "rgba(0,0,0,0.06)",
                borderRadius: 6,
                borderLeft: "4px solid var(--pd-dark)",
              }}
            >
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--pd-dark)", fontWeight: 600 }}>
                Pro-Drive Fasteners<sup>®</sup> E-Z 2CAP<sup>®</sup> mallet caps will fit all major brands of rubber flooring mallets. <span style={{ textDecoration: "underline", fontWeight: 700 }}>GUARANTEED.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
            <EZ2CapBanner />
            <Callout><strong>E-Z 2CAP®</strong> — caps installed or removed in 30 seconds or less. PATENTED DESIGN.</Callout>
            <InfoPanel>
              <div>Heavy-duty chrome-plated steel retention ring. Guaranteed to fit all major brands of rubber flooring mallets — or your money back. <strong>U.S. Patent No. 11,370,097</strong>.</div>
              <div><strong style={{ color: "var(--pd-dark)" }}>Pro-Angle™ cap:</strong> Designed for engineered flooring with improved edge-clearance contact for faster installation.</div>
              <div>Plus fits all major brands.</div>
              <div>We are the only manufacturer who blends our own rubber compound, allowing us to provide the highest quality at the most affordable price.</div>
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
                    {m.headOz} oz ({m.lbs} lbs)
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
        title="Polyurethane Strike Face Tips User Guide"
        intro="Choose the right durometer for your material. Softer faces protect delicate assemblies; harder faces transfer maximum energy for dense hardwoods."
      >
        <div className="bg-white overflow-hidden" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
          <div
            className="grid gap-4 px-5 py-3 pd-label"
            style={{
              gridTemplateColumns: "1.2fr 0.8fr 1.5fr 1.5fr 1.2fr",
              color: "var(--pd-muted)",
              fontSize: 10,
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              background: "#F5F4F0",
            }}
          >
            <div>Item ID</div>
            <div>Color Code</div>
            <div>Firmness</div>
            <div>Like This Item</div>
            <div>Industry Standard Thread</div>
          </div>
          {polyGuide.map((r) => (
            <div
              key={r.id}
              className="grid gap-4 items-center px-5 py-4"
              style={{
                gridTemplateColumns: "1.2fr 0.8fr 1.5fr 1.5fr 1.2fr",
                borderLeft: `4px solid ${r.color}`,
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                fontSize: 13,
                color: "var(--pd-dark)",
              }}
            >
              <div style={{ fontFamily: "ui-monospace, monospace", fontWeight: 700, fontSize: 12 }}>{r.id}</div>
              <div className="flex items-center gap-2">
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: r.color, display: "inline-block", flexShrink: 0, border: "1px solid rgba(0,0,0,0.1)" }} />
                <span style={{ fontWeight: 700 }}>{r.name}</span>
              </div>
              <div style={{ color: "var(--pd-text)" }}>{r.firmness}</div>
              <div style={{ color: "var(--pd-muted)" }}>{r.like}</div>
              <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "var(--pd-text)" }}>{r.thread}</div>
            </div>
          ))}
        </div>
      </TechReference>

      <RelatedProducts products={related} />
      <PageDisclaimers trademarks />
    </div>
  );
}
