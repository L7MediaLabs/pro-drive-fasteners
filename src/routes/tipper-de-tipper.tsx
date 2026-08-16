import { createFileRoute, Link } from "@tanstack/react-router";
import { trackEvent } from "@/lib/analytics";
import { images } from "../data/images";
import { CinematicHero, RelatedProducts, PageDisclaimers } from "../components/editorial";
import { pickRelated } from "../data/products";

export const Route = createFileRoute("/tipper-de-tipper")({
  head: () => ({
    meta: [
      { title: "Tipper-De-Tipper | Pro-Drive Fasteners" },
      { name: "description", content: "The safest and fastest method to replace mallet caps. 5-station design. Fits all major brands. Under 30 seconds." },
      { property: "og:title", content: "Tipper-De-Tipper Series 5" },
      { property: "og:description", content: "Replace mallet caps in under 30 seconds. 5-station design. Fits all major brands." },
      { property: "og:image", content: images.tipper.product },
      { property: "twitter:image", content: images.tipper.product },
    ],
  }),
  component: TDT,
});

const features = [
  { h: "Eliminates Risk of Injury", b: "No more forcing caps off with screwdrivers or other tools." },
  { h: "5-Station Design", b: "Fits all major brands of Round or Angle rubber caps." },
  { h: "Replaces & Removes", b: "Caps swapped in under 30 seconds." },
  { h: "Robust Construction", b: "Virtually no maintenance required." },
];

const tippingSteps = [
  { image: images.tipper.tipping[0], caption: "Place cap onto the tipping station." },
  { image: images.tipper.tipping[1], caption: "Align mallet head and press down." },
  { image: images.tipper.tipping[2], caption: "Cap seats firmly — ready to use." },
];

const deTippingSteps = [
  { image: images.tipper.deTipping[0], caption: "Seat the capped mallet head into the de-tipping arm." },
  { image: images.tipper.deTipping[1], caption: "Lock the head under the arm and hold the handle." },
  { image: images.tipper.deTipping[2], caption: "Lever the handle down — the worn cap pops free." },
];


const videos = [
  {
    id: "1FUMcvs0KySqo0STEFD4a3hxujEZ1-64f",
    label: "Commercial — Horizon Cut",
    title: "Tipper-De-Tipper Series 5 — Commercial",
    desc: "See the Series 5 in action across professional flooring environments.",
  },
  {
    id: "14NTGUSJRl2mKSUi1GzEV3YyVKGGFzfBv",
    label: "Commercial",
    title: "Tipper-De-Tipper Series 5 — Full Commercial",
    desc: "The complete commercial spot for the Series 5.",
  },
  {
    id: "18ZAbX4q2OA2QsEN6D_grDtrpMDy786M5",
    label: "Operation Guide",
    title: "How to Use the Tipper-De-Tipper",
    desc: "Step-by-step operation guide — tipping and de-tipping demonstrated.",
  },
];

function VideoCard({ id, label, title, desc }: { id: string; label: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col" style={{ borderTop: "3px solid var(--pd-yellow)", background: "rgba(255,255,255,0.04)" }}>
      <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
        <iframe
          src={`https://drive.google.com/file/d/${id}/preview`}
          title={title}
          allow="autoplay"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
      <div className="p-4">
        <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>{label}</div>
        <div className="mt-1 text-white" style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>
        <p className="mt-1 text-white/60" style={{ fontSize: 13 }}>{desc}</p>
      </div>
    </div>
  );
}

/** Landscape 16:9 YouTube embed on the privacy-enhanced nocookie domain. */
function YouTubeVideoCard({ id, label, title, desc }: { id: string; label: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col" style={{ borderTop: "3px solid var(--pd-yellow)", background: "rgba(255,255,255,0.04)" }}>
      <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        />
      </div>
      <div className="p-4">
        <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>{label}</div>
        <div className="mt-1 text-white" style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>
        <p className="mt-1 text-white/60" style={{ fontSize: 13 }}>{desc}</p>
      </div>
    </div>
  );
}


