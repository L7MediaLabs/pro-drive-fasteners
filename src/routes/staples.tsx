import { createFileRoute } from "@tanstack/react-router";
import { Callout, InfoPanel, InterchangeList } from "../components/PageHeader";
import { ProductGrid, ProductTierSections } from "../components/ProductCard";
import {
  CinematicHero,
  TabNav,
  SpecCardGrid,
  SplitLayout,
  GalleryHero,
  LifestyleBanner,
  TechReference,
  RelatedProducts,
  PageDisclaimers,
  BulletBlock,
  useTabs,
} from "../components/editorial";
import {
  STAPLES_15_5, STAPLES_15_Q, STAPLES_16_N, STAPLES_18_M, STAPLES_18_L,
  pickRelated,
} from "../data/products";
import { StapleMedia, ShelfPhoto, maxLenIn } from "../components/productMedia";
import gradeContractorAsset from "../assets/badge-contractor-grade.png.asset.json";
const gradeContractor = gradeContractorAsset.url;
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

// One carton photo per gauge section — the "see it on the shelf" reference the
// client asked for. Gauges with no carton photography on file get `null` and
// simply show no shelf block (never another gauge's box).
type ShelfRef = { src: string; label: string; caption: string } | null;

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
    galleryHero: { src: images.staples.s155Strip2inA, caption: "2\" Collated Strip · 15.5 GA" },
    galleryPair: [
      { src: images.staples.s155Strip2inB, caption: "2\" Strip · Second View" },
      { src: images.staples.hero, caption: "Bulk Pack" },
    ],
    shelf: {
      src: images.staples.s155_masterpack,
      label: "15.5 GA Packaging — Master Carton",
      caption: "Every 15.5 GA length ships in this carton family. Item number and count are printed on the end panel.",
    } as ShelfRef,
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
      { src: images.staples.q15BulkPack, caption: "2-1/2\" Bulk Pack" },
      { src: images.staples.gauge15Banner, caption: "Collated" },
    ],
    shelf: {
      src: images.staples.q15BulkPack,
      label: "15 GA Q-Wire — Bulk Carton",
      caption: "Bulk pack carton as it ships and stocks.",
    } as ShelfRef,
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
    // No 16 GA N-Wire carton photography on file yet.
    shelf: null as ShelfRef,
  },
  "18m": {
    label: "18 GA M-Wire",
    kicker: "18 GA M-Wire Narrow Crown Staples — 3/8\" Crown",
    tagline: "Insulation, plastic sheeting, Tyvek, roofing paper, house wrap.",
    products: STAPLES_18_M,
    specs: [
      { k: "Gauge", v: "18" },
      { k: "Crown", v: '3/8" (Narrow Crown)' },
      { k: "Lengths", v: '5/8" – 1-1/4"' },
      { k: "Application", v: "Insulation · House Wrap · Tyvek" },
    ],
    galleryHero: { src: images.staples.narrowCrown18, caption: "18 GA Narrow Crown Strip" },
    galleryPair: [],
    // No 18 GA M-Wire carton photography on file yet.
    shelf: null as ShelfRef,
  },
  "18l": {
    label: "18 GA L-Wire",
    kicker: "18 GA L-Wire Narrow Crown Staples — 1/4\" Crown (Duo-Fast 1800)",
    tagline: "Cabinets, drawers, case backs, upholstery, engineered flooring.",
    products: STAPLES_18_L,
    specs: [
      { k: "Gauge", v: "18" },
      { k: "Crown", v: '1/4" (Narrow Crown)' },
      { k: "Lengths", v: '3/4" – 1-1/2"' },
      { k: "Application", v: "Trim · Cabinets · Engineered Flooring" },
    ],
    galleryHero: { src: images.staples.narrowCrown18, caption: "18 GA Narrow Crown Strip" },
    galleryPair: [],
    // No 18 GA L-Wire carton photography on file yet.
    shelf: null as ShelfRef,
  },
} as const;

// Depth chart data — R22 pg. 5. 15.5 GA staples embedded in 3/4" tongue-and-groove.
// Each row = flooring thickness → penetration achieved into the subfloor.
type StapleSpec = { floor: string; floorMm: string; pen: string };
type StapleGroup = { len: string; lenIn: number; items: StapleSpec[] };

