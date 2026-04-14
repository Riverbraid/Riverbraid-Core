#!/bin/sh
set -e
# --- Riverbraid Hermetic Verifier v2 ---
# 1. Verify File Integrity
sha256sum -c --quiet SHA256SUMS || { echo "❌ ERR: HASH_MISMATCH"; exit 1; }
# 2. Verify Merkle Integrity (H(SHA256SUMS))
EXPECTED=$(cut -d ' ' -f1 SHA256SUMS | sort | sha256sum | cut -d ' ' -f1)
ACTUAL=$(cat MERKLE_ROOT | tr -d ' \n')
if [ "$EXPECTED" != "$ACTUAL" ]; then
  echo "❌ ERR: MERKLE_MISMATCH"
  exit 1
fi
echo "✅ PASS"
