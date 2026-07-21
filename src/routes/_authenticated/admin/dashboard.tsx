import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useState, type CSSProperties, type ReactNode } from "react";

import { useIntelligence, useIntelMode } from "@/lib/use-intelligence";
import {
  EmptyState,
  ModeToggle,
  SignalBadges,
  UrgencyTag,
  YELLOW,
  mono,
  cardStyle,
  cardAccentTop,
} from "@/components/admin/ui";
import { LiveActivityPanel } from "@/components/admin/LiveActivityPanel";
import type { Lead } from "@/lib/intelligence-types";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
  component: DashboardPage,
});

/* ---------------- Page ---------------- */

function DashboardPage() {
  const { data, loading } = useIntelligence();
  const { mode, setMode } = useIntelMode();

  if (loading) {
    return (
      <div style={{ ...mono, color: "var(--pdx-text-mute)", fontSize: 12 }}>
        Loading…
      </div>
    );
  }
  if (!data) return <EmptyState />;

  const hotWarm = data.leads.filter(
    (l) => l.status === "HOT" || l.status === "WARM",
  );
  const visited3 = data.leads.filter((l) => l.websiteVisits >= 3).length;
  const topProduct = data.productStats[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              ...mono,
              fontSize: 10,
              letterSpacing: "0.28em",
              color: "var(--pdx-text-mute)",
            }}
          >
            INTELLIGENCE // WEEK IN REVIEW
          </div>
          <div
            style={{
              fontFamily: "Assistant, sans-serif",
              fontSize: 22,
              fontWeight: 600,
              color: "var(--pdx-text)",
              marginTop: 4,
            }}
          >
            Dashboard
          </div>
        </div>
        <ModeToggle mode={mode} setMode={setMode} />
      </div>

      {/* Weekly Insight */}
      <WeeklyInsight
        insight={data.summary.weeklyInsight}
        opportunity={data.summary.topOpportunity}
      />

      {/* KPI cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        <Kpi
          label="COMPANIES IDENTIFIED"
          value={String(data.stats.website.uniqueCompanies)}
          delta="+8"
          sub={`avg ${data.stats.website.avgSessionsPerCompany} sessions / co`}
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
          sub={`${topProduct?.views ?? 0} views this week`}
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

      {/* Live Site Activity */}
      <LiveActivityPanel />

      {/* Hot Leads */}
      <HotLeadsTable
        leads={hotWarm}
        craigCallScript={data.summary.craigCallScript}
      />
    </div>
  );
}

/* ---------------- Weekly Insight ---------------- */

function WeeklyInsight({
  insight,
  opportunity,
}: {
  insight: string;
  opportunity: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(135deg, rgba(255,205,0,0.10) 0%, rgba(255,205,0,0.02) 60%, transparent 100%)",
        border: "1px solid rgba(255,205,0,0.18)",
        borderLeft: `2px solid ${YELLOW}`,
        padding: "22px 26px",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <SectionLabel>WEEKLY INSIGHT</SectionLabel>
      <div
        style={{
          fontFamily: "Assistant, sans-serif",
          fontSize: 16,
          color: "var(--pdx-text)",
          lineHeight: 1.6,
          marginTop: 10,
        }}
      >
        {insight}
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 13,
          color: "var(--pdx-text-dim)",
          fontFamily: "Assistant, sans-serif",
        }}
      >
        → {opportunity}
      </div>
    </div>
  );
}

/* ---------------- KPI ---------------- */

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
      <div style={cardAccentTop} />
      <div
        style={{
          ...mono,
          fontSize: 10,
          color: "rgba(255,205,0,0.85)",
          letterSpacing: "0.22em",
        }}
      >
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
            color: "var(--pdx-text)",
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
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 2,
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
            color: "var(--pdx-text-mute)",
            marginTop: 10,
            letterSpacing: "0.08em",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

/* ---------------- Ticker ---------------- */

