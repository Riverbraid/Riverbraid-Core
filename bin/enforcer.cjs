const fs = require('fs');
const { calculateEntropy } = require('../lib/thermodynamics/governor.cjs');

console.log("🛡️  ENFORCING THERMODYNAMIC SOVEREIGNTY...");

try {
    const manifest = JSON.parse(fs.readFileSync('/workspaces/Riverbraid-Core/MANIFEST.json'));
    const entropy = calculateEntropy(JSON.stringify(manifest));
    
    if (entropy > 5.0) {
        console.error(`❌ ENTROPY BREACH: ${entropy.toFixed(4)} bits/sym. SHUTTING DOWN.`);
        process.exit(1);
    }
    
    console.log(`✅ Sovereignty Confirmed. Signal: ${entropy.toFixed(4)} bits/sym.`);
} catch (e) {
    console.error("❌ ENFORCEMENT FAILED: Manifest missing or corrupt.");
    process.exit(1);
}
