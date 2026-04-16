const crypto = require('crypto');

/**
 * Validates a hash chain by verifying the previous proof 
 * and current state converge on a new deterministic proof.
 */
function verifyChain(prevProof, currentRoot, hardwareId, targetProof) {
    const input = `${prevProof}:${currentRoot}:${hardwareId}`;
    const generated = crypto.createHash('sha256').update(input).digest('hex');
    return generated === targetProof;
}

function foldHash(prevProof, currentRoot, hardwareId) {
    const input = `${prevProof}:${currentRoot}:${hardwareId}`;
    return crypto.createHash('sha256').update(input).digest('hex');
}

module.exports = { foldHash, verifyChain };
