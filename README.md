Riverbraidr-Core (v0.1.3)

A minimal, deterministic, governance-locked numeric capacity control substrate for AI and automation systems.

Riverbraid-Core does not generate content, make predictions, or interpret meaning.
It exists to answer one narrow question:

Given current system conditions, should this system rest, soften, or engage?

This repository is intentionally small, frozen, and auditable.


What Problem This Solves

Modern AI systems often fail not because they lack intelligence, but because they lack capacity awareness.

Common failure modes:
	•	Over-engagement under high load
	•	Brittle behavior during novelty spikes
	•	Escalation when fragility or latency is already elevated
	•	Guardrails that mix semantics, policy, and control logic

Riverbraid-Core separates capacity control from intelligence.

It provides a deterministic numeric gate that:
	•	Evaluates system stress and coherence
	•	Selects a capacity mode (rest | soften | engage)
	•	Makes no semantic or adaptive decisions
	•	Can be audited, reasoned about, and governed independently


Who Should Use This

Riverbraid-Core is intended for:
	•	AI platform teams needing a deterministic capacity gate
	•	RAG or agent systems that must pause or de-escalate safely
	•	Research or institutional systems requiring auditability
	•	Engineers who want control logic without embedded policy
	•	Systems that prevent failure upstream, not via downstream policing

It is not intended for:
	•	End-user applications without an engineering wrapper
	•	Adaptive or learning control layers
	•	Systems requiring semantic interpretation
	•	Personalized or stateful decision engines


Design Philosophy

Riverbraid-Core is deliberately:
	•	Boring
	•	Deterministic
	•	Non-adaptive
	•	Governance-first

All intelligence, interpretation, and policy live outside the core.


Status

Frozen (pre-canonical).
Changes require governance approval per spec/governance-1.0.0.json.


Properties
	•	Deterministic: no randomness, time, environment, IO, network, or retained state
	•	Complexity: O(1) time and O(1) space
	•	Language: Python ≥ 3.10
	•	Entrypoint: riverbraid.core.metrics.compute_metrics


Installation

Editable install (recommended for development and testing):

pip install -e .

This repository uses a src/ layout and must be installed for imports to resolve correctly.

⸻

Inputs

All inputs are numeric scalars in the range [0.0, 1.0].

Input	Meaning (context-agnostic)
coherence	Signal clarity / internal alignment
novelty	Degree of unexpected input
fragility	Sensitivity to disruption or failure
latency	Delay or backlog pressure

Important:
Riverbraid-Core does not define how these metrics are computed.
That responsibility belongs entirely to the wrapper system.


Defaults and Clamping

Missing inputs default to 0.0.

Clamping rules:
	•	NaN → 0.0
	•	+∞ → 1.0
	•	−∞ → 0.0
	•	< 0.0 → 0.0
	•	> 1.0 → 1.0

Any clamping sets validation_warning = true.


Derived Metrics

systemic_load        = (fragility + latency) / 2
pattern_disruption   = novelty * (1 - coherence)
interaction_variance = max(systemic_load, pattern_disruption)
coherence_confidence = coherence * (1 - interaction_variance)

All formulas are fixed and auditable.


Mode Selection

Capacity Override (absolute precedence)

If:

systemic_load ≥ 0.85

Then:

mode = "rest"

Threshold-Based Selection

Inclusive lower, exclusive upper bounds:

Mode	Condition
rest	coherence_confidence < 0.30
soften	0.30 ≤ coherence_confidence < 0.65
engage	coherence_confidence ≥ 0.65



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



Intended Usage Pattern

Riverbraid-Core must be wrapped.

Wrappers may:
	•	Compute or source input metrics
	•	Act on the returned mode
	•	Perform logging or telemetry
	•	Enforce types and validation

Wrappers must not:
	•	Retain state
	•	Modify results
	•	Introduce adaptive logic
	•	Perform external calls from within the core
	•	Embed semantic interpretation

This separation is intentional.


Governance

See spec/governance-1.0.0.json.

Governance explicitly prohibits:
	•	Semantic interpretation
	•	Learning or adaptation
	•	Feedback loops
	•	User profiling or personalization

Certification is required for official or institutional use.


Breaking Changes

Any change to:
	•	formulas
	•	thresholds
	•	mode-selection logic

is a breaking change and requires:
	•	a new version
	•	a new audit hash
	•	governance approval


Usage Example

from riverbraid.core.metrics import compute_metrics

result = compute_metrics({
    "coherence": 0.7,
    "novelty": 0.2,
    "fragility": 0.3,
    "latency": 0.1,
})

print(result)


Change Control

Any policy change requires:
	•	an RFC
	•	an impact statement
	•	dual-signature approval
	•	a new major version
	•	a new audit hash

Final Note

Riverbraid-Core is intentionally not clever.

Its role is to be correct, stable, and governable, so that systems built on top of it can be creative without becoming brittle.
