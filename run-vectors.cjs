const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');

const VERSION = "1.5.0-sovereign";
const SNAPSHOT = "constitution.snapshot.json";
const ROOT_DIR = process.env.RB_WORKSPACE_ROOT || "/workspaces";
const GOVERNED = [
  "Riverbraid-Core", "Riverbraid-Golds", "Riverbraid-Crypto-Gold",
  "Riverbraid-Judicial-Gold", "Riverbraid-Memory-Gold", "Riverbraid-Integration-Gold",
  "Riverbraid-Refusal-Gold", "Riverbraid-Cognition", "Riverbraid-Harness-Gold",
  "Riverbraid-Temporal-Gold", "Riverbraid-Action-Gold", "Riverbraid-Audio-Gold",
  "Riverbraid-Vision-Gold", "Riverbraid-Lite", "Riverbraid-Interface-Gold",
  "Riverbraid-Manifest-Gold", "Riverbraid-GPG-Gold", "Riverbraid-Safety-Gold"
];

const FLOOR_CHECKED_EXTS = new Set(['.js', '.cjs', '.mjs', '.md', '.json', '.sh', '.v', '.py', '.ml']);

function sha256(data) {
  return createHash('sha256').update(data).digest('hex');
}

function getSnapshot() {
  const snapshot = { version: VERSION, timestamp: new Date().toISOString(), files: {} };
  let allContent = "";

  GOVERNED.forEach(repo => {
    const repoPath = path.join(ROOT_DIR, repo);
    if (!fs.existsSync(repoPath)) return;

    snapshot.files[repo] = [];
    const walk = (dir) => {
      fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.relative(ROOT_DIR, fullPath);

        if (entry.isDirectory()) {
          if (![".git", "node_modules"].includes(entry.name)) walk(fullPath);
        } else if (FLOOR_CHECKED_EXTS.has(path.extname(entry.name))) {
          if ([SNAPSHOT, "constitution.signature.json"].includes(entry.name)) return;
          const content = fs.readFileSync(fullPath);
          const hash = sha256(content);
          snapshot.files[repo].push({ path: relPath, sha256: hash });
          allContent += hash;
        }
      });
    };
    walk(repoPath);
  });

  if (Object.keys(snapshot.files).length === 0) throw new Error(`FATAL: No repos found at ${ROOT_DIR}`);
  snapshot.sha256 = sha256(allContent);
  return snapshot;
}

function isGo44(current, saved) {
  const h_div = current.sha256 === saved.sha256 ? 0 : 1;
  const conditions = {
    absoluteConvergence: h_div === 0,
    allPetalsPresent: GOVERNED.every(r => current.files[r] && current.files[r].length > 0),
    noEmptyConstitutional: Object.values(current.files).flat().every(f => 
      !(f.path.includes('constitutional/') && f.sha256 === '01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b')
    )
  };
  return Object.entries(conditions).every(([_, v]) => v);
}

const [,, cmd] = process.argv;
if (cmd === "snapshot") {
  fs.writeFileSync(SNAPSHOT, JSON.stringify(getSnapshot(), null, 2));
  console.log("Snapshot generated.");
} else if (cmd === "verify") {
  const current = getSnapshot();
  const saved = JSON.parse(fs.readFileSync(SNAPSHOT));
  if (current.sha256 !== saved.sha256) {
    console.error("VERIFICATION FAILED: Mismatch detected.");
    process.exit(1);
  }
  console.log("VERIFIED: Stationary Floor intact. Go 44:", isGo44(current, saved) ? "ASSERTED" : "FAIL");
}
