---
**Status:** Stationary (v1.5.0)
**Normative Source:** Riverbraid-Core
**Verification:** `npm test`
**Authority:** 2-of-2 GPG Threshold
---

<div align="center">

# O Riverbraid-Core

### The Deterministic Kernel

**The constitutional root of the Riverbraid cluster.**

[![Status: Stationary](https://img.shields.io/badge/Status-Stationary-brightgreen)](#)
[![Genesis Anchor](https://img.shields.io/badge/Genesis_Anchor-d4935e-blue)](#)

</div>

## What Is This Repository?

Riverbraid-Core is the **Deterministic Kernel**—the constitutional root from which the entire Riverbraid cluster derives its integrity. All other repositories in the cluster are subordinate to the invariants established here.

## Three-Layer Architecture

* **Layer 0: Physical** — UTF-8/LF canonicalization enforced at the byte level.
* **Layer 1: Information** — The Sealed Constitutional Quad: `SCOPE.md`, `RESILIENCE.md`, `SURVIVABILITY.md`, and `DURABILITY.md`.
* **Layer 2: Execution** — Deterministic state transitions anchored to Genesis Root **d4935e**.

## Verification

```bash
npm install
node run-vectors.cjs
node heartbeat.mjs
```

---
## Part of the Riverbraid Constellation
A self-verifying integrity substrate anchored to stationary Merkle root **de2062** (Sovereign layer **adef13**).
Verification: `node run-vectors.cjs verify`
