'use strict';
const fs = require('fs');
const crypto = require('crypto');
const { computeSwarmRoot } = require('./swarm-hash.cjs');
const { canonicalJSONStringify } = require('./canonical-json.cjs');

function main() {
  const manifestPath = './swarm-manifest.json';
  const signaturesPath = './swarm-signatures.json';

  if (!fs.existsSync(manifestPath) || !fs.existsSync(signaturesPath)) {
    console.error('Error: Manifest or signatures file missing.');
    process.exit(1);
  }

  const manifestStr = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestStr);
  const signatures = JSON.parse(fs.readFileSync(signaturesPath, 'utf8'));

  // 1. Check Payload Integrity
  const computedSha = crypto.createHash('sha256').update(manifestStr).digest('hex');
  if (computedSha !== signatures.target_sha256) {
    console.error('FAIL: Manifest bytes do not match signature target_sha256.');
    process.exit(1);
  }

  // 2. Recompute Swarm Root from Agent List
  const recomputedRoot = computeSwarmRoot(manifest.agents);
  if (recomputedRoot !== manifest.swarm_root) {
    console.error('FAIL: swarm_root is inconsistent with agent roots.');
    process.exit(1);
  }

  console.log('VERIFIED: Swarm Manifest is internally coherent.');
  console.log(`Swarm Root: ${manifest.swarm_root}`);
}
main();
