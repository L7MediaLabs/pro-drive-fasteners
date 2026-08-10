import { createFileRoute, Link } from "@tanstack/react-router";
import { trackEvent } from "@/lib/analytics";
import { ProductGrid } from "../components/ProductCard";
import { TechReference, useTabs } from "../components/editorial";
import { LCLEATS_16, LCLEATS_18 } from "../data/products";
import { images } from "../data/images";
import contractorBadge from "../assets/badge-contractor-grade.png.asset.json";

const contractorBadgeUrl = contractorBadge.url;

// ─── L-Cleat depth diagram — shared pixels-per-inch across every card ──────
type CleatSpec = { floor: string; floorMm: string; pen: string };
type CleatGroup = { len: string; lenIn: number; gauge: string; items: CleatSpec[] };

const CLEAT_TONGUE = '3/4"';
const CLEAT_TONGUE_IN = 0.75;

function cleatToDec(input: string): number {
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

// Shared scale — every card in the chart uses the same pixel-per-inch so
// flooring thickness, penetration depth, and cleat length compare visually.
const CPPI = 56;
const CSUBFLOOR_H = CLEAT_TONGUE_IN * CPPI; // 42px — the 3/4" subfloor block
const CMAX_FLOOR_IN = 0.75;                 // brown flooring strip max thickness
const CMAX_PEN_IN = 1.0625;                 // longest pen in the chart (1-1/16")
const CLEFT_PAD = 14;
const CRIGHT_GUTTER = 44;
const CWOOD_W = 138;
const CMAX_TOTAL = CMAX_FLOOR_IN + CMAX_PEN_IN; // vertical extent of the deepest cleat
const CVB_W = CLEFT_PAD + CWOOD_W + CRIGHT_GUTTER;
const CVB_H = CMAX_TOTAL * CPPI + 18;

/**
 * Silhouette of a Pro-Drive L-cleat, corrected per client review (Hollis):
 * a FLAT, CONSTANT-WIDTH shank — no needle or tapering point anywhere — with
 * an L-head foot bent perpendicular off the top, barbed (spurred) lower shank,
 * and a short chisel bevel at the tip.
 *
 * Local coordinates: shank centreline at x = 0, head top at y = 0, tip at y = L.
 * `dir` = -1 puts the flange on the left (box artwork), +1 on the right.
 */
function lCleatPath(
  L: number,
  shankW: number,
  flangeW: number,
  headT: number,
  dir: -1 | 1 = -1,
): string {
  const hw = shankW / 2;
  const barbTop = L * 0.3;                                      // smooth shank above this
  const chiselTop = Math.max(barbTop + 4, L - shankW * 1.3);     // short chisel bevel only
  const amp = hw * 0.85;                                         // barb spur projection
  const teeth = Math.max(4, Math.round((chiselTop - barbTop) / (shankW * 1.7)));
  const step = (chiselTop - barbTop) / teeth;

  const X = (v: number) => (dir === -1 ? v : -v);
  const p: string[] = [];

  // Head: L-foot bent perpendicular off the top of the shank.
  p.push(`M ${X(-flangeW - hw)} ${0}`);
  p.push(`L ${X(hw)} 0`);
  // Outer shank edge, top-down — constant width with barb spurs, no taper.
  p.push(`L ${X(hw)} ${barbTop}`);
  for (let i = 0; i < teeth; i++) {
    const y0 = barbTop + i * step;
    p.push(`L ${X(hw + amp)} ${y0 + step * 0.62}`);
    p.push(`L ${X(hw)} ${y0 + step * 0.62}`);
    p.push(`L ${X(hw)} ${y0 + step}`);
  }
  p.push(`L ${X(hw)} ${chiselTop}`);
  // Chisel point — one flat bevel across the full shank width (no needle).
  p.push(`L ${X(-hw)} ${L}`);
  p.push(`L ${X(-hw)} ${chiselTop}`);
  // Inner shank edge, bottom-up — barbs mirrored, staggered half a tooth.
  for (let i = teeth - 1; i >= 0; i--) {
    const y0 = barbTop + i * step;
    p.push(`L ${X(-hw)} ${y0 + step * 0.5}`);
    p.push(`L ${X(-hw - amp)} ${y0 + step * 0.5}`);
    p.push(`L ${X(-hw)} ${y0 + step * 0.12}`);
  }
  p.push(`L ${X(-hw)} ${barbTop}`);
  p.push(`L ${X(-hw)} ${headT}`);
  p.push(`L ${X(-flangeW - hw)} ${headT}`);
  p.push("Z");
  return p.join(" ");
}


function CleatDepthDiagram({
  spec,
  uid,
  cleatLenIn,
}: {
  spec: CleatSpec;
  uid: string;
  cleatLenIn: number;
}) {
  const floorIn = cleatToDec(spec.floor);
  const penIn = cleatToDec(spec.pen);
  const floorPx = floorIn * CPPI;
  const penPx = penIn * CPPI;
  const cleatLenPx = cleatLenIn * CPPI;

  // Cleat travels diagonally covering (floor + pen) vertically.
  const verticalSpan = floorPx + penPx;
  const horizRun = Math.sqrt(Math.max(0, cleatLenPx ** 2 - verticalSpan ** 2));
  // Drive angle measured off vertical — used to rotate the whole cleat body.
  const driveDeg = (Math.atan2(horizRun, verticalSpan) * 180) / Math.PI;
  const SHANK_W = 4.4;          // flat cleat shank thickness
  const HEAD_FLANGE = 9;        // horizontal foot of the "L" head
  const HEAD_T = 4.2;           // head thickness
  

  const floorTop = 0;
  const floorBottom = floorPx;
  const subfloorTop = floorBottom;
  const subfloorBottom = subfloorTop + CSUBFLOOR_H;

  const stapleX0 = CLEFT_PAD + CWOOD_W - 50; // L-head seated more fully inside the plank
  const stapleX1 = stapleX0 - horizRun; // tip extends left
  const stapleY0 = floorTop;
  const stapleY1 = floorTop + verticalSpan;

  const penArrowX = stapleX1 - 10;
  const tongueArrowX = CLEFT_PAD + CWOOD_W + 12;

  return (
    <svg viewBox={`0 -12 ${CVB_W} ${CVB_H + 12}`} width="100%" style={{ display: "block" }} aria-hidden>
      <defs>
        <pattern id={`cleat-grain-${uid}`} width="60" height="14" patternUnits="userSpaceOnUse">
          <line x1="0" y1="7" x2="60" y2="7" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" strokeDasharray="10 4 4 4 6 6" />
        </pattern>
      </defs>

      {/* Flooring plank (brown) — height scales with floor thickness */}
      <rect x={CLEFT_PAD} y={floorTop} width={CWOOD_W} height={floorPx} fill="#5C4128" />
      {/* Groove notch on the left */}
      <rect x={CLEFT_PAD} y={floorPx * 0.35} width="4" height={Math.max(4, floorPx * 0.55)} fill="#F5F4EE" />
      {/* Tongue profile on the right edge */}
      <rect
        x={CLEFT_PAD + CWOOD_W}
        y={floorPx * 0.35}
        width="5"
        height={Math.max(4, floorPx * 0.55)}
        fill="#6B4E35"
      />
      {/* TONGUE & GROOVE callouts (client-requested labelling) */}
      <g fill="#1a1a1a" fontFamily="Assistant, sans-serif" fontWeight="800" fontSize="6.5" letterSpacing="0.7">
        <line x1={CLEFT_PAD + 2} y1={-3} x2={CLEFT_PAD + 2} y2={floorPx * 0.35} stroke="#1a1a1a" strokeWidth="0.6" />
        <text x={CLEFT_PAD + 5} y={-3.5}>GROOVE</text>
        <line
          x1={CLEFT_PAD + CWOOD_W + 2.5}
          y1={-3}
          x2={CLEFT_PAD + CWOOD_W + 2.5}
          y2={floorPx * 0.35}
          stroke="#1a1a1a"
          strokeWidth="0.6"
        />
        <text x={CLEFT_PAD + CWOOD_W} y={-3.5} textAnchor="end">TONGUE</text>
      </g>

      {/* Flooring size label */}
      <text
        x={CLEFT_PAD + 8}
        y={Math.min(floorPx - 4, 12)}
        fill="#fff"
        fontFamily="Assistant, sans-serif"
        fontWeight="800"
        fontSize="10"
      >
        {spec.floor}
      </text>
      <text
        x={CLEFT_PAD + 8}
        y={Math.min(floorPx - 4, 12)}
        dx={spec.floor.length * 6.2 + 6}
        fill="rgba(255,255,255,0.75)"
        fontFamily="Assistant, sans-serif"
        fontWeight="600"
        fontSize="7.5"
      >
        ({spec.floorMm})
      </text>

      {/* Subfloor body — always 3/4" tall (shared scale) */}
      <rect x={CLEFT_PAD} y={subfloorTop} width={CWOOD_W} height={CSUBFLOOR_H} fill="#D9C89F" />
      <rect x={CLEFT_PAD} y={subfloorTop} width={CWOOD_W} height={CSUBFLOOR_H} fill={`url(#cleat-grain-${uid})`} />
      {[0.22, 0.48, 0.72].map(f => (
        <line
          key={f}
          x1={CLEFT_PAD}
          y1={subfloorTop + CSUBFLOOR_H * f}
          x2={CLEFT_PAD + CWOOD_W}
          y2={subfloorTop + CSUBFLOOR_H * f}
          stroke="rgba(0,0,0,0.14)"
          strokeWidth="0.5"
          strokeDasharray="12 5 4 6"
        />
      ))}

      {/* L-CLEAT — silhouette matching the carton artwork, driven at the
          true install angle (flange bent to the right, tip down-left). */}
      <g transform={`rotate(-${driveDeg} ${stapleX0} ${stapleY0}) translate(${stapleX0} ${stapleY0})`}>
        <path
          d={lCleatPath(cleatLenPx, SHANK_W, HEAD_FLANGE, HEAD_T, 1)}
          fill="#EDEDF1"
          stroke="#1a1a1a"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </g>



      {/* Penetration arrow — inside subfloor, from top of subfloor to cleat tip */}
      <line x1={penArrowX} y1={subfloorTop + 1} x2={penArrowX} y2={stapleY1} stroke="#1a1a1a" strokeWidth="1" />
      <polygon points={`${penArrowX},${subfloorTop + 1} ${penArrowX - 3},${subfloorTop + 7} ${penArrowX + 3},${subfloorTop + 7}`} fill="#1a1a1a" />
      <polygon points={`${penArrowX},${stapleY1} ${penArrowX - 3},${stapleY1 - 6} ${penArrowX + 3},${stapleY1 - 6}`} fill="#1a1a1a" />
      <text
        x={penArrowX - 5}
        y={(subfloorTop + stapleY1) / 2 + 4}
        textAnchor="end"
        fill="#1a1a1a"
        fontFamily="Assistant, sans-serif"
        fontWeight="800"
        fontSize="10"
      >
        {spec.pen}
      </text>

      {/* Tongue (3/4") subfloor reference arrow — same length on every card */}
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
        {CLEAT_TONGUE}
      </text>
    </svg>
  );
}

const cleatDepthChart: CleatGroup[] = [
  {
    len: '2" L-Cleats',
    lenIn: 2.0,
    gauge: "16 Gauge",
    items: [
      { floor: '5/8"', floorMm: "16mm", pen: '1-1/16"' },
      { floor: '3/4"', floorMm: "19mm", pen: '1"' },
    ],
  },
  {
    len: '1-3/4" L-Cleats',
    lenIn: 1.75,
    gauge: "16 or 18 Gauge",
    items: [
      { floor: '1/2"',  floorMm: "12mm", pen: '31/32"' },
      { floor: '9/16"', floorMm: "14mm", pen: '29/32"' },
      { floor: '5/8"',  floorMm: "16mm", pen: '7/8"' },
      { floor: '3/4"',  floorMm: "19mm", pen: '13/16"' },
    ],
  },
  {
    len: '1-1/2" L-Cleats',
    lenIn: 1.5,
    gauge: "16 or 18 Gauge",
    items: [
      { floor: '1/2"',  floorMm: "12mm", pen: '13/16"' },
      { floor: '9/16"', floorMm: "14mm", pen: '3/4"' },
      { floor: '5/8"',  floorMm: "16mm", pen: '11/16"' },
      { floor: '3/4"',  floorMm: "19mm", pen: '5/8"' },
    ],
  },
  {
    len: '1-1/4" L-Cleats',
    lenIn: 1.25,
    gauge: "18 or 20 Gauge",
    items: [
      { floor: '5/16"', floorMm: "8mm",  pen: '3/4"' },
      { floor: '3/8"',  floorMm: "10mm", pen: '11/16"' },
      { floor: '1/2"',  floorMm: "12mm", pen: '5/8"' },
    ],
  },
];

// ─── L-Cleat elevation profile — clean head-on view, shared PPI ────────────
type CleatSize = { sku: string; label: string; lenIn: number };

const LC16_SIZES: CleatSize[] = [
  { sku: "LC150-16", label: '1-1/2"', lenIn: 1.5 },
  { sku: "LC175-16", label: '1-3/4"', lenIn: 1.75 },
  { sku: "LC200-16", label: '2"',     lenIn: 2.0 },
];

const LC18_SIZES: CleatSize[] = [
  { sku: "LC125-18", label: '1-1/4"', lenIn: 1.25 },
  { sku: "LC150-18", label: '1-1/2"', lenIn: 1.5 },
  { sku: "LC175-18", label: '1-3/4"', lenIn: 1.75 },
];

const LCP_PPI = 118;         // vertical scale — shared by both gauges
const LCP_COL_W = 96;
const LCP_LEFT_PAD = 26;
const LCP_TOP_PAD = 84;      // SKU badge + gauge label + flange bracket
const LCP_BOTTOM_PAD = 34;   // length label

function LCleatProfileDiagram({
  sizes,
  shankW,
  flangeW,
  gaugeLabel,
}: {
  sizes: CleatSize[];
  shankW: number;
  flangeW: number;
  gaugeLabel: string;
}) {
  const maxLen = Math.max(...sizes.map(s => s.lenIn));
  const w = LCP_LEFT_PAD * 2 + sizes.length * LCP_COL_W;
  const h = LCP_TOP_PAD + maxLen * LCP_PPI + LCP_BOTTOM_PAD;
  const headT = 5;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }} aria-hidden>
      {sizes.map((s, i) => {
        const cx = LCP_LEFT_PAD + i * LCP_COL_W + LCP_COL_W / 2;
        const lenPx = s.lenIn * LCP_PPI;
        const top = LCP_TOP_PAD;
        const bottom = top + lenPx;
        const headLeft = cx - shankW / 2 - flangeW;

        return (
          <g key={s.sku}>
            {/* SKU badge */}
            <rect x={cx - 34} y={4} width={68} height={18} fill="#e9e9ec" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
            <text x={cx} y={17} textAnchor="middle" fontFamily="Assistant, sans-serif" fontWeight="800" fontSize="11" fill="#1a1a1a">
              {s.sku}
            </text>
            <text x={cx} y={34} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="var(--pd-muted)">
              {gaugeLabel}
            </text>

            {/* Flange width dimension bracket (above the head) */}
            <line x1={headLeft} y1={top - 10} x2={cx + shankW / 2} y2={top - 10} stroke="#1a1a1a" strokeWidth="0.8" />
            <line x1={headLeft} y1={top - 13} x2={headLeft} y2={top - 7} stroke="#1a1a1a" strokeWidth="0.8" />
            <line x1={cx + shankW / 2} y1={top - 13} x2={cx + shankW / 2} y2={top - 7} stroke="#1a1a1a" strokeWidth="0.8" />
            <text
              x={(headLeft + cx + shankW / 2) / 2}
              y={top - 15}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="9"
              fill="var(--pd-muted)"
            >
              L-head
            </text>

            {/* Cleat silhouette — matches the carton artwork */}
            <g transform={`translate(${cx} ${top})`}>
              <path
                d={lCleatPath(lenPx, shankW, flangeW, headT, -1)}
                fill="#EDEDF1"
                stroke="#1a1a1a"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </g>


            {/* Shank length tick + label */}
            <line x1={cx + 16} y1={top} x2={cx + 16} y2={bottom} stroke="#1a1a1a" strokeWidth="0.8" />
            <polygon points={`${cx + 16},${top} ${cx + 13},${top + 6} ${cx + 19},${top + 6}`} fill="#1a1a1a" />
            <polygon points={`${cx + 16},${bottom} ${cx + 13},${bottom - 6} ${cx + 19},${bottom - 6}`} fill="#1a1a1a" />
            <text
              x={cx + 21}
              y={bottom + 2}
              fontFamily="Georgia, 'Times New Roman', serif"
              fontStyle="italic"
              fontSize="12"
              fontWeight="600"
              fill="var(--pd-dark)"
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}


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
  const [tab, setTab] = useTabs<Gauge>("16", sku => {
    if (LCLEATS_16.some(p => p.id === sku)) return "16";
    if (LCLEATS_18.some(p => p.id === sku)) return "18";
    return undefined;
  });
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
                PRECISION FORMED

              </div>
              <div className="pd-glass-light px-4 py-2" style={{ fontSize: 12, color: "#fff", letterSpacing: "0.12em", fontWeight: 700, maxWidth: "100%" }}>
                PRECISE ANGLE ON BARBS FOR SUPERIOR HOLDING POWER
              </div>
              <div className="pd-glass-light px-4 py-2" style={{ fontSize: 12, color: "#fff", letterSpacing: "0.12em", fontWeight: 700, maxWidth: "100%" }}>
                INDUSTRY-LEADING HEAVY DUTY PACKAGING WITH EASY-TO-RESEAL BOXES HELPS REDUCE WASTE FOR CONTRACTORS
              </div>

            </div>
          </div>
          <div className="relative" style={{ aspectRatio: "4/5", maxHeight: 520 }}>
            <img
              src={images.lCleats.hero}
              alt="Pro-Drive L-Cleat strip — vertical product detail"
              loading="eager"
              style={{
                width: "100%", height: "100%", objectFit: "contain", objectPosition: "center",
                background: "#fff",
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
                  <div className="pd-label" style={{ color: "var(--pd-dark)", fontSize: 10, fontWeight: 800 }}>{s.k}</div>
                  <div className="font-bold mt-1" style={{ color: "var(--pd-dark)", fontSize: 13 }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div
              className="mt-3 px-4 py-3 text-sm"
              style={{ background: "#fff", borderLeft: "3px solid var(--pd-yellow)", color: "var(--pd-text)", lineHeight: 1.6 }}
            >
              <strong style={{ color: "var(--pd-dark)" }}>Packaging:</strong> All L-Cleats are shipped in 1,000ct boxes and packed in master cartons of 5 (1,000ct &times; 5 = 5,000ct per master carton).
            </div>
            <div className="mt-8">
              <ProductGrid products={g.products} />
            </div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE BANNER */}
      <section className="relative overflow-hidden" style={{ height: 420 }}>
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
            background: "linear-gradient(90deg, rgba(15,15,15,0.88) 0%, rgba(15,15,15,0.55) 60%, rgba(15,15,15,0.2) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex items-center px-[6%]">
          <div className="max-w-2xl flex gap-6 items-start">
            <img
              src={contractorBadgeUrl}
              alt="Contractor Grade badge"
              loading="lazy"
              style={{ width: 104, height: "auto", flexShrink: 0, marginTop: 4 }}
            />
            <div>
              <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Built for the Job</div>
              <h3 className="pd-display text-white mt-3" style={{ fontSize: 36, lineHeight: 1.1 }}>
                Pro installers trust Pro-Drive.
              </h3>
              <p className="mt-4 text-white/80" style={{ fontSize: 15, lineHeight: 1.7 }}>
                Collated flexible strips. Engineered to feed and drive without any issues through any major brand of nailer &mdash; Bostitch&reg;, Powernail&reg;, Primatech&reg;, and more.
              </p>
              <p className="mt-3 text-white/80" style={{ fontSize: 15, lineHeight: 1.7 }}>
                Heavy-duty hold for solid hardwood — 1-1/2&quot;, 1-3/4&quot;, and 2&quot; lengths.
              </p>
              <p className="mt-3 text-white/80" style={{ fontSize: 15, lineHeight: 1.7 }}>
                Made with premium grade recycled US steel.
              </p>
              <Link to="/contact" onClick={() => trackEvent("cta_click", { ctaLabel: "Request Distributor Pricing" })} className="pd-btn-primary mt-6 inline-block" style={{ padding: "12px 24px", fontSize: 12 }}>
                Request Pricing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DEPTH GUIDE */}
      <TechReference
        kicker="Reference"
        title="L-Cleat Subfloor Depth Chart"
        intro="Select the correct cleat length and gauge for your flooring thickness. Every diagram is drawn to the same scale — cleat length, flooring thickness, and penetration are directly comparable across cards."
        footnote="Actual fastener depth can vary based on wood milling or tongue profile. This chart is for reference purposes only. Consult wood manufacturers for correct fastener length before installation."
      >
        <div className="space-y-8">
          {cleatDepthChart.map(group => (
            <div key={group.len}>
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className="pd-display" style={{ color: "var(--pd-dark)", fontSize: 22, lineHeight: 1 }}>
                  {group.len}
                </h3>
                <span className="pd-label" style={{ color: "var(--pd-gold)", fontSize: 11 }}>{group.gauge}</span>
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
                    <CleatDepthDiagram
                      spec={spec}
                      cleatLenIn={group.lenIn}
                      uid={`${group.len.replace(/\W+/g, "")}-${spec.floor.replace(/\W+/g, "")}`}
                    />
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
                        {spec.floor} floor
                      </span>
                      <span
                        style={{
                          fontFamily: "ui-monospace, monospace",
                          fontSize: 10,
                          color: "var(--pd-dark)",
                          fontWeight: 700,
                        }}
                      >
                        {spec.pen} pen · {CLEAT_TONGUE} sub
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TechReference>

      <TechReference
        kicker="Dimensions"
        title="L-Cleat Profile — 16 GA & 18 GA"
        intro='Elevation view of the Pro-Drive L-cleat: a flat barbed shank with a perpendicular L-head flange bent off the top. Both gauges are drawn at the same scale — 16 GA runs a heavier shank and wider head flange than 18 GA.'
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
            <div className="pd-label mb-4" style={{ color: "var(--pd-gold)", fontSize: 11 }}>16 Gauge</div>
            <LCleatProfileDiagram sizes={LC16_SIZES} shankW={7} flangeW={13} gaugeLabel="16 GA" />
            <div className="mt-5 pt-4 text-xs" style={{ color: "var(--pd-muted)", borderTop: "1px solid rgba(0,0,0,0.06)", fontFamily: "ui-monospace, monospace" }}>
              16 GA · L-Head · Barbed Flat Shank · Chisel Point · 45&deg; Drive · E-G Galvanized · Meets ASTM F1667
            </div>
          </div>
          <div className="bg-white p-6" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
            <div className="pd-label mb-4" style={{ color: "var(--pd-gold)", fontSize: 11 }}>18 Gauge</div>
            <LCleatProfileDiagram sizes={LC18_SIZES} shankW={5.4} flangeW={10} gaugeLabel="18 GA" />
            <div className="mt-5 pt-4 text-xs" style={{ color: "var(--pd-muted)", borderTop: "1px solid rgba(0,0,0,0.06)", fontFamily: "ui-monospace, monospace" }}>
              18 GA · L-Head · Barbed Flat Shank · Chisel Point · 45&deg; Drive · E-G Galvanized · Meets ASTM F1667
            </div>
          </div>
        </div>
      </TechReference>



    </div>
  );
}
