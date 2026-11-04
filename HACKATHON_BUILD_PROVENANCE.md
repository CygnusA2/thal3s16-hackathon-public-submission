# THAL3S 16 — Hackathon Build Provenance

**Meta Global AI Developer Hackathon 2026 · Development window: 26 October–4 November 2026 (as stated in event materials)**

This document distinguishes prior preparatory engineering from work performed during the hackathon. **The date a file was committed to this public repository is not, by itself, proof of the original creation date of its contents.** This public submission was created on **3 November 2026** to package a curated demonstration, not to imply that the entire underlying project originated that day.

## Founder context — why preparation began early

I am the founder of Cygnus-A², with a bachelor's degree in **Finance, Banking and Insurance**, rather than a formal software-engineering background. This was my **first hackathon**. Before the October 26 start, I was uncertain how much engineering effort a ten-day competition would require, whether I could complete a credible demonstration within that time, and how to organize the work responsibly.

For that reason, I began preparing on October 19: exploring the model-access and test setup, assembling a limited synthetic collateral-assessment baseline, studying integration constraints and establishing basic safety checks. This preparation was intended to reduce avoidable setup risks so I could use the official competition window for substantive development and experimentation—not to present earlier work as if it had been created during the event.

**The distinction is intentional and auditable:** October 19 code and tests are identified below as pre-existing; work from October 26 onward is documented separately through dated commits, research receipts and development artifacts. I believe transparency about both the preparation and the competition-period innovations is more useful to judges than an inaccurate claim that the entire technical foundation was built in ten days.

## Before the hackathon — existing foundation

Cygnus-A²'s **private** engineering repository `CygnusA2/thal3s16-meta-hackathon-2026` was created on **19 October 2026**, before the event's build window. Its October 19 commits include a synthetic-only deterministic collateral assessment baseline, an early Muse Spark explanation/provider adapter, safety and offline tests, smoke-test infrastructure, and preflight/planning documentation. These components constitute **pre-existing preparation**; they are **not claimed as hackathon-created inventions**.

A dated private baseline at commit `1828f1af44dfeca41043aecc95095d4dc7385dd4` is referenced in `docs/HACKATHON_NEW_WORK_2026-10-26.md`, which explicitly distinguishes the 17-test existing baseline from new October 26 work. The underlying private history and test records can be reviewed through an appropriately authorized verification process; private source code and credentials are not published here.

## Work documented during the hackathon

| Period (UTC) | Development and evidence | Public verification or internal provenance |
|---|---|---|
| **26 October** | New synthetic ATTOM–Cotality identity/evidence reconciliation; bounded fact-grounding checks, deterministic assessment replay, structured Meta-model contract readiness and offline demo preparations. | Private dated commits beginning `c808a44d`; `docs/HACKATHON_NEW_WORK_2026-10-26.md` explicitly records additive new files and baseline separation. |
| **27–31 October** | Continuing assessment, California scenario/frontend, infrastructure and benchmark integration work across private development branches. | Private dated commit history and test artifacts; details subject to source verification, not a claim that every reused component was newly authored. |
| **1–2 November** | Muse Spark Open experiments served by Fireworks AI, including the FIP V2 structured-validation studies. | [Meta Open Weights Execution Evidence](META_OPEN_WEIGHTS_EVIDENCE.md): dated authorization/receipt summaries. The public demo shows **recorded replay**, not live inference. |
| **3 November** | Public submission packaging; 30 verified ATTOM area-reference addresses paired with 30 illustrative AI-generated mansion photographs; public property evidence disclosures; judge-facing Meta/FIP research-replay presentation. | This repository's dated commits; [Property Evidence](EVIDENCE.md); the [interactive demo](https://cygnusa2.github.io/thal3s16-hackathon-public-submission/). |
| **4 November** | Final review, provenance disclosure and submission preparation. | Dated commits and release records as available. |

## Components that must not be conflated

- **Existing engineering vs new development:** The pre-October-26 assessment and early model adapter are a foundation. Competition-period evidence reconciliation, FIP experiments, frontend integration and research documentation are separately dated activities. Some files in the public package were recovered or adapted from prior development snapshots; their public Git commit times alone do not demonstrate original authorship.
- **Real property identities vs synthetic scenarios:** Thirty real California area-reference addresses were checked privately against ATTOM. The mansion images, fictional clients, portfolios and credit calculations are **illustrative or synthetic**, not claims about the real owners or buildings depicted.
- **Actual model inference vs recorded replay:** Fireworks-hosted Meta Muse Spark Open calls were made during the hackathon according to the dated execution ledger. The browser's accepted/rejected FIP examples replay **sanitized recorded outcomes** and do not call the model when a visitor selects a property.
- **Financial calculations vs model interpretation:** Deterministic code is authoritative for indicative financial quantities. The model interprets bounded evidence under FIP constraints; no actual loan approval, token issuance, legal closing or funding is demonstrated.

## Auditability and limitations

- The public repository's `main` history begins **3 November 2026**; the reviewed commits on that branch were dated within the event window. This does **not** establish that all contents were first created during that period.
- The earlier private development history includes **19 October 2026** work. It has **not** been rewritten, erased or reclassified as new work.
- The full private benchmark harness, receipts, restricted provider records, credentials and proprietary internal source are not published. The public examples and evidence documents are curated subsets; reproduction of every private experiment from this repository alone is not possible.
- **Eligibility depends on the organizers' accepted Official Rules.** This provenance statement is disclosure, not an organizer determination that any pre-existing component is permitted or that the project is eligible for an award.

For further evidence see [README](README.md), [Meta Open Weights Execution Evidence](META_OPEN_WEIGHTS_EVIDENCE.md), [Property Evidence](EVIDENCE.md) and the [FIP Research Addendum](docs/THAL3S16-FIP-RESEARCH-ADDENDUM.md).
