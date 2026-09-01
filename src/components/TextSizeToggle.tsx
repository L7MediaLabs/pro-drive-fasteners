import { useEffect, useState } from "react";

export type TextScale = "base" | "lg" | "xl";

const KEY = "pd-text-scale";
const ORDER: TextScale[] = ["base", "lg", "xl"];
const LABEL: Record<TextScale, string> = {
  base: "A",
  lg: "A+",
  xl: "A++",
};
const NEXT_LABEL: Record<TextScale, string> = {
  base: "Turn on high visibility mode (larger text)",
  lg: "Increase text size further",
  xl: "Return to standard text size",
};

function apply(scale: TextScale) {
  document.documentElement.setAttribute("data-pd-text", scale);
  try {
    localStorage.setItem(KEY, scale);
  } catch {
    /* storage unavailable */
  }
}

export function TextSizeToggle() {
  const [scale, setScale] = useState<TextScale>("base");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      /* storage unavailable */
    }
    const initial = (ORDER as string[]).includes(stored ?? "") ? (stored as TextScale) : "base";
    setScale(initial);
    apply(initial);
  }, []);

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(scale) + 1) % ORDER.length];
    setScale(next);
    apply(next);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={NEXT_LABEL[scale]}
      title={NEXT_LABEL[scale]}
      className="pd-text-toggle"
    >
      <span aria-hidden="true">{LABEL[scale]}</span>
      <span className="pd-text-toggle-word">TEXT SIZE</span>
    </button>
  );
}
