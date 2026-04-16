const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function checkDrift() {
    const rootPath = path.join(process.cwd(), 'MERKLE_ROOT');
    const currentRoot = fs.readFileSync(rootPath, 'utf8').trim();
    
    // Check if anchors match the Merkle Root
    const anchors = fs.readdirSync('anchors').map(f => fs.readFileSync(path.join('anchors', f), 'utf8').trim());
    const validCount = anchors.filter(a => a === currentRoot).length;
    
    if (validCount / anchors.length < 0.66) {
        console.error(`🚨 PERPETUAL AUDIT FAILURE: Quorum collapsed. Current Root: ${currentRoot}`);
        process.exit(1);
    }
    console.log(`🛡️ Perpetual Audit: Stationary state confirmed (${validCount}/${anchors.length} anchors aligned).`);
}

checkDrift();
