const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function hashFile(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

const threshold = JSON.parse(fs.readFileSync('./constitution.threshold.json'));
const current = hashFile('./run-vectors.cjs');

if (current !== threshold.merkle_root) {
  console.error("CRITICAL: SPATIAL INTEGRITY FAILURE");
  process.exit(1);
} else {
  console.log("SPATIAL INTEGRITY VERIFIED: HASH MATCHES THRESHOLD");
}
