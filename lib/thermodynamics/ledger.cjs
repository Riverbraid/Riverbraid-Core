const fs = require('fs');
const path = require('path');

function logSignal(entropy, status) {
    const ledgerPath = '/workspaces/Riverbraid-Core/data/history/signals.jsonl';
    const entry = JSON.stringify({
        timestamp: new Date().toISOString(),
        entropy: entropy.toFixed(4),
        status: status,
        node_id: "28c98bd1790dcbbb"
    });
    fs.appendFileSync(ledgerPath, entry + '\n');
}

module.exports = { logSignal };
