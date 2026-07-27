// Seventh State Creative credit block, four variants.
// prominent: large, boxed, for homepage feature slot
// compact:   inline, single-row, for page headers
// minimal:   subtle text link, fallback for tight spots
// footer:    full-width centered sign-off at the bottom of the footer

type Variant = "prominent" | "compact" | "minimal" | "footer";

const HREF = "https://seventhstatecreative.com/james";
const LOCATION = "Dallas, GA · Serving Metro Atlanta";

import logoWhite from "@/assets/7sc-logo-white.svg";
import logoColor from "@/assets/7sc-logo.svg";

function Mark({ size = 28, onDark = true }: { size?: number; onDark?: boolean; color?: string }) {
  // Official Seventh State Creative mark; white variant on dark surfaces, full-color on light.
  return (
    <img
      src={onDark ? logoWhite : logoColor}
      alt="Seventh State Creative"
      width={size}
      height={size}
      style={{ flex: "none", display: "block", width: size, height: "auto" }}
    />
  );
}

export function AgencyCredit({
  variant = "prominent",
  tone = "dark",
}: {
  variant?: Variant;
  tone?: "dark" | "light";
}) {
  const onDark = tone === "dark";
  const accent = "var(--pd-yellow)";
  const textPrimary = onDark ? "rgba(255,255,255,0.92)" : "var(--pd-dark)";
  const textSecondary = onDark ? "rgba(255,255,255,0.55)" : "rgba(25,20,0,0.6)";
  const borderColor = onDark ? "rgba(255,205,0,0.22)" : "rgba(25,20,0,0.15)";

  if (variant === "minimal") {
    return (
      <a
        href={HREF}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 hover:!text-[color:var(--pd-yellow)]"
        style={{ color: textSecondary, fontSize: 13, fontWeight: 500 }}
      >
        <Mark size={18} color={accent} />
        <span>
          Designed by <strong style={{ color: textPrimary }}>Seventh State Creative</strong>
        </span>
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={HREF}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-3 group"
        style={{
          padding: "8px 14px",
          border: `1px solid ${borderColor}`,
          background: onDark ? "rgba(255,205,0,0.04)" : "rgba(255,205,0,0.06)",
          color: textPrimary,
          textDecoration: "none",
        }}
      >
        <Mark size={22} color={accent} />
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: textSecondary,
          }}
        >
          Designed by
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: textPrimary,
            letterSpacing: "0.01em",
          }}
        >
          Seventh State Creative
        </span>
        <span
          style={{
            fontSize: 12,
            color: accent,
            paddingLeft: 10,
            borderLeft: `1px solid ${borderColor}`,
            fontWeight: 500,
          }}
        >
          {LOCATION}
        </span>
      </a>
    );
  }

  // footer — full-width centered sign-off band
  if (variant === "footer") {
    return (
      <a
        href={HREF}
        target="_blank"
        rel="noreferrer"
        className="group flex flex-col items-center text-center w-full hover:!opacity-100 transition-opacity"
        style={{
          padding: "42px 24px",
          borderTop: `1px solid ${borderColor}`,
          color: textPrimary,
          textDecoration: "none",
        }}
      >
        <Mark size={56} color={accent} />
        <div className="mt-5" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            Designed & Built By
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: textPrimary,
              letterSpacing: "0.005em",
              lineHeight: 1.05,
            }}
          >
            Seventh State Creative
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: textSecondary,
              letterSpacing: "0.02em",
            }}
          >
            {LOCATION}
          </div>
        </div>
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: accent, fontSize: 20, marginTop: 12, fontWeight: 700 }}
        >
          ↗
        </span>
      </a>
    );
  }

  // prominent
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-5 group hover:!opacity-100 transition-opacity"
      style={{
        padding: "22px 32px",
        border: `1px solid ${borderColor}`,
        background: onDark ? "rgba(255,205,0,0.06)" : "rgba(255,205,0,0.08)",
        color: textPrimary,
        textDecoration: "none",
        maxWidth: "100%",
      }}
    >
      <Mark size={52} color={accent} />
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: accent,
          }}
        >
          Designed & Built By
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: textPrimary,
            letterSpacing: "0.005em",
            lineHeight: 1.1,
          }}
        >
          Seventh State Creative
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: textSecondary,
            letterSpacing: "0.02em",
          }}
        >
          {LOCATION}
        </div>
      </div>
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
        style={{ color: accent, fontSize: 24, marginLeft: 8, fontWeight: 700 }}
      >
        ↗
      </span>
    </a>
  );
}
