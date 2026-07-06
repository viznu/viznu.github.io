---
title: Research
---

I come to safety research from the engineering side: a decade of building
production AI/ML, data, and security systems. That background shapes how I work
— I like to take a claim from the literature and turn it into a working
artifact quickly, and I write up what actually happened, including the
negative results.

## Alignment monitoring & evaluation

Independent experimental work, all public on GitHub:

- **[contrastive-activation-trajectories](https://github.com/viznu/contrastive-activation-trajectories)** —
  a controlled study of contrastive vs. non-contrastive representation
  learning over a target LLM's internal activations, for monitoring
  alignment-relevant behavioral state. Arrived at a careful methodological
  negative result: on Instructed-Pairs (Qwen2.5-3B), the contrastive
  objective is not load-bearing — untrained PCA matches it — with stress
  tests documenting why.
- **[sandbag-bench](https://github.com/viznu/sandbag-bench)** — an
  NLA-based latent-behavior gap benchmark for detecting sandbagging and
  alignment faking. Answer-readout calibration gate passed on Qwen2.5-7B
  (agreement 0.755, Wilson LB95 0.691); sandbagger-vs-control detection
  phase scaffolded and in progress.
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

## Earlier research

During my M.S. at **Johns Hopkins**, my work centered on security and applied
ML: a post-quantum cryptographic scheme (thesis, in Go), malware classification
with ML, Monero transaction traceability, and semi-supervised detection of
malicious network traffic.

---

*Structured training: MIT AI Alignment — AI Safety Fundamentals Fellowship
(2026–present); BlueDot Impact — Technical AI Safety and AGI Strategy (2026).*
