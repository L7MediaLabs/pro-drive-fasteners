import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

export function PreviewBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;
  if (pathname.startsWith("/auth")) return null;

  const isPublic = !pathname.startsWith("/admin");

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "6px 6px 6px 18px",
        borderRadius: 999,
        background:
          "linear-gradient(180deg, rgba(18,18,16,0.95), rgba(10,10,8,0.98))",
        border: "1px solid rgba(255,205,0,0.15)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        boxShadow:
          "0 12px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "rgba(255,205,0,0.5)",
          whiteSpace: "nowrap",
          marginRight: 8,
        }}
      >
        Preview
      </span>

      <Link
        to="/"
        style={{
          padding: "8px 16px",
          borderRadius: 999,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          textDecoration: "none",
          transition: "all 0.2s",
          color: isPublic ? "#0A0A08" : "rgba(255,255,255,0.5)",
          background: isPublic ? "#FFCD00" : "transparent",
          border: isPublic ? "1px solid #FFCD00" : "1px solid transparent",
        }}
      >
        Public Site
      </Link>

      <Link
        to="/admin/dashboard"
        style={{
          padding: "8px 16px",
          borderRadius: 999,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          textDecoration: "none",
          transition: "all 0.2s",
          color: !isPublic ? "#0A0A08" : "rgba(255,255,255,0.5)",
          background: !isPublic ? "#FFCD00" : "transparent",
          border: !isPublic ? "1px solid #FFCD00" : "1px solid transparent",
        }}
      >
        Dashboard
      </Link>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss preview bar"
        style={{
          marginLeft: 6,
          width: 26,
          height: 26,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.06)",
          border: "none",
          color: "rgba(255,255,255,0.35)",
          fontSize: 14,
          cursor: "pointer",
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}
