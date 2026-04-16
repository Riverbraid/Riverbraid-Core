const crypto = require('crypto');

function calculateEntropy(data) {
    const frequencies = {};
    for (let i = 0; i < data.length; i++) {
        const char = data[i];
        frequencies[char] = (frequencies[char] || 0) + 1;
    }
    let entropy = 0;
    const len = data.length;
    for (const char in frequencies) {
        const p = frequencies[char] / len;
        entropy -= p * Math.log2(p);
    }
    return entropy;
}

module.exports = { calculateEntropy };
