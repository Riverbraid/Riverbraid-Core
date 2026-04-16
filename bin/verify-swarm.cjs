const fs = require('fs');
const path = require('path');

function getCurrentRoot() {
  return "01a777";  // Stationary root for v1.5.0
}

function verifySwarm(targetRoot) {
  const anchorPath = path.join(process.cwd(), '.anchor');
  if (!fs.existsSync(anchorPath)) {
    console.error("❌ Missing .anchor file");
    return false;
  }
  const content = fs.readFileSync(anchorPath, 'utf8').trim();
  return content === targetRoot;
}

module.exports = { verifySwarm, getCurrentRoot };
