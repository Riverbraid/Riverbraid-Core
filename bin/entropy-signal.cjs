const fs = require('fs');
function calculateShannonEntropy(data) {
    const frequencies = {};
    for (let char of data) { frequencies[char] = (frequencies[char] || 0) + 1; }
    return Object.values(frequencies).reduce((sum, f) => {
        const p = f / data.length;
        return sum - p * Math.log2(p);
    }, 0);
}
function verifyEntropySignal() {
    const anchor = fs.readFileSync('MERKLE_ROOT', 'utf8').trim();
    const entropy = calculateShannonEntropy(anchor);
    console.log(`[Signal] Entropy: ${entropy.toFixed(4)} bits/sym (Heuristic)`);
    return entropy <= 4.0;
}
module.exports = { verifyEntropySignal };
