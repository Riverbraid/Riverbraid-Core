const fs = require('fs');
const path = require('path');
const { snapshot } = require('/workspaces/riverbraid-engine/index.js');

const mode = process.argv[2];
const root = process.cwd();
const schemaPath = path.join(root, 'snapshot.schema.cjs');
const schema = fs.existsSync(schemaPath) ? require(schemaPath) : { include: () => true };

if (mode === 'snapshot') {
  snapshot(root, schema);
  console.log('Snapshot written.');
} else if (mode === 'verify') {
  const snapPath = path.join(root, 'constitution.snapshot.json');
  if (!fs.existsSync(snapPath)) {
    console.error('Missing snapshot.');
    process.exit(1);
  }
  const snap = JSON.parse(fs.readFileSync(snapPath));
  const current = snapshot(root, schema);
  
  if (current.merkle_root === snap.merkle_root) {
    console.log('Verification successful.');
    process.exit(0);
  } else {
    console.error('Verification failed: root mismatch.');
    process.exit(1);
  }
} else {
  console.log('Usage: node run-vectors.cjs [snapshot|verify]');
}
