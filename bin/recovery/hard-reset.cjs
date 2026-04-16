const { execSync } = require('child_process');
const fs = require('fs');

console.log("⚠️ INITIALIZING HARD RECOVERY TO STATIONARY STATE...");

try {
    // 1. Force clear local changes
    execSync('git reset --hard HEAD');
    // 2. Re-generate and Re-Seal
    execSync('node bin/generate-manifest.cjs');
    execSync('node bin/seal-build.cjs');
    // 3. Verify
    const audit = execSync('node bin/recovery/self-heal.cjs').toString();
    console.log(audit);
    console.log("✅ SYSTEM RESTORED TO STATIONARY STATE.");
} catch (e) {
    console.error("❌ RECOVERY FAILED: Manual intervention required.");
    process.exit(1);
}
