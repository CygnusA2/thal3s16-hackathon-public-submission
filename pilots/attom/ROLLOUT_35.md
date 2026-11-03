# Thirty-five marker rollout: ATTOM property intelligence

**Scope: all 30 fictional clients + all five original demonstration markers.**
On 3 November 2026, **11** ATTOM area-reference parcels were verified privately. Five cover the original demo areas; six independent real parcels serve as illustrations for fictional-client geographic regions, **without any ownership or lending relationship**. **Zero** licensed property values have been published. The other **24** marker targets have no verified reference parcel. Two earlier requests failed closed without retained mapped provider evidence.

[Open the status manifest](./portfolio-35-manifest.json). Every marker has a stable ID and a target *area*, not an invented street address.

## Execution sequence

1. **B0 — completed:** Beverly Hills original demo, one ATTOM `property/detail` request (HTTP 200, private R13 source). It has verified availability of beds, baths, living area, year built, but *private numeric values are not in this repository*. It is not a live frontend feed.
2. **B1 — completed:** Original-demo Palo Alto and Montecito/Santa Barbara-area reference parcels were verified privately. The earlier mismatched Montecito candidate remains excluded.
3. **B2 — completed:** Original-demo Malibu and La Jolla area references were verified privately. Their existing fictional building facts are not ATTOM measurements.
4. **C1–C6 — fictional clients:** five distinct marker targets per batch, in their listed geographic areas (`cf30-001` through `cf30-030`), identifying a real property for each. A sample coordinate on the original map is **not** a real parcel identity or a basis for exact-address assertions.
5. For each verified property, check ATTOM ID, street/city/ZIP, APN/FIPS where returned, field-specific source paths, dates, missing values, and any conflicting identity; keep private licensed responses out of the public repository.
6. Only after confirming specifically permitted public-display fields, publish an **approved minimal property-facts snapshot** distinctly labelled as ATTOM with `retrieved_at`, record vintage, and missing-field states. Do not publish owner, occupant, mortgage-holder, full raw payload or private client data. Use a human-controlled release review, not automatic data publication.
7. Keep synthetic client wealth, private holdings, debts, collateral and credit engine outputs **unaltered**. Do not substitute ATTOM AVM for fictional lending inputs or call it a completed appraisal. The AI-generated photos remain illustrative, unrelated to the verified address.

## R13 scaling blocker

The existing R13 branch `work/p13-property-detail-route-20261103` uses a hard-coded Beverly Hills expected ATTOM ID plus a one-time fixed `plan-property-detail.json` file. **It cannot safely run the other 34 property requests unchanged.**

In the **private repository only**, prepare an additive R14 address/parcel discovery + per-target single-use approval extension. Scope each request to one stable marker ID, verified address, request digest and no retries. Do not overwrite R12 or R13 fixed plans, the consumed SQLite ledger, historical receipts or the protected key. Do not blindly trust the first property returned for a nearby neighborhood. Use an independently established parcel address and a strict one-property identity match. Never execute a batch without its individual approvals. Reporting of a simulated or fabricated record must never advance a marker to PRIVATE_DETAIL_VERIFIED.

The existing ATTOM key stays on Hermes at its protected path; never embed it in web code or GitHub Actions. The public GitHub Pages site is static and is not an authorized ATTOM backend.

## Readiness criteria for marking one marker complete

- A genuine California property identity was independently established and cross-checked.
- A successful, fresh, single-use ATTOM Property Detail response was persisted in private storage.
- Building facts were classified individually (present/missing), with source paths and record dates.
- Values were explicitly cleared for the specific public use by the account's data terms.
- The public facts panel is labeled ATTOM, shows retrieval/freshness, and does not imply the synthetic borrower owns the real parcel.
- The financial calculations, historical research and 35 existing map-marker IDs remain unchanged.

**Accounting:** 35 marker targets, 1 previously completed private lookup, up to 34 further Property Detail requests for one verified property per marker, plus any separately authorized discovery requests. Provider calls have their own allowance/cost impact, and none is implicitly authorized by a batch name.

## Evidence progress · 3 November 2026

