#!/usr/bin/env node
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const GOVERNED = [
  "Riverbraid-Core",
  "Riverbraid-Golds",
  "Riverbraid-Crypto-Gold",
  "Riverbraid-Judicial-Gold",
  "Riverbraid-Memory-Gold",
  "Riverbraid-Integration-Gold",
  "Riverbraid-Refusal-Gold",
  "Riverbraid-Cognition",
  "Riverbraid-Harness-Gold",
  "Riverbraid-Temporal-Gold",
  "Riverbraid-Action-Gold",
  "Riverbraid-Audio-Gold",
  "Riverbraid-Vision-Gold",
  "Riverbraid-Lite",
  "Riverbraid-Interface-Gold"
];

const SNAPSHOT = "constitution.snapshot.json";
const sha256 = (b) => crypto.createHash("sha256").update(b).digest("hex");

const EXCLUDED = new Set([".git", "node_modules", "__pycache__"]);
const GOVERNED_EXT = new Set([".md", ".cjs", ".mjs", ".json", ".yml", ".yaml", ".sh", ".ts", ".js"]);

function checkFloor(buf, label) {
  if (buf.length === 0 || buf[buf.length - 1] !== 0x0a)
    throw new Error("LF_VIOLATION:" + label);
  if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf)
    throw new Error("BOM_VIOLATION:" + label);
  for (let i = 0; i < buf.length; i++) {
    const b = buf[i];
    const ok = b === 0x09 || b === 0x0a || b === 0x0d ||
               (b >= 0x20 && b <= 0x7e);
    if (!ok) throw new Error("ILLEGAL_BYTE:" + label + ":" + i);
  }
}

function walk(dir, repoName, hashes) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    console.warn("WARN: Cannot read " + dir + " - skipping");
    return;
  }

  entries
    .filter(e => !EXCLUDED.has(e.name))
    .sort((a, b) => a.name < b.name ? -1 : 1)
    .forEach(entry => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, repoName, hashes);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (!GOVERNED_EXT.has(ext)) return;
        const buf = fs.readFileSync(full);
        const rel = path.relative(path.join(process.cwd(), ".."), full);
        const label = repoName + "/" + rel;
        checkFloor(buf, label);
        hashes[label] = sha256(buf);
      }
    });
}

function getSnapshot() {
  const hashes = {};
  const workspaceRoot = path.join(process.cwd(), "..");

  GOVERNED.forEach(repo => {
    const dir = repo === "Riverbraid-Core"
      ? process.cwd()
      : path.join(workspaceRoot, repo);

    if (!fs.existsSync(dir)) {
      console.warn("WARN: " + repo + " not found at " + dir + " - skipping");
      return;
    }

    walk(dir, repo, hashes);
  });

  return hashes;
}

const cmd = process.argv[2];

if (cmd === "snapshot") {
  console.log("Computing Merkle snapshot...");
  const hashes = getSnapshot();
  const keys = Object.keys(hashes).sort();
  const merkleInput = keys.map(k => k + ":" + hashes[k]).join("\n");
  const root = sha256(Buffer.from(merkleInput, "utf8"));
  const snapshot = { version: "1.5.0", root, files: hashes };
  fs.writeFileSync(SNAPSHOT, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
  console.log("Root: " + root);
  console.log("Files: " + keys.length);
  console.log("Written: " + SNAPSHOT);

} else if (cmd === "verify") {
  if (!fs.existsSync(SNAPSHOT))
    throw new Error("No snapshot found. Run: node run-vectors.cjs snapshot");

  const saved = JSON.parse(fs.readFileSync(SNAPSHOT, "utf8"));
  console.log("Verifying against root: " + saved.root);

  const hashes = getSnapshot();
  const keys = Object.keys(hashes).sort();
  const merkleInput = keys.map(k => k + ":" + hashes[k]).join("\n");
  const root = sha256(Buffer.from(merkleInput, "utf8"));

  if (root !== saved.root) {
    console.error("CRITICAL: State Drift Detected.");
    console.error("Expected: " + saved.root);
    console.error("Actual:   " + root);
    process.exit(1);
  }

  console.log("VERIFIED: Root matches snapshot.");
  console.log("Files: " + keys.length);

} else {
  console.error("Usage: node run-vectors.cjs [snapshot|verify]");
  process.exit(1);
}
