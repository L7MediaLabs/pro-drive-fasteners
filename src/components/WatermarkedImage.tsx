import { useEffect, useRef, useState } from "react";

/**
 * FEATURE 1b — reusable product-image watermark wrapper.
 *
 * Layout rule: this wrapper must be COMPLETELY invisible to layout. It is an
 * inline-block that shrink-wraps the image exactly as a bare <img> would, so
 * placement/cropping of every existing photo is unchanged. (An earlier version
 * used `container-type: inline-size`, which applies inline-axis containment and
 * broke sizing/centering — the mark is now sized from a measured width instead.)
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
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [w, setW] = useState(0);

  // Measure the rendered image so the mark spans a proportional share of the
  // photo on both small thumbnails and large shelf photos.
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const fontSize = Math.max(8, Math.min(34, w * 0.082 * scale));

  return (
    <span
      className={className}
      // overflow:hidden clips the rotated mark so it can never widen the page
      // (a long diagonal wordmark on a narrow phone photo caused ~19px of
      // horizontal document overflow before this).
      style={{ position: "relative", display: "inline-block", lineHeight: 0, maxWidth: "100%", overflow: "hidden" }}
    >
      <img ref={imgRef} src={src} alt={alt} loading={loading} style={imgStyle} />
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
