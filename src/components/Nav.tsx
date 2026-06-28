import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "../assets/prodrive-logo-prev.svg.asset.json";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "linear-gradient(180deg, rgba(255,205,0,0.98), rgba(245,193,0,0.95))"
            : "linear-gradient(180deg, rgba(255,205,0,0.92), rgba(245,193,0,0.88))",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          borderBottom: scrolled
            ? "1px solid rgba(14,12,0,0.18)"
            : "1px solid rgba(14,12,0,0.08)",
          boxShadow: scrolled ? "0 10px 30px -20px rgba(0,0,0,0.35)" : "none",
          height: 68,
        }}
      >
        <div className="h-full px-[6%] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="Pro-Drive Fasteners home">
            <img
              src={logoAsset.url}
              alt="Pro-Drive Fasteners"
              style={{ height: 44, width: "auto", display: "block", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.18))" }}
            />
          </Link>


          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
              <button className="pd-nav-link" style={navLink}>Products ▾</button>
              {drop && (
                <div
                  className="absolute left-0 top-full grid grid-cols-3 gap-8 p-6"
                  style={{
                    minWidth: 720,
                    background: "rgba(14,12,0,0.97)",
                    backdropFilter: "blur(20px) saturate(160%)",
                    border: "1px solid rgba(255,205,0,0.18)",
                    borderRadius: 6,
                    boxShadow: "0 24px 60px -16px rgba(0,0,0,0.7)",
                  }}
                >
                  {[products, tools, equipment].map((col, i) => (
                    <div key={i}>
                      <div className="pd-label mb-3" style={{ color: "rgba(255,205,0,0.6)" }}>
                        {["Fasteners", "Installation Tools", "Equipment"][i]}
                      </div>
                      <ul className="space-y-2">
                        {col.map(l => (
                          <li key={l.to}>
                            <Link to={l.to} className="block text-white/75 hover:text-[color:var(--pd-yellow)] text-sm transition-colors">
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
            <div className="flex items-center gap-2 text-[12px]" style={{ color: "rgba(14,12,0,0.55)" }}>
              <span style={{ color: "rgba(14,12,0,0.95)", fontWeight: 700 }}>EN</span>
              <button onClick={() => showLangToast("Versión en español próximamente")} className="hover:text-[color:var(--pd-black)] transition-colors">ES</button>
              <button onClick={() => showLangToast("Versão em Português em breve")} className="hover:text-[color:var(--pd-black)] transition-colors">PT</button>
            </div>
            <Link to="/contact" className="pd-btn-primary" style={{ padding: "10px 22px", fontSize: 12, background: "rgba(14,12,0,0.95)", color: "var(--pd-yellow)" }}>Get Pricing</Link>
          </div>


          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <span style={{ width: 22, height: 2, background: "rgba(14,12,0,0.9)" }} />
            <span style={{ width: 22, height: 2, background: "rgba(14,12,0,0.9)" }} />
            <span style={{ width: 22, height: 2, background: "rgba(14,12,0,0.9)" }} />
          </button>

        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden flex flex-col" style={{ background: "rgba(14,12,0,0.96)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center justify-between px-[6%]" style={{ height: 68, borderBottom: "1px solid rgba(255,205,0,0.08)" }}>
            <img src={logoAsset.url} alt="Pro-Drive Fasteners" style={{ height: 40 }} />
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
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(14,12,0,0.85)",
  transition: "color 0.15s",
};

