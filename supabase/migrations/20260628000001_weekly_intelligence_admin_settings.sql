-- contact_submissions table
-- Captures form submissions from the public /contact page
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id          UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  company     TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT,
  interest    TEXT,
  message     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit (public form)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only admins can read submissions
CREATE POLICY "Admins can read contact submissions"
  ON public.contact_submissions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_contact_submissions_created
  ON public.contact_submissions (created_at DESC);
