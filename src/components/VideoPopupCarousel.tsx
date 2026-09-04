import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PROMO_SLIDES } from "@/data/promoSlides";
import { trackEvent } from "@/lib/analytics";

/**
 * FEATURE 2 — homepage popup video carousel (shell + framework).
 *
 * Behaviour:
 *  - appears shortly after the homepage mounts (small delay so it doesn't fight
 *    with first paint)
 *  - dismissed by the X button, a click on the backdrop, or Esc
 *  - once dismissed it does NOT re-show for the rest of the browser session
 *    (sessionStorage flag), so in-session navigation back to "/" is quiet
 *  - auto-rotates every 6s; auto-rotation stops as soon as the user takes
 *    manual control (arrow or dot)
 *  - content is entirely driven by PROMO_SLIDES in src/data/promoSlides.ts
 */
const SESSION_KEY = "pd-promo-popup-dismissed";
const ROTATE_MS = 6000;

/**
 * Master switch. Set to true once the real videos are wired up.
 * Deactivated for launch (client request, Sept 3) — the feature stays
 * baked in, it just doesn't render.
 */
const SHOW_PROMO_POPUP = false;

export function VideoPopupCarousel() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [manual, setManual] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const slides = PROMO_SLIDES;

  useEffect(() => {
    if (!SHOW_PROMO_POPUP) return;
    if (slides.length === 0) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch { /* private mode — just show it */ }
    const t = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(t);
  }, [slides.length]);

  const dismiss = useCallback(() => {
    setOpen(false);
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ignore */ }
  }, []);

  // lock scroll + Esc to close + focus the close button
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
      if (e.key === "ArrowRight") { setManual(true); setI(v => (v + 1) % slides.length); }
      if (e.key === "ArrowLeft") { setManual(true); setI(v => (v - 1 + slides.length) % slides.length); }
    };
    window.addEventListener("keydown", onKey);
    trackEvent("promo_popup_open");
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, dismiss, slides.length]);

  // auto-rotate until the user drives it themselves
  useEffect(() => {
    if (!open || manual || slides.length < 2) return;
    const id = window.setInterval(() => setI(v => (v + 1) % slides.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [open, manual, slides.length]);

  if (!open || slides.length === 0) return null;
  const s = slides[i];

  const go = (dir: 1 | -1) => {
    setManual(true);
    setI(v => (v + dir + slides.length) % slides.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pro-Drive Fasteners featured videos"
      onMouseDown={(e) => { if (e.target === e.currentTarget) dismiss(); }}
      className="pd-promo-backdrop fixed inset-0 flex items-center justify-center px-4 py-6"
      style={{ zIndex: 80, background: "rgba(18,15,4,0.5)", backdropFilter: "blur(10px) saturate(115%)" }}
    >
      <div
        ref={panelRef}
        className="pd-promo-panel w-full"
        style={{ maxWidth: 680, position: "relative" }}
      >
        {/* floating close — sits just outside the media, no chrome bar */}
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="pd-promo-ctrl"
          style={{
            position: "absolute", top: -14, right: -8, zIndex: 2,
            width: 38, height: 38, fontSize: 20, fontWeight: 700,
            color: "var(--pd-dark)", background: "rgba(255,255,255,0.92)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.28)", border: 0,
          }}
        >
          ×
        </button>

        <div
          style={{
            borderRadius: 22,
            overflow: "hidden",
            background: "var(--pd-dark)",
            boxShadow: "0 50px 120px -20px rgba(0,0,0,0.55), 0 8px 30px rgba(0,0,0,0.22)",
          }}
        >
          {/* Media sits flush to the panel edges — the video is the object, not a box inside a box */}
          <div style={{ position: "relative", aspectRatio: "16 / 9", background: "var(--pd-dark)" }}>
            {s.videoSrc ? (
              <iframe
                src={s.videoSrc}
                title={s.heading}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <div style={{ width: 34, height: 3, background: "var(--pd-yellow)" }} />
                <div
                  className="mt-3"
                  style={{ color: "var(--pd-yellow)", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}
                >
                  Video coming soon
                </div>
                <div className="mt-1" style={{ color: "rgba(255,255,255,0.7)", fontSize: 11.5 }}>
                  Placeholder — the final cut drops in here.
                </div>
              </div>
            )}

            {/* eyebrow floats over the media */}
            <div
              className="pd-label"
              style={{
                position: "absolute", top: 14, left: 18,
                color: "var(--pd-yellow)", letterSpacing: "0.2em", fontSize: 10,
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              }}
            >
              {s.eyebrow}
            </div>

            {/* arrows float on the media edges */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                  className="pd-promo-ctrl"
                  style={{
                    position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                    width: 36, height: 36, fontSize: 20, fontWeight: 700, border: 0,
                    color: "#fff", background: "rgba(255,255,255,0.16)",
                  }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                  className="pd-promo-ctrl"
                  style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    width: 36, height: 36, fontSize: 20, fontWeight: 700, border: 0,
                    color: "#fff", background: "rgba(255,255,255,0.16)",
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* copy well — blends out of the media, no hard divider */}
          <div
            className="px-6 pt-5 pb-6"
            style={{ background: "linear-gradient(180deg, var(--pd-cream, #F7F3E8) 0%, #fff 62%)" }}
          >
            <h2 className="font-bold" style={{ fontSize: 22, color: "var(--pd-dark)", lineHeight: 1.2 }}>{s.heading}</h2>
            <p className="mt-2" style={{ color: "var(--pd-muted)", fontSize: 13.5, lineHeight: 1.6 }}>{s.blurb}</p>

            <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
              {s.to ? (
                <Link
                  to={s.to}
                  onClick={() => { trackEvent("promo_popup_cta", { productSlug: s.id, ctaLabel: s.ctaLabel }); dismiss(); }}
                  className="pd-btn-primary"
                  style={{ padding: "10px 18px", fontSize: 11 }}
                >
                  {s.ctaLabel} →
                </Link>
              ) : (
                <span className="pd-label" style={{ color: "var(--pd-muted)", fontSize: 10.5 }}>{s.ctaLabel}</span>
              )}

              {/* dot indicators */}
              <div className="flex items-center gap-2">
                {slides.map((sl, idx) => (
                  <button
                    key={sl.id}
                    type="button"
                    onClick={() => { setManual(true); setI(idx); }}
                    aria-label={`Go to slide ${idx + 1}: ${sl.heading}`}
                    aria-current={idx === i ? "true" : undefined}
                    style={{
                      width: idx === i ? 22 : 8,
                      height: 8,
                      borderRadius: 999,
                      border: 0,
                      background: idx === i ? "var(--pd-yellow)" : "rgba(25,20,0,0.18)",
                      transition: "width 180ms ease, background 180ms ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
