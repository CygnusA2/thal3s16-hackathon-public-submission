import unittest
from normalize_property import inspect_detail

class PilotContractTests(unittest.TestCase):
    def test_missing_records(self):
        self.assertEqual(inspect_detail({})["status"], "UNVERIFIED")

    def test_no_invented_zero(self):
        p={"property":[{"identifier":{"attomId":42},"address":{"line1":"SYNTHETIC TEST"},
             "building":{"rooms":{"beds":0,"bathstotal":3},"size":{"livingsize":1800}},
             "summary":{"yearbuilt":2001}}]}
        r=inspect_detail(p)
        self.assertIn("bedrooms",r["missing"])
        self.assertIn("bathrooms",r["available"])
        self.assertEqual(r["status"],"PROVIDER_IDENTITY_PRESENT_UNMATCHED")

    def test_reject_ambiguous_result(self):
        self.assertEqual(inspect_detail({"property":[{},{}]})["status"],"UNVERIFIED")

    def test_does_not_emit_values(self):
        p={"property":[{"identifier":{"attomId":99999},"address":{"line1":"FAKE PRIVACY TEST"},
             "building":{"rooms":{"beds":5,"bathscalc":4},"size":{"livingsize":7000}},
             "summary":{"yearbuilt":2020}}]}
        r=str(inspect_detail(p))
        self.assertNotIn("99999",r)
        self.assertNotIn("FAKE PRIVACY TEST",r)
        self.assertNotIn("7000",r)

if __name__=="__main__":
    unittest.main()
