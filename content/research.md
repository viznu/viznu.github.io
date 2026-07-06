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
- **[contrastive-activation-trajectories](https://github.com/viznu/contrastive-activation-trajectories)** —
  a controlled study of contrastive vs. non-contrastive representation
  learning over a target LLM's internal activations, for monitoring
  alignment-relevant behavioral state. Arrived at a careful methodological
  negative result: on Instructed-Pairs (Qwen2.5-3B), the contrastive
  objective is not load-bearing — untrained PCA matches it — with stress
  tests documenting why.
- **[alignment-measure](https://github.com/viznu/alignment-measure)** —
  does data curation alone produce a measurable alignment delta in
  fine-tuned small models? Same base model, identical hyperparameters,
  human-chosen vs. human-rejected training data (Anthropic hh-rlhf),
  evaluated on truthfulness, toxicity, and bias benchmarks.

## AI application security

At **NuGuard AI** I'm building an AI application security framework that assesses
agentic LLM systems across SBOM graph analysis, static analysis, automated
red-teaming, and policy validation — including an adversarial testing layer with
multi-turn attack scenarios and canary-based detection of data exfiltration and
out-of-scope agent behavior. The CLI is open source:
**[NuGuardAI/nuguard](https://github.com/NuGuardAI/nuguard)**.

## Fellowships & research training

- **MIT AI Alignment — AI Safety Fundamentals Fellowship** · 2026–present. Independent
  researcher; interpretability, RLHF, goal misgeneralization, eliciting latent knowledge,
  and scalable oversight.
- **BlueDot Impact — Frontier AI Governance** · 2026. Governance, policy, and regulation of
  frontier AI. [Certificate](https://bluedot.org/certification?id=recTitSUQ0kCDwSiH).
- **BlueDot Impact — Technical AI Safety** · 2026. Alignment research methods and threat
  models. [Certificate](https://bluedot.org/certification?id=recavPsHJLszbzkAS).
- **BlueDot Impact — AGI Strategy** · 2026. Deployment risk, timelines, and strategy.
  [Certificate](https://bluedot.org/certification?id=recrXFAnedDvtUUBf).

## Academic & research projects

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

---

*GRE — Quant [170/170, 99th percentile](https://imfs.yolasite.com). GATE — 98th
percentile (India rank ~1,500 / 200,000).*
