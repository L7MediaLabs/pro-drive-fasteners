import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionLabel, Callout, InfoPanel, InterchangeList, FastenerDisclaimer } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import { STAPLES_15_5, STAPLES_15_Q, STAPLES_16_N, STAPLES_18_M, STAPLES_18_L } from "../data/products";
import { images } from "../data/images";

export const Route = createFileRoute("/staples")({
  head: () => ({
    meta: [
      { title: "Flooring Staples | Pro-Drive Fasteners®" },
      { name: "description", content: "15.5 GA, 15 GA, 16 GA, and 18 GA flooring staples for hardwood, laminate, and engineered installations." },
      { property: "og:image", content: images.staples.hero },
      { property: "twitter:image", content: images.staples.hero },
    ],
  }),
  component: Staples,
});

const MWIRE_TOOLS = "Duo-Fast W-1800;Josef Kihlberg G4450;Prebena G;Senco M;Spotnails 6800".split(";");
const LWIRE_TOOLS = "ATRO 90;BeA 90;Duo-Fast 1800;Prebena EB;Haubold KL 6000;Hitachi N3804;Porter Cable NS100;Porter Cable NS150A;Senco L;Spotnails 4800;JK 781".split(";");

function Staples() {
  return (
    <div>
      <PageHeader
        breadcrumb="Flooring Staples"
        title="Flooring Staples"
        description="Medium crown and specialty staples engineered for hardwood, laminate, and engineered flooring installations."
        bgImage={images.staples.hero}
      />
      <section className="px-[6%] py-12 space-y-12" style={{ background: "var(--pd-light-bg)" }}>
        <div>
          <SectionLabel>15.5 GA Hardwood Flooring Staples</SectionLabel>
          <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-4 items-start">
            <ProductGrid products={STAPLES_15_5} />
            <div className="bg-white p-4" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
              <img
                src={images.staples.gauge155a}
                alt="Pro-Drive 15.5 GA Hardwood Flooring Staples"
                loading="lazy"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
          <Callout>Guaranteed to fit all standard 15.5 gauge flooring tools. Chisel point reduces splitting during installation. Contractor Bulk-Job or Job packs available.</Callout>
          <InfoPanel
            applications="Excellent for all types of hardwood flooring installations."
            materials="Electro-Galvanized steel. Not recommended for exterior application or ACQ-treated lumber."
            standards="Meets ASTM F1667."
          />
        </div>
        <div>
          <SectionLabel>15 GA Q-Wire Staples — 7/16" Crown</SectionLabel>
          <div className="bg-white mt-4 p-3" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
            <img
              src={images.staples.gauge15Banner}
              alt="Pro-Drive 15 GA Q-Wire Staples"
              loading="lazy"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
          <div className="mt-4"><ProductGrid products={STAPLES_15_Q} /></div>
          <Callout>Senco® Style. Ideal for framing, sheathing, roof decking, and furniture frames. Meets or exceeds ASTM A641.</Callout>
          <InterchangeList
            fitsPrimary="Senco SQS55, FASCO F45C SQ-55 SS(CT), F5 SQ-65 CT, SQS55XP; Spotnail MS6564; Duo-Fast MS-1580D"
            tools={["BeA 180", "Duo-Fast 1500", "Senco Q-Wire", "Spotnail"]}
          />
        </div>
        <div>
          <SectionLabel>16 GA N-Wire Staples — 7/16" Crown</SectionLabel>
          <div className="mt-4"><ProductGrid products={STAPLES_16_N} /></div>
          <InfoPanel
            applications="Furniture Frames, Cabinet Sub-Assembly, Millwork, Door Jambs."
            standards="Meets or Exceeds ASTM A641."
          />
        </div>
        <div>
          <SectionLabel>18 GA Staples — M-Wire (3/8" Crown)</SectionLabel>
          <div className="mt-4"><ProductGrid products={STAPLES_18_M} /></div>
          <InfoPanel
            applications="Cabinet assembly, insulation, plastic sheeting, Tyvek, roofing paper, house wrap."
          >
            <div><strong style={{ color: "var(--pd-dark)" }}>Note:</strong> Made from Extra Hard Wire. Not compatible with Arrow T50 series.</div>
          </InfoPanel>
          <InterchangeList tools={MWIRE_TOOLS} />
        </div>
        <div>
          <SectionLabel>18 GA Staples — L-Wire (1/4" Crown · Duo-Fast 1800)</SectionLabel>
          <div className="mt-4"><ProductGrid products={STAPLES_18_L} /></div>
          <InfoPanel
            applications="Finish and trim staples for cabinets, drawers, case backs, upholstery, soffits, underlayment, lattice, insulation sheathing, engineered flooring."
          />
          <InterchangeList tools={LWIRE_TOOLS} />
        </div>
        <FastenerDisclaimer mentionsBrands />
      </section>
    </div>
  );
}

