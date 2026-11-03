import test from "node:test";
import assert from "node:assert/strict";
import { normalizeAttom } from "./normalize.mjs";
const sample = {
  property: [{
    identifier: { attomId: 117 },
    address: { countrySubd: "CA", oneLine: "FICTIONAL TEST ADDRESS", matchCode: "ExaZip" },
    building: { rooms: { beds: 4, bathstotal: 3 }, size: { universalsize: 4500 } },
    summary: { yearbuilt: 1998 },
    vintage: { lastModified: "2026-10-10" }
  }]
};
test("private ATTOM physical fields preserve source values", () => {
  const x = normalizeAttom(sample);
  assert.equal(x.physical.bedrooms, 4);
  assert.equal(x.physical.bathrooms, 3);
  assert.equal(x.physical.living_area_sqft, 4500);
  assert.equal(x.physical.year_built, 1998);
  assert.equal(x.public_display_authorized, false);
  assert.equal(x.avm, null);
});
test("missing physical fields remain unknown", () => {
  const x = structuredClone(sample);
  delete x.property[0].building;
  assert.equal(normalizeAttom(x).physical.bedrooms, null);
});
test("reject mismatched AVM", () => {
  assert.throws(() => normalizeAttom(sample, {property:[{identifier:{attomId:118},avm:{amount:{value:100000}}}]}), /AVM_PROPERTY_ID_MISMATCH/);
});
test("reject unverifiable parcel IDs", () => {
  assert.throws(() => normalizeAttom({property:[{address:{countrySubd:"CA"}}]}), /ATTOM_MATCH_NOT_ESTABLISHED/);
});
test("reject non-Californian property records", () => {
  const x = structuredClone(sample);x.property[0].address.countrySubd = "TX";
  assert.throws(() => normalizeAttom(x), /NON_CALIFORNIA_PROPERTY/);
});
