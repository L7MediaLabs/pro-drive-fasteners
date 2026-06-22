import { Link } from "@tanstack/react-router";

export type Product = {
  id: string;
  name: string;
  specs?: string[];
  pack?: string;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className="bg-white p-6 flex flex-col transition-shadow"
      style={{ borderTop: "3px solid var(--pd-yellow)" }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,205,0,0.18)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
    >
      <div className="pd-label" style={{ color: "var(--pd-gold)", letterSpacing: "0.15em" }}>{product.id}</div>
      <h3 className="mt-1.5 font-bold" style={{ fontSize: 16, color: "var(--pd-dark)" }}>{product.name}</h3>
      {product.specs && (
        <ul className="mt-2 text-[12px]" style={{ color: "var(--pd-muted)", lineHeight: 1.7 }}>
          {product.specs.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      )}
      {product.pack && (
        <div className="mt-2.5 text-[12px] font-semibold" style={{ color: "var(--pd-dark)" }}>{product.pack}</div>
      )}
      <Link
        to="/contact"
        className="pd-btn-primary mt-4"
        style={{ padding: "10px", fontSize: 11, width: "100%" }}
      >
        Get Pricing →
      </Link>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 2 }}>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
