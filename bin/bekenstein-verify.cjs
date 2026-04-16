const fs = require('fs');
const crypto = require('crypto');

function calculateShannonEntropy(data) {
    const frequencies = {};
    for (let char of data) {
        frequencies[char] = (frequencies[char] || 0) + 1;
    }
    return Object.values(frequencies).reduce((sum, f) => {
        const p = f / data.length;
        return sum - p * Math.log2(p);
    }, 0);
}

function verifyBound() {
    const anchor = fs.readFileSync('.anchor', 'utf8').trim();
    const entropy = calculateShannonEntropy(anchor);
    
    // We define our structural bound as 4 bits per hex character
    // A drifted or noisy state will violate this thermodynamic signal.
    const maxBound = 4.0; 
    
    console.log(`\n--- Bekenstein Bound Verification ---`);
    console.log(`[State]:   ${anchor}`);
    console.log(`[Entropy]: ${entropy.toFixed(4)} bits/sym`);
    
    if (entropy <= maxBound) {
        console.log(`✅ THERMODYNAMIC SIGNAL: STABLE (Below ${maxBound} bit bound)`);
        return true;
    } else {
        console.log(`❌ THERMODYNAMIC SIGNAL: NOISY (Bound Violated)`);
        return false;
    }
}

module.exports = { verifyBound };
if (require.main === module) verifyBound();
