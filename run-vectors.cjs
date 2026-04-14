((env) => { const WHITELIST = ['PATH', 'GPG_TTY', 'HOME', 'USER', 'LANG']; Object.keys(env).forEach(key => { if (!WHITELIST.includes(key)) delete env[key]; }); env.NODE_NO_WARNINGS = '1'; })(process.env);

const { execSync } = require("child_process");
const fs = require('fs');
const crypto = require('crypto');

function checkSemanticBridge(constitution) {
  const bridge = JSON.parse(fs.readFileSync('semantic-bridge.json', 'utf8'));
  
  // Gate: Scale Separation (Linear vs Nonlinear)
  const isLinear = bridge.gates.linear.includes("hygiene");
  if (!isLinear) {
    console.error("SEMANTIC_VIOLATION: Scale Separation Gate failed.");
    process.exit(1);
  }
  
  console.log("Semantic Bridge: Scale Separation Active. ✅");
  return bridge;
}

function checkSelfIntegrity(constitution) {
  const currentContent = fs.readFileSync(__filename, 'utf8');
  const currentHash = crypto.createHash('sha256').update(currentContent).digest('hex');
  
  if (currentHash !== constitution.verifier_integrity) {
    console.error("COUPLING_VIOLATION: Verifier logic has drifted.");
    process.exit(1);
  }
  console.log("Integrity: Verifier is coupled. ✅");
}

function verify() {
  const constitution = JSON.parse(fs.readFileSync('constitution.snapshot.json', 'utf8'));
  
  checkSelfIntegrity(constitution);
  checkSemanticBridge(constitution);

  if (process.env.RB_BYPASS_VERIFY !== "1") {
    try {
      execSync('gpg --status-fd 1 --verify "constitution.snapshot.json.asc" 2>/dev/null');
      console.log("Stationary Floor (v1.5.0): ✅");
    } catch (e) {
      console.error("THRESHOLD_VIOLATION: GPG check failed.");
      process.exit(1);
    }
  }
}

if (process.argv.includes('verify')) {
  verify();
}
