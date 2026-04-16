const fs = require('fs');
const path = require('path');
const { calculateShannonEntropy } = require('../lib/thermodynamics/governor.cjs');

function enforceSovereignty() {
    console.log("🛡️  ENFORCING THERMODYNAMIC SOVEREIGNTY...");
    
    // Absolute path to the Core Manifest
    const manifestPath = '/workspaces/Riverbraid-Core/MANIFEST.json';
    
    if (!fs.existsSync(manifestPath)) {
        console.error("🚨 CRITICAL FAILURE: Manifest missing at " + manifestPath);
        process.exit(1);
    }

    const manifest = fs.readFileSync(manifestPath, 'utf8');
    const entropy = calculateShannonEntropy(manifest);
    const LIMIT = 5.0;

    if (entropy > LIMIT) {
        console.error(`🚨 CRITICAL FAILURE: Entropy (${entropy.toFixed(4)}) exceeds Sovereign Limit (${LIMIT}).`);
        console.error("System is entering Fail-Closed state.");
        process.exit(1);
    }
    
    console.log(`✅ Sovereignty Confirmed. Signal: ${entropy.toFixed(4)} bits/sym.`);
}

enforceSovereignty();
