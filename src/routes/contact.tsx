import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHeader } from "../components/PageHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Pro-Drive Fasteners®" },
      { name: "description", content: "Get in touch for distributor pricing, product questions, or order inquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // Phase 1: log only
    console.log("Pro-Drive contact submission:", data);
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <div>
      <PageHeader title="Get In Touch" description="Distributor pricing, product questions, or order inquiries." />
      <section className="px-[6%] py-12 grid lg:grid-cols-[1.4fr_1fr] gap-10" style={{ background: "var(--pd-light-bg)" }}>
        <form onSubmit={handle} className="bg-white p-8 space-y-5" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
          {sent && (
            <div className="px-4 py-3 mb-2" style={{ background: "var(--pd-yellow)", color: "var(--pd-dark)", fontWeight: 700 }}>
              Message sent. We'll be in touch shortly.
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
          <div>
            <label className="pd-label block mb-2" style={{ color: "var(--pd-dark)" }}>I'm interested in</label>
            <select
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
            <label className="pd-label block mb-2" style={{ color: "var(--pd-dark)" }}>Message</label>
            <textarea
              name="message"
              rows={4}
              className="w-full px-3 py-3"
              style={{ border: "1px solid var(--pd-border)", borderRadius: 0, fontSize: 15 }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 transition-colors"
            style={{
              background: "var(--pd-dark)",
              color: "var(--pd-yellow)",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: 0,
            }}
          >
            Send Message
          </button>
        </form>

        <aside className="p-8 space-y-6" style={{ background: "white", borderLeft: "3px solid var(--pd-yellow)" }}>
          <div>
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>Email</div>
            <a href="mailto:sales@pro-drivefasteners.com" className="block mt-1 font-bold" style={{ color: "var(--pd-dark)" }}>
              sales@pro-drivefasteners.com
            </a>
          </div>
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
      <label className="pd-label block mb-2" style={{ color: "var(--pd-dark)" }}>
        {label}{required && " *"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full px-3 py-3"
        style={{ border: "1px solid var(--pd-border)", borderRadius: 0, fontSize: 15 }}
      />
    </div>
  );
}
