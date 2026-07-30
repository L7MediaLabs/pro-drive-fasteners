import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type OAuthNs = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthNs }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/auth", search: { next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main style={{ padding: 40, color: "#1a1a1a" }}>
      Could not load this authorization request: {String((error as Error)?.message ?? error)}
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "an app";

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorization_id)
      : await oauth().denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: "#0a0900" }}>
      <div
        className="w-full max-w-[440px] p-10"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,205,0,0.18)",
          borderRadius: 6,
        }}
      >
        <h1 className="pd-display text-white" style={{ fontSize: 30, lineHeight: 1.05, margin: 0 }}>
          CONNECT {String(clientName).toUpperCase()}
        </h1>
        <p className="mt-4" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
          This lets {clientName} use Pro-Drive Fasteners tools as you.
        </p>
        {error && (
          <p role="alert" style={{ color: "#ff8b8b", fontSize: 12, marginTop: 12 }}>
            {error}
          </p>
        )}
        <div className="mt-8 flex gap-3">
          <button
            disabled={busy}
            onClick={() => decide(true)}
            style={{
              flex: 1,
              padding: "13px 18px",
              background: "#FFCD00",
              color: "#0e0c00",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              borderRadius: 3,
            }}
          >
            Approve
          </button>
          <button
            disabled={busy}
            onClick={() => decide(false)}
            style={{
              flex: 1,
              padding: "13px 18px",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.8)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Deny
          </button>
        </div>
      </div>
    </main>
  );
}
