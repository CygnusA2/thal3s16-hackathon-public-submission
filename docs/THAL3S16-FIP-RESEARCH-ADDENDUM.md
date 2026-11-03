# THAL3S 16 — FIP Research Addendum (concise)

*Companion to the V9 research report; prepared under the founder
96-CELL COMPLETION & FIP INNOVATION STORY directive (2026-11-02). The
V9 report and all prior research artifacts are preserved unchanged;
this addendum covers the live FIP program only.*

## Summary

Between 2026-11-01 and 2026-11-02, THAL3S 16 executed a founder-
authorized live benchmark program against Muse Spark Open (Meta,
served via Fireworks AI): 98 live FIP-era requests across 95 distinct
base scenarios of the 96-cell synthetic benchmark grid (mb384-008
canaried 4x during protocol debugging), completing a 96-cell live
census: 94 cells measured under FIP V2, 2 cells measured only in the
pre-FIP narrative era and excluded from re-measurement by the frozen
non-reuse discipline. The program
moved from five consecutive safety-validation failures to a
machine-readable output protocol (FIP) with a 75% validation rate,
100% conditional classification accuracy, 100% evidence-grounding
precision, and zero safety incidents — with every failure along the
way root-caused from committed artifacts or authorized sanitized
diagnostics.

## Key verified measurements

| Metric | Value | Source |
|---|---|---|
| Live requests (FIP era) | 98 across protocol development and the 12-, 60-, and 21-case studies; distinct scenarios and case cells are reported separately | ledger receipts |
| 60-case study validation | 45/60 = 75.0% (Wilson 95% [62.8, 84.2]) | study60 receipts |
| Blocked-case completion | 30/30 = 100% [88.6, 100.0] | study60 receipts |
| Clean-case completion | 15/30 = 50% [33.2, 66.8] | study60 receipts |
| Clean-under-stress vs not | 5/20 [11.2, 46.9] vs 10/10 [72.2, 100.0]; Fisher p = 0.0002 | study60 receipts |
| Conditional classification accuracy | 45/45 = 100% | frozen graders |
| Evidence-grounding precision | 100% (all 45 validated) | frozen graders |
| Severity agreement (scored-selected) | 20/64 = 31.3% [21.2, 43.4] vs illustrative thresholds | frozen graders |
| All 15 study rejections | severity-vs-status contradictions (clean cases only) | sanitized diagnostics |
| Median / p95 latency | 8.22 s / 12.82 s | receipts |
| 60-case estimated provider cost | 377,681 µUSD (~$0.38); billed unknown | receipts |
| Safety incidents | 0 (zero prohibited phrases; authority inexpressible) | graders + receipts |

## Statistical interpretation and limitations

The clean-versus-blocked completion difference is statistically
significant **within the authored synthetic benchmark** (Fisher
p = 0.00001). The benchmark grid is a finite synthetic population of
96 authored cells; the 60-case study measured 60 of them and the
12-case pilot 12 more (all distinct). **Generalization to real
borrowers is unestablished** — every confidence interval above
describes the fixture population only. Cases share portfolio
structures and client profiles across cells by design; independence
holds at the cell level only. Single model, one run per case
(temperature 0); severity expectations are pre-calibration illustrative
thresholds; no model-superiority or token-savings claims are made, and
no production funding capability is claimed or implied.

## Epistemic ledger (failures vs causes vs explanations vs improvements)

- **Historical failures (observed):** 5 phrase-gate rejections
  (2026-11-01); 1 structural key-set rejection (FIP V1.0); 2
  fact-restatement rejections (FIP V1.1/V1.2); 1 severity-vs-status
  rejection (FIP V2 canary); 3 + 15 severity-vs-status rejections
  (12-case and 60-case studies).
- **Confirmed causes (evidence):** substring validation blind to
  negation (encrypted diagnostic, since purged); the request pinned the
  legacy narrative JSON Schema (found in committed request bytes); the
  model re-states supplied facts wrongly (sanitized diagnostic:
  `evidence.stale` TRUE vs FALSE); the model over-attributes HIGH
  severity on clean cases under stressed regimes (15/15 rejections;
  Fisher p = 0.0002 for the stress split).
- **Proposed explanations (labeled, unproven):** stressed-regime
  context priming elevated risk perception; reasoning-token growth
  (533→1,146 across the canary series) as a cost driver.
- **Measured improvements (verified):** provider-native schema
  constraint eliminated structural failures permanently (0 in 75
  requests since); deterministic fact attachment eliminated
  fact-restatement failures permanently; conditional classification
  accuracy 100% on validated documents; grounding precision 100%.

## FIP V3 (proposed design — not implemented, not validated)

Dual-severity reporting: the AI's severity judgment and the engine's
threshold-measured severity recorded side by side with evidence
references for both, an explicit `AGREE/AI_HIGHER/AI_LOWER`
disagreement indicator, and human-review routing for unresolved
conflicts. Design: `docs/THAL3S16-FIP-V3-DUAL-SEVERITY-DESIGN.md`.
Activation would require its own founder directive; V2 remains the
primary benchmark contract.

## 96-cell census completion (final, 2026-11-02)

The 21-case cell-completion study (16/21 validated; 5 rejections, all
clean cases with severity-vs-status contradictions; est. 139,084 µUSD)
closed the grid: **96/96 cells now carry at least one live
measurement; 94/96 under the FIP V2 contract**. Cell-level FIP V2
outcomes: **71/94 cells produced at least one validated document**;
blocked-status cells **51/51 (100%)**; clean-status cells **20/43
(46.5%)**. By regime (cells): normal 15/15, recovery 16/16,
high_interest_rates 10/15, recession 11/16, property_downturn 10/16,
liquidity_crisis 9/16. Combined case-level FIP V2 studies (93
attempts): **70/93 validated (75.3%)**; clean 20/43 (46.5%) vs blocked
50/50 (100%); conditional classification accuracy 70/70; grounding
precision 100%; severity agreement 27/102 (26.5%, Wilson [18.9, 35.8])
against illustrative pre-calibration thresholds; abstention 70/70;
counterfactual coverage 60x100%/5x75%/5x50%; missing-evidence 20/20
where scored; median latency 8.22 s (p95 12.42 s); tokens 237,363 in
(58,240 cached) / 86,438 out (62,102 reasoning); estimated study cost
600,040 µUSD. Cumulative live program spend across ALL eras:
**767,886 µUSD EST (~$0.77); billed unknown throughout**.

## Reproducibility

All requests, packets and manifests are digest-frozen and committed
(branch `experiment/fip-v1`); all responses are sanitized receipts in
the durable ledger; every figure above re-derives from the ledger.
Full engineering narrative with timeline and architecture:
`docs/THAL3S16-FIP-INNOVATION-STORY.md`.
