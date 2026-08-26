import { createFileRoute } from "@tanstack/react-router";

// ─────────────────────────────────────────────────────────────────────────────
// Diagram Review — internal client-review page.
// Every diagram below is an exact copy of the live illustration code from
// the product pages (l-cleats.tsx, staples.tsx, brads-finish-nails.tsx).
// Do not tweak geometry here; changes belong on the source pages.
// ─────────────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/diagram-review")({
  head: () => ({
    meta: [
      { title: "Diagram Review | Pro-Drive Fasteners®" },
      { name: "description", content: "Internal review sheet of every technical illustration used across the Pro-Drive Fasteners® site." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Diagram Review — Pro-Drive Fasteners®" },
      { property: "og:description", content: "Isolated technical diagrams for client annotation." },
    ],
  }),
  component: DiagramReview,
});

// ══ Copied from src/routes/l-cleats.tsx ═════════════════════════════════════
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
const CWOOD_W = 127;
const CTONGUE_LEN = 11;   // how far the tongue lip protrudes past the board body

const CMAX_TOTAL = CMAX_FLOOR_IN + CMAX_PEN_IN; // vertical extent of the deepest cleat
const CVB_W = CLEFT_PAD + CWOOD_W + CTONGUE_LEN + CRIGHT_GUTTER;
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
  // Barb spurs lean toward the HEAD (up), not the tip (client, Aug 20).
  for (let i = 0; i < teeth; i++) {
    const y0 = barbTop + i * step;
    p.push(`L ${X(hw)} ${y0 + step * 0.38}`);
    p.push(`L ${X(hw + amp)} ${y0 + step * 0.38}`);
    p.push(`L ${X(hw)} ${y0 + step}`);
  }
  p.push(`L ${X(hw)} ${chiselTop}`);
  // Chisel point — one flat bevel across the full shank width (no needle).
  p.push(`L ${X(-hw)} ${L}`);
  p.push(`L ${X(-hw)} ${chiselTop}`);
  // Inner shank edge, bottom-up — barbs mirrored, also leaning toward the head.
  for (let i = teeth - 1; i >= 0; i--) {
    const y0 = barbTop + i * step;
    p.push(`L ${X(-hw)} ${y0 + step * 0.88}`);
    p.push(`L ${X(-hw - amp)} ${y0 + step * 0.5}`);
    p.push(`L ${X(-hw)} ${y0 + step * 0.5}`);
  }
  p.push(`L ${X(-hw)} ${barbTop}`);
  p.push(`L ${X(-hw)} ${headT}`);
  p.push(`L ${X(-flangeW - hw)} ${headT}`);
  p.push("Z");
  return p.join(" ");
}

/**
 * In-floor (installed) cleat silhouette for the subfloor depth chart.
 *
 * Per the client's reference diagram: at the drive angle the L-head is NOT
 * visible — only the shank entering the tongue shoulder — and the barbs read as
 * a fine texture, not sharp saw teeth. So this profile drops the head flange
 * entirely and uses a very shallow barb amplitude.
 */
function lCleatDrivenPath(L: number, shankW: number): string {
  const hw = shankW / 2;
  const barbTop = L * 0.22;
  const chiselTop = Math.max(barbTop + 4, L - shankW * 1.2);
  const amp = hw * 0.28;                                    // subtle barb texture
  const teeth = Math.max(6, Math.round((chiselTop - barbTop) / (shankW * 0.9)));
  const step = (chiselTop - barbTop) / teeth;
  const p: string[] = [];

  // Blunt, slightly rounded top end (the cut end of the shank at the tongue).
  p.push(`M ${-hw} ${0}`);
  p.push(`L ${hw} 0`);
  p.push(`L ${hw} ${barbTop}`);
  // Barb spurs lean toward the HEAD (up), matching the elevation profile.
  for (let i = 0; i < teeth; i++) {
    const y0 = barbTop + i * step;
    p.push(`L ${hw} ${y0 + step * 0.4}`);
    p.push(`L ${hw + amp} ${y0 + step * 0.4}`);
    p.push(`L ${hw} ${y0 + step}`);
  }
  p.push(`L ${hw} ${chiselTop}`);
  p.push(`L ${-hw} ${L}`);
  p.push(`L ${-hw} ${chiselTop}`);
  for (let i = teeth - 1; i >= 0; i--) {
    const y0 = barbTop + i * step;
    p.push(`L ${-hw} ${y0 + step * 0.9}`);
    p.push(`L ${-hw - amp} ${y0 + step * 0.5}`);
    p.push(`L ${-hw} ${y0 + step * 0.5}`);
  }
  p.push(`L ${-hw} ${barbTop}`);
  p.push("Z");
  return p.join(" ");
}

