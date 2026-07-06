import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import type { Product } from "./ProductCard";
import { ProductCard } from "./ProductCard";

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
  badges?: { label: string; accent?: boolean }[];
  rightImage?: string;
  rightImageAlt?: string;
  rightImageFit?: "cover" | "contain";
}) {
  return (
    <section className="px-[6%] pt-20 pb-16 relative overflow-hidden" style={{ background: "var(--pd-dark)" }}>
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          aria-hidden
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center", opacity: 0.26,
          }}
        />
      )}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(15,15,15,0.88), rgba(15,15,15,0.55))",
        }}
      />
      <div className={`relative z-10 grid ${rightImage ? "lg:grid-cols-[1.1fr_0.9fr]" : ""} gap-12 items-center`}>
        <div>
          <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>{kicker}</div>
          <h1 className="pd-display text-white mt-3" style={{ fontSize: "clamp(40px, 7vw, 68px)", lineHeight: 1.02 }}>
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-white/70 max-w-xl" style={{ fontSize: 17, lineHeight: 1.6 }}>
              {description}
            </p>
          )}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-7">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className="pd-glass-light px-4 py-2"
                  style={{
                    fontSize: 12,
                    color: b.accent ?? i === 0 ? "var(--pd-yellow)" : "#fff",
                    letterSpacing: "0.12em",
                    fontWeight: 700,
                  }}
                >
                  {b.label}
                </div>
              ))}
            </div>
          )}
        </div>
        {rightImage && (
          <div className="relative" style={{ aspectRatio: "4/5", maxHeight: 520 }}>
            <img
              src={rightImage}
              alt={rightImageAlt ?? ""}
              loading="eager"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                borderRadius: 4, boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── TabNav ────────────────────────────────────────────────────────────────────
export function TabNav<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ background: "var(--pd-darker, #0a0a0a)" }} className="px-[6%] flex gap-6 md:gap-8 border-b border-white/5 overflow-x-auto">
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className="pd-label py-5 whitespace-nowrap"
          style={{
            color: value === t.key ? "var(--pd-yellow)" : "rgba(255,255,255,0.45)",
            borderBottom: value === t.key ? "2px solid var(--pd-yellow)" : "2px solid transparent",
            fontSize: 13,
            letterSpacing: "0.18em",
            fontWeight: 700,
            background: "transparent",
          }}
        >
          {t.label}
        </button>
      ))}
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
          <div className="pd-label" style={{ color: "var(--pd-muted)", fontSize: 10 }}>{s.k}</div>
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
    <div style={{ background: "#fff", padding: 16, borderTop: "3px solid var(--pd-yellow)" }}>
      <img src={src} alt={alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
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
}: {
  image?: string;
  kicker: string;
  title: string;
  body: string;
  cta?: { label: string; to: string };
  height?: number;
}) {
  return (
    <section className="relative overflow-hidden" style={{ height, background: "var(--pd-dark)" }}>
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.45) 60%, rgba(15,15,15,0.15) 100%)",
        }}
      />
      <div className="relative z-10 h-full flex items-center px-[6%]">
        <div className="max-w-xl">
          <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>{kicker}</div>
          <h3 className="pd-display text-white mt-3" style={{ fontSize: 36, lineHeight: 1.1 }}>
            {title}
          </h3>
          <p className="mt-4 text-white/75" style={{ fontSize: 15, lineHeight: 1.7 }}>
            {body}
          </p>
          <Link to={cta.to} className="pd-btn-primary mt-6 inline-block" style={{ padding: "12px 24px", fontSize: 12 }}>
            {cta.label}
          </Link>
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
      <div
        className="grid grid-flow-col auto-cols-[minmax(240px,1fr)] gap-3 overflow-x-auto pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map(p => (
          <div key={p.id} style={{ scrollSnapAlign: "start" }}>
            <ProductCard product={p} />
          </div>
        ))}
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
            other companies whose trademarks or item numbers are mentioned on this page.
          </p>
        )}
      </div>
    </details>
  );
}

// ─── useTabState hook (thin wrapper for readability) ─────────────────────────
export function useTabs<T extends string>(initial: T) {
  const [tab, setTab] = useState<T>(initial);
  return [tab, setTab] as const;
}
