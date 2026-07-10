import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  getRecipients,
  saveRecipients,
  uploadWeeklyIntelligence,
  listIntelligenceWeeks,
  getLatestIntelligence,
  sendDigestEmail,
  listDigestLog,
} from "@/lib/intelligence.functions";
import { WeeklyIntelligenceDataSchema, type Recipient, type WeeklyIntelligenceData } from "@/lib/intelligence-types";
import { YELLOW, mono, cardStyle } from "@/components/admin/ui";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <UploadPanel />
      <HistoryPanel />
      <RecipientsPanel />
    </div>
  );
}

function UploadPanel() {
  const upload = useServerFn(uploadWeeklyIntelligence);
  const qc = useQueryClient();
  const [json, setJson] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "validating" | "uploading" | "ok">("idle");

  const submit = async () => {
    setErrors([]);
    setStatus("validating");
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch (e: any) {
      setErrors([`Invalid JSON: ${e.message}`]);
      setStatus("idle");
      return;
    }
    const result = WeeklyIntelligenceDataSchema.safeParse(parsed);
    if (!result.success) {
      setErrors(
        result.error.issues.slice(0, 10).map((i) => `${i.path.join(".") || "root"} — ${i.message}`),
      );
      setStatus("idle");
      return;
    }
    setStatus("uploading");
    try {
      await upload({ data: { weekOf: result.data.weekOf, payload: result.data } });
      setStatus("ok");
      setJson("");
      qc.invalidateQueries({ queryKey: ["intel-latest"] });
      qc.invalidateQueries({ queryKey: ["intel-history"] });
      setTimeout(() => setStatus("idle"), 2000);
    } catch (e: any) {
      setErrors([e.message ?? "Upload failed"]);
      setStatus("idle");
    }
  };

  return (
    <div style={cardStyle}>
      <div style={{ ...mono, fontSize: 11, color: YELLOW, letterSpacing: "0.2em", marginBottom: 14 }}>
        UPLOAD WEEKLY INTELLIGENCE JSON
      </div>
      <p style={{ ...mono, fontSize: 11, color: "var(--pdx-text-mute)", marginTop: 0, marginBottom: 12, lineHeight: 1.6 }}>
        Paste the processed JSON output below. Validation runs locally before upload.
      </p>
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        placeholder='{ "weekOf": "2025-01-15", "processedAt": "...", ... }'
        spellCheck={false}
        style={{
          ...mono,
          width: "100%",
          minHeight: 240,
          background: "var(--pdx-panel)",
          border: "1px solid var(--pdx-border)",
          color: "var(--pdx-text)",
          padding: 14,
          fontSize: 12,
          lineHeight: 1.5,
          outline: "none",
          resize: "vertical",
        }}
      />
      {errors.length > 0 && (
        <div style={{ marginTop: 12, padding: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
          {errors.map((e, i) => (
            <div key={i} style={{ ...mono, fontSize: 11, color: "#EF4444", lineHeight: 1.6 }}>
              ✗ {e}
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={submit}
          disabled={!json || status === "uploading" || status === "validating"}
          style={{
            ...mono,
            background: YELLOW,
            color: "#0A0A08",
            border: "none",
            padding: "10px 22px",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: json ? "pointer" : "not-allowed",
            opacity: json ? 1 : 0.4,
          }}
        >
          {status === "uploading" ? "Uploading…" : status === "validating" ? "Validating…" : "Upload"}
        </button>
        {status === "ok" && (
          <span style={{ ...mono, fontSize: 11, color: "#22C55E", letterSpacing: "0.15em" }}>
            ✓ UPLOADED
          </span>
        )}
      </div>
    </div>
  );
}

function HistoryPanel() {
  const list = useServerFn(listIntelligenceWeeks);
  const { data, isLoading } = useQuery({
    queryKey: ["intel-history"],
    queryFn: () => list(),
  });

  return (
    <div style={cardStyle}>
      <div style={{ ...mono, fontSize: 11, color: YELLOW, letterSpacing: "0.2em", marginBottom: 14 }}>
        UPLOAD HISTORY — LAST 10
      </div>
      {isLoading ? (
        <div style={{ ...mono, fontSize: 11, color: "var(--pdx-text-mute)" }}>Loading…</div>
      ) : !data || data.length === 0 ? (
        <div style={{ ...mono, fontSize: 11, color: "var(--pdx-text-mute)" }}>
          No uploads yet.
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ ...mono, fontSize: 9, color: "var(--pdx-text-mute)", letterSpacing: "0.15em", textAlign: "left" }}>
              <th style={{ padding: "8px 10px" }}>Week Of</th>
              <th style={{ padding: "8px 10px" }}>Uploaded At</th>
              <th style={{ padding: "8px 10px" }}>By</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid var(--pdx-border)" }}>
                <td style={{ padding: "10px", ...mono, fontSize: 12, color: "var(--pdx-text)" }}>{r.week_of}</td>
                <td style={{ padding: "10px", ...mono, fontSize: 11, color: "var(--pdx-text-dim)" }}>
                  {new Date(r.uploaded_at).toLocaleString()}
                </td>
                <td style={{ padding: "10px", ...mono, fontSize: 11, color: "var(--pdx-text-dim)" }}>
                  {r.uploaded_by_name ?? r.uploaded_by ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <DigestHistorySection />
    </div>
  );
}

function DigestHistorySection() {
  const list = useServerFn(listDigestLog);
  const { data, isLoading } = useQuery({
    queryKey: ["digest-history"],
    queryFn: () => list(),
  });
  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ ...mono, fontSize: 11, color: YELLOW, letterSpacing: "0.2em", marginBottom: 14 }}>
        DIGEST HISTORY — LAST 10
      </div>
      {isLoading ? (
        <div style={{ ...mono, fontSize: 11, color: "var(--pdx-text-mute)" }}>Loading…</div>
      ) : !data || data.length === 0 ? (
        <div style={{ ...mono, fontSize: 11, color: "var(--pdx-text-mute)" }}>
          No digests sent yet.
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ ...mono, fontSize: 9, color: "var(--pdx-text-mute)", letterSpacing: "0.15em", textAlign: "left" }}>
              <th style={{ padding: "8px 10px" }}>Sent At</th>
              <th style={{ padding: "8px 10px" }}>Week Of</th>
              <th style={{ padding: "8px 10px" }}>Recipients</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid var(--pdx-border)" }}>
                <td style={{ padding: "10px", ...mono, fontSize: 11, color: "var(--pdx-text-dim)" }}>
                  {new Date(r.sent_at).toLocaleString()}
                </td>
                <td style={{ padding: "10px", ...mono, fontSize: 12, color: "var(--pdx-text)" }}>{r.week_of}</td>
                <td style={{ padding: "10px", ...mono, fontSize: 11, color: "var(--pdx-text-dim)" }}>
                  {r.recipient_count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function RecipientsPanel() {
  const get = useServerFn(getRecipients);
  const save = useServerFn(saveRecipients);
  const getLatest = useServerFn(getLatestIntelligence);
  const logDigest = useServerFn(sendDigestEmail);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["recipients"], queryFn: () => get() });
  const { data: latest } = useQuery({ queryKey: ["intel-latest"], queryFn: () => getLatest() });
  const [rows, setRows] = useState<Recipient[]>([]);
  const [saved, setSaved] = useState(false);
  const [digestReady, setDigestReady] = useState(false);

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  const setRow = (i: number, patch: Partial<Recipient>) =>
    setRows((r) => r.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));

  const onSave = async () => {
    await save({ data: { recipients: rows.filter((r) => r.email.trim()) } });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const onSendDigest = async () => {
    const active = rows.filter((r) => r.email.trim());
    if (active.length === 0 || !latest?.data) return;
    const d: WeeklyIntelligenceData = latest.data;
    const hot = d.leads.filter((l) => l.status === "HOT" || l.status === "WARM").slice(0, 5);
    const subject = `Pro-Drive Intelligence Digest — Week of ${d.weekOf}`;
    const body = [
      `WEEKLY INSIGHT:`,
      d.summary.weeklyInsight,
      ``,
      `TOP OPPORTUNITY:`,
      d.summary.topOpportunity,
      ``,
      `CRAIG'S CALL SCRIPT:`,
      d.summary.craigCallScript,
      ``,
      `HOT LEADS (TOP 5):`,
      ...hot.map(
        (l) => `- ${l.company} [${l.urgency}] — top page: ${l.topPage} — ${l.aiRecommendation}`,
      ),
      ``,
      `EMAIL STATS:`,
      `- Open rate: ${(d.stats.email.openRate * 100).toFixed(1)}%`,
      `- Click rate: ${(d.stats.email.clickRate * 100).toFixed(1)}%`,
      `- Top clicked link: ${d.stats.email.topClickedLink}`,
      ``,
      `WEBSITE:`,
      `- Total sessions: ${d.stats.website.totalSessions}`,
      `- Unique companies: ${d.stats.website.uniqueCompanies}`,
      `- Top page: ${d.stats.website.topPage}`,
      ``,
      `INSTAGRAM:`,
      `- Sessions: ${d.stats.meta.instagramSessions}`,
      `- Top driving post: ${d.stats.meta.topDrivingPost}`,
    ].join("\n");
    const to = active.map((r) => r.email.trim()).join(",");
    const href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    try {
      await logDigest({ data: { weekOf: d.weekOf, recipientCount: active.length } });
      qc.invalidateQueries({ queryKey: ["digest-history"] });
    } catch {
      /* logging failure shouldn't block the mailto */
    }
    setDigestReady(true);
    setTimeout(() => setDigestReady(false), 2000);
  };

  return (
    <div style={cardStyle}>
      <div style={{ ...mono, fontSize: 11, color: YELLOW, letterSpacing: "0.2em", marginBottom: 14 }}>
        EMAIL DIGEST RECIPIENTS
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 8 }}>
            <input
              value={r.name}
              onChange={(e) => setRow(i, { name: e.target.value })}
              placeholder="name"
              style={input}
            />
            <input
              value={r.email}
              onChange={(e) => setRow(i, { email: e.target.value })}
              placeholder="email"
              style={{ ...input, flex: 2 }}
            />
            <button
              onClick={() => setRows((rs) => rs.filter((_, idx) => idx !== i))}
              style={{
                ...mono,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--pdx-text-mute)",
                padding: "0 14px",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "center" }}>
        <button
          onClick={() => setRows((r) => [...r, { name: "", email: "" }])}
          style={{
            ...mono,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "var(--pdx-text-dim)",
            padding: "8px 14px",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          + Add
        </button>
        <button
          onClick={onSave}
          style={{
            ...mono,
            background: YELLOW,
            color: "#0A0A08",
            border: "none",
            padding: "8px 18px",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Save
        </button>
        {saved && (
          <span style={{ ...mono, fontSize: 10, color: "#22C55E", letterSpacing: "0.15em" }}>
            ✓ SAVED
          </span>
        )}
      </div>
      <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--pdx-border)" }}>
        <p style={{ ...mono, fontSize: 10, color: "var(--pdx-text-mute)", letterSpacing: "0.05em", margin: "0 0 10px", lineHeight: 1.6 }}>
          Opens your default email client with the digest pre-filled for all recipients.
        </p>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={onSendDigest}
            disabled={!latest?.data || rows.filter((r) => r.email.trim()).length === 0}
            style={{
              ...mono,
              background: YELLOW,
              color: "#0A0A08",
              border: "none",
              padding: "10px 22px",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: latest?.data ? "pointer" : "not-allowed",
              opacity: latest?.data && rows.filter((r) => r.email.trim()).length > 0 ? 1 : 0.4,
            }}
          >
            Send Digest
          </button>
          {digestReady && (
            <span style={{ ...mono, fontSize: 10, color: "#22C55E", letterSpacing: "0.15em" }}>
              ✓ DIGEST READY
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const input = {
  ...mono,
  flex: 1,
  background: "var(--pdx-panel)",
  border: "1px solid var(--pdx-border)",
  color: "var(--pdx-text)",
  padding: "8px 12px",
  fontSize: 12,
  outline: "none",
};
