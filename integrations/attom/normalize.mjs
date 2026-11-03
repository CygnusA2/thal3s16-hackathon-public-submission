// Internal ATTOM pilot — raw provider content must not be published or committed.
export function normalizeAttom(detail, avmResponse = null, requestedAt = new Date().toISOString()) {
  const record = detail?.property?.[0];
  if (!record || !record.identifier?.attomId || !record.address) throw new Error("ATTOM_MATCH_NOT_ESTABLISHED");
  const address = record.address;
  if ((address.countrySubd || "").toUpperCase() !== "CA") throw new Error("NON_CALIFORNIA_PROPERTY");
  const takeNumber = value => {
    if (value === null || value === undefined || value === "") return null;
    const v = Number(value);
    return Number.isFinite(v) && v >= 0 ? v : null;
  };
  const id = String(record.identifier.attomId);
  const avmRecord = avmResponse?.property?.[0] || null;
  const avmId = avmRecord?.identifier?.attomId;
  // Never accidentally attach another property's valuation.
  if (avmId != null && String(avmId) !== id) throw new Error("AVM_PROPERTY_ID_MISMATCH");
  const estimated = avmId == null ? null : avmRecord.avm;
  const amount = estimated?.amount || {};
  const building = record.building || {};
  return {
    contract: "attom-private-evidence-v1",
    provider: "ATTOM",
    use: "INTERNAL_EVALUATION_ONLY",
    public_display_authorized: false,
    finance_decision_authority: false,
    attom_id: id,
    reported_address: address.oneLine || [address.line1, address.line2].filter(Boolean).join(", "),
    match_code: address.matchCode || null,
    checked_at: requestedAt,
    source_modified_at: record.vintage?.lastModified || null,
    source_published_at: record.vintage?.pubDate || null,
    physical: {
      bedrooms: takeNumber(building.rooms?.beds),
      bathrooms: takeNumber(building.rooms?.bathstotal ?? building.rooms?.bathsTotal),
      living_area_sqft: takeNumber(building.size?.universalsize ?? building.size?.universalSize),
      year_built: takeNumber(record.summary?.yearbuilt)
    },
    avm: estimated ? {
      value_usd: takeNumber(amount.value),
      low_usd: takeNumber(amount.low),
      high_usd: takeNumber(amount.high),
      event_date: estimated.eventDate || null,
      score: takeNumber(amount.scr)
    } : null,
    limitations: [
      "ATTOM AVM is an estimate, not a certified appraisal or loan approval.",
      "Parcel match and provider data require independent human verification.",
      "AI mansion illustration is not a photo of the verified parcel.",
      "No synthetic credit engine fields have been replaced."
    ]
  };
}
