import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useIntelligence, useIntelMode } from "@/lib/use-intelligence";
import { EmptyState, ModeToggle, YELLOW, mono, cardStyle } from "@/components/admin/ui";

export const Route = createFileRoute("/_authenticated/admin/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  const { data, loading } = useIntelligence();
  const { mode, setMode } = useIntelMode();
  const [copied, setCopied] = useState(false);

  if (loading) return <div style={{ ...mono, color: "var(--pdx-text-mute)", fontSize: 12 }}>Loading…</div>;
  if (!data) return <EmptyState />;

  const topLeads = [...data.leads]
    .filter((l) => l.status === "HOT" || l.status === "WARM")
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const emailBody = [
    `Pro-Drive Weekly Intelligence — Week of ${data.weekOf}`,
    ``,
    data.summary.weeklyInsight,
    ``,
    `Top opportunity: ${data.summary.topOpportunity}`,
    ``,
    `— Top 5 Leads —`,
    ...topLeads.map(
      (l, i) =>
        `${i + 1}. ${l.company} (${l.location}) — ${l.urgency} — ${l.topPage}`,
    ),
    ``,
    `Craig — call script:`,
    data.summary.craigCallScript,
  ].join("\n");

  const copy = async (txt: string) => {
    await navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ModeToggle mode={mode} setMode={setMode} />
      </div>

      <div style={cardStyle}>
        <div style={{ ...mono, fontSize: 11, color: YELLOW, letterSpacing: "0.2em", marginBottom: 14 }}>
          CRAIG — THIS WEEK'S CALL SCRIPT
        </div>
        <div
          style={{
            fontFamily: "Assistant, sans-serif",
            color: "var(--pdx-text)",
            fontSize: 15,
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
            background: "rgba(255,205,0,0.03)",
            borderLeft: `3px solid ${YELLOW}`,
            padding: "16px 20px",
          }}
        >
          {data.summary.craigCallScript}
        </div>
        <button onClick={() => copy(data.summary.craigCallScript)} style={btn}>
          {copied ? "Copied ✓" : "Copy script"}
        </button>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ ...mono, fontSize: 11, color: YELLOW, letterSpacing: "0.2em" }}>
            EMAIL DIGEST PREVIEW
          </div>
          <button onClick={() => copy(emailBody)} style={btn}>
            {copied ? "Copied ✓" : "Copy email"}
          </button>
        </div>
        <pre
          style={{
            ...mono,
            fontSize: 12,
            color: "var(--pdx-text)",
            background: "var(--pdx-panel)",
            border: "1px solid var(--pdx-border)",
            padding: 18,
            whiteSpace: "pre-wrap",
            margin: 0,
            lineHeight: 1.65,
          }}
        >
          {emailBody}
        </pre>
      </div>
    </div>
  );
}

const btn = {
  ...mono,
  marginTop: 14,
  background: "transparent",
  border: `1px solid ${YELLOW}`,
  color: YELLOW,
  padding: "8px 16px",
  fontSize: 10,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  cursor: "pointer",
};
