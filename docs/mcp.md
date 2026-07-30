# Pro-Drive Fasteners MCP Integration

This app exposes a Model Context Protocol (MCP) server so AI assistants
(ChatGPT, Claude, Cursor, Codex, Lovable, etc.) can browse the product
catalog and submit sales leads on a user's behalf.

## Endpoint

- **URL:** `https://<your-domain>/mcp`
- **Transport:** MCP Streamable HTTP
- **Auth:** OAuth 2.1 (Supabase). Clients register dynamically and the user
  signs in and approves access before any tool can be called.

For unpublished projects, publish the app first — the `/mcp` route is only
reachable on the published URL.

## Connecting a client

### ChatGPT / Claude / Cursor

Add a custom connector and paste the `/mcp` URL. The client will discover the
three tools below automatically.

### Manual test with curl

Every MCP POST must include both `application/json` and `text/event-stream`
in the `Accept` header, otherwise the server returns 406.

```bash
curl -sS https://<your-domain>/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## Tools

### 1. `list_products` — browse the catalog

Read-only. Returns product ids, names, spec strings, and pack info.
Optionally filters by keyword against name and specs.

Input:

| Field   | Type            | Notes                                       |
| ------- | --------------- | ------------------------------------------- |
| `query` | string, optional| Case-insensitive keyword filter.            |
| `limit` | int 1–100, opt. | Max rows to return (default 25).            |

Example call:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "list_products",
    "arguments": { "query": "16 GA", "limit": 5 }
  }
}
```

Example structured result:

```json
{
  "total": 12,
  "products": [
    {
      "id": "lc175_16",
      "name": "16 GA L-Cleat 1-3/4\"",
      "specs": ["16 GA", "Bostitch"],
      "pack": "1,000 count · 30 lbs"
    }
  ]
}
```

### 2. `get_product` — fetch one product

Read-only. Pass an `id` from `list_products`.

Input:

| Field | Type   | Notes                    |
| ----- | ------ | ------------------------ |
| `id`  | string | Product id (required).   |

Example call:

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "get_product",
    "arguments": { "id": "lc175_16" }
  }
}
```

Example structured result:

```json
{
  "id": "lc175_16",
  "name": "16 GA L-Cleat 1-3/4\"",
  "specs": ["16 GA", "Bostitch"],
  "pack": "1,000 count · 30 lbs",
  "image": "https://.../lc175_16.png"
}
```

Returns `isError: true` when the id does not exist.

### 3. `submit_contact_lead` — send a sales inquiry

Writes a row to the internal contact-submissions inbox. Not destructive, but
not idempotent — every call creates a new lead.

Input:

| Field      | Type   | Required | Limits           |
| ---------- | ------ | -------- | ---------------- |
| `name`     | string | yes      | 1–200 chars      |
| `company`  | string | yes      | 1–200 chars      |
| `email`    | string | yes      | valid email, ≤320|
| `phone`    | string | no       | ≤50 chars        |
| `interest` | string | no       | ≤100 chars       |
| `message`  | string | no       | ≤5000 chars      |

Example call:

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "submit_contact_lead",
    "arguments": {
      "name": "Alex Chen",
      "company": "Northwind Flooring",
      "email": "alex@northwind.example",
      "phone": "555-0142",
      "interest": "16 GA L-Cleats",
      "message": "Need pricing on a pallet quantity for Q1."
    }
  }
}
```

Example structured result:

```json
{ "id": "9f6e2c4a-..." }
```

## Source

- Server entry: `src/lib/mcp/index.ts`
- Tools: `src/lib/mcp/tools/*.ts`
- Vite wiring: `mcpPlugin()` in `vite.config.ts`
