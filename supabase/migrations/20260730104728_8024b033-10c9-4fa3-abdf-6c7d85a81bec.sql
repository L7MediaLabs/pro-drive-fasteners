DROP POLICY IF EXISTS "Anyone can insert site events" ON public.site_events;

CREATE POLICY "Anyone can insert valid site events"
ON public.site_events
FOR INSERT
TO anon, authenticated
WITH CHECK (
  session_id IS NOT NULL AND length(btrim(session_id)) > 0 AND length(session_id) <= 100
  AND event_type IS NOT NULL AND length(btrim(event_type)) > 0 AND length(event_type) <= 60
  AND path IS NOT NULL AND length(path) <= 500
  AND (page_url IS NULL OR length(page_url) <= 1000)
  AND (product_sku IS NULL OR length(product_sku) <= 100)
  AND (product_name IS NULL OR length(product_name) <= 200)
  AND (product_slug IS NULL OR length(product_slug) <= 200)
  AND (cta_label IS NULL OR length(cta_label) <= 200)
  AND (referrer IS NULL OR length(referrer) <= 1000)
  AND (utm_source IS NULL OR length(utm_source) <= 200)
  AND (utm_medium IS NULL OR length(utm_medium) <= 200)
  AND (utm_campaign IS NULL OR length(utm_campaign) <= 200)
  AND (user_agent IS NULL OR length(user_agent) <= 500)
  AND (form_fields IS NULL OR length(form_fields::text) <= 5000)
);