"""Public educational example of FIP principles, not the benchmark validator or credit engine."""
import json
from pathlib import Path

REQUIRED = {"schema_version", "status", "evidence_freshness", "risks", "human_review"}
STATUSES = {0: "ILLUSTRATIVE_ONLY", 1: "BLOCKED"}
FRESHNESS = {0: "UNKNOWN", 1: "FRESH", 2: "STALE"}
SEVERITIES = {0: "NOT_APPLICABLE", 1: "LOW", 2: "MEDIUM", 3: "HIGH", 4: "UNKNOWN"}

def validate(document):
    """Reject unknown fields, unsupported codes and unsafe authority claims."""
    if not isinstance(document, dict) or set(document) != REQUIRED:
        raise ValueError("Invalid FIP example document shape")
    if document["schema_version"] != "public-fip-example-v1":
        raise ValueError("Unsupported schema")
    if type(document["status"]) is not int or document["status"] not in STATUSES:
        raise ValueError("Unsupported status")
    if type(document["evidence_freshness"]) is not int or document["evidence_freshness"] not in FRESHNESS:
        raise ValueError("Unsupported freshness")
    if document["human_review"] is not True:
        raise ValueError("Human review cannot be waived")
    if not isinstance(document["risks"], list) or len(document["risks"]) > 13:
        raise ValueError("Invalid risks")
    seen = set()
    for item in document["risks"]:
        if not isinstance(item, dict) or set(item) != {"dimension", "severity", "fact_ids"}:
            raise ValueError("Invalid risk entry")
        dim, severity, refs = item["dimension"], item["severity"], item["fact_ids"]
        if type(dim) is not int or dim not in range(1, 14) or dim in seen:
            raise ValueError("Invalid or duplicate dimension")
        seen.add(dim)
        if type(severity) is not int or severity not in SEVERITIES:
            raise ValueError("Invalid severity")
        if not isinstance(refs, list) or not refs or any(not isinstance(x, str) or not x for x in refs):
            raise ValueError("Risk must cite evidence")
        if document["status"] == 0 and severity == 3:
            raise ValueError("High severity contradicts illustrative clean status")
    return True

if __name__ == "__main__":
    example = json.loads((Path(__file__).parent / "example.json").read_text())
    assert validate(example)
    print("Example validated. No credit decision or funding authority.")
