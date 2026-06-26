import { createFileRoute } from "@tanstack/react-router";
import { useIntelligence, useIntelMode } from "@/lib/use-intelligence";
import { EmptyState, ModeToggle, YELLOW, mono, cardStyle } from "@/components/admin/ui";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: ProductsPage,
});

function ProductsPage() {
  const { data, loading } = useIntelligence();
  const { mode, setMode } = useIntelMode();

  if (loading) return <div style={{ ...mono, color: "var(--pdx-text-mute)", fontSize: 12 }}>Loading…</div>;
  if (!data) return <EmptyState />;

  const max = Math.max(...data.productStats.map((p) => p.views), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ModeToggle mode={mode} setMode={setMode} />
      </div>

      <div style={cardStyle}>
        <div style={{ ...mono, fontSize: 11, color: YELLOW, letterSpacing: "0.2em", marginBottom: 18 }}>
          PRODUCT INTEREST — VIEWS THIS WEEK
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {data.productStats.map((p) => (
            <div key={p.product}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ ...mono, fontSize: 12, color: "var(--pdx-text)", letterSpacing: "0.05em" }}>
                  {p.product}
                </span>
                <span style={{ ...mono, fontSize: 11, color: "var(--pdx-text-dim)" }}>
                  {p.views} views · {p.uniqueCompanies} cos
                  <span style={{ marginLeft: 10, color: p.trend === "up" ? "#22C55E" : p.trend === "down" ? "#EF4444" : "var(--pdx-text-mute)" }}>
                    {p.trend === "up" ? "↑" : p.trend === "down" ? "↓" : "→"} {p.trendPercent > 0 ? "+" : ""}{p.trendPercent}%
                  </span>
                </span>

              </div>
              <div style={{ height: 6, background: "var(--pdx-border)" }}>
                <div
                  style={{
                    width: `${(p.views / max) * 100}%`,
                    height: "100%",
                    background: YELLOW,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ ...mono, fontSize: 11, color: YELLOW, letterSpacing: "0.2em", marginBottom: 18 }}>
          PRODUCT × COMPANY MATRIX
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ ...mono, fontSize: 9, color: "var(--pdx-text-mute)", letterSpacing: "0.15em" }}>
                <th style={{ textAlign: "left", padding: "8px 10px" }}>Product</th>
                <th style={{ textAlign: "left", padding: "8px 10px" }}>Interested Companies</th>
              </tr>
            </thead>
            <tbody>
              {data.productStats.map((p) => {
                const cos = data.leads
                  .filter((l) => l.pagesViewed.some((pg) => pg.toLowerCase().includes(p.product.toLowerCase().split(" ")[0])))
                  .map((l) => l.company);

                return (
                  <tr key={p.product} style={{ borderTop: "1px solid var(--pdx-border)" }}>
                    <td style={{ padding: "12px 10px", ...mono, fontSize: 12, color: "var(--pdx-text)" }}>{p.product}</td>
                    <td style={{ padding: "12px 10px", ...mono, fontSize: 11, color: "var(--pdx-text-dim)" }}>
                      {cos.length ? cos.join(" · ") : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
