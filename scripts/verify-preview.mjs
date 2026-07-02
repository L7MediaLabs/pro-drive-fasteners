#!/usr/bin/env node
/**
 * Post-build preview health check.
 *
 * Polls the local dev/preview server and fails if:
 *   - the server doesn't respond with HTTP 200
 *   - the response body contains the "Preview has not been built yet" placeholder
 *   - the response body is missing the expected app shell
 *
 * Usage:
 *   node scripts/verify-preview.mjs [--url=http://localhost:8080] [--attempts=5] [--delay=1000]
 */

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? "true"];
  }),
);

const URL = args.url || process.env.PREVIEW_URL || "http://localhost:8080/";
const ATTEMPTS = Number(args.attempts || 5);
const DELAY = Number(args.delay || 1000);
const PLACEHOLDER = "Preview has not been built yet";
const EXPECTED = "<!DOCTYPE html";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let failures = 0;
for (let i = 1; i <= ATTEMPTS; i++) {
  try {
    const res = await fetch(URL, { headers: { "cache-control": "no-cache" } });
    const body = await res.text();
    const ok =
      res.status === 200 &&
      !body.includes(PLACEHOLDER) &&
      body.toLowerCase().includes(EXPECTED.toLowerCase());
    if (!ok) {
      failures++;
      console.error(
        `[verify-preview] attempt ${i}/${ATTEMPTS} FAIL — status=${res.status} placeholder=${body.includes(PLACEHOLDER)} bytes=${body.length}`,
      );
    } else {
      console.log(`[verify-preview] attempt ${i}/${ATTEMPTS} ok (${body.length} bytes)`);
    }
  } catch (err) {
    failures++;
    console.error(`[verify-preview] attempt ${i}/${ATTEMPTS} ERROR — ${err.message}`);
  }
  if (i < ATTEMPTS) await sleep(DELAY);
}

if (failures > 0) {
  console.error(`[verify-preview] ${failures}/${ATTEMPTS} attempts failed for ${URL}`);
  process.exit(1);
}
console.log(`[verify-preview] all ${ATTEMPTS} attempts passed for ${URL}`);
