import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useState } from "react";

import { useIntelligence, useIntelMode } from "@/lib/use-intelligence";
import {
  EmptyState,
  ModeToggle,
  SignalBadges,
  UrgencyTag,
  YELLOW,
  cardAccentTop,
  mono,
  cardStyle,
  cardAccentTop,
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
          position: "relative",
          background:
            "linear-gradient(135deg, rgba(255,205,0,0.08) 0%, rgba(255,205,0,0.02) 60%, rgba(255,255,255,0.01) 100%)",
          borderLeft: `2px solid ${YELLOW}`,
          border: "1px solid rgba(255,205,0,0.12)",
          borderLeftWidth: 2,
          padding: "22px 26px",
          borderRadius: 2,
          boxShadow:
            "0 0 0 1px rgba(255,205,0,0.04), 0 20px 60px -30px rgba(255,205,0,0.25)",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 200px at 100% 0%, rgba(255,205,0,0.08), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            ...mono,
            fontSize: 10,
            color: YELLOW,
            letterSpacing: "0.25em",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              background: YELLOW,
              borderRadius: "50%",
              boxShadow: `0 0 8px ${YELLOW}`,
            }}
          />
          WEEKLY INSIGHT
        </div>
        <div
          style={{
            fontFamily: "Assistant, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: "rgba(255,255,255,0.95)",
            lineHeight: 1.6,
            position: "relative",
          }}
        >
          {data.summary.weeklyInsight}
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 13,
            color: "rgba(255,255,255,0.55)",
            fontFamily: "Assistant, sans-serif",
            position: "relative",
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
    <div
      style={{ ...cardStyle, transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "rgba(255,205,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
      }}
    >
      <div style={cardAccentTop} />
      <div style={{ ...mono, fontSize: 10, color: "rgba(255,205,0,0.75)", letterSpacing: "0.22em" }}>
        {label}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          marginTop: 12,
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: valueSize,
            lineHeight: 1,
            fontWeight: 500,
            background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.01em",
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
              padding: "2px 6px",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
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
            color: "rgba(255,255,255,0.42)",
            marginTop: 10,
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
        height: 44,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0)) , #0E0E0C",
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 2,
        boxShadow: "0 10px 30px -20px rgba(0,0,0,0.6)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget.querySelector("[data-track]") as HTMLElement | null;
        if (el) el.style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget.querySelector("[data-track]") as HTMLElement | null;
        if (el) el.style.animationPlayState = "running";
      }}
    >
      <div
        data-track
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
              color: "rgba(255,255,255,0.65)",
              padding: "0 26px",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: YELLOW, marginRight: 8, textShadow: `0 0 6px ${YELLOW}` }}>●</span>
            {l.company} — viewed {l.topPage} — {l.status}
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, #0E0E0C 0%, transparent 6%, transparent 94%, #0E0E0C 100%)",
        }}
      />
      <style>{`@keyframes pd-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function HotLeadsTable({ leads }: { leads: Lead[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div style={cardStyle}>
      <div style={cardAccentTop} />
      <div
        style={{
          ...mono,
          fontSize: 11,
          color: YELLOW,
          letterSpacing: "0.22em",
          marginBottom: 18,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ width: 6, height: 6, background: YELLOW, borderRadius: "50%", boxShadow: `0 0 8px ${YELLOW}` }} />
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
                    transition: "background .2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,205,0,0.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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
