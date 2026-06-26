
-- Teardown old pipeline
DROP TABLE IF EXISTS public.intelligence_companies CASCADE;
DROP TABLE IF EXISTS public.intelligence_uploads CASCADE;
DROP TABLE IF EXISTS public.intelligence_weeks CASCADE;

-- weekly_intelligence: one row per week, full JSON payload
CREATE TABLE public.weekly_intelligence (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_of      DATE NOT NULL,
  uploaded_by  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  uploaded_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  data         JSONB NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.weekly_intelligence TO authenticated;
GRANT ALL ON public.weekly_intelligence TO service_role;

ALTER TABLE public.weekly_intelligence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_all_weekly_intelligence"
  ON public.weekly_intelligence
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX weekly_intelligence_week_of_idx
  ON public.weekly_intelligence (week_of DESC);

-- admin_settings: single-row table for recipients
CREATE TABLE public.admin_settings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipients  JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_settings TO authenticated;
GRANT ALL ON public.admin_settings TO service_role;

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_all_admin_settings"
  ON public.admin_settings
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default recipients row
INSERT INTO public.admin_settings (recipients)
VALUES ('[
  {"name": "Craig Fehr", "email": "sales@pro-drivefasteners.com"},
  {"name": "Hollis Henderson", "email": "hollis@prodrivehd.com"}
]'::jsonb);
