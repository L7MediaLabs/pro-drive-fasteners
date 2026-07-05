import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionLabel, Callout, InfoPanel, InterchangeList, FastenerDisclaimer } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import { FN15, DA15, C16, AFN, BRAD18, PINS23 } from "../data/products";

export const Route = createFileRoute("/brads-finish-nails")({
  head: () => ({
    meta: [
      { title: "Brads & Finish Nails | Pro-Drive Fasteners®" },
      { name: "description", content: "Professional grade finish nails in every angle and gauge. 15 GA, 16 GA, 18 GA, and 23 GA micro pins." },
    ],
  }),
  component: Brads,
});

const tools = [
  "Bostitch FN 25°",
  "Senco DA 34°",
  "Hitachi Straight",
  "Paslode 20°",
  "18 GA Straight",
  "23 GA Micro",
];

const C16_TOOLS = "Dewalt DCN660D1;Metabo HPT NT65M2SM;MAX NF565A/16;Omer 14.50;Paslode IM250S-Li;Paslode T250S-F16;Senco 16XP;Stanley Bostitch FN1664K".split(";");
const BRAD18_TOOLS = "Duo-Fast 4450;Duo-Fast 4450ST;Dewalt DC608K;Dewalt DCN680D1;Dewalt DCN680B;Dewalt DWFP12233;Grip-Rite GRTBN200;Grex 1850GB;Paslode T200 F18;Paslode IM200-Li;Senco FinishPro FP25XP;Senco FinishPro 18MG;Senco SLP20XP;Senco FinishPro 2N1;Senco FP18MG;Senco FN55AX;Metabo HPT NT50AE2M;Stanley Bostitch BT1855K;Stanley Bostitch SB-2IN1".split(";");
const PIN23_TOOLS = "Cadex 23/15-10M;Duo-Fast 2320;Fasco ES2316P;Grex P6/15L;Grip-Rite GR58PIN;Grizzly H5044;Hitachi 23000;Metabo HPT 23000;Porter-Cable PPN23063;Prebena AL16CRF;Senco A100629;Spotnail 23010;Unicatch CZ16".split(";");

function Brads() {
  return (
    <div>
      <PageHeader
        breadcrumb="Brads & Finish Nails"
        title="Brads & Finish Nails"
        description="Professional grade finish nails in every angle and gauge. Contractor tested. Guaranteed not to jam."
      />
      <section className="px-[6%] py-10" style={{ background: "var(--pd-dark)" }}>
        <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>The Right Nail for Any Job</div>
        <p className="mt-3 text-white/70 max-w-3xl" style={{ fontSize: 15, lineHeight: 1.7 }}>
          Our Brads &amp; Finish Nails are professional grade quality — contractor tested and approved.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-6" style={{ gap: 2 }}>
          {tools.map(t => (
            <div key={t} className="px-4 py-5 text-center" style={{ background: "rgba(255,205,0,0.08)", border: "1px solid rgba(255,205,0,0.15)" }}>
              <div style={{ color: "var(--pd-yellow)", fontWeight: 700, fontSize: 13 }}>{t}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="px-[6%] py-12 space-y-12" style={{ background: "var(--pd-light-bg)" }}>
        <div>
          <SectionLabel>15 GA FN — 25° Angle (Fits Bostitch®)</SectionLabel>
          <div className="mt-4"><ProductGrid products={FN15} /></div>
          <InfoPanel
            applications="Interior finish, trim work, hardwood flooring, baseboards."
            materials="Electro-Galvanized Steel. Chisel Point, Smooth Shank."
            standards="Meets ASTM F1667. Contractor packed 3,655 per box."
          >
            <div><strong style={{ color: "var(--pd-dark)" }}>Fits:</strong> Bostitch® 25° tools.</div>
          </InfoPanel>
        </div>
        <div>
          <SectionLabel>15 GA DA — 34° Angle (Fits Senco®)</SectionLabel>
          <div className="mt-4"><ProductGrid products={DA15} /></div>
          <InfoPanel
            applications="Interior finish, trim, and casing."
            materials="Chisel Point, Smooth Shank. Available in Stainless Steel."
            standards="Meets ASTM F1667. Contractor packed 4,000 per box."
          >
            <div><strong style={{ color: "var(--pd-dark)" }}>Fits:</strong> Senco® 34° tools.</div>
          </InfoPanel>
        </div>
        <div>
          <SectionLabel>16 GA — 0° Straight Angle</SectionLabel>
          <div className="mt-4"><ProductGrid products={C16} /></div>
          <InfoPanel
            materials="Blunt Chisel Point, Smooth Shank. Available in Stainless Steel."
            standards="Meets ASTM F1667. 2,500 per box · 12 boxes per carton."
          >
            <div>Universal fit for most straight no-angle 16 gauge finish nailers.</div>
          </InfoPanel>
          <InterchangeList tools={C16_TOOLS} />
        </div>
        <div>
          <SectionLabel>16 GA — 20° Paslode® Angle</SectionLabel>
          <div className="mt-4"><ProductGrid products={AFN} /></div>
          <Callout>Fits Paslode® 20° angle tools.</Callout>
        </div>
        <div>
          <SectionLabel>18 GA — 0° Straight Brad Nails</SectionLabel>
          <div className="mt-4"><ProductGrid products={BRAD18} /></div>
          <InfoPanel
            applications="Interior finish, trim work, hardwood flooring, baseboards."
            materials='Chisel Point, Smooth Shank (.0468").'
            standards="Meets ASTM F1667. 5,000 per box."
          >
            <div>Designed to be universal fit for most straight no-angle 18 GA medium head finish nailers.</div>
          </InfoPanel>
          <InterchangeList tools={BRAD18_TOOLS} />
        </div>
        <div>
          <SectionLabel>23 GA Micro Pins</SectionLabel>
          <div className="mt-4"><ProductGrid products={PINS23} /></div>
          <Callout>Micro Pins fasten the smallest of trim securely, leaving a nearly invisible hole. Directional arrows painted on strips eliminate loading errors.</Callout>
          <InfoPanel
            applications="Interior finish and trim, carving and ornamentals, rattan furniture production, picture and mirror frames, window beading, molding, decorative trim, cabinets."
          />
          <InterchangeList tools={PIN23_TOOLS} />
        </div>
        <FastenerDisclaimer mentionsBrands />
      </section>
    </div>
  );
}
