import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export type Product = {
  id: string;
  name: string;
  specs?: string[];
  pack?: string;
  packTier?: string;
  packTierRank?: number;
  image?: string;
  href?:
    | "/staples"
    | "/l-cleats"
    | "/brads-finish-nails"
    | "/divergent-staples"
    | "/mallets"
    | "/split-head-hammer-faces"
    | "/tapping-blocks"
    | "/tapping-rings"
    | "/tipper-de-tipper"
    | "/air-tools"
    | "/accessories"
    | "/products";
};

function MaybeLink({ href, className, style, children }: { href?: Product["href"]; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  if (!href) return <div className={className} style={style}>{children}</div>;
  return <Link to={href} className={className} style={style}>{children}</Link>;
}

export function ProductCard({ product, showPackTier = true }: { product: Product; showPackTier?: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const seen = useRef(false);
  useEffect(() => {
    if (!ref.current || seen.current) return;
    const el = ref.current;
    const key = `pd_pv_${product.id}`;
    if (sessionStorage.getItem(key)) { seen.current = true; return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !seen.current) {
          seen.current = true;
          sessionStorage.setItem(key, "1");
          trackEvent("product_view", { productSku: product.id, productName: product.name });
          io.disconnect();
        }
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [product.id, product.name]);
  return (
    <article
      ref={ref}
      className="bg-white flex flex-col transition-shadow overflow-hidden"
      style={{ borderTop: "3px solid var(--pd-yellow)" }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,205,0,0.18)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
    >
      {product.image && (
        <MaybeLink href={product.href} className="flex items-center justify-center" style={{ height: 170, background: "#fafaf8", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{ maxWidth: "88%", maxHeight: "88%", objectFit: "contain" }}
          />
        </MaybeLink>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="pd-label" style={{ color: "var(--pd-gold)", letterSpacing: "0.15em" }}>{product.id}</div>
        <h3 className="mt-1.5 font-bold" style={{ fontSize: 16, color: "var(--pd-dark)" }}>
          {product.href ? (
            <Link to={product.href} className="hover:underline" style={{ color: "inherit" }}>{product.name}</Link>
          ) : product.name}
        </h3>
        {product.specs && (
          <ul className="mt-2 text-[12px]" style={{ color: "var(--pd-muted)", lineHeight: 1.7 }}>
            {product.specs.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        )}
        {showPackTier && product.packTier && (
          <div
            className="mt-2 inline-block self-start px-2 py-0.5"
            style={{
              background: "var(--pd-yellow)",
              color: "var(--pd-dark)",
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {product.packTier}
          </div>
        )}
        {product.pack && (
          <div className="mt-2 text-[12px] font-semibold" style={{ color: "var(--pd-dark)" }}>{product.pack}</div>
        )}
        <Link
          to="/contact"
          onClick={() => trackEvent("cta_click", { productSku: product.id, productName: product.name, productSlug: product.id.toLowerCase(), ctaLabel: "Contact for Pricing" })}
          className="pd-btn-primary mt-4"
          style={{ padding: "10px", fontSize: 11, width: "100%", marginTop: "auto", paddingTop: 10 }}
        >
          Contact for Pricing →
        </Link>
      </div>
    </article>
  );
}

export function ProductGrid({ products, cols = 3, showPackTier = true }: { products: Product[]; cols?: 3 | 4; showPackTier?: boolean }) {
  const colsClass = cols === 4
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={colsClass} style={{ gap: 2 }}>
      {products.map(p => <ProductCard key={p.id} product={p} showPackTier={showPackTier} />)}
    </div>
  );
}

const TIER_META: Record<string, { label: string; description: string }> = {
  "CONTRACTOR BULK CARTONS": {
    label: "CONTRACTOR BULK CARTONS",
    description: "Full-scale cartons for high-volume professional crews and large jobs.",
  },
  "JOB PACKS": {
    label: "JOB PACKS",
    description: "Mid-size packs built for production job sites and repeat work.",
  },
  "PROJECT PACK": {
    label: "PROJECT PACK",
    description: "Compact 1,000-count packs ideal for small installs, samples, and touch-ups.",
  },
};

const TIER_ORDER = ["CONTRACTOR BULK CARTONS", "JOB PACKS", "PROJECT PACK"];

export function ProductTierSections({
  products,
  cols = 4,
  descriptions,
}: {
  products: Product[];
  cols?: 3 | 4;
  descriptions?: Record<string, string>;
}) {
  const grouped = new Map<string, Product[]>();
  const untiered: Product[] = [];

  for (const p of products) {
    if (p.packTier && TIER_META[p.packTier]) {
      if (!grouped.has(p.packTier)) grouped.set(p.packTier, []);
      grouped.get(p.packTier)!.push(p);
    } else {
      untiered.push(p);
    }
  }

  return (
    <div className="space-y-8">
      {TIER_ORDER.map(tier => {
        const items = grouped.get(tier);
        if (!items || items.length === 0) return null;
        const meta = TIER_META[tier];
        const desc = descriptions?.[tier] ?? meta.description;

        return (
          <section key={tier}>
            <div
              className="px-5 py-4 mb-3 border-l-4"
              style={{ background: "var(--pd-dark)", color: "var(--pd-yellow)", borderLeftColor: "var(--pd-yellow)" }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="pd-eyebrow" style={{ fontSize: 12, opacity: 0.85, letterSpacing: "0.2em" }}>
                    {meta.label}
                  </div>
                  <p className="mt-1 text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.82)", maxWidth: 520, lineHeight: 1.5 }}>
                    {desc}
                  </p>
                </div>
                <span
                  className="hidden sm:inline-flex items-center px-3 py-1 text-[11px] font-bold tracking-wider uppercase"
                  style={{ background: "rgba(255,205,0,0.14)", color: "var(--pd-yellow)" }}
                >
                  {items.length} {items.length === 1 ? "product" : "products"}
                </span>
              </div>
            </div>
            <ProductGrid products={items} cols={cols} showPackTier={false} />
          </section>
        );
      })}

      {untiered.length > 0 && (
        <section>
          <div className="px-5 py-4 mb-3 border-l-4" style={{ background: "var(--pd-dark)", color: "var(--pd-yellow)", borderLeftColor: "var(--pd-yellow)" }}>
            <div className="pd-eyebrow" style={{ fontSize: 12, opacity: 0.85, letterSpacing: "0.2em" }}>STANDARD PACKS</div>
            <p className="mt-1 text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.82)", maxWidth: 520, lineHeight: 1.5 }}>
              Standard packaging options for general use.
            </p>
          </div>
          <ProductGrid products={untiered} cols={cols} showPackTier={false} />
        </section>
      )}
    </div>
  );
}
