import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos | Pro-Drive Fasteners®" },
      { name: "description", content: "Pro-Drive in action. Installation demos, product features, and field techniques." },
    ],
  }),
  component: Videos,
});

const videos = [
  {
    title: "Glue-Down Tapping Ring Installation Demo",
    src: "https://player.vimeo.com/video/1201923351?color=FFCD00&title=0&byline=0&portrait=0",
    tag: "Tapping Rings",
    desc: "See the Pro-Drive Tapping Ring in action on glue-down vinyl and laminate flooring. Demonstrates proper technique and force distribution.",
  },
];

function Videos() {
  return (
    <div>
      <PageHeader title="Videos" description="Pro-Drive in action. Installation demos, product features, and field techniques." />
      <section className="px-[6%] py-12" style={{ background: "var(--pd-light-bg)" }}>
        <div className="grid lg:grid-cols-2 gap-8">
          {videos.map(v => (
            <article key={v.title} className="bg-white p-5" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
              <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <iframe
                  src={v.src}
                  title={v.title}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="pd-label mt-4" style={{ color: "var(--pd-gold)" }}>{v.tag}</div>
              <h3 className="mt-1" style={{ fontWeight: 700, fontSize: 16, color: "var(--pd-dark)" }}>{v.title}</h3>
              <p className="mt-2 text-[13px]" style={{ color: "var(--pd-muted)" }}>{v.desc}</p>
            </article>
          ))}
        </div>

        <div className="bg-[color:var(--pd-light-bg)] mt-10 px-8 py-8" style={{ background: "white", borderLeft: "3px solid var(--pd-yellow)" }}>
          <p style={{ color: "var(--pd-dark)", fontSize: 15 }}>
            More product videos coming soon. Subscribe to our YouTube channel or follow us on Instagram for the latest demonstrations.
          </p>
          <a href="https://instagram.com/prodrivestore" target="_blank" rel="noreferrer" className="pd-btn-dark mt-5">
            Follow on Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
