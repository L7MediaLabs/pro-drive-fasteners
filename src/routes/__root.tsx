import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { LangToast } from "../components/LangToast";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--pd-light-bg)" }}>
      <div className="max-w-md text-center">
        <h1 className="pd-display" style={{ fontSize: 96, color: "var(--pd-dark)" }}>404</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--pd-muted)" }}>
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="pd-btn-primary">Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-white">
      <div className="max-w-md text-center">
        <h1 className="pd-display" style={{ fontSize: 32, color: "var(--pd-dark)" }}>This page didn't load</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--pd-muted)" }}>Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="pd-btn-primary">Try again</button>
          <a href="/" className="pd-btn-outline-dark">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pro-Drive Fasteners® | Pro-Driven Industrial Products" },
      { name: "description", content: "Premium fastening solutions for flooring professionals. 50+ years. Guaranteed to fit every major brand tool." },
      { name: "author", content: "Pro-Drive Fasteners" },
      { property: "og:title", content: "Pro-Drive Fasteners®" },
      { property: "og:description", content: "Premium fastening solutions for flooring professionals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600;700;800;900&family=Saira+Condensed:wght@600;700;800;900&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Pro-Drive Intelligence Layer — Installed by Seventh State Creative */}
        {/* Apollo.io Visitor Identification — DO NOT REMOVE */}
        {/* REPLACE THIS COMMENT WITH YOUR APOLLO SNIPPET */}
        {/* Meta Pixel — Instagram and Facebook Traffic Tracking — DO NOT REMOVE */}
        {/* REPLACE THIS COMMENT WITH YOUR META PIXEL CODE */}
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <LangToast />
      <main style={{ paddingTop: 64 }}>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