function StepCard({ index, image, caption, total }: { index: number; image: string; caption: string; total: number }) {
  return (
    <div className="bg-white flex flex-col" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
      <div
        style={{
          background: "#F5F4F0",
          aspectRatio: "437 / 179",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={`Pro-Drive Tipper-De-Tipper step ${index} of ${total}: ${caption}`}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <div className="p-4">
        <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Step {index} of {total}</div>
        <div className="mt-2" style={{ fontWeight: 700, fontSize: 14, color: "var(--pd-dark)" }}>{caption}</div>
      </div>
    </div>
  );
}

function TDT() {
  const related = pickRelated(["TDT-S5"], 6);
  return (
    <div>
      <CinematicHero
        kicker="Patent #20220388265A1"
        title={<>Tipper-De-Tipper<br />Series 5</>}
        description="The safest and fastest method to replace mallet caps. 5-station design fits all major brands of round or angle rubber caps. Under 30 seconds. Virtually no maintenance."
        bgImage={images.tipper.extra}
        badges={[
          { label: "MADE IN USA" },
          { label: "5-STATION DESIGN" },
          { label: "UNDER 30 SECONDS" },
        ]}
        rightImage={images.tipper.product}
        rightImageAlt="Pro-Drive Tipper-De-Tipper Series 5"
      />

      <section className="px-[6%] py-16" style={{ background: "var(--pd-dark)" }}>
        <div className="mb-8 p-5" style={{ border: "1px solid var(--pd-yellow)", color: "var(--pd-yellow)" }}>
          <strong>Series 5 available now.</strong> Contact us for current pricing and availability.
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map(f => (
            <div key={f.h} className="p-5" style={{ background: "rgba(255,205,0,0.06)", borderLeft: "3px solid var(--pd-yellow)" }}>
              <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>{f.h}</div>
              <p className="text-white/75 mt-2 text-sm">{f.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6" style={{ background: "rgba(255,205,0,0.06)", borderLeft: "3px solid var(--pd-yellow)" }}>
          <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>The Complete Story</div>
          <p className="mt-3 text-white/75" style={{ fontSize: 14, lineHeight: 1.75 }}>
            The safest and fastest method to replace mallet caps. Eliminates risk of injury.
            Replaces and removes caps in under 30 seconds. Robust construction with virtually no
            maintenance. 5-station design fits all major brands of round or angle rubber caps.
            <br />
            <span style={{ color: "var(--pd-yellow)", fontWeight: 700 }}>Patent #20220388265A1 · Made in the USA.</span>
          </p>
        </div>



        <div className="mt-14">
          <div className="pd-label mb-4" style={{ color: "var(--pd-yellow)" }}>Series 5 — In Action</div>
          <div className="grid md:grid-cols-3 gap-4">
            <YouTubeVideoCard
              id="QsrVfPwt4A4"
              label="Commercial — 1:20 Cut"
              title="NEW Pro-Drive Fasteners Series 5 Tipper-De-Tipper"
              desc="The client's public commercial cut — 1 minute 20 seconds, landscape."
            />
            {videos.map(v => (
              <VideoCard key={v.id} {...v} />
            ))}
          </div>
        </div>


        <div className="mt-12">
          <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Installing a Cap — Tipping</div>
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            {tippingSteps.map((s, i) => (
              <StepCard key={i} index={i + 1} total={tippingSteps.length} image={s.image} caption={s.caption} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Removing a Cap — De-Tipping</div>
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            {deTippingSteps.map((s, i) => (
              <StepCard key={i} index={i + 1} total={deTippingSteps.length} image={s.image} caption={s.caption} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/contact" onClick={() => trackEvent("cta_click", { ctaLabel: "Request Distributor Pricing" })} className="pd-btn-primary">Request Distributor Pricing</Link>
        </div>
      </section>

      <RelatedProducts products={related} />
      <PageDisclaimers trademarks />
    </div>
  );
}
