import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SEARCH_INDEX } from "@/data/products";
import { scoreEntry } from "@/lib/search";
import type { Product } from "./ProductCard";

export function ProductSearch({ variant = "desktop", onNavigate }: { variant?: "desktop" | "mobile" | "inline"; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const term = q.trim();
    if (term.length < 2) return [];
    return SEARCH_INDEX
      .map(e => ({ p: e.product, s: scoreEntry(e, term) }))
      .filter((r): r is { p: Product; s: number } => r.s !== null)
      .sort((a, b) => a.s - b.s)
      .slice(0, 8)
      .map(r => r.p);
  }, [q]);


  useEffect(() => { setActive(0); }, [q]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(p: Product) {
    setOpen(false);
    setQ("");
    onNavigate?.();
    navigate({ to: p.href ?? "/products", hash: p.id });
  }

  if (variant === "inline") {
    return (
      <div>
        <div
          className="flex items-center gap-2 px-3"
          style={{
            height: 40,
            borderRadius: 4,
            border: "1px solid rgba(255,205,0,0.28)",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ color: "rgba(255,205,0,0.7)" }}><SearchIcon /></span>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive(i => Math.min(i + 1, results.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setActive(i => Math.max(i - 1, 0)); }
              if (e.key === "Enter" && results[active]) { e.preventDefault(); go(results[active]); }
            }}
            placeholder="Search by SKU, name, or gauge…"
            aria-label="Search products"
            className="flex-1 outline-none"
            style={{ fontSize: 13, color: "#fff", background: "transparent" }}
          />
          {q && (
            <button onClick={() => setQ("")} aria-label="Clear search" style={{ color: "rgba(255,255,255,0.45)", fontSize: 18, lineHeight: 1 }}>×</button>
          )}
        </div>

        {q.trim().length >= 2 && (
          <div className="mt-3" style={{ maxHeight: 260, overflowY: "auto" }}>
            {results.length === 0 && (
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>No products match “{q.trim()}”.</div>
            )}
            {results.map((p, i) => (
              <button
                key={p.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(p)}
                className="w-full text-left flex items-center gap-3 px-2 py-2"
                style={{
                  background: i === active ? "rgba(255,205,0,0.14)" : "transparent",
                  borderRadius: 3,
                }}
              >
                <div style={{ width: 34, height: 34, flex: "0 0 auto", background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                  {p.image && <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
                </div>
                <div className="min-w-0">
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }} className="truncate">{p.name}</div>
                  <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }} className="truncate">
                    {p.id}{p.specs?.length ? ` · ${p.specs.join(" · ")}` : ""}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const trigger =
    variant === "desktop" ? (
      <button
        onClick={() => setOpen(true)}
        aria-label="Search products"
        className="flex items-center gap-2 transition-colors"
        style={{
          height: 34,
          padding: "0 12px",
          borderRadius: 4,
          border: "1px solid rgba(14,12,0,0.22)",
          background: "rgba(255,255,255,0.35)",
          color: "rgba(14,12,0,0.7)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <SearchIcon />
        <span className="hidden xl:inline">Search</span>
      </button>
    ) : (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2"
        style={{
          height: 44,
          padding: "0 14px",
          borderRadius: 4,
          border: "1px solid rgba(255,205,0,0.25)",
          background: "rgba(255,255,255,0.06)",
          color: "rgba(255,255,255,0.6)",
          fontSize: 13,
        }}
      >
        <SearchIcon />
        <span>Search products or SKUs…</span>
      </button>
    );

  return (
    <>
      {trigger}
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4"
          style={{ background: "rgba(14,12,0,0.6)", backdropFilter: "blur(6px)", paddingTop: "12vh" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full"
            style={{
              maxWidth: 560,
              background: "#fff",
              borderRadius: 6,
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.55)",
              overflow: "hidden",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4" style={{ height: 58, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              <span style={{ color: "rgba(0,0,0,0.4)" }}><SearchIcon /></span>
              <input
                ref={inputRef}
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setActive(i => Math.min(i + 1, results.length - 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setActive(i => Math.max(i - 1, 0)); }
                  if (e.key === "Enter" && results[active]) { e.preventDefault(); go(results[active]); }
                }}
                placeholder="Search by SKU, name, or gauge…"
                aria-label="Search products"
                className="flex-1 outline-none"
                style={{ fontSize: 16, color: "var(--pd-dark)", background: "transparent" }}
              />
              <button onClick={() => setOpen(false)} aria-label="Close search" style={{ color: "rgba(0,0,0,0.35)", fontSize: 22, lineHeight: 1 }}>×</button>
            </div>

            <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
              {q.trim().length < 2 && (
                <div className="px-4 py-6" style={{ fontSize: 13, color: "var(--pd-muted)" }}>
                  Type at least two characters — try “FS-200”, “L-Cleat”, “16 GA”, or “mallet”.
                </div>
              )}
              {q.trim().length >= 2 && results.length === 0 && (
                <div className="px-4 py-6" style={{ fontSize: 13, color: "var(--pd-muted)" }}>
                  No products match “{q.trim()}”.
                </div>
              )}
              {results.map((p, i) => (
                <button
                  key={p.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(p)}
                  className="w-full text-left flex items-center gap-3 px-4 py-3"
                  style={{
                    background: i === active ? "rgba(255,205,0,0.16)" : "transparent",
                    borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ width: 40, height: 40, flex: "0 0 auto", background: "rgba(0,0,0,0.04)", borderRadius: 3, overflow: "hidden" }}>
                    {p.image && <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
                  </div>
                  <div className="min-w-0">
                    <div style={{ fontSize: 13, fontWeight: 800, color: "var(--pd-dark)" }} className="truncate">{p.name}</div>
                    <div style={{ fontSize: 11, color: "var(--pd-muted)", letterSpacing: "0.06em" }} className="truncate">
                      {p.id}{p.specs?.length ? ` · ${p.specs.join(" · ")}` : ""}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}
