# THAL3S 16 — Public property-evidence disclosure

Last reviewed: 2026-11-03 · Commit baseline: `d1e727f`

## What this demo displays

Each of the 30 property markers (`cf30-001` … `cf30-030`) shows one real, privately
ATTOM-verified California reference address, one AI-generated illustrative mansion
photograph, and a four-column building-characteristics panel (bedrooms, bathrooms,
living area, year built). The fictional client portfolios and all financial
calculations are synthetic and unchanged.

## Data sources and legal basis

**No licensed ATTOM measurements are published.** The ATTOM records used for
private identity verification are held under an internal-use evaluation
entitlement; public redistribution rights were never established, so no ATTOM
value appears in this repository, its history, or the deployment.

The publicly displayed building characteristics come from three classes of
public sources:

1. **Direct county assessor portal retrieval** (4 properties): official parcel
   pages of the Los Angeles County Office of the Assessor. Government property
   records are public records; the factual fields (beds, baths, building size,
   year built) are uncopyrightable facts freely published by the county.
2. **County records reproduced by public real-estate data sources** (17
   properties): county assessor-record fact blocks as reproduced by Redfin
   ("home facts updated by county records"), Compass ("Home Facts") and
   Realtor.com ("Realist Public Rec"). The underlying county records are public;
   the reproduced facts are cited to the reproducing source. These are NOT
   claimed as independent assessor-portal retrievals.
3. **Public property listing data** (4 properties, where the county record was
   not directly retrieved): facts stated in publicly accessible property
   listings (MLS-syndicated). They are labelled as listing data, not as
   county-verified records.

**Fields not confirmed by a cited source display "Not available."** No value is
estimated, rounded, averaged or substituted. Where public sources disagree, the
field is withheld and the discrepancy is recorded.

## Timestamps

All public-source retrievals were performed on 2026-11-03. Precise per-field
retrieval times were not logged, so each entry records only the authentic
retrieval date — no fabricated time precision. `record_vintage` is populated
only where the source itself displays a record-update date; otherwise it is
null (shown as "not displayed").

## Per-property source table

