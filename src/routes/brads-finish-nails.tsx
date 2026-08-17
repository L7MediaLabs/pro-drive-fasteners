import { createFileRoute } from "@tanstack/react-router";
import { Callout, InfoPanel, InterchangeList } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import {
  CinematicHero,
  LifestyleBanner,
  TechReference,
  RelatedProducts,
  PageDisclaimers,
  BulletBlock,
} from "../components/editorial";
import { FN15, DA15, C16, AFN, BRAD18, PINS23, pickRelated } from "../data/products";
import { NailMedia, ShelfPhoto, maxLenIn, type NailHead } from "../components/productMedia";
import type { Product } from "../components/ProductCard";
import gradeContractorAsset from "../assets/badge-contractor-grade.png.asset.json";
const gradeContractor = gradeContractorAsset.url;
import { images } from "../data/images";
import { CounterMatSection } from "../components/CounterMat";

/**
 * SKUs whose catalog photo is a genuine PRODUCT-level shot (a collated strip or
 * a macro of the nail itself) rather than carton artwork. Those photos keep the
 * lead on their card; every other SKU leads with a to-scale drawing of itself,
 * and the carton artwork moves to the section shelf reference.
 */
const PRODUCT_PHOTO_SKUS = new Set(["FN1524-150", "C50-200SS", "DA21-200SS", "DA15-BARB"]);

function nailMedia(head: NailHead, products: Product[]) {
  const familyMax = maxLenIn(products);
  return (p: Product) =>
    PRODUCT_PHOTO_SKUS.has(p.id) ? null : <NailMedia sku={p.id} familyMax={familyMax} head={head} />;
}

// Client-supplied collation copy (Hollis, 8-8-2026) — repeated on every nail
// family section verbatim.
const COLLATION_BULLETS = [
  "Made with premium steel, guaranteed not to bend or jam",
  "We offer a free counter mat to show all the finish/brad nails in English, Spanish & Portuguese",
  "Our Glue Collation is the best in the industry, reducing jamming from broken/loose tape",
];

function CollationBlock() {
  return (
    <div className="mt-6">
      <BulletBlock kicker="Collation & Steel" bullets={COLLATION_BULLETS.map((b) => b)} />
    </div>
  );
}

export const Route = createFileRoute("/brads-finish-nails")({
  head: () => ({
    meta: [
      { title: "Brads & Finish Nails | Pro-Drive Fasteners®" },
      { name: "description", content: "Professional grade finish nails in every angle and gauge. 15 GA, 16 GA, 18 GA, and 23 GA micro pins." },
      { property: "og:title", content: "Brads & Finish Nails — Pro-Drive Fasteners®" },
      { property: "og:description", content: "Every angle, every gauge. Contractor tested. Guaranteed not to jam." },
      { property: "og:image", content: images.finishNails.strip },
      { property: "twitter:image", content: images.finishNails.strip },
    ],
  }),
  component: Brads,
});

const C16_TOOLS = "Dewalt DCN660D1;Metabo HPT NT65M2SM;MAX NF565A/16;Omer 14.50;Paslode IM250S-Li;Paslode T250S-F16;Senco 16XP;Stanley Bostitch FN1664K".split(";");
const BRAD18_TOOLS = "Duo-Fast 4450;Duo-Fast 4450ST;Dewalt DC608K;Dewalt DCN680D1;Dewalt DCN680B;Dewalt DWFP12233;Grip-Rite GRTBN200;Grex 1850GB;Paslode T200 F18;Paslode IM200-Li;Senco FinishPro FP25XP;Senco FinishPro 18MG;Senco SLP20XP;Senco FinishPro 2N1;Senco FP18MG;Senco FN55AX;Metabo HPT NT50AE2M;Stanley Bostitch BT1855K;Stanley Bostitch SB-2IN1".split(";");
const PIN23_TOOLS = "Cadex 23/15-10M;Duo-Fast 2320;Fasco ES2316P;Grex P6/15L;Grip-Rite GR58PIN;Grizzly H5044;Hitachi 23000;Metabo HPT 23000;Porter-Cable PPN23063;Prebena AL16CRF;Senco A100629;Spotnail 23010;Unicatch CZ16".split(";");

