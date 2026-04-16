const crypto = require('crypto');
/**
 * Recursive Hash Chain: Deterministic state evolution.
 * This is structural preparation for future zk-SNARK integration.
 */
function foldHash(previousHash, currentRoot, hardwareId) {
    const input = `${previousHash}:${currentRoot}:${hardwareId}`;
    return crypto.createHash('sha256').update(input).digest('hex');
}
module.exports = { foldHash };
