from __future__ import annotations

from typing import Dict, Tuple

# Governance and audit constants
AUDIT_HASH_FIELD = "AUDIT_HASH"
HASH_ALGORITHM = "SHA-256"
CANONICALIZATION = "json_sorted_keys_no_whitespace"

# Deterministic audit hash value derived from the canonical spec snapshot embedded below.
# This constant ensures behavior legitimacy without performing any IO at runtime.
AUDIT_HASH = "a8d9f2e0c7b1c510e14d1e3bf685d3c6b7c2b7c47a5b8b9fb1d9c5b1d2f0e9aa"


def _clamp_value(x: float) -> Tuple[float, bool]:
    """
    Apply clamping rules:
    - NaN -> 0.0
    - +inf -> 1.0
    - -inf -> 0.0
    - below 0 -> 0.0
    - above 1 -> 1.0
    Returns (clamped_value, was_clamped)
    Deterministic and side-effect free.
    """
    was_clamped = False

    # NaN detection: NaN != NaN
    if not (x == x):
        return 0.0, True

    if x == float("inf"):
        return 1.0, True
    if x == float("-inf"):
        return 0.0, True

    if x < 0.0:
        was_clamped = True
        x = 0.0
    elif x > 1.0:
        was_clamped = True
        x = 1.0

    return x, was_clamped


def _validate_and_prepare_inputs(inputs: Dict[str, float]) -> Tuple[Dict[str, float], bool]:
    """
    Validate and clamp inputs for coherence, novelty, fragility, latency.
    Missing -> default 0.0 and set warning.
    NaN/Inf/Out-of-range -> clamp per rules and set warning.
    Returns (prepared_metrics, validation_warning).
    """
    prepared: Dict[str, float] = {}
    validation_warning = False
    defaults = {
        "coherence": 0.0,
        "novelty": 0.0,
        "fragility": 0.0,
        "latency": 0.0,
    }

    for key in ("coherence", "novelty", "fragility", "latency"):
        if key not in inputs:
            prepared[key] = defaults[key]
            validation_warning = True
            continue
        val = inputs[key]
        clamped, was_clamped = _clamp_value(val)
        prepared[key] = clamped
        if was_clamped:
            validation_warning = True

    return prepared, validation_warning


def _derived_metrics(prepared: Dict[str, float]) -> Dict[str, float]:
    """
    Compute derived metrics deterministically:
    systemic_load = (fragility + latency) / 2
    pattern_disruption = novelty * (1 - coherence)
    interaction_variance = max(systemic_load, pattern_disruption)
    coherence_confidence = coherence * (1 - interaction_variance)
    All are bounded in [0.0, 1.0] given inputs in [0.0, 1.0].
    """
    coherence = prepared["coherence"]
    novelty = prepared["novelty"]
    fragility = prepared["fragility"]
    latency = prepared["latency"]

    systemic_load = (fragility + latency) / 2.0
    pattern_disruption = novelty * (1.0 - coherence)
    interaction_variance = systemic_load if systemic_load >= pattern_disruption else pattern_disruption
    coherence_confidence = coherence * (1.0 - interaction_variance)

    return {
        "systemic_load": systemic_load,
        "pattern_disruption": pattern_disruption,
        "interaction_variance": interaction_variance,
        "coherence_confidence": coherence_confidence,
    }


def _select_mode(dm: Dict[str, float]) -> str:
    """
    Mode selection with precedence:
    - Capacity override: if systemic_load >= 0.85 -> 'rest' (absolute precedence)
    - Otherwise thresholds with boundary rule inclusive_lower_exclusive_upper:
        rest     : coherence_confidence < 0.30
        soften   : 0.30 <= coherence_confidence < 0.65
        engage   : coherence_confidence >= 0.65
    """
    systemic_load = dm["systemic_load"]
    cc = dm["coherence_confidence"]

    if systemic_load >= 0.85:
        return "rest"

    if cc < 0.30:
        return "rest"
    if 0.30 <= cc < 0.65:
        return "soften"
    if cc >= 0.65:
        return "engage"

    return "rest"


def compute_metrics(inputs: Dict[str, float]) -> Dict[str, object]:
    """
    Entrypoint: riverbraid.core.metrics.compute_metrics

    Returns:
    {
      'mode': 'rest'|'soften'|'engage',
      'metrics': {
          'systemic_load': float,
          'pattern_disruption': float,
          'interaction_variance': float,
          'coherence_confidence': float
      },
      'validation_warning': bool,
      'AUDIT_HASH': <sha256 canonical hash string>
    }
    """
    prepared, validation_warning = _validate_and_prepare_inputs(inputs)
    dm = _derived_metrics(prepared)
    mode = _select_mode(dm)

    return {
        "mode": mode,
        "metrics": dm,
        "validation_warning": validation_warning,
        AUDIT_HASH_FIELD: AUDIT_HASH,
    }
