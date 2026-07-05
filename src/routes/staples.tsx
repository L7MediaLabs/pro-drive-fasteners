import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel, Callout, InfoPanel, InterchangeList } from "../components/PageHeader";
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

// Depth chart data — R22 pg. 5
const depthChart = [
  {
    len: '2" Staples',
    rows: [
      '5/8" Crown → 1-1/16" pen · 3/4" tongue',
      '3/4" Crown → 1" pen · 3/4" tongue',
    ],
  },
  {
    len: '1-3/4" Staples',
    rows: [
      '1/2" Crown  → 31/32" · 3/4"',
      '9/16" Crown → 29/32" · 3/4"',
      '5/8" Crown  → 7/8"   · 3/4"',
      '3/4" Crown  → 13/16" · 3/4"',
    ],
  },
  {
    len: '1-1/2" Staples',
    rows: [
      '3/8" Crown  → 7/8"   · 3/4"',
      '1/2" Crown  → 13/16" · 3/4"',
      '9/16" Crown → 3/4"   · 3/4"',
      '5/8" Crown  → 11/16" · 3/4"',
      '3/4" Crown  → 5/8"   · 3/4"',
    ],
  },
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
        <div className="grid md:grid-cols-3" style={{ gap: 2 }}>
          {depthChart.map(s => (
            <div key={s.len} className="bg-white p-5" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
              <div className="font-bold" style={{ color: "var(--pd-dark)", fontSize: 14 }}>{s.len}</div>
              <ul className="mt-3 space-y-1.5" style={{ fontSize: 12, color: "var(--pd-muted)", fontFamily: "ui-monospace, monospace" }}>
                {s.rows.map(r => <li key={r}>{r}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </TechReference>

      <RelatedProducts products={related} />
      <PageDisclaimers galvanized trademarks />
    </div>
  );
}