- **Beverly Hills:** verified private ATTOM Property Detail record; public physical-characteristic values withheld pending rights.
- **Palo Alto:** second verified private ATTOM Property Detail record; public physical-characteristic values withheld pending rights. This real parcel is not represented by its fictional mansion photograph or borrower wealth.
- **Montecito:** one failed closed request, HTTP 200 plus canonical address mismatch; no provider record retained; candidate replacement prepared but not executed.
- **R14** (private commit `f754297`): plan filenames keyed by request digest, identity crosschecks keyed by exact street address and ZIP; per-request independent founder authorizations retained.
- **Five pending candidates:** two Malibu-area, one La Jolla, one Santa Barbara/Montecito-area replacement, and an additional Palo Alto parcel. None are ATTOM-verified and none advance marker status until their own authorized request and identity verification.
- **Public publication boundary:** 2/35 privately verified, 0/35 licensed records cleared for display. No private source records, credentials, owner information or licensed values in this repository.

## R14 batch 1 status · 3 November 2026

- **Six verified private ATTOM Property Detail records**: Beverly Hills, Palo Alto, Montecito/Santa Barbara area, La Jolla and two independent Malibu parcels. Five are associated with the five original demo *areas*; the additional Malibu parcel is paired with fictional marker `cf30-021` **for illustration only**. No borrower ownership or affiliation with that parcel is asserted, and the map marker is not a surveyed parcel pin.
- **Two rejected attempts across prior batches**: 93 Seaview Dr (canonical address identity mismatch), and 134 Seale Ave (HTTP failure). Their one-shot approvals are consumed; neither produced a retained mapped provider record and neither can be silently reused.
- **Incomplete licensed fields**: bathrooms unavailable in two of the new mapped property-detail records; AVM estimates, dates and sale/assessment fields remain unavailable from this route for the new records. No missing value is inferred from the AI house or synthetic portfolio.
- **Progress accounting**: 6 / 35 research reference targets privately verified, 29 / 35 awaiting distinct verified reference parcels, 0 / 35 licensed property values publicly disclosed.
- **Next five packets prepared, not executed**: 636 Waverley St (Palo Alto), 6649 Zumirez Dr (Malibu), 8575 La Jolla Scenic Dr N, 5736 Soledad Mountain Rd (La Jolla), and 1588 E Valley Rd (Santa Barbara/Montecito). These are **additional area candidates**, not five new distinct marker completions. For efficient coverage of the 29 pending markers, prioritize new regions such as Atherton, Woodside, Hillsborough and Pasadena before optional duplicates. Keep every existing immutable plan untouched.
- **Rights restriction**: private internal-evaluation evidence only; public website displays a sanitized verification status with no ATTOM bedroom, bathroom, year, area, AVM, sale or owner values.

## R14 Batch 2: five additional privately verified areas · 2026-11-03

Five separate approved private ATTOM Property Detail lookups were reported successful and recorded on the R14 private engineering branch `38f8867`. All are **independent real-parcel research references**, not assets claimed to be owned by fictional client characters:

- `cf30-001` Atherton — building-fact verification complete privately; bathroom field missing; 2026-09-24 record vintage.
- `cf30-002` Woodside — verified privately; bathroom field missing; 2026-09-29 record vintage.
- `cf30-004` Hillsborough — verified privately; bathroom field missing; 2026-09-29 record vintage.
- `cf30-005` Pasadena — verified privately; 2026-09-23 record vintage.
- `cf30-007` Santa Monica — parcel identity privately verified; 2026-09-22 record vintage; **assessor record lag/redevelopment disagreement**. Do not assert listing-era characteristics as ATTOM-provided values or represent the image as the verified house.

Cumulative tracker: **11/35 privately verified reference areas, 24/35 pending, 0/35 licensed property records publicly displayed**. Hermes reported 15 consumed ATTOM approvals in total across R12–R14; existing consumed approval ledgers and records remain private. The project does not automatically authorize further provider requests.

**Next proposed new-area targets, not yet matched or authorized:** `cf30-008` Pacific Heights, `cf30-009` Los Gatos, `cf30-010` Oakland, `cf30-013` Carmel-by-the-Sea, `cf30-014` Bel Air. The operator must independently select and verify one real residential parcel in each area, obtain a separate one-use approval per lookup, and retain any licensed evidence privately. Existing unused plans remain intact.

**Release gate:** Public values require account-specific redistribution permission and field-level review. Nothing in this tracker authorizes publishing licensed ATTOM building attributes, address records, AVM amounts or owner information.
