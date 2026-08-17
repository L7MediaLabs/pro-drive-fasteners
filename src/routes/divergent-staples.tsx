import { createFileRoute } from "@tanstack/react-router";
import { InterchangeList } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import {
  CinematicHero,
  RelatedProducts,
  PageDisclaimers,
  BulletBlock,
} from "../components/editorial";
import { DIVERGENT, pickRelated } from "../data/products";
import { images } from "../data/images";

export const Route = createFileRoute("/divergent-staples")({
  head: () => ({
    meta: [
      { title: "Divergent Staples | Pro-Drive Fasteners®" },
      { name: "description", content: "Pad, carpet, stair tread, and specialty staples for bedding, insulation, roofing, upholstery, and more." },
      { property: "og:title", content: "Divergent Staples — Pro-Drive Fasteners®" },
      { property: "og:description", content: "Pad & carpet staples built tough. Extra hard wire, resin coated. Meets the demands of the trade." },
      { property: "og:image", content: images.divergentStaples.staple5010 },
      { property: "twitter:image", content: images.divergentStaples.staple5010 },
    ],
  }),
  component: Div,
});

const padStaples   = DIVERGENT.filter(p => p.id === "A11-10D" || p.id === "5010-D");
const hammerTacker = DIVERGENT.filter(p => p.id === "7512D");
const stairTread   = DIVERGENT.filter(p => p.id === "5418D");

function Div() {
  const related = pickRelated(DIVERGENT.map(p => p.id), 6);

  return (
    <div>
      <CinematicHero
        kicker="Divergent Staples"
        title={<>Pad & Carpet Staples.<br />Built Tough.</>}
        description="Extra hard wire, resin coated. Divergent points and chisel points for bedding, carpet pad, insulation, roofing, house wrap, upholstery, stair treads, and light wood assembly."
        bgImage={images.divergentStaples.staple5010}
        badges={[
          { label: "EXTRA HARD WIRE" },
          { label: "RESIN COATED" },
          { label: "100,000 CT MASTER" },
        ]}
        rightImage={images.divergentStaples.staple7512a}
        rightImageAlt="Pro-Drive Fasteners® 7512 Hammer Tacker Staple"
      />

      <section className="px-[6%] py-14 space-y-16" style={{ background: "var(--pd-light-bg)" }}>
        <div>
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>01 — Pad Staples</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>Bedding, carpet pad, insulation.</h2>
          <p className="mt-3 max-w-2xl" style={{ color: "var(--pd-dark)", fontSize: 16, lineHeight: 1.65, fontWeight: 500 }}>
            20 GA divergent-point staples. Available in A11 (15/32" crown, 3/8" leg) and 5010 (1/2" crown, 5/16" leg) profiles to fit every major pad tool. 5,000 per box, 20 boxes per master.
          </p>
          <div className="mt-6"><ProductGrid products={padStaples} /></div>
          <InterchangeList
            tools={[
              "Arrow T50","Arrow T55","Duo-Fast A-11","Senco H","Rapid R11",
              "BeA 95","Haubold 900","JK64","Prebena AD","Spotnails 35","Fasco ED-50",
            ]}
          />
        </div>

        <div>
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>02 — Hammer Tacker</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>7512 for the Duo-Fast® HT-755.</h2>
          <p className="mt-3 max-w-2xl" style={{ color: "var(--pd-dark)", fontSize: 16, lineHeight: 1.65, fontWeight: 500 }}>
            19 GA, 13/32" crown, 3/8" leg. Purpose-built for the industry-standard Duo-Fast® HT-755 hammer tacker. Ideal for roofing paper, house wrap, insulation, and vapor barrier.
          </p>
          <div className="mt-6"><ProductGrid products={hammerTacker} /></div>
          <InterchangeList tools={["Duo-Fast HT-755", "Duo-Fast HT-755M"]} />
        </div>

        <div>
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>03 — Stair Tread & Carpet</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>5418 with color-matched crown.</h2>
          <p className="mt-3 max-w-2xl" style={{ color: "var(--pd-dark)", fontSize: 16, lineHeight: 1.65, fontWeight: 500 }}>
            19 GA, 3/16" narrow crown, 9/16" leg. <strong>Tan-Colored Crown / Sharp Divergent Point.</strong> Available with tan or gray crown to disappear into carpet fibers. 5,000 per box, 20 boxes per master. Meets stair-tread and light-carpet application requirements.
          </p>
          <div className="mt-6"><ProductGrid products={stairTread} /></div>
          <InterchangeList
            tools={[
              "Bostitch CR1000E","Cran 625 Pro","Duo-Fast DNS-5424","Fasco F1A 54DF-18",
            ]}
          />
        </div>
      </section>

      <section className="px-[6%] pb-14" style={{ background: "var(--pd-light-bg)" }}>
        <BulletBlock
          kicker="Description"
          bullets={[
            "Best packaging for the contractor, HEAVY Duty boxes that can be resealed",
            "Made from Extra Hard Wire guaranteed not to bend",
            "Resin Coated and Galvanized",
          ]}
        />
      </section>

      <RelatedProducts products={related} />
      <PageDisclaimers galvanized trademarks />
    </div>
  );
}
