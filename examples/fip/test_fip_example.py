import unittest
from copy import deepcopy
from pathlib import Path
import json
from fip_example import validate

BASE = json.loads((Path(__file__).parent / "example.json").read_text())

class TestPublicFIPExample(unittest.TestCase):
    def test_valid(self):
        self.assertTrue(validate(BASE))
    def test_unknown_field(self):
        d=deepcopy(BASE); d["approve_loan"]=True
        with self.assertRaises(ValueError): validate(d)
    def test_no_human_review(self):
        d=deepcopy(BASE); d["human_review"]=False
        with self.assertRaises(ValueError): validate(d)
    def test_clean_high_conflict(self):
        d=deepcopy(BASE); d["status"]=0; d["risks"][0]["severity"]=3
        with self.assertRaises(ValueError): validate(d)
    def test_missing_evidence(self):
        d=deepcopy(BASE); d["risks"][0]["fact_ids"]=[]
        with self.assertRaises(ValueError): validate(d)

if __name__ == "__main__":
    unittest.main()
