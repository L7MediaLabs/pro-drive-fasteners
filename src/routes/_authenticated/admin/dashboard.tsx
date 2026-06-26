import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useState } from "react";

import { useIntelligence, useIntelMode } from "@/lib/use-intelligence";
import {
  EmptyState,
  ModeToggle,
  SignalBadges,
  UrgencyTag,
  YELLOW,
  PANEL,
  mono,
  cardStyle,
} from "@/components/admin/ui";
import type { Lead } from "@/lib/intelligence-types";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { data, loading } = useIntelligence();
  const { mode, setMode } = useIntelMode();

  if (loading)
    return (
      <div style={{ ...mono, color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
        Loading…
      </div>
    );
  if (!data) return <EmptyState />;

  const hotWarm = data.leads.filter(
    (l) => l.status === "HOT" || l.status === "WARM",
  );
  const visited3 = data.leads.filter((l) => l.websiteVisits >= 3).length;
  const topProduct = data.productStats[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ModeToggle mode={mode} setMode={setMode} />
      </div>

      {/* Weekly Insight */}
      <div
        style={{
          background: "rgba(255,205,0,0.04)",
          borderLeft: `3px solid ${YELLOW}`,
          padding: "20px 24px",
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 10,
            color: YELLOW,
            letterSpacing: "0.2em",
            marginBottom: 8,
          }}
        >
          WEEKLY INSIGHT
        </div>
        <div
          style={{
            fontFamily: "Assistant, sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.55,
          }}
        >
          {data.summary.weeklyInsight}
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "Assistant, sans-serif",
          }}
        >
          → {data.summary.topOpportunity}
        </div>
      </div>

      {/* KPI cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        <Kpi
          label="COMPANIES IDENTIFIED"
          value={String(data.stats.website.uniqueCompanies)}
          delta="+8"
          sub={`avg ${data.stats.website.avgSessionsPerCompany} sessions/co`}
        />
        <Kpi
          label="HOT LEADS"
          value={String(hotWarm.length)}
          delta={visited3 > 0 ? `${visited3}↑` : undefined}
          sub={`${visited3} visited 3+ times`}
        />
        <Kpi
          label="TOP PRODUCT"
          value={topProduct?.product ?? "—"}
          sub={`${topProduct?.views ?? 0} views`}
          valueSize={20}
        />
        <Kpi
          label="INSTAGRAM TRAFFIC"
          value={`${Math.round(data.stats.meta.instagramPercent * 100)}%`}
          sub="of all sessions"
        />
      </div>

      {/* Ticker */}
      <Ticker leads={data.leads} />

      {/* Hot Leads Table */}
      <HotLeadsTable leads={hotWarm} />
    </div>
  );
}

function Kpi({
  label,
  value,
  sub,
  delta,
  valueSize = 30,
}: {
  label: string;
  value: string;
  sub?: string;
  delta?: string;
  valueSize?: number;
}) {
  return (
    <div style={cardStyle}>
      <div style={{ ...mono, fontSize: 10, color: "rgba(255,205,0,0.7)", letterSpacing: "0.2em" }}>
        {label}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          marginTop: 10,
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: valueSize,
            color: "white",
            lineHeight: 1,
            fontWeight: 500,
          }}
        >
          {value}
        </div>
        {delta && (
          <div
            style={{
              ...mono,
              fontSize: 11,
              color: "#22C55E",
              letterSpacing: "0.1em",
            }}
          >
            {delta}
          </div>
        )}
      </div>
      {sub && (
        <div
          style={{
            ...mono,
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            marginTop: 8,
            letterSpacing: "0.1em",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function Ticker({ leads }: { leads: Lead[] }) {
  const items = leads.slice(0, 30);
  return (
    <div
      style={{
        height: 40,
        background: PANEL,
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(255,205,0,0.06)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget.firstChild as HTMLElement | null;
        if (el) el.style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget.firstChild as HTMLElement | null;
        if (el) el.style.animationPlayState = "running";
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "pd-ticker 80s linear infinite",
          height: "100%",
          alignItems: "center",
        }}
      >
        {[...items, ...items].map((l, i) => (
          <span
            key={i}
            style={{
              ...mono,
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              padding: "0 24px",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: YELLOW, marginRight: 6 }}>●</span>
            {l.company} — viewed {l.topPage} — {l.status}
          </span>
        ))}
      </div>
      <style>{`@keyframes pd-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function HotLeadsTable({ leads }: { leads: Lead[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div style={cardStyle}>
      <div
        style={{
          ...mono,
          fontSize: 11,
          color: YELLOW,
          letterSpacing: "0.2em",
          marginBottom: 16,
        }}
      >
        HOT LEADS
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textAlign: "left" }}>
              <Th>Company</Th>
              <Th>Signal Stack</Th>
              <Th>Visits</Th>
              <Th>Top Page</Th>
              <Th>Last Seen</Th>
              <Th>Urgency</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <Fragment key={l.company}>
                <tr
                  key={l.company}
                  onClick={() => setExpanded(expanded === l.company ? null : l.company)}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    cursor: "pointer",
                  }}
                >
                  <Td>
                    <div style={{ color: "white", fontFamily: "Assistant, sans-serif", fontWeight: 600, fontSize: 13 }}>
                      {l.company}
                    </div>
                    <div style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
                      {l.location}
                    </div>
                  </Td>
                  <Td><SignalBadges signals={l.signals} /></Td>
                  <Td><span style={{ ...mono, color: "white", fontSize: 12 }}>{l.websiteVisits}</span></Td>
                  <Td><span style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{l.topPage}</span></Td>
                  <Td><span style={{ ...mono, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{l.lastSeen}</span></Td>
                  <Td><UrgencyTag urgency={l.urgency} /></Td>
                  <Td>
                    <a
                      href={`mailto:?subject=Pro-Drive: ${l.company}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        ...mono,
                        display: "inline-block",
                        border: "1px solid rgba(255,205,0,0.4)",
                        color: YELLOW,
                        padding: "4px 10px",
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        textDecoration: "none",
                      }}
                    >
                      Call Now
                    </a>
                  </Td>
                </tr>
                {expanded === l.company && (
                  <tr key={l.company + "-x"}>
                    <td colSpan={7} style={{ background: "rgba(255,205,0,0.02)" }}>
                      <div
                        style={{
                          borderLeft: `2px solid ${YELLOW}`,
                          margin: "12px 0",
                          padding: "8px 18px",
                          fontFamily: "Assistant, sans-serif",
                        }}
                      >
                        <div style={{ ...mono, fontSize: 9, color: YELLOW, letterSpacing: "0.2em", marginBottom: 6 }}>
                          AI CONTEXT
                        </div>
                        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 1.55, marginBottom: 10 }}>
                          {l.aiContext}
                        </div>
                        <div style={{ ...mono, fontSize: 9, color: YELLOW, letterSpacing: "0.2em", marginBottom: 6 }}>
                          RECOMMENDATION
                        </div>
                        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 1.55 }}>
                          {l.aiRecommendation}
                        </div>
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
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ padding: "8px 10px", fontWeight: 500, textTransform: "uppercase" }}>
      {children}
    </th>
  );
}
function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "12px 10px", verticalAlign: "middle" }}>{children}</td>;
}
