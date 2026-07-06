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
type StapleGroup = { len: string; items: StapleSpec[] };

const depthChart: StapleGroup[] = [
  {
    len: '2" Staples',
    items: [
      { crown: '5/8"', crownMm: "16mm", pen: '1-1/16"' },
      { crown: '3/4"', crownMm: "19mm", pen: '1"' },
    ],
  },
  {
    len: '1-3/4" Staples',
    items: [
      { crown: '1/2"',  crownMm: "12mm", pen: '31/32"' },
      { crown: '9/16"', crownMm: "14mm", pen: '29/32"' },
      { crown: '5/8"',  crownMm: "16mm", pen: '7/8"' },
      { crown: '3/4"',  crownMm: "19mm", pen: '13/16"' },
    ],
  },
  {
    len: '1-1/2" Staples',
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

// SVG diagram of one staple embedded in a 3/4" tongue-and-groove floor cross-section.
function StapleDepthDiagram({ spec, uid }: { spec: StapleSpec; uid: string }) {
  // Coordinate system
  const W = 200, H = 150;
  const crownH = 26;
  const woodTop = crownH;
  const woodH = 96;
  const woodBottom = woodTop + woodH;
  const rightGutter = 46; // space for tongue arrow

  // Staple diagonal: from crown left edge down-right into wood
  const stapleTopX = 22;
  const stapleTopY = crownH;
  const stapleBotX = 82;
  const stapleBotY = crownH + 78; // penetration end

  // Vertical penetration arrow inside wood
  const penX = stapleBotX + 14;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }} aria-hidden>
      <defs>
        <pattern id={`grain-${spec.crown}-${spec.pen}`} width="60" height="14" patternUnits="userSpaceOnUse">
          <line x1="0" y1="7" x2="60" y2="7" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" strokeDasharray="10 4 4 4 6 6" />
        </pattern>
      </defs>

      {/* Crown / top strip (brown, matches R22) */}
      <rect x="0" y="0" width={W - rightGutter} height={crownH} fill="#5C4128" />
      {/* Notch on left (represents groove-side tab) */}
      <rect x="0" y={crownH * 0.35} width="4" height={crownH * 0.55} fill="#F5F4EE" />
      {/* Crown label */}
      <text x="12" y={crownH * 0.68} fill="#fff" fontFamily="Assistant, sans-serif" fontWeight="800" fontSize="11">
        {spec.crown}
      </text>
      <text x="12" y={crownH * 0.68} dx={spec.crown.length * 6.5 + 6} fill="rgba(255,255,255,0.75)" fontFamily="Assistant, sans-serif" fontWeight="600" fontSize="8">
        ({spec.crownMm})
      </text>

      {/* Wood body */}
      <rect x="0" y={woodTop} width={W - rightGutter} height={woodH} fill="#D9C89F" />
      <rect x="0" y={woodTop} width={W - rightGutter} height={woodH} fill={`url(#grain-${spec.crown}-${spec.pen})`} />
      {/* Additional grain hairlines for detail */}
      {[0.2, 0.42, 0.6, 0.78].map(f => (
        <line
          key={f}
          x1="0"
          y1={woodTop + woodH * f}
          x2={W - rightGutter}
          y2={woodTop + woodH * f}
          stroke="rgba(0,0,0,0.14)"
          strokeWidth="0.5"
          strokeDasharray="12 5 4 6"
        />
      ))}

      {/* Staple: shank as thin light metallic line */}
      <line x1={stapleTopX} y1={stapleTopY} x2={stapleBotX} y2={stapleBotY} stroke="#C8C8CC" strokeWidth="1.6" strokeLinecap="round" />
      <line x1={stapleTopX} y1={stapleTopY} x2={stapleBotX} y2={stapleBotY} stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" />
      {/* Staple point */}
      <polygon
        points={`${stapleBotX - 2},${stapleBotY - 3} ${stapleBotX + 3},${stapleBotY + 1} ${stapleBotX - 1},${stapleBotY + 2}`}
        fill="#1a1a1a"
      />

      {/* Penetration arrow (inside wood) */}
      <line x1={penX} y1={woodTop + 2} x2={penX} y2={stapleBotY} stroke="#1a1a1a" strokeWidth="1" />
      {/* Arrowheads */}
      <polygon points={`${penX},${woodTop + 2} ${penX - 3},${woodTop + 8} ${penX + 3},${woodTop + 8}`} fill="#1a1a1a" />
      <polygon points={`${penX},${stapleBotY} ${penX - 3},${stapleBotY - 6} ${penX + 3},${stapleBotY - 6}`} fill="#1a1a1a" />
      {/* Penetration label */}
      <text
        x={penX + 6}
        y={(woodTop + stapleBotY) / 2 + 4}
        fill="#1a1a1a"
        fontFamily="Assistant, sans-serif"
        fontWeight="800"
        fontSize="11"
      >
        {spec.pen}
      </text>

      {/* Tongue (3/4") arrow gutter — outside wood block, right side */}
      <line x1={W - rightGutter + 10} y1={woodTop} x2={W - rightGutter + 10} y2={woodBottom} stroke="#1a1a1a" strokeWidth="1" />
      <polygon points={`${W - rightGutter + 10},${woodTop} ${W - rightGutter + 7},${woodTop + 6} ${W - rightGutter + 13},${woodTop + 6}`} fill="#1a1a1a" />
      <polygon points={`${W - rightGutter + 10},${woodBottom} ${W - rightGutter + 7},${woodBottom - 6} ${W - rightGutter + 13},${woodBottom - 6}`} fill="#1a1a1a" />
      <text
        x={W - rightGutter + 17}
        y={(woodTop + woodBottom) / 2 + 4}
        fill="#1a1a1a"
        fontFamily="Assistant, sans-serif"
        fontWeight="800"
        fontSize="11"
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
                style={{ gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))` }}
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
                    <StapleDepthDiagram spec={spec} />
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

