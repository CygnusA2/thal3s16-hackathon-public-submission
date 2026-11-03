# Public FIP example — inspectable safety architecture

This minimal Python example demonstrates the **principles** behind the THAL3S 16 Financial Intelligence Protocol: numeric statuses, enumerated risk severities, evidence references, strict document shape, contradiction rejection and mandatory human review.

**Important:** This is a simplified, newly authored educational example, **not** the frozen FIP V2 benchmark implementation, not a reproduction of the 93 live attempts, and not a lending engine. The benchmark's full validator and private execution ledgers are not included here.

Run with Python 3: `cd examples/fip && python -m unittest test_fip_example.py`

The example's input is synthetic and does not include credentials, personal data, provider responses or property photographs. A validated example means only that it passed these illustrative structural checks; it does not authorize a loan or any funding.

See the [FIP research addendum](../../docs/THAL3S16-FIP-RESEARCH-ADDENDUM.md) for the actual measured research and limitations.
