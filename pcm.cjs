'use strict';
const { readFileSync } = require('fs');
const crypto = require('crypto');
const path = require('path');

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function verifyProof(moduleId, moduleDef) {
  if (!moduleDef.proof) {
    throw new Error(`PCM_VIOLATION: MISSING_PROOF for ${moduleId}`);
  }

  const proofPath = path.resolve(__dirname, moduleDef.proof.file);
  const proofRaw = readFileSync(proofPath, 'utf8');
  const proofHash = sha256(proofRaw);

  if (proofHash !== moduleDef.proof.hash.replace('sha256-', '')) {
    throw new Error(`PCM_VIOLATION: PROOF_HASH_MISMATCH for ${moduleId}`);
  }

  const proof = JSON.parse(proofRaw);
  const required = ['DET_001', 'ISO_001', 'CMR_001'];

  for (const property of required) {
    if (!proof.verifiedProperties.includes(property)) {
      throw new Error(`PCM_VIOLATION: UNSATISFIED_PROPERTY ${property} in ${moduleId}`);
    }
  }

  return true;
}

module.exports = { verifyProof };
