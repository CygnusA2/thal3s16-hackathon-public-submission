# THAL3S 16 — Active 30-property California pilot

**Current status · 3 November 2026: 27/30 independently verified private area-reference parcel identities; 3 pending.**

This is the founder-approved **final 30-property scope**. The previous [35-marker plan](./ROLLOUT_35.md) is historical and superseded. The five former original demo markers are not displayed. The live California demo includes **exactly 30 fictional-client markers, 30 independent AI-generated mansion illustrations and the synthetic financial workflow**.

## Progress and evidence boundary

- **27 privately verified area references** are associated with stable `cf30-001`–`cf30-030` marker IDs for geographical research **only**. This association never means the fictional borrower owns or occupies the real parcel.
- **3 pending areas:** `cf30-027` Antelope Valley (Palmdale candidate prepared but not executed); `cf30-028` Somis (prior authorized request failed HTTP; new candidate needed); `cf30-030` Nicasio (prepared but unused).
- **0 publicly redistributed licensed ATTOM records.** The current account authorization supports internal-evaluation use; a field-specific redistribution licence and release review would be necessary before publishing real property characteristics.
- **One identity-only result:** `cf30-015` Orinda has a verified independent real parcel ID, but ATTOM returned **no bedrooms, bathrooms, living area or year built**. Do not backfill from listings or treat the record as a complete property profile.
- **Source-quality flags:** Santa Monica may reflect an older structure; Carmel has locality and assessor-versus-listing variance; Bel Air, Newport Beach and Tiburon have source discrepancies; St. Helena has county-versus-marketing differences; Napa has assessor lag. Preserve all warnings, dates and original reference information.
- **Synthetic financial data untouched:** No real client ownership, loans, net worth, appraisals, loan approvals, funding, token issuance or verified lending capacity are established by these property lookups. ATTOM Property Detail responses generally lacked current AVM/sale/assessed/tax-year fields; do not invent them.
- **Historical evidence untouched:** Hermes reports 38 consumed one-use authorizations, including seven failed-closed requests, and preserves all prior private plans, receipts and normalized source records. All protected key material remains in Hermes, not the public repository.

## 27 private area-reference identities verified

| Marker | Target area | Private source status |
|---|---|---|
| `cf30-001` | Atherton | PRIVATE DETAIL VERIFIED |
| `cf30-002` | Woodside | PRIVATE DETAIL VERIFIED |
| `cf30-003` | Beverly Hills | PRIVATE DETAIL VERIFIED |
| `cf30-004` | Hillsborough | PRIVATE DETAIL VERIFIED |
| `cf30-005` | Pasadena | PRIVATE DETAIL VERIFIED |
| `cf30-006` | Palo Alto | PRIVATE DETAIL VERIFIED |
| `cf30-007` | Santa Monica | PRIVATE DETAIL VERIFIED |
| `cf30-008` | San Francisco (Pacific Heights) | PRIVATE DETAIL VERIFIED |
| `cf30-009` | Los Gatos | PRIVATE DETAIL VERIFIED |
| `cf30-010` | Oakland | PRIVATE DETAIL VERIFIED |
| `cf30-011` | San Francisco | PRIVATE DETAIL VERIFIED |
| `cf30-012` | San Francisco | PRIVATE DETAIL VERIFIED |
| `cf30-013` | Carmel-by-the-Sea | PRIVATE DETAIL VERIFIED |
| `cf30-014` | Bel Air | PRIVATE DETAIL VERIFIED |
| `cf30-015` | Orinda | Identity verified; provider building facts all unavailable |
| `cf30-016` | Hillsborough | PRIVATE DETAIL VERIFIED |
| `cf30-017` | San Marino | PRIVATE DETAIL VERIFIED |
| `cf30-018` | Atherton | PRIVATE DETAIL VERIFIED |
| `cf30-019` | Woodside | PRIVATE DETAIL VERIFIED |
| `cf30-020` | Bel Air | PRIVATE DETAIL VERIFIED |
| `cf30-021` | Malibu | PRIVATE DETAIL VERIFIED |
| `cf30-022` | Newport Beach | PRIVATE DETAIL VERIFIED |
| `cf30-023` | Montecito | PRIVATE DETAIL VERIFIED |
| `cf30-024` | Tiburon | PRIVATE DETAIL VERIFIED |
| `cf30-025` | Saratoga | PRIVATE DETAIL VERIFIED |
| `cf30-026` | St. Helena | PRIVATE DETAIL VERIFIED |
| `cf30-029` | Napa | PRIVATE DETAIL VERIFIED |

## Three outstanding area references

| Marker | Target area | Current status |
|---|---|---|
| `cf30-027` | Antelope Valley area | PREPARED UNUSED APPROVAL REQUIRED |
| `cf30-028` | Somis | HTTP FAILURE REPLACEMENT PENDING |
| `cf30-030` | Nicasio | PREPARED UNUSED APPROVAL REQUIRED |

## Final request packets and stop gates

**Palmdale — `cf30-027`**: a prepared, unused packet proposes a real residential parcel in the proper Antelope Valley geography. Digest `32400d29cfc5d649816437dbd9492941b0e71b9fdc4e9682f105bbfda3e1806b`. It has **not** been approved or executed. The earlier Agua Dulce packet remains unused and out of scope.

**Somis — `cf30-028`**: the previous `6914 Solano Verde Dr` ATTOM provider request failed with `HTTP_FAILURE`; its approval was irrevocably consumed and no mapped source retained. An independently established different Somis parcel requires a fresh plan and separate approval; no automatic retry.

**Nicasio — `cf30-030`**: existing unused packet for `3200 Nicasio Valley Rd`, digest `d7339a3a060d3807dcdbe8a6480b19a1d2a95cf3f4a426834bafbb2beeebe618`. It was **not executed** because the preceding Somis request failed and the operator stopped.

Each new live call must pass independently verified address/canonical locality, approved endpoint and entitlements, unchanged immutable request digest, one-time interactive founder approval, exact response identity match, single-provider-request limit and durable ledger consumption before transport. **No retries, bulk execution, alternative addresses or automatic progression after a failed request.**

Private ATTOM facts remain distinct from fictional client profiles, synthetic credit and FIP benchmark data. Real building measurements are **not** published by the public demo.

## Verification history

The historical [35-marker report](./ROLLOUT_35.md) and Git commit history preserve the earlier iterative batches. The private engineering branch registered the five most recent mapped parcels in commit `346f7aa`; the failed Somis execution was excluded from the verified-parcel registry. This public document is the current status, not approval for further provider calls.
