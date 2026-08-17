import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHeader } from "../components/PageHeader";
import { supabase } from "@/integrations/supabase/client";
import { getSessionId, trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Pro-Drive Fasteners" },
      { name: "description", content: "Get in touch for distributor pricing, product questions, or order inquiries." },
      { property: "og:title", content: "Contact | Pro-Drive Fasteners" },
      { property: "og:description", content: "Reach the Pro-Drive team for distributor pricing, product questions, or order inquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const SALES_PHONE = "(770) 778-0760";

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: bots fill hidden fields. Show success, insert nothing.
    if (String(data.website_url ?? "").trim() !== "") {
      setError(null);
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 5000);
      return;
    }

    const payload = {
      name: String(data.name),
      company: String(data.company),
      email: String(data.email),
      phone: String(data.phone ?? ""),
      interest: String(data.interest ?? ""),
      message: String(data.message ?? ""),
      session_id: getSessionId(),
    };

    setPending(true);
    setError(null);
    const { error: insertError } = await supabase.from("contact_submissions").insert(payload);
    setPending(false);

    if (insertError) {
      // Keep every field intact — nobody should retype a paragraph.
      setSent(false);
      setError(
        `We couldn't send your message. Nothing was submitted — your details are still here, so please try again. If it keeps failing, call us at ${SALES_PHONE}.`,
      );
      return;
    }

    trackEvent("contact_submit", {
      ctaLabel: "Send Message",
      formFields: {
        interest: payload.interest,
        company: payload.company,
        has_phone: Boolean(payload.phone),
        has_message: Boolean(payload.message),
        message_length: payload.message.length,
      },
    });
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <div>
      <PageHeader title="Get In Touch" description="Distributor pricing, product questions, or order inquiries." />
      <section className="px-[6%] py-12 grid lg:grid-cols-[1.4fr_1fr] gap-10" style={{ background: "var(--pd-light-bg)" }}>
        <form onSubmit={handle} className="bg-white p-8 space-y-5" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
          {sent && (
            <div role="status" className="px-4 py-3 mb-2" style={{ background: "var(--pd-yellow)", color: "var(--pd-dark)", fontWeight: 700 }}>
              Message sent. We'll be in touch shortly.
            </div>
          )}
          {error && (
            <div
              role="alert"
              className="px-4 py-3 mb-2 text-sm"
              style={{ background: "#FDECEC", color: "#8A1C1C", borderLeft: "4px solid #C62828", fontWeight: 600, lineHeight: 1.55 }}
            >
              {error}
            </div>
          )}
          {[
            { name: "name", label: "Full Name", type: "text", required: true },
            { name: "company", label: "Company Name", type: "text", required: true },
            { name: "email", label: "Email Address", type: "email", required: true },
            { name: "phone", label: "Phone Number", type: "tel", required: true },
          ].map(f => (
            <Field key={f.name} {...f} />
          ))}

          {/* Honeypot — off-screen (not display:none), skipped by keyboard and password managers. */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
            <label htmlFor="website_url">Website</label>
            <input id="website_url" name="website_url" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>
          <div>
            <label htmlFor="contact-interest" className="pd-label block mb-2" style={{ color: "var(--pd-dark)" }}>I'm interested in</label>
            <select
              id="contact-interest"
              name="interest"
              required
              className="w-full px-3 py-3 bg-white"
              style={{ border: "1px solid var(--pd-border)", borderRadius: 0, fontSize: 15 }}
            >
              <option>Distributor Pricing</option>
              <option>Product Information</option>
              <option>Order Inquiry</option>
              <option>Technical Support</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-message" className="pd-label block mb-2" style={{ color: "var(--pd-dark)" }}>Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              className="w-full px-3 py-3"
              style={{ border: "1px solid var(--pd-border)", borderRadius: 0, fontSize: 15 }}
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            aria-busy={pending}
            className="w-full py-4 transition-colors"
            style={{
              background: "var(--pd-dark)",
              color: "var(--pd-yellow)",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: 0,
              opacity: pending ? 0.6 : 1,
              cursor: pending ? "not-allowed" : "pointer",
            }}
          >
            {pending ? "Sending…" : "Send Message"}
          </button>
        </form>

        <aside className="p-8 space-y-6" style={{ background: "white", borderLeft: "3px solid var(--pd-yellow)" }}>
          {/* Email address intentionally NOT published (Carlton, Aug 13): a
              plain-text or mailto address on a public page attracts spam and
              malware. The form above is the only capture route. */}
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Website</div>
            <div className="mt-1 font-bold" style={{ color: "var(--pd-dark)" }}>Pro-DriveFasteners.com</div>
          </div>
          <p className="text-sm" style={{ color: "var(--pd-muted)" }}>
            For wholesale and distributor inquiries, please include your company name and location.
          </p>
          <div className="p-5" style={{ background: "var(--pd-yellow)" }}>
            <div className="pd-label" style={{ color: "var(--pd-dark)" }}>Authorized Distributors</div>
            <p className="mt-2 text-sm" style={{ color: "var(--pd-dark)" }}>
              Contact us for wholesale pricing and territory availability. We work with flooring distributors across the US.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({ name, label, type, required }: { name: string; label: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="pd-label block mb-2" style={{ color: "var(--pd-dark)" }}>
        {label}{required && " *"}
      </label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        required={required}
        className="w-full px-3 py-3"
        style={{ border: "1px solid var(--pd-border)", borderRadius: 0, fontSize: 15 }}
      />
    </div>
  );
}
