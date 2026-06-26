import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

export const YELLOW = "#FFCD00";
export const DARK = "#0A0A08";
export const PANEL = "#111110";

export const mono: CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
};

export const cardStyle: CSSProperties = {
  background: PANEL,
  border: "1px solid rgba(255,205,0,0.08)",
  padding: 20,
  borderRadius: 0,
};

export function EmptyState() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div style={{ ...mono, color: "rgba(255,255,255,0.5)" }}>
        <div style={{ fontSize: 12, color: YELLOW, letterSpacing: "0.2em", marginBottom: 24 }}>
          NO INTELLIGENCE DATA YET
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>
          Upload this week's processed intelligence file
          <br />
          in Settings to populate the dashboard.
        </div>
        <Link
          to="/admin/settings"
          style={{
            ...mono,
            display: "inline-block",
            border: `1px solid ${YELLOW}`,
            color: YELLOW,
            padding: "10px 18px",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            textDecoration: "none",
          }}
        >
          Go to Settings →
        </Link>
        <span
          style={{
            display: "inline-block",
            marginLeft: 6,
            width: 8,
            height: 14,
            background: YELLOW,
            animation: "pd-blink 1s steps(2, start) infinite",
            verticalAlign: "middle",
          }}
        />
        <style>{`@keyframes pd-blink { to { visibility: hidden; } }`}</style>
      </div>
    </div>
  );
}

export function ModeToggle({
  mode,
  setMode,
}: {
  mode: "DEMO" | "LIVE";
  setMode: (m: "DEMO" | "LIVE") => void;
}) {
  return (
    <div style={{ display: "inline-flex", border: "1px solid rgba(255,205,0,0.25)" }}>
      {(["DEMO", "LIVE"] as const).map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              ...mono,
              padding: "6px 12px",
              fontSize: 10,
              letterSpacing: "0.2em",
              background: active ? YELLOW : "transparent",
              color: active ? "#0A0A08" : "rgba(255,205,0,0.7)",
              border: "none",
              cursor: "pointer",
            }}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
}

export function SignalBadges({
  signals,
}: {
  signals: { email: boolean; website: boolean; meta: boolean };
}) {
  const items: Array<["EMAIL" | "SITE" | "META", boolean]> = [
    ["EMAIL", signals.email],
    ["SITE", signals.website],
    ["META", signals.meta],
  ];
  return (
    <div style={{ display: "inline-flex", gap: 4 }}>
      {items.map(([label, on]) => (
        <span
          key={label}
          style={{
            ...mono,
            fontSize: 9,
            padding: "3px 6px",
            border: on ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.08)",
            background: on ? "rgba(34,197,94,0.12)" : "transparent",
            color: on ? "#22C55E" : "rgba(255,255,255,0.2)",
            letterSpacing: "0.12em",
          }}
        >
          {label} {on ? "✓" : "—"}
        </span>
      ))}
    </div>
  );
}

export function UrgencyTag({ urgency }: { urgency: string }) {
  const map: Record<string, { bg: string; fg: string }> = {
    "CALL TODAY": { bg: "rgba(239,68,68,0.15)", fg: "#EF4444" },
    "CALL THIS WEEK": { bg: "rgba(249,115,22,0.15)", fg: "#F97316" },
    "FOLLOW UP": { bg: "rgba(255,205,0,0.1)", fg: "#FFCD00" },
    "MONITOR": { bg: "rgba(255,255,255,0.06)", fg: "rgba(255,255,255,0.4)" },
  };
  const c = map[urgency] ?? map["MONITOR"];
  return (
    <span
      style={{
        ...mono,
        fontSize: 9,
        padding: "3px 7px",
        background: c.bg,
        color: c.fg,
        letterSpacing: "0.12em",
      }}
    >
      {urgency}
    </span>
  );
}
