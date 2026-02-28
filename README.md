# Riverbraid-Core

**Version:** 0.1.3 — Frozen (Pre-Canonical)  
**Language:** Python ≥ 3.10  
**Status:** Governance-locked. Changes require dual-signature approval and a new audit hash.

-----

## What It Is

Riverbraid-Core is a minimal, deterministic, governance-locked **capacity control substrate** for AI and automation systems.

It answers one narrow question:

> Given current system conditions, what capacity mode should the system be in right now: **rest**, **soften**, or **engage**?

It does not generate content, make predictions, interpret meaning, or enforce policy. Those responsibilities belong to the wrapper layer — always.

-----

## What It Is Not

- Not a framework
- Not a model
- Not a guardrail system
- Not an agent
- Not a learning or adaptive layer
- Not a turnkey solution

The boundary between what the Core does and what the wrapper does is a hard architectural contract, not a recommendation.

-----

## How It Works

All inputs are numeric scalars in the range `[0.0, 1.0]`.

|Input      |Meaning                             |
|-----------|------------------------------------|
|`coherence`|Signal clarity / internal alignment |
|`novelty`  |Degree of unexpected input          |
|`fragility`|Sensitivity to disruption or failure|
|`latency`  |Delay or backlog pressure           |

**Derived metrics (fixed formulas):**

```
systemic_load        = (fragility + latency) / 2
pattern_disruption   = novelty * (1 - coherence)
interaction_variance = max(systemic_load, pattern_disruption)
coherence_confidence = coherence * (1 - interaction_variance)
```

**Mode selection:**

|Condition                           |Mode                      |
|------------------------------------|--------------------------|
|`systemic_load ≥ 0.85`              |`rest` (absolute override)|
|`coherence_confidence < 0.30`       |`rest`                    |
|`0.30 ≤ coherence_confidence < 0.65`|`soften`                  |
|`coherence_confidence ≥ 0.65`       |`engage`                  |

**Output:**

```json
{
  "mode": "rest | soften | engage",
  "metrics": {
    "systemic_load": 0.0,
    "pattern_disruption": 0.0,
    "interaction_variance": 0.0,
    "coherence_confidence": 0.0
  },
  "validation_warning": false,
  "AUDIT_HASH": "string"
}
```

Missing inputs default to `0.0`. NaN and out-of-range values are clamped. Any clamping sets `validation_warning: true`.

-----

## Installation

```bash
pip install -e .
```

This repository uses a `src/` layout and must be installed for imports to resolve correctly.

-----

## Usage

```python
from riverbraid.core.metrics import compute_metrics

result = compute_metrics({
    "coherence": 0.7,
    "novelty": 0.2,
    "fragility": 0.3,
    "latency": 0.1,
})

print(result)
```

-----

## Design Properties

- **Deterministic** — no randomness, time, environment, IO, network, or retained state
- **Stateless** — O(1) time and O(1) space
- **Domain-agnostic** — inputs are context-free scalars; meaning is defined by the wrapper
- **Governance-first** — frozen formulas, fixed thresholds, auditable at any time
- **Non-adaptive** — does not learn, drift, or personalize

-----

## Governance

See `spec/governance-1.0.0.json`.

Any change to formulas, thresholds, or mode-selection logic is a breaking change and requires:

- A new version
- A new audit hash
- Dual-signature governance approval

-----

## Part of the Riverbraid Gold Cluster

Riverbraid-Core is the signal root of the Gold Cluster. The petals wrap and extend it.

|Petal                                                                                   |Purpose                                    |
|----------------------------------------------------------------------------------------|-------------------------------------------|
|[Riverbraid-Golds](https://github.com/Riverbraid/Riverbraid-Golds)                      |Cluster manifest and pipeline orchestration|
|[Riverbraid-Crypto-Gold](https://github.com/Riverbraid/Riverbraid-Crypto-Gold)          |SHA-256 state anchoring                    |
|[Riverbraid-Judicial-Gold](https://github.com/Riverbraid/Riverbraid-Judicial-Gold)      |Fail-closed predicate governance           |
|[Riverbraid-Refusal-Gold](https://github.com/Riverbraid/Riverbraid-Refusal-Gold)        |Boundary logic and deterministic refusals  |
|[Riverbraid-Memory-Gold](https://github.com/Riverbraid/Riverbraid-Memory-Gold)          |Meaning-centric persistence                |
|[Riverbraid-Integration-Gold](https://github.com/Riverbraid/Riverbraid-Integration-Gold)|Mode enactment and system-rest execution   |
|[Riverbraid-Harness-Gold](https://github.com/Riverbraid/Riverbraid-Harness-Gold)        |Fail-closed verification harness           |

-----

## License

See `LICENSE`.
