import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useMemo, useState } from "react";
import { useIntelligence, useIntelMode } from "@/lib/use-intelligence";
import {
  EmptyState,
  ModeToggle,
  SignalBadges,
  UrgencyTag,
  YELLOW,
  mono,
  cardStyle,
} from "@/components/admin/ui";
import type { Lead } from "@/lib/intelligence-types";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: LeadsPage,
});

const STATUSES = ["ALL", "HOT", "WARM", "WATCHING", "NEW"] as const;
type Status = typeof STATUSES[number];

function LeadsPage() {
  const { data, loading } = useIntelligence();
  const { mode, setMode } = useIntelMode();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<Status>("ALL");
  const [sig, setSig] = useState({ email: false, website: false, meta: false });
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!data) return [];
    return [...data.leads]
      .sort((a, b) => b.score - a.score)
      .filter((l) => (status === "ALL" ? true : l.status === status))
      .filter((l) => l.company.toLowerCase().includes(q.toLowerCase()))
      .filter((l) =>
        (!sig.email || l.signals.email) &&
        (!sig.website || l.signals.website) &&
        (!sig.meta || l.signals.meta),
      );
  }, [data, q, status, sig]);

  if (loading) return <div style={{ ...mono, color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Loading…</div>;
  if (!data) return <EmptyState />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search company…"
            style={{
              ...mono,
              background: "#111110",
              border: "1px solid rgba(255,205,0,0.15)",
              color: "white",
              padding: "8px 12px",
              fontSize: 12,
              minWidth: 220,
              outline: "none",
            }}
          />
          <div style={{ display: "inline-flex", border: "1px solid rgba(255,205,0,0.15)" }}>
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                style={{
                  ...mono,
                  padding: "6px 10px",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  border: "none",
                  cursor: "pointer",
                  background: status === s ? YELLOW : "transparent",
                  color: status === s ? "#0A0A08" : "rgba(255,255,255,0.5)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          {(["email", "website", "meta"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setSig((p) => ({ ...p, [k]: !p[k] }))}
              style={{
                ...mono,
                padding: "6px 10px",
                fontSize: 10,
                letterSpacing: "0.15em",
                border: sig[k] ? `1px solid ${YELLOW}` : "1px solid rgba(255,255,255,0.1)",
                background: sig[k] ? "rgba(255,205,0,0.1)" : "transparent",
                color: sig[k] ? YELLOW : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              {k}
            </button>
          ))}
        </div>
        <ModeToggle mode={mode} setMode={setMode} />
      </div>

      <div style={cardStyle}>
        <div style={{ ...mono, fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 12, letterSpacing: "0.15em" }}>
          {filtered.length} LEADS
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textAlign: "left" }}>
                <th style={th}>Company</th>
                <th style={th}>Score</th>
                <th style={th}>Status</th>
                <th style={th}>Signals</th>
                <th style={th}>Visits</th>
                <th style={th}>Top Page</th>
                <th style={th}>Last Seen</th>
                <th style={th}>Urgency</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l: Lead) => (
                <Fragment key={l.company}>
                  <tr
                    onClick={() => setExpanded(expanded === l.company ? null : l.company)}
                    style={{ borderTop: "1px solid rgba(255,255,255,0.05)", cursor: "pointer" }}
                  >
                    <td style={td}>
                      <div style={{ color: "white", fontFamily: "Assistant, sans-serif", fontWeight: 600, fontSize: 13 }}>{l.company}</div>
                      <div style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.35)" }}>{l.location}</div>
                    </td>
                    <td style={td}><span style={{ ...mono, color: YELLOW, fontSize: 13 }}>{l.score}</span></td>
                    <td style={td}><span style={{ ...mono, fontSize: 10, color: "rgba(255,255,255,0.6)" }}>{l.status}</span></td>
                    <td style={td}><SignalBadges signals={l.signals} /></td>
                    <td style={td}><span style={{ ...mono, color: "white", fontSize: 12 }}>{l.websiteVisits}</span></td>
                    <td style={td}><span style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{l.topPage}</span></td>
                    <td style={td}><span style={{ ...mono, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{l.lastSeen}</span></td>
                    <td style={td}><UrgencyTag urgency={l.urgency} /></td>
                  </tr>
                  {expanded === l.company && (
                    <tr>
                      <td colSpan={8} style={{ background: "rgba(255,205,0,0.02)" }}>
                        <div style={{ borderLeft: `2px solid ${YELLOW}`, margin: "10px 0", padding: "8px 18px", fontFamily: "Assistant, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.55 }}>
                          <strong style={{ color: YELLOW }}>Context:</strong> {l.aiContext}
                          <br />
                          <strong style={{ color: YELLOW }}>Recommend:</strong> {l.aiRecommendation}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const th = { padding: "8px 10px", fontWeight: 500, textTransform: "uppercase" as const };
const td = { padding: "12px 10px", verticalAlign: "middle" as const };
