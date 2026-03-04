import pytest
from riverbraid.core.metrics import compute_metrics, AUDIT_HASH


def test_audit_hash_present():
    assert compute_metrics({})["AUDIT_HASH"] == AUDIT_HASH

def test_empty_input_returns_rest():
    assert compute_metrics({})["mode"] == "rest"

def test_missing_inputs_default_to_zero():
    m = compute_metrics({})["metrics"]
    assert m["systemic_load"] == 0.0
    assert m["coherence_confidence"] == 0.0

def test_engage():
    r = compute_metrics({"coherence": 0.9, "novelty": 0.1, "fragility": 0.1, "latency": 0.1})
    assert r["mode"] == "engage"
    assert r["validation_warning"] is False

def test_soften():
    r = compute_metrics({"coherence": 0.6, "novelty": 0.3, "fragility": 0.2, "latency": 0.2})
    assert r["mode"] == "soften"

def test_rest_low_coherence():
    r = compute_metrics({"coherence": 0.1, "novelty": 0.9, "fragility": 0.1, "latency": 0.1})
    assert r["mode"] == "rest"

def test_systemic_load_override():
    r = compute_metrics({"coherence": 0.99, "novelty": 0.0, "fragility": 0.9, "latency": 0.9})
    assert r["mode"] == "rest"
    assert r["metrics"]["systemic_load"] >= 0.85

def test_nan_warns():
    assert compute_metrics({"coherence": float("nan")})["validation_warning"] is True

def test_determinism():
    inputs = {"coherence": 0.7, "novelty": 0.2, "fragility": 0.3, "latency": 0.1}
    results = [compute_metrics(inputs) for _ in range(50)]
    assert all(r == results[0] for r in results[1:])

def test_formula_correctness():
    c, n, f, l = 0.7, 0.2, 0.3, 0.1
    r = compute_metrics({"coherence": c, "novelty": n, "fragility": f, "latency": l})
    m = r["metrics"]
    sl = (f + l) / 2
    pd = n * (1 - c)
    iv = max(sl, pd)
    cc = c * (1 - iv)
    assert abs(m["systemic_load"] - sl) < 1e-9
    assert abs(m["coherence_confidence"] - cc) < 1e-9
