// riverbraid-shield.js - Dependency-free attestation logger
const fs = require('fs');
const path = require('path');

function logAttestation(context, root) {
  const logEntry = `${new Date().toISOString()} | ${context} | ROOT: ${root}\n`;
  // Log to local file instead of requiring a web server
  fs.appendFileSync(path.join(__dirname, 'attestation.log'), logEntry);
  console.log(`🛡️ Attestation logged: ${context}`);
}

module.exports = { logAttestation };
