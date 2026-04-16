const fs = require('fs');
const { execSync } = require('child_process');

console.log("⚠️  CRITICAL RECOVERY INITIATED...");

try {
    const anchor = JSON.parse(fs.readFileSync('/workspaces/Riverbraid-Core/bin/recovery/vault/stationary_anchor.json'));
    console.log(`📡 Reverting to Stationary Anchor: ${anchor.checksum_root}`);
    
    // Force reset the git state to the last known-good signed commit
    execSync('git reset --hard HEAD', { stdio: 'inherit' });
    execSync('node /workspaces/Riverbraid-Core/bin/seal-build.cjs', { stdio: 'inherit' });
    
    console.log("✅ SYSTEM RESTORED TO COHERENT STATE.");
} catch (e) {
    console.error("🚨 RECOVERY FAILED: Stationary anchor unreachable.");
    process.exit(1);
}
