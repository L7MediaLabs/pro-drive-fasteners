import { useCallback, useEffect, useRef } from "react";

/**
 * Full-resolution product image overlay.
 *
 * Product cards render box art at ~213px, which makes printed item numbers and
 * QTY/CTE counts unreadable. This overlay serves the original asset at full
 * resolution so part numbers can be cross-checked against the SKU.
 *
 * Accessibility: rendered as a modal dialog, focus is trapped while open and
 * restored to the trigger on close. Esc or a click on the backdrop closes it.
 */
export function ImageLightbox({
  src,
  alt,
  sku,
  name,
  onClose,
}: {
  src: string;
  alt: string;
  sku: string;
  name: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  const focusables = useCallback(() => {
    const root = panelRef.current;
    if (!root) return [] as HTMLElement[];
    return Array.from(
      root.querySelectorAll<HTMLElement>('button, [href], img[tabindex="0"], [tabindex]:not([tabindex="-1"])'),
    ).filter((el) => el.offsetParent !== null || el === closeRef.current);
  }, []);

  useEffect(() => {
    restoreTo.current = (document.activeElement as HTMLElement) ?? null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prevOverflow;
      restoreTo.current?.focus?.();
    };
  }, [focusables, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${sku} — ${name}`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(14,12,0,0.88)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative flex flex-col w-full"
        style={{ maxWidth: 1100, maxHeight: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-3">
          <div>
            <div
              className="pd-label"
              style={{ color: "var(--pd-yellow)", fontSize: 12, letterSpacing: "0.16em", fontWeight: 800 }}
            >
              {sku}
            </div>
            <div className="mt-1 font-bold" style={{ color: "white", fontSize: 15 }}>
              {name}
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close enlarged image"
            className="shrink-0 px-3 py-1.5"
            style={{
              background: "var(--pd-yellow)",
              color: "var(--pd-dark)",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.12em",
            }}
          >
            CLOSE ✕
          </button>
        </div>
        <div
          className="flex-1 flex items-center justify-center overflow-auto"
          style={{ background: "#fafaf8", minHeight: 0, touchAction: "pan-x pan-y pinch-zoom" }}
        >
          <img
            src={src}
            alt={alt}
            style={{ maxWidth: "100%", maxHeight: "78vh", width: "auto", height: "auto", objectFit: "contain" }}
          />
        </div>
        <div className="pt-2 text-center" style={{ color: "rgba(255,255,255,0.55)", fontSize: 11 }}>
          Click outside or press Esc to close
        </div>
      </div>
    </div>
  );
}
