import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "pd_session_id";
const UTM_KEY = "pd_utm";

type UtmData = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

function isBrowser() {
  return typeof window !== "undefined" && typeof sessionStorage !== "undefined";
}

export function getSessionId(): string {
  if (!isBrowser()) return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function captureUtmFromUrl(): UtmData {
  if (!isBrowser()) return {};
  try {
    const existing = sessionStorage.getItem(UTM_KEY);
    if (existing) return JSON.parse(existing) as UtmData;
    const params = new URLSearchParams(window.location.search);
    const utm: UtmData = {
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
    };
    if (utm.utm_source || utm.utm_medium || utm.utm_campaign) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
    }
    return utm;
  } catch {
    return {};
  }
}

export function initAnalytics() {
  if (!isBrowser()) return;
  getSessionId();
  captureUtmFromUrl();
}

export type TrackMeta = {
  productSku?: string;
  productName?: string;
  path?: string;
};

export function trackEvent(eventType: string, meta: TrackMeta = {}) {
  if (!isBrowser()) return;
  try {
    const session_id = getSessionId();
    const utm = captureUtmFromUrl();
    const path = meta.path ?? window.location.pathname;
    // Fire and forget
    void supabase
      .from("site_events")
      .insert({
        session_id,
        event_type: eventType,
        path,
        product_sku: meta.productSku ?? null,
        product_name: meta.productName ?? null,
        referrer: document.referrer || null,
        utm_source: utm.utm_source ?? null,
        utm_medium: utm.utm_medium ?? null,
        utm_campaign: utm.utm_campaign ?? null,
        user_agent: navigator.userAgent,
      })
      .then(() => undefined, () => undefined);
  } catch {
    /* swallow */
  }
}
