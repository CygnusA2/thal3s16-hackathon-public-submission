# Beyond AI Benchmarks: Why Inference Statistics Matter in Private Credit

**THAL3S 16 · Financial Intelligence Protocol (FIP) · Cygnus-A² Research & Development**

> **How can we know whether an AI model is reliable enough to contribute to a financial decision involving millions of dollars?**

That question—not a leaderboard position—motivated our Meta-model experiments during the 2026 hackathon.

## A fast answer is not necessarily a trustworthy one

*Inference* is the process by which a trained model interprets new input and produces an output. **Inference statistics** measure what happens across executions: how often outputs pass independent checks, which failures recur, whether cited evidence supports a claim, how risk interpretations vary, and how much time and computation the system uses.

General-purpose model benchmarks for reasoning, coding, mathematics or latency are useful, but they do **not** by themselves establish suitability for private credit. A convincing response can still misread a lien, confuse net worth with cash availability, treat stale evidence as current, invent a missing fact or overstate a borrower's risk.

**In private credit, the consequence of a wrong interpretation matters as much as the apparent quality of the answer.**

### From a single inference to a defensible evaluation

When THAL3S 16 receives a structured evidence packet, a trained model can interpret facts about a property, existing debt, cash flow and macroeconomic conditions. That execution is **inference**. The output might identify risk dimensions, cite facts and describe uncertainty. It is not a valuation, an underwriting approval or authorization to disburse funds.

Inference statistics quantify behavior over a **defined evaluation population**, rather than relying on an impressive isolated response. Useful measurements include:

- **Attempt-level validation:** the fraction of all attempted responses that satisfy required schema, grounding and integrity gates.
- **Conditional accuracy:** correctness *only among responses accepted by the validator*; this must not be misrepresented as accuracy over all attempted requests.
- **Error and abstention taxonomy:** why a response failed, including unsupported facts, incorrect numeric references, inconsistent severity, missing evidence or explicit abstention.
- **Distributional reliability:** which portfolio structures, economic conditions and edge cases produce the most failures.
- **Latency and economics:** median and tail response time, tokens consumed, provider costs and the effective cost per validated outcome.
- **Security and governance:** whether unauthorized instructions, sensitive records or prohibited decision language can cross the application's boundary.

**Inference statistics are observations, not the full scientific method.** An evaluation framework must also specify ground truth, sampling, experimental controls, repeated trials, acceptance thresholds and what can or cannot be generalized. Cygnus-A² needs both.

A simplified research flow is:

`Frozen financial evidence → model inference → structured output → FIP validation → outcome ledger → statistics → researcher review`

The application computes authoritative financial quantities separately. A model answer that passes syntax checks is not automatically a true or safe financial conclusion.

## Why Cygnus-A² measures more

Ultra-high-net-worth portfolios may combine real estate, private holdings, cash-flow obligations, secured debt and assets with uncertain liquidation timelines. Model assessment must therefore consider more than average answer accuracy.

| Evaluation dimension | The question we must answer |
|---|---|
| **Financial correctness** | Is the interpretation consistent with verified evidence and authoritative deterministic calculations? |
| **Grounding and uncertainty** | Does every material claim have supporting facts, and does the model abstain when evidence is missing or conflicting? |
| **Risk calibration** | Does the model exaggerate or understate risks under recession, interest-rate shocks or liquidity stress? |
| **Safety and authority** | Can an inconsistent or unauthorized conclusion be stopped before a human sees it as validated intelligence? |
| **Latency and economics** | What is the time and **cost per validated assessment**, not just per API call? |
| **Security and governance** | Are confidential data, access controls and human decision boundaries protected? |

These are research objectives and proposed evaluation dimensions, **not claims that all six have been validated for production use**.

### Conventional benchmarks versus domain-specific requirements

General-purpose AI benchmarks often assess mathematics, reasoning, coding, instruction following, latency or token efficiency. These are useful signals of model capability. Yet a high score does not establish competence in evaluating the position of an ultra-high-net-worth borrower.

| Typical general-purpose question | Additional private-credit question |
|---|---|
| Can the model solve a reasoning problem? | Can it interpret collateral evidence without unsupported assertions? |
| Is the answer correct? | Are its claims tied to authoritative documents and deterministic financial calculations? |
| Is inference fast? | Is **validated** risk interpretation delivered within the operational decision budget? |
| How many tokens are used? | What is the full cost per usable result, including failures, retries and review? |
| Does it follow instructions? | Does it preserve lending-authority restrictions and abstain when appropriate? |
| How good is average performance? | What happens under stressed markets, contradictory sources and unusual portfolios? |

### Why UHNW portfolios make the problem harder

