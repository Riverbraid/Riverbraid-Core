from __future__ import annotations
import math
from typing import TypedDict

class RawInputs(TypedDict, total=False):
    coherence: float
    novelty: float
    fragility: float
    latency: float

class Metrics(TypedDict):
    systemic_load: float
    pattern_disruption: float
    interaction_variance: float
    coherence_confidence: float

class ComputeResult(TypedDict):
    mode: str
    metrics: Metrics
    validation_warning: bool
    AUDIT_HASH: str

AUDIT_HASH: str = "rb-core-metrics-v1.3.0"
REST_THRESHOLD: float = 0.30
ENGAGE_THRESHOLD: float = 0.65
SYSTEMIC_LOAD_OVERRIDE: float = 0.85

def _clamp(value):
    if not isinstance(value, (int, float)): return 0.0, True
    if math.isnan(value): return 0.0, True
    if math.isinf(value): return (1.0 if value > 0 else 0.0), True
    if value < 0.0: return 0.0, True
    if value > 1.0: return 1.0, True
    return float(value), False

def compute_metrics(inputs):
    coherence, w1 = _clamp(inputs.get("coherence", 0.0))
    novelty,   w2 = _clamp(inputs.get("novelty",   0.0))
    fragility, w3 = _clamp(inputs.get("fragility", 0.0))
    latency,   w4 = _clamp(inputs.get("latency",   0.0))
    warn = w1 or w2 or w3 or w4
    sl = (fragility + latency) / 2.0
    pd = novelty * (1.0 - coherence)
    iv = max(sl, pd)
    cc = coherence * (1.0 - iv)
    if sl >= SYSTEMIC_LOAD_OVERRIDE: mode = "rest"
    elif cc < REST_THRESHOLD: mode = "rest"
    elif cc < ENGAGE_THRESHOLD: mode = "soften"
    else: mode = "engage"
    return {"mode": mode, "metrics": {"systemic_load": round(sl,6), "pattern_disruption": round(pd,6), "interaction_variance": round(iv,6), "coherence_confidence": round(cc,6)}, "validation_warning": warn, "AUDIT_HASH": AUDIT_HASH}
