import { Link } from "@tanstack/react-router";
import logoAsset from "../assets/prodrive-logo.svg.asset.json";

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
      { label: "Tipper-De-Tipper™", to: "/tipper-de-tipper" },
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

export function Footer() {
  return (
    <footer style={{ background: "var(--pd-dark)" }} className="text-white/70">
      <div className="px-[6%] pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logoAsset.url} alt="Pro-Drive Fasteners" style={{ height: 56, width: "auto", filter: "drop-shadow(0 4px 16px rgba(255,205,0,0.18))" }} />
            <div className="pd-label mt-4" style={{ color: "rgba(255,205,0,0.4)" }}>
              Pro-Driven Industrial Products and Solutions
            </div>
            <div className="mt-5 text-sm space-y-1 text-white/60">
              <div>Sales: sales@pro-drivefasteners.com</div>
              <div>Pro-DriveFasteners.com</div>
            </div>
            <a
              href="https://instagram.com/prodrivestore"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-sm"
              style={{ color: "var(--pd-yellow)" }}
            >
              Follow @prodrivestore
            </a>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>{col.title}</div>
              <ul className="mt-4 space-y-2 text-sm">
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

        <div
          className="mt-12 pt-5 flex flex-col md:flex-row md:justify-between gap-3 text-[12px]"
          style={{ borderTop: "1px solid rgba(255,205,0,0.08)" }}
        >
          <div className="text-white/40">© 2026 Pro-Drive Fasteners®. All rights reserved.</div>
          <a
            href="https://www.seventhstatecreative.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: "rgba(255,205,0,0.4)" }}
            className="hover:!text-[color:var(--pd-yellow)]"
          >
            Designed by Seventh State Creative
          </a>
        </div>
      </div>
    </footer>
  );
}
