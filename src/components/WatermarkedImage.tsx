/**
 * FEATURE 1b — reusable product-image watermark wrapper.
 *
 * Wraps a single product photograph and overlays a small, low-opacity
 * "Pro-Drive Fasteners" mark. Placement notes:
 *  - the mark sits in the LOWER THIRD, inset from the edges and horizontally
 *    centered, so a naive edge crop cannot remove it
 *  - opacity stays low (first pass for client review) so it never competes
 *    with the product itself
 *  - the overlay is aria-hidden and pointer-events:none, so existing
 *    click-to-enlarge behaviour on the underlying image is untouched
 */
export function WatermarkedImage({
  src,
  alt,
  imgStyle,
  className,
  loading = "lazy",
  opacity = 0.16,
  scale = 1,
}: {
  src: string;
  alt: string;
  imgStyle?: React.CSSProperties;
  className?: string;
  loading?: "lazy" | "eager";
  /** Watermark opacity. Kept low by default; tune after client review. */
  opacity?: number;
  /** Relative size of the mark, for larger presentations like shelf photos. */
  scale?: number;
}) {
  return (
    <span className={className} style={{ position: "relative", display: "inline-block", lineHeight: 0, maxWidth: "100%" }}>
      <img src={src} alt={alt} loading={loading} style={imgStyle} />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "68%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          userSelect: "none",
          fontFamily: "Assistant, sans-serif",
          fontWeight: 800,
          fontSize: 9 * scale,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          color: "var(--pd-dark)",
          opacity,
          textShadow: "0 1px 0 rgba(255,255,255,0.45)",
        }}
      >
        Pro-Drive Fasteners
      </span>
    </span>
  );
}
