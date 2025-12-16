# Riverbraid-Core (v0.1.3)

A minimal, deterministic, auditable numeric control substrate governed by explicit institutional rules.

This initial release is **frozen**, **deterministic**, and **governance-locked**.

---

## Status

**Frozen (pre-canonical).**  
Changes require governance approval per `spec/governance-1.0.0.json`.

---

## Properties

- **Deterministic**: no randomness, time, environment, IO, network, or retained state.
- **Complexity**: O(1) time and O(1) space.
- **Language**: Python ≥ 3.10.
- **Entrypoint**: `riverbraid.core.metrics.compute_metrics`.

---

## Installation

Editable install (recommended for development and testing):

```bash
pip install -e .

This repository uses a src/ layout and must be installed for imports to resolve correctly.

⸻

Inputs

All inputs are numeric scalars in the range [0.0, 1.0].
	•	coherence
	•	novelty
	•	fragility
	•	latency

Defaults

Missing inputs default to 0.0.

Clamping Rules
	•	NaN → 0.0
	•	+∞ → 1.0
	•	−∞ → 0.0
	•	< 0.0 → 0.0
	•	> 1.0 → 1.0

Setting or clamping any input sets validation_warning = true.

⸻

Derived Metrics

systemic_load         = (fragility + latency) / 2
pattern_disruption    = novelty * (1 - coherence)
interaction_variance  = max(systemic_load, pattern_disruption)
coherence_confidence  = coherence * (1 - interaction_variance)


⸻

Mode Selection

Capacity Override (absolute precedence)

If:

systemic_load ≥ 0.85

Then:

mode = "rest"

Threshold-Based Selection

(Inclusive-lower, exclusive-upper bounds)
	•	rest   : coherence_confidence < 0.30
	•	soften : 0.30 ≤ coherence_confidence < 0.65
	•	engage : coherence_confidence ≥ 0.65

⸻

Outputs

{
  "mode": "rest | soften | engage",
  "metrics": {
    "systemic_load": float,
    "pattern_disruption": float,
    "interaction_variance": float,
    "coherence_confidence": float
  },
  "validation_warning": boolean,
  "AUDIT_HASH": "string"
}


⸻

Governance

See spec/governance-1.0.0.json.

Governance explicitly prohibits:
	•	semantic interpretation
	•	learning or adaptation
	•	feedback loops
	•	user profiling or personalization

Wrappers may perform:
	•	input validation
	•	type enforcement
	•	logging

Wrappers must not perform:
	•	state retention
	•	external calls
	•	adaptive logic
	•	result modification

Certification is required for official or institutional use.

⸻

Governance Rule — Breaking Changes

Any change to:
	•	formulas
	•	thresholds
	•	mode-selection logic

constitutes a breaking change and requires:
	•	a new version
	•	a new audit hash

⸻

Usage

from riverbraid.core.metrics import compute_metrics

result = compute_metrics({
    "coherence": 0.7,
    "novelty": 0.2,
    "fragility": 0.3,
    "latency": 0.1,
})

print(result)


⸻

Change Control

Any policy change requires:
	•	an RFC
	•	an impact statement
	•	dual signature approval
	•	a new major version
	•	a new audit hash
