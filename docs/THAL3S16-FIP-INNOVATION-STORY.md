# From Financial Language Ambiguity to Machine-Readable Intelligence: The Development of THAL3S 16 FIP

*A judge-facing engineering account. All measurements below are live,
founder-authorized, receipt-backed observations of the Muse Spark Open
model (Meta) served through Fireworks AI. Every number is traceable to
a sanitized receipt in the project ledger.*

---

## 1. The business problem

Owners of illiquid assets — luxury property, concentrated equity,
private holdings — frequently hold substantial value they cannot
convert into working liquidity. The THAL3S 16 platform addresses this:
a seven-stage assessment pipeline that takes a verified fact
projection of a client's assets and produces an *indicative liquidity
capacity* — never a loan, never an authorization. A deterministic
Credit Engine computes every figure; human committees own every
decision.

## 2. Step 4 and the safety-validation challenge

Stage 4 of the seven-stage pipeline asks a large language model to
interpret the engine's verified facts: explain the evidence, surface
uncertainty, rank review priorities, and articulate counterfactual
risks. The challenge: the model must do this **without ever producing
lending-authority language** — no approval, no issuance, no funding
authorization. A frozen validator enforces ten prohibited-phrase
boundaries, because a document that even *sounds* like an authorization
is a legal and product hazard.

## 3. The initial prohibited-phrase failures

The first live attempts failed immediately: every response tripped the
phrase gate with `SAFETY_VIOLATION`. Five consecutive authorized
canaries on the same frozen scenario (`mb384-008`) were rejected,
costing roughly 31,000 micro-USD in estimated inference — with zero
validated documents. The natural reading — "the model claims lending
authority" — turned out to be wrong.

## 4. The confirmed false-positive mechanism

A founder-authorized single-call diagnostic with encrypted,
time-boxed evidence retention revealed the truth: the model had
written the phrase *"funding authorized"* **twice, both times negated**
("funding authorized is false…"). The validator was a substring
matcher — it saw the phrase and rejected, blind to negation. Offline
reconstruction then confirmed a second false-positive class:
"trailing-falsity" sentences (an authority-flag named *and immediately
declared false* in the same clause) that a context-blind scanner
cannot distinguish from an authorization.

## 5. Prompt-contract experiments and their limits

Two successive prompt rewrites (V3: forbid the phrases explicitly; V5:
strip all lending vocabulary from the prompt and render the authority
notices deterministically in the application) both produced
schema-perfect responses that **still tripped the phrase gate**. The
lesson: as long as the model is asked to write *prose about lending
boundaries*, it will occasionally produce sentences a conservative
scanner must reject.

## 6. Context-aware validation and its remaining limits

A contextual validator (V4) classified negated, quoted, conditional and
ambiguous occurrences instead of matching substrings, and eliminated
the confirmed false-positive classes in an adversarial corpus. But it
could not solve the deeper problem: **prose itself is ambiguous**, and
every layer of contextual interpretation adds a failure surface the
benchmark has to debug.

## 7. The founder's idea: stop asking for words

The pivotal move was founder-originated: if the difficulty is *language
about finance*, stop asking the model to produce financial language.
Ask for **numeric codes and bit representations** instead — a compact,
versioned, machine-checkable vocabulary — and let the application
render all human-facing text deterministically.

## 8. FIP V1: a machine-readable contract

