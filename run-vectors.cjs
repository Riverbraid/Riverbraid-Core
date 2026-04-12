#!/usr/bin/env node
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const VERSION = "1.5.0";
const EXPECTED_ROOT = "c9560f";
const ALLOWED_EXTENSIONS = ['.js', '.cjs', '.json', '.md', '.sh', '.yml', '.yaml'];
function computeHash(dir) {
    const files = fs.readdirSync(dir, { recursive: true }).filter(f => ALLOWED_EXTENSIONS.includes(path.extname(f)) && f !== 'run-vectors.cjs').sort();
    const hash = crypto.createHash('sha256');
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isFile()) {
            const content = fs.readFileSync(fullPath);
            if (content.includes('\r\n')) throw new Error(`CRLF in ${file}`);
            if (content[0] === 0xEF && content[1] === 0xBB && content[2] === 0xBF) throw new Error(`BOM in ${file}`);
            hash.update(content);
        }
    });
    return hash.digest('hex').substring(0, 6);
}
function verifyGo44(currentRoot) {
    const isStationary = currentRoot === EXPECTED_ROOT;
    const hDiv = isStationary ? 0 : 1;
    console.log(`[Go 44 Predicate] H_div: ${hDiv}`);
    if (hDiv === 0) {
        console.log("✅ GO 44: Verified Stationary Consensus State (VSCS)");
        return true;
    } else {
        console.log("❌ FAIL-CLOSED: State Divergence Detected");
        return false;
    }
}
const mode = process.argv[2] || 'verify';
try {
    console.log(`--- Riverbraid Structural Governance (v${VERSION}) ---`);
    const actualRoot = computeHash(process.cwd());
    console.log(`Canonical Merkle Root: ${actualRoot}`);
    if (mode === 'verify') {
        if (!verifyGo44(actualRoot)) process.exit(1);
    }
} catch (err) {
    console.error(`Verification Failed: ${err.message}`);
    process.exit(1);
}
