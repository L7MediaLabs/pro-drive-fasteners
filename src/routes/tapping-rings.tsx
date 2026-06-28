import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "../data/images";

export const Route = createFileRoute("/tapping-rings")({
  head: () => ({
    meta: [
      { title: "Tapping Rings | Pro-Drive Fasteners®" },
      { name: "description", content: "Three rings, every flooring type. Red, Orange, and Yellow tapping rings — 2.1 lbs, non-marring, guaranteed." },
      { property: "og:title", content: "Tapping Rings — Pro-Drive Fasteners®" },
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
  return (
    <div>
      <section className="px-[6%] pt-20 pb-12 relative overflow-hidden" style={{ background: "var(--pd-dark)" }}>
        <img
          src={images.tappingRings.orange2}
          alt=""
          aria-hidden
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center", opacity: 0.22,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, rgba(25,20,0,0.85), rgba(25,20,0,0.55))",
          }}
        />
        <div className="relative z-10">
          <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Pro-Drive Exclusive</div>
          <h1 className="pd-display text-white mt-3" style={{ fontSize: "clamp(40px, 8vw, 72px)" }}>
            Three Rings.<br />Every Flooring Type.
          </h1>
          <div className="mt-4" style={{ color: "var(--pd-yellow)", fontSize: 18, fontWeight: 600 }}>
            2.1 lbs. Non-marring. Guaranteed.
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {rings.map(r => (
              <article
                key={r.id}
                className="flex flex-col"
                style={{ background: r.bg, border: `1px solid ${r.border}`, borderTop: `3px solid ${r.color}` }}
              >
                <div style={{ background: "#fff", padding: 24, display: "flex", justifyContent: "center", alignItems: "center", height: 260 }}>
                  <img
                    src={r.image}
                    alt={`Pro-Drive ${r.name} ${r.id}`}
                    loading="lazy"
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                  />
                </div>
                <div className="p-6">
                  <span style={{ display: "inline-block", width: 32, height: 32, borderRadius: "50%", background: r.color }} />
                  <div className="pd-label mt-4" style={{ color: "rgba(255,205,0,0.5)" }}>{r.id}</div>
                  <h3 className="text-white mt-1" style={{ fontWeight: 800, fontSize: 20 }}>{r.name.toUpperCase()}</h3>
                  <div className="mt-3 text-white/80 text-sm">
                    <strong style={{ color: "var(--pd-yellow)" }}>Best for: </strong>{r.best}
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-white/65">
                    {r.bullets.map(b => <li key={b}>— {b}</li>)}
                  </ul>
                  <Link to="/contact" className="pd-btn-primary mt-6" style={{ padding: "10px", width: "100%", fontSize: 11 }}>Get Pricing →</Link>
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
        </div>
      </section>
    </div>
  );
}