The Financial Intelligence Protocol V1 defined: enumerated
`status`/`regime`/`evidence`/`missing-information`/`abstention`/
`counterfactual` codes in an immutable digest-pinned registry; the
thirteen policy risk dimensions (verbatim from the engine) as codes
1–13 with explicit bit positions; integer severities with
`UNKNOWN` distinct from `NOT_APPLICABLE` (never silently zero); fact-id
evidence references validated against the projection; and two
comparable output contracts — **Numeric JSON** (568 bytes vs the
narrative's 1,992) and **Hybrid bitmask JSON** (546 bytes). Authority
fields became *structurally inexpressible*: no code, field or bit
exists by which the model could state them.

## 9. The inherited-schema discovery

The first live FIP request returned valid JSON that failed the FIP
contract. Root cause, found in the committed request bytes themselves:
the shared request builder had silently attached Fireworks' **native
JSON-Schema-constrained generation** pinning the *old narrative
schema* — the provider was grammar-forcing the model to emit
`executive_summary` while the prompt asked for numeric codes. The
constraint that should have guaranteed compliance guaranteed the
opposite.

## 10. Correcting constrained generation

Swapping the pinned schema for a strict FIP mirror (all keys required,
integer enums, explicit array bounds, `additionalProperties:false`)
made schema adherence a **provider guarantee**: from that point on,
every live response was schema-perfect. Structural failures ended
permanantly.

## 11. The fact-restatement discovery

With structure solved, a new failure surfaced: schema-perfect
documents asserting a deterministic boolean *wrong* (the model asserted
`evidence.stale = TRUE` against frozen facts saying `FALSE`) — twice,
including once with an explicit "copy the booleans exactly"
instruction. The model occasionally *re-states facts it was given*
incorrectly.

## 12. FIP V2: interpretation without restatement

The architectural conclusion: **never ask the model for anything the
application already knows.** FIP V2 removed fact restatement from the
model's contract entirely; the three verified booleans are attached
deterministically from the frozen projection after validation. The
model now contributes only what it is for: risk interpretation —
dimension selection, severity judgment, evidence emphasis — with all
authority, human-review notices and financial figures rendered by the
deterministic application.

## 13. The first validated live assessment

The first live FIP V2 document to pass every unchanged
financial-integrity gate arrived on a *blocked, stale-evidence* case —
exactly the elevated-risk shape the earlier clean-case failures
suggested the model kept reaching for: correct `BLOCKED` status,
correct `STALE` freshness, 100% evidence-grounding precision, zero
prohibited phrases.

## 14. The 12-case and 60-case live benchmarks

Two founder-authorized studies ran the frozen FIP V2 contract on
independent, balanced selections from the 96-cell synthetic benchmark
grid (4 client profiles × 4 portfolio structures × 6 economic regimes):

| Measurement | 12-case pilot | 60-case study |
|---|---|---|
| Attempted | 12 | 60 |
| Validated | 9 (75%) | **45 (75%, Wilson 95% [62.8, 84.2])** |
| Rejected | 3 — all clean cases, all severity-vs-status | **15 — all clean, all severity-vs-status** |
| Blocked-case completion | 6/6 | **30/30 (100%)** |
| Conditional classification accuracy | 9/9 | **45/45 (100%)** |
| Evidence-grounding precision | 100% | **100% on all 45** |
| Median end-to-end latency | 8.54 s | **8.22 s** (p95 12.82 s) |
| Estimated provider cost | 83,275 µUSD | **377,681 µUSD** |

All 15 study rejections were the *same* category: the model assigned
**HIGH severity to a risk dimension on a case whose deterministic
engine status is clean** — and every rejection occurred on a clean
case under a *stressed* economic regime (clean-under-stress: 5/20
validated vs clean-under-normal/recovery: 10/10; Fisher p = 0.0002).
The clean-vs-blocked completion difference (50% vs 100%) is
statistically significant **within the authored synthetic benchmark**
(Fisher p = 0.00001); **generalization to real borrowers is entirely
unestablished.**

## 15. The remaining disagreement and the FIP V3 proposal

The one remaining gap between model and engine is severity *calibration*
(20/64 agreement among scored dimensions against illustrative,
pre-calibration thresholds). FIP V3 — a **proposed design, not
implemented or validated** — keeps both voices: the AI's severity and
the engine's threshold-measured severity, side by side with evidence
references and an explicit `AGREE/AI_HIGHER/AI_LOWER` disagreement
indicator, routing unresolved conflicts to mandatory human review. It
would convert today's rejection class into a measured, auditable
signal.

---

## Timeline (evidence-linked)

```
2026-10-29  Narrative benchmark era: single-call architecture verified (R11),
           multi-part prompts deterministically overrun (v1 finding)
2026-11-01  5 live canaries on mb384-008 -> ALL rejected SAFETY_VIOLATION
           (~31,000 uUSD est)                     [ledger receipts]
11-01 night Encrypted one-call diagnostic: phrase "funding authorized"
           NEGATED x2 -> FALSE POSITIVE confirmed [evidence 482db47a..., purged]
11-02 00:xx Trailing-falsity FP class confirmed offline; contextual V4
           validator built; V3/V5 prompt rewrites measured (still tripped)
11-02 01:xx FIP V1 designed (numeric enums, 13 dimensions, bitmasks)
11-02 01:xx FIP V1 live: response valid JSON, wrong keys -> root cause
           found IN THE REQUEST BYTES: provider pinned the OLD NARRATIVE
           schema via response_format  [commit bd38050 lineage]
11-02 02:xx FIP V1.1 strict-schema probe: schema-perfect, REJECTED on a
           contradictory fact assertion           [receipt ec211af1...]
11-02 02:xx FIP V1.2 canary: same class, DIAGNOSED via sanitized diagnostic:
           evidence.stale TRUE vs FALSE           [receipt 3a7e66dc...]
11-02 03:xx FIP V2 (deterministic fact attachment) designed + verified
11-02 04:xx FIP V2 canary on clean mb384-008: REJECTED severity-vs-status
           (rule provenance: engine trigger POL-A-026, sound)
11-02 04:xx FIP V2 risk canary on BLOCKED/stale mb384-010: FIRST VALIDATED
           LIVE FIP DOCUMENT                      [receipt eab7b792...]
11-02 05:xx 12-case pilot: 9/12 validated; 3 clean+stressed rejections
11-02 06:xx 60-case study: 45/60 validated (75%); all 15 rejections
           clean+severity-vs-status; pattern statistically confirmed
```

## Architecture (current, measured)

```
                    VERIFIED FACT PROJECTION (frozen, synthetic)
                                  |
        +-------------------------+-------------------------+
        |                                                   |
  Deterministic Credit Engine                        FIP request (V2)
  (sole financial authority)              strict provider JSON Schema
  - capacity, LTV, haircut                 + frozen facts in prompt
  - status BLOCKED/REVIEW/CLEAN            + numeric-code instruction
  - authority quartet (always false)                    |
  - human review (always true)              Muse Spark Open (Meta)
        |                                  via Fireworks AI
        |                                               |
        |                              10-key numeric JSON (schema-forced)
        |                                               |
        |                        unchanged fail-closed validators
        |                        (codes/enum/bounds/consistency/
        |                         evidence allowlists/authority absence)
        |                                               |
        +------------------> ASSESSMENT ENVELOPE <------+
                               |            |
                     deterministic fact    model risk interpretation
                     attachment (booleans) (dimensions/severity/evidence)
                               |            |
                     deterministic render: notices, explanations
                     (authority + human review, application-rendered)
```

## 14b. Census completion (the final measurement)

The 21-case cell-completion study (the 21 remaining cells, one
authored-baseline case each) validated 16/21; its 5 rejections were
again all clean-status severity-vs-status contradictions. This closes
the grid: **96/96 cells carry at least one live measurement (94 under
FIP V2; 2 pre-FIP-era-only cells excluded from re-measurement by the
frozen non-reuse discipline)**. Cell-level FIP V2 outcomes: 71/94
cells produced at least one validated document; blocked cells 51/51
(100%); clean cells 20/43 (46.5%). Combined case-level studies: 70/93
validated (75.3%), conditional accuracy 70/70, grounding precision
100%, severity agreement 27/102 against pre-calibration illustrative
thresholds, zero safety incidents. Population completion is now
*measured exactly* — no inference needed within the fixture.

## What is established, and what is not

- **Historical failures:** five phrase-gate rejections; an
  inherited-schema structural failure; two fact-restatement failures;
  fifteen severity disagreements. All receipt-backed.
- **Confirmed causes:** substring validation blind to negation; the
  request pinned the wrong schema; the model occasionally re-states
  supplied facts wrongly; the model over-attributes HIGH severity on
  clean cases under stressed regimes.
- **Proposed explanations (labeled):** stressed-regime context primes
  the model toward elevated risk language — plausible, not proven.
- **Measured improvements:** schema-constrained generation eliminated
  structural failures permanently; deterministic attachment eliminated
  fact-restatement failures permanently; conditional classification
  accuracy is 100% (45/45) on validated documents; grounding precision
  100%; zero safety incidents across all 98 live FIP-era requests.
- **NOT claimed:** model superiority over any other model;
  statistically validated token savings (sizes measured, savings not
  inferenced); production funding capability of any kind. The
  benchmark is an authored synthetic census; real-borrower
  generalization is unestablished.
