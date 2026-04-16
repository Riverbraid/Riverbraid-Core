const { execSync } = require('child_process');
const fs = require('fs');

function runTest(name, command) {
    try {
        console.log(`🧪 Testing ${name}...`);
        execSync(command);
        console.log(`✅ ${name} Passed.`);
    } catch (e) {
        console.error(`❌ ${name} FAILED.`);
        process.exit(1);
    }
}

console.log("💎 STARTING RIVERBRAID CORE INVARIANTS TEST\n");

runTest("Mechanical Identity", "node bin/node-identity.cjs");
runTest("Manifest Alignment", "node bin/recovery/self-heal.cjs");
runTest("Recursive Proof Generation", "node zk/prove.cjs 0");

console.log("\n✨ CORE INTEGRITY VERIFIED: ABSOLUTE");
