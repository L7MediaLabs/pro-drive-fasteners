import { Link } from "@tanstack/react-router";

export function PageHeader({
  breadcrumb,
  title,
  description,
}: {
  breadcrumb?: string;
  title: string;
  description?: string;
}) {
  return (
    <header style={{ background: "var(--pd-yellow)" }} className="px-[6%] pt-12 pb-10">
      {breadcrumb && (
        <div className="pd-label mb-4" style={{ color: "var(--pd-gold)" }}>
          <Link to="/products" className="hover:underline">Products</Link>
          <span className="mx-2">›</span>
          {breadcrumb}
        </div>
      )}
      <h1 className="pd-display" style={{ color: "var(--pd-dark)", fontSize: "clamp(38px, 7vw, 64px)" }}>
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-[560px]" style={{ color: "rgba(25,20,0,0.65)", fontSize: 15 }}>
          {description}
        </p>
      )}
    </header>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="pd-label"
      style={{
        background: "var(--pd-yellow)",
        color: "var(--pd-dark)",
        padding: "12px 24px",
        display: "block",
      }}
    >
      {children}
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-white px-5 py-4 mt-4 text-sm"
      style={{ borderLeft: "3px solid var(--pd-yellow)", color: "var(--pd-text)" }}
    >
      {children}
    </div>
  );
}
