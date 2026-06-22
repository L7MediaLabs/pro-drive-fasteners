import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tipper-de-tipper")({
  head: () => ({
    meta: [
      { title: "Tipper-De-Tipper™ | Pro-Drive Fasteners®" },
      { name: "description", content: "The safest and fastest method to replace mallet caps. 5-station design. Fits all major brands. Under 30 seconds." },
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

const steps = (n: number, items: string[]) =>
  items.map((t, i) => (
    <div key={i} className="bg-white p-5" style={{ borderLeft: "3px solid var(--pd-yellow)" }}>
      <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Step {i + 1} of {n}</div>
      <div className="mt-2" style={{ fontWeight: 700, fontSize: 14, color: "var(--pd-dark)" }}>{t}</div>
    </div>
  ));

function TDT() {
  return (
    <div>
      <section className="px-[6%] py-12" style={{ background: "var(--pd-yellow)" }}>
        <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Patent #20220388265A1</div>
        <h1 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: "clamp(40px, 8vw, 72px)" }}>Tipper-De-Tipper™</h1>
        <p className="mt-3" style={{ color: "rgba(25,20,0,0.65)", fontSize: 20 }}>The safest & fastest method to replace mallet caps.</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px]" style={{ color: "var(--pd-dark)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <span>5-Station Design</span><span>·</span>
          <span>All Major Brands</span><span>·</span>
          <span>Under 30 Seconds</span><span>·</span>
          <span>Virtually No Maintenance</span>
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

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div>
            <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Tipping</div>
            <div className="mt-3 space-y-2">
              {steps(3, ["Place cap onto the tipping station.", "Align mallet head and press down.", "Cap seats firmly — ready to use."])}
            </div>
          </div>
          <div>
            <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>De-Tipping</div>
            <div className="mt-3 space-y-2">
              {steps(3, ["Insert mallet into the de-tipping slot.", "Pull lever to release worn cap.", "Cap pops free — no tools, no damage."])}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/contact" className="pd-btn-primary">Request Pricing</Link>
        </div>
      </section>
    </div>
  );
}
