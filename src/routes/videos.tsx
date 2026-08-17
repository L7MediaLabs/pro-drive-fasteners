import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";
import { VideoCard } from "../components/VideoCard";
import { VIDEOS } from "../data/videos";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos | Pro-Drive Fasteners®" },
      { name: "description", content: "Pro-Drive Fasteners® in action. Installation demos, product features, and field techniques." },
      { property: "og:title", content: "Videos | Pro-Drive Fasteners®" },
      { property: "og:description", content: "Installation demos, product features, and field techniques from Pro-Drive Fasteners®." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Videos,
});

function Videos() {
  return (
    <div>
      <PageHeader title="Videos" description="Pro-Drive Fasteners® in action. Installation demos, product features, and field techniques." />
      <section className="px-[6%] py-12" style={{ background: "var(--pd-light-bg)" }}>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {VIDEOS.filter(v => !v.productPageOnly).map(v => (
            <VideoCard key={v.title} video={v} />
          ))}
        </div>

        <div className="bg-[color:var(--pd-light-bg)] mt-10 px-8 py-8" style={{ background: "white", borderLeft: "3px solid var(--pd-yellow)" }}>
          <p style={{ color: "var(--pd-dark)", fontSize: 15 }}>
            More product videos coming soon. Subscribe to our YouTube channel or follow us on Instagram for the latest demonstrations.
          </p>
          <a href="https://www.instagram.com/pro_drive_fasteners/" target="_blank" rel="noreferrer" className="pd-btn-dark mt-5">
            Follow @pro_drive_fasteners
          </a>
        </div>
      </section>
    </div>
  );
}
