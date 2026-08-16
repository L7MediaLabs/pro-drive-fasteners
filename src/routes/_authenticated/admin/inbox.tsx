import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { listContactSubmissions } from "@/lib/submissions.functions";
import { YELLOW, mono, cardStyle } from "@/components/admin/ui";

export const Route = createFileRoute("/_authenticated/admin/inbox")({
  component: InboxPage,
});

const SEEN_KEY = "pd-inbox-last-seen";

function fmt(ts: string) {
  const d = new Date(ts);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function InboxPage() {
  const fetchSubs = useServerFn(listContactSubmissions);
  const q = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: () => fetchSubs(),
  });

  const [lastSeen, setLastSeen] = useState<number | null>(null);

  useEffect(() => {
    const v = localStorage.getItem(SEEN_KEY);
    setLastSeen(v ? Number(v) : 0);
  }, []);

  const rows = q.data?.submissions ?? [];
  const unread = rows.filter(
    (r) => lastSeen !== null && new Date(r.created_at).getTime() > lastSeen,
  );

  function markAllRead() {
    const now = Date.now();
    localStorage.setItem(SEEN_KEY, String(now));
    setLastSeen(now);
  }

  if (q.isLoading) {
    return <div style={{ ...mono, color: "var(--pdx-text-mute)", fontSize: 12 }}>Loading submissions…</div>;
  }

  if (q.isError) {
    return (
      <div style={{ ...cardStyle, borderColor: "rgba(239,68,68,0.4)" }}>
        <div style={{ ...mono, fontSize: 11, color: "#EF4444", letterSpacing: "0.2em", marginBottom: 10 }}>
          COULD NOT LOAD SUBMISSIONS
        </div>
        <p style={{ fontFamily: "Assistant, sans-serif", color: "var(--pdx-text-dim)", fontSize: 14, lineHeight: 1.6 }}>
          The inbox query failed — this is not the same as having no leads. Retry, and if it keeps
          failing check that your account still has the admin role.
        </p>
        <div style={{ ...mono, fontSize: 10, color: "var(--pdx-text-faint)", marginTop: 10 }}>
          {(q.error as Error)?.message}
        </div>
        <button
          onClick={() => q.refetch()}
          style={{
            ...mono,
            marginTop: 16,
            border: `1px solid ${YELLOW}`,
            background: "transparent",
            color: YELLOW,
            padding: "8px 16px",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ ...mono, fontSize: 26, color: YELLOW }}>{rows.length}</span>
          <span style={{ ...mono, fontSize: 10, color: "var(--pdx-text-mute)", letterSpacing: "0.2em" }}>
            TOTAL FORM SUBMISSIONS
          </span>
          {unread.length > 0 && (
            <span
              style={{
                ...mono,
                fontSize: 10,
                letterSpacing: "0.18em",
                background: YELLOW,
                color: "#0A0A08",
                padding: "3px 8px",
              }}
            >
              {unread.length} NEW
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => q.refetch()}
            style={btn}
          >
            Refresh
          </button>
          {unread.length > 0 && (
            <button onClick={markAllRead} style={btn}>
              Mark all read
            </button>
          )}
        </div>
      </div>

      {rows.length === 0 ? (
        <div style={{ ...cardStyle, textAlign: "center", padding: 48 }}>
          <div style={{ ...mono, fontSize: 12, color: YELLOW, letterSpacing: "0.2em", marginBottom: 14 }}>
            NO SUBMISSIONS YET
          </div>
          <p style={{ fontFamily: "Assistant, sans-serif", color: "var(--pdx-text-dim)", fontSize: 14, lineHeight: 1.7 }}>
            Nothing has come through the contact form. New inquiries from
            <br />
            /contact appear here, newest first.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rows.map((r) => {
            const isNew = lastSeen !== null && new Date(r.created_at).getTime() > lastSeen;
            return (
              <div
                key={r.id}
                style={{
                  ...cardStyle,
                  borderLeft: isNew ? `3px solid ${YELLOW}` : "3px solid var(--pdx-border)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontFamily: "Assistant, sans-serif", fontWeight: 700, fontSize: 17, color: "var(--pdx-text)" }}>
                      {r.name}
                      {isNew && (
                        <span style={{ ...mono, fontSize: 9, marginLeft: 10, background: YELLOW, color: "#0A0A08", padding: "2px 6px", letterSpacing: "0.18em" }}>
                          NEW
                        </span>
                      )}
                    </div>
                    <div style={{ ...mono, fontSize: 11, color: "var(--pdx-text-dim)", marginTop: 4 }}>{r.company}</div>
                  </div>
                  <div style={{ ...mono, fontSize: 11, color: isNew ? YELLOW : "var(--pdx-text-mute)", letterSpacing: "0.08em" }}>
                    {fmt(r.created_at)}
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 24px", marginTop: 14 }}>
                  <Field label="Email">
                    <a href={`mailto:${r.email}`} style={{ color: YELLOW, textDecoration: "none" }}>
                      {r.email}
                    </a>
                  </Field>
                  <Field label="Phone">
                    {r.phone ? (
                      <a href={`tel:${r.phone.replace(/[^\d+]/g, "")}`} style={{ color: "var(--pdx-text)", textDecoration: "none" }}>
                        {r.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </Field>
                  <Field label="Interest">{r.interest || "—"}</Field>
                  <Field label="Session">{r.session_id || "—"}</Field>
                </div>

                {r.message ? (
                  <div
                    style={{
                      marginTop: 14,
                      borderLeft: `2px solid ${YELLOW}`,
                      padding: "6px 14px",
                      fontFamily: "Assistant, sans-serif",
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--pdx-text-dim)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {r.message}
                  </div>
                ) : (
                  <div style={{ ...mono, fontSize: 11, color: "var(--pdx-text-faint)", marginTop: 14 }}>
                    (no message)
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ ...mono, fontSize: 9, color: "var(--pdx-text-faint)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ ...mono, fontSize: 12, color: "var(--pdx-text)", marginTop: 3, wordBreak: "break-all" }}>{children}</div>
    </div>
  );
}

const btn = {
  ...mono,
  border: "1px solid var(--pdx-border)",
  background: "transparent",
  color: "var(--pdx-text-dim)",
  padding: "6px 12px",
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  cursor: "pointer",
};
