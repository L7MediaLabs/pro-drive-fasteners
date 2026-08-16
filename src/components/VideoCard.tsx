import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SHOW_TRANSLATED_VIDEOS, type SiteVideo } from "../data/videos";

/**
 * Card treatment matches the existing landscape video cards; only the aspect
 * ratio and max-width change for vertical 9:16 Shorts.
 *
 * When a video carries `languages` AND SHOW_TRANSLATED_VIDEOS is true, a small
 * row of language labels renders under the player and swaps the embedded Vimeo
 * ID in place. English is always index 0 and the default.
 */
export function VideoCard({ video, className }: { video: SiteVideo; className?: string }) {
  const portrait = !!video.portrait;
  const langs = SHOW_TRANSLATED_VIDEOS ? video.languages : undefined;
  const [langIndex, setLangIndex] = useState(0);
  const active = langs?.[langIndex];
  const src = active?.src ?? video.src;
  const title = active ? `${video.title} — ${active.englishName}` : video.title;

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
        key={src}
        src={src}
        title={title}
        loading="lazy"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        allow="fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  return (
    <article className={`bg-white p-5 ${className ?? ""}`} style={{ borderTop: "3px solid var(--pd-yellow)" }}>
      {frame}
      {langs && langs.length > 1 && (
        <div
          role="group"
          aria-label="Choose video language"
          className="mt-3 flex flex-wrap gap-2"
        >
          {langs.map((l, i) => {
            const selected = i === langIndex;
            return (
              <button
                key={l.code}
                type="button"
                lang={l.code}
                aria-pressed={selected}
                onClick={() => setLangIndex(i)}
                className="px-3 py-1.5 text-[12px]"
                style={{
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  color: selected ? "var(--pd-dark)" : "var(--pd-muted)",
                  background: selected ? "var(--pd-yellow)" : "transparent",
                  border: selected ? "1px solid var(--pd-yellow)" : "1px solid rgba(0,0,0,0.15)",
                }}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      )}
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
