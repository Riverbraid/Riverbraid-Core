'use strict';
const { readFileSync } = require('fs');
const crypto = require('crypto');
const path = require('path');
const { verifyProof } = require('./pcm.cjs');

const ROOT = __dirname;
const MANIFEST = JSON.parse(readFileSync(path.join(ROOT, 'modules.constitution.json'), 'utf8'));
const CACHE = new Map();

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function loadModule(id) {
  if (CACHE.has(id)) return CACHE.get(id);

  const m = MANIFEST.modules[id];
  if (!m) throw new Error(`CCDG_VIOLATION: UNKNOWN_MODULE ${id}`);

  // 1. Recursive Dependency Resolution (Topological)
  if (m.dependsOn) {
    for (const dep of m.dependsOn) {
      loadModule(dep);
    }
  }

  // 2. Proof Verification
  verifyProof(id, m);

  // 3. Integrity Check
  const fullPath = path.resolve(ROOT, m.path);
  const code = readFileSync(fullPath, 'utf8');
  if (sha256(code) !== m.hash.replace('sha256-', '')) {
    throw new Error(`CCDG_VIOLATION: HASH_MISMATCH ${id}`);
  }

  const mod = require(fullPath);
  CACHE.set(id, mod);
  return mod;
}

module.exports = { loadModule };
