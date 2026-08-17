import { Link, useRouterState } from "@tanstack/react-router";
import logoAsset from "../assets/prodrive-logo.svg.asset.json";
import { AgencyCredit } from "./AgencyCredit";

const cols = [
  {
    title: "Products",
    links: [
      { label: "Flooring Staples", to: "/staples" },
      { label: "L-Cleats", to: "/l-cleats" },
      { label: "Brads & Finish Nails", to: "/brads-finish-nails" },
      { label: "Divergent Staples", to: "/divergent-staples" },
      { label: "Mallets & Caps", to: "/mallets" },
      { label: "Tapping Rings", to: "/tapping-rings" },
      { label: "Tapping Blocks", to: "/tapping-blocks" },
      { label: "Tipper-De-Tipper", to: "/tipper-de-tipper" },
      { label: "Air Tools & Hoses", to: "/air-tools" },
      { label: "Accessories", to: "/accessories" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Videos", to: "/videos" },
      { label: "Catalog PDF", to: "#", external: true },
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

/* Routes where the Electro Galvanized corrosion note must NOT render.
   L-Cleats are not described as E-G Galvanized anywhere in Pro-Drive Fasteners®'s catalog
   (distributor lists them as bright basic steel with an antirust treatment), and
   we removed the E-G claim from the L-Cleat spec charts. Showing a warning about
   a galvanized coating on that page would imply a finish the product may not have.
   Do not restore it here without a written finish spec from the client. */
const HIDE_EG_NOTE_ROUTES = ["/l-cleats"];

export function Footer() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const showEgNote = !HIDE_EG_NOTE_ROUTES.includes(pathname.replace(/\/+$/, "") || "/");

  return (
    <footer style={{ background: "var(--pd-dark)" }} className="text-white/70">
      <div className="px-[6%] pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logoAsset.url} alt="Pro-Drive Fasteners®" style={{ height: 56, width: "auto", filter: "drop-shadow(0 4px 16px rgba(255,205,0,0.18))" }} />
            <div className="pd-label mt-4" style={{ color: "rgba(255,205,0,0.4)" }}>
              Pro-Driven Flooring Products and Solutions
            </div>
            <div className="mt-5 text-sm space-y-1 text-white/60">
              {/* Email intentionally not published (Carlton, ops): a public address
                  attracts spam and malware. All inquiries route through /contact. */}
              <div>
                <Link to="/contact" className="hover:text-[color:var(--pd-yellow)]" style={{ color: "var(--pd-yellow)" }}>
                  Contact Sales →
                </Link>
              </div>
              <div>Pro-DriveFasteners.com</div>
            </div>
            <a
              href="https://www.instagram.com/pro_drive_fasteners/"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-sm"
              style={{ color: "var(--pd-yellow)" }}
            >
              Follow @pro_drive_fasteners
            </a>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>{col.title}</div>
              <ul className="mt-4 space-y-1 text-sm">
                {col.links.map(l => (
                  <li key={l.label}>
                    {"external" in l && l.external ? (
                      <a href={l.to} className="text-white/60 hover:text-[color:var(--pd-yellow)]">{l.label}</a>
                    ) : (
                      <Link to={l.to} className="text-white/60 hover:text-[color:var(--pd-yellow)]">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Language</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><span style={{ color: "var(--pd-yellow)" }}>English</span></li>
              <li><span className="text-white/40">Español — coming soon</span></li>
              <li><span className="text-white/40">Português — em breve</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <AgencyCredit variant="footer" tone="dark" />
        </div>

        {/* Site-wide legal notes (client-required, Hollis 8-8-2026). Part (b) must
            appear on every page because product pages list interchange brands. */}
        <div
          className="mt-8 pt-6 space-y-3 max-w-5xl"
          style={{ borderTop: "1px solid rgba(255,205,0,0.12)", fontSize: 11.5, lineHeight: 1.65, color: "rgba(255,255,255,0.45)" }}
        >
          {/* Electro Galvanized corrosion note — suppressed on routes in
              HIDE_EG_NOTE_ROUTES (see top of file). Prop 65 stays on every page. */}
          {showEgNote && (
            <p>
              Electro Galvanized steel provides a very thin layer of coating with a measure of protection against
              the elements. Over time these nails may corrode. Not recommended for exterior application or ACQ
              Treated Lumber.
            </p>
          )}
          <p>
            <strong style={{ color: "rgba(255,255,255,0.7)" }}>WARNING:</strong> This product can
            expose you to chemicals including Nickel and Lead which are known to the State of California to cause
            cancer. For more information visit{" "}
            <a href="https://www.P65Warnings.ca.gov" target="_blank" rel="noreferrer" style={{ color: "rgba(255,205,0,0.7)" }}>
              www.P65Warnings.ca.gov
            </a>
          </p>
          <p style={{ fontStyle: "italic" }}>
            This product is made and sold by Pro-Drive Fasteners® and has no relationship with any of the other
            companies whose trademarks or item numbers are mentioned.
          </p>
        </div>


        <div
          className="mt-8 pt-5 flex flex-col md:flex-row md:justify-between gap-3 text-[13px]"
          style={{ borderTop: "1px solid rgba(255,205,0,0.12)" }}
        >
          <div className="text-white/50 flex items-center gap-4 flex-wrap">
            <span>© 2026 Pro-Drive Fasteners®. All rights reserved.</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <Link to="/auth" style={{ color: "rgba(255,205,0,0.6)" }} className="hover:!text-[color:var(--pd-yellow)]">Client Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
