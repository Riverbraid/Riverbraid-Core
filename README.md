# Riverbraid-Core: The Frozen Anchor

## Overview
Riverbraid-Core provides the foundational invariant validation functions that all other Gold repositories depend on. It is the root of the trust chain, designed with zero external dependencies to ensure absolute determinism.

## Core Principles
1. **Deterministic Reproducibility**: Every function is pure; same input always produces the same output.
2. **ASCII Enforcement**: Prevents hidden Unicode attacks or "ghost" characters.
3. **Fail-Closed Semantics**: Any violation results in immediate system halt.

## API Reference
### `isSafeASCII(input)`
Validates that a string contains only safe ASCII characters.
### `enforceInvariant(condition, message)`
The primary "Gatekeeper" function for the cluster.

## Verification
`node -e 'import { isSafeASCII } from "./src/index.js"; console.log(isSafeASCII("Test"));'`
