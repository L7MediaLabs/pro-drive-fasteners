import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const products = [
  { label: "Flooring Staples", to: "/staples" },
  { label: "L-Cleats", to: "/l-cleats" },
  { label: "Brads & Finish Nails", to: "/brads-finish-nails" },
  { label: "Divergent Staples", to: "/divergent-staples" },
];
const tools = [
  { label: "Mallets & Caps", to: "/mallets" },
  { label: "Split Head Hammer Faces", to: "/split-head-hammer-faces" },
  { label: "Tapping Rings", to: "/tapping-rings" },
  { label: "Tapping Blocks", to: "/tapping-blocks" },
  { label: "Tipper-De-Tipper™", to: "/tipper-de-tipper" },
];
const equipment = [
  { label: "Air Tools & Hoses", to: "/air-tools" },
  { label: "Accessories", to: "/accessories" },
  { label: "View All Products", to: "/products" },
];

function showLangToast(msg: string) {
  const ev = new CustomEvent("pd-toast", { detail: msg });
  window.dispatchEvent(ev);
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "var(--pd-dark)", borderBottom: "1px solid rgba(255,205,0,0.08)", height: 64 }}
      >
        <div className="h-full px-[6%] flex items-center justify-between">
          <Link to="/" className="flex flex-col leading-none">
            <span style={{ color: "var(--pd-yellow)", fontWeight: 800, fontSize: 16, letterSpacing: "0.04em" }}>
              PRO-DRIVE FASTENERS<span style={{ fontSize: "0.6em", verticalAlign: "top" }}>®</span>
            </span>
            <span className="hidden sm:block" style={{ color: "rgba(255,205,0,0.35)", fontWeight: 400, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", marginTop: 2 }}>
              Pro-Driven Industrial Products
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
              <button className="pd-nav-link" style={navLink}>Products ▾</button>
              {drop && (
                <div
                  className="absolute left-0 top-full grid grid-cols-3 gap-8 p-6"
                  style={{ background: "var(--pd-darker)", border: "1px solid rgba(255,205,0,0.1)", minWidth: 720 }}
                >
                  {[products, tools, equipment].map((col, i) => (
                    <div key={i}>
                      <div className="pd-label mb-3" style={{ color: "rgba(255,205,0,0.5)" }}>
                        {["Fasteners", "Installation Tools", "Equipment"][i]}
                      </div>
                      <ul className="space-y-2">
                        {col.map(l => (
                          <li key={l.to}>
                            <Link to={l.to} className="block text-white/70 hover:text-[color:var(--pd-yellow)] text-sm">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link to="/l-cleats" style={navLink}>L-Cleats</Link>
            <Link to="/tapping-rings" style={navLink}>Tapping Rings</Link>
            <Link to="/videos" style={navLink}>Videos</Link>
            <Link to="/about" style={navLink}>About</Link>
            <Link to="/contact" style={navLink}>Contact</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-2 text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              <span style={{ color: "var(--pd-yellow)" }}>EN</span>
              <button onClick={() => showLangToast("Versión en español próximamente")} className="hover:text-[color:var(--pd-yellow)]">ES</button>
              <button onClick={() => showLangToast("Versão em Português em breve")} className="hover:text-[color:var(--pd-yellow)]">PT</button>
            </div>
            <Link to="/contact" className="pd-btn-primary" style={{ padding: "10px 20px", fontSize: 11 }}>Get Pricing</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <span style={{ width: 22, height: 2, background: "var(--pd-yellow)" }} />
            <span style={{ width: 22, height: 2, background: "var(--pd-yellow)" }} />
            <span style={{ width: 22, height: 2, background: "var(--pd-yellow)" }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden flex flex-col" style={{ background: "var(--pd-darker)" }}>
          <div className="flex items-center justify-between px-[6%]" style={{ height: 64, borderBottom: "1px solid rgba(255,205,0,0.08)" }}>
            <span style={{ color: "var(--pd-yellow)", fontWeight: 800, fontSize: 16, letterSpacing: "0.04em" }}>
              PRO-DRIVE FASTENERS®
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ color: "var(--pd-yellow)", fontSize: 28, lineHeight: 1 }}>×</button>
          </div>
          <nav className="flex-1 overflow-y-auto px-[6%] py-8 space-y-1">
            <button
              onClick={() => setMobileProducts(v => !v)}
              className="w-full text-left py-3 flex justify-between items-center"
              style={{ ...navLink, fontSize: 13, color: "white" }}
            >
              <span>Products</span><span>{mobileProducts ? "−" : "+"}</span>
            </button>
            {mobileProducts && (
              <div className="pl-4 pb-3 space-y-2">
                {[...products, ...tools, ...equipment].map(l => (
                  <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-2 text-white/60 hover:text-[color:var(--pd-yellow)] text-sm">
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
            {[
              { to: "/videos", label: "Videos" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-3" style={{ ...navLink, fontSize: 13, color: "white" }}>
                {l.label}
              </Link>
            ))}
            <div className="pt-6">
              <Link to="/contact" onClick={() => setOpen(false)} className="pd-btn-primary w-full">Get Pricing</Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

const navLink: React.CSSProperties = {
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.6)",
  transition: "color 0.15s",
};