const depthChart: StapleGroup[] = [
  {
    len: '2" Staples',
    lenIn: 2.0,
    items: [
      { floor: '5/8"', floorMm: "16mm", pen: '1-1/16"' },
      { floor: '3/4"', floorMm: "19mm", pen: '1"' },
    ],
  },
  {
    len: '1-3/4" Staples',
    lenIn: 1.75,
    items: [
      { floor: '1/2"',  floorMm: "12mm", pen: '31/32"' },
      { floor: '9/16"', floorMm: "14mm", pen: '29/32"' },
      { floor: '5/8"',  floorMm: "16mm", pen: '7/8"' },
      { floor: '3/4"',  floorMm: "19mm", pen: '13/16"' },
    ],
  },
  {
    len: '1-1/2" Staples',
    lenIn: 1.5,
    items: [
      { floor: '3/8"',  floorMm: "10mm", pen: '7/8"' },
      { floor: '1/2"',  floorMm: "12mm", pen: '13/16"' },
      { floor: '9/16"', floorMm: "14mm", pen: '3/4"' },
      { floor: '5/8"',  floorMm: "16mm", pen: '11/16"' },
      { floor: '3/4"',  floorMm: "19mm", pen: '5/8"' },
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
// comparison is meaningful (flooring thickness, penetration depth, staple length).
const PPI = 56;
const SUBFLOOR_H = TONGUE_IN * PPI;   // 3/4" subfloor block
const MAX_FLOOR_IN = 0.75;
const MAX_PEN_IN = 1.0625;            // deepest penetration in the chart
const LEFT_PAD = 14;
const RIGHT_GUTTER = 40;              // reserves space for the tongue arrow + pen label
const WOOD_W = 138;
const TONGUE_LEN = 11;                // protruding tongue lip length
const GAP_W = 30;                     // clear gap: tongue lip + space before next board
const PLANK2_W = 74;                  // partial second (next) plank, groove facing us

const SUBFLOOR_W = WOOD_W + GAP_W + PLANK2_W;
const PLANK2_X = LEFT_PAD + WOOD_W + GAP_W;
const MAX_TOTAL = MAX_FLOOR_IN + MAX_PEN_IN;
const VB_W = LEFT_PAD + SUBFLOOR_W + RIGHT_GUTTER;
const VB_H = MAX_TOTAL * PPI + 18;

// 15.5 GA flooring staple: 1/2" crown, .072" wire.
const STAPLE_CROWN_IN = 0.5;
const STAPLE_CROWN_LABEL = '1/2"';
const STAPLE_WIRE_PX = 4.2;

/**
 * Silhouette of a 15.5 GA flooring staple — crown bar across the top with two
 * parallel legs and chisel points, drawn in local coordinates: crown centred on
 * x = 0, crown top at y = 0, leg tips at y = L.
 */
function staplePath(L: number, crownPx: number, wire: number): string {
  const half = crownPx / 2;
  const tip = wire * 1.4;
  return [
    `M ${-half - wire / 2} 0`,
    `L ${half + wire / 2} 0`,
    `L ${half + wire / 2} ${L - tip}`,
    `L ${half} ${L}`,                       // chisel point, right leg
    `L ${half - wire / 2} ${L - tip}`,
    `L ${half - wire / 2} ${wire}`,
    `L ${-half + wire / 2} ${wire}`,
    `L ${-half + wire / 2} ${L - tip}`,
    `L ${-half} ${L}`,                      // chisel point, left leg
    `L ${-half - wire / 2} ${L - tip}`,
    "Z",
  ].join(" ");
}

// SVG diagram of one staple embedded in a tongue-and-groove floor cross-section.
// All geometry is scaled from real dimensions so diagrams are visually comparable.
function StapleDepthDiagram({
  spec,
  uid,
  stapleLenIn,
  stapleLenLabel,
}: {
  spec: StapleSpec;
  uid: string;
  stapleLenIn: number;
  stapleLenLabel: string;
}) {
  const floorIn = toDec(spec.floor);
  const penIn = toDec(spec.pen);
  const floorPx = floorIn * PPI;
  const penPx = penIn * PPI;
  const stapleLenPx = stapleLenIn * PPI;

  const floorTop = 0;
  const floorBottom = floorPx;
  const subfloorTop = floorBottom;
  const subfloorBottom = subfloorTop + SUBFLOOR_H;

  // Tongue-and-groove profile: the TONGUE is the lip protruding off the right
  // edge of the installed board; the GROOVE is the slot in the next board that
  // slides over it, concealing the fastener.
  const tongueTop = floorPx * 0.34;
  const tongueBot = floorPx * 0.66;
  const tongueRootX = LEFT_PAD + WOOD_W;
  const tongueTipX = tongueRootX + TONGUE_LEN;

  // The staple is driven THROUGH THE TONGUE: it enters on the top surface of the
  // protruding tongue and angles down-left through the board body into the
  // subfloor. It never enters the groove and never breaks the visible top face.
  const entryY = tongueTop;
  // Right triangle: staple length² = horizontal run² + vertical travel²
  const verticalSpan = floorPx - entryY + penPx;
  const horizRun = Math.sqrt(Math.max(0, stapleLenPx ** 2 - verticalSpan ** 2));
  const driveDeg = (Math.atan2(horizRun, verticalSpan) * 180) / Math.PI;

  const stapleX0 = tongueRootX + TONGUE_LEN * 0.45; // on the tongue itself

  const stapleX1 = stapleX0 - horizRun;       // tips travel down-left into subfloor
  const stapleY0 = entryY;
  const stapleY1 = entryY + verticalSpan;     // = floorBottom + penPx


  const penArrowX = Math.max(stapleX1 - 10, LEFT_PAD + 6);
  const tongueArrowX = LEFT_PAD + SUBFLOOR_W + 10;


  const crownPx = STAPLE_CROWN_IN * PPI;
  const halfCrown = crownPx / 2 + STAPLE_WIRE_PX / 2;
  const lenDimX = -halfCrown - 13;

  return (
    <svg viewBox={`-22 -30 ${VB_W + 22} ${VB_H + 30}`} width="100%" style={{ display: "block" }} aria-hidden>

      <defs>
        <pattern id={`grain-${uid}`} width="60" height="14" patternUnits="userSpaceOnUse">
          <line x1="0" y1="7" x2="60" y2="7" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" strokeDasharray="10 4 4 4 6 6" />
        </pattern>
      </defs>

      {/* Installed flooring plank body (brown) */}
      <rect x={LEFT_PAD} y={floorTop} width={WOOD_W} height={floorPx} fill="#5C4128" />

      {/* TONGUE — milled lip protruding off the right edge. The fastener is
          driven through THIS feature. */}
      <path
        d={`M ${tongueRootX} ${tongueTop} L ${tongueTipX - 2} ${tongueTop} L ${tongueTipX} ${tongueTop + 2} L ${tongueTipX} ${tongueBot - 2} L ${tongueTipX - 2} ${tongueBot} L ${tongueRootX} ${tongueBot} Z`}
        fill="#7A5A3C"
        stroke="#2B1D11"
        strokeWidth="0.9"
      />

      {/* NEXT board, not yet slid home — its GROOVE will receive the tongue and
          cover the fastener head. */}
      <rect x={PLANK2_X} y={floorTop} width={PLANK2_W} height={floorPx} fill="#5C4128" opacity={0.55} />
      <rect x={PLANK2_X} y={tongueTop} width={TONGUE_LEN} height={tongueBot - tongueTop} fill="#F5F4EE" />
      <path
        d={`M ${PLANK2_X + TONGUE_LEN} ${tongueTop} L ${PLANK2_X} ${tongueTop} M ${PLANK2_X} ${tongueBot} L ${PLANK2_X + TONGUE_LEN} ${tongueBot} L ${PLANK2_X + TONGUE_LEN} ${tongueTop}`}
        fill="none"
        stroke="#2B1D11"
        strokeWidth="0.9"
      />
      {/* Direction of assembly */}
      <g stroke="#1a1a1a" strokeWidth="0.8" fill="#1a1a1a">
        <line x1={PLANK2_X + 20} y1={floorPx * 0.18} x2={PLANK2_X + 6} y2={floorPx * 0.18} />
        <polygon points={`${PLANK2_X + 4},${floorPx * 0.18} ${PLANK2_X + 10},${floorPx * 0.18 - 3} ${PLANK2_X + 10},${floorPx * 0.18 + 3}`} />
      </g>

      {/* TONGUE & GROOVE callouts — leaders land on the actual features */}
      <g fill="#1a1a1a" fontFamily="Assistant, sans-serif" fontWeight="800" fontSize="6.5" letterSpacing="0.7">
        <polyline
          points={`${tongueRootX + TONGUE_LEN / 2},${(tongueTop + tongueBot) / 2} ${tongueRootX + TONGUE_LEN / 2},${-11} ${tongueRootX - 6},${-11}`}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="0.6"
        />
        <text x={tongueRootX - 8} y={-9} textAnchor="end">TONGUE (fastener goes here)</text>
        <polyline
          points={`${PLANK2_X + TONGUE_LEN / 2},${(tongueTop + tongueBot) / 2} ${PLANK2_X + TONGUE_LEN / 2},${-4} ${PLANK2_X + 14},${-4}`}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="0.6"
        />
        <text x={PLANK2_X + 16} y={-2}>GROOVE</text>
      </g>


      {/* Flooring size label (first plank) */}
      <text
        x={LEFT_PAD + 8}
        y={Math.min(floorPx - 4, 12)}
        fill="#fff"
        fontFamily="Assistant, sans-serif"
        fontWeight="800"
        fontSize="10"
      >
        {spec.floor}
      </text>
      <text
        x={LEFT_PAD + 8}
        y={Math.min(floorPx - 4, 12)}
        dx={spec.floor.length * 6.2 + 6}
        fill="rgba(255,255,255,0.75)"
        fontFamily="Assistant, sans-serif"
        fontWeight="600"
        fontSize="7.5"
      >
        ({spec.floorMm})
      </text>

      {/* Subfloor body — extends under both planks and the joint */}
      <rect x={LEFT_PAD} y={subfloorTop} width={SUBFLOOR_W} height={SUBFLOOR_H} fill="#D9C89F" />
      <rect x={LEFT_PAD} y={subfloorTop} width={SUBFLOOR_W} height={SUBFLOOR_H} fill={`url(#grain-${uid})`} />
      {[0.22, 0.48, 0.72].map(f => (
        <line
          key={f}
          x1={LEFT_PAD}
          y1={subfloorTop + SUBFLOOR_H * f}
          x2={LEFT_PAD + SUBFLOOR_W}
          y2={subfloorTop + SUBFLOOR_H * f}
          stroke="rgba(0,0,0,0.14)"
          strokeWidth="0.5"
          strokeDasharray="12 5 4 6"
        />
      ))}

      {/* STAPLE — true 1/2" crown, two legs, driven at the real install angle */}
      <g transform={`rotate(${driveDeg} ${stapleX0} ${stapleY0}) translate(${stapleX0} ${stapleY0})`}>
        <path
          d={staplePath(stapleLenPx, crownPx, STAPLE_WIRE_PX)}
          fill="#EDEDF1"
          stroke="#1a1a1a"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* Crown width dimension (1/2") — now sits inside the plank, so it is
            drawn light with a dark halo to stay legible over the wood. */}
        <line x1={-halfCrown} y1={-13} x2={halfCrown} y2={-13} stroke="#fff" strokeWidth="0.9" />
        <line x1={-halfCrown} y1={-17} x2={-halfCrown} y2={-9} stroke="#fff" strokeWidth="0.9" />
        <line x1={halfCrown} y1={-17} x2={halfCrown} y2={-9} stroke="#fff" strokeWidth="0.9" />
        {/* Crown label is drawn outside this rotated group (see below) so the
            text stays horizontal and clear of the T&G callouts. */}



        {/* Staple length dimension alongside the legs */}
        <line x1={lenDimX} y1={0} x2={lenDimX} y2={stapleLenPx} stroke="#fff" strokeWidth="0.9" />
        <line x1={lenDimX - 4} y1={0} x2={lenDimX + 4} y2={0} stroke="#fff" strokeWidth="0.9" />
        <line x1={lenDimX - 4} y1={stapleLenPx} x2={lenDimX + 4} y2={stapleLenPx} stroke="#fff" strokeWidth="0.9" />
        <text
          transform={`translate(${lenDimX - 5} ${stapleLenPx / 2}) rotate(-90)`}
          textAnchor="middle"
          fill="#fff"
          stroke="rgba(20,14,6,0.85)"
          strokeWidth="2.2"
          paintOrder="stroke"
          fontFamily="Assistant, sans-serif"
          fontWeight="800"
          fontSize="9"
        >
          {stapleLenLabel} long
        </text>

      </g>

      {/* Crown label — horizontal, sitting over the plank body left of the staple */}
      <text
        x={LEFT_PAD + 8}
        y={floorPx * 0.92}
        textAnchor="start"
        fill="#fff"
        stroke="rgba(20,14,6,0.85)"
        strokeWidth="2.2"
        paintOrder="stroke"
        fontFamily="Assistant, sans-serif"
        fontWeight="800"
        fontSize="9"
      >
        {STAPLE_CROWN_LABEL} crown
      </text>




      {/* Penetration arrow — from top of subfloor down to the staple tips */}
      <line x1={penArrowX} y1={subfloorTop + 1} x2={penArrowX} y2={stapleY1} stroke="#1a1a1a" strokeWidth="1" />
      <polygon points={`${penArrowX},${subfloorTop + 1} ${penArrowX - 3},${subfloorTop + 7} ${penArrowX + 3},${subfloorTop + 7}`} fill="#1a1a1a" />
      <polygon points={`${penArrowX},${stapleY1} ${penArrowX - 3},${stapleY1 - 6} ${penArrowX + 3},${stapleY1 - 6}`} fill="#1a1a1a" />
      <text
        x={penArrowX - 5}
        textAnchor="end"
        y={(subfloorTop + stapleY1) / 2 + 4}

        fill="#1a1a1a"
        fontFamily="Assistant, sans-serif"
        fontWeight="800"
        fontSize="10"
      >
        {spec.pen}
      </text>

      {/* Subfloor (3/4") reference arrow — same length on every card */}
      <line x1={tongueArrowX} y1={subfloorTop} x2={tongueArrowX} y2={subfloorBottom} stroke="#1a1a1a" strokeWidth="1" />
      <polygon points={`${tongueArrowX},${subfloorTop} ${tongueArrowX - 3},${subfloorTop + 6} ${tongueArrowX + 3},${subfloorTop + 6}`} fill="#1a1a1a" />
      <polygon points={`${tongueArrowX},${subfloorBottom} ${tongueArrowX - 3},${subfloorBottom - 6} ${tongueArrowX + 3},${subfloorBottom - 6}`} fill="#1a1a1a" />
      <text
        x={tongueArrowX + 6}
        y={(subfloorTop + subfloorBottom) / 2 + 4}
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
  const legStroke = 7;
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

  const tipFlare = 5;

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
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner U outline — wire thickness */}
      <path
        d={`
          M ${legXL + wireR + 1.8} ${stapleTop + legMaxPx}
          L ${legXL + wireR + 1.8} ${stapleTop + wireR + 1.8}
          Q ${legXL + wireR + 1.8} ${stapleTop + wireR + 0.9} ${legXL + wireR + 3.6} ${stapleTop + wireR + 0.9}
          L ${legXR - wireR - 3.6} ${stapleTop + wireR + 0.9}
          Q ${legXR - wireR - 1.8} ${stapleTop + wireR + 0.9} ${legXR - wireR - 1.8} ${stapleTop + wireR + 1.8}
          L ${legXR - wireR - 1.8} ${stapleTop + legMaxPx}
        `}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.8"
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
  const [tab, setTab] = useTabs<TabKey>("155", sku => {
    for (const k of Object.keys(tabData) as TabKey[]) {
      if (tabData[k].products.some(p => p.id === sku)) return k;
    }
    return undefined;
  });

  const g = tabData[tab];
  // Shared pixels-per-inch basis for this gauge: every card in the tab is drawn
  // against the longest staple in the family, so lengths compare directly.
  const familyMax = maxLenIn([...g.products]);

  const allShownIds = [
    ...STAPLES_15_5, ...STAPLES_15_Q, ...STAPLES_16_N, ...STAPLES_18_M, ...STAPLES_18_L,
  ].map(p => p.id);
  const related = pickRelated(allShownIds, 6);

  return (
    <div>
      <CinematicHero
        kicker="Flooring Fasteners"
        title={<>Flooring Staples.<br />Every Gauge. Every Job.</>}
        description="We offer a wide range of staples for hardwood, laminate, engineered wood flooring, and carpet applications, as well as cabinetry, insulation, and upholstery applications."
        bgImage={images.staples.gauge15Banner}
        badges={[
          { label: "CONTRACTOR GRADE", logo: gradeContractor },
          { label: "MEETS ASTM F1667" },
          { label: "E-G GALVANIZED" },
        ]}
        rightImage={images.staples.s155_2in_7720}
        rightImageAlt='Pro-Drive Fasteners® FS-200-7720 15.5 GA 2" flooring staples box'
        rightImageFit="contain"
      />

      {/* JAM-FREE GUARANTEE — client's single strongest differentiator
          (Hollis, 8-8-2026). Copy supplied verbatim. */}
      <section className="px-[6%] py-12" style={{ background: "var(--pd-cream, #F5F1E8)" }}>
        <BulletBlock
          tone="accent"
          kicker="Jam-Free Guarantee"
          title={<>The only JAM FREE guarantee in the industry.</>}
          bullets={[
            <>Pro-Drive Fasteners® is the only manufacturer to offer a JAM FREE guarantee, and we print this on our cartons.</>,
            <>Will work in all major domestic and most import brand flooring tools.</>,
            <>Premium grade steel. Our staples will NOT bend. You will never have &ldquo;WALKING legs&rdquo; (BENDING/FOLDING) with our staples.</>,
          ]}
        />
      </section>

      <TabNav
        tabs={(Object.keys(tabData) as TabKey[]).map(k => ({ key: k, label: tabData[k].label }))}
        value={tab}
        onChange={setTab}
      />

      <section className="px-[6%] py-16" style={{ background: "var(--pd-light-bg)" }}>
        <SplitLayout
          gallery={
            <GalleryHero src={g.galleryHero.src} alt={g.kicker} caption={g.galleryHero.caption} />
          }

        >
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>{g.label}</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 34, lineHeight: 1.1 }}>
            {g.tagline}
          </h2>
          <div className="mt-6">
            <SpecCardGrid specs={[...g.specs]} />
          </div>
          {tab === "155" && (
            <div className="mt-6">
              <Callout>Guaranteed to fit all standard 15.5 gauge flooring tools. Chisel point reduces splitting. Contractor Bulk-Job or Job packs available.</Callout>
            </div>
          )}
          {tab === "15q" && (
            <div className="mt-6">
              <Callout>Senco® Style. Ideal for framing, sheathing, roof decking, and furniture frames. Meets or exceeds ASTM A641.</Callout>
            </div>
          )}
        </SplitLayout>

        {/* Full-width product grid grouped by pack tier.
            Editorial pattern (approved on /l-cleats): the carton photo appears
            ONCE per gauge as shelf reference, and each card leads with the
            staple itself drawn from its own crown and leg dimensions. */}
        <div className="mt-12">
          <div className="flex items-baseline gap-3 mb-8">
            <div className="pd-label" style={{ color: "var(--pd-gold)", fontSize: 11 }}>Product Line</div>
            <h3 className="pd-display" style={{ color: "var(--pd-dark)", fontSize: 18, lineHeight: 1 }}>
              {g.kicker}
            </h3>
            <span
              aria-hidden
              className="flex-1"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", transform: "translateY(-4px)" }}
            />
          </div>
          {g.shelf && (
            <div className="mb-8" style={{ maxWidth: 340 }}>
              <ShelfPhoto
                src={g.shelf.src}
                alt={`${g.label} flooring staple packaging`}
                label={g.shelf.label}
                caption={g.shelf.caption}
              />
            </div>
          )}
          <ProductTierSections
            products={g.products}
            cols={4}
            media={p => <StapleMedia sku={p.id} familyMax={familyMax} />}
            descriptions={{
              "CONTRACTOR BULK CARTONS": "Full-scale cartons for high-volume professional crews and large flooring jobs.",
              "JOB PACKS": "Mid-size packs built for production job sites and repeat installs.",
              "PROJECT PACK": "Compact 1,000-count packs ideal for small installs, samples, and touch-ups.",
            }}
          />
        </div>

        {/* Centered supplementary panels */}
        <div className="mt-12 mx-auto" style={{ maxWidth: 880 }}>
          {tab === "155" && (
            <InfoPanel
              applications="Excellent for all types of hardwood flooring installations."
              materials="Electro-Galvanized steel. Not recommended for exterior application or ACQ-treated lumber."
              standards="Meets ASTM F1667."
            />
          )}
          {tab === "15q" && (
            <>
              <div
                className="bg-white"
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderTop: "2px solid var(--pd-yellow)",
                  padding: "20px 24px 18px",
                }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <div className="pd-label" style={{ color: "var(--pd-gold)", fontSize: 11 }}>Dimensions</div>
                  <h4 className="pd-display" style={{ color: "var(--pd-dark)", fontSize: 16, lineHeight: 1 }}>
                    7/16&quot; Crown · Two Lengths
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
              <div className="mt-6">
                <InterchangeList
                  fitsPrimary="Senco SQS55, FASCO F45C SQ-55 SS(CT), F5 SQ-65 CT, SQS55XP; Spotnail MS6564; Duo-Fast MS-1580D"
                  tools={["BeA 180", "Duo-Fast 1500", "Senco Q-Wire", "Spotnail"]}
                />
              </div>
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
                <div><strong style={{ color: "var(--pd-dark)" }}>Note:</strong> Made from Extra Hard Wire. Not compatible with Arrow® T50 series.</div>
              </InfoPanel>
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
                    3/8&quot; Crown · M-Wire Lengths
                  </h4>
                  <span
                    aria-hidden
                    className="flex-1"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", transform: "translateY(-4px)" }}
                  />
                </div>
                <div style={{ maxWidth: 320, margin: "0 auto" }}>
                  <SencoStapleDiagram
                    crownIn={3/8}
                    crownLabel={'3/8"'}
                    lengths={MWIRE_18_LENGTHS}
                    ppi={95}
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
              <div className="mt-6">
                <InterchangeList tools={MWIRE_TOOLS} />
              </div>
            </>
          )}
          {tab === "18l" && (
            <>
              <InfoPanel applications="Finish and trim staples for cabinets, drawers, case backs, upholstery, soffits, underlayment, lattice, insulation sheathing, engineered flooring." />
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
                    1/4&quot; Crown · L-Wire Lengths
                  </h4>
                  <span
                    aria-hidden
                    className="flex-1"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", transform: "translateY(-4px)" }}
                  />
                </div>
                <div style={{ maxWidth: 320, margin: "0 auto" }}>
                  <SencoStapleDiagram
                    crownIn={1/4}
                    crownLabel={'1/4"'}
                    lengths={LWIRE_18_LENGTHS}
                    ppi={95}
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
              <div className="mt-6">
                <InterchangeList tools={LWIRE_TOOLS} />
              </div>
            </>
          )}
        </div>
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
        intro='Match 15.5 GA staple length to your flooring thickness. Every card is drawn to one shared scale — flooring, 3/4" subfloor, and penetration depth are all proportional. Figures from the Pro-Drive Fasteners® R22 spec sheet.'
        footnote="Actual fastener depth can vary based on wood milling or tongue profile. This chart is for reference purposes only. Consult wood manufacturers for correct fastener length before installation."
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
                    key={`${group.len}-${spec.floor}`}
                    className="bg-white"
                    style={{
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderTop: "2px solid var(--pd-yellow)",
                      padding: "12px 12px 10px",
                    }}
                  >
                    <StapleDepthDiagram spec={spec} stapleLenIn={group.lenIn} stapleLenLabel={group.len.replace(/\s*staples?/i, "")} uid={`${group.len.replace(/\W+/g, "")}-${spec.floor.replace(/\W+/g, "")}`} />
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
                        {spec.floor} flooring
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