// Card media: the PRODUCT itself, drawn to scale from the SKU's own length, so
// the grid leads with the fastener instead of repeating carton photography.
const SKU_LEN_IN: Record<string, number> = {
  "LC125-18": 1.25,
  "LC150-18": 1.5,
  "LC175-18": 1.75,
  "LC150-16": 1.5,
  "LC175-16": 1.75,
  "LC200-16": 2,
};

const SKU_LEN_LABEL: Record<string, string> = {
  "LC125-18": '1-1/4"',
  "LC150-18": '1-1/2"',
  "LC175-18": '1-3/4"',
  "LC150-16": '1-1/2"',
  "LC175-16": '1-3/4"',
  "LC200-16": '2"',
};

function CleatSilhouette({ id, gauge }: { id: string; gauge: "16" | "18" }) {
  const lenIn = SKU_LEN_IN[id] ?? 1.75;
  const label = SKU_LEN_LABEL[id] ?? `${lenIn}"`;
  const SIL_PPI = 62;
  const L = lenIn * SIL_PPI;
  const shankW = gauge === "16" ? 5 : 4.2;
  const flange = 11;
  const headT = 4.4;
  const dimX = flange + shankW + 22;
  const w = dimX + 42;
  return (
    <svg viewBox={`0 -6 ${w} ${L + 16}`} style={{ height: 148, width: "auto" }} role="img"
      aria-label={`${label} ${gauge} GA L-cleat, shown to scale`}>
      <g transform={`translate(${flange + shankW / 2 + 6} 4)`}>
        <path d={lCleatPath(L, shankW, flange, headT, -1)} fill="#E7E7EC" stroke="#4A4A52" strokeWidth="0.9" />
      </g>
      <g fill="#6E6E76" fontFamily="Assistant, sans-serif" fontWeight="800" fontSize="9" letterSpacing="0.4">
        <line x1={dimX} y1={4} x2={dimX} y2={L + 4} stroke="#B9B9C0" strokeWidth="0.8" />
        <line x1={dimX - 3} y1={4} x2={dimX + 3} y2={4} stroke="#B9B9C0" strokeWidth="0.8" />
        <line x1={dimX - 3} y1={L + 4} x2={dimX + 3} y2={L + 4} stroke="#B9B9C0" strokeWidth="0.8" />
        <text x={dimX + 6} y={L / 2 + 7}>{label}</text>
      </g>
    </svg>
  );
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

  const floorTop = 0;
  const floorBottom = floorPx;
  const subfloorTop = floorBottom;
  const subfloorBottom = subfloorTop + CSUBFLOOR_H;

  // Tongue-and-groove profile of this board:
  //  - the TONGUE is the milled lip protruding off the RIGHT edge
  //  - the GROOVE is the receiving slot cut into the LEFT edge
  const tongueTop = floorPx * 0.34;
  const tongueBot = floorPx * 0.66;
  const tongueRootX = CLEFT_PAD + CWOOD_W;
  const tongueTipX = tongueRootX + CTONGUE_LEN;

  // The cleat is driven THROUGH THE TONGUE: it enters on the top surface of the
  // protruding tongue lip and travels down-left through the board body into the
  // subfloor. The head sits down on the tongue and is concealed when the next
  // board's groove slides over it. The visible top face is never broken, and the
  // fastener never enters the groove.
  const entryY = tongueTop;
  const verticalSpan = floorPx - entryY + penPx;
  const horizRun = Math.sqrt(Math.max(0, cleatLenPx ** 2 - verticalSpan ** 2));
  // Drive angle measured off vertical — used to rotate the whole cleat body.
  const driveDeg = (Math.atan2(horizRun, verticalSpan) * 180) / Math.PI;
  const SHANK_W = 4.4;          // flat cleat shank thickness


  // Entry point sits at the tongue-root corner (where the tongue meets the
  // board body) — per client markup, the fastener line meets that inside corner.
  const stapleX0 = tongueRootX;
  const stapleX1 = stapleX0 - horizRun;      // tip extends down-left
  const stapleY0 = entryY;
  const stapleY1 = entryY + verticalSpan;    // = floorBottom + penPx


  const penArrowX = stapleX1 - 10;
  const tongueArrowX = tongueTipX + 12;


  return (
    <svg viewBox={`0 -16 ${CVB_W + 20} ${CVB_H + 16}`} width="100%" style={{ display: "block" }} aria-hidden>
      <defs>
        <pattern id={`cleat-grain-${uid}`} width="60" height="14" patternUnits="userSpaceOnUse">
          <line x1="0" y1="7" x2="60" y2="7" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" strokeDasharray="10 4 4 4 6 6" />
        </pattern>
      </defs>

      {/* Flooring plank body (brown) — height scales with floor thickness */}
      <rect x={CLEFT_PAD} y={floorTop} width={CWOOD_W} height={floorPx} fill="#5C4128" />

      {/* GROOVE — receiving slot machined into the LEFT edge of the board.
          Cut out of the body so it reads as an open slot, not a painted line. */}
      <rect x={CLEFT_PAD} y={tongueTop} width={CTONGUE_LEN} height={tongueBot - tongueTop} fill="#F5F4EE" />
      <path
        d={`M ${CLEFT_PAD + CTONGUE_LEN} ${tongueTop} L ${CLEFT_PAD} ${tongueTop} M ${CLEFT_PAD} ${tongueBot} L ${CLEFT_PAD + CTONGUE_LEN} ${tongueBot} L ${CLEFT_PAD + CTONGUE_LEN} ${tongueTop}`}
        fill="none"
        stroke="#2B1D11"
        strokeWidth="0.9"
      />

      {/* TONGUE — the milled lip protruding off the RIGHT edge. This is the
          feature the fastener is driven through. */}
      <path
        d={`M ${tongueRootX} ${tongueTop} L ${tongueTipX - 2} ${tongueTop} L ${tongueTipX} ${tongueTop + 2} L ${tongueTipX} ${tongueBot - 2} L ${tongueTipX - 2} ${tongueBot} L ${tongueRootX} ${tongueBot} Z`}
        fill="#7A5A3C"
        stroke="#2B1D11"
        strokeWidth="0.9"
      />

      {/* TONGUE & GROOVE callouts — leaders land on the actual features */}
      <g fill="#1a1a1a" fontFamily="Assistant, sans-serif" fontWeight="800" fontSize="6.5" letterSpacing="0.7">
        <polyline
          points={`${CLEFT_PAD + CTONGUE_LEN / 2},${(tongueTop + tongueBot) / 2} ${CLEFT_PAD + CTONGUE_LEN / 2},${-6} ${CLEFT_PAD + 8},${-6}`}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="0.6"
        />
        <text x={CLEFT_PAD + 10} y={-4}>GROOVE (receives next board)</text>
        <polyline
          points={`${tongueRootX + CTONGUE_LEN / 2},${(tongueTop + tongueBot) / 2} ${tongueRootX + CTONGUE_LEN / 2},${-6} ${tongueTipX + 18},${-6}`}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="0.6"
        />
        <text x={tongueTipX + 20} y={-4}>TONGUE</text>
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

      {/* Subfloor body — always 3/4" tall (shared scale), runs under the tongue */}
      <rect x={CLEFT_PAD} y={subfloorTop} width={CWOOD_W + CTONGUE_LEN} height={CSUBFLOOR_H} fill="#D9C89F" />
      <rect x={CLEFT_PAD} y={subfloorTop} width={CWOOD_W + CTONGUE_LEN} height={CSUBFLOOR_H} fill={`url(#cleat-grain-${uid})`} />
      {[0.22, 0.48, 0.72].map(f => (
        <line
          key={f}
          x1={CLEFT_PAD}
          y1={subfloorTop + CSUBFLOOR_H * f}
          x2={CLEFT_PAD + CWOOD_W + CTONGUE_LEN}
          y2={subfloorTop + CSUBFLOOR_H * f}
          stroke="rgba(0,0,0,0.14)"
          strokeWidth="0.5"
          strokeDasharray="12 5 4 6"
        />
      ))}


      {/* L-CLEAT, as installed — driven THROUGH THE TONGUE at the true install
          angle. At this angle the L-head is not visible (it lies flush in the
          tongue shoulder), so only the shank is drawn, and the barbs read as a
          fine texture rather than saw teeth. */}
      <g transform={`rotate(${driveDeg} ${stapleX0} ${stapleY0}) translate(${stapleX0} ${stapleY0})`}>
        <path
          d={lCleatDrivenPath(cleatLenPx, SHANK_W)}
          fill="#EDEDF1"
          stroke="#1a1a1a"
          strokeWidth="0.9"
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


// ══ Copied from src/routes/staples.tsx ══════════════════════════════════════
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
const STAPLE_CROWN_LABEL = '1/2"';
const STAPLE_WIRE_PX = 4.2;

/**
 * Installed view of a flooring staple in the T&G cross-section. From this
 * angle the two legs line up directly behind the crown (which seats parallel
 * to the back edge of the tongue top), so the U-shape reads as a single
 * straight shank — the same convention as the L-cleat depth chart. Local
 * coords: crown end centred on x = 0 at y = 0, chisel tips at y = L.
 */
function stapleDrivenPath(L: number, wire: number): string {
  const hw = wire / 2;
  const tip = wire * 1.4;
  return [
    `M ${-hw} 0`,
    `L ${hw} 0`,
    `L ${hw} ${L - tip}`,
    `L 0 ${L}`,                            // chisel point
    `L ${-hw} ${L - tip}`,
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

  // Crown seats EXACTLY in the corner of the tongue (same convention as the
  // L-cleat depth chart) — client correction 8-20-2026.
  const stapleX0 = tongueRootX;

  const stapleX1 = stapleX0 - horizRun;       // tips travel down-left into subfloor
  const stapleY0 = entryY;
  const stapleY1 = entryY + verticalSpan;     // = floorBottom + penPx


  const penArrowX = Math.max(stapleX1 - 10, LEFT_PAD + 6);
  const tongueArrowX = LEFT_PAD + SUBFLOOR_W + 10;


  const lenDimX = -STAPLE_WIRE_PX / 2 - 13;

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

      {/* STAPLE — installed view: legs line up behind the crown, so it reads
          as a single straight shank entering the tongue corner at the real
          drive angle. */}
      <g transform={`rotate(${driveDeg} ${stapleX0} ${stapleY0}) translate(${stapleX0} ${stapleY0})`}>
        <path
          d={stapleDrivenPath(stapleLenPx, STAPLE_WIRE_PX)}
          fill="#EDEDF1"
          stroke="#1a1a1a"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* Crown width is not dimensioned in this view — the crown runs
            parallel to the tongue edge (into the page), so no width bracket
            is drawn. Crown label below keeps the spec visible. */}



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


// ══ Copied from src/routes/brads-finish-nails.tsx ═══════════════════════════
const brad18Sizes: { sku: string; label: string; lenIn: number }[] = [
  { sku: "AX08", label: '1/2"',    lenIn: 0.5 },
  { sku: "AX10", label: '5/8"',    lenIn: 0.625 },
  { sku: "AX11", label: '3/4"',    lenIn: 0.75 },
  { sku: "AX13", label: '1"',      lenIn: 1.0 },
  { sku: "AX15", label: '1-1/4"',  lenIn: 1.25 },
  { sku: "AX17", label: '1-1/2"',  lenIn: 1.5 },
  { sku: "AX18", label: '1-5/8"',  lenIn: 1.625 },
  { sku: "AX19", label: '1-3/4"',  lenIn: 1.75 },
  { sku: "AX21", label: '2"',      lenIn: 2.0 },
  { sku: "AX22", label: '2-1/8"',  lenIn: 2.125 },
];

// ─── 18 GA Brad Diagram — every nail drawn to the same pixels-per-inch ─────
const BRAD_PPI = 130;                       // vertical scale
const BRAD_COL_W = 60;                      // horizontal spacing per nail
const BRAD_LEFT_PAD = 24;
const BRAD_TOP_PAD = 48;                    // room for SKU label + gauge box
const BRAD_BOTTOM_PAD = 28;                 // room for length label
const BRAD_SHANK_W = 4.5;

function BradNailDiagram({ sizes }: { sizes: typeof brad18Sizes }) {
  const maxLen = Math.max(...sizes.map(s => s.lenIn));
  const w = BRAD_LEFT_PAD * 2 + sizes.length * BRAD_COL_W;
  const h = BRAD_TOP_PAD + maxLen * BRAD_PPI + BRAD_BOTTOM_PAD;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }} aria-hidden>
      {sizes.map((s, i) => {
        const cx = BRAD_LEFT_PAD + i * BRAD_COL_W + BRAD_COL_W / 2;
        const lenPx = s.lenIn * BRAD_PPI;
        const shankTop = BRAD_TOP_PAD;
        const shankBottom = shankTop + lenPx;
        return (
          <g key={s.sku}>
            {/* Gauge badge above head */}
            <rect
              x={cx - 22}
              y={4}
              width={44}
              height={18}
              fill="#e9e9ec"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="0.5"
            />
            <text
              x={cx}
              y={17}
              textAnchor="middle"
              fontFamily="Assistant, sans-serif"
              fontWeight="800"
              fontSize="11"
              fill="#1a1a1a"
            >
              {s.sku}
            </text>
            <text
              x={cx}
              y={34}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="9"
              fill="var(--pd-muted)"
            >
              .0468&quot;
            </text>

            {/* Headless profile — AX-series 18 GA brads have no T-head */}

            {/* Shank — vertical nail body, true to scale */}
            <line
              x1={cx}
              y1={shankTop}
              x2={cx}
              y2={shankBottom - 6}
              stroke="#8a8a90"
              strokeWidth={BRAD_SHANK_W}
              strokeLinecap="butt"
            />
            {/* highlight */}
            <line
              x1={cx - 1}
              y1={shankTop}
              x2={cx - 1}
              y2={shankBottom - 6}
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1"
            />
            {/* Chisel point */}
            <polygon
              points={`${cx - BRAD_SHANK_W / 2},${shankBottom - 6} ${cx + BRAD_SHANK_W / 2},${shankBottom - 6} ${cx + 1},${shankBottom}`}
              fill="#1a1a1a"
            />

            {/* Length label — italic script feel via style, positioned at tip */}
            <text
              x={cx + 8}
              y={shankBottom + 2}
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

// ─── 16 GA T-Head Diagram — same PPI convention as the 18 GA brad diagram ──
const c16Sizes: { sku: string; label: string; lenIn: number }[] = [
  { sku: "C25",  label: '1"',     lenIn: 1.0 },
  { sku: "C32",  label: '1-1/4"', lenIn: 1.25 },
  { sku: "C38",  label: '1-1/2"', lenIn: 1.5 },
  { sku: "C45",  label: '1-3/4"', lenIn: 1.75 },
  { sku: "C50",  label: '2"',     lenIn: 2.0 },
  { sku: "C64",  label: '2-1/2"', lenIn: 2.5 },
];

const afnSizes: { sku: string; label: string; lenIn: number }[] = [
  { sku: "AFN38", label: '1-1/2"', lenIn: 1.5 },
  { sku: "AFN45", label: '1-3/4"', lenIn: 1.75 },
  { sku: "AFN50", label: '2"',     lenIn: 2.0 },
];

const TH_SHANK_W = 5.5;
const TH_HEAD_W = 5;    // bar thickness (horizontal extent of the offset bar)
const TH_HEAD_H = 20;   // bar height — tall, pronounced T-head

function THeadNailDiagram({
  sizes,
  gaugeLabel = '.0625"',
  collationDeg = 0,
  head = "t",
}: {
  sizes: { sku: string; label: string; lenIn: number }[];
  gaugeLabel?: string;
  collationDeg?: number;
  /** "t" = offset T-head bar; "oval" = small oval head (16 GA straight, client ref Aug 17) */
  head?: "t" | "oval";
}) {
  const maxLen = Math.max(...sizes.map(s => s.lenIn));
  const rad = (collationDeg * Math.PI) / 180;
  const maxRun = Math.sin(rad) * maxLen * BRAD_PPI;   // horizontal drift from the tilt
  const colW = BRAD_COL_W + maxRun * 0.75;
  const w = BRAD_LEFT_PAD * 2 + sizes.length * colW + maxRun;
  const h = BRAD_TOP_PAD + Math.cos(rad) * maxLen * BRAD_PPI + BRAD_BOTTOM_PAD;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }} aria-hidden>
      {sizes.map((s, i) => {
        const cx = BRAD_LEFT_PAD + maxRun + i * colW + colW / 2;
        const lenPx = s.lenIn * BRAD_PPI;
        const shankTop = BRAD_TOP_PAD;
        const shankBottom = shankTop + lenPx;
        // Tip position once the nail is tilted to the collation angle.
        const tipX = cx - Math.sin(rad) * lenPx;
        const tipY = shankTop + Math.cos(rad) * lenPx;
        return (
          <g key={s.sku}>
            {/* SKU badge */}
            <rect x={cx - 24} y={4} width={48} height={18} fill="#e9e9ec" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
            <text x={cx} y={17} textAnchor="middle" fontFamily="Assistant, sans-serif" fontWeight="800" fontSize="11" fill="#1a1a1a">
              {s.sku}
            </text>
            <text x={cx} y={34} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="var(--pd-muted)">
              {gaugeLabel}
            </text>

            {/* Nail body — rotated to the collation angle (0° for straight strips) */}
            <g transform={`rotate(${collationDeg} ${cx} ${shankTop})`}>
              {head === "oval" ? (
                /* OVAL HEAD — small slightly-crowned oval cap centered on the shank
                   (client reference, Aug 17: 16 GA straight is NOT an L/T head) */
                <ellipse
                  cx={cx}
                  cy={shankTop + 1.6}
                  rx={TH_SHANK_W * 1.15}
                  ry={3.1}
                  fill="#1a1a1a"
                />
              ) : (
                <>
                  {/* T-HEAD — tall offset rectangular bar to one side of the shank */}
                  <rect
                    x={cx - TH_SHANK_W / 2 - TH_HEAD_W}
                    y={shankTop - 2}
                    width={TH_HEAD_W + TH_SHANK_W}
                    height={TH_HEAD_H}
                    fill="#1a1a1a"
                  />
                  {/* top cap across shank + head for the flat T crown */}
                  <rect x={cx - TH_SHANK_W / 2 - TH_HEAD_W} y={shankTop - 5} width={TH_HEAD_W + TH_SHANK_W} height={4} fill="#1a1a1a" />
                </>
              )}

              {/* Shank */}
              <line
                x1={cx}
                y1={shankTop}
                x2={cx}
                y2={shankBottom - 7}
                stroke="#8a8a90"
                strokeWidth={TH_SHANK_W}
                strokeLinecap="butt"
              />
              <line
                x1={cx - 1.2}
                y1={shankTop + TH_HEAD_H}
                x2={cx - 1.2}
                y2={shankBottom - 7}
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.2"
              />
              {/* Chisel point */}
              <polygon
                points={`${cx - TH_SHANK_W / 2},${shankBottom - 7} ${cx + TH_SHANK_W / 2},${shankBottom - 7} ${cx + 1},${shankBottom}`}
                fill="#1a1a1a"
              />
            </g>

            {/* Length label */}
            <text
              x={tipX + 9}
              y={tipY + 2}
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

      {/* Collation angle callout */}
      {collationDeg > 0 && (
        <g>
          <line
            x1={BRAD_LEFT_PAD + 4}
            y1={BRAD_TOP_PAD}
            x2={BRAD_LEFT_PAD + 52}
            y2={BRAD_TOP_PAD}
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="0.8"
            strokeDasharray="4 3"
          />
          <line
            x1={BRAD_LEFT_PAD + 46}
            y1={BRAD_TOP_PAD - 2}
            x2={BRAD_LEFT_PAD + 46}
            y2={BRAD_TOP_PAD + 62}
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="0.8"
            strokeDasharray="4 3"
          />
          <line
            x1={BRAD_LEFT_PAD + 46}
            y1={BRAD_TOP_PAD - 2}
            x2={BRAD_LEFT_PAD + 46 - Math.sin(rad) * 62}
            y2={BRAD_TOP_PAD - 2 + Math.cos(rad) * 62}
            stroke="#b8891f"
            strokeWidth="1.4"
          />
          <text
            x={BRAD_LEFT_PAD + 40}
            y={BRAD_TOP_PAD + 46}
            textAnchor="end"
            fontFamily="ui-monospace, monospace"
            fontSize="11"
            fontWeight="700"
            fill="var(--pd-dark)"
          >
            {collationDeg}°
          </text>
        </g>
      )}

    </svg>
  );
}



function Frame({ title, note, children, maxWidth = 760 }: { title: string; note?: string; children: React.ReactNode; maxWidth?: number }) {
  return (
    <section style={{ border: "1px solid #d4d4d8", background: "#ffffff", padding: 24, marginBottom: 28 }}>
      <h2 style={{ fontFamily: "Assistant, sans-serif", fontWeight: 800, fontSize: 20, color: "#1a1a1a", letterSpacing: "0.01em" }}>{title}</h2>
      {note && <p style={{ marginTop: 4, fontSize: 13, color: "#6E6E76" }}>{note}</p>}
      <div style={{ marginTop: 18, maxWidth, marginLeft: "auto", marginRight: "auto" }}>{children}</div>
    </section>
  );
}

function DiagramReview() {
  return (
    <main style={{ background: "#ffffff", color: "#1a1a1a", padding: "40px 5%" }}>
      <h1 style={{ fontFamily: "Assistant, sans-serif", fontWeight: 800, fontSize: 28 }}>Diagram Review</h1>
      <p style={{ marginTop: 8, marginBottom: 32, fontSize: 15, color: "#3f3f46" }}>
        Diagram Review — please annotate any final changes needed on these illustrations.
      </p>

      {/* L-Cleat profile / elevation */}
      <Frame title={'L-Cleat profile — 16 GA, barbed (elevation)'} maxWidth={560}>
        <LCleatProfileDiagram sizes={LC16_SIZES} shankW={7} flangeW={13} gaugeLabel="16 GA" />
      </Frame>
      <Frame title={'L-Cleat profile — 18 GA, barbed (elevation)'} maxWidth={560}>
        <LCleatProfileDiagram sizes={LC18_SIZES} shankW={5.4} flangeW={10} gaugeLabel="18 GA" />
      </Frame>
      <Frame title={'L-Cleat silhouette — 16 GA (card art)'} maxWidth={300}>
        <CleatSilhouette id="LC175-16" gauge="16" />
      </Frame>
      <Frame title={'L-Cleat silhouette — 18 GA (card art)'} maxWidth={300}>
        <CleatSilhouette id="LC175-18" gauge="18" />
      </Frame>

      {/* L-Cleat subfloor depth chart — every gauge / size / floor thickness */}
      {cleatDepthChart.map(group =>
        group.items.map(spec => (
          <Frame
            key={`${group.len}-${spec.floor}`}
            title={`L-Cleat depth — ${group.gauge}, ${group.len.replace(/\s*l-cleats?/i, "")} cleat, ${spec.floor} floor`}
            note={`Penetration into subfloor: ${spec.pen} · flooring ${spec.floor} (${spec.floorMm})`}
          >
            <CleatDepthDiagram
              spec={spec}
              cleatLenIn={group.lenIn}
              uid={`rev-${group.len.replace(/\W+/g, "")}-${spec.floor.replace(/\W+/g, "")}`}
            />
          </Frame>
        ))
      )}

      {/* Staple depth — tongue entry */}
      {depthChart.map(group =>
        group.items.map(spec => (
          <Frame
            key={`st-${group.len}-${spec.floor}`}
            title={`Staple depth — tongue entry, 15.5 GA ${group.len.replace(/\s*staples?/i, "")} staple, ${spec.floor} floor`}
            note={`Penetration into subfloor: ${spec.pen} · flooring ${spec.floor} (${spec.floorMm})`}
          >
            <StapleDepthDiagram
              spec={spec}
              stapleLenIn={group.lenIn}
              stapleLenLabel={group.len.replace(/\s*staples?/i, "")}
              uid={`rev-st-${group.len.replace(/\W+/g, "")}-${spec.floor.replace(/\W+/g, "")}`}
            />
          </Frame>
        ))
      )}

      {/* Senco-style U-staple technical drawings */}
      <Frame title={'Staple technical drawing — 15 GA Q-Wire, 7/16" crown'} maxWidth={520}>
        <SencoStapleDiagram crownIn={7 / 16} crownLabel={'7/16"'} lengths={QWIRE_15_LENGTHS} ppi={70} />
      </Frame>
      <Frame title={'Staple technical drawing — 16 GA N-Wire, 7/16" crown'} maxWidth={520}>
        <SencoStapleDiagram crownIn={7 / 16} crownLabel={'7/16"'} lengths={NWIRE_16_LENGTHS} ppi={70} />
      </Frame>
      <Frame title={'Staple technical drawing — 18 GA M-Wire, 1/4" crown'} maxWidth={520}>
        <SencoStapleDiagram crownIn={0.25} crownLabel={'1/4"'} lengths={MWIRE_18_LENGTHS} ppi={70} />
      </Frame>
      <Frame title={'Staple technical drawing — 18 GA L-Wire, 1/4" crown'} maxWidth={520}>
        <SencoStapleDiagram crownIn={0.25} crownLabel={'1/4"'} lengths={LWIRE_18_LENGTHS} ppi={70} />
      </Frame>

      {/* Nails */}
      <Frame title={'18 GA Brad nails — to-scale length comparison'} maxWidth={520}>
        <BradNailDiagram sizes={brad18Sizes} />
      </Frame>
      <Frame title={'16 GA Straight Finish Nail — oval head, 0° collation'} maxWidth={520}>
        <THeadNailDiagram sizes={c16Sizes} head="oval" />
      </Frame>
      <Frame title={'15 GA Angled Finish Nail — T-head, 20° collation'} maxWidth={520}>
        <THeadNailDiagram sizes={afnSizes} collationDeg={20} />
      </Frame>

      <p style={{ marginTop: 8, fontSize: 13, color: "#6E6E76" }}>
        Note: the Divergent Staples, Tapping Rings, Tapping Blocks, Mallets, and Tipper-De-Tipper
        pages use photography rather than vector diagrams — there are no drawn illustrations on
        those pages to review.
      </p>
    </main>
  );
}
