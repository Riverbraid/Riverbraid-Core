'use strict';
const crypto = require('crypto');
const { canonicalJSONStringify } = require('./canonical-json.cjs');
const HEX_RE = /^[0-9a-f]{64}$/;

function sha256Hex(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function validateHexRoot(root, label) {
  if (!HEX_RE.test(root)) {
    throw new Error(`${label}: invalid hex root "${root}" (must be 64 lowercase hex chars)`);
  }
}

function normalizeAgents(agents) {
  return [...agents]
    .map(a => {
      const root = String(a.root).toLowerCase();
      validateHexRoot(root, `agent "${a.id}"`);
      return { id: String(a.id), root };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

function computeSwarmRoot(agents) {
  const normalized = normalizeAgents(agents);
  const canonical = canonicalJSONStringify({ agents: normalized });
  return sha256Hex(Buffer.from(canonical, 'utf8'));
}

module.exports = { computeSwarmRoot, normalizeAgents, sha256Hex, validateHexRoot };
