import { Link } from "@tanstack/react-router";
import type { SiteVideo } from "../data/videos";

/**
 * Card treatment matches the existing landscape video cards; only the aspect
 * ratio and max-width change for vertical 9:16 Shorts.
 */
export function VideoCard({ video, className }: { video: SiteVideo; className?: string }) {
  const portrait = !!video.portrait;

  const frame = (
    <div
      style={
        portrait
          ? {
              position: "relative",
              width: "100%",
              maxWidth: 360,
              margin: "0 auto",
              aspectRatio: "9 / 16",
              maxHeight: "70vh",
              background: "var(--pd-dark)",
            }
          : { position: "relative", paddingTop: "56.25%" }
      }
    >
      <iframe
        src={video.src}
        title={video.title}
        loading="lazy"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  return (
    <article className={`bg-white p-5 ${className ?? ""}`} style={{ borderTop: "3px solid var(--pd-yellow)" }}>
      {frame}
      <div className="pd-label mt-4" style={{ color: "var(--pd-gold)" }}>{video.tag}</div>
      <h3 className="mt-1" style={{ fontWeight: 700, fontSize: 16, color: "var(--pd-dark)" }}>{video.title}</h3>
      <p className="mt-2 text-[13px]" style={{ color: "var(--pd-muted)" }}>{video.desc}</p>
      {video.product && (
        <Link
          to={video.product.href}
          className="mt-3 inline-block text-[13px]"
          style={{ color: "var(--pd-dark)", fontWeight: 700, textDecoration: "underline" }}
        >
          {video.product.sku} — {video.product.name}
        </Link>
      )}
    </article>
  );
}
