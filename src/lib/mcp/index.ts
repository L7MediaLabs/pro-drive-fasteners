import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listProducts from "./tools/list_products";
import getProduct from "./tools/get_product";
import submitContactLead from "./tools/submit_contact_lead";

// The OAuth issuer must be the direct Supabase host; the project ref is the only
// value that survives publish unchanged.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "prodrive-mcp",
  title: "Pro-Drive Fasteners MCP",
  version: "0.1.0",
  instructions:
    "Tools for Pro-Drive Fasteners. Use list_products to browse the catalog, get_product for details, and submit_contact_lead to send a sales inquiry.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listProducts, getProduct, submitContactLead],
});
