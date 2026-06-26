import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In | Pro-Drive Fasteners®" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  // If already signed in, send to admin dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setMsg(null); setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin", replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/admin",
            data: { full_name: fullName, company },
          },
        });
        if (error) throw error;
        if (data.session) navigate({ to: "/admin", replace: true });
        else setMsg("Check your email to confirm your account.");
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setErr(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) { setErr(result.error.message); return; }
    if (result.redirected) return;
    navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ background: "var(--pd-dark)" }}>
      <div
        className="w-full max-w-md p-10"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,205,0,0.15)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
          borderRadius: 4,
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span style={{ display: "inline-block", width: 32, height: 2, background: "var(--pd-yellow)" }} />
          <span className="pd-eyebrow" style={{ color: "rgba(255,205,0,0.7)" }}>Client Portal</span>
        </div>
        <h1 className="pd-display text-white" style={{ fontSize: 38, lineHeight: 1, margin: 0 }}>
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h1>
        <p className="mt-3 mb-7" style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>
          {mode === "signin"
            ? "Access your Pro-Drive intelligence reports."
            : "Set up your Pro-Drive client account."}
        </p>

        <button
          type="button"
          onClick={onGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 mb-5 transition-colors"
          style={{ background: "white", color: "#0e0c00", fontWeight: 700, fontSize: 13, letterSpacing: "0.05em", borderRadius: 2 }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.3 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.2C40.9 35.5 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z"/></svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-5" style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.15em" }}>
          <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} /> OR <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>

        <form onSubmit={onEmailSubmit} className="space-y-3">
          {mode === "signup" && (
            <>
              <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full name" required style={inputStyle} />
              <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" style={inputStyle} />
            </>
          )}
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required autoComplete="email" style={inputStyle} />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required minLength={8} autoComplete={mode === "signin" ? "current-password" : "new-password"} style={inputStyle} />
          {err && <div style={{ color: "#ff8b8b", fontSize: 12 }}>{err}</div>}
          {msg && <div style={{ color: "var(--pd-yellow)", fontSize: 12 }}>{msg}</div>}
          <button type="submit" disabled={loading} className="w-full pd-btn-primary" style={{ padding: "13px 20px", fontSize: 12 }}>
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
          {mode === "signin" ? (
            <>No account? <button onClick={() => { setMode("signup"); setErr(null); }} style={{ color: "var(--pd-yellow)", fontWeight: 700 }}>Create one</button></>
          ) : (
            <>Already have an account? <button onClick={() => { setMode("signin"); setErr(null); }} style={{ color: "var(--pd-yellow)", fontWeight: 700 }}>Sign in</button></>
          )}
        </div>
        <div className="mt-4 text-center">
          <Link to="/" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>← Back to site</Link>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "white",
  fontSize: 14,
  borderRadius: 2,
  outline: "none",
};
