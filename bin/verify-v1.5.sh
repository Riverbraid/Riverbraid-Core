#!/usr/bin/env bash
set -euo pipefail
EXPECTED_NODE="v20.11.0"
echo "== Riverbraid v1.5.0 Verification Gate =="
NODE_VERSION=$(node -v)
[[ "$NODE_VERSION" != *"$EXPECTED_NODE"* ]] && echo "FATAL: Node mismatch" && exit 1
echo "✓ Node locked ($NODE_VERSION)"
node bin/run-vectors.cjs verify
echo "== Verification Complete =="
