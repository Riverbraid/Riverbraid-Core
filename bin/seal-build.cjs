const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const root = path.join(__dirname, '..');
const identity = JSON.parse(fs.readFileSync(path.join(root, 'data/identity/node_id.json')));

function hashDir(dir) {
    const files = fs.readdirSync(dir).filter(f => !f.startsWith('.') && f !== 'MANIFEST.json');
    let hash = crypto.createHash('sha256');
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isFile()) {
            hash.update(fs.readFileSync(fullPath));
        }
    });
    return hash.digest('hex');
}

const manifest = {
    node: identity.identity,
    timestamp: new Date().toISOString(),
    integrity: hashDir(path.join(root, 'lib')),
    status: "SEALED"
};

fs.writeFileSync(path.join(root, 'MANIFEST.json'), JSON.stringify(manifest, null, 2));
console.log(`✅ MANIFEST SEALED: Signed by Node [${identity.identity}]`);
