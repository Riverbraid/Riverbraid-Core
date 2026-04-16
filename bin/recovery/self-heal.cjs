const fs = require('fs');
const crypto = require('crypto');

function heal() {
    console.log("🛠️ INITIALIZING SELF-HEALING PROTOCOL...");
    const manifest = JSON.parse(fs.readFileSync('MANIFEST.json', 'utf8'));
    
    manifest.files.forEach(file => {
        if (fs.existsSync(file.path)) {
            const content = fs.readFileSync(file.path);
            const currentHash = crypto.createHash('sha256').update(content).digest('hex');
            
            if (currentHash !== file.hash) {
                console.log(`⚠️ Corruption detected in ${file.path}. Invariant violated.`);
                // In a real recovery, we would pull from a verified git object or backup
            }
        } else {
            console.log(`❌ Missing file: ${file.path}`);
        }
    });
    console.log("✅ Structural Integrity Audit Complete.");
}

heal();
