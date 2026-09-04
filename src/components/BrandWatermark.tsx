/**
 * FEATURE 1a — site-wide brand watermark (first pass, deliberately subtle).
 *
 * A faint fixed mark in the lower-left corner. Purely decorative: it is
 * aria-hidden, never receives pointer events, sits BELOW the mobile nav overlay
 * and the text-size toggle, and is suppressed in print output.
 */
export function BrandWatermark() {
  return (
    <div
      aria-hidden="true"
      className="pd-brand-watermark"
      style={{
        position: "fixed",
        left: 14,
        bottom: 12,
        zIndex: 20,
        pointerEvents: "none",
        userSelect: "none",
        fontFamily: "Assistant, sans-serif",
        fontWeight: 800,
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--pd-dark)",
        opacity: 0.13,
        whiteSpace: "nowrap",
      }}
    >
      Pro-Drive Fasteners
      <span style={{ fontSize: "0.62em", verticalAlign: "super", lineHeight: 0 }}>&reg;</span>
    </div>
  );
}
