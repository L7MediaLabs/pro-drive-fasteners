import { createFileRoute } from "@tanstack/react-router";
import { Callout, InfoPanel, InterchangeList } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import {
  CinematicHero,
  TabNav,
  SpecCardGrid,
  SplitLayout,
  GalleryHero,
  GalleryPair,
  LifestyleBanner,
  TechReference,
  RelatedProducts,
  PageDisclaimers,
  useTabs,
} from "../components/editorial";
import {
  STAPLES_15_5, STAPLES_15_Q, STAPLES_16_N, STAPLES_18_M, STAPLES_18_L,
  pickRelated,
} from "../data/products";
import { images } from "../data/images";

export const Route = createFileRoute("/staples")({
  head: () => ({
    meta: [
      { title: "Flooring Staples | Pro-Drive Fasteners®" },
      { name: "description", content: "15.5 GA, 15 GA, 16 GA, and 18 GA flooring staples for hardwood, laminate, and engineered installations." },
      { property: "og:title", content: "Flooring Staples — Pro-Drive Fasteners®" },
      { property: "og:description", content: "Contractor-grade flooring staples in every gauge. Meets ASTM F1667." },
      { property: "og:image", content: images.staples.hero },
      { property: "twitter:image", content: images.staples.hero },
    ],
  }),
  component: Staples,
});

type TabKey = "155" | "15q" | "16n" | "18m" | "18l";

const MWIRE_TOOLS = "Duo-Fast W-1800;Josef Kihlberg G4450;Prebena G;Senco M;Spotnails 6800".split(";");
const LWIRE_TOOLS = "ATRO 90;BeA 90;Duo-Fast 1800;Prebena EB;Haubold KL 6000;Hitachi N3804;Porter Cable NS100;Porter Cable NS150A;Senco L;Spotnails 4800;JK 781".split(";");

const tabData = {
  "155": {
    label: "15.5 GA Hardwood",
    kicker: "15.5 GA Hardwood Flooring Staples",
    tagline: "Purpose-built for hardwood flooring — chisel point reduces splitting.",
    products: STAPLES_15_5,
    specs: [
      { k: "Gauge", v: "15.5" },
      { k: "Crown", v: '1/2"' },
      { k: "Lengths", v: '1-1/2" · 1-3/4" · 2"' },
      { k: "Application", v: "Hardwood Flooring" },
    ],
    galleryHero: { src: images.staples.gauge155a, caption: "Masterpack" },
    galleryPair: [
      { src: images.staples.gauge155b, caption: "1-1/2\" Length" },
      { src: images.staples.hero, caption: "Bulk Pack" },
    ],
  },
  "15q": {
    label: "15 GA Q-Wire",
    kicker: "15 GA Q-Wire Staples — 7/16\" Crown",
    tagline: "Framing, sheathing, roof decking, and furniture frames.",
    products: STAPLES_15_Q,
    specs: [
      { k: "Gauge", v: "15" },
      { k: "Crown", v: '7/16"' },
      { k: "Lengths", v: '2" · 2-1/2"' },
      { k: "Application", v: "Framing · Sheathing · Pallets" },
    ],
    galleryHero: { src: images.staples.gauge15Banner, caption: "Q-Wire Strip" },
    galleryPair: [
      { src: images.staples.gauge15Vertical, caption: "Standing Detail" },
      { src: images.staples.gauge15Banner, caption: "Collated" },
    ],
  },
  "16n": {
    label: "16 GA N-Wire",
    kicker: "16 GA N-Wire Staples — 7/16\" Crown",
    tagline: "Cabinet sub-assembly, millwork, and door jambs.",
    products: STAPLES_16_N,
    specs: [
      { k: "Gauge", v: "16" },
      { k: "Crown", v: '7/16"' },
      { k: "Lengths", v: '3/4" – 2"' },
      { k: "Application", v: "Cabinets · Millwork · Furniture" },
    ],
    galleryHero: { src: images.staples.gauge15Banner, caption: "N-Wire Strip" },
    galleryPair: [],
  },
  "18m": {
    label: "18 GA M-Wire",
    kicker: "18 GA M-Wire Staples — 3/8\" Crown",
    tagline: "Insulation, plastic sheeting, Tyvek, roofing paper, house wrap.",
    products: STAPLES_18_M,
    specs: [
      { k: "Gauge", v: "18" },
      { k: "Crown", v: '3/8"' },
      { k: "Lengths", v: '5/8" – 1-1/4"' },
      { k: "Application", v: "Insulation · House Wrap · Tyvek" },
    ],
    galleryHero: { src: images.staples.gauge15Banner, caption: "M-Wire Strip" },
    galleryPair: [],
  },
  "18l": {
    label: "18 GA L-Wire",
    kicker: "18 GA L-Wire Staples — 1/4\" Crown (Duo-Fast 1800)",
    tagline: "Cabinets, drawers, case backs, upholstery, engineered flooring.",
    products: STAPLES_18_L,
    specs: [
      { k: "Gauge", v: "18" },
      { k: "Crown", v: '1/4"' },
      { k: "Lengths", v: '3/4" – 1-1/2"' },
      { k: "Application", v: "Trim · Cabinets · Engineered Flooring" },
    ],
    galleryHero: { src: images.staples.gauge15Vertical, caption: "L-Wire Strip" },
    galleryPair: [],
  },
} as const;

