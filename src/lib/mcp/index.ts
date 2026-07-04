import { defineMcp } from "@lovable.dev/mcp-js";
import listProducts from "./tools/list_products";
import getProduct from "./tools/get_product";
import submitContactLead from "./tools/submit_contact_lead";

export default defineMcp({
  name: "prodrive-mcp",
  title: "Pro-Drive Fasteners MCP",
  version: "0.1.0",
  instructions:
    "Tools for Pro-Drive Fasteners. Use list_products to browse the catalog, get_product for details, and submit_contact_lead to send a sales inquiry.",
  tools: [listProducts, getProduct, submitContactLead],
});
