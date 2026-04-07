'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { computeSwarmRoot, normalizeAgents } = require('./swarm-hash.cjs');
const { canonicalJSONStringify, sortValue } = require('./canonical-json.cjs');

function main() {
  const agentsRoot = process.argv[3] || '/workspaces';
  const manifestPath = './swarm-manifest.json';
  const signaturesPath = './swarm-signatures.json';

  const agents = fs.readdirSync(agentsRoot)
    .filter(name => name.startsWith('Riverbraid-') && name.endsWith('-Gold'))
    .map(agentId => {
      const rootPath = path.join(agentsRoot, agentId, 'agent_root.txt');
      if (!fs.existsSync(rootPath)) return null;
      const root = fs.readFileSync(rootPath, 'utf8').trim().toLowerCase();
      return { id: agentId, root };
    })
    .filter(Boolean);

  const normalizedAgents = normalizeAgents(agents);
  const swarmRoot = computeSwarmRoot(normalizedAgents);
  
  let manifestVersion = 1;
  if (fs.existsSync(manifestPath)) {
    const existing = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifestVersion = (existing.manifest_version || 0) + 1;
  }

  const manifest = sortValue({
    agents: normalizedAgents,
    created_at: new Date().toISOString(),
    hash_alg: 'sha256',
    manifest_version: manifestVersion,
    swarm_root: swarmRoot,
    version: 1
  });

  const manifestStr = canonicalJSONStringify(manifest) + '\n';
  fs.writeFileSync(manifestPath, manifestStr, 'utf8');
  
  const manifestSha = crypto.createHash('sha256').update(manifestStr).digest('hex');
  const signaturesDoc = { target_file: 'swarm-manifest.json', target_sha256: manifestSha, signatures: [] };
  
  fs.writeFileSync(signaturesPath, JSON.stringify(sortValue(signaturesDoc), null, 2));
  process.stdout.write(`manifest_version: ${manifestVersion}\nswarm_root: ${swarmRoot}\n`);
}
main();
