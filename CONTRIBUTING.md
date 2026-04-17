# Contributing

Changes are accepted only if they improve determinism, auditability, or clarity without weakening verification.

## Requirements

- keep LF line endings
- do not add nondeterministic inputs
- do not create duplicate verifiers
- keep one canonical entrypoint: `run-vectors.cjs`

## Before opening a pull request

```bash
node run-vectors.cjs snapshot
node run-vectors.cjs verify
npm test
```
