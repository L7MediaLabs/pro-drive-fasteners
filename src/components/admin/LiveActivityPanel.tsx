import { useEffect, useMemo, useState } from "react";
import { format, startOfDay, endOfDay, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
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
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  user_agent: string | null;
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

function csvCell(value: string | null | undefined): string {
  const str = value ?? "";
  const needsQuote = str.includes('"') || str.includes(",") || str.includes("\n") || str.includes("\r");
  return needsQuote ? `"${str.replace(/"/g, '""')}"` : str;
}

function exportEventsCsv(events: SiteEvent[], filename: string) {
  const headers = [
    "event_type",
    "session_id",
    "created_at",
    "path",
    "page_url",
    "product_sku",
    "product_name",
    "product_slug",
    "cta_label",
    "referrer",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "form_fields",
    "user_agent",
  ];
  const rows = events.map((e) => [
    e.event_type,
    e.session_id,
    new Date(e.created_at).toISOString(),
    e.path,
    e.page_url,
    e.product_sku,
    e.product_name,
    e.product_slug,
    e.cta_label,
    e.referrer,
    e.utm_source,
    e.utm_medium,
    e.utm_campaign,
    e.form_fields ? JSON.stringify(e.form_fields) : null,
    e.user_agent,
  ]);
  const csv = [headers.join(","), ...rows.map((row) => row.map(csvCell).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
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
  const [search, setSearch] = useState("");
  const [range, setRange] = useState<{ from: Date; to: Date }>(() => {
    const to = endOfDay(new Date());
    const from = startOfDay(subDays(to, 6));
    return { from, to };
  });
  const [selectedEvent, setSelectedEvent] = useState<SiteEvent | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data, error } = await supabase
        .from("site_events")
        .select("id, session_id, event_type, path, page_url, product_sku, product_name, product_slug, cta_label, form_fields, referrer, utm_source, utm_medium, utm_campaign, user_agent, created_at")
        .gte("created_at", range.from.toISOString())
        .lte("created_at", range.to.toISOString())
        .order("created_at", { ascending: false })
        .limit(2000);
      if (cancelled) return;
      if (error) setError(error.message);
      else setEvents((data ?? []) as SiteEvent[]);
    }
    load();
    const t = setInterval(load, 30_000);
    return () => { cancelled = true; clearInterval(t); };
  }, [range.from.toISOString(), range.to.toISOString()]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (events ?? []).filter((e) => {
      if (filters.event_type && e.event_type !== filters.event_type) return false;
      if (filters.page_url && e.page_url !== filters.page_url) return false;
      if (filters.product_slug && e.product_slug !== filters.product_slug) return false;
      if (filters.cta_label && e.cta_label !== filters.cta_label) return false;
      if (q) {
        const haystack = `${e.path} ${e.page_url ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [events, filters, search]);

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

  const activeFilters = (Object.entries(filters) as [FilterKey, string][]).filter(([_, v]) => v !== "");

  return (
    <div style={{ ...cardStyle, padding: 22 }}>
      <div style={cardAccentTop} />
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>

        <div style={{ ...mono, fontSize: 10, color: YELLOW, letterSpacing: "0.25em" }}>
          LIVE SITE ACTIVITY · {format(range.from, "MMM d")}–{format(range.to, "MMM d, yyyy")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <QuickRange label="Today" onClick={() => setRange({ from: startOfDay(new Date()), to: endOfDay(new Date()) })} />
          <QuickRange label="7d" onClick={() => setRange({ from: startOfDay(subDays(new Date(), 6)), to: endOfDay(new Date()) })} />
          <QuickRange label="30d" onClick={() => setRange({ from: startOfDay(subDays(new Date(), 29)), to: endOfDay(new Date()) })} />
          <DatePickerButton date={range.from} onSelect={(d) => d && setRange((r) => ({ ...r, from: startOfDay(d) }))} label="From" />
          <DatePickerButton date={range.to} onSelect={(d) => d && setRange((r) => ({ ...r, to: endOfDay(d) }))} label="To" />
          {activeFilters.length > 0 && (
            <button
              onClick={() => setFilters({ event_type: "", page_url: "", product_slug: "", cta_label: "" })}
              style={{
                ...mono,
                fontSize: 10,
                color: YELLOW,
                background: "transparent",
                border: `1px solid ${YELLOW}`,
                borderRadius: 2,
                padding: "4px 10px",
                cursor: "pointer",
                letterSpacing: "0.1em",
              }}
            >
              Clear filters ({activeFilters.length})
            </button>
          )}
          <button
            onClick={() => {
              const filename = `live-activity-${format(range.from, "yyyy-MM-dd")}-${format(range.to, "yyyy-MM-dd")}.csv`;
              exportEventsCsv(filtered, filename);
            }}
            style={{
              ...mono,
              fontSize: 10,
              color: "var(--pdx-text)",
              background: "transparent",
              border: "1px solid var(--pdx-border)",
              borderRadius: 2,
              padding: "4px 10px",
              cursor: "pointer",
              letterSpacing: "0.1em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = YELLOW)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--pdx-border)")}
          >
            Export CSV
          </button>
        </div>
      </div>

      {error && (
        <div style={{ fontSize: 12, color: "#c33", marginBottom: 12 }}>{error}</div>
      )}

      <div style={{ marginBottom: 12 }}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search pages, paths, or URLs…"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 18 }}>
        <FilterSelect
          label="Event Type"
          value={filters.event_type}
          options={filterOptions.event_type}
          onChange={(v) => setFilters((f) => ({ ...f, event_type: v }))}
          formatLabel={(v) => v.replace(/_/g, " ").toUpperCase()}
        />
        <FilterSelect
          label="Page URL"
          value={filters.page_url}
          options={filterOptions.page_url}
          onChange={(v) => setFilters((f) => ({ ...f, page_url: v }))}
          truncate
        />
        <FilterSelect
          label="Product"
          value={filters.product_slug}
          options={filterOptions.product_slug}
          onChange={(v) => setFilters((f) => ({ ...f, product_slug: v }))}
          truncate
        />
        <FilterSelect
          label="CTA Label"
          value={filters.cta_label}
          options={filterOptions.cta_label}
          onChange={(v) => setFilters((f) => ({ ...f, cta_label: v }))}
          truncate
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 22 }}>
        <Stat label="TOTAL SESSIONS" value={events ? String(totalSessions) : "…"} />
        <Stat label="TOTAL EVENTS" value={events ? String(filtered.length) : "…"} />
        <Stat label="PRODUCT VIEWS" value={events ? String(filtered.filter(e => e.event_type === "product_view").length) : "…"} />
        <Stat label="CTA CLICKS" value={events ? String(filtered.filter(e => e.event_type === "cta_click").length) : "…"} />
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

      <Sheet open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
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
              <button
                key={e.id}
                onClick={() => setSelectedEvent(e)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr 90px",
                  gap: 10,
                  width: "100%",
                  textAlign: "left",
                  padding: "6px 0",
                  borderBottom: "1px solid var(--pdx-border)",
                  fontSize: 12,
                  color: "var(--pdx-text)",
                  background: "transparent",
                  cursor: "pointer",
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
              </button>
            );
          })}
        </div>
        <EventDetailsSheet event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      </Sheet>
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

function EventDetailsSheet({ event, onClose }: { event: SiteEvent | null; onClose: () => void }) {
  if (!event) return null;
  return (
    <SheetContent
      side="right"
      style={{
        background: "#0f172a",
        borderLeft: "1px solid rgba(255,205,0,0.18)",
        color: "rgba(255,255,255,0.92)",
        maxWidth: 480,
        width: "100%",
      }}
    >
      <SheetHeader>
        <SheetTitle style={{ fontSize: 14, color: YELLOW, letterSpacing: "0.12em", ...mono }}>
          {event.event_type.replace(/_/g, " ").toUpperCase()}
        </SheetTitle>
        <SheetDescription style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
          {format(new Date(event.created_at), "MMM d, yyyy h:mm:ss a")}
        </SheetDescription>
      </SheetHeader>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 18 }}>
        <DetailGroup title="Session">
          <DetailItem label="Session ID" value={event.session_id} mono />
          <DetailItem label="Path" value={event.path} />
          <DetailItem label="Page URL" value={event.page_url} />
          <DetailItem label="Referrer" value={event.referrer} />
        </DetailGroup>

        <DetailGroup title="Product / CTA">
          <DetailItem label="Product SKU" value={event.product_sku} />
          <DetailItem label="Product Name" value={event.product_name} />
          <DetailItem label="Product Slug" value={event.product_slug} />
          <DetailItem label="CTA Label" value={event.cta_label} />
        </DetailGroup>

        <DetailGroup title="UTM">
          <DetailItem label="utm_source" value={event.utm_source} />
          <DetailItem label="utm_medium" value={event.utm_medium} />
          <DetailItem label="utm_campaign" value={event.utm_campaign} />
        </DetailGroup>

        {event.form_fields && (
          <DetailGroup title="Form Fields">
            <JsonBlock data={event.form_fields} />
          </DetailGroup>
        )}

        {event.user_agent && (
          <DetailGroup title="User Agent">
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", wordBreak: "break-word", lineHeight: 1.5 }}>
              {event.user_agent}
            </div>
          </DetailGroup>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <Button
          variant="outline"
          onClick={onClose}
          style={{ ...mono, fontSize: 10, letterSpacing: "0.1em", borderRadius: 2, background: "#fff", color: "#0f172a", borderColor: "rgba(255,205,0,0.18)" }}
        >
          CLOSE
        </Button>
      </div>
    </SheetContent>

  );
}

function DetailGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ ...mono, fontSize: 10, color: "var(--pdx-text-mute)", letterSpacing: "0.2em", marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{children}</div>
    </div>
  );
}

function DetailItem({ label, value, mono: useMono }: { label: string; value: string | null; mono?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div style={{ fontSize: 10, color: "var(--pdx-text-dim)", ...mono }}>{label}</div>
      <div style={{ fontSize: 12, color: value ? "var(--pdx-text)" : "var(--pdx-text-mute)", ...(useMono ? mono : {}), wordBreak: "break-word" }}>
        {value ?? "—"}
      </div>
    </div>
  );
}

function JsonBlock({ data }: { data: Record<string, unknown> }) {
  return (
    <pre
      style={{
        ...mono,
        fontSize: 11,
        color: "var(--pdx-text-dim)",
        background: "var(--pdx-input-bg, rgba(255,255,255,0.04))",
        border: "1px solid var(--pdx-border)",
        borderRadius: 2,
        padding: 10,
        overflow: "auto",
        maxHeight: 240,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
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

function QuickRange({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...mono,
        fontSize: 10,
        color: "var(--pdx-text-dim)",
        background: "transparent",
        border: "1px solid var(--pdx-border)",
        borderRadius: 2,
        padding: "4px 10px",
        cursor: "pointer",
        letterSpacing: "0.1em",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = YELLOW)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--pdx-border)")}
    >
      {label}
    </button>
  );
}

function DatePickerButton({
  date,
  onSelect,
  label,
}: {
  date: Date;
  onSelect: (date: Date | undefined) => void;
  label: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal h-auto",
            !date && "text-muted-foreground"
          )}
          style={{
            ...mono,
            fontSize: 10,
            letterSpacing: "0.05em",
            padding: "4px 10px",
            borderRadius: 2,
            border: "1px solid var(--pdx-border)",
            background: "var(--pdx-input-bg, var(--pdx-panel))",
            color: "var(--pdx-text)",
            gap: 6,
          }}
        >
          <CalendarIcon size={12} />
          <span style={{ color: "var(--pdx-text-mute)" }}>{label}:</span> {format(date, "MMM d")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar mode="single" selected={date} onSelect={onSelect} initialFocus className={cn("p-3 pointer-events-auto")} />
      </PopoverContent>
    </Popover>
  );
}

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          ...mono,
          fontSize: 12,
          color: "var(--pdx-text)",
          background: "var(--pdx-input-bg, var(--pdx-panel))",
          border: "1px solid var(--pdx-border)",
          borderRadius: 2,
          padding: "8px 32px 8px 12px",
          outline: "none",
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            color: "var(--pdx-text-mute)",
            cursor: "pointer",
            fontSize: 14,
            lineHeight: 1,
            padding: 2,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  formatLabel,
  truncate,
}: {
  label: string;
  value: string;
  options: { value: string; count: number }[];
  onChange: (value: string) => void;
  formatLabel?: (value: string) => string;
  truncate?: boolean;
}) {
  return (
    <div>
      <label style={{ ...mono, display: "block", fontSize: 9, color: "var(--pdx-text-mute)", letterSpacing: "0.15em", marginBottom: 4 }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          ...mono,
          fontSize: 11,
          color: "var(--pdx-text)",
          background: "var(--pdx-input-bg, var(--pdx-panel))",
          border: "1px solid var(--pdx-border)",
          borderRadius: 2,
          padding: "6px 8px",
          cursor: "pointer",
        }}
      >
        <option value="">All {label.toLowerCase()}s</option>
        {options.map((o) => {
          const display = formatLabel ? formatLabel(o.value) : o.value;
          return (
            <option key={o.value} value={o.value}>
              {truncate && display.length > 38 ? `${display.slice(0, 38)}…` : display} ({o.count})
            </option>
          );
        })}
      </select>
    </div>
  );
}
