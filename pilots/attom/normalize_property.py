"""Offline ATTOM property-detail shape check for a private three-parcel pilot.

No network access, credentials, API calls, raw data exports or lending calculations.
Only diagnostic completeness categories are returned. Synthetic tests are in test_pilot.py.
"""
from __future__ import annotations
import argparse
import json
from pathlib import Path

FIELDS = {
    "bedrooms": ("building", "rooms", "beds"),
    "bathrooms": ("building", "rooms", "bathstotal"),
    "living_area_sqft": ("building", "size", "livingsize"),
    "year_built": ("summary", "yearbuilt"),
}
TARGETS = {"beverly_hills", "palo_alto", "montecito"}


def _get(obj, *keys):
    for key in keys:
        if not isinstance(obj, dict):
            return None
        obj = obj.get(key)
    return obj


def inspect_detail(payload: dict) -> dict:
    """Report field *presence*, not values, addresses or ATTOM identifiers."""
    records = payload.get("property") if isinstance(payload, dict) else None
    if not isinstance(records, list) or len(records) != 1 or not isinstance(records[0], dict):
        return {"status": "UNVERIFIED", "reason": "EXPECTED_EXACTLY_ONE_PROPERTY",
                "available": [], "missing": list(FIELDS)}
    record = records[0]
    attom_id = _get(record, "identifier", "attomId")
    address = record.get("address")
    identity_ok = isinstance(attom_id, (str, int)) and str(attom_id).strip() and isinstance(address, dict) and bool(address.get("line1"))
    available, missing = [], []
    for name, path in FIELDS.items():
        value = _get(record, *path)
        if name == "bathrooms" and value is None:
            value = _get(record, "building", "rooms", "bathscalc")
        # 0 is not interpreted as a valid property measurement.
        valid = isinstance(value, (float, int)) and not isinstance(value, bool) and value > 0
        (available if valid else missing).append(name)
    return {"status": "PROVIDER_IDENTITY_PRESENT_UNMATCHED" if identity_ok else "UNVERIFIED",
            "reason": "PRIVATE_ADDRESS_MATCH_AND_DISPLAY_RIGHTS_REQUIRED" if identity_ok else "MISSING_IDENTIFIERS_OR_ADDRESS",
            "available": available, "missing": missing}


def main() -> None:
    parser = argparse.ArgumentParser(description="Offline, sanitized three-target ATTOM completeness check")
    for target in ("beverly_hills", "palo_alto", "montecito"):
        parser.add_argument("--" + target.replace("_", "-"), type=Path, required=True,
                            help="Private local ATTOM property/detail JSON; not committed or uploaded")
    args = parser.parse_args()
    for target in ("beverly_hills", "palo_alto", "montecito"):
        path = getattr(args, target)
        if path.stat().st_size > 2_000_000:
            raise SystemExit("Local provider file exceeds safety size limit")
        result = inspect_detail(json.loads(path.read_text(encoding="utf-8")))
        print(json.dumps({"target_area": target, **result}, separators=(",", ":")))


if __name__ == "__main__":
    main()
