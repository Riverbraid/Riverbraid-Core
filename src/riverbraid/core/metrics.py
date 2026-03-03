import math

AUDIT_HASH = "rb-core-metrics-v1.3.0"

def _clamp(v):
    try:
        val = float(v)
        return max(0.0, min(1.0, val))
    except (ValueError, TypeError):
        return 0.0

def compute_metrics(inputs):
    coh = _clamp(inputs.get("coherence", 0.0))
    nov = _clamp(inputs.get("novelty", 0.0))
    fra = _clamp(inputs.get("fragility", 0.0))
    lat = _clamp(inputs.get("latency", 0.0))
    
    load = (fra + lat) / 2.0
    disrupt = novelty * (1.0 - coh) if 'novelty' in locals() else nov * (1.0 - coh)
    conf = coh * (1.0 - max(load, disrupt))
    
    mode = "rest" if load > 0.85 or conf < 0.30 else ("soften" if conf < 0.65 else "engage")
    
    return {
        "mode": mode,
        "metrics": {
            "systemic_load": round(load, 4),
            "coherence_confidence": round(conf, 4)
        },
        "hash": AUDIT_HASH
    }
