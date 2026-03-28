#!/usr/bin/env bash
set -euo pipefail
echo "== Riverbraid v1.5.0 Verification Gate =="
node bin/run-vectors.cjs verify
echo "== Verification Complete =="
