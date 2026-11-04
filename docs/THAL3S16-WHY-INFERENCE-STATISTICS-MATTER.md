# Beyond AI Benchmarks: Why Inference Statistics Matter in Private Credit

**THAL3S 16 · Financial Intelligence Protocol (FIP) · Cygnus-A² Research & Development**

> **How can we know whether an AI model is reliable enough to contribute to a financial decision involving millions of dollars?**

That question—not a leaderboard position—motivated our Meta-model experiments during the 2026 hackathon.

## A fast answer is not necessarily a trustworthy one

*Inference* is the process by which a trained model interprets new input and produces an output. **Inference statistics** measure what happens across executions: how often outputs pass independent checks, which failures recur, whether cited evidence supports a claim, how risk interpretations vary, and how much time and computation the system uses.

General-purpose model benchmarks for reasoning, coding, mathematics or latency are useful, but they do **not** by themselves establish suitability for private credit. A convincing response can still misread a lien, confuse net worth with cash availability, treat stale evidence as current, invent a missing fact or overstate a borrower's risk.

**In private credit, the consequence of a wrong interpretation matters as much as the apparent quality of the answer.**

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

## From model selection to an R&D discipline

We used **Meta Muse Spark Open**, served via **Fireworks AI**, because it offered a usable inference route with structured output constraints and auditable execution metadata during the competition. We did not establish that it outperforms other Meta models.

Our next research direction is a consistent **THAL3S 16 Model Evaluation Framework**: matched financial scenarios across models, repeated runs, evidence-validity tests, calibration analysis, tail latency, cost per accepted output, privacy/security testing and explicit safety thresholds.

**Safety must be a qualification gate, not simply another weighted score.** A faster or cheaper model should not be preferred if it cannot reliably respect financial-integrity constraints. It is also possible that different models will prove suitable for different financial tasks—something future comparative studies must establish.

## The Cygnus-A² R&D principle

Research and development is not an accessory to our financial platform. It is how we decide **whether and where AI should be used**.

> **In private credit, AI intelligence must not only be powerful. It must be measurable, verifiable, secure and accountable.**

Our hackathon work is an initial, bounded demonstration of that philosophy: measure failures, investigate causes, engineer controls, and keep uncertainty visible.

---

**Research provenance:** [FIP Innovation Story](THAL3S16-FIP-INNOVATION-STORY.md) · [FIP Research Addendum](THAL3S16-FIP-RESEARCH-ADDENDUM.md) · [Meta Open Weights Execution Evidence](../META_OPEN_WEIGHTS_EVIDENCE.md) · [Live research-replay demo](https://cygnusa2.github.io/thal3s16-hackathon-public-submission/).

*Research only: synthetic borrower scenarios; recorded live model benchmarks; no real credit approval, token issuance, funding, or proof of a sub-15-minute financial transaction.*
