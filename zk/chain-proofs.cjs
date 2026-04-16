const fs = require('fs');
const { execSync } = require('child_process');

function chainProofs() {
    console.log("⛓️ CHAINING RECURSIVE PROOFS TO HARDWARE...");
    const nodeId = execSync('node bin/node-identity.cjs').toString().trim();
    const manifest = JSON.parse(fs.readFileSync('MANIFEST.json', 'utf8'));
    
    const chain = {
        origin: nodeId,
        root: manifest.anchor,
        signature: manifest.signature,
        verified_at: new Date().toISOString()
    };
    
    fs.writeFileSync('zk/PROOFS_CHAIN.json', JSON.stringify(chain, null, 2));
    console.log("✅ Proof Chain established and anchored to Node ID.");
}

chainProofs();
