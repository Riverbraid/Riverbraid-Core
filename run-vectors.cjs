const { execSync } = require("child_process");
const fs = require('fs');
const crypto = require('crypto');

function checkSelfIntegrity(constitution) {
  const currentContent = fs.readFileSync(__filename, 'utf8');
  const currentHash = crypto.createHash('sha256').update(currentContent).digest('hex');
  
  if (currentHash !== constitution.verifier_integrity) {
    console.error("COUPLING_VIOLATION: Verifier logic has drifted from the constitution.");
    console.error(`Expected: ${constitution.verifier_integrity}`);
    console.error(`Actual:   ${currentHash}`);
    process.exit(1);
  }
  console.log("Integrity: Verifier is coupled. ✅");
}

function verify() {
  const constitution = JSON.parse(fs.readFileSync('constitution.snapshot.json', 'utf8'));

  // 1. Check if the verifier itself has been tampered with
  checkSelfIntegrity(constitution);

  // 2. Riverbraid Verification Gate
  if (process.env.RB_BYPASS_VERIFY === "1") {
    console.log("⚠️ Verification bypassed (bulk mode)");
  } else {
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
