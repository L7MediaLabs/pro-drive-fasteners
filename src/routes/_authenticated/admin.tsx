import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { claimAdminIfNone, getDashboardMetrics, isCurrentUserAdmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Intelligence Dashboard | Pro-Drive Fasteners®" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPanel,
});

const YELLOW = "#FFCD00";
const COLORS = ["#FFCD00", "#FF8C00", "#E94F1D", "#7A6700", "#3B3300"];

function AdminPanel() {
  const router = useRouter();
  const navigate = useNavigate();
  const claim = useServerFn(claimAdminIfNone);
  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const fetchMetrics = useServerFn(getDashboardMetrics);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? "");
      // First user becomes admin automatically; no-op if admin already exists
      await claim().catch(() => {});
      const r = await checkAdmin().catch(() => ({ isAdmin: false }));
      setIsAdmin(r.isAdmin);
      setBootstrapping(false);
    })();
  }, [claim, checkAdmin]);

  const reportsQuery = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: () => fetchMetrics(),
    enabled: isAdmin,
  });

  const latestReport = reportsQuery.data?.reports?.[0];
  type Metrics = {
    kpis?: { label: string; value: string; delta?: string }[];
    trend?: { label: string; value: number }[];
    breakdown?: { name: string; value: number }[];
    bars?: { label: string; value: number }[];
  };
  const m: Metrics = useMemo(() => (latestReport?.metrics ?? {}) as Metrics, [latestReport]);

  const fallbackKpis = [
    { label: "Total Units Shipped", value: "—", delta: "" },
    { label: "Top Product Line", value: "—", delta: "" },
    { label: "Active Distributors", value: "—", delta: "" },
    { label: "MoM Growth", value: "—", delta: "" },
  ];
  const kpis = m.kpis?.length ? m.kpis : fallbackKpis;
  const trend = m.trend ?? sampleTrend;
  const breakdown = m.breakdown ?? sampleBreakdown;
  const bars = m.bars ?? sampleBars;

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
    router.invalidate();
  }

  if (bootstrapping) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--pd-dark)" }}>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Loading dashboard…
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--pd-dark)" }}>
        <div className="max-w-md text-center p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,205,0,0.15)" }}>
          <h1 className="pd-display text-white" style={{ fontSize: 32 }}>Access Pending</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 12 }}>
            Your account ({email}) is not yet authorized to view intelligence reports.
            Contact your Pro-Drive admin to request access.
          </p>
          <button onClick={signOut} className="pd-btn-outline-light mt-6" style={{ fontSize: 12 }}>Sign Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--pd-dark)" }}>
      <div className="px-[6%] pt-16 pb-24">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span style={{ display: "inline-block", width: 32, height: 2, background: YELLOW }} />
              <span className="pd-eyebrow" style={{ color: "rgba(255,205,0,0.7)" }}>Client Intelligence</span>
            </div>
            <h1 className="pd-display text-white" style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1, margin: 0 }}>
              DASHBOARD
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginTop: 12 }}>
              {latestReport ? `${latestReport.title} · ${latestReport.period ?? ""}` : "No reports published yet."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{email}</span>
            <button onClick={signOut} className="pd-btn-outline-light" style={{ fontSize: 12 }}>Sign Out</button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {kpis.map((k, i) => (
            <div key={i} className="p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,205,0,0.12)", borderRadius: 2 }}>
              <div className="pd-eyebrow" style={{ color: "rgba(255,205,0,0.7)", fontSize: 11 }}>{k.label}</div>
              <div className="pd-display text-white mt-2" style={{ fontSize: 32, lineHeight: 1 }}>{k.value}</div>
              {k.delta && <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 6 }}>{k.delta}</div>}
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-4 mb-10">
          <div className="lg:col-span-2 p-6" style={chartCard}>
            <div className="pd-eyebrow mb-4" style={{ color: "rgba(255,205,0,0.7)" }}>Units Shipped — Trailing 12 Months</div>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                  <Tooltip contentStyle={tooltip} />
                  <Line type="monotone" dataKey="value" stroke={YELLOW} strokeWidth={2.5} dot={{ fill: YELLOW, r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="p-6" style={chartCard}>
            <div className="pd-eyebrow mb-4" style={{ color: "rgba(255,205,0,0.7)" }}>Product Mix</div>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={breakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                    {breakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltip} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="p-6 mb-10" style={chartCard}>
          <div className="pd-eyebrow mb-4" style={{ color: "rgba(255,205,0,0.7)" }}>Top SKUs by Volume</div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <Tooltip contentStyle={tooltip} />
                <Bar dataKey="value" fill={YELLOW} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent reports list */}
        <div className="p-6" style={chartCard}>
          <div className="flex items-center justify-between mb-4">
            <div className="pd-eyebrow" style={{ color: "rgba(255,205,0,0.7)" }}>Recent Reports</div>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
              {reportsQuery.data?.reports?.length ?? 0} total
            </span>
          </div>
          {!reportsQuery.data?.reports?.length ? (
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
              No reports yet. Reports you publish in the backend will appear here.
            </p>
          ) : (
            <ul className="divide-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              {reportsQuery.data.reports.map(r => (
                <li key={r.id} className="py-3 flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-white" style={{ fontWeight: 700, fontSize: 14 }}>{r.title}</div>
                    {r.summary && <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>{r.summary}</div>}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, whiteSpace: "nowrap" }}>
                    {r.period ?? new Date(r.published_at).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const chartCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,205,0,0.12)",
  borderRadius: 2,
};
const tooltip: React.CSSProperties = {
  background: "#0e0c00",
  border: "1px solid rgba(255,205,0,0.3)",
  fontSize: 12,
};

const sampleTrend = [
  { label: "Jul", value: 1200 }, { label: "Aug", value: 1380 }, { label: "Sep", value: 1290 },
  { label: "Oct", value: 1520 }, { label: "Nov", value: 1610 }, { label: "Dec", value: 1480 },
  { label: "Jan", value: 1720 }, { label: "Feb", value: 1830 }, { label: "Mar", value: 1950 },
  { label: "Apr", value: 2010 }, { label: "May", value: 2180 }, { label: "Jun", value: 2310 },
];
const sampleBreakdown = [
  { name: "Mallets", value: 38 },
  { name: "Tapping Rings", value: 24 },
  { name: "Staples", value: 18 },
  { name: "L-Cleats", value: 12 },
  { name: "Other", value: 8 },
];
const sampleBars = [
  { label: "MAL-PRO", value: 820 },
  { label: "TR-RED", value: 640 },
  { label: "TB-PRO", value: 510 },
  { label: "LC-16", value: 430 },
  { label: "ST-155", value: 380 },
];
