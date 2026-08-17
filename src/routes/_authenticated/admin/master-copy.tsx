import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { buildMasterCopy } from "@/lib/master-copy";

export const Route = createFileRoute("/_authenticated/admin/master-copy")({
  head: () => ({
    meta: [
      { title: "Master Copy Export | Pro-Drive Fasteners®" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MasterCopyPage,
});

const mono = "'IBM Plex Mono', monospace";

function MasterCopyPage() {
  const { pages, document: doc, wordCount } = useMemo(() => buildMasterCopy(), []);
  const [copied, setCopied] = useState(false);

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(doc);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function download() {
    const blob = new Blob([doc], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = "pro-drive-master-copy-en.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const blockCount = pages.reduce((n, p) => n + p.blocks.length, 0);

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
      <div
        style={{
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#FFCD00",
          marginBottom: 8,
        }}
      >
        Internal Export
      </div>
      <h1 style={{ fontSize: 26, margin: 0, color: "var(--pdx-text)" }}>
        Master Website Copy — English
      </h1>
      <p
        style={{
          fontFamily: mono,
          fontSize: 12,
          lineHeight: 1.8,
          color: "var(--pdx-text-dim, rgba(255,255,255,0.55))",
          marginTop: 10,
        }}
      >
        {wordCount.toLocaleString()} words · {pages.length} pages · {blockCount} sections
        <br />
        Compiled directly from live route and component sources — stays in sync automatically.
      </p>

      <div style={{ display: "flex", gap: 10, margin: "18px 0 26px", flexWrap: "wrap" }}>
        <button onClick={copyAll} style={btn(true)}>
          {copied ? "Copied ✓" : "Copy all"}
        </button>
        <button onClick={download} style={btn(false)}>
          Download .txt
        </button>
      </div>

      <div
        style={{
          border: "1px solid rgba(255,205,0,0.14)",
          background: "rgba(0,0,0,0.25)",
          padding: 18,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#FFCD00",
            marginBottom: 12,
          }}
        >
          Coverage
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, fontFamily: mono, fontSize: 12, lineHeight: 1.9 }}>
          {pages.map((p) => (
            <li key={p.route} style={{ color: "var(--pdx-text, #fff)" }}>
              {p.name} <span style={{ opacity: 0.5 }}>[{p.route}]</span>{" "}
              <span style={{ opacity: 0.5 }}>— {p.blocks.length} sections</span>
            </li>
          ))}
        </ul>
      </div>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          fontFamily: mono,
          fontSize: 11.5,
          lineHeight: 1.75,
          color: "var(--pdx-text, rgba(255,255,255,0.85))",
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,205,0,0.1)",
          padding: 18,
          maxHeight: "70vh",
          overflow: "auto",
          margin: 0,
        }}
      >
        {doc}
      </pre>
    </div>
  );
}

function btn(primary: boolean): React.CSSProperties {
  return {
    fontFamily: mono,
    fontSize: 11,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    padding: "11px 20px",
    cursor: "pointer",
    background: primary ? "#FFCD00" : "transparent",
    color: primary ? "#161509" : "#FFCD00",
    border: primary ? "1px solid #FFCD00" : "1px solid rgba(255,205,0,0.4)",
  };
}
