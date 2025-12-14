# Riverbraid-Core

**A frozen, deterministic numeric substrate with governance heavier than code.**

Riverbraid-Core is not a framework, agent, model, or policy engine.  
It is a **minimal, auditable computation primitive** designed to be boring, predictable, and resistant to drift.

The repository exists to provide one thing only:

> A pure, O(1), deterministic mapping from four normalized metrics to a bounded control object.

Nothing more.

---

## What This Is

Riverbraid-Core implements a **numeric substrate** that:

- Accepts **four floats** in the closed interval `[0.0, 1.0]`
  - `coherence`
  - `novelty`
  - `fragility`
  - `latency`
- Applies a **fully specified, deterministic transformation**
- Emits:
  - A small set of derived scalars
  - A discrete **mode** (`rest`, `soften`, `engage`)
  - A bounded decoding control object
  - A validation warning flag

The entire behavior is defined by specification, not interpretation.

---

## What This Is Not

Riverbraid-Core explicitly **does not**:

- Interpret semantics
- Compute metrics from raw data
- Maintain state
- Learn or adapt
- Call networks, clocks, files, or environments
- Perform optimization, personalization, or policy
- Expose hooks, plugins, or extension points

Any system that does those things exists **outside** this repository and is governed separately.

---

## Design Principles

### 1. Boring by Design

The core implementation (`metrics.py`) contains:
- No clever logic
- No dynamic behavior
- No hidden state
- No shortcuts

Every operation is mechanical, bounded, and obvious on inspection.

Boredom is a safety property.

---

### 2. Determinism as a Hard Invariant

For identical inputs, the output is identical:
- No randomness
- No time dependence
- No concurrency
- No environment dependence

Within a given build environment, serialized outputs are byte-identical.

---

### 3. Governance Over Code

The **rules governing change** are intentionally heavier than the code itself.

- The numeric logic is small and static
- The governance specification is large, explicit, and restrictive
- Any meaningful change requires:
  - Formal documentation
  - Evidence
  - Review
  - Multi-party approval
  - Version break

This repository treats **authority and legitimacy** as first-class concerns.

---

### 4. Change Is Expensive on Purpose

If changing a threshold feels trivial, governance has failed.

Behavioral changes require:
- An Architecture Decision Record (ADR)
- Impact analysis
- Defined review periods
- Cryptographic provenance
- A new version and audit hash

Most proposed changes should die before code is written.

---

## Repository Structure

Riverbraid-Core/
├── src/
│   └── riverbraid/
│       └── core/
│           └── metrics.py          # Pure numeric substrate
├── tests/
│   └── test_smoke.py               # Determinism and integrity checks
├── spec/
│   ├── technical-spec-0.1.3.json   # Canonical behavioral definition
│   └── governance-1.0.0.json       # Authority, change control, audit rules
├── docs/
│   └── decisions/                  # Architecture Decision Records (append-only)
└── README.md

The `docs/` and `spec/` directories are expected to outweigh the source code.

That is intentional.

---

## Versioning and Immutability

- **v0.1.3** is frozen
- The core logic is cryptographically anchored via an external JCS process
- Any modification to behavior requires a **new major version**
- Silent changes are treated as integrity violations

---

## Wrappers and Integrations

Wrappers are allowed **only** if they:

- Preserve determinism
- Do not introduce state
- Do not reinterpret outputs
- Do not override modes or thresholds
- Declare their behavior and provenance explicitly

Wrappers that add logic are **not** Riverbraid-Core and must not present themselves as such.

---

## Audit Posture

This repository is designed for:

- External audit
- Long-term stability
- Institutional handoff
- Adversarial review

Every decision that affects behavior must be explainable years later without relying on author memory.

---

## When to Use This

Use Riverbraid-Core when:

- Stability matters more than optimization
- Predictability matters more than adaptability
- You need a substrate that **will not quietly change**

Do not use it if you want:
- Learning systems
- Fast iteration
- Feature velocity
- Personalized behavior

---

## Status

**Frozen. Governed. Boring.**

The work is complete.

If something feels easy to change, that is a governance bug.

---

## License

[Specify license here]

---

## Final Note

Riverbraid-Core is infrastructure, not innovation.

If this repository feels frustratingly conservative, that means it is working.
