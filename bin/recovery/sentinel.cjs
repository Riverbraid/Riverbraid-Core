const fs = require('fs');
const { execSync } = require('child_process');

function analyzeTrend() {
    const ledgerPath = '/workspaces/Riverbraid-Core/data/history/signals.jsonl';
    if (!fs.existsSync(ledgerPath)) {
        console.log("⚖️  No historical ledger found. Sentinel standby.");
        return;
    }

    const lines = fs.readFileSync(ledgerPath, 'utf8').trim().split('\n');
    const recent = lines.slice(-3).map(line => {
        try { return JSON.parse(line); } catch(e) { return null; }
    }).filter(x => x);

    if (recent.length < 3) {
        console.log("⚖️  Insufficient historical data for trend analysis. Sentinel standby.");
        return;
    }

    // Check if the last three signals consistently exceeded the 5.0 entropy threshold
    const isFailing = recent.every(entry => parseFloat(entry.entropy) > 5.0);

    if (isFailing) {
        console.error("🚨 PERSISTENT THERMODYNAMIC DRIFT DETECTED. TRIGGERING AUTONOMOUS RECOVERY...");
        execSync('node /workspaces/Riverbraid-Core/bin/recovery/hard-reset.cjs', { stdio: 'inherit' });
    } else {
        console.log("✅ Trend Equilibrium: Coherent.");
    }
}

analyzeTrend();
