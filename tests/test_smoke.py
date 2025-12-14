from __future__ import annotations

from src.riverbraid.core.metrics import compute_metrics

def test_smoke_basic_outputs():
    out = compute_metrics({
        "coherence": 0.7,
        "novelty": 0.2,
        "fragility": 0.3,
        "latency": 0.1,
    })
    assert out["mode"] in ("rest", "soften", "engage")
    m = out["metrics"]
    assert set(m.keys()) == {
        "systemic_load",
        "pattern_disruption",
        "interaction_variance",
        "coherence_confidence",
    }
    assert "validation_warning" in out
    assert "AUDIT_HASH" in out
