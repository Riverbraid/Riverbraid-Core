import fs from 'fs';
import path from 'path';

const REPOS = [
  "Riverbraid-Action-Gold", "Riverbraid-Audio-Gold", "Riverbraid-Vision-Gold",
  "Riverbraid-Cognition", "Riverbraid-Golds", "Riverbraid-Crypto-Gold"
];

const ROOT_ANCHOR = "adef13";

function validateBraid() {
  console.log("--- Riverbraid Constitutional Validator ---");
  
  REPOS.forEach(repo => {
    const anchorPath = path.join('/workspaces', repo, '.anchor');
    if (!fs.existsSync(anchorPath)) {
      console.error(`[FAIL-CLOSED] ${repo}: No .anchor found. Halted.`);
      process.exit(1);
    }
    
    const anchor = fs.readFileSync(anchorPath, 'utf8').trim();
    if (anchor !== ROOT_ANCHOR) {
      console.error(`[FAIL-CLOSED] ${repo}: Anchor mismatch (${anchor}). Halted.`);
      process.exit(1);
    }
    console.log(`[OK] ${repo}: Anchor Verified (${ROOT_ANCHOR})`);

    const triad = ['gate.mjs', 'heartbeat.mjs', 'run-vectors.cjs'];
    triad.forEach(file => {
      const filePath = path.join('/workspaces', repo, 'bin', file);
      if (!fs.existsSync(filePath)) {
        console.error(`[INVARIANT VIOLATION] ${repo}: Missing ${file}.`);
        process.exit(1);
      }
    });
    console.log(`[OK] ${repo}: Logic Triad Compliant.`);
  });

  console.log("--- Status: STATIONARY / COMPLIANT ---");
}

validateBraid();
