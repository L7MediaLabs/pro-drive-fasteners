import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductCard";
import { LCLEATS_16, LCLEATS_18 } from "../data/products";

export const Route = createFileRoute("/l-cleats")({
  head: () => ({
    meta: [
      { title: "L-Cleats | Pro-Drive Fasteners®" },
      { name: "description", content: "16 GA and 18 GA L-Cleats for hardwood and maple flooring. Guaranteed not to jam in any major brand of tool." },
    ],
  }),
  component: LCleats,
});

function LCleats() {
  const [tab, setTab] = useState<"16" | "18">("16");
  return (
    <div>
      <PageHeader
        breadcrumb="L-Cleats"
        title="L-Cleats"
        description="16 GA and 18 GA L-Cleats for hardwood and maple flooring. Guaranteed not to jam in any major brand of tool."
      />
      <div style={{ background: "var(--pd-dark)" }} className="px-[6%] flex gap-8">
        {(["16", "18"] as const).map(g => (
          <button
            key={g}
            onClick={() => setTab(g)}
            className="pd-label py-4"
            style={{
              color: tab === g ? "var(--pd-yellow)" : "rgba(255,255,255,0.5)",
              borderBottom: tab === g ? "2px solid var(--pd-yellow)" : "2px solid transparent",
              fontSize: 12,
              letterSpacing: "0.15em",
            }}
          >
            {g} Gauge
          </button>
        ))}
      </div>
      <section className="px-[6%] py-12" style={{ background: "var(--pd-light-bg)" }}>
        <ProductGrid products={tab === "16" ? LCLEATS_16 : LCLEATS_18} />
      </section>

      {/* Depth Guide */}
      <section className="px-[6%] py-16" style={{ background: "var(--pd-light-bg)" }}>
        <h2 className="pd-display" style={{ color: "var(--pd-dark)", fontSize: 36 }}>L-Cleat Depth Guide</h2>
        <p className="mt-2" style={{ color: "var(--pd-muted)" }}>Select the correct cleat length for your subfloor thickness.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-6" style={{ gap: 2 }}>
          {[
            { len: '2" L-Cleats (16 GA)', rows: ['Subfloor 5/8" → Clearance 3/4"', 'Subfloor 3/4" → Clearance 3/4"'] },
            { len: '1-3/4" L-Cleats (16 or 18 GA)', rows: ['1/2" → 31/32" + 3/4"', '9/16" → 29/32" + 3/4"', '5/8" → 7/8" + 3/4"', '3/4" → 13/16" + 3/4"'] },
            { len: '1-1/2" L-Cleats (16 or 18 GA)', rows: ['1/2" → 13/16" + 3/4"', '9/16" → 3/4" + 3/4"', '5/8" → 11/16" + 3/4"', '3/4" → 5/8" + 3/4"'] },
            { len: '1-1/4" L-Cleats (18 or 20 GA)', rows: ['5/16" → 3/4" + 3/4"', '3/8" → 11/16" + 3/4"', '1/2" → 5/8" + 3/4"'] },
          ].map(s => (
            <div key={s.len} className="bg-white p-5" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
              <div className="font-bold" style={{ color: "var(--pd-dark)", fontSize: 14 }}>{s.len}</div>
              <ul className="mt-3 space-y-1.5" style={{ fontSize: 12, color: "var(--pd-muted)", fontFamily: "ui-monospace, monospace" }}>
                {s.rows.map(r => <li key={r}>{r}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-white px-5 py-4 mt-6 text-sm" style={{ borderLeft: "3px solid var(--pd-yellow)" }}>
          Actual fastener depth can vary based on wood milling or tongue profile. This chart is for reference purposes only. Consult wood manufacturers or NWFA for correct fastener length before installation.
        </div>
      </section>
    </div>
  );
}
