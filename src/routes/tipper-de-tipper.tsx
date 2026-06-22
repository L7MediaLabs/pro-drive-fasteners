import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "../data/images";

export const Route = createFileRoute("/tipper-de-tipper")({
  head: () => ({
    meta: [
      { title: "Tipper-De-Tipper™ | Pro-Drive Fasteners®" },
      { name: "description", content: "The safest and fastest method to replace mallet caps. 5-station design. Fits all major brands. Under 30 seconds." },
      { property: "og:title", content: "Tipper-De-Tipper™ Series 5" },
      { property: "og:description", content: "Replace mallet caps in under 30 seconds. 5-station design. Fits all major brands." },
      { property: "og:image", content: images.tipper.product },
      { property: "twitter:image", content: images.tipper.product },
    ],
  }),
  component: TDT,
});

const features = [
  { h: "Eliminates Risk of Injury", b: "No more forcing caps off with screwdrivers or other tools." },
  { h: "5-Station Design", b: "Fits all major brands of Round or Angle rubber caps." },
  { h: "Replaces & Removes", b: "Caps swapped in under 30 seconds." },
  { h: "Robust Construction", b: "Virtually no maintenance required." },
];

const tippingSteps = [
  { image: images.tipper.tipping[0], caption: "Place cap onto the tipping station." },
  { image: images.tipper.tipping[1], caption: "Align mallet head and press down." },
  { image: images.tipper.tipping[2], caption: "Cap seats firmly — ready to use." },
];

const deTippingSteps = [
  { image: images.tipper.deTipping[0], caption: "Insert mallet into the de-tipping slot." },
  { image: images.tipper.deTipping[1], caption: "Pull lever to release worn cap." },
  { image: images.tipper.deTipping[2], caption: "Cap pops free — no tools, no damage." },
];

function StepCard({ index, image, caption, total }: { index: number; image: string; caption: string; total: number }) {
  return (
    <div className="bg-white flex flex-col" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
      <div
        style={{
          background: "#F5F4F0",
          aspectRatio: "16 / 9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={`Pro-Drive Tipper-De-Tipper step ${index} of ${total}: ${caption}`}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="p-4">
        <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Step {index} of {total}</div>
        <div className="mt-2" style={{ fontWeight: 700, fontSize: 14, color: "var(--pd-dark)" }}>{caption}</div>
      </div>
    </div>
  );
}

function TDT() {
  return (
    <div>
      <section className="px-[6%] py-12" style={{ background: "var(--pd-yellow)" }}>
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-center">
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Patent #20220388265A1</div>
            <h1 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: "clamp(40px, 8vw, 72px)" }}>Tipper-De-Tipper™</h1>
            <p className="mt-3" style={{ color: "rgba(25,20,0,0.65)", fontSize: 20 }}>The safest & fastest method to replace mallet caps.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px]" style={{ color: "var(--pd-dark)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <span>5-Station Design</span><span>·</span>
              <span>All Major Brands</span><span>·</span>
              <span>Under 30 Seconds</span><span>·</span>
              <span>Virtually No Maintenance</span>
            </div>
          </div>
          <div style={{ background: "var(--pd-dark)", padding: 16 }}>
            <img
              src={images.tipper.product}
              alt="Pro-Drive Tipper-De-Tipper Series 5"
              style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
            />
          </div>
        </div>
      </section>

      <section className="px-[6%] py-16" style={{ background: "var(--pd-dark)" }}>
        <div className="mb-8 p-5" style={{ border: "1px solid var(--pd-yellow)", color: "var(--pd-yellow)" }}>
          <strong>Series 5 available now.</strong> Contact us for current pricing and availability.
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map(f => (
            <div key={f.h} className="p-5" style={{ background: "rgba(255,205,0,0.06)", borderLeft: "3px solid var(--pd-yellow)" }}>
              <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>{f.h}</div>
              <p className="text-white/75 mt-2 text-sm">{f.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Installing a Cap — Tipping</div>
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            {tippingSteps.map((s, i) => (
              <StepCard key={i} index={i + 1} total={tippingSteps.length} image={s.image} caption={s.caption} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Removing a Cap — De-Tipping</div>
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            {deTippingSteps.map((s, i) => (
              <StepCard key={i} index={i + 1} total={deTippingSteps.length} image={s.image} caption={s.caption} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/contact" className="pd-btn-primary">Request Pricing</Link>
        </div>
      </section>
    </div>
  );
}
