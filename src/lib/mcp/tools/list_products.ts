import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { ALL_PRODUCTS } from "@/data/products";

export default defineTool({
  name: "list_products",
  title: "List products",
  description:
    "List Pro-Drive Fasteners products from the public catalog. Optional keyword filter matches product name and specs (case-insensitive).",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Optional keyword to filter by name/specs."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .optional()
      .describe("Max products to return (default 25)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit }) => {
    const q = query?.trim().toLowerCase();
    const filtered = q
      ? ALL_PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (p.specs ?? []).some((s) => s.toLowerCase().includes(q)),
        )
      : ALL_PRODUCTS;
    const rows = filtered.slice(0, limit ?? 25).map((p) => ({
      id: p.id,
      name: p.name,
      specs: p.specs ?? [],
      pack: p.pack ?? null,
    }));
    return {
      content: [
        {
          type: "text",
          text: `${rows.length} of ${filtered.length} matching products.`,
        },
      ],
      structuredContent: { total: filtered.length, products: rows },
    };
  },
});
