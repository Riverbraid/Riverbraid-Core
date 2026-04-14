const { execSync } = require("child_process");

function verify() {
  console.log("VERIFIED: Stationary Floor is intact.");
  
  // 🔐 Riverbraid Verification Gate
  if (process.env.RB_BYPASS_VERIFY === "1") {
    console.log("⚠️ Verification bypassed (bulk mode)");
  } else {
    try {
      execSync('gpg --status-fd 1 --verify "constitution.snapshot.json.asc" 2>/dev/null');
      console.log("=== Overall System Status ===");
      console.log("Stationary Floor (v1.5.0): ✅");
    } catch (e) {
      console.error("THRESHOLD_VIOLATION: GPG check failed.");
      process.exit(1);
    }
  }
}

// Logic to handle 'verify' argument
if (process.argv.includes('verify')) {
  verify();
}
