
CREATE TABLE IF NOT EXISTS public.allowed_admin_emails (
  email TEXT PRIMARY KEY,
  added_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.allowed_admin_emails TO authenticated;
GRANT ALL ON public.allowed_admin_emails TO service_role;

ALTER TABLE public.allowed_admin_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage allowed admin emails"
ON public.allowed_admin_emails FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed initial client email
INSERT INTO public.allowed_admin_emails (email) VALUES ('hollis@prodrivehd.com')
ON CONFLICT (email) DO NOTHING;

-- Trigger: auto-promote allow-listed emails on signup or email confirmation
CREATE OR REPLACE FUNCTION public.grant_role_for_allowed_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL
     AND EXISTS (
       SELECT 1 FROM public.allowed_admin_emails
       WHERE lower(email) = lower(NEW.email)
     ) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_grant_allowed_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_grant_allowed_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_role_for_allowed_email();

DROP TRIGGER IF EXISTS on_auth_user_confirmed_grant_allowed_admin ON auth.users;
CREATE TRIGGER on_auth_user_confirmed_grant_allowed_admin
AFTER UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW
WHEN (OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL)
EXECUTE FUNCTION public.grant_role_for_allowed_email();