| Marker | Source class | Source URL | Retrieved | Source record updated | Beds / Baths / Living area / Year |
|---|---|---|---|---|---|
| cf30-001 | County record via public data source | https://www.redfin.com/CA/Atherton/75-Almendral-Ave-94027/home/1308231 | 2026-11-03 | 2026-09-02 | 5 / 5.5 / 8,520 sqft / 2002 |
| cf30-002 | County record via public data source | https://www.redfin.com/CA/Woodside/445-Manzanita-Way-94062/home/893082 | 2026-11-03 | 2026-09-02 | 3 / 3.5 / 6,444 sqft / 1998 |
| cf30-003 | Direct county assessor portal | https://portal.assessor.lacounty.gov/parceldetail/4350007013 | 2026-11-03 | not displayed | 4 / 7 / 6,302 sqft / 1968 |
| cf30-004 | County record via public data source | https://www.redfin.com/CA/Hillsborough/925-Seabury-Rd-94010/home/1339675 | 2026-11-03 | 2026-09-02 | 6 / 7.5 / 12,110 sqft / 2009 |
| cf30-005 | County record via public data source | https://www.redfin.com/CA/Pasadena/1525-Glen-Oaks-Blvd-91105/home/12279363 | 2026-11-03 | 2026-10-06 | 4 / 5 / 4,769 sqft / 2005 |
| cf30-006 | County record via public data source | https://www.redfin.com/CA/Palo-Alto/640-Waverley-St-94301/home/588592 | 2026-11-03 | not displayed | 3 / 1 / 1,012 sqft / 1904 |
| cf30-007 | Direct county assessor portal | https://portal.assessor.lacounty.gov/parceldetail/4293009039 | 2026-11-03 | not displayed | 4 / 3 / 3,162 sqft / 1968 |
| cf30-008 | County record via public data source | https://www.redfin.com/CA/San-Francisco/2800-Pacific-Ave-94115/home/1040354 | 2026-11-03 | 2026-08-06 | Not available / 5 / 8,120 sqft / 1908 |
| cf30-009 | County record via public data source | https://www.redfin.com/CA/Los-Gatos/17055-Pine-Ave-95032/home/913391 | 2026-11-03 | not displayed | 5 / 5 / 5,413 sqft / 2004 |
| cf30-010 | County record via public data source | https://www.redfin.com/CA/Oakland/6201-Westwood-Way-94611/home/18985722 | 2026-11-03 | not displayed | 4 / 4 / 3,108 sqft / 2008 |
| cf30-011 | County record via public data source | https://www.compass.com/homedetails/3221-Washington-St-San-Francisco-CA-94115/1POQZD_pid/ | 2026-11-03 | not displayed | 5 / 4 / 3,600 sqft / 1908 |
| cf30-012 | County record via public data source | https://www.redfin.com/CA/San-Francisco/3007-Jackson-St-94115/home/1269401 | 2026-11-03 | not displayed | 5 / 3 / 5,390 sqft / 1918 |
| cf30-013 | County record via public data source | https://www.redfin.com/CA/Carmel/26453-Scenic-Rd-93923/home/14937655 | 2026-11-03 | 2026-09-14 | 5 / Not available / 6,811 sqft / 2015 |
| cf30-014 | Direct county assessor portal | https://portal.assessor.lacounty.gov/parceldetail/4370018032 | 2026-11-03 | not displayed | 7 / 9 / 12,300 sqft / 2019 |
| cf30-016 | County record via public data source | https://www.redfin.com/CA/Hillsborough/414-Pinehill-Rd-94010/home/696031 | 2026-11-03 | 2026-09-02 | 4 / 5 / 6,713 sqft / 2014 |
| cf30-017 | Direct county assessor portal | https://portal.assessor.lacounty.gov/parceldetail/5329016022 | 2026-11-03 | not displayed | 4 / 4 / 3,763 sqft / 1951 |
| cf30-018 | County record via public data source | https://www.redfin.com/CA/Atherton/138-Almendral-Ave-94027/home/854137 | 2026-11-03 | 2026-09-02 | 5 / 5.5 / 8,412 sqft / 2012 |
| cf30-019 | County record via public data source | https://www.redfin.com/CA/Woodside/3860-Woodside-Rd-94062/home/891912 | 2026-11-03 | 2026-09-02 | 8 / 6.5 / 13,920 sqft / 1906 |
| cf30-020 | County record via public data source | https://www.redfin.com/CA/Los-Angeles/1000-Bel-Air-Rd-90077/home/6830116 | 2026-11-03 | 2026-10-08 | 4 / 6 / 4,892 sqft / 2002 |
| cf30-021 | County record via public data source | https://www.redfin.com/CA/Malibu/31740-Broad-Beach-Rd-90265/home/22812493 | 2026-11-03 | not displayed | 5 / 6 / 4,779 sqft / 1981 |
| cf30-022 | County record via public data source | https://www.compass.com/homedetails/4-Narbonne-Newport-Beach-CA-92660/1BZBRZ_pid/ | 2026-11-03 | not displayed | 4 / 5 / 5,378 sqft / 1980 |
| cf30-023 | County record via public data source | https://www.redfin.com/CA/Santa-Barbara/965-Park-Ln-93108/home/21612153 | 2026-11-03 | 2026-08-17 | 3 / 4 / 4,051 sqft / 1989 |
| cf30-024 | Public property listing data | https://www.bhhsdrysdale.com/ca/8-mariposa-court-tiburon-94920/pid-430067180 | 2026-11-03 | not displayed | 4 / Not available / Not available / 1992 |
| cf30-025 | County record via public data source | https://www.compass.com/listing/21345-saratoga-hills-road-saratoga-ca-95070/25092456370533089/ | 2026-11-03 | not displayed | 6 / Not available / 7,951 sqft / 2003 |
| cf30-026 | Public property listing data | https://www.zillow.com/homedetails/339-Crystal-Springs-Rd-Saint-Helena-CA-94574/19403295_zpid/ | 2026-11-03 | not displayed | 2 / Not available / Not available / 1993 |
| cf30-027 | Public property listing data | https://www.redfin.com/CA/Palmdale/2020-W-Avenue-N-93551/home/8128369 | 2026-11-03 | not displayed | Not available / 6 / 5,325 sqft / 2002 |
| cf30-029 | Public property listing data | https://www.zillow.com/homedetails/3000-Mount-Veeder-Rd-Napa-CA-94558/130965395_zpid/ | 2026-11-03 | not displayed | 5 / Not available / Not available / 1988 |
| cf30-030 | County record via public data source | https://www.realtor.com/realestateandhomes-detail/3200-Nicasio-Valley-Rd_Nicasio_CA_94946_M11461-03992 | 2026-11-03 | not displayed | Not available / Not available / Not available / 1982 |

`cf30-015` (Orinda) and `cf30-028` (Somis) are ATTOM-identity-only records: no
building characteristics exist in any retrieved source; all four fields display
"Not available".

## Known outstanding discrepancies (not silently resolved)

- **cf30-013** (Carmel): two county-record reproductions disagree on bathrooms
  (5.5 vs 6.5) → withheld. Beds and living area: county reproductions (5,
  6,811 sqft) differ from the private ATTOM record; the public values follow
  the cited county reproductions.
- **cf30-024** (Tiburon), **cf30-026** (St. Helena), **cf30-029** (Napa),
  **cf30-030** (Nicasio): listing living-area figures differ from the privately
  verified records; baths and/or sqft withheld where public sources conflict.
- **cf30-016 / cf30-018 / cf30-019** (San Mateo County): the Redfin county
  block and the private verified record agree on living area; a second
  reproduction (Compass) reports lower "finished" square footage, interpreted as
  a different measurement metric (finished/above-grade), recorded here rather
  than silently discarded.
- **cf30-022** (Newport Beach): the county reproduction retains the verified
  1980 structure record; a public listing indicates 2025 redevelopment.
- **cf30-006** (Palo Alto) and **cf30-007** (Santa Monica): public listings
  describe entitled/new construction; the published values follow the county
  records of the verified existing structures.
