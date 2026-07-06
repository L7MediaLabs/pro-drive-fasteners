import { createFileRoute } from "@tanstack/react-router";
import { Callout, InfoPanel, InterchangeList } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import {
  CinematicHero,
  LifestyleBanner,
  TechReference,
  RelatedProducts,
  PageDisclaimers,
} from "../components/editorial";
import { FN15, DA15, C16, AFN, BRAD18, PINS23, pickRelated } from "../data/products";
import { images } from "../data/images";

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
  { id: "c16",    gauge: "16 GA", brand: "Universal",       label: "Straight",         image: images.nailFamilies.c16_straight },
  { id: "afn16",  gauge: "16 GA", brand: "Fits Paslode®",  label: "AFN 20° Angle",    image: images.nailFamilies.afn16_20 },
  { id: "brad18", gauge: "18 GA", brand: "Universal",       label: "Straight Brad",    image: images.nailFamilies.brad18_straight },
  { id: "pin23",  gauge: "23 GA", brand: "Universal",       label: "Micro Pin",        image: images.nailFamilies.pin23_micro },
];

// 18 GA size chart (AX08 → AX22)
const brad18Sizes = [
  { sku: "AXX08EAA", label: '1/2"',    lenIn: 0.5 },
  { sku: "AXX10EAA", label: '5/8"',    lenIn: 0.625 },
  { sku: "AXX11EAA", label: '3/4"',    lenIn: 0.75 },
  { sku: "AXX12EAA", label: '7/8"',    lenIn: 0.875 },
  { sku: "AXX13EAA", label: '1"',      lenIn: 1.0 },
  { sku: "AXX15EAA", label: '1-1/4"',  lenIn: 1.25 },
  { sku: "AXX17EAA", label: '1-1/2"',  lenIn: 1.5 },
  { sku: "AXX19EAA", label: '1-3/4"',  lenIn: 1.75 },
  { sku: "AXX21EAA", label: '2"',      lenIn: 2.0 },
  { sku: "AXX22EAA", label: '2-1/4"',  lenIn: 2.25 },
];

function Brads() {
  const allShownIds = [...FN15, ...DA15, ...C16, ...AFN, ...BRAD18, ...PINS23].map(p => p.id);
  const related = pickRelated(allShownIds, 6);

  return (
    <div>
      <CinematicHero
        kicker="Brads & Finish Nails"
        title={<>The Right Nail.<br />Every Angle. Every Gauge.</>}
        description="Professional grade finish nails in every collation angle. Contractor tested. Chisel-point, smooth shank. Meets ASTM F1667."
        bgImage={images.finishNails.strip}
        badges={[
          { label: "CONTRACTOR TESTED" },
          { label: "JAM-FREE GUARANTEE" },
          { label: "MEETS ASTM F1667" },
        ]}
        rightImage={images.finishNails.fn1520_125}
        rightImageAlt="Pro-Drive 15 GA Finish Nails"
      />

      {/* Visual family selector */}
      <section className="px-[6%] py-14" style={{ background: "var(--pd-dark)" }}>
        <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Select a Nail Family</div>
        <h2 className="pd-display text-white mt-2" style={{ fontSize: 30 }}>Six angles. One promise: no jams.</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 mt-8" style={{ gap: 2 }}>
          {families.map(f => (
            <a
              key={f.id}
              href={`#${f.id}`}
              className="p-6 transition-colors block"
              style={{ background: "rgba(255,205,0,0.06)", border: "1px solid rgba(255,205,0,0.15)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,205,0,0.13)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,205,0,0.06)")}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="pd-label" style={{ color: "var(--pd-yellow)", fontSize: 11 }}>{f.gauge}</div>
                  <div className="font-bold text-white mt-1" style={{ fontSize: 16 }}>{f.label}</div>
                  <div className="mt-1" style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{f.brand}</div>
                </div>
                <AngleGlyph angle={f.angle} />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="px-[6%] py-12 space-y-14" style={{ background: "var(--pd-light-bg)" }}>
        <div id="fn15">
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>15 GA FN — 25° Angle</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>Fits Bostitch® 25°</h2>
          <div className="mt-4"><ProductGrid products={FN15} /></div>
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
          <div className="mt-4"><ProductGrid products={DA15} /></div>
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
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>Universal Fit</h2>
          <div className="mt-4"><ProductGrid products={C16} /></div>
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
        image={images.finishNails.strip}
        kicker="Contractor Grade"
        title="Professional grade. Contractor tested."
        body="Precise chisel points. Consistent collation. Guaranteed not to jam in any major brand of finish nailer. Order by the box or bulk contractor pack."
      />

      <section className="px-[6%] py-12 space-y-14" style={{ background: "var(--pd-light-bg)" }}>
        <div id="afn16">
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>16 GA AFN — 20° Angle</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>Fits Paslode® 20°</h2>
          <div className="mt-4"><ProductGrid products={AFN} /></div>
          <Callout>Fits Paslode® 20° angle tools.</Callout>
        </div>

        <div id="brad18">
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>18 GA — 0° Straight Brad</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>Universal Brad Nails</h2>
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

        <div id="pin23">
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>23 GA Micro Pins</div>
          <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 32 }}>The Invisible Fastener</h2>
          <div className="mt-4"><ProductGrid products={PINS23} /></div>
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
        intro='All Pro-Drive 18 GA brads share a .0468" chisel-point shank. Compare relative lengths at a glance — 1/2" through 2-1/4".'
      >
        <div className="bg-white p-6" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
          <div className="space-y-2">
            {brad18Sizes.map(b => {
              const pct = (b.lenIn / 2.25) * 100;
              return (
                <div key={b.sku} className="grid grid-cols-[110px_1fr_60px] items-center gap-3">
                  <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "var(--pd-muted)" }}>{b.sku}</div>
                  <div style={{ background: "#f0efe8", height: 22, position: "relative" }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, var(--pd-yellow), #E5B800)",
                      }}
                    />
                  </div>
                  <div className="font-bold text-right" style={{ color: "var(--pd-dark)", fontSize: 13 }}>{b.label}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-4 text-xs" style={{ color: "var(--pd-muted)", borderTop: "1px solid rgba(0,0,0,0.06)", fontFamily: "ui-monospace, monospace" }}>
            Shank Ø .0468" · Chisel Point · Smooth Shank · Meets ASTM F1667
          </div>
        </div>
      </TechReference>

      <RelatedProducts products={related} />
      <PageDisclaimers galvanized trademarks />
    </div>
  );
}
