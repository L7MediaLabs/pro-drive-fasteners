import { useEffect, useState } from "react";

export function LangToast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    const h = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      setTimeout(() => setMsg(null), 3000);
    };
    window.addEventListener("pd-toast", h);
    return () => window.removeEventListener("pd-toast", h);
  }, []);
  if (!msg) return null;
  return (
    <div
      className="fixed top-16 left-0 right-0 z-[70] px-[6%] py-3 text-sm font-semibold"
      style={{ background: "var(--pd-yellow)", color: "var(--pd-dark)", animation: "slideDown 0.25s ease" }}
    >
      {msg}
    </div>
  );
}
