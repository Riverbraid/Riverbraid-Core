#!/bin/bash
set -e
echo "Sealing Riverbraid Core..."
node bin/gate.mjs --snapshot --all
VERIFIER_HASH=$(sha256sum run-vectors.cjs | awk '{print $1}')
cat > constitution.threshold.json <<EOG
{
  "threshold": 1,
  "verifier_integrity": "$VERIFIER_HASH"
}
EOG
cd Go44 && make clean && make && cd ..
./Go44/riverbraid_vm --init --constitution constitution.threshold.json
rm -f MEMORY.*.json
node run-vectors.cjs --seal
echo "✅ Seal complete. Run 'node run-vectors.cjs verify' to confirm."
