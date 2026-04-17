# Riverbraid-Core

Riverbraid-Core is the deterministic constitutional verifier for the Riverbraid system.

## Scope

This repository has one narrow job:

- define the verification entrypoint
- define threshold policy
- seal a snapshot of governed files
- verify that current state still matches the sealed state

## Files

- `run-vectors.cjs`
- `constitution.threshold.json`
- `constitution.snapshot.json`

## Runtime

- Node `24.11.1`

## Commands

```bash
npm test
node run-vectors.cjs snapshot
node run-vectors.cjs verify
```

A state is valid only if:

- threshold policy is satisfied
- current governed files hash exactly to the sealed snapshot
- verification exits successfully
