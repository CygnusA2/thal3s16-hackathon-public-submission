# Thirty-five marker rollout: ATTOM property intelligence

**Scope: all 30 fictional clients + all five original demonstration markers.**
On 3 November 2026, **two** original markers (Beverly Hills and Palo Alto) have privately verified, persisted ATTOM `property/detail` records; **zero** licensed ATTOM physical-characteristic values have been published. The remaining **33** map markers have no verified property-detail record. The first Montecito candidate returned HTTP 200 but failed its canonical-address identity match and yielded no retained source.

[Open the status manifest](./portfolio-35-manifest.json). Every marker has a stable ID and a target *area*, not an invented street address.

## Execution sequence

1. **B0 — completed:** Beverly Hills original demo, one ATTOM `property/detail` request (HTTP 200, private R13 source). It has verified availability of beds, baths, living area, year built, but *private numeric values are not in this repository*. It is not a live frontend feed.
2. **B1 — in progress:** Palo Alto (`palo-alto`) now has a privately verified parcel. Montecito's first candidate failed closed with `IDENTITY_MISMATCH`; its fresh approval was consumed and no provider source persisted. A separately scoped replacement candidate is prepared but has not been executed.
3. **B2 — original fixtures:** Malibu and La Jolla. Select and verify one genuine California street address for each, then independently authorize lookups.
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
