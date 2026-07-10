CREATE TABLE public.digest_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week_of DATE NOT NULL,
  recipient_count INTEGER NOT NULL DEFAULT 0,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.digest_log TO authenticated;
GRANT ALL ON public.digest_log TO service_role;

ALTER TABLE public.digest_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view digest log"
  ON public.digest_log FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert digest log"
  ON public.digest_log FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') AND auth.uid() = uploaded_by);

CREATE INDEX idx_digest_log_sent_at ON public.digest_log(sent_at DESC);