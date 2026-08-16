import { createFileRoute, Link } from "@tanstack/react-router";
import { trackEvent } from "@/lib/analytics";
import { images } from "../data/images";
import { TechReference, RelatedProducts, PageDisclaimers } from "../components/editorial";
import { pickRelated } from "../data/products";

export const Route = createFileRoute("/tapping-rings")({
  head: () => ({
    meta: [
      { title: "Tapping Rings | Pro-Drive Fasteners" },
      { name: "description", content: "Three rings, every flooring type. Red, Orange, and Yellow tapping rings — 2.1 lbs, non-marring, guaranteed." },
      { property: "og:title", content: "Tapping Rings — Pro-Drive Fasteners" },
      { property: "og:description", content: "Red, Orange, and Yellow tapping rings engineered for every flooring application." },
      { property: "og:image", content: images.tappingRings.lifestyle },
      { property: "twitter:image", content: images.tappingRings.lifestyle },
    ],
  }),
  component: TappingRings,
});

const rings = [
  {
    id: "V-6RING-R",
    name: "Red Tapping Ring",
    color: "#C83228",
    bg: "rgba(180,30,30,0.15)",
    border: "rgba(200,50,50,0.25)",
    image: images.tappingRings.red,
    scale: 1,
    best: "Parquet · Glue-Down Vinyl · Laminate",
    bullets: ["Works great for most types of flooring", "Made from highly durable urethane"],
  },
  {
    id: "V-6RING-O",
    name: "Orange Tapping Ring",
    color: "#E07020",
    bg: "rgba(180,90,20,0.15)",
    border: "rgba(200,100,30,0.25)",
    image: images.tappingRings.orange1,
    scale: 1.35,
    best: "Most flooring types",
    bullets: ["Softened density increases surface grip", "Exceptional control and positioning", "Guaranteed non-marring"],
  },
  {
    id: "V-6RING-Y",
    name: "Yellow Tapping Ring",
    color: "#FFCD00",
    bg: "rgba(200,160,0,0.15)",
    border: "rgba(220,180,0,0.25)",
    image: images.tappingRings.logo,
    scale: 1,
    best: "Wide plank · Precision applications",
    bullets: ["Compact, ergonomic, lightweight", "Unrivaled precision and control", "Goes where traditional mallets cannot"],
  },
];

