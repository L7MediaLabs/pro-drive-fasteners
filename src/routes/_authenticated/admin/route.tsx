import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  claimAdminIfNone,
  isCurrentUserAdmin,
} from "@/lib/admin.functions";
import { getLatestIntelligence } from "@/lib/intelligence.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Intelligence | Pro-Drive Fasteners®" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "▢" },
  { to: "/admin/leads", label: "Leads", icon: "▢" },
  { to: "/admin/products", label: "Products", icon: "▢" },
  { to: "/admin/reports", label: "Reports", icon: "▢" },
  { to: "/admin/settings", label: "Settings", icon: "▢" },
] as const;

function AdminLayout() {
  const router = useRouter();
  const navigate = useNavigate();
  const claim = useServerFn(claimAdminIfNone);
  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const getLatest = useServerFn(getLatestIntelligence);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const [bootstrapping, setBootstrapping] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? "");
      await claim().catch(() => {});
      const r = await checkAdmin().catch(() => ({ isAdmin: false }));
      setIsAdmin(r.isAdmin);
      setBootstrapping(false);
    })();
  }, [claim, checkAdmin]);

  const latestQ = useQuery({
    queryKey: ["intel-latest-meta"],
    queryFn: () => getLatest(),
    enabled: isAdmin,
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
    router.invalidate();
  }

  const currentPage =
    NAV.find((n) => pathname.startsWith(n.to))?.label ?? "Dashboard";

  if (bootstrapping) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0A0A08",
          color: "rgba(255,255,255,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Loading intelligence…
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0A0A08",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          style={{
            maxWidth: 440,
            background: "rgba(255,205,0,0.04)",
            border: "1px solid rgba(255,205,0,0.12)",
            padding: 40,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: "#FFCD00",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Access Pending
          </div>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.6 }}>
            {email} is signed in but not yet authorized for the Pro-Drive
            intelligence dashboard. Contact your admin to request access.
          </p>
          <button
            onClick={signOut}
            style={{
              marginTop: 24,
              border: "1px solid rgba(255,205,0,0.4)",
              color: "#FFCD00",
              padding: "10px 20px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  const week = latestQ.data?.week_of
    ? new Date(latestQ.data.week_of).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "—";
  const uploadedAt = latestQ.data?.uploaded_at
    ? timeAgo(latestQ.data.uploaded_at)
    : "no data";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A08",
        color: "rgba(255,255,255,0.85)",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          minHeight: "100vh",
          background: "#080806",
          borderRight: "1px solid rgba(255,205,0,0.07)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 0",
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
        }}
      >
        <div style={{ padding: "0 20px", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span
              style={{
                fontFamily: "Gotham, 'Saira Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 20,
                color: "#FFCD00",
                letterSpacing: "0.02em",
              }}
            >
              PD
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 9,
                color: "rgba(255,205,0,0.35)",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              Intelligence
            </span>
          </div>
        </div>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {NAV.map((n) => {
            const active = pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                style={{
                  padding: "10px 18px",
                  borderLeft: active
                    ? "2px solid #FFCD00"
                    : "2px solid transparent",
                  background: active ? "rgba(255,205,0,0.04)" : "transparent",
                  color: active ? "#FFCD00" : "rgba(255,255,255,0.35)",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                }}
              >
                {n.label}
              </Link>
            );
          })}

          <Link
            to="/"
            style={{
              marginTop: "auto",
              padding: "10px 18px",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              textDecoration: "none",
            }}
          >
            ← Back to Site
          </Link>
        </nav>

        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid rgba(255,205,0,0.06)",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.25)",
            lineHeight: 1.6,
          }}
        >
          <div>week of {week}</div>
          <div>uploaded {uploadedAt}</div>
        </div>
      </aside>

      {/* Main column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <header
          style={{
            height: 50,
            borderBottom: "1px solid rgba(255,205,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            background: "#0A0A08",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: "Assistant, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "white",
            }}
          >
            {currentPage}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              Week of {week}
            </span>
            <button
              onClick={signOut}
              style={{
                border: "1px solid rgba(255,205,0,0.25)",
                color: "#FFCD00",
                padding: "5px 12px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                background: "transparent",
                cursor: "pointer",
                borderRadius: 0,
              }}
            >
              Sign Out
            </button>
          </div>
        </header>

        <div style={{ padding: 28 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}
