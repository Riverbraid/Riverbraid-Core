const fs = require('fs');
const crypto = require('crypto');
const { execSync } = require('child_process');

const fingerprint = execSync('node bin/node-identity.cjs').toString();
const manifest = JSON.parse(fs.readFileSync('MANIFEST.json', 'utf8'));

manifest.nodeId = fingerprint;
manifest.signature = crypto.createHash('sha256')
    .update(manifest.anchor + fingerprint)
    .digest('hex');

fs.writeFileSync('MANIFEST.json', JSON.stringify(manifest, null, 2));
console.log(`✅ MANIFEST SEALED: Signed by Node [${fingerprint}]`);
