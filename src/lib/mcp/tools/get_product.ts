import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { ALL_PRODUCTS } from "@/data/products";

export default defineTool({
  name: "get_product",
  title: "Get product",
  description: "Fetch a single Pro-Drive product by its catalog id.",
  inputSchema: {
    id: z.string().min(1).describe("Product id from list_products."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const p = ALL_PRODUCTS.find((x) => x.id === id);
    if (!p) {
      return {
        content: [{ type: "text", text: `No product with id "${id}".` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: `Found ${p.name}` }],
      structuredContent: {
        id: p.id,
        name: p.name,
        specs: p.specs ?? [],
        pack: p.pack ?? null,
        image: p.image ?? null,
      },
    };
  },
});
