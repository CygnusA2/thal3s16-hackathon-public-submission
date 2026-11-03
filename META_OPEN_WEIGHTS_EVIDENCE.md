# THAL3S 16 — Meta Open Weights Execution Evidence

**Bonus category addressed:** Best Build on Meta Open Weight Models — project built
using **Muse Spark Open** (Meta open weights), served through **Fireworks AI**
inference.

Last verified: 2026-11-03. Every claim below is backed by a durable, sanitized
execution ledger; no credentials, private model-answer documents, restricted
ATTOM data or confidential financial records appear in this repository.

---

## 1. Exact model and provider identification

| Item | Value |
|---|---|
| Model | `accounts/fireworks/models/muse-spark-open` — **Muse Spark Open**, Meta's open-weight model |
| Serving provider | **Fireworks AI** (recorded as `hosting_provider: fireworks.ai` on every authorization record) |
| Endpoint | `https://us.api.fireworks.ai/inference/v1/chat/completions` — Fireworks US-only serverless inference (the model is listed on Fireworks' US-only serverless catalogue) |
| Provider confirmation | Every completed inference receipt records `http_status: 200` and `returned_model: accounts/fireworks/models/muse-spark-open` |
| Execution window | 2026-11-01 → 2026-11-02 (UTC), inside the hackathon build window |
| Scale | 120 founder-approved one-use authorizations; 112 completed Muse Spark Open inference receipts on disk |
| Authorization discipline | Every request was individually authorized by the project owner before execution; one request per authorization, no retries, credentials held in a restricted file and never committed anywhere |

## 2. Why Muse Spark Open

The THAL3S 16 research question is whether an open-weight LLM can produce
**financial-risk interpretations that a validator can certify as grounded** —
not whether it can write plausible prose. Muse Spark Open was chosen because:

- It is a **Meta open-weight model**, the explicit subject of this bonus category.
- Its **provider-native JSON-schema-constrained decoding** (via Fireworks)
  lets the application pin an exact output contract (`fip-numeric-v2-request`),
  which is the foundation of the Financial Intelligence Protocol (FIP).
- Serving it through a recognized inference partner (Fireworks AI) made the
  execution auditable: every call is receipted, digested and cost-metered.

## 3. How THAL3S 16 used the model

THAL3S 16 computes all financial figures — LTV, collateral capacity, the 13
risk-dimension intensities and the assessment status — **deterministically**,
from authored synthetic client facts. The model's role is strictly
**interpretation**: given the frozen fact projection, Muse Spark Open returns a
structured risk reading (which dimensions, what severity, which facts support
each claim) under the pinned schema. The model never approves loans, never sets
credit limits and never overrides the engine.

## 4. How FIP V2 constrained and validated the outputs

FIP V2 (`fip-numeric-v2`) is a fail-closed validation contract applied to every
model response before anything reaches a human:

- **Schema pinning** — the response must satisfy the pinned
  `fip-numeric-v2-request` schema (provider-native constrained decoding).
- **Fact-reference integrity** — every fact ID the model cites must exist in
  the supplied projection; grounding precision is graded per output.
- **Severity/status consistency** — the model's severity for each dimension
  must be consistent with the deterministic engine status (an
  ILLUSTRATIVE_ONLY status caps severity at MEDIUM); contradictions are
  rejected with `FIP_CONTRADICTORY_STATUS`.
- **Deterministic attachment** — the safety booleans (`asset.synthetic`,
  `evidence.stale`, `regime.is_assumption_not_observation`) are attached by
  the application after validation, never taken from the model.
- **Safety checks** — prohibited-phrase and authority-language screens; zero
  violations across the program.

Rejected documents are discarded — they are never shown as verified
intelligence. The public demo replays one accepted and one rejected case with
their actual recorded outcomes (see the Meta/FIP panel in the demo).

## 5. What the experiments measured

All measurements describe the authored synthetic 96-cell benchmark population
(not real borrowers) and are reported as **distinct experimental cohorts, not a
controlled head-to-head comparison**:

| Cohort | Result |
|---|---|
| Narrative era (pre-FIP, 2026-11-01) | 0/5 validated — every prompt failed early phrase-gate safety validation |
| FIP V2 12-case pilot | 9/12 validated (3 rejected: severity-vs-status contradictions on clean stressed cases) |
| FIP V2 60-case study | 45/60 validated; median latency 8.22 s; blocked 30/30; clean 15/30 |
| FIP V2 21-case completion study | 16/21 validated; blocked 14/14; clean 2/7 |
| **Combined FIP V2 studies** | **70/93 = 75.3% validated · blocked-status 50/50 · clean-status 20/43** |
| Evidence-citation precision | **100% among validated outputs** — every cited fact existed in the supplied projection |
| Conditional classification accuracy | 100% among validated outputs |
| Safety incidents | 0 |

Every figure above was recomputed directly from the receipt ledger on
2026-11-03 and matches the committed research addendum exactly.

## 6. How execution can be verified

- **In this repository:** the deployed demo's Meta/FIP panel shows two
  receipt-backed replay cases with request digests, and `EVIDENCE.md`
  documents the property-evidence provenance separately.
- **On request to the organizers or Fireworks AI:** the complete sanitized
  execution ledger — per-receipt approval IDs, request SHA-256 digests,
  execution timestamps, token usage, latency, validation outcomes and
  cost-metering — is available for authorized inspection. It identifies the
  Fireworks account, the exact model ID and endpoint, and the full request
  lineage for all 120 authorized inferences.
- Model-answer documents are **discarded by design** (only structural
  outcomes, grader booleans and metadata are retained), so no proprietary
  or licensed content is needed to audit the runs.

## 7. Eligibility status — honest statement

Per the published hackathon prize table, the Best Build on Meta Open Weight
Models bonus is for projects "built using Muse Glimmer or Muse Spark Open,
served on participants' own hardware or through partner-provided inference,"
with projects flagged during the first judging round and **the infrastructure
partner verifying** that the project runs on an eligible open-weight model.

THAL3S 16 used Muse Spark Open served by Fireworks AI — an eligible model via
partner-provided inference. **No official eligibility determination has been
made or confirmed by the organizers or by Fireworks AI.** The evidence above
is provided so that the infrastructure partner can perform that verification;
outstanding requirements (if any) — such as a partner attestation form or a
specific submission field — have not been published and will need to be
confirmed with the organizers.

