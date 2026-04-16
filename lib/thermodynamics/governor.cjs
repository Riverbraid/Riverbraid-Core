const fs = require('fs');

function calculateShannonEntropy(data) {
    const frequencies = {};
    for (let i = 0; i < data.length; i++) {
        const char = data[i];
        frequencies[char] = (frequencies[char] || 0) + 1;
    }
    return Object.values(frequencies).reduce((sum, freq) => {
        const p = freq / data.length;
        return sum - p * Math.log2(p);
    }, 0);
}

function verifyEquilibrium() {
    const manifest = fs.readFileSync('MANIFEST.json', 'utf8');
    const entropy = calculateShannonEntropy(manifest);
    const threshold = 4.0;

    console.log(`\n🌀 Spinfoam Signal: ${entropy.toFixed(4)} bits/sym`);
    
    if (entropy > threshold) {
        console.error(`🚨 EQUILIBRIUM VIOLATED: System entropy (${entropy.toFixed(4)}) exceeds threshold (${threshold}).`);
        process.exit(1);
    }
    console.log("✅ Equilibrium Maintained: System is coherent.");
}

module.exports = { verifyEquilibrium };
