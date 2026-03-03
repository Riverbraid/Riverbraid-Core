import pytest
import math
from riverbraid.core.metrics import compute_metrics, AUDIT_HASH

def test_audit_hash_stability():
    result = compute_metrics({})
    assert result["hash"] == AUDIT_HASH

def test_empty_input_defaults():
    result = compute_metrics({})
    assert result["mode"] == "rest"
    assert result["metrics"]["systemic_load"] == 0.0

def test_engage_mode():
    inputs = {"coherence": 0.9, "novelty": 0.1, "fragility": 0.1, "latency": 0.1}
    result = compute_metrics(inputs)
    assert result["mode"] == "engage"

def test_systemic_load_override():
    # Load >= 0.85 should force rest regardless of coherence
    inputs = {"coherence": 0.99, "fragility": 0.9, "latency": 0.9}
    result = compute_metrics(inputs)
    assert result["mode"] == "rest"
    assert result["metrics"]["systemic_load"] == 0.9

def test_determinism():
    inputs = {"coherence": 0.7, "novelty": 0.2, "fragility": 0.3, "latency": 0.1}
    first = compute_metrics(inputs)
    for _ in range(10):
        assert compute_metrics(inputs) == first

def test_clamping_behavior():
    # Values above 1.0 should clamp to 1.0
    result = compute_metrics({"coherence": 1.5})
    assert result["metrics"]["coherence_confidence"] <= 1.0
