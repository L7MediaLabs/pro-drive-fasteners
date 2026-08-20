import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Product } from "./ProductCard";
import { ProductCard } from "./ProductCard";
import { trackEvent } from "@/lib/analytics";
import { images } from "@/data/images";

// ─── CinematicHero ────────────────────────────────────────────────────────────
export function CinematicHero({
  kicker,
  title,
  description,
  bgImage,
  badges,
  rightImage,
  rightImageAlt,
  rightImageFit = "cover",
}: {
  kicker: string;
  title: ReactNode;
  description?: string;
  bgImage?: string;
  badges?: { label: string; accent?: boolean; logo?: string }[];
  rightImage?: string;
  rightImageAlt?: string;
  rightImageFit?: "cover" | "contain";
}) {
  return (
    <section className="px-[6%] pt-20 pb-16 relative overflow-hidden" style={{ background: "var(--pd-cream)" }}>
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          aria-hidden
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center", opacity: 0.22,
          }}
        />
      )}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(245,241,232,0.92), rgba(245,241,232,0.55))",
        }}
      />
      <div className={`relative z-10 grid ${rightImage ? "lg:grid-cols-[1.15fr_0.85fr]" : ""} gap-10 lg:gap-14 items-center`}>
        <div>
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>{kicker}</div>
          <h1 className="pd-display mt-3" style={{ color: "var(--pd-dark)", fontSize: "clamp(38px, 6.2vw, 62px)", lineHeight: 1.05, letterSpacing: "-0.01em" }}>
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl" style={{ color: "rgba(25,20,0,0.72)", fontSize: 16.5, lineHeight: 1.6 }}>
              {description}
            </p>
          )}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mt-7">
              {badges.map((b, i) =>
                b.logo ? (
                  <img
                    key={i}
                    src={b.logo}
                    alt={b.label}
                    style={{ height: 52, width: "auto", display: "block", alignSelf: "center" }}
                  />
                ) : (
                  <div
                    key={i}
                    className="px-3.5 py-2 self-center"
                    style={{
                      background: "var(--pd-dark)",
                      fontSize: 11,
                      color: b.accent ?? i === 0 ? "var(--pd-yellow)" : "#fff",
                      letterSpacing: "0.14em",
                      fontWeight: 700,
                    }}
                  >
                    {b.label}
                  </div>
                )
              )}
            </div>
          )}
        </div>
        {rightImage && (
          <div
            className="relative mx-auto w-full"
            style={{
              aspectRatio: rightImageFit === "contain" ? "5/4" : "4/5",
              maxHeight: rightImageFit === "contain" ? 420 : 500,
              maxWidth: rightImageFit === "contain" ? 520 : 440,
              background: rightImageFit === "contain" ? "#fff" : "transparent",
              borderRadius: 4,
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}
          >
            <img
              src={rightImage}
              alt={rightImageAlt ?? ""}
              loading="eager"
              style={{
                width: "100%", height: "100%",
                objectFit: rightImageFit,
                objectPosition: "center",
                padding: rightImageFit === "contain" ? 20 : 0,
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── TabNav ────────────────────────────────────────────────────────────────────
// Client review (Hollis): the ribbon was too small/low-contrast to read as
// interactive. Font 13 → 15px, inactive colour 45% → 78% white, active weight
// 700 → 800, thicker underline. Entries may optionally link to another route.
export function TabNav<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: { key: T; label: string; href?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const base = {
    fontSize: 15,
    letterSpacing: "0.16em",
    fontWeight: 800,
    background: "transparent",
  } as const;

  return (
    <div style={{ background: "var(--pd-darker, #0a0a0a)" }} className="px-[6%] flex gap-6 md:gap-8 border-b border-white/5 overflow-x-auto">
      {tabs.map(t =>
        t.href ? (
          <Link
            key={t.key}
            to={t.href}
            className="pd-label py-5 whitespace-nowrap"
            style={{
              ...base,
              color: "rgba(255,255,255,0.78)",
              borderBottom: "3px solid transparent",
              textDecoration: "none",
            }}
          >
            {t.label}
          </Link>
        ) : (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className="pd-label py-5 whitespace-nowrap"
            style={{
              ...base,
              color: value === t.key ? "var(--pd-yellow)" : "rgba(255,255,255,0.78)",
              borderBottom: value === t.key ? "3px solid var(--pd-yellow)" : "3px solid transparent",
            }}
          >
            {t.label}
          </button>
        ),
      )}
    </div>
  );
}

// ─── SpecCardGrid ─────────────────────────────────────────────────────────────
export function SpecCardGrid({ specs }: { specs: { k: string; v: string }[] }) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-px"
      style={{ background: "rgba(0,0,0,0.08)" }}
    >
      {specs.map(s => (
        <div key={s.k} className="bg-white px-4 py-3">
          <div
            className="pd-label"
            style={{ color: "var(--pd-dark)", fontSize: 10, fontWeight: 800 }}
          >
            {s.k}
          </div>
          <div className="font-bold mt-1" style={{ color: "var(--pd-dark)", fontSize: 13 }}>{s.v}</div>
        </div>
      ))}
    </div>
  );
}

// ─── SplitLayout ──────────────────────────────────────────────────────────────
export function SplitLayout({
  gallery,
  children,
}: {
  gallery: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
      <div className="space-y-3">{gallery}</div>
      <div>{children}</div>
    </div>
  );
}

export function GalleryHero({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <div style={{ background: "#fff", padding: 20, borderTop: "3px solid var(--pd-yellow)" }}>
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          aspectRatio: "1 / 1", maxHeight: 380,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
        />
      </div>
      {caption && (
        <div className="pd-label mt-3" style={{ color: "var(--pd-gold)", fontSize: 11 }}>{caption}</div>
      )}
    </div>
  );
}

export function GalleryPair({ items }: { items: { src: string; alt: string; caption?: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((it, i) => (
        <div key={i} style={{ background: "#fff", padding: 12 }}>
          <img src={it.src} alt={it.alt} loading="lazy" style={{ width: "100%", height: 180, objectFit: "cover" }} />
          {it.caption && (
            <div className="pd-label mt-2" style={{ color: "var(--pd-muted)", fontSize: 10 }}>{it.caption}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── LifestyleBanner ──────────────────────────────────────────────────────────
export function LifestyleBanner({
  image,
  kicker,
  title,
  body,
  cta = { label: "Request Distributor Pricing →", to: "/contact" },
  height = 360,
  badge,
}: {
  image?: string;
  kicker: string;
  title: string;
  body: ReactNode;
  cta?: { label: string; to: string };
  height?: number;
  badge?: { src: string; alt: string };
}) {
  return (
    <section className="relative overflow-hidden" style={{ height, background: "var(--pd-cream)" }}>
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
        />
      )}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(245,241,232,0.94) 0%, rgba(245,241,232,0.65) 55%, rgba(245,241,232,0.2) 100%)",
        }}
      />
      <div className="relative z-10 h-full flex items-center px-[6%]">
        <div className="max-w-xl flex gap-6 items-start">
          {badge && (
            <img
              src={badge.src}
              alt={badge.alt}
              loading="lazy"
              style={{ width: 96, height: "auto", flexShrink: 0, marginTop: 4 }}
            />
          )}
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>{kicker}</div>
            <h3 className="pd-display mt-3" style={{ color: "var(--pd-dark)", fontSize: 36, lineHeight: 1.1 }}>
              {title}
            </h3>
            <div className="mt-4 space-y-2" style={{ color: "rgba(25,20,0,0.78)", fontSize: 15, lineHeight: 1.7 }}>
              {typeof body === "string" ? <p>{body}</p> : body}
            </div>
            <Link to={cta.to} onClick={() => cta.to === "/contact" && trackEvent("cta_click", { ctaLabel: cta.label ?? "Contact" })} className="pd-btn-dark mt-6 inline-block" style={{ padding: "12px 24px", fontSize: 12 }}>
              {cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TechReference wrapper ───────────────────────────────────────────────────
export function TechReference({
  kicker = "Reference",
  title,
  intro,
  children,
  footnote,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  footnote?: ReactNode;
}) {
  return (
    <section className="px-[6%] py-16" style={{ background: "var(--pd-light-bg)" }}>
      <div className="pd-label" style={{ color: "var(--pd-gold)" }}>{kicker}</div>
      <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 36 }}>{title}</h2>
      {intro && <p className="mt-2" style={{ color: "var(--pd-muted)" }}>{intro}</p>}
      <div className="mt-6">{children}</div>
      {footnote && (
        <div className="bg-white px-5 py-4 mt-6 text-sm" style={{ borderLeft: "3px solid var(--pd-yellow)" }}>
          {footnote}
        </div>
      )}
    </section>
  );
}

// ─── RelatedProducts scroller ────────────────────────────────────────────────
export function RelatedProducts({ products, title = "Related Products" }: { products: Product[]; title?: string }) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [thumb, setThumb] = useState({ width: 100, left: 0 });

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const update = () => {
      const ratio = el.clientWidth / el.scrollWidth;
      const width = Math.min(100, ratio * 100);
      const maxScroll = el.scrollWidth - el.clientWidth;
      const left = maxScroll > 0 ? (el.scrollLeft / maxScroll) * (100 - width) : 0;
      setThumb({ width, left });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [products.length]);

  const scrollBy = (dir: number) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(260, el.clientWidth * 0.8), behavior: "smooth" });
  };

  if (!products.length) return null;
  return (
    <section className="px-[6%] py-14" style={{ background: "var(--pd-dark)" }}>
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Explore More</div>
          <h3 className="pd-display text-white mt-2" style={{ fontSize: 28 }}>{title}</h3>
        </div>
        <Link to="/products" className="pd-label" style={{ color: "var(--pd-yellow)", fontSize: 12 }}>
          View All Products →
        </Link>
      </div>
      <div className="relative">
        <div
          ref={railRef}
          className="pd-scroller grid grid-flow-col auto-cols-[minmax(240px,1fr)] gap-3 overflow-x-auto pb-1"
          style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
        >
          {products.map(p => (
            <div key={p.id} style={{ scrollSnapAlign: "start" }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-4">
          <div className="h-[3px] flex-1" style={{ background: "rgba(255,255,255,0.12)" }}>
            <div
              className="h-full transition-[width,margin] duration-200"
              style={{ background: "var(--pd-yellow)", width: `${thumb.width}%`, marginLeft: `${thumb.left}%` }}
            />
          </div>
          <div className="flex gap-2">
            {[-1, 1].map(dir => (
              <button
                key={dir}
                type="button"
                aria-label={dir === -1 ? "Scroll left" : "Scroll right"}
                onClick={() => scrollBy(dir)}
                className="flex items-center justify-center transition-colors"
                style={{
                  width: 38, height: 38,
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "var(--pd-yellow)",
                  background: "transparent",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,205,0,0.12)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {dir === -1 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PageDisclaimers (collapsible) ────────────────────────────────────────────
export function PageDisclaimers({
  prop65 = true,
  galvanized = false,
  trademarks = false,
}: {
  prop65?: boolean;
  galvanized?: boolean;
  trademarks?: boolean;
}) {
  return (
    <details
      className="px-[6%] py-6"
      style={{ background: "#F5F4F0", color: "var(--pd-muted)", fontSize: 12, lineHeight: 1.7, borderTop: "1px solid rgba(0,0,0,0.06)" }}
    >
      <summary
        className="cursor-pointer pd-label"
        style={{ color: "var(--pd-dark)", fontSize: 11, letterSpacing: "0.18em", fontWeight: 700 }}
      >
        Legal · Compliance · Compatibility
      </summary>
      <div className="mt-4 space-y-3 max-w-4xl">
        {galvanized && (
          <p>
            Electro-Galvanized steel provides a thin layer of protection. Over time these fasteners may corrode.
            Not recommended for exterior application or ACQ-treated lumber. To ensure maximum protection,
            use Stainless Steel Type 316.
          </p>
        )}
        {prop65 && (
          <p>
            <strong>⚠️ CA Prop 65:</strong> This product can expose you to chemicals including Nickel and Lead.
            For more information visit{" "}
            <a href="https://P65Warnings.ca.gov" target="_blank" rel="noreferrer" style={{ color: "var(--pd-gold)" }}>
              P65Warnings.ca.gov
            </a>
            .
          </p>
        )}
        {trademarks && (
          <p style={{ fontStyle: "italic" }}>
            This product is made and sold by Pro-Drive Fasteners® and has no relationship with any of the
            other companies whose trademarks or item numbers are mentioned on this page. All brand names
            and trademarks are the property of their respective owners.
          </p>
        )}
      </div>
    </details>
  );
}

// ─── useTabState hook ────────────────────────────────────────────────────────
// Optional `tabForSku` makes tabs deep-link aware: product search navigates to
// `/staples#sku-FS-200-1000`, and the tab holding that SKU is auto-selected so
// the anchor actually exists in the DOM before ProductCard scrolls to it.
export function useTabs<T extends string>(initial: T, tabForSku?: (sku: string) => T | undefined) {
  const [tab, setTab] = useState<T>(initial);

  const routeHash = useRouterState({ select: s => s.location.hash });
  useEffect(() => {
    if (!tabForSku) return;
    const hash = routeHash.replace(/^#/, "");
    if (!hash.startsWith("sku-")) return;
    const target = tabForSku(hash.slice(4));
    if (target) setTab(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeHash]);

  return [tab, setTab] as const;
}

// ─── BulletBlock ──────────────────────────────────────────────────────────────
// Reusable client-copy block: kicker + optional title + dashed bullet list +
// optional footnote. `tone="accent"` gives the block real visual weight (used
// for the JAM-FREE GUARANTEE section, the client's strongest differentiator).
export function BulletBlock({
  kicker,
  title,
  bullets,
  footnote,
  tone = "light",
  className = "",
}: {
  kicker: string;
  title?: ReactNode;
  bullets: ReactNode[];
  footnote?: ReactNode;
  tone?: "light" | "accent";
  className?: string;
}) {
  const accent = tone === "accent";
  return (
    <div
      className={`p-6 md:p-8 ${className}`}
      style={{
        background: accent ? "var(--pd-yellow)" : "#fff",
        borderTop: accent ? "none" : "3px solid var(--pd-yellow)",
        borderLeft: accent ? "6px solid var(--pd-dark)" : undefined,
      }}
    >
      <div className="pd-label" style={{ color: accent ? "var(--pd-dark)" : "var(--pd-gold)" }}>{kicker}</div>
      {title && (
        <h3
          className="pd-display mt-2"
          style={{ color: "var(--pd-dark)", fontSize: accent ? 30 : 22, lineHeight: 1.12 }}
        >
          {title}
        </h3>
      )}
      <ul className={`mt-5 grid ${bullets.length > 3 ? "md:grid-cols-2" : ""} gap-x-8 gap-y-3`}>
        {bullets.map((b, i) => (
          <li
            key={i}
            className="flex gap-3"
            style={{ color: "var(--pd-dark)", fontSize: accent ? 16 : 15, lineHeight: 1.6, fontWeight: accent ? 600 : 400 }}
          >
            <span aria-hidden style={{ color: accent ? "var(--pd-dark)" : "var(--pd-amber-ink)", fontWeight: 900 }}>—</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {footnote && (
        <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.12)", fontSize: 12.5, color: accent ? "rgba(25,20,0,0.8)" : "var(--pd-muted)", lineHeight: 1.6 }}>
          {footnote}
        </div>
      )}
    </div>
  );
}

// ─── UsaFlagBadge ─────────────────────────────────────────────────────────────
// Client-supplied "MADE IN USA" flag mark (Hollis, Build 3). Sized and treated
// as a credential badge — consistent with the existing grade badges — not as
// decorative imagery.
export function UsaFlagBadge({
  size = 30,
  tone = "light",
  className = "",
}: {
  size?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <span
      className={`inline-flex items-center gap-2 align-middle ${className}`}
      style={{
        background: dark ? "rgba(255,255,255,0.08)" : "#fff",
        border: dark ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(0,0,0,0.1)",
        borderLeft: "3px solid var(--pd-yellow)",
        padding: "5px 10px",
      }}
    >
      <UsaFlag height={Math.round(size * 0.55)} />

      <span
        className="pd-label"
        style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.14em",
          color: dark ? "#fff" : "var(--pd-dark)",
          whiteSpace: "nowrap",
        }}
      >
        MADE IN USA
      </span>
    </span>
  );
}
