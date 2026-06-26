import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type {
  WeeklyIntelligenceData,
  WeeklyIntelligenceRow,
  WeeklyIntelligenceListRow,
  Recipient,
} from "@/lib/intelligence-types";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) throw error;
  if (!data) throw new Error("Forbidden");
}

export const getLatestIntelligence = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<WeeklyIntelligenceRow | null> => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("weekly_intelligence")
      .select("id, week_of, uploaded_by, uploaded_at, data")
      .order("week_of", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return (data as WeeklyIntelligenceRow | null) ?? null;
  });

export const uploadWeeklyIntelligence = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { weekOf: string; payload: WeeklyIntelligenceData }) => input)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("weekly_intelligence").insert({
      week_of: data.weekOf,
      uploaded_by: context.userId,
      data: data.payload,
    });
    if (error) throw error;
    return { success: true as const };
  });

export const listIntelligenceWeeks = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<WeeklyIntelligenceListRow[]> => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("weekly_intelligence")
      .select("id, week_of, uploaded_at, uploaded_by")
      .order("week_of", { ascending: false })
      .limit(10);
    if (error) throw error;

    const rows = (data ?? []) as WeeklyIntelligenceListRow[];
    const ids = Array.from(
      new Set(rows.map((r) => r.uploaded_by).filter(Boolean) as string[]),
    );
    if (ids.length === 0) return rows;
    const { data: profiles } = await context.supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", ids);
    const map = new Map<string, string>();
    (profiles ?? []).forEach((p: any) =>
      map.set(p.id, p.full_name || p.email || "unknown"),
    );
    return rows.map((r) => ({
      ...r,
      uploaded_by_name: r.uploaded_by ? map.get(r.uploaded_by) ?? null : null,
    }));
  });

export const getRecipients = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Recipient[]> => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("admin_settings")
      .select("recipients")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return (data?.recipients ?? []) as Recipient[];
  });

export const saveRecipients = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { recipients: Recipient[] }) => input)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data: existing } = await context.supabase
      .from("admin_settings")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (existing?.id) {
      const { error } = await context.supabase
        .from("admin_settings")
        .update({ recipients: data.recipients })
        .eq("id", existing.id);
      if (error) throw error;
    } else {
      const { error } = await context.supabase
        .from("admin_settings")
        .insert({ recipients: data.recipients });
      if (error) throw error;
    }
    return { success: true as const };
  });
