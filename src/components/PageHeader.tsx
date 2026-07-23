import { Link } from "@tanstack/react-router";
import { withRegistered } from "@/lib/brand";
import { AgencyCredit } from "./AgencyCredit";

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
        <div className="mt-6">
          <AgencyCredit variant="compact" tone={dark ? "dark" : "light"} />
        </div>
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

/**
 * Rich info panel with optional heading, applications, and standards blocks.
 * Renders below a ProductGrid to surface catalog copy without cluttering cards.
 */
export function InfoPanel({
  title,
  applications,
  materials,
  standards,
  children,
}: {
  title?: string;
  applications?: string;
  materials?: string;
  standards?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="bg-white mt-4 px-6 py-5 text-sm space-y-3"
      style={{ borderLeft: "3px solid var(--pd-yellow)", color: "var(--pd-text)", lineHeight: 1.65 }}
    >
      {title && (
        <div className="pd-label" style={{ color: "var(--pd-gold)", fontSize: 11 }}>{title}</div>
      )}
      {applications && (
        <div><strong style={{ color: "var(--pd-dark)" }}>Applications: </strong>{applications}</div>
      )}
      {materials && (
        <div><strong style={{ color: "var(--pd-dark)" }}>Material: </strong>{materials}</div>
      )}
      {children}
      {standards && (
        <div style={{ color: "var(--pd-muted)", fontSize: 12 }}>{standards}</div>
      )}
    </div>
  );
}

/**
 * Interchange / compatible-tool list block with subtle footnote.
 */
export function InterchangeList({
  fitsPrimary,
  tools,
}: {
  fitsPrimary?: string;
  tools: string[];
}) {
  return (
    <div
      className="mt-4 px-6 py-5"
      style={{ background: "var(--pd-dark)", color: "#fff", borderLeft: "3px solid var(--pd-yellow)" }}
    >
      <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Guaranteed to Interchange</div>
      {fitsPrimary && (
        <div className="mt-2 text-sm" style={{ color: "#fff" }}>
          <strong style={{ color: "var(--pd-yellow)" }}>Fits: </strong>{withRegistered(fitsPrimary)}
        </div>
      )}
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 mt-3 text-[13px]" style={{ color: "rgba(255,255,255,0.82)" }}>
        {tools.map(t => <li key={t}>— {withRegistered(t)}</li>)}
      </ul>
      <div className="mt-4 text-[11px]" style={{ color: "rgba(255,205,0,0.55)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Verify compatibility by consulting owner manual
      </div>
    </div>
  );
}

/**
 * Legal / compliance footer required on every fastener page.
 */
export function FastenerDisclaimer({ mentionsBrands = false }: { mentionsBrands?: boolean }) {
  return (
    <div
      className="mt-10 px-6 py-5 text-[12px]"
      style={{ background: "#F5F4F0", color: "var(--pd-muted)", lineHeight: 1.7, borderTop: "1px solid rgba(0,0,0,0.06)" }}
    >
      <p>
        Electro-Galvanized steel provides a thin layer of protection. Over time these nails may corrode.
        Not recommended for exterior application or ACQ-treated lumber. To ensure maximum protection,
        use Stainless Steel Type 316.
      </p>
      <p className="mt-2">
        <strong>⚠️ CA Prop 65:</strong> This product can expose you to chemicals including Nickel and Lead.
        For more information visit <a href="https://P65Warnings.ca.gov" target="_blank" rel="noreferrer" style={{ color: "var(--pd-gold)" }}>P65Warnings.ca.gov</a>
      </p>
      {mentionsBrands && (
        <p className="mt-2" style={{ fontStyle: "italic" }}>
          This product is made and sold by Pro-Drive Fasteners® and has no relationship with any of the
          other companies whose trademarks or item numbers are mentioned above. All brand names and
          trademarks are the property of their respective owners.
        </p>
      )}
    </div>
  );
}
