# Riverbraid Standard v1.0.0

Canonical reference implementation of a deterministic capacity gate and cryptographic reflection ledger.

## Layers

1. Frozen Core — deterministic math only
2. Anchor Sentinel — owns time and identity
3. Reflection Ledger — owns persistence and cryptography

## Secret Policy

RIVERBRAID_SECRET is mandatory.
Missing or empty secret aborts execution.

## Verification

npm run test  
RIVERBRAID_SECRET=dev_only npm run audit