// Depth chart data — R22 pg. 5. 15.5 GA staples embedded in 3/4" tongue-and-groove.
type StapleSpec = { crown: string; crownMm: string; pen: string };
type StapleGroup = { len: string; lenIn: number; items: StapleSpec[] };

const depthChart: StapleGroup[] = [
  {
    len: '2" Staples',
    lenIn: 2.0,
    items: [
      { crown: '5/8"', crownMm: "16mm", pen: '1-1/16"' },
      { crown: '3/4"', crownMm: "19mm", pen: '1"' },
    ],
  },
  {
    len: '1-3/4" Staples',
    lenIn: 1.75,
    items: [
      { crown: '1/2"',  crownMm: "12mm", pen: '31/32"' },
      { crown: '9/16"', crownMm: "14mm", pen: '29/32"' },
      { crown: '5/8"',  crownMm: "16mm", pen: '7/8"' },
      { crown: '3/4"',  crownMm: "19mm", pen: '13/16"' },
    ],
  },
  {
    len: '1-1/2" Staples',
    lenIn: 1.5,
    items: [
      { crown: '3/8"',  crownMm: "10mm", pen: '7/8"' },
      { crown: '1/2"',  crownMm: "12mm", pen: '13/16"' },
      { crown: '9/16"', crownMm: "14mm", pen: '3/4"' },
      { crown: '5/8"',  crownMm: "16mm", pen: '11/16"' },
      { crown: '3/4"',  crownMm: "19mm", pen: '5/8"' },
    ],
  },
];

const TONGUE = '3/4"';
const TONGUE_IN = 0.75;