function TappingRings() {
  const related = pickRelated(["V-6RING-R","V-6RING-O","V-6RING-Y"], 6);
  return (
    <div>
      <section className="px-[6%] pt-20 pb-12 relative overflow-hidden" style={{ background: "var(--pd-cream)" }}>
        <img
          src={images.tappingRings.orange2}
          alt=""
          aria-hidden
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center", opacity: 0.2,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, rgba(245,241,232,0.92), rgba(245,241,232,0.58))",
          }}
        />
        <div className="relative z-10">
          <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Pro-Drive Exclusive</div>
          <h1 className="pd-display mt-3" style={{ color: "var(--pd-dark)", fontSize: "clamp(40px, 8vw, 72px)" }}>
            Three Rings.<br />Every Flooring Type.
          </h1>
          <div className="mt-4" style={{ color: "var(--pd-gold)", fontSize: 18, fontWeight: 700 }}>
            2.1 lbs. Non-marring. Guaranteed.
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {rings.map(r => (
              <article
                key={r.id}
                className="flex flex-col"
                style={{ background: r.bg, border: `1px solid ${r.border}`, borderTop: `3px solid ${r.color}` }}
              >
                <div style={{ background: "#fff", padding: 24, display: "flex", justifyContent: "center", alignItems: "center", height: 260, overflow: "hidden" }}>
                  <img
                    src={r.image}
                    alt={`Pro-Drive ${r.name} ${r.id}`}
                    loading="lazy"
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", transform: `scale(${r.scale})` }}
                  />
                </div>
                <div className="p-6">
                  <span style={{ display: "inline-block", width: 32, height: 32, borderRadius: "50%", background: r.color }} />
                  <div className="pd-label mt-4" style={{ color: "var(--pd-muted)" }}>{r.id}</div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <h3 style={{ fontWeight: 800, fontSize: 20, color: "var(--pd-dark)" }}>{r.name.toUpperCase()}</h3>
                    {r.id === "V-6RING-O" && (
                      <span
                        style={{
                          background: "var(--pd-yellow)",
                          color: "var(--pd-dark)",
                          fontSize: 9.5,
                          fontWeight: 800,
                          letterSpacing: "0.14em",
                          padding: "3px 7px",
                          textTransform: "uppercase",
                        }}
                      >
                        Patent Pending
                      </span>
                    )}
                  </div>
                  <div className="mt-3 text-sm" style={{ color: "var(--pd-dark)" }}>
                    <strong style={{ color: "var(--pd-gold)" }}>Best for: </strong>{r.best}
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm" style={{ color: "var(--pd-muted)" }}>
                    {r.bullets.map(b => <li key={b}>— {b}</li>)}
                  </ul>
                  <Link to="/contact" onClick={() => trackEvent("cta_click", { ctaLabel: "Request Distributor Pricing" })} className="pd-btn-primary mt-6" style={{ padding: "10px", width: "100%", fontSize: 11 }}>Request Distributor Pricing →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[6%] py-16" style={{ background: "var(--pd-darker)" }}>
        <div className="max-w-5xl mx-auto">
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src="https://player.vimeo.com/video/1201923351?color=FFCD00&title=0&byline=0&portrait=0"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Glue-Down Tapping Ring Demo"
            />
          </div>
          <div className="pd-label mt-4 text-center" style={{ color: "rgba(255,205,0,0.5)" }}>Glue-Down Tapping Ring Installation Demo</div>
          <p className="text-center mx-auto mt-5 max-w-2xl" style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300, fontSize: 15, lineHeight: 1.8 }}>
            See the tapping ring in action on glue-down vinyl and laminate flooring. Watch how the urethane face distributes force without marring the surface.
          </p>
          <div className="mt-10 p-6" style={{ background: "rgba(255,205,0,0.06)", borderLeft: "3px solid var(--pd-yellow)" }}>
            <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Made in the USA</div>
            <p className="mt-2 text-white/75" style={{ fontSize: 14, lineHeight: 1.7 }}>
              100% Made in the USA. Only 2.1 lbs. Guaranteed non-marring — eliminates scratches and dents.
              Three rings engineered for every flooring application, from parquet and glue-down vinyl to
              wide plank installations that demand precision.
            </p>
          </div>
        </div>
      </section>

      <TechReference
        kicker="Reference"
        title="Application Matrix"
        intro="Match the right ring to the flooring type. ★★★ = ideal · ★★ = good · ★ = acceptable."
      >
        <div className="bg-white p-6 overflow-x-auto" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th className="pd-label text-left py-3" style={{ color: "var(--pd-muted)", fontSize: 10 }}>Ring</th>
                {["Parquet","Glue-Down Vinyl","Laminate","Engineered","Wide Plank"].map(h => (
                  <th key={h} className="pd-label text-center py-3 px-3" style={{ color: "var(--pd-muted)", fontSize: 10 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                // `color` is the physical ring colour (used for the swatch dot).
                // `ink` is the accessible text colour for the star ratings on cream.
                { color: "#C83228", ink: "#B02A20", name: "Red",    scores: [2,2,2,2,2] },
                { color: "#E07020", ink: "#8A4208", name: "Orange", scores: [3,3,3,3,3] },
                { color: "#FFCD00", ink: "var(--pd-amber-ink)", name: "Yellow", scores: [2,2,2,2,2] },
              ].map(r => (
                <tr key={r.name} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-2">
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: r.color, display: "inline-block", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)" }} />
                      <strong style={{ color: "var(--pd-dark)" }}>{r.name}</strong>
                    </span>
                  </td>
                  {r.scores.map((s, i) => (
                    <td key={i} className="text-center py-3 px-3" style={{ color: r.ink, fontSize: 18, letterSpacing: 2 }}>
                      {"★".repeat(s)}<span style={{ color: "#c9c7bf" }}>{"★".repeat(3 - s)}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TechReference>

      <RelatedProducts products={related} />
      <PageDisclaimers />
    </div>
  );
}

