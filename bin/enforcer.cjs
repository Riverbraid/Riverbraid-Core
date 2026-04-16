const fs = require('fs');
const { calculateShannonEntropy } = require('../lib/thermodynamics/governor.cjs');

function enforceSovereignty() {
    console.log("🛡️  ENFORCING THERMODYNAMIC SOVEREIGNTY...");
    
    const manifest = fs.readFileSync('MANIFEST.json', 'utf8');
    const entropy = calculateShannonEntropy(manifest);
    const LIMIT = 5.0;

    if (entropy > LIMIT) {
        console.error(`🚨 CRITICAL FAILURE: Entropy (${entropy.toFixed(4)}) exceeds Sovereign Limit (${LIMIT}).`);
        console.error("System is entering Fail-Closed state. No execution permitted.");
        process.exit(1);
    }
    
    console.log(`✅ Sovereignty Confirmed. Signal: ${entropy.toFixed(4)} bits/sym.`);
}

enforceSovereignty();