// Parse fractional inch strings — "1-1/16", "31/32", "5/8", "3/4"
function toDec(input: string): number {
  const s = input.replace(/"/g, "").trim();
  if (s.includes("-")) {
    const [w, f] = s.split("-");
    const [n, d] = f.split("/").map(Number);
    return Number(w) + n / d;
  }
  if (s.includes("/")) {
    const [n, d] = s.split("/").map(Number);
    return n / d;
  }
  return Number(s);
}

// Shared scale — every diagram uses the same pixels-per-inch, so cross-card
// comparison is meaningful (tongue height, penetration depth, staple length).
const PPI = 60;
const WOOD_H = TONGUE_IN * PPI;   // 45px — 3/4" tongue
const CROWN_H = 18;                // top brown strip (visual only)
const LEFT_PAD = 14;
const RIGHT_GUTTER = 46;           // reserves space for the tongue arrow
const WOOD_W = 130;                // fixed wood block width for the whole chart
// Max staple horizontal run: 2" staple w/ 1" pen = sqrt(4-1)=1.73"·60 ≈ 104px.
// The 2" staple w/ 1-1/16" pen tip drops ~1.06"·60 ≈ 64px past the wood top,
// so the below-wood extension needs to fit the longest penetration case.
const MAX_PEN_PX = 1.0625 * PPI;   // 63.75px
const BELOW_WOOD = Math.max(0, MAX_PEN_PX - WOOD_H); // ~19px
const VB_W = LEFT_PAD + WOOD_W + RIGHT_GUTTER;
const VB_H = CROWN_H + WOOD_H + BELOW_WOOD + 14;

// SVG diagram of one staple embedded in a 3/4" tongue-and-groove floor cross-section.
// All geometry is scaled from real dimensions so diagrams are visually comparable.
function StapleDepthDiagram({
  spec,
  uid,
  stapleLenIn,
}: {
  spec: StapleSpec;
  uid: string;
  stapleLenIn: number;
}) {
  const penIn = toDec(spec.pen);
  const penPx = penIn * PPI;
  const stapleLenPx = stapleLenIn * PPI;
  // Right triangle: staple length² = horizontal run² + penetration²
  const horizRun = Math.sqrt(Math.max(0, stapleLenPx ** 2 - penPx ** 2));

  const woodTop = CROWN_H;
  const woodBottom = woodTop + WOOD_H;

  // Staple enters at the top of the wood, near the left edge, and travels
  // down-right by (horizRun, penPx). If horizRun overflows WOOD_W, cap the
  // entry point so the tip lands inside the reserved wood width.
  const stapleX1 = Math.min(LEFT_PAD + 8 + horizRun, LEFT_PAD + WOOD_W - 14);
  const stapleX0 = stapleX1 - horizRun;
  const stapleY0 = woodTop;
  const stapleY1 = woodTop + penPx;

  const penArrowX = stapleX1 + 10;
  const tongueArrowX = LEFT_PAD + WOOD_W + 12;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width="100%"
      style={{ display: "block" }}
      aria-hidden
    >
      <defs>
        <pattern id={`grain-${uid}`} width="60" height="14" patternUnits="userSpaceOnUse">
          <line x1="0" y1="7" x2="60" y2="7" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" strokeDasharray="10 4 4 4 6 6" />
        </pattern>
      </defs>

      {/* Crown / top strip (brown board top) */}
      <rect x={LEFT_PAD} y="0" width={WOOD_W} height={CROWN_H} fill="#5C4128" />
      {/* Groove notch on the left */}
      <rect x={LEFT_PAD} y={CROWN_H * 0.35} width="4" height={CROWN_H * 0.55} fill="#F5F4EE" />
      {/* Crown size label */}
      <text
        x={LEFT_PAD + 8}
        y={CROWN_H * 0.7}
        fill="#fff"
        fontFamily="Assistant, sans-serif"
        fontWeight="800"
        fontSize="10"
      >
        {spec.crown}
      </text>
      <text
        x={LEFT_PAD + 8}
        y={CROWN_H * 0.7}
        dx={spec.crown.length * 6.2 + 6}
        fill="rgba(255,255,255,0.75)"
        fontFamily="Assistant, sans-serif"
        fontWeight="600"
        fontSize="7.5"
      >
        ({spec.crownMm})
      </text>

      {/* Wood body — always 3/4" tall (shared scale) */}
      <rect x={LEFT_PAD} y={woodTop} width={WOOD_W} height={WOOD_H} fill="#D9C89F" />
      <rect x={LEFT_PAD} y={woodTop} width={WOOD_W} height={WOOD_H} fill={`url(#grain-${uid})`} />
      {[0.22, 0.48, 0.72].map(f => (
        <line
          key={f}
          x1={LEFT_PAD}
          y1={woodTop + WOOD_H * f}
          x2={LEFT_PAD + WOOD_W}
          y2={woodTop + WOOD_H * f}
          stroke="rgba(0,0,0,0.14)"
          strokeWidth="0.5"
          strokeDasharray="12 5 4 6"
        />
      ))}

      {/* Staple shank — length + angle are true to scale */}
      <line
        x1={stapleX0}
        y1={stapleY0}
        x2={stapleX1}
        y2={stapleY1}
        stroke="#B8B8BE"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1={stapleX0}
        y1={stapleY0}
        x2={stapleX1}
        y2={stapleY1}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="0.5"
      />
      {/* Chisel point at the tip */}
      <polygon
        points={`${stapleX1 - 2.5},${stapleY1 - 3} ${stapleX1 + 3.5},${stapleY1 + 1.2} ${stapleX1 - 1},${stapleY1 + 2.5}`}
        fill="#1a1a1a"
      />

      {/* Penetration arrow — from wood top down to the staple tip (true depth) */}
      <line x1={penArrowX} y1={woodTop + 1} x2={penArrowX} y2={stapleY1} stroke="#1a1a1a" strokeWidth="1" />
      <polygon points={`${penArrowX},${woodTop + 1} ${penArrowX - 3},${woodTop + 7} ${penArrowX + 3},${woodTop + 7}`} fill="#1a1a1a" />
      <polygon points={`${penArrowX},${stapleY1} ${penArrowX - 3},${stapleY1 - 6} ${penArrowX + 3},${stapleY1 - 6}`} fill="#1a1a1a" />
      <text
        x={penArrowX + 5}
        y={(woodTop + stapleY1) / 2 + 4}
        fill="#1a1a1a"
        fontFamily="Assistant, sans-serif"
        fontWeight="800"
        fontSize="10"
      >
        {spec.pen}
      </text>

      {/* Tongue (3/4") reference arrow — same length on every card */}
      <line x1={tongueArrowX} y1={woodTop} x2={tongueArrowX} y2={woodBottom} stroke="#1a1a1a" strokeWidth="1" />
      <polygon points={`${tongueArrowX},${woodTop} ${tongueArrowX - 3},${woodTop + 6} ${tongueArrowX + 3},${woodTop + 6}`} fill="#1a1a1a" />
      <polygon points={`${tongueArrowX},${woodBottom} ${tongueArrowX - 3},${woodBottom - 6} ${tongueArrowX + 3},${woodBottom - 6}`} fill="#1a1a1a" />
      <text
        x={tongueArrowX + 6}
        y={(woodTop + woodBottom) / 2 + 4}
        fill="#1a1a1a"
        fontFamily="Assistant, sans-serif"
        fontWeight="800"
        fontSize="10"
      >
        {TONGUE}
      </text>
    </svg>
  );
}



