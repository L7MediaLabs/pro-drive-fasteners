import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { images } from "@/data/images";
import logo from "@/assets/prodrive-logo-prev.svg.asset.json";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Client Portal | Pro-Drive Fasteners®" },
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
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: "#0a0900" }}>
      {/* LEFT: Brand panel */}
      <div
        className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10,9,0,0.55) 0%, rgba(10,9,0,0.92) 100%), url(${images.mallets.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Grain + glow overlays */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 10%, rgba(255,205,0,0.18) 0%, transparent 60%), radial-gradient(50% 50% at 90% 90%, rgba(255,140,0,0.10) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex items-center gap-3">
          <img src={logo.url} alt="Pro-Drive" style={{ height: 44, width: "auto" }} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span style={{ display: "inline-block", width: 40, height: 2, background: "#FFCD00" }} />
            <span className="pd-eyebrow" style={{ color: "rgba(255,205,0,0.85)", fontSize: 12 }}>
              Client Intelligence Portal
            </span>
          </div>
          <h2
            className="pd-display text-white"
            style={{ fontSize: "clamp(40px,4vw,56px)", lineHeight: 0.95, margin: 0, letterSpacing: "-0.01em" }}
          >
            PRO-DRIVEN<br />INSIGHTS.<br />
            <span style={{ color: "#FFCD00" }}>DELIVERED.</span>
          </h2>
          <p className="mt-6 max-w-md" style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.55 }}>
            Real-time intelligence reports, shipment analytics, and product
            performance — built exclusively for Pro-Drive partners.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6" style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <span>NWFA Sponsor</span>
          <span style={{ width: 4, height: 4, background: "rgba(255,205,0,0.5)", borderRadius: "50%" }} />
          <span>50+ Years Expertise</span>
          <span style={{ width: 4, height: 4, background: "rgba(255,205,0,0.5)", borderRadius: "50%" }} />
          <span className="flex items-center gap-1.5">
            <img
              src={images.flag}
              alt=""
              loading="lazy"
              style={{ height: 12, width: "auto", display: "inline-block", opacity: 0.7 }}
            />
            Made in USA
          </span>
        </div>
      </div>

      {/* RIGHT: Form panel */}
      <div className="relative flex items-center justify-center px-6 py-16 lg:py-12">
        {/* Mobile logo */}
        <div className="absolute top-6 left-6 lg:hidden">
          <img src={logo.url} alt="Pro-Drive" style={{ height: 36, width: "auto" }} />
        </div>

        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(40% 50% at 70% 30%, rgba(255,205,0,0.06) 0%, transparent 70%)",
          }}
        />

        <div
          className="relative w-full max-w-[440px] p-10"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,205,0,0.18)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 1px 0 rgba(255,205,0,0.08) inset",
            borderRadius: 6,
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span style={{ display: "inline-block", width: 28, height: 2, background: "#FFCD00" }} />
            <span className="pd-eyebrow" style={{ color: "rgba(255,205,0,0.8)", fontSize: 12 }}>
              {mode === "signin" ? "Welcome Back" : "Request Access"}
            </span>
          </div>
          <h1 className="pd-display text-white" style={{ fontSize: 42, lineHeight: 1, margin: 0, letterSpacing: "-0.01em" }}>
            {mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
          </h1>
          <p className="mt-3 mb-7" style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.5 }}>
            {mode === "signin"
              ? "Access your Pro-Drive intelligence dashboard."
              : "Set up your Pro-Drive client account."}
          </p>

          <button
            type="button"
            onClick={onGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 mb-5 transition-all hover:bg-white"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#0e0c00",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.04em",
              borderRadius: 3,
              boxShadow: "0 4px 14px -4px rgba(0,0,0,0.5)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.3 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.2C40.9 35.5 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z"/></svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5" style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.18em" }}>
            <span style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15))" }} /> OR <span style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(255,255,255,0.15))" }} />
          </div>

          <form onSubmit={onEmailSubmit} className="space-y-3">
            {mode === "signup" && (
              <>
                <FieldInput value={fullName} onChange={setFullName} placeholder="Full name" required />
                <FieldInput value={company} onChange={setCompany} placeholder="Company" />
              </>
            )}
            <FieldInput type="email" value={email} onChange={setEmail} placeholder="Email" required autoComplete="email" />
            <FieldInput type="password" value={password} onChange={setPassword} placeholder="Password" required minLength={8} autoComplete={mode === "signin" ? "current-password" : "new-password"} />
            {err && (
              <div style={{ color: "#ff8b8b", fontSize: 12, padding: "8px 12px", background: "rgba(255,139,139,0.08)", border: "1px solid rgba(255,139,139,0.2)", borderRadius: 2 }}>
                {err}
              </div>
            )}
            {msg && (
              <div style={{ color: "#FFCD00", fontSize: 12, padding: "8px 12px", background: "rgba(255,205,0,0.08)", border: "1px solid rgba(255,205,0,0.2)", borderRadius: 2 }}>
                {msg}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full transition-all"
              style={{
                padding: "14px 20px",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: loading ? "rgba(255,205,0,0.6)" : "#FFCD00",
                color: "#0e0c00",
                borderRadius: 3,
                boxShadow: "0 8px 24px -8px rgba(255,205,0,0.5), 0 0 0 1px rgba(255,205,0,0.4) inset",
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? "Please wait…" : mode === "signin" ? "Sign In →" : "Create Account →"}
            </button>
          </form>

          <div className="mt-6 text-center" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
            {mode === "signin" ? (
              <>No account? <button onClick={() => { setMode("signup"); setErr(null); }} style={{ color: "#FFCD00", fontWeight: 700 }}>Request access</button></>
            ) : (
              <>Already have an account? <button onClick={() => { setMode("signin"); setErr(null); }} style={{ color: "#FFCD00", fontWeight: 700 }}>Sign in</button></>
            )}
          </div>
          <div className="mt-4 text-center">
            <Link to="/" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>← Back to site</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldInput(props: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      type={props.type ?? "text"}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      required={props.required}
      minLength={props.minLength}
      autoComplete={props.autoComplete}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        width: "100%",
        padding: "13px 15px",
        background: focus ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${focus ? "rgba(255,205,0,0.4)" : "rgba(255,255,255,0.12)"}`,
        color: "white",
        fontSize: 14,
        borderRadius: 3,
        outline: "none",
        transition: "all 0.18s ease",
        boxShadow: focus ? "0 0 0 3px rgba(255,205,0,0.08)" : "none",
      }}
    />
  );
}
