#!/bin/sh
set -e

# --- Riverbraid Hermetic Verifier v2 ---
# 1. Verify File Integrity against the Floor (SHA256SUMS)
sha256sum -c --quiet SHA256SUMS || { echo "❌ ERR: HASH_MISMATCH"; exit 1; }

# 2. Verify Merkle Integrity (Protocol v2: H(SHA256SUMS))
# This derives the root from the verified hash list, ensuring a single chain of truth.
EXPECTED=$(cut -d ' ' -f1 SHA256SUMS | sort | sha256sum | cut -d ' ' -f1)
ACTUAL=$(cat MERKLE_ROOT | tr -d ' \n')

if [ "$EXPECTED" != "$ACTUAL" ]; then
  echo "❌ ERR: MERKLE_MISMATCH"
  echo "   expected: $EXPECTED"
  echo "   actual:   $ACTUAL"
  exit 1
fi

echo "✅ PASS"
