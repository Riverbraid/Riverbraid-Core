# Riverbraid-Core

Riverbraid-Core provides the foundational invariant functions that all other Gold repositories import and use. It validates determinism, enforces ASCII-only text, and implements fail-closed semantics.

## Purpose
This repository is the root of the trust chain. It contains zero external dependencies to minimize the attack surface and ensure 100% determinism across different environments.

## API

### isSafeASCII(input)
Validates that a string contains only standard ASCII characters.
- **Input:** `string`
- **Returns:** `boolean`

### enforceInvariant(condition, message)
If the condition is false, the process exits immediately with a fatal error code.

## Verification
```bash
node -e 'import { isSafeASCII } from "./src/index.js"; console.log(isSafeASCII("Test\n"));'
---

### 🏛️ Step 2: The Verification Infrastructure
You noted the absence of the master verification script. We will create `riverbraid-verify.sh` in the **Golds** repository to act as the cluster's "Institutional Handshake."



```bash
sudo tee /workspaces/Riverbraid-Golds/riverbraid-verify.sh > /dev/null << 'EOF'
#!/bin/bash
# @linear
# Riverbraid Cluster Institutional Verification Script

echo "--- STARTING INSTITUTIONAL INTEGRITY AUDIT ---"

# 1. Toolchain Check
NODE_VERSION=$(node -v)
if [[ $NODE_VERSION != v20* ]]; then
  echo "FATAL: Node version $NODE_VERSION does not match Institutional Standard v20.x"
  exit 1
fi

# 2. Execute Integrity Gates
python3 gate2_byte_audit.py && \
python3 gate3_entropy_scan.py && \
python3 gate4_generate_seal.py && \
python3 gate5_coherence_check.py && \
python3 gate6_invariant_validator.py

if [ $? -eq 0 ]; then
  echo "--- CLUSTER_VERIFIED_STATIONARY ---"
  cat /workspaces/TRUTH.SEAL.sha256
else
  echo "--- VERIFICATION_FAILED ---"
  exit 1
fi