A hypothetical client might control $200 million in assets yet have limited ready cash. Those holdings could span residences, investment property, private businesses, artwork, aircraft, yachts or gold. Different assets introduce different valuation methodologies, transfer restrictions, title and lien requirements, collateral haircuts and exposure to economic cycles.

A model must distinguish **asset value from realizable collateral value**, **gross wealth from available liquidity**, **secured debt from unencumbered equity**, **net worth from debt-service capacity**, and **indicative capacity from authorized credit**.

An incorrect output may be subtle. A model could cite a legitimate property fact yet infer an unsupported collateral value, overlook a prior lien, use a stale record, or misread a temporary liquidity shortfall as an inability to repay. It could also assign excessive risk to an otherwise acceptable illustrative case.

**False acceptance and false rejection both matter.** False acceptance creates potential loss, regulatory and trust exposure; false rejection can unnecessarily prevent a viable client from accessing liquidity. The objective of R&D is to detect both patterns systematically **before** deploying models in high-stakes workflows.

## The discovery that changed our approach

THAL3S 16 keeps collateral calculations and indicative credit quantities **deterministic**. The model's bounded role is to interpret a frozen evidence packet, identify relevant risks and reference facts. Final lending authority remains with humans.

Our first five narrative-era model attempts produced **0/5 validated outputs**. Investigation showed a central failure mode: conservative phrase-based validation could reject *negated* lending-authority language as though it were an authorization. That was a problem at the boundary between language and validation—not proof that the model had actually approved a loan.

We developed **FIP (Financial Intelligence Protocol)** to replace ambiguous financial prose with versioned numeric codes, structured outputs, fact references and independent fail-closed validation.

### What the measured inferences revealed

| Measured result | Observation | Research meaning |
|---|---:|---|
| Main FIP V2 validation | **70/93 (75.3%)** | A measurable completion rate, **not** universal reliability. |
| Blocked-status cases | **50/50 validated** | Strong completion within the tested synthetic blocked cases. |
| Clean-status cases | **20/43 validated** | A substantially weaker result that demanded investigation. |
| Evidence-citation precision | **100% among validated outputs** | Every cited fact ID existed in the supplied projection; **this is not proof all financial conclusions were correct**. |
| Median study latency | **8.22 s** | Measured in the 60-case study; not a completed loan or end-to-end liquidity time. |
| Severity agreement | **20/64 (31.3%)** | Agreement with selected illustrative risk thresholds; a calibration gap, not production credit accuracy. |

The **clean-versus-blocked** difference was statistically significant *within our authored synthetic benchmark*. On some clean cases under stressed economic regimes, the model assigned HIGH severity where the deterministic engine's status allowed at most MEDIUM. FIP rejected those contradictions rather than silently passing them to users.

A single polished demo would not have exposed this systematic pattern. **Inference statistics did.**

The 0/5 narrative-era attempts and 70/93 FIP V2 attempts were **different experimental cohorts**, not a controlled head-to-head proof of improvement. These results used one live-tested model and synthetic cases; they do not establish real-borrower performance, model superiority or deployment-grade safety.

### Why the statistical result matters more than a polished demonstration

The FIP V2 case-type comparison was:

- **Blocked:** 50 of 50 synthetic attempts validated (100%).
- **Clean:** 20 of 43 synthetic attempts validated (46.5%).

The research addendum reports a statistically significant difference **within the authored synthetic benchmark**, not within a real-borrower population. In the 60-case study, clean-under-stress cases validated 5/20 compared with 10/10 clean normal-or-recovery cases, with Fisher's exact test reported as `p = 0.0002`.

The failure was not simply that the model produced an incorrect number. On certain clean stressed cases it assigned HIGH risk severity to a dimension where the illustrative deterministic engine permitted at most MEDIUM, creating a **severity-versus-status contradiction**. FIP correctly rejected that output.

This is an important distinction: an integrity gate can successfully prevent an invalid interpretation from being treated as verified while the underlying model still shows a calibration limitation. The validator's success does not erase the model's failure, and a model failure does not imply that every output is unsafe.

The research also measured **20/64 severity agreements (31.3%)** across the selected scored dimensions against illustrative thresholds. These thresholds had not been calibrated to real lending outcomes; therefore the result identifies an experimental disagreement, not production-grade credit risk accuracy.

**What inference statistics gave us:** a reproducible reason to investigate risk over-attribution and design a future evaluation method around it. FIP V3's proposed dual-severity comparison is a research proposal; it has not been implemented or validated as a solution.

## From model selection to an R&D discipline

We used **Meta Muse Spark Open**, served via **Fireworks AI**, because it offered a usable inference route with structured output constraints and auditable execution metadata during the competition. We did not establish that it outperforms other Meta models.