function Staples() {
  const [tab, setTab] = useTabs<TabKey>("155");
  const g = tabData[tab];

  const allShownIds = [
    ...STAPLES_15_5, ...STAPLES_15_Q, ...STAPLES_16_N, ...STAPLES_18_M, ...STAPLES_18_L,
  ].map(p => p.id);
  const related = pickRelated(allShownIds, 6);

  return (
    <div>
      <CinematicHero
        kicker="Flooring Fasteners"
        title={<>Flooring Staples.<br />Every Gauge. Every Job.</>}
        description="Medium crown and specialty staples engineered for hardwood, laminate, and engineered flooring — plus framing, cabinetry, insulation, and upholstery."
        bgImage={images.staples.hero}
        badges={[
          { label: "CONTRACTOR GRADE" },
          { label: "MEETS ASTM F1667" },
          { label: "E-G GALVANIZED" },
        ]}
        rightImage={images.staples.s155_masterpack}
        rightImageAlt="Pro-Drive 15.5 GA hardwood flooring staples masterpack"
      />

      <TabNav
        tabs={(Object.keys(tabData) as TabKey[]).map(k => ({ key: k, label: tabData[k].label }))}
        value={tab}
        onChange={setTab}
      />

      <section className="px-[6%] py-16" style={{ background: "var(--pd-light-bg)" }}>
        <SplitLayout
          gallery={
            <>
              <GalleryHero src={g.galleryHero.src} alt={g.kicker} caption={g.galleryHero.caption} />
              {g.galleryPair.length > 0 && (
                <GalleryPair items={g.galleryPair.map(x => ({ src: x.src, alt: g.kicker, caption: x.caption }))} />
              )}
            </>
          }
        >
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>{g.label}</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 34, lineHeight: 1.1 }}>
            {g.tagline}
          </h2>
          <div className="mt-6">
            <SpecCardGrid specs={[...g.specs]} />
          </div>
          <div className="mt-8">
            <ProductGrid products={g.products} />
          </div>

          {/* Per-tab supplementary panels */}
          {tab === "155" && (
            <>
              <Callout>Guaranteed to fit all standard 15.5 gauge flooring tools. Chisel point reduces splitting. Contractor Bulk-Job or Job packs available.</Callout>
              <InfoPanel
                applications="Excellent for all types of hardwood flooring installations."
                materials="Electro-Galvanized steel. Not recommended for exterior application or ACQ-treated lumber."
                standards="Meets ASTM F1667."
              />
            </>
          )}
          {tab === "15q" && (
            <>
              <Callout>Senco® Style. Ideal for framing, sheathing, roof decking, and furniture frames. Meets or exceeds ASTM A641.</Callout>
              <InterchangeList
                fitsPrimary="Senco SQS55, FASCO F45C SQ-55 SS(CT), F5 SQ-65 CT, SQS55XP; Spotnail MS6564; Duo-Fast MS-1580D"
                tools={["BeA 180", "Duo-Fast 1500", "Senco Q-Wire", "Spotnail"]}
              />
            </>
          )}
          {tab === "16n" && (
            <InfoPanel
              applications="Furniture Frames, Cabinet Sub-Assembly, Millwork, Door Jambs."
              standards="Meets or Exceeds ASTM A641."
            />
          )}
          {tab === "18m" && (
            <>
              <InfoPanel applications="Cabinet assembly, insulation, plastic sheeting, Tyvek, roofing paper, house wrap.">
                <div><strong style={{ color: "var(--pd-dark)" }}>Note:</strong> Made from Extra Hard Wire. Not compatible with Arrow T50 series.</div>
              </InfoPanel>
              <InterchangeList tools={MWIRE_TOOLS} />
            </>
          )}
          {tab === "18l" && (
            <>
              <InfoPanel applications="Finish and trim staples for cabinets, drawers, case backs, upholstery, soffits, underlayment, lattice, insulation sheathing, engineered flooring." />
              <InterchangeList tools={LWIRE_TOOLS} />
            </>
          )}
        </SplitLayout>
      </section>

      <LifestyleBanner
        image={images.staples.hero}
        kicker="Field Tested"
        title="Trusted by flooring pros from day one."
        body="Consistent collation. Clean drives. Guaranteed compatibility across every major staple tool. Order by the box or bulk-job pack for job-site economy."
      />

      <TechReference
        kicker="Reference"
        title="Staple Subfloor Depth Chart"
        intro="Select the correct 15.5 GA staple length and crown width for your subfloor thickness. All penetration and tongue-clearance figures from Pro-Drive R22 spec sheet."
        footnote="Actual fastener depth can vary based on wood milling or tongue profile. This chart is for reference purposes only. Consult wood manufacturers or NWFA for correct fastener length before installation."
      >
        <div className="space-y-8">
          {depthChart.map(group => (
            <div key={group.len}>
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className="pd-display" style={{ color: "var(--pd-dark)", fontSize: 22, lineHeight: 1 }}>
                  {group.len}
                </h3>
                <span className="pd-label" style={{ color: "var(--pd-gold)", fontSize: 11 }}>15.5 Gauge</span>
                <span
                  aria-hidden
                  className="flex-1"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", transform: "translateY(-4px)" }}
                />
              </div>
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: `repeat(auto-fill, minmax(220px, 260px))` }}
              >
                {group.items.map(spec => (
                  <div
                    key={`${group.len}-${spec.crown}`}
                    className="bg-white"
                    style={{
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderTop: "2px solid var(--pd-yellow)",
                      padding: "12px 12px 10px",
                    }}
                  >
                    <StapleDepthDiagram spec={spec} uid={`${group.len.replace(/\W+/g, "")}-${spec.crown.replace(/\W+/g, "")}`} />
                    <div
                      className="mt-2 pt-2 flex items-center justify-between"
                      style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      <span
                        style={{
                          fontFamily: "ui-monospace, monospace",
                          fontSize: 10,
                          color: "var(--pd-muted)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {spec.crown} crown
                      </span>
                      <span
                        style={{
                          fontFamily: "ui-monospace, monospace",
                          fontSize: 10,
                          color: "var(--pd-dark)",
                          fontWeight: 700,
                        }}
                      >
                        {spec.pen} pen · {TONGUE} tongue
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TechReference>


      <RelatedProducts products={related} />
      <PageDisclaimers galvanized trademarks />
    </div>
  );
}

