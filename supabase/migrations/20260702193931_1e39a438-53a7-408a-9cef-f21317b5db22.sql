
-- 1) Restrict SECURITY DEFINER handle_new_user (trigger runs as owner; no user needs EXECUTE)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Also tighten has_role: only authenticated needs it for RLS checks
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- 2) Replace overly permissive WITH CHECK (true) on contact_submissions insert
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND length(btrim(name)) > 0 AND length(name) <= 200
    AND company IS NOT NULL AND length(btrim(company)) > 0 AND length(company) <= 200
    AND email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 320
    AND (phone IS NULL OR length(phone) <= 50)
    AND (interest IS NULL OR length(interest) <= 100)
    AND (message IS NULL OR length(message) <= 5000)
  );

-- 3) Allow authenticated users to view reports they created (non-admin path)
CREATE POLICY "Users can view their own reports"
  ON public.reports
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());
