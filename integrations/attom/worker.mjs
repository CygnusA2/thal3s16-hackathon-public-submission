// Cloudflare Worker for private ATTOM pilot only. NEVER place ATTOM_API_KEY in the public frontend.
// Deployment is intentionally separate from GitHub Pages and requires explicit licensing approval.
import { normalizeAttom } from "./normalize.mjs";

function response(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff"
  } });
}
function equal(a, b) {
  const x = String(a || ""), y = String(b || "");
  if (!x || !y || x.length !== y.length) return false;
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return diff === 0;
}
async function attom(path, input, env) {
  const u = new URL("https://api.gateway.attomdata.com/propertyapi/v1.0.0/" + path);
  u.searchParams.set("address1", input.address1);
  u.searchParams.set("address2", input.address2);
  const res = await fetch(u.toString(), {
    headers: { "Accept": "application/json", "APIKey": env.ATTOM_API_KEY },
    signal: AbortSignal.timeout(9000)
  });
  if (!res.ok) throw new Error("ATTOM_PROVIDER_ERROR_" + res.status);
  return res.json();
}
export default {
  async fetch(request, env) {
    if (request.method !== "POST" || new URL(request.url).pathname !== "/internal/property/lookup") {
      return response({ status: "NOT_FOUND" }, 404);
    }
    // No CORS headers or public endpoint. An internal staff token is mandatory.
    if (!equal(request.headers.get("Authorization"), "Bearer " + env.PILOT_ADMIN_TOKEN)) {
      return response({ status: "UNAUTHORIZED" }, 401);
    }
    if (env.ATTOM_PUBLIC_DISPLAY_LICENSED !== "true") {
      // Internal lookup is still possible; its response is always labelled internal-only.
      // No code in this Worker publishes ATTOM content on the public demo.
    }
    if (!env.ATTOM_API_KEY || !env.PILOT_ADMIN_TOKEN || !env.ATTOM_PILOT_PROPERTIES_JSON) {
      return response({ status: "NOT_CONFIGURED" }, 503);
    }
    let requestBody, pilot;
    try {
      requestBody = await request.json();
      pilot = JSON.parse(env.ATTOM_PILOT_PROPERTIES_JSON);
    } catch { return response({ status: "INVALID_INPUT" }, 400); }
    if (!Array.isArray(pilot) || pilot.length > 3 || pilot.length === 0) {
      return response({ status: "PILOT_LIST_INVALID" }, 503);
    }
    const selected = pilot.find(p => p.id === requestBody?.candidate_id);
    if (!selected || !selected.address1 || !/\bCA\b/i.test(selected.address2 || "")) {
      return response({ status: "CANDIDATE_UNVERIFIED" }, 422);
    }
    try {
      const details = await attom("property/detail", selected, env);
      const avm = await attom("avm/detail", selected, env).catch(() => null);
      return response({ status: "PRIVATE_EVIDENCE_REVIEW", candidate_id: selected.id,
        evidence: normalizeAttom(details, avm) });
    } catch {
      // No addresses, provider responses or credentials in error payload.
      return response({ status: "ATTOM_LOOKUP_FAILED_REVIEW_REQUIRED" }, 502);
    }
  }
};
