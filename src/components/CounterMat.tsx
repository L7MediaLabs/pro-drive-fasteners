import { useState } from "react";
import { ImageLightbox } from "./ImageLightbox";
import enAsset from "../assets/counter-mat-english.jpg.asset.json";
import esAsset from "../assets/counter-mat-spanish.jpg.asset.json";
import ptAsset from "../assets/counter-mat-portuguese.jpg.asset.json";

/**
 * COUNTER POP E-Z sales aid — Pro-Drive's printed point-of-sale counter mat.
 *
 * The artwork is a dense reference chart (every finish/brad gauge and collation
 * matched to the tool brand it fits), so it renders full width inside the
 * content container and opens in the shared ImageLightbox at full resolution.
 *
 * Languages match the printed run. English is index 0 and the default; the
 * selector styling mirrors the video language selector in VideoCard so the two
 * read as one system.
 */
type MatLang = {
  code: string;
  label: string;
  englishName: string;
  src: string;
  alt: string;
};

const MATS: MatLang[] = [
  {
    code: "en",
    label: "English",
    englishName: "English",
    src: enAsset.url,
    alt: "English-language Pro-Drive counter mat chart showing 15 GA 25° FN and 34° DA finish nails, 16 GA straight and 20° angle finish nails, 18 GA brads and 23 GA micro pins, each matched to the tool brand it fits.",
  },
  {
    code: "es",
    label: "Español",
    englishName: "Spanish",
    src: esAsset.url,
    alt: "Spanish-language Pro-Drive counter mat chart (Clavos de Acabado) showing 15 GA 25° FN and 34° DA finish nails, 16 GA straight and 20° angle finish nails, 18 GA brads and 23 GA micro pins, each matched to the tool brand it fits.",
  },
  {
    code: "pt",
    label: "Português",
    englishName: "Portuguese",
    src: ptAsset.url,
    alt: "Portuguese-language Pro-Drive counter mat chart (Pregos de Acabamento) showing 15 GA 25° FN and 34° DA finish nails, 16 GA straight and 20° angle finish nails, 18 GA brads and 23 GA micro pins, each matched to the tool brand it fits.",
  },
];

export function CounterMatSection() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const mat = MATS[index];

  return (
    <section className="px-[6%] py-16" style={{ background: "var(--pd-light-bg)" }}>
      <div>
        <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Sales Aid</div>
        <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 36 }}>COUNTER POP E-Z sales aid</h2>
        <p className="mt-3 max-w-2xl text-[14px]" style={{ color: "var(--pd-muted)" }}>
          Free counter display showing every finish and brad nail we make, matched to the tool it
          fits. Available in English, Spanish and Portuguese — the same counter mat noted in the
          collation details on each nail family above.
        </p>

        <div
          role="group"
          aria-label="Choose counter mat language"
          className="mt-5 flex flex-wrap gap-2"
        >
          {MATS.map((m, i) => {
            const selected = i === index;
            return (
              <button
                key={m.code}
                type="button"
                lang={m.code}
                aria-pressed={selected}
                onClick={() => setIndex(i)}
                className="px-3 py-1.5 text-[12px]"
                style={{
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  color: selected ? "var(--pd-dark)" : "var(--pd-muted)",
                  background: selected ? "var(--pd-yellow)" : "transparent",
                  border: selected ? "1px solid var(--pd-yellow)" : "1px solid rgba(0,0,0,0.15)",
                }}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 bg-white p-3 sm:p-5" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Enlarge the ${mat.englishName} counter mat`}
            className="block w-full"
            style={{ cursor: "zoom-in", background: "transparent", border: "none", padding: 0 }}
          >
            <img
              key={mat.src}
              src={mat.src}
              alt={mat.alt}
              width={3000}
              height={2400}
              loading="lazy"
              decoding="async"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </button>
          <div
            className="mt-3 pt-3 text-xs"
            style={{
              color: "var(--pd-muted)",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {mat.englishName} edition · Click the mat to enlarge for full gauge and tool detail
          </div>
        </div>
      </div>

      {open && (
        <ImageLightbox
          src={mat.src}
          alt={mat.alt}
          sku="COUNTER POP E-Z"
          name={`Finish & brad nail counter mat — ${mat.englishName}`}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}
