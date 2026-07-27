# Riverbraid-Core

> Public evaluation starts at [Riverbraid-Evaluation-Kit](https://github.com/Riverbraid/Riverbraid-Evaluation-Kit). This repository is the normative protocol authority and audit substrate; it is not the public reproduction kit.

> Status: CORE_AUDIT_SURFACE
> Repository Ring: 0 — normative protocol authority
> Dependent Compatibility Gate: Ring 2 for coupling-sensitive Core changes
> Claim Boundary: deterministic integrity floor, byte audit, and ring governance only

Riverbraid-Core is a deterministic integrity floor for the Riverbraid architecture.

It defines the minimum governance substrate used to make structure, authority, and drift visible before trust is granted. It does not claim to implement the full experimental Riverbraid research surface. Outer repositories may extend, visualize, adapt, or experiment, but Riverbraid-Core remains the canonical reference for protocol authority and audit behavior.

## Role in Riverbraid

Riverbraid-Core is a canonical protocol authority surface within Riverbraid.

## Public verification boundary

This repository is part of the current Evaluation Kit canonical verification registry and defines core protocol authority and audit behavior for Riverbraid.

The Evaluation Kit is the public reproduction and evaluation entrance. Core exposes the normative rules and bounded local audit commands that the public profile references.

## Evidence boundary

This repository does not claim certification, legal approval, production readiness, absolute security, external audit, complete AI safety, adoption, registry freshness, or absence of defects.

The machine-readable declaration in `claim-ceiling.json` is a claim-boundary artifact, not execution evidence. Its exact applicability is bound only when the containing commit and artifact digest are observed by an audit packet.

## Canonical One-Liner

Riverbraid is an open-source deterministic integrity floor for AI governance: a fail-closed, byte-auditable architecture that makes structure, authority, and drift visible. Its broader research directions, including mathematical physics of cognition, memory-flow-truth braiding, and intent-aware compute, remain experimental surfaces built on top of this bounded floor.

## Core Function

Riverbraid-Core provides:

- Ring classification and constellation audit
- Required file surface verification
- Byte-level audit of tracked repository files
- BOM detection for text surfaces
- Dirty worktree detection
- Verification output validation
- Audit manifest generation
- Append-only audit trail recording

## Authority Boundary

Riverbraid-Core is normative for Riverbraid protocol governance.

It defines the audit substrate and verification rules. It does not implement domain-specific behavior for runtime forks, UI layers, signing tools, embedded ports, language surfaces, or experimental cognition layers.

Any repository outside Core must not redefine Riverbraid protocol semantics. It may only declare its role, expose its verification surface, and pass the applicable ring gates.

## Ring vocabulary

Riverbraid-Core is classified as a Ring 0 repository in the current cluster manifest.

A Ring 2 pass required after a coupling-sensitive Core change is a dependent compatibility gate against the declared infrastructure set. It does not make Core a Ring 2 repository. Historical phase-number labels do not define current authority or verification state.

See `VOCABULARY_LOCK.md` and `AUTHORITY.md` for the controlling terminology.

## Fixture policy

Core does not retain empty contract fixtures as evidence-shaped placeholders. The current fixture policy is recorded in `fixtures/README.md`.

A future fixture enters Core only when it has a declared consumer, schema or structural contract, expected result and exit behavior, negative cases, and execution-evidence relationship. Public reproduction fixtures otherwise belong to the versioned Evaluation Kit profile.

## Coupling Test

Any change to these files requires a full Ring 2 compatibility pass before being treated as valid:

- `constellation-audit.mjs`
- `byte-audit.mjs`
- `cluster-manifest-v2.json`
- `verify-output.json`
- `audit-output.json`
- `AUDIT-MANIFEST.sha256`
- `AUDIT-TRAIL.ndjson`

Required check:

```bash
npm run verify:compatibility
```

Equivalent underlying commands:

```bash
node constellation-audit.mjs --ring 2
node byte-audit.mjs --ring 2
```

Expected verified states:

- `RING_GATE_PASS_VERIFIED`
- `BYTE_GATE_PASS_VERIFIED`

## Scale Separation Gate

Core owns protocol authority and audit rules.

Outer rings own implementation surfaces, runtime experiments, bridges, tools, visualization, and communication layers.

Core must remain small enough to audit directly. New experimental behavior belongs outside Core unless it is required for the integrity floor itself.

## Linear vs Nonlinear Boundary

The Core audit path is linear:

1. Declare manifest.
2. Check required files.
3. Read verifier outputs.
4. Hash tracked bytes.
5. Reject BOM.
6. Reject dirty worktrees.
7. Emit audit manifest.
8. Record audit trail.

The broader Riverbraid research surface may remain nonlinear, experimental, expressive, or exploratory. That layer does not override Core verification.

## Stationary State Invariant

Riverbraid-Core is stationary when all of the following are true:

- Local worktree is clean.
- Required files are present.
- Verifier outputs parse successfully.
- The applicable ring gate returns its required verified state.
- The byte gate returns its required verified state.
- Audit manifest exists.
- Audit trail records the verification event.
- No UTF-8 BOM is present in tracked text files.

## Verification

For the bounded local Core authority surface, run:

```bash
npm run verify
```

For the dependent Ring 2 compatibility path after a coupling-sensitive Core change, run:

```bash
npm run verify:compatibility
```

For the public pinned reproduction path, use Riverbraid-Evaluation-Kit.

## Claim Hygiene

Riverbraid-Core supports the bounded claim that Riverbraid has a working open-source deterministic integrity floor and governance artifact under its implemented conditions.

The broader claims around True AI, mathematical physics of cognition, memory-flow-truth braiding, resonance, and intent-aware compute remain active experimental directions unless implemented, tested, and verified in dedicated repositories.
