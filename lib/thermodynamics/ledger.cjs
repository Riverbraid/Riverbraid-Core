const fs = require('fs');
const path = require('path');

const LOG_FILE = '/workspaces/Riverbraid-Core/data/history/signals.jsonl';

function logSignal(entropy, status) {
    const entry = JSON.stringify({
        timestamp: new Date().toISOString(),
        entropy: entropy.toFixed(4),
        status: status
    });
    fs.appendFileSync(LOG_FILE, entry + '\n');
}

module.exports = { logSignal };
