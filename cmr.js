'use strict';
const { readFileSync } = require('fs');
const crypto = require('crypto');
const path = require('path');

const ROOT = __dirname;
const MANIFEST = JSON.parse(readFileSync(path.join(ROOT, 'modules.constitution.json'), 'utf8'));

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function loadModule(moduleId) {
  const entry = MANIFEST.modules[moduleId];
  if (!entry) throw new Error(`CMR_VIOLATION: UNKNOWN_MODULE ${moduleId}`);
  
  const fullPath = path.resolve(ROOT, entry.path);
  const code = readFileSync(fullPath, 'utf8');
  const hash = sha256(code);

  if (hash !== entry.hash.replace('sha256-', '')) {
    throw new Error(`CMR_VIOLATION: HASH_MISMATCH ${moduleId}`);
  }
  return require(fullPath);
}

module.exports = { loadModule };
