# Riverbraid Standard v1.0.0

## Overview

Riverbraid Standard v1.0.0 is a **deterministic, auditable capacity gate and reflection ledger** intended as a reference implementation for AI integrity boundaries.

This release defines a *floor*, not a product.

## What This Release Is

- A frozen mathematical core with explicit governance thresholds
- A strict separation of concerns across three layers:
  - Frozen Core (deterministic math only)
  - Anchor Sentinel (time + identity normalization)
  - Reflection Ledger (cryptographic persistence)
- A fail-closed HMAC-SHA256 chained ledger
- A mandatory secret policy (`RIVERBRAID_SECRET`)
- A complete audit path from signal → decision → record → verification

## What This Release Is Not

- Not a framework
- Not an agent
- Not adaptive or self-modifying
- Not a product or service
- Not a claim of authority over AI systems

## Governance Locks

- Composite formula:
  `0.4s + 0.3p + 0.2v + 0.1(1-c)`
- Thresholds:
  - `> 0.45` → SOFTEN
  - `> 0.75` → REST
  - `c < 0.25` → REST (hard override)
- Determinism required for all core outputs
- Recursive canonical serialization for all cryptographic operations

## Integrity Guarantees

- No IO, time, randomness, or environment access in the core
- Full ledger chain audit on startup
- Fail-closed on any corruption
- SHA256SUMS provided for release artifacts

## Intended Use

This repository exists to be **pointed at**.

It demonstrates the minimum structure required to:
- Preserve determinism
- Prevent silent drift
- Make integrity inspectable

## Release Artifacts

- Compiled `dist/` output
- `SHA256SUMS` for verification
- Git tag: `v1.0.0`

---

This release is complete and sealed.