function Ticker({ leads }: { leads: Lead[] }) {
  const items = leads.slice(0, 30);
  if (items.length === 0) return null;
  return (
    <div
      style={{
        height: 44,
        background: "var(--pdx-panel-grad), var(--pdx-panel)",
        border: "1px solid var(--pdx-border)",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget.querySelector(
          "[data-track]",
        ) as HTMLElement | null;
        if (el) el.style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget.querySelector(
          "[data-track]",
        ) as HTMLElement | null;
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
              color: "var(--pdx-text-dim)",
              padding: "0 26px",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: YELLOW, marginRight: 8 }}>●</span>
            {l.company} — viewed {l.topPage} — {l.status}
          </span>
        ))}
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, var(--pdx-fade) 0%, transparent 6%, transparent 94%, var(--pdx-fade) 100%)",
        }}
      />
      <style>{`@keyframes pd-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

/* ---------------- Hot Leads ---------------- */

function HotLeadsTable({
  leads,
  craigCallScript,
}: {
  leads: Lead[];
  craigCallScript: string;
}) {
  const topCompany = leads[0]?.company;
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={cardStyle}>
      <div style={cardAccentTop} />
      <SectionLabel dot>HOT LEADS</SectionLabel>

      {leads.length === 0 ? (
        <div
          style={{
            ...mono,
            fontSize: 12,
            color: "var(--pdx-text-mute)",
            padding: "24px 0",
          }}
        >
          No hot leads this week.
        </div>
      ) : (
        <div style={{ overflowX: "auto", marginTop: 18 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  ...mono,
                  fontSize: 9,
                  color: "var(--pdx-text-mute)",
                  letterSpacing: "0.15em",
                  textAlign: "left",
                }}
              >
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
              {leads.map((l) => {
                const isOpen = expanded === l.company;
                const body =
                  l.company === topCompany ? craigCallScript : l.aiRecommendation;
                const href = `mailto:?subject=${encodeURIComponent(
                  `Pro-Drive Follow-Up: ${l.company}`,
                )}&body=${encodeURIComponent(body)}`;
                return (
                  <Fragment key={l.company}>
                    <tr
                      onClick={() =>
                        setExpanded(isOpen ? null : l.company)
                      }
                      style={{
                        borderTop: "1px solid var(--pdx-border)",
                        cursor: "pointer",
                        transition: "background .2s ease",
                        background: isOpen
                          ? "rgba(255,205,0,0.04)"
                          : "transparent",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,205,0,0.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = isOpen
                          ? "rgba(255,205,0,0.04)"
                          : "transparent")
                      }
                    >
                      <Td>
                        <div
                          style={{
                            color: "var(--pdx-text)",
                            fontFamily: "Assistant, sans-serif",
                            fontWeight: 600,
                            fontSize: 13,
                          }}
                        >
                          {l.company}
                        </div>
                        <div
                          style={{
                            ...mono,
                            fontSize: 9,
                            color: "var(--pdx-text-faint)",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {l.location}
                        </div>
                      </Td>
                      <Td>
                        <SignalBadges signals={l.signals} />
                      </Td>
                      <Td>
                        <span
                          style={{
                            ...mono,
                            color: "var(--pdx-text)",
                            fontSize: 12,
                          }}
                        >
                          {l.websiteVisits}
                        </span>
                      </Td>
                      <Td>
                        <span
                          style={{
                            ...mono,
                            fontSize: 11,
                            color: "var(--pdx-text-dim)",
                          }}
                        >
                          {l.topPage}
                        </span>
                      </Td>
                      <Td>
                        <span
                          style={{
                            ...mono,
                            fontSize: 10,
                            color: "var(--pdx-text-mute)",
                          }}
                        >
                          {l.lastSeen}
                        </span>
                      </Td>
                      <Td>
                        <UrgencyTag urgency={l.urgency} />
                      </Td>
                      <Td>
                        <a
                          href={href}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            ...mono,
                            display: "inline-block",
                            border: "1px solid rgba(255,205,0,0.45)",
                            color: YELLOW,
                            padding: "5px 10px",
                            fontSize: 10,
                            letterSpacing: "0.15em",
                            textDecoration: "none",
                            textAlign: "center",
                            lineHeight: 1.3,
                            borderRadius: 2,
                          }}
                        >
                          Call Now
                          <div
                            style={{
                              fontSize: 8,
                              color: "var(--pdx-text-mute)",
                              letterSpacing: "0.1em",
                              marginTop: 2,
                            }}
                          >
                            {l.urgency}
                          </div>
                        </a>
                      </Td>
                    </tr>
                    {isOpen && (
                      <tr>
                        <td
                          colSpan={7}
                          style={{ background: "rgba(255,205,0,0.03)" }}
                        >
                          <div
                            style={{
                              borderLeft: `2px solid ${YELLOW}`,
                              margin: "12px 0",
                              padding: "8px 18px",
                              fontFamily: "Assistant, sans-serif",
                            }}
                          >
                            <MiniLabel>AI CONTEXT</MiniLabel>
                            <div
                              style={{
                                color: "var(--pdx-text-dim)",
                                fontSize: 13,
                                lineHeight: 1.55,
                                marginBottom: 12,
                              }}
                            >
                              {l.aiContext}
                            </div>
                            <MiniLabel>RECOMMENDATION</MiniLabel>
                            <div
                              style={{
                                color: "var(--pdx-text-dim)",
                                fontSize: 13,
                                lineHeight: 1.55,
                              }}
                            >
                              {l.aiRecommendation}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------------- Small helpers ---------------- */

function SectionLabel({
  children,
  dot,
}: {
  children: ReactNode;
  dot?: boolean;
}) {
  return (
    <div
      style={{
        ...mono,
        fontSize: 10,
        color: YELLOW,
        letterSpacing: "0.25em",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            background: YELLOW,
            borderRadius: "50%",
            boxShadow: `0 0 8px ${YELLOW}`,
          }}
        />
      )}
      {children}
    </div>
  );
}

function MiniLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        ...mono,
        fontSize: 9,
        color: YELLOW,
        letterSpacing: "0.2em",
        marginBottom: 6,
      }}
    >
      {children}
    </div>
  );
}

const thStyle: CSSProperties = {
  padding: "8px 10px",
  fontWeight: 500,
  textTransform: "uppercase",
};
const tdStyle: CSSProperties = { padding: "12px 10px", verticalAlign: "middle" };

function Th({ children }: { children: ReactNode }) {
  return <th style={thStyle}>{children}</th>;
}
function Td({ children }: { children: ReactNode }) {
  return <td style={tdStyle}>{children}</td>;
}
