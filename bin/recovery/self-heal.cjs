const fs = require('fs');
const crypto = require('crypto');

function heal() {
    console.log("🛠️ INITIALIZING SELF-HEALING PROTOCOL...");
    if (!fs.existsSync('MANIFEST.json')) {
        console.error("❌ Critical Failure: MANIFEST.json not found. Recovery impossible.");
        process.exit(1);
    }

    const manifest = JSON.parse(fs.readFileSync('MANIFEST.json', 'utf8'));
    let issuesFound = 0;
    
    manifest.files.forEach(file => {
        if (fs.existsSync(file.path)) {
            const content = fs.readFileSync(file.path);
            const currentHash = crypto.createHash('sha256').update(content).digest('hex');
            
            if (currentHash !== file.hash) {
                console.log(`⚠️ Corruption detected in ${file.path}. Invariant violated.`);
                issuesFound++;
            }
        } else {
            console.log(`❌ Missing file: ${file.path}`);
            issuesFound++;
        }
    });

    if (issuesFound === 0) {
        console.log("✅ Structural Integrity Audit Complete: No drift detected.");
    } else {
        console.log(`\n🚨 Audit complete. ${issuesFound} discrepancy/ies found. Re-sync required.`);
    }
}

heal();
