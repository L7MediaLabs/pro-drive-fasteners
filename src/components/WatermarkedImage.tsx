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
  // Size the mark relative to the image's own width (container query units) so
  // it always spans a meaningful portion of the photo — small thumbnails and
  // large shelf photos both get proportional coverage instead of a fixed 9px.
  const fontSize = `clamp(8px, ${(3.9 * scale).toFixed(2)}cqw, 34px)`;
  return (
    <span
      className={className}
      style={{
        position: "relative",
        // NOTE: `container-type: inline-size` applies inline-axis size
        // containment, so the box can NOT size to its contents. As an
        // inline-block that collapsed the wrapper to zero width and the photo
        // disappeared. Sizing from the parent (block, width:100%) keeps the
        // container query working without collapsing.
        display: "block",
        width: "100%",
        textAlign: "center",
        lineHeight: 0,
        containerType: "inline-size",
      }}
    >
      <img src={src} alt={alt} loading={loading} style={imgStyle} />

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "58%",
          transform: "translate(-50%, -50%) rotate(-14deg)",
          pointerEvents: "none",
          userSelect: "none",
          fontFamily: "Assistant, sans-serif",
          fontWeight: 800,
          fontSize,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          color: "var(--pd-dark)",
          opacity,
          textShadow: "0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        Pro-Drive Fasteners
      </span>
    </span>
  );
}
