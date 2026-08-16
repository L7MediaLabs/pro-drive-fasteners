import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Contact form submissions for the admin inbox.
 * RLS restricts SELECT to has_role(auth.uid(), 'admin').
 */
export const listContactSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("contact_submissions")
      .select("id, name, company, email, phone, interest, message, created_at, session_id")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw error;
    return { submissions: data ?? [] };
  });
