# ATTOM pilot — private property-evidence layer

This is **NOT connected to the public THAL3S 16 demonstration** yet. The public demo's Google Satellite map and all 30 client portfolios remain synthetic research scenarios.

## Why this is separate

ATTOM property characteristics belong to a verified real parcel; the AI-generated mansion does not depict it. Client income, net worth, loan amount, debt, indicative capacity and economic simulations remain synthetic and are not overwritten by this integration.

## Internal 3-property pilot

1. Independently identify and verify three California parcel addresses (a match must be confirmed before publishing any "verified property" label).
2. Confirm that the ATTOM licence permits the intended use. ATTOM's standard developer terms restrict evaluation data from third-party publication.
3. Deploy `worker.mjs` **privately** to Cloudflare Workers, with secrets `ATTOM_API_KEY`, `PILOT_ADMIN_TOKEN` and `ATTOM_PILOT_PROPERTIES_JSON`. Do not put these into GitHub Pages, source control or logs.
4. `ATTOM_PILOT_PROPERTIES_JSON` has a maximum of 3 entries, each with `id`, `address1`, `address2` (California), for example: `[{"id":"p1","address1":"verified street","address2":"City, CA ZIP"}]`. These are placeholders, NOT real verified addresses.
5. Authenticated internal POST requests to `/internal/property/lookup` accept `{"candidate_id":"p1"}`. No CORS is enabled, no public route returns data, no data is cached or committed.
6. ATTOM `property/detail` and `avm/detail` responses are normalized to source-labelled fields, preserving missing data and AVM uncertainty. Never merge these estimates into frozen credit calculations without a new reviewed contract.
7. Only after external-display licence permission and parcel matches are confirmed should a separate public, explicitly authorized output path be developed and independently reviewed.

Run offline tests: `node --test integrations/attom/normalize.test.mjs`.

**Status:** Integration code ready for private testing; **no live provider calls executed, no secret configured or Worker deployed**.

Sources: [ATTOM API documentation](https://api.developer.attomdata.com/docs), [developer terms](https://api.developer.attomdata.com/legal).
