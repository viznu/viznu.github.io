---
title: Research
---

## Alignment monitoring & evaluation

Independent experimental work, all public on GitHub:

- **[jspace-obfuscation](https://github.com/viznu/jspace-obfuscation)** —
  does the J-space (Jacobian-lens) oversight channel survive the optimization
  pressure that collapses chain-of-thought monitoring? When a model is pressured
  to hide a load-bearing concept from its CoT, does that concept stay detectable
  in the J-space — the *disposition to verbalize* rather than the verbalization
  itself — and at what task cost? A compute-independent testbed (built, runs,
  13 tests green) with GPU lens-fitting and Qwen rollouts behind a swappable backend.
- **[sandbag-bench](https://github.com/viznu/sandbag-bench)** —
  can a model's own internals give away deliberate underperformance? A
  natural-language-autoencoder readout of Qwen2.5-7B-Instruct's layer-20
  activations is handed to a *blinded* extractor that never sees the model's
  answer, and asked to separate a prompted sandbagger from a control that is
  genuinely failing at low elicitation. The calibration gate passed — 0.755
  agreement, Wilson LB95 0.691, on 200 base-correct MMLU items — and the
  detection experiment itself is scaffolded but not yet run.
- **[contrastive-activation-trajectories](https://github.com/viznu/contrastive-activation-trajectories)** —
  a controlled study of contrastive vs. non-contrastive representation
  learning over a target LLM's internal activations, for monitoring
  alignment-relevant behavioral state. Arrived at a careful methodological
  negative result: on Instructed-Pairs (Qwen2.5-3B), the contrastive
  objective is not load-bearing — untrained PCA matches it — with stress
  tests documenting why.
- **[jepa-alignment-probe](https://github.com/viznu/jepa-alignment-probe)** —
  parked, and public as the record of what did not work. The JEPA-over-activations
  line the contrastive work grew out of: masked-layer prediction encoders, and
  JEPA-SCORE as a Jacobian-density anomaly detector over activation trajectories,
  which came out at AUROC ≈ 0.50 across every variant tried and was confirmed by
  a mirror-invariance check on the encoder's Jacobian singular values.
- **[alignment-measure](https://github.com/viznu/alignment-measure)** —
  does data curation alone produce a measurable alignment delta in
  fine-tuned small models? Same base model, identical hyperparameters,
  human-chosen vs. human-rejected training data (Anthropic hh-rlhf),
  evaluated on truthfulness, toxicity, and bias benchmarks.

## Multi-agent dynamics & oversight

- **[bluedot-adversarial-dynamics](https://github.com/viznu/bluedot-adversarial-dynamics)** —
  can a population of LLM agents coordinate trustworthily when no single node can
  be trusted? Two experiments approach it from opposite ends. The first inserts an
  **audit agent** into a competitive sales loop — El & Zou's "Moloch's Bargain"
  setup, adapted to inference-time best-of-N pressure — and asks whether it repairs
  the deception equilibrium, and what that costs in false positives on honest
  pitches and in lost sales. The second treats the tipping threshold of Ashery et
  al.'s LLM naming game as an **attack surface**: how small can an adversarial
  committed faction be and still capture the population's convention? Before a
  convention forms, 2 of 24 agents captured it in every run tested — no failing
  faction size was found, so the threshold sits somewhere below 8% and is still
  unmeasured. Small samples throughout, and reported as working pipelines rather
  than settled numbers.
- **multi-agent-testbed** — *in progress, not yet public.* A framework-neutral,
  event-sourced testbed for controlled multi-agent experiments. Every meaningful
  action is an append-only event, and what any individual agent could see is a
  *projection* of the omniscient log — so "did this agent act on information it was
  never supposed to have?" becomes an answerable question. Every multi-agent
  configuration must name a compute-matched single-agent baseline; orchestration
  patterns propose routing but only the World commits it; reproducibility is
  declared per component rather than promised; and a crashed controller, an
  exhausted budget, and a failed task stay three distinct terminal states. The
  contracts layer and an end-to-end vertical slice run today.

## AI application security

At **NuGuard AI** I'm building an AI application security framework that assesses
agentic LLM systems across SBOM graph analysis, static analysis, automated
red-teaming, and policy validation — including an adversarial testing layer with
multi-turn attack scenarios and canary-based detection of data exfiltration and
out-of-scope agent behavior. The CLI is open source:
**[NuGuardAI/nuguard](https://github.com/NuGuardAI/nuguard)**.

Alongside it:

- **Insider Honeypots** — my team's project for the
  [Heron AI Security Research Fellowship](https://www.heronsec.ai/researchfellowship),
  Autumn 2026 cohort. Runs September–November 2026.
- **[training-data-custody](https://github.com/viznu/training-data-custody)** —
  chain of custody for the *cleaning* side of training data. Proof-of-Learning and
  friends can show a model was trained only on a specified dataset, but treat that
  dataset as a trusted input; this asks the prior question of whether its contents
  went through the processing they claim. A per-datum signed record (`input_hash`,
  `output_hash`, transform chain, pipeline version), Merkle-batched under one
  ed25519 manifest signature whose signed leaf count is what makes completeness
  checkable. The verifier is stateless and offline. A demo runs eight attacks —
  tampering, forgery, substitution, off-pipeline injection, cherry-picking and
  three more — against it, including the two it deliberately does not stop.

## Research tooling

- **paper-atlas** — *in progress, not yet public.* An overlay map of science,
  applied to a personal library. It renders the ~250 subfields and ~4,500 topics of
  [OpenAlex](https://openalex.org) as a honeycomb laid out so citation-neighbours
  sit together, projects a Zotero library onto it, and surfaces the "frontier"
  territories — heavily cited by what you've read, but under-read themselves. On the
  same data it builds a reading desk: fresh arXiv papers at the intersection of an
  interest profile and the library's own topics, works the library cites most but
  doesn't own, and recent output from a configurable list of researchers. Runs
  locally, no account, no API key for the core.

## Fellowships & research training

- **Heron AI Security (Apart Research) — AI Security Research Fellowship** · Autumn
  2026. A three-month team fellowship pairing cybersecurity practitioners with
  frontier AI safety researchers, across AI infrastructure and hardware security,
  technical AI governance, adversarial and model security, AI control and
  containment, and cybersecurity evaluations. Project: **Insider Honeypots**.
- **MIT AI Alignment — AI Safety Fundamentals Fellowship** · 2026–present. Independent
  researcher; interpretability, RLHF, goal misgeneralization, eliciting latent knowledge,
  and scalable oversight.
- **BlueDot Impact — Frontier AI Governance** · 2026. Governance, policy, and regulation of
  frontier AI. [Certificate](https://bluedot.org/certification?id=recTitSUQ0kCDwSiH).
- **BlueDot Impact — Technical AI Safety** · 2026. Alignment research methods and threat
  models; course project was
  [bluedot-adversarial-dynamics](https://github.com/viznu/bluedot-adversarial-dynamics).
  [Certificate](https://bluedot.org/certification?id=recavPsHJLszbzkAS).
- **BlueDot Impact — AGI Strategy** · 2026. Deployment risk, timelines, and strategy.
  [Certificate](https://bluedot.org/certification?id=recrXFAnedDvtUUBf).

## Academic Projects

- **Quantum-Computing-Resistant Cryptographic Scheme** (2017, JHU) — M.S. thesis
  implementing a post-quantum scheme in Go.
- **Traceability of Monero Transactions** (2017, JHU) — graph-based traceability in
  privacy-preserving cryptocurrencies.
- **Malware Analysis & Classification with ML** (2016, JHU) — classifying malware families
  and behavior.
- **Semi-Supervised Detection of Malicious Outlier Traffic** (2016, JHU) — Spark on AWS over
  large-scale network data.
- **Social Media Security & Threat Analysis** (2016, JHU) — Twitter bot detection.
- **Inference of IoT / SCADA Device Manipulation** (2016, JHU) — from AWS CloudWatch logs.
- **Panacea — ML Clinical Decision Support** (2015, C-DAC) — applied ML for clinical decisions.
- **IoT Wireless Sensor Mesh for Farmland** (2013, VIT) — ZigBee-based remote agricultural monitoring.

<!--
Hidden from the page, kept here so it's easy to restore — delete the comment
markers to bring it back.

*GRE — Quant [170/170, 99th percentile](https://imfs.yolasite.com). GATE — 98th
percentile (India rank ~1,500 / 200,000).*
-->
