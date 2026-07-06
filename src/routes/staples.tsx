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


// ─── Generic Senco-style U-staple technical drawing ────────────────────────
// Full staple drawn true to scale. Crown width and every leg-length tick
// share the same pixels-per-inch so all variants read comparably.
type StapleLenTick = { in: number; label: string; mm: string };

function SencoStapleDiagram({
  crownIn,
  crownLabel,
  lengths,
  ppi = 70,
  labelFontSize = 12,
}: {
  crownIn: number;
  crownLabel: string;
  lengths: StapleLenTick[];
  ppi?: number;
  labelFontSize?: number;
}) {
  const LENGTHS = [...lengths].sort((a, b) => a.in - b.in);
  const maxLen = LENGTHS[LENGTHS.length - 1].in;

  const crownPx = crownIn * ppi;
  const legMaxPx = maxLen * ppi;
  const legStroke = 4;
  const wireR = legStroke / 2;

  const SIDE_LABEL_W = 78;
  const TICK_LEN = 10;
  const CROWN_LABEL_H = 32;
  const TOP_PAD = 8;
  const BOTTOM_PAD = 14;

  const stapleW = crownPx + legStroke;
  const cx = SIDE_LABEL_W + TICK_LEN + stapleW / 2;
  const stapleTop = TOP_PAD + CROWN_LABEL_H;

  const legXL = cx - crownPx / 2;
  const legXR = cx + crownPx / 2;

  const VB_W = (SIDE_LABEL_W + TICK_LEN) * 2 + stapleW;
  const VB_H = stapleTop + legMaxPx + BOTTOM_PAD;

  const tipFlare = 3;

  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} width="100%" style={{ display: "block" }} aria-hidden>
      {/* Crown label */}
      <text
        x={cx}
        y={TOP_PAD + 18}
        textAnchor="middle"
        fill="#1a1a1a"
        fontFamily="Assistant, sans-serif"
        fontWeight="700"
        fontSize="14"
      >
        {crownLabel}
      </text>
      {/* Crown dimension bracket */}
      <line x1={legXL} y1={TOP_PAD + 24} x2={legXR} y2={TOP_PAD + 24} stroke="#1a1a1a" strokeWidth="0.8" />
      <line x1={legXL} y1={TOP_PAD + 21} x2={legXL} y2={TOP_PAD + 27} stroke="#1a1a1a" strokeWidth="0.8" />
      <line x1={legXR} y1={TOP_PAD + 21} x2={legXR} y2={TOP_PAD + 27} stroke="#1a1a1a" strokeWidth="0.8" />

      {/* Outer U outline */}
      <path
        d={`
          M ${legXL - wireR} ${stapleTop + legMaxPx + tipFlare}
          L ${legXL - wireR} ${stapleTop + wireR}
          Q ${legXL - wireR} ${stapleTop - wireR} ${legXL + wireR} ${stapleTop - wireR}
          L ${legXR - wireR} ${stapleTop - wireR}
          Q ${legXR + wireR} ${stapleTop - wireR} ${legXR + wireR} ${stapleTop + wireR}
          L ${legXR + wireR} ${stapleTop + legMaxPx + tipFlare}
        `}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner U outline — wire thickness */}
      <path
        d={`
          M ${legXL + wireR + 1.2} ${stapleTop + legMaxPx}
          L ${legXL + wireR + 1.2} ${stapleTop + wireR + 1.2}
          Q ${legXL + wireR + 1.2} ${stapleTop + wireR + 0.6} ${legXL + wireR + 2.4} ${stapleTop + wireR + 0.6}
          L ${legXR - wireR - 2.4} ${stapleTop + wireR + 0.6}
          Q ${legXR - wireR - 1.2} ${stapleTop + wireR + 0.6} ${legXR - wireR - 1.2} ${stapleTop + wireR + 1.2}
          L ${legXR - wireR - 1.2} ${stapleTop + legMaxPx}
        `}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Length markers — mm on left leg, inches on right leg */}
      {LENGTHS.map(({ in: lenIn, label, mm }) => {
        const y = stapleTop + lenIn * ppi;
        const leftLabelX = SIDE_LABEL_W - 6;
        const leftTickX0 = SIDE_LABEL_W;
        const leftTickX1 = legXL - wireR - 2;
        const rightTickX0 = legXR + wireR + 2;
        const rightTickX1 = VB_W - SIDE_LABEL_W;
        const rightLabelX = VB_W - SIDE_LABEL_W + 6;
        return (
          <g key={label}>
            <text
              x={leftLabelX}
              y={y + labelFontSize / 3}
              textAnchor="end"
              fill="#1a1a1a"
              fontFamily="Assistant, sans-serif"
              fontWeight="600"
              fontSize={labelFontSize}
            >
              {mm}
            </text>
            <line x1={leftTickX0} y1={y} x2={leftTickX1} y2={y} stroke="#1a1a1a" strokeWidth="0.8" />
            <polygon
              points={`${leftTickX1},${y} ${leftTickX1 - 5},${y - 3} ${leftTickX1 - 5},${y + 3}`}
              fill="#1a1a1a"
            />
            <line x1={rightTickX0} y1={y} x2={rightTickX1} y2={y} stroke="#1a1a1a" strokeWidth="0.8" />
            <polygon
              points={`${rightTickX0},${y} ${rightTickX0 + 5},${y - 3} ${rightTickX0 + 5},${y + 3}`}
              fill="#1a1a1a"
            />
            <text
              x={rightLabelX}
              y={y + labelFontSize / 3}
              textAnchor="start"
              fill="#1a1a1a"
              fontFamily="Assistant, sans-serif"
              fontWeight="600"
              fontSize={labelFontSize}
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const QWIRE_15_LENGTHS: StapleLenTick[] = [
  { in: 1.5, label: '1-1/2"', mm: "38mm" },
  { in: 2.0, label: '2"',     mm: "50mm" },
  { in: 2.5, label: '2-1/2"', mm: "64mm" },
];

const NWIRE_16_LENGTHS: StapleLenTick[] = [
  { in: 0.75,  label: '3/4"',   mm: "19mm" },
  { in: 0.875, label: '7/8"',   mm: "22mm" },
  { in: 1.0,   label: '1"',     mm: "25mm" },
  { in: 1.25,  label: '1-1/4"', mm: "32mm" },
  { in: 1.375, label: '1-3/8"', mm: "35mm" },
  { in: 1.5,   label: '1-1/2"', mm: "38mm" },
  { in: 1.75,  label: '1-3/4"', mm: "45mm" },
  { in: 2.0,   label: '2"',     mm: "50mm" },
];

const MWIRE_18_LENGTHS: StapleLenTick[] = [
  { in: 0.5,   label: '1/2"',   mm: "12mm" },
  { in: 0.625, label: '5/8"',   mm: "16mm" },
  { in: 0.75,  label: '3/4"',   mm: "19mm" },
  { in: 0.875, label: '7/8"',   mm: "22mm" },
  { in: 1.0,   label: '1"',     mm: "25mm" },
  { in: 1.25,  label: '1-1/4"', mm: "32mm" },
  { in: 1.5,   label: '1-1/2"', mm: "38mm" },
];

const LWIRE_18_LENGTHS: StapleLenTick[] = [
  { in: 0.5,   label: '1/2"',   mm: "12mm" },
  { in: 0.625, label: '5/8"',   mm: "16mm" },
  { in: 0.75,  label: '3/4"',   mm: "19mm" },
  { in: 0.875, label: '7/8"',   mm: "22mm" },
  { in: 1.0,   label: '1"',     mm: "25mm" },
  { in: 1.125, label: '1-1/8"', mm: "28mm" },
  { in: 1.25,  label: '1-1/4"', mm: "32mm" },
  { in: 1.5,   label: '1-1/2"', mm: "38mm" },
];






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
              <div
                className="mt-6 bg-white"
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderTop: "2px solid var(--pd-yellow)",
                  padding: "20px 24px 18px",
                }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <div className="pd-label" style={{ color: "var(--pd-gold)", fontSize: 11 }}>Dimensions</div>
                  <h4 className="pd-display" style={{ color: "var(--pd-dark)", fontSize: 16, lineHeight: 1 }}>
                    7/16&quot; Crown · Three Lengths
                  </h4>
                  <span
                    aria-hidden
                    className="flex-1"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", transform: "translateY(-4px)" }}
                  />
                </div>
                <div style={{ maxWidth: 360, margin: "0 auto" }}>
                  <SencoStapleDiagram crownIn={7/16} crownLabel={'7/16"'} lengths={QWIRE_15_LENGTHS} ppi={70} />
                </div>
                <p
                  className="mt-3 text-center"
                  style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, color: "var(--pd-muted)", letterSpacing: "0.05em" }}
                >
                  Drawn to scale · millimetres (left) · inches (right)
                </p>
              </div>
              <InterchangeList
                fitsPrimary="Senco SQS55, FASCO F45C SQ-55 SS(CT), F5 SQ-65 CT, SQS55XP; Spotnail MS6564; Duo-Fast MS-1580D"
                tools={["BeA 180", "Duo-Fast 1500", "Senco Q-Wire", "Spotnail"]}
              />
            </>
          )}

          {tab === "16n" && (
            <>
              <InfoPanel
                applications="Furniture Frames, Cabinet Sub-Assembly, Millwork, Door Jambs."
                standards="Meets or Exceeds ASTM A641."
              />
              <div
                className="mt-6 bg-white"
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderTop: "2px solid var(--pd-yellow)",
                  padding: "20px 24px 18px",
                }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <div className="pd-label" style={{ color: "var(--pd-gold)", fontSize: 11 }}>Dimensions</div>
                  <h4 className="pd-display" style={{ color: "var(--pd-dark)", fontSize: 16, lineHeight: 1 }}>
                    7/16&quot; Medium Crown · Eight Lengths
                  </h4>
                  <span
                    aria-hidden
                    className="flex-1"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", transform: "translateY(-4px)" }}
                  />
                </div>
                <div style={{ maxWidth: 340, margin: "0 auto" }}>
                  <SencoStapleDiagram
                    crownIn={7/16}
                    crownLabel={'7/16"'}
                    lengths={NWIRE_16_LENGTHS}
                    ppi={90}
                    labelFontSize={10}
                  />
                </div>
                <p
                  className="mt-3 text-center"
                  style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, color: "var(--pd-muted)", letterSpacing: "0.05em" }}
                >
                  Drawn to scale · millimetres (left) · inches (right)
                </p>
              </div>
            </>
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
                    <StapleDepthDiagram spec={spec} stapleLenIn={group.lenIn} uid={`${group.len.replace(/\W+/g, "")}-${spec.crown.replace(/\W+/g, "")}`} />
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

