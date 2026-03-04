from __future__ import annotations
import math


AUDIT_HASH = "rb-core-metrics-v1.3.0"
REST_THRESHOLD = 0.30
ENGAGE_THRESHOLD = 0.65
SYSTEMIC_LOAD_OVERRIDE = 0.85


def _clamp(value):
    if not isinstance(value, (int, float)):
        return 0.0, True
    if math.isnan(value):
        return 0.0, True
    if math.isinf(value):
        return (1.0 if value > 0 else 0.0), True
    if value < 0.0:
        return 0.0, True
    if value > 1.0:
        return 1.0, True
    return float(value), False


def compute_metrics(inputs):
    """
    Compute capacity metrics and select a mode.

    Inputs (all optional, default 0.0):
        coherence  [0.0-1.0]  signal clarity
        novelty    [0.0-1.0]  degree of unexpected input
        fragility  [0.0-1.0]  sensitivity to disruption
        latency    [0.0-1.0]  delay or backlog pressure

    Formulas (fixed):
        systemic_load        = (fragility + latency) / 2
        pattern_disruption   = novelty * (1 - coherence)
        interaction_variance = max(systemic_load, pattern_disruption)
        coherence_confidence = coherence * (1 - interaction_variance)

    Modes:
        systemic_load >= 0.85        -> rest (override)
        coherence_confidence < 0.30  -> rest
        coherence_confidence < 0.65  -> soften
        coherence_confidence >= 0.65 -> engage
    """
    coherence, w1 = _clamp(inputs.get("coherence", 0.0))
    novelty,   w2 = _clamp(inputs.get("novelty",   0.0))
    fragility, w3 = _clamp(inputs.get("fragility", 0.0))
    latency,   w4 = _clamp(inputs.get("latency",   0.0))

    warn = w1 or w2 or w3 or w4

    sl = (fragility + latency) / 2.0
    pd = novelty * (1.0 - coherence)
    iv = max(sl, pd)
    cc = coherence * (1.0 - iv)

    if sl >= SYSTEMIC_LOAD_OVERRIDE:
        mode = "rest"
    elif cc < REST_THRESHOLD:
        mode = "rest"
    elif cc < ENGAGE_THRESHOLD:
        mode = "soften"
    else:
        mode = "engage"

    return {
        "mode": mode,
        "metrics": {
            "systemic_load":        round(sl, 6),
            "pattern_disruption":   round(pd, 6),
            "interaction_variance": round(iv, 6),
            "coherence_confidence": round(cc, 6),
        },
        "validation_warning": warn,
        "AUDIT_HASH": AUDIT_HASH,
    }
