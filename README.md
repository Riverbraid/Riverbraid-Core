# Riverbraid-Core (v0.1.3)

A minimal, deterministic, auditable numeric control substrate governed by explicit institutional rules. This initial commit is frozen, deterministic, and governance-locked.

## Status

- Frozen pre-canonical. Changes require governance per governance-1.0.0.

## Properties

- Deterministic: no randomness, time, environment, IO, network, or state.
- Complexity: O(1) time and O(1) space.
- Language: Python >= 3.10.
- Entrypoint: `riverbraid.core.metrics.compute_metrics`.

## Inputs

- `coherence`, `novelty`, `fragility`, `latency` ∈ [0.0, 1.0].
- Missing inputs default to 0.0.
- Clamping rules:
  - NaN → 0.0
  - +∞ → 1.0
  - −∞ → 0.0
  - below 0 → 0.0
  - above 1 → 1.0

Setting or clamping any input sets `validation_warning = true`.

## Derived Metrics

- `systemic_load = (fragility + latency) / 2`
- `pattern_disruption = novelty * (1 - coherence)`
- `interaction_variance = max(systemic_load, pattern_disruption)`
- `coherence_confidence = coherence * (1 - interaction_variance)`

## Mode Selection

- Capacity override (absolute precedence): if `systemic_load >= 0.85` → `mode = "rest"`.
- Otherwise thresholds with inclusive-lower, exclusive-upper boundaries:
  - `rest`   : `coherence_confidence < 0.30`
  - `soften` : `0.30 <= coherence_confidence < 0.65`
  - `engage` : `coherence_confidence >= 0.65`

## Outputs

{
  "mode": "rest" | "soften" | "engage",
  "metrics": {
    "systemic_load": float,
    "pattern_disruption": float,
    "interaction_variance": float,
    "coherence_confidence": float
  },
  "validation_warning": boolean,
  "AUDIT_HASH": "<sha256>"
}

## Governance

See `spec/governance-1.0.0.json`. Governance prohibits semantic interpretation, learning, feedback loops, adaptation, user profiling, and personalization. Wrapper constraints allow input validation, type enforcement, and logging, and forbid state retention, external calls, adaptive logic, and result modification. Certification is required for official use.

## Usage

from src.riverbraid.core.metrics import compute_metrics

result = compute_metrics({
    "coherence": 0.7,
    "novelty": 0.2,
    "fragility": 0.3,
    "latency": 0.1,
})
print(result)

## Change Control

Any policy change requires an RFC, impact statement, dual signature, new major version, and new audit hash.
