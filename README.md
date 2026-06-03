# Riverbraid-Core

> Status: CORE_AUDIT_SURFACE
> Ring Role: Core / normative protocol authority
> Claim Boundary: deterministic integrity floor, byte audit, and ring governance only

Riverbraid-Core is a deterministic integrity floor for the Riverbraid architecture.

It defines the minimum governance substrate used to make structure, authority, and drift visible before trust is granted. It does not claim to implement the full experimental Riverbraid research surface. Outer repositories may extend, visualize, adapt, or experiment, but Riverbraid-Core remains the canonical reference for protocol authority and audit behavior.

## Role in Riverbraid

Riverbraid-Core is a canonical protocol authority surface within Riverbraid.

## Public verification boundary

This repository is part of the current Evaluation Kit canonical verification registry and defines core protocol authority and audit behavior for Riverbraid.

## Evidence boundary

This repository does not claim certification, legal approval, production readiness, absolute security, external audit, complete AI safety, adoption, registry freshness, or absence of defects.

## Canonical One-Liner

Riverbraid is an open-source deterministic integrity floor for AI governance: a fail-closed, byte-auditable architecture that makes structure, authority, and drift visible. Its broader research directions, including mathematical physics of cognition, memory-flow-truth braiding, and intent-aware compute, remain experimental surfaces built on top of this bounded floor.

## Core Function

Riverbraid-Core provides:
* Ring classification and constellation audit
* Required file surface verification
* Byte-level audit of tracked repository files
* BOM detection for text surfaces
* Dirty worktree detection
* Verification output validation
* Audit manifest generation
* Append-only audit trail recording

## Authority Boundary

Riverbraid-Core is normative for Riverbraid protocol governance.

It defines the audit substrate and verification rules. It does not implement domain-specific behavior for runtime forks, UI layers, signing tools, embedded ports, language surfaces, or experimental cognition layers.

Any repository outside Core must not redefine Riverbraid protocol semantics. It may only declare its role, expose its verification surface, and pass the applicable ring gates.

## Coupling Test

Any change to these files requires a full Ring 2 verification pass before being treated as valid:
* constellation-audit.mjs
* byte-audit.mjs
* cluster-manifest-v2.json
* verify-output.json
* audit-output.json
* AUDIT-MANIFEST.sha256
* AUDIT-TRAIL.ndjson

Required checks:

```bash
node constellation-audit.mjs --ring 2
node byte-audit.mjs --ring 2
```

Expected verified states:
* RING_GATE_PASS_VERIFIED
* BYTE_GATE_PASS_VERIFIED

## Scale Separation Gate

Core owns protocol authority and audit rules.

Outer rings own implementation surfaces, runtime experiments, bridges, tools, visualization, and communication layers.

Core must remain small enough to audit directly. New experimental behavior belongs outside Core unless it is required for the integrity floor itself.

## Linear vs Nonlinear Boundary

The Core audit path is linear:
1. Declare manifest
2. Check required files
3. Read verifier outputs
4. Hash tracked bytes
5. Reject BOM
6. Reject dirty worktrees
7. Emit audit manifest
8. Record audit trail

The broader Riverbraid research surface may remain nonlinear, experimental, expressive, or exploratory. That layer does not override Core verification.

## Stationary State Invariant

Riverbraid-Core is stationary when all of the following are true:
* Local worktree is clean
* Required files are present
* Verifier outputs parse successfully
* Ring 2 returns RING_GATE_PASS_VERIFIED
* Ring 2 returns BYTE_GATE_PASS_VERIFIED
* Audit manifest exists
* Audit trail records the verification event
* No UTF-8 BOM is present in tracked text files

## Verification

Run:

```bash
node constellation-audit.mjs --ring 2
node byte-audit.mjs --ring 2
```

## Claim Hygiene

Riverbraid-Core supports the bounded claim that Riverbraid has a working open-source deterministic integrity floor and governance artifact.

The broader claims around True AI, mathematical physics of cognition, memory-flow-truth braiding, resonance, and intent-aware compute remain active experimental directions unless implemented, tested, and verified in dedicated repositories.
