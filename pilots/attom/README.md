# ATTOM three-property pilot — evidence separated from simulation

**Status: PREPARED, NOT LIVE.** This is a private-data workflow specification; no ATTOM API call or parcel match has been completed by these files.

## Pilot target areas
1. Beverly Hills, California — one ATTOM-matched street address required.
2. Palo Alto, California — one ATTOM-matched street address required.
3. Montecito, California — one ATTOM-matched street address required.

The current Google Map locations and AI-generated mansion photographs are illustrative. **Neither establishes parcel identity.** Do not infer actual property characteristics from the photos or bind a synthetic cf30 account to a real homeowner.

## Retrieval plan (private operator only)
- Use the existing private, founder-gated ATTOM integration and existing entitlement to retrieve **property/detail** for a verified address. The documented endpoint uses the private `apikey` HTTP header, never a client-side key.
- Optionally query **attomavm/detail** separately if your entitlement authorizes it. This is an automated valuation estimate, not a transaction price or certified appraisal.
- No public network endpoint, automatic retry or billed API call is authorized by this document.
- Record each exact parcel identity (ATTOM ID plus address), endpoint, retrieval timestamp, source-event dates and fields that are actually available.
- Do **not** reuse one of the 30 synthetic client values as an ATTOM property value. Keep the existing credit-engine and model-research fixtures untouched.
- Before exposing any real ATTOM figures, confirm the applicable data-publication license. Do not upload licensed ATTOM responses, owner information or credentials to this public repository.

## Field mapping
| UI field | ATTOM property-detail source | Missing handling |
|---|---|---|
| Parcel identity | `property[0].identifier.attomId` and `property[0].address` | Unverified; refuse association |
| Bedrooms | `property[0].building.rooms.beds` | Not provided |
| Bathrooms | `property[0].building.rooms.bathstotal` or `bathscalc` | Not provided |
| Living area | `property[0].building.size.livingsize` | Not provided |
| Year built | `property[0].summary.yearbuilt` | Not provided |
| Valuation (separate route) | `attomavm/detail` and AVM effective date | Unavailable until separately verified |

ATTOM documents coverage differences across counties, including records missing beds/baths or other characteristics. Missing must **never** become zero. Record provenance and freshness separately from AI interpretation.

## Publication boundary
Only once a real parcel is matched and display permission is established may the public interface show a clearly labeled **ATTOM property facts** card. The **Synthetic Client Financial Simulation** remains a distinct panel. AI-generated photographs must remain labeled as illustrations and never as property images.

The included `normalize_property.py` is an **offline private operator aid**. It does not call ATTOM, approve a loan, recalculate collateral or publish property values. It reads local response files supplied by an authorized operator and emits a sanitized completeness report. No private provider data is printed.
