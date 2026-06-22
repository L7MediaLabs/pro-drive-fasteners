import { Link } from "@tanstack/react-router";

export function PageHeader({
  breadcrumb,
  title,
  description,
  bgImage,
  tone = "yellow",
}: {
  breadcrumb?: string;
  title: string;
  description?: string;
  bgImage?: string;
  tone?: "yellow" | "dark";
}) {
  const dark = tone === "dark" || !!bgImage;
  const baseBg = dark ? "var(--pd-dark)" : "var(--pd-yellow)";
  const titleColor = dark ? "#fff" : "var(--pd-dark)";
  const descColor = dark ? "rgba(255,255,255,0.7)" : "rgba(25,20,0,0.65)";
  const breadcrumbColor = dark ? "rgba(255,205,0,0.65)" : "var(--pd-gold)";

  return (
    <header
      className="px-[6%] pt-12 pb-10 relative overflow-hidden"
      style={{ background: baseBg }}
    >
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: 0.35,
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(25,20,0,0.88) 0%, rgba(25,20,0,0.55) 100%)",
            }}
          />
        </>
      )}
      <div className="relative z-10">
        {breadcrumb && (
          <div className="pd-label mb-4" style={{ color: breadcrumbColor }}>
            <Link to="/products" className="hover:underline">Products</Link>
            <span className="mx-2">›</span>
            {breadcrumb}
          </div>
        )}
        <h1 className="pd-display" style={{ color: titleColor, fontSize: "clamp(38px, 7vw, 64px)" }}>
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-[560px]" style={{ color: descColor, fontSize: 15 }}>
            {description}
          </p>
        )}
      </div>
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
