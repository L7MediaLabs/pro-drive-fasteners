import { createFileRoute } from "@tanstack/react-router";
import { InfoPanel } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import {
  CinematicHero,
  SplitLayout,
  GalleryHero,
  LifestyleBanner,
  TechReference,
  RelatedProducts,
  PageDisclaimers,
} from "../components/editorial";
import { TAPPING_BLOCKS, pickRelated } from "../data/products";
import { images } from "../data/images";

export const Route = createFileRoute("/tapping-blocks")({
  head: () => ({
    meta: [
      { title: "Tapping Blocks | Pro-Drive Fasteners®" },
      { name: "description", content: "Heavy-duty tapping blocks for every flooring requirement. ONE TAP™, 561 Tapping Block, Wide Plank Wood Driving Tool." },
      { property: "og:title", content: "Tapping Blocks — Pro-Drive Fasteners®" },
      { property: "og:description", content: "Every plank. Perfectly placed. Made in the USA." },
      { property: "og:image", content: images.tappingBlocks.tbPro },
      { property: "twitter:image", content: images.tappingBlocks.tbPro },
    ],
  }),
  component: Blocks,
});

type Block = {
  id: string;
  title: string;
  image: string;
  alt: string;
  tagline: string;
  specs: { k: string; v: string }[];
  bullets: string[];
  bestFor: string;
};

const blockData: Block[] = [
  {
    id: "TB-PRO-312",
    title: "ONE TAP™ Tapping Block",
    image: images.tappingBlocks.tbPro,
    alt: "Pro-Drive One Tap Tapping Block TB-PRO-312",
    tagline: "The everyday installer's block. Ergonomic knob for rapid one-hand placement.",
    specs: [
      { k: "Dimensions", v: '3" × 7" × 3/4"' },
      { k: "Weight",     v: "0.9 lbs" },
      { k: "Best For",   v: "Standard install" },
      { k: "Carton",     v: "12" },
    ],
    bullets: [
      "Recessed channels ensure optimal plank alignment",
      "Even force distribution across the block face",
      "Beveled edges interlock with plank tongues to prevent cracking",
      "Ergonomic knob for rapid one-hand placement",
    ],
    bestFor: "Everyday flooring installation",
  },
  {
    id: "561-TB",
    title: "561 Tapping Block",
    image: images.tappingBlocks.tb561,
    alt: "Pro-Drive 561 Tapping Block",
    tagline: "Wide-plank workhorse. Built for glue-down installs and dead-blow strikes.",
    specs: [
      { k: "Dimensions", v: '11.5" × 4.5" × 4"' },
      { k: "Weight",     v: "3.5 lbs" },
      { k: "Best For",   v: "Glue-down · wide plank" },
      { k: "Carton",     v: "6" },
    ],
    bullets: [
      "Designed for wide plank flooring",
      "Most effective for glue-down installs",
      "Built-in plastic edge protects flooring surface",
      "Designed for use with dead-blow mallets",
    ],
    bestFor: "Wide plank glue-down installation",
  },
  {
    id: "392-TB",
    title: "Wide Plank Wood Driving Tool",
    image: images.tappingBlocks.widePlank,
    alt: "Pro-Drive Wide Plank Wood Driving Tool",
    tagline: "Heavy hardwood driving tool for the toughest wide-plank jobs.",
    specs: [
      { k: "Weight",     v: "7 lbs (2 per carton)" },
      { k: "Material",   v: "Solid hardwood" },
      { k: "Best For",   v: "Heavy wide plank" },
      { k: "Carton",     v: "2" },
    ],
    bullets: [
      "Solid hardwood construction for maximum energy transfer",
      "Extended face for wide plank engagement",
      "Compatible with all flooring mallets",
      "Built to last decades of daily use",
    ],
    bestFor: "Heavy-duty wide plank driving",
  },
];