type Family = {
  id: string;
  gauge: string;
  brand: string;
  label: string;
  image: string;
};

const families: Family[] = [
  { id: "fn15",   gauge: "15 GA", brand: "Fits Bostitch®", label: "FN 25° Angle",     image: images.nailFamilies.fn15_25 },
  { id: "da15",   gauge: "15 GA", brand: "Fits Senco®",    label: "DA 34° Angle",     image: images.nailFamilies.da15_34 },
  { id: "c16",    gauge: "16 GA", brand: "Universal",       label: "16 Straight Nail", image: images.nailFamilies.c16_straight },
  { id: "afn16",  gauge: "16 GA", brand: "Fits Paslode®",  label: "AFN 20° Angle",    image: images.nailFamilies.afn16_20 },
  { id: "brad18", gauge: "18 GA", brand: "Universal",       label: "Straight Brad",    image: images.nailFamilies.brad18_straight },
  { id: "pin23",  gauge: "23 GA", brand: "Universal",       label: "Micro Pin",        image: images.nailFamilies.pin23_micro },
];

// 18 GA size chart (AX08 → AX22) — matches printed comparison chart
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



function Brads() {
  const allShownIds = [...FN15, ...DA15, ...C16, ...AFN, ...BRAD18, ...PINS23].map(p => p.id);
  const related = pickRelated(allShownIds, 6);

  return (
    <div>
      <CinematicHero
        kicker="Brads & Finish Nails"
        title={<>The Right Nail.<br />Every Angle. Every Gauge.</>}
        description="Professional grade finish nails in every collation angle. Contractor tested. Chisel-point, smooth shank. Meets ASTM F1667."
        bgImage={images.finishNails.c50_200}
        badges={[
          { label: "CONTRACTOR TESTED" },
          { label: "JAM-FREE GUARANTEE" },
          { label: "MEETS ASTM F1667" },
        ]}
        rightImage={images.finishNails.c50_200}
        rightImageAlt="Pro-Drive Fasteners® 16 GA Finish Nails, Item C50-200"
        rightImageFit="contain"
      />

      {/* Visual family selector */}
      <section className="px-[6%] py-14" style={{ background: "var(--pd-dark)" }}>
        <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Select a Nail Family</div>
        <h2 className="pd-display text-white mt-2" style={{ fontSize: 30 }}>Six angles. One promise: no jams.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-3">
          {families.map(f => (
            <a
              key={f.id}
              href={`#${f.id}`}
              className="block group overflow-hidden transition-all"
              style={{ background: "rgba(255,205,0,0.04)", border: "1px solid rgba(255,205,0,0.15)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--pd-yellow)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,205,0,0.15)")}
            >
              <div
                className="w-full flex items-center justify-center overflow-hidden"
                style={{ height: 140, background: "#0a0a0a" }}
              >
                <img
                  src={f.image}
                  alt={`${f.gauge} ${f.label} collation`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: "center" }}
                />
              </div>
              <div className="p-5 flex items-start justify-between gap-3">
                <div>
                  <div className="pd-label" style={{ color: "var(--pd-yellow)", fontSize: 11 }}>{f.gauge}</div>
                  <div className="font-bold text-white mt-1" style={{ fontSize: 16 }}>{f.label}</div>
                  <div className="mt-1" style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{f.brand}</div>
                </div>
                <div
                  className="shrink-0 mt-1"
                  style={{ color: "var(--pd-yellow)", fontSize: 20, lineHeight: 1 }}
                  aria-hidden
                >→</div>
              </div>
            </a>
          ))}
        </div>
      </section>


      <section className="px-[6%] py-12 space-y-14" style={{ background: "var(--pd-light-bg)" }}>
        <div id="fn15">
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>15 GA FN — 25° Angle</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>Fits Bostitch® 25°</h2>
          <div className="grid lg:grid-cols-[1fr_300px] gap-6 mt-4 items-start">
            <ProductGrid products={FN15} media={nailMedia("fn", FN15)} />
            <ShelfPhoto
              src={images.finishNails.fn1520_125_box}
              alt="Pro-Drive Fasteners® 15 GA FN 25° finish nail box"
              label="15 GA FN Packaging"
              caption="How the FN 25° boxes stock on the shelf."
            />
          </div>
          <CollationBlock />
          <InfoPanel
            applications="Interior finish, trim work, hardwood flooring, baseboards."
            materials="Electro-Galvanized Steel. Chisel Point, Smooth Shank."
            standards="Meets ASTM F1667. Contractor packed 3,655 per box."
          >
            <div><strong style={{ color: "var(--pd-dark)" }}>Fits:</strong> Bostitch® 25° tools.</div>
          </InfoPanel>
        </div>

        <div id="da15">
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>15 GA DA — 34° Angle</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>Fits Senco® 34°</h2>
          <div className="grid lg:grid-cols-[1fr_300px] gap-6 mt-4 items-start">
            <ProductGrid products={DA15} media={nailMedia("fn", DA15)} />
            <ShelfPhoto
              src={images.finishNails.da21_200}
              alt="Pro-Drive Fasteners® 15 GA DA 34° finish nail box"
              label="15 GA DA Packaging"
              caption="How the DA 34° boxes stock on the shelf."
            />
          </div>
          <CollationBlock />
          <InfoPanel
            applications="Interior finish, trim, and casing."
            materials="Chisel Point, Smooth Shank. Available in Stainless Steel."
            standards="Meets ASTM F1667. Contractor packed 4,000 per box."
          >
            <div><strong style={{ color: "var(--pd-dark)" }}>Fits:</strong> Senco® 34° tools.</div>
          </InfoPanel>
        </div>

        <div id="c16">
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>16 GA — 0° Straight</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>16 Straight Nail</h2>
          <p className="mt-2" style={{ color: "var(--pd-muted)", fontSize: 14 }}>16 gauge · 0° straight collation · universal fit</p>
          <div className="grid lg:grid-cols-[1fr_300px] gap-6 mt-4 items-start">
            <ProductGrid products={C16} media={nailMedia("thead", C16)} />
            <ShelfPhoto
              src={images.finishNails.c50_200}
              alt="Pro-Drive Fasteners® 16 GA finish nail carton"
              label="16 GA Straight Packaging"
              caption="2,500 per box · 12 boxes per carton."
            />
          </div>
          <CollationBlock />
          <InfoPanel
            materials="Blunt Chisel Point, Smooth Shank. Available in Stainless Steel."
            standards="Meets ASTM F1667. 2,500 per box · 12 boxes per carton."
          >
            <div>Universal fit for most straight no-angle 16 gauge finish nailers.</div>
          </InfoPanel>
          <InterchangeList tools={C16_TOOLS} />
        </div>
      </section>

      <LifestyleBanner
        image={images.finishNails.strips_lifestyle}
        badge={{ src: gradeContractor, alt: "Contractor Grade" }}

        kicker="Contractor Grade"
        title="Professional grade. Contractor tested."
        body="Precise chisel points. Consistent collation. Guaranteed not to jam in any major brand of finish nailer. Order by the box or bulk contractor pack."
      />

      <section className="px-[6%] py-12 space-y-14" style={{ background: "var(--pd-light-bg)" }}>
        <div id="afn16">
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>16 GA AFN — 20° Angle</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>Fits Paslode® 20°</h2>
          {/* No AFN 20° carton photography on file — product drawings only. */}
          <div className="mt-4"><ProductGrid products={AFN} media={nailMedia("fn", AFN)} /></div>
          <CollationBlock />
          <Callout>Fits Paslode® 20° angle tools.</Callout>
        </div>

        <div id="brad18">
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>18 GA — 0° Straight Brad</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>Universal Brad Nails</h2>
          <div className="grid lg:grid-cols-[1fr_300px] gap-6 mt-4 items-start">
            <ProductGrid products={BRAD18} media={nailMedia("brad", BRAD18)} />
            <ShelfPhoto
              src={images.brads18.axx21_200}
              alt="Pro-Drive Fasteners® 18 GA brad nail box"
              label="18 GA Brad Packaging"
              caption="5,000 per box — how the brad boxes stock on the shelf."
            />
          </div>
          <CollationBlock />
          <InfoPanel
            applications="Interior finish, trim work, hardwood flooring, baseboards."
            materials='Chisel Point, Smooth Shank (.0468").'
            standards="Meets ASTM F1667. 5,000 per box."
          >
            <div>Designed to be universal fit for most straight no-angle 18 GA medium head finish nailers.</div>
          </InfoPanel>
          <InterchangeList tools={BRAD18_TOOLS} />
        </div>

        <div id="pin23">
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>23 GA Micro Pins</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>The Invisible Fastener</h2>
          {/* No 23 GA pin carton photography on file — product drawings only. */}
          <div className="mt-4"><ProductGrid products={PINS23} media={nailMedia("pin", PINS23)} /></div>
          <CollationBlock />
          <Callout>Micro Pins fasten the smallest of trim securely, leaving a nearly invisible hole. Directional arrows painted on strips eliminate loading errors.</Callout>
          <InfoPanel
            applications="Interior finish and trim, carving and ornamentals, rattan furniture production, picture and mirror frames, window beading, molding, decorative trim, cabinets."
          />
          <InterchangeList tools={PIN23_TOOLS} />
        </div>
      </section>

      <TechReference
        kicker="Reference"
        title="18 GA Brad Size Comparison"
        intro='All Pro-Drive Fasteners® 18 GA brads share a .0468" chisel-point shank. Every nail is drawn to the same scale — compare relative lengths at a glance from 1/2" through 2-1/8".'
      >
        <div className="bg-white p-6" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
          <BradNailDiagram sizes={brad18Sizes} />
          <div className="mt-5 pt-4 text-xs" style={{ color: "var(--pd-muted)", borderTop: "1px solid rgba(0,0,0,0.06)", fontFamily: "ui-monospace, monospace" }}>
            Shank Ø .0468" · Chisel Point · Smooth Shank · Meets ASTM F1667 · Drawn to scale
          </div>
        </div>
      </TechReference>

      <TechReference
        kicker="Reference"
        title="16 GA T-Head Profile — Straight (C-Series)"
        intro='Pro-Drive Fasteners® 16 GA straight finish nails use a T-head: a tall, offset rectangular bar head set to one side of the .0625" shank — noticeably more pronounced than the small cap head on an 18 GA brad. Drawn to the same scale as the brad chart.'
      >
        <div className="bg-white p-6" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
          <THeadNailDiagram sizes={c16Sizes} />
          <div className="mt-5 pt-4 text-xs" style={{ color: "var(--pd-muted)", borderTop: "1px solid rgba(0,0,0,0.06)", fontFamily: "ui-monospace, monospace" }}>
            Shank Ø .0625" · T-Head · Blunt Chisel Point · Smooth Shank · Meets ASTM F1667 · Drawn to scale
          </div>
        </div>
      </TechReference>

      <TechReference
        kicker="Reference"
        title="16 GA T-Head Profile — AFN 20° (Paslode® Fit)"
        intro="AFN angled 16 GA nails carry the same offset T-head bar profile, collated at 20° for Paslode® angle finish nailers. Shown at the same scale for direct comparison."
      >
        <div className="bg-white p-6" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
          <THeadNailDiagram sizes={afnSizes} collationDeg={20} />
          <div className="mt-5 pt-4 text-xs" style={{ color: "var(--pd-muted)", borderTop: "1px solid rgba(0,0,0,0.06)", fontFamily: "ui-monospace, monospace" }}>
            Shank Ø .0625" · T-Head · Chisel Point · 20° Collation · Meets ASTM F1667 · Drawn to scale
          </div>
        </div>
      </TechReference>


      <CounterMatSection />

      <RelatedProducts products={related} />
      <PageDisclaimers galvanized trademarks />
    </div>
  );
}
