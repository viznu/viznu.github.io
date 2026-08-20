---
title: Research
---

## Alignment monitoring & evaluation

Independent experimental work, all public on GitHub:

- **[jspace-obfuscation](https://github.com/viznu/jspace-obfuscation)**: does the
  Jacobian-lens oversight channel survive the optimization pressure that collapses
  chain-of-thought monitoring? Testbed built and running, with GPU lens-fitting
  behind a swappable backend.
- **[sandbag-bench](https://github.com/viznu/sandbag-bench)**: can a model's own
  internals give away deliberate underperformance? Layer-20 activations are read
  through a natural-language autoencoder and handed to a blinded extractor.
  Calibration gate passed at 0.755 agreement; the detection run is pending.
- **[contrastive-activation-trajectories](https://github.com/viznu/contrastive-activation-trajectories)**:
  contrastive vs. non-contrastive probing of a model's activation trajectories. A
  negative result: on Instructed-Pairs the contrastive objective is not
  load-bearing, because untrained PCA matches it.
- **[jepa-alignment-probe](https://github.com/viznu/jepa-alignment-probe)**: parked.
  JEPA-SCORE as a Jacobian-density anomaly detector over activations came out at
  AUROC ≈ 0.50 on every variant tried. Public as the record of what did not work.
- **[alignment-measure](https://github.com/viznu/alignment-measure)**: does data
  curation alone move alignment? One base model, fixed hyperparameters,
  human-chosen vs. human-rejected hh-rlhf data, scored on truthfulness, toxicity
  and bias.

## Multi-agent dynamics & oversight

- **[bluedot-adversarial-dynamics](https://github.com/viznu/bluedot-adversarial-dynamics)**:
  two experiments on LLM populations under pressure. Can an audit agent repair a
  deception equilibrium, and how small can an adversarial faction be and still
  capture a population's convention? Before a convention forms, 2 of 24 agents was
  enough in every run. Small samples: working pipelines, not settled results.
- **multi-agent-testbed** *(private)*: an event-sourced testbed for controlled
  multi-agent experiments. Every configuration must name a compute-matched
  single-agent baseline, and infrastructure failure stays distinct from task
  failure.

## AI application security

At **NuGuard AI** I build an application security framework for agentic LLM
systems: SBOM graph analysis, static analysis, automated red-teaming and policy
validation, with canary-based detection of data exfiltration and out-of-scope
agent behaviour. The CLI is open source:
**[NuGuardAI/nuguard](https://github.com/NuGuardAI/nuguard)**.

- **Insider Honeypots**: my team's project for the
  [Heron AI Security Research Fellowship](https://www.heronsec.ai/researchfellowship),
  autumn 2026 cohort. Runs September–November 2026.
- **[training-data-custody](https://github.com/viznu/training-data-custody)**: chain
  of custody for the cleaning side of training data. Signed per-datum records under
  one Merkle-batched signature, verifiable offline. A demo runs eight attacks
  against it, including the two it deliberately does not stop.

## Research tooling

- **paper-atlas** *(private)*: an overlay map of science built from
  [OpenAlex](https://openalex.org), with a Zotero library projected onto it to
  surface the neighbouring fields you have not read. Adds arXiv and citation-based
  reading feeds. Runs locally.

## Fellowships & research training

- **Heron AI Security**, Research Fellowship (Apart Research) · Autumn
  2026. A three-month team fellowship pairing cybersecurity practitioners with
  frontier AI safety researchers, across AI infrastructure and hardware security,
  technical AI governance, adversarial and model security, AI control and
  containment, and cybersecurity evaluations. Project: **Insider Honeypots**.
- **Takshashila Institution**, Technology & Policy course · September–December
  2026. Upcoming.
- **MIT AI Alignment**, AI Safety Fundamentals Fellowship · summer cohort 2026.
  Independent researcher; interpretability, RLHF, goal misgeneralization,
  eliciting latent knowledge, and scalable oversight.
- **BlueDot Impact** · 2026:
  - Frontier AI Governance. Governance, policy, and regulation of frontier AI.
    [Certificate](https://bluedot.org/certification?id=recTitSUQ0kCDwSiH).
  - Technical AI Safety. Alignment research methods and threat models; course
    project was
    [bluedot-adversarial-dynamics](https://github.com/viznu/bluedot-adversarial-dynamics).
    [Certificate](https://bluedot.org/certification?id=recavPsHJLszbzkAS).
  - AGI Strategy. Deployment risk, timelines, and strategy.
    [Certificate](https://bluedot.org/certification?id=recrXFAnedDvtUUBf).
  - Biosecurity Fundamentals. Biological risk, biosecurity policy, and pandemic
    preparedness.
    [Certificate](https://bluedot.org/certification?id=recKmnrS1fxyUAoLM).

## Academic Projects

- **Quantum-Computing-Resistant Cryptographic Scheme** (2017, JHU): M.S. thesis
  implementing a post-quantum scheme in Go.
- **Traceability of Monero Transactions** (2017, JHU): graph-based traceability in
  privacy-preserving cryptocurrencies.
- **Malware Analysis & Classification with ML** (2016, JHU): classifying malware families
  and behavior.
- **Semi-Supervised Detection of Malicious Outlier Traffic** (2016, JHU): Spark on AWS over
  large-scale network data.
- **Social Media Security & Threat Analysis** (2016, JHU): Twitter bot detection.
- **Inference of IoT / SCADA Device Manipulation** (2016, JHU): from AWS CloudWatch logs.
- **Panacea: ML Clinical Decision Support** (2015, C-DAC): applied ML for clinical decisions.
- **IoT Wireless Sensor Mesh for Farmland** (2013, VIT): ZigBee-based remote agricultural monitoring.