function Blocks() {
  const related = pickRelated(TAPPING_BLOCKS.map(p => p.id), 6);

  return (
    <div>
      <CinematicHero
        kicker="Installation Tools"
        title={<>Every plank.<br />Perfectly placed.</>}
        description="Heavy-duty tapping blocks for every flooring requirement — from standard install to wide plank glue-down. Precision-molded channels, plank-safe edges, contractor-grade materials."
        bgImage={images.tappingBlocks.lifestyle}
        badges={[
          { label: "MADE IN USA" },
          { label: "CONTRACTOR GRADE" },
          { label: "3 SPECIALIZED MODELS" },
        ]}
        rightImage={images.tappingBlocks.tbPro}
        rightImageAlt="Pro-Drive ONE TAP tapping block"
      />

      <section className="px-[6%] py-14 space-y-14" style={{ background: "var(--pd-light-bg)" }}>
        {blockData.map((b, i) => (
          <div key={b.id}>
            <SplitLayout
              gallery={
                <GalleryHero src={b.image} alt={b.alt} caption={b.id} />
              }
            >
              <div className="pd-label" style={{ color: "var(--pd-gold)" }}>{`0${i + 1} — ${b.id}`}</div>
              <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32, lineHeight: 1.1 }}>{b.title}</h2>
              <p className="mt-3" style={{ color: "var(--pd-muted)", fontSize: 15, lineHeight: 1.6 }}>{b.tagline}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-5" style={{ background: "rgba(0,0,0,0.08)" }}>
                {b.specs.map(s => (
                  <div key={s.k} className="bg-white px-4 py-3">
                    <div className="pd-label" style={{ color: "var(--pd-muted)", fontSize: 10 }}>{s.k}</div>
                    <div className="font-bold mt-1" style={{ color: "var(--pd-dark)", fontSize: 12 }}>{s.v}</div>
                  </div>
                ))}
              </div>
              <ul className="mt-5 space-y-2" style={{ color: "var(--pd-text)", fontSize: 13, lineHeight: 1.7 }}>
                {b.bullets.map(x => (
                  <li key={x} className="flex gap-3">
                    <span style={{ color: "var(--pd-yellow)", fontWeight: 900 }}>—</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </SplitLayout>
          </div>
        ))}

        <div>
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Full Catalog</div>
          <h3 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 26 }}>All Tapping Blocks</h3>
          <div className="mt-5"><ProductGrid products={TAPPING_BLOCKS} /></div>
        </div>
      </section>

      <LifestyleBanner
        image={images.tappingBlocks.lifestyle}
        kicker="On the Job"
        title="Tight seams. Zero surface damage."
        body="Every Pro-Drive block is engineered to protect the plank while transferring every ounce of mallet force to the joint. Built for the way pros actually install flooring."
      />

      <TechReference
        kicker="Reference"
        title="Tapping Block Comparison"
        intro="Match the right block to the job. Weight, size, and application at a glance."
      >
        <div className="grid md:grid-cols-3" style={{ gap: 2 }}>
          {blockData.map(b => (
            <div key={b.id} className="bg-white p-5" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
              <div className="pd-label" style={{ color: "var(--pd-gold)", fontSize: 10 }}>{b.id}</div>
              <div className="font-bold mt-1" style={{ color: "var(--pd-dark)", fontSize: 14 }}>{b.title}</div>
              <dl className="mt-4 space-y-2" style={{ fontSize: 12, color: "var(--pd-muted)", fontFamily: "ui-monospace, monospace" }}>
                {b.specs.map(s => (
                  <div key={s.k} className="flex justify-between gap-3">
                    <dt>{s.k}</dt>
                    <dd style={{ color: "var(--pd-dark)", fontWeight: 600 }}>{s.v}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-3 pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <dt>Best For</dt>
                  <dd style={{ color: "var(--pd-dark)", fontWeight: 600, textAlign: "right" }}>{b.bestFor}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </TechReference>

      <RelatedProducts products={related} />
      <PageDisclaimers />
      {/* Reserved: <InfoPanel/> retained for future spec notes */}
      <div hidden><InfoPanel /></div>
    </div>
  );
}
