-- =========================================================
-- weekly_intelligence table
-- Missing from schema — required for dashboard LIVE mode
-- =========================================================

CREATE TABLE public.weekly_intelligence (
  id           UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week_of      DATE        NOT NULL UNIQUE,
  uploaded_by  UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  uploaded_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  data         JSONB       NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.weekly_intelligence TO authenticated;
GRANT ALL ON public.weekly_intelligence TO service_role;

ALTER TABLE public.weekly_intelligence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage weekly intelligence"
  ON public.weekly_intelligence
  FOR ALL TO authenticated
  USING  (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER weekly_intelligence_set_updated_at
  BEFORE UPDATE ON public.weekly_intelligence
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_weekly_intelligence_week_of
  ON public.weekly_intelligence (week_of DESC);

-- =========================================================
-- admin_settings table
-- Required for recipient management (saveRecipients fn)
-- =========================================================

CREATE TABLE IF NOT EXISTS public.admin_settings (
  id          UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipients  JSONB       NOT NULL DEFAULT '[]'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.admin_settings TO authenticated;
GRANT ALL ON public.admin_settings TO service_role;

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage admin settings"
  ON public.admin_settings
  FOR ALL TO authenticated
  USING  (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER admin_settings_set_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

