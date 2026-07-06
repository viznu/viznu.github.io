---
title: Research
---

## Alignment monitoring & evaluation

Independent experimental work, all public on GitHub:

- **[jspace-obfuscation](https://github.com/viznu/jspace-obfuscation)**: does a
  Jacobian-lens oversight channel survive the pressure that collapses
  chain-of-thought monitoring? Testbed built and running.
- **[sandbag-bench](https://github.com/viznu/sandbag-bench)**: can a model's own
  internals give away deliberate underperformance? Calibration gate passed at
  0.755; the detection run is pending.
- **[contrastive-activation-trajectories](https://github.com/viznu/contrastive-activation-trajectories)**:
  contrastive probing of activation trajectories. A negative result — untrained
  PCA matches the contrastive objective.
- **[jepa-alignment-probe](https://github.com/viznu/jepa-alignment-probe)**:
  parked. JEPA-SCORE as a Jacobian-density anomaly detector came out at
  AUROC ≈ 0.50 on every variant. Public as the record of what did not work.
- **[alignment-measure](https://github.com/viznu/alignment-measure)**: does data
  curation alone move alignment? One base model, human-chosen vs. human-rejected
  hh-rlhf data.

## Multi-agent dynamics & oversight

- **[bluedot-adversarial-dynamics](https://github.com/viznu/bluedot-adversarial-dynamics)**:
  can an audit agent repair a deception equilibrium, and how small a faction can
  capture a convention? Before one forms, 2 of 24 agents sufficed. Small samples,
  not settled results.
- **multi-agent-testbed** *(private)*: an event-sourced testbed for controlled
  multi-agent experiments; every configuration names a compute-matched
  single-agent baseline.

## AI application security

- **[NuGuardAI/nuguard](https://github.com/NuGuardAI/nuguard)**: the open-source
  CLI of the application security framework I build at **NuGuard AI** for agentic
  LLM systems — SBOM graph analysis, static analysis, automated red-teaming and
  policy validation, with canary-based detection of exfiltration and
  out-of-scope agent behaviour.
- **Insider Honeypots**: my team's project for the
  [Heron AI Security Research Fellowship](https://www.heronsec.ai/researchfellowship),
  autumn 2026. Runs September–November 2026.
- **[training-data-custody](https://github.com/viznu/training-data-custody)**:
  chain of custody for training-data cleaning — signed per-datum records under one
  Merkle-batched signature, verifiable offline. A demo runs eight attacks,
  including the two it deliberately does not stop.

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
  - **Frontier AI Governance**. Governance, policy, and regulation of frontier AI.
    [Certificate](https://bluedot.org/certification?id=recTitSUQ0kCDwSiH).
  - **Technical AI Safety**. Alignment research methods and threat models.
    [Certificate](https://bluedot.org/certification?id=recavPsHJLszbzkAS).
  - **Technical AI Safety Project**. Course project:
    [bluedot-adversarial-dynamics](https://github.com/viznu/bluedot-adversarial-dynamics).
    <!-- certificate link goes here, same form as the others:
         [Certificate](https://bluedot.org/certification?id=...) -->
  - **AGI Strategy**. Deployment risk, timelines, and strategy.
    [Certificate](https://bluedot.org/certification?id=recrXFAnedDvtUUBf).
  - **Biosecurity Fundamentals**. Biological risk, biosecurity policy, and pandemic
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

## Experienced with

- **Languages**: Python, C, C++, SQL, JavaScript/TypeScript, Go, Java, Shell, PHP, Matlab; familiar with R, Scala, Ruby.
- **AI / LLM**: Semantic Kernel, AWS Bedrock, Claude, deterministic LLM programming, LLMOps, agentic engineering, agent scaffolding & handoff, tool/API grounding, context orchestration.
- **AI / security**: LLM red-teaming, adversarial robustness testing, prompt-injection & tool-abuse detection, guardrail/policy engines, canary-based exfiltration detection, AI SBOM analysis, penetration testing, fuzz testing.
- **Data / platform**: Spark, Kafka, Airflow, Apache Hudi, Hive, Presto, Druid, Flink, dbt, schema design, data contracts, lakehouse architectures, telemetry fusion.
- **ML / frameworks**: PyTorch, TensorFlow, Jax, scikit-learn, CUDA, graph-augmented ML, FastAPI, Django, Flask, React.
- **Cloud / infra**: AWS, Kubernetes, Datadog, Celery, memcached, Metabase, Tableau.
- **Databases**: DynamoDB, Redshift, PostgreSQL, MySQL, Snowflake, Cassandra, MongoDB, Neo4j.
