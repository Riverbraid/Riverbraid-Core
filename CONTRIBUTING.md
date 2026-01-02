# Contributing to Riverbraid-Core

Thank you for your interest in Riverbraid-Core.

This repository is a **reference implementation and governance artifact**.  
It is intentionally minimal, deterministic, and tightly scoped.

Contributions are welcomed **only when they preserve these properties**.

---

## Project Intent

Riverbraid-Core exists to demonstrate a *defensible floor* for AI system behavior:

- Deterministic decision logic
- Explicit architectural boundaries
- Cryptographic auditability
- Fail-closed operation
- Clear separation of concerns

It is **not** a product, platform, or feature playground.

---

## What Contributions Are Appropriate

Contributions may be considered if they:

- Improve **clarity, correctness, or auditability**
- Fix **bugs or edge cases** without altering semantics
- Improve **documentation accuracy**
- Strengthen **tests** that prove existing invariants
- Improve **tooling or verification** without expanding scope

All contributions must preserve:

- Determinism of the Frozen Core
- Layer separation (Anchor / Core / Ledger)
- Governance thresholds and math
- No hidden I/O, time, or environment coupling

---

## What Contributions Are Not Accepted

The following will not be accepted:

- Feature expansion or new “capabilities”
- Behavioral changes to the Frozen Core
- Architectural refactors without strong justification
- Non-deterministic logic
- Network access, telemetry, or side effects
- Ideological framing, marketing language, or hype
- Attempts to generalize Riverbraid into a platform

If a change alters the meaning of the system, it is out of scope.

---

## Contribution Process

1. **Open an issue first**  
   Describe the problem and why it matters to correctness or auditability.

2. **Be specific and technical**  
   Reference exact files, functions, or invariants.

3. **Small, reviewable changes**  
   Prefer minimal diffs that are easy to reason about.

4. **Tests required for behavioral claims**  
   If you claim correctness, provide proof.

5. **No backward reinterpretation**  
   The published v1.0.0 semantics are locked.

---

## Review Philosophy

Maintainers prioritize:

- Defensibility over convenience
- Stability over velocity
- Precision over consensus
- Fewer changes over more features

Declining a contribution is not a judgment of intent—only of scope.

---

## Legal and Governance

By contributing, you agree that:

- Your contribution may be rejected without explanation
- Accepted contributions become part of a reference artifact
- No implied roadmap, support, or future direction is promised

For behavioral expectations, see [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

---

## Final Note

Riverbraid-Core is deliberately small.

If you are looking to build *on top of* this work, that is encouraged—  
just not **inside** this repository.

Thank you for engaging carefully.
