import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { YELLOW, mono, cardStyle, cardAccentTop } from "@/components/admin/ui";

type SiteEvent = {
  id: string;
  session_id: string;
  event_type: string;
  path: string;
  page_url: string | null;
  product_sku: string | null;
  product_name: string | null;
  product_slug: string | null;
  cta_label: string | null;
  form_fields: Record<string, unknown> | null;
  created_at: string;
};

type FilterKey = "event_type" | "page_url" | "product_slug" | "cta_label";

type Filters = {
  event_type: string;
  page_url: string;
  product_slug: string;
  cta_label: string;
};

function since(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.round(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

export function LiveActivityPanel() {
  const [events, setEvents] = useState<SiteEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    event_type: "",
    page_url: "",
    product_slug: "",
    cta_label: "",
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const sevenDays = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from("site_events")
        .select("id, session_id, event_type, path, page_url, product_sku, product_name, product_slug, cta_label, form_fields, created_at")
        .gte("created_at", sevenDays)
        .order("created_at", { ascending: false })
        .limit(2000);
      if (cancelled) return;
      if (error) setError(error.message);
      else setEvents((data ?? []) as SiteEvent[]);
    }
    load();
    const t = setInterval(load, 30_000);
    return () => { cancelled = true; clearInterval(t); };
  }, []);

  const filtered = useMemo(() => {
    return (events ?? []).filter((e) => {
      if (filters.event_type && e.event_type !== filters.event_type) return false;
      if (filters.page_url && e.page_url !== filters.page_url) return false;
      if (filters.product_slug && e.product_slug !== filters.product_slug) return false;
      if (filters.cta_label && e.cta_label !== filters.cta_label) return false;
      return true;
    });
  }, [events, filters]);

  const totalSessions = filtered ? new Set(filtered.map((e) => e.session_id)).size : 0;

  const productCounts = new Map<string, { sku: string; name: string; count: number }>();
  const pageCounts = new Map<string, number>();
  for (const e of filtered ?? []) {
    if (e.event_type === "product_view" && e.product_sku) {
      const cur = productCounts.get(e.product_sku) ?? { sku: e.product_sku, name: e.product_name ?? e.product_sku, count: 0 };
      cur.count += 1;
      productCounts.set(e.product_sku, cur);
    }
    if (e.event_type === "page_view") {
      pageCounts.set(e.path, (pageCounts.get(e.path) ?? 0) + 1);
    }
  }
  const topProducts = [...productCounts.values()].sort((a, b) => b.count - a.count).slice(0, 5);
  const topPages = [...pageCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  const recent = (filtered ?? []).slice(0, 20);

  const filterOptions = useMemo(() => {
    const all = events ?? [];
    const pick = (key: FilterKey) => {
      const counts = new Map<string, number>();
      for (const e of all) {
        const v = e[key];
        if (!v) continue;
        counts.set(v, (counts.get(v) ?? 0) + 1);
      }
      return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, count }));
    };
    return {
      event_type: pick("event_type"),
      page_url: pick("page_url"),
      product_slug: pick("product_slug"),
      cta_label: pick("cta_label"),
    };
  }, [events]);

  return (
    <div style={{ ...cardStyle, ...cardAccentTop, padding: 22 }}>
      <div style={{ ...mono, fontSize: 10, color: YELLOW, letterSpacing: "0.25em", marginBottom: 14 }}>
        LIVE SITE ACTIVITY · LAST 7 DAYS
      </div>

      {error && (
        <div style={{ fontSize: 12, color: "#c33", marginBottom: 12 }}>{error}</div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 22 }}>
        <Stat label="TOTAL SESSIONS" value={events ? String(totalSessions) : "…"} />
        <Stat label="TOTAL EVENTS" value={events ? String(events.length) : "…"} />
        <Stat label="PRODUCT VIEWS" value={events ? String(events.filter(e => e.event_type === "product_view").length) : "…"} />
        <Stat label="CTA CLICKS" value={events ? String(events.filter(e => e.event_type === "cta_click").length) : "…"} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        <div>
          <div style={{ ...mono, fontSize: 10, color: "var(--pdx-text-mute)", letterSpacing: "0.2em", marginBottom: 8 }}>
            TOP PRODUCTS
          </div>
          {topProducts.length === 0 && <Empty />}
          {topProducts.map((p) => (
            <Row key={p.sku} left={`${p.sku} — ${p.name}`} right={`${p.count}`} />
          ))}
        </div>
        <div>
          <div style={{ ...mono, fontSize: 10, color: "var(--pdx-text-mute)", letterSpacing: "0.2em", marginBottom: 8 }}>
            TOP PAGES
          </div>
          {topPages.length === 0 && <Empty />}
          {topPages.map(([path, n]) => (
            <Row key={path} left={path} right={`${n}`} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <div style={{ ...mono, fontSize: 10, color: "var(--pdx-text-mute)", letterSpacing: "0.2em", marginBottom: 8 }}>
          RECENT ACTIVITY
        </div>
        {recent.length === 0 && <Empty />}
        {recent.map((e) => {
          const detail = e.product_name
            ? `${e.product_sku ?? ""} — ${e.product_name}`
            : e.cta_label
              ? `${e.cta_label} · ${e.path}`
              : e.event_type === "contact_submit" && e.form_fields
                ? `Lead · ${(e.form_fields as { interest?: string }).interest ?? "—"}`
                : e.path;
          return (
            <div
              key={e.id}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr 90px",
                gap: 10,
                padding: "6px 0",
                borderBottom: "1px solid var(--pdx-border)",
                fontSize: 12,
                color: "var(--pdx-text)",
              }}
              title={e.page_url ?? undefined}
            >
              <span style={{ ...mono, fontSize: 10, color: YELLOW, letterSpacing: "0.14em" }}>
                {e.event_type.replace("_", " ").toUpperCase()}
              </span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {detail}
              </span>
              <span style={{ ...mono, fontSize: 10, color: "var(--pdx-text-mute)", textAlign: "right" }}>
                {since(e.created_at)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ ...mono, fontSize: 9.5, color: "var(--pdx-text-mute)", letterSpacing: "0.22em" }}>{label}</div>
      <div style={{ fontFamily: "Assistant, sans-serif", fontWeight: 700, fontSize: 26, color: "var(--pdx-text)", marginTop: 4 }}>{value}</div>
    </div>
  );
}

function Row({ left, right }: { left: string; right: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--pdx-border)", fontSize: 12, color: "var(--pdx-text)" }}>
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 10 }}>{left}</span>
      <span style={{ ...mono, color: YELLOW }}>{right}</span>
    </div>
  );
}

function Empty() {
  return <div style={{ fontSize: 12, color: "var(--pdx-text-mute)", fontStyle: "italic", padding: "6px 0" }}>No data yet.</div>;
}
