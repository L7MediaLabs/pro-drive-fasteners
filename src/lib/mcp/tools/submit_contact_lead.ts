import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function supabaseForUser(ctx: ToolContext) {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "submit_contact_lead",
  title: "Submit contact lead",
  description:
    "Submit a sales/contact inquiry to Pro-Drive Fasteners. Creates a record in the contact submissions inbox.",
  inputSchema: {
    name: z.string().trim().min(1).max(200),
    company: z.string().trim().min(1).max(200),
    email: z.string().trim().email().max(320),
    phone: z.string().trim().max(50).optional(),
    interest: z.string().trim().max(100).optional(),
    message: z.string().trim().max(5000).optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return {
        content: [{ type: "text", text: "Not authenticated" }],
        isError: true,
      };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("contact_submissions")
      .insert({
        name: input.name,
        company: input.company,
        email: input.email,
        phone: input.phone ?? null,
        interest: input.interest ?? null,
        message: input.message ?? null,
      })
      .select("id")
      .single();
    if (error) {
      return {
        content: [{ type: "text", text: `Failed to submit: ${error.message}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: `Lead submitted (id ${data.id}).` }],
      structuredContent: { id: data.id },
    };
  },
});
