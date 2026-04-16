const fs = require('fs');
const path = require('path');

function getCurrentRoot() {
    return fs.readFileSync(path.join(process.cwd(), 'MERKLE_ROOT'), 'utf8').trim();
}

function verifySwarm(expectedRoot) {
    const anchorsDir = path.join(process.cwd(), 'anchors');
    if (!fs.existsSync(anchorsDir)) return false;

    const anchors = fs.readdirSync(anchorsDir);
    if (anchors.length === 0) return false;

    const matches = anchors.filter(f => {
        const val = fs.readFileSync(path.join(anchorsDir, f), 'utf8').trim();
        return val === expectedRoot;
    });

    // Quorum Requirement: 66% must agree on the root
    return matches.length >= Math.ceil(anchors.length * 0.66);
}

module.exports = { verifySwarm, getCurrentRoot };