Our next research direction is a consistent **THAL3S 16 Model Evaluation Framework**: matched financial scenarios across models, repeated runs, evidence-validity tests, calibration analysis, tail latency, cost per accepted output, privacy/security testing and explicit safety thresholds.

**Safety must be a qualification gate, not simply another weighted score.** A faster or cheaper model should not be preferred if it cannot reliably respect financial-integrity constraints. It is also possible that different models will prove suitable for different financial tasks—something future comparative studies must establish.

### The six pillars of a future THAL3S 16 Model Evaluation Framework

The hackathon provided evidence for an initial methodology. Future R&D should explicitly evaluate six dimensions, each with traceable metrics and independent acceptance criteria.

**1. Financial correctness.** Compare model interpretations to source-verified collateral facts and deterministic outputs. Track numeric misstatements, misleading inferences and incorrect treatment of unavailable values. Keep models from creating authoritative valuations or credit limits.

**2. Safety and decision boundaries.** Measure false acceptances, false rejections, unsupported lending-authority claims, unsafe instructions and the ability to abstain or escalate. Critical breaches should trigger hard qualification failures, not simply lower an aggregate score.

**3. Evidence integrity and explainability.** Test whether sources exist **and** support the specific claim attributed to them. Distinguish citation precision from factual correctness. Require appropriate uncertainty labels where records are stale, incomplete or contradictory.

**4. Robustness across economic conditions.** Examine normal markets, higher interest rates, recession, asset-price decline, liquidity crisis and recovery. Test performance across different asset types, portfolios and property-market cycles. Measure systematic over- and under-estimation of risk rather than one average result.

**5. Operational efficiency.** Track p50 and p95 latency, completion rates, inference token counts, validation overhead, estimated and billed costs where available, and cost per **validated** interpretation. Reject unsupported claims of token savings: a smaller output byte size alone is not proof of lower billed cost.

**6. Security, privacy and governance.** Assess resilience against malicious instructions in documents, unauthorized data disclosure, inadequate access controls and unsafe use of external provider data. Preserve reproducible audit records, controlled model versions and mandatory human review.

These are proposed **future framework pillars**, not a claim that all six were fully measured during the hackathon or that the system is approved for regulated lending.

### Comparing Meta models scientifically

Future comparative tests may include Muse Spark Open, Muse Spark 1.3, Muse Wonder, Muse Glimmer and subsequent models **if appropriate access and inference routes are available**. To compare them fairly, Cygnus-A² should use matched inputs, identical frozen financial calculations, the same FIP acceptance rules, controlled generation settings where supported, recorded versions, repeated evaluations and transparent uncertainty intervals.

The comparison should answer two different questions:

1. **Qualification:** does a model satisfy minimum evidence, confidentiality, governance and safety requirements? A fast model that fails a critical safety requirement is not a suitable choice.
2. **Optimization among qualified candidates:** which model produces a higher share of useful verified interpretations for a given task, at acceptable latency and cost?

A future architecture may find that models differ by task: some better at document interpretation, others at economic risk reasoning or client-facing synthesis. **Model routing by demonstrated competence** is a potential outcome of future research, not a present hackathon capability.

### Continuing research after the hackathon

A practical future research program should preserve the exact synthetic benchmark and its limitations; add independently designed cases, broader asset classes and varied evidence-quality regimes; run controlled matched-model evaluations; improve calibration thresholds with appropriately governed data; and assess privacy, security and operational performance before any production trial.

Any use of real borrower information would need separate permission, data governance, regulatory analysis and validation. None of the current results authorizes a credit decision or demonstrates end-to-end lending.

## The Cygnus-A² R&D principle

Research and development is not an accessory to our financial platform. It is how we decide **whether and where AI should be used**.

> **In private credit, AI intelligence must not only be powerful. It must be measurable, verifiable, secure and accountable.**

Our hackathon work is an initial, bounded demonstration of that philosophy: measure failures, investigate causes, engineer controls, and keep uncertainty visible.

---

**Research provenance:** [FIP Innovation Story](THAL3S16-FIP-INNOVATION-STORY.md) · [FIP Research Addendum](THAL3S16-FIP-RESEARCH-ADDENDUM.md) · [Meta Open Weights Execution Evidence](../META_OPEN_WEIGHTS_EVIDENCE.md) · [Live research-replay demo](https://cygnusa2.github.io/thal3s16-hackathon-public-submission/).

*Research only: synthetic borrower scenarios; recorded live model benchmarks; no real credit approval, token issuance, funding, or proof of a sub-15-minute financial transaction.*
