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
};

export function ProductCard({ product }: { product: Product }) {
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
        <div
          className="flex items-center justify-center"
          style={{ height: 170, background: "#fafaf8", borderBottom: "1px solid rgba(0,0,0,0.05)" }}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{ maxWidth: "88%", maxHeight: "88%", objectFit: "contain" }}
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="pd-label" style={{ color: "var(--pd-gold)", letterSpacing: "0.15em" }}>{product.id}</div>
        <h3 className="mt-1.5 font-bold" style={{ fontSize: 16, color: "var(--pd-dark)" }}>{product.name}</h3>
        {product.specs && (
          <ul className="mt-2 text-[12px]" style={{ color: "var(--pd-muted)", lineHeight: 1.7 }}>
            {product.specs.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        )}
        {product.packTier && (
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

export function ProductGrid({ products, cols = 3 }: { products: Product[]; cols?: 3 | 4 }) {
  const colsClass = cols === 4
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={colsClass} style={{ gap: 2 }}>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
