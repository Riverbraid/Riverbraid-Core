const { execSync } = require('child_process');
function reachConsensus(peerVotes, threshold = 0.66) {
    const totalNodes = peerVotes.length;
    const votes = {};
    peerVotes.forEach(vote => {
        if (vote.verified) {
            votes[vote.root] = (votes[vote.root] || 0) + 1;
        }
    });
    for (const [root, count] of Object.entries(votes)) {
        if (count / totalNodes >= threshold) {
            return { agreed: true, root, confidence: count / totalNodes };
        }
    }
    return { agreed: false };
}
module.exports = { reachConsensus };
