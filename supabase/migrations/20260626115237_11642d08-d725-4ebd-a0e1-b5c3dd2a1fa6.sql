
-- =========================================================
-- INTELLIGENCE WEEKS
-- =========================================================
CREATE TABLE public.intelligence_weeks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week_label TEXT NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','ready','failed')),
  email_filename TEXT,
  web_filename TEXT,
  social_filename TEXT,
  kpis JSONB NOT NULL DEFAULT '{}'::jsonb,
  executive_summary TEXT,
  ai_model TEXT,
  ai_error TEXT,
  processed_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (period_start, period_end)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.intelligence_weeks TO authenticated;
GRANT ALL ON public.intelligence_weeks TO service_role;

ALTER TABLE public.intelligence_weeks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage intelligence weeks"
  ON public.intelligence_weeks
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_intelligence_weeks_updated_at
  BEFORE UPDATE ON public.intelligence_weeks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_intel_weeks_period ON public.intelligence_weeks (period_start DESC);
CREATE INDEX idx_intel_weeks_status ON public.intelligence_weeks (status);

-- =========================================================
-- INTELLIGENCE COMPANIES (hot leads per week)
-- =========================================================
CREATE TABLE public.intelligence_companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week_id UUID NOT NULL REFERENCES public.intelligence_weeks(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  domain TEXT,
  industry TEXT,
  location TEXT,
  signals JSONB NOT NULL DEFAULT '{}'::jsonb,
  score NUMERIC(5,2),
  tier TEXT CHECK (tier IN ('hot','warm','cool','cold')),
  fit_reasoning TEXT,
  recommended_action TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.intelligence_companies TO authenticated;
GRANT ALL ON public.intelligence_companies TO service_role;

ALTER TABLE public.intelligence_companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage intelligence companies"
  ON public.intelligence_companies
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_intelligence_companies_updated_at
  BEFORE UPDATE ON public.intelligence_companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_intel_companies_week ON public.intelligence_companies (week_id);
CREATE INDEX idx_intel_companies_score ON public.intelligence_companies (week_id, score DESC);
CREATE INDEX idx_intel_companies_tier ON public.intelligence_companies (week_id, tier);

-- =========================================================
-- INTELLIGENCE UPLOADS (raw CSV metadata)
-- =========================================================
CREATE TABLE public.intelligence_uploads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week_id UUID NOT NULL REFERENCES public.intelligence_weeks(id) ON DELETE CASCADE,
  source TEXT NOT NULL CHECK (source IN ('email','web','social')),
  filename TEXT NOT NULL,
  storage_path TEXT,
  row_count INTEGER,
  raw_sample JSONB,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (week_id, source)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.intelligence_uploads TO authenticated;
GRANT ALL ON public.intelligence_uploads TO service_role;

ALTER TABLE public.intelligence_uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage intelligence uploads"
  ON public.intelligence_uploads
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_intelligence_uploads_updated_at
  BEFORE UPDATE ON public.intelligence_uploads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_intel_uploads_week ON public.intelligence_uploads (week_id);
