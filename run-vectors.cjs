#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SNAPSHOT_FILE = 'constitution.snapshot.json';
const THRESHOLD_FILE = 'constitution.threshold.json';
const EXCLUDED_DIRS = new Set(['.git', 'node_modules', '.github', 'docs']);
const EXCLUDED_FILES = new Set([SNAPSHOT_FILE]);
const REQUIRED_FILES = [
  'README.md',
  'package.json',
  'run-vectors.cjs',
  THRESHOLD_FILE
];

function sha256Hex(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function normalizeRel(p) {
  return p.split(path.sep).join('/');
}

function assertRuntime() {
  const expectedNode = 'v24.11.1';
  if (process.version !== expectedNode) {
    throw new Error(`NODE_VERSION_MISMATCH: expected ${expectedNode} but found ${process.version}`);
  }
}

function assertRequiredFiles() {
  for (const rel of REQUIRED_FILES) {
    if (!fs.existsSync(rel)) {
      throw new Error(`MISSING_REQUIRED_FILE: ${rel}`);
    }
  }
}

function walk(dir, root, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    if (EXCLUDED_DIRS.has(entry.name)) continue;

    const full = path.join(dir, entry.name);
    const rel = normalizeRel(path.relative(root, full));

    if (entry.isDirectory()) {
      walk(full, root, out);
      continue;
    }

    if (EXCLUDED_FILES.has(rel)) continue;

    const buf = fs.readFileSync(full);

    const leaf = sha256Hex(Buffer.concat([
      Buffer.from(`${rel}\n`, 'utf8'),
      buf
    ]));

    out.push({
      path: rel,
      sha256: sha256Hex(buf),
      leaf
    });
  }
}

function buildSnapshot() {
  const files = [];
  walk(process.cwd(), process.cwd(), files);
  files.sort((a, b) => a.path.localeCompare(b.path));

  const merkleInput = files.map(f => `${f.path}:${f.leaf}`).join('\n') + '\n';
  const merkle_root = sha256Hex(Buffer.from(merkleInput, 'utf8'));

  return {
    version: '1.5.0',
    merkle_root,
    files
  };
}

function writeSnapshot(snapshot) {
  fs.writeFileSync(
    SNAPSHOT_FILE,
    JSON.stringify(snapshot, null, 2) + '\n',
    'utf8'
  );
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function verifyThresholdFile() {
  const threshold = readJson(THRESHOLD_FILE);
  if (threshold.threshold !== 1) {
    throw new Error('THRESHOLD_ERROR: expected threshold 1');
  }
}

function verifySnapshot() {
  if (!fs.existsSync(SNAPSHOT_FILE)) {
    throw new Error(`MISSING_SNAPSHOT: ${SNAPSHOT_FILE}`);
  }

  const expected = readJson(SNAPSHOT_FILE);
  const actual = buildSnapshot();

  if (expected.merkle_root !== actual.merkle_root) {
    throw new Error(
      `SNAPSHOT_MISMATCH:\nExpected: ${expected.merkle_root}\nActual:   ${actual.merkle_root}`
    );
  }

  if (JSON.stringify(expected.files) !== JSON.stringify(actual.files)) {
    throw new Error('FILE_HASH_MISMATCH: snapshot file list differs from current state');
  }
}

function main() {
  const cmd = process.argv[2];

  try {
    assertRuntime();
    assertRequiredFiles();
    verifyThresholdFile();

    if (cmd === 'snapshot') {
      const snapshot = buildSnapshot();
      writeSnapshot(snapshot);
      console.log(`SNAPSHOT_WRITTEN: ${snapshot.merkle_root}`);
      return;
    }

    if (cmd === 'verify') {
      verifySnapshot();
      console.log('VERIFIED: Floor is Stationary.');
      return;
    }

    console.error('Usage: node run-vectors.cjs [snapshot|verify]');
    process.exit(1);
  } catch (err) {
    console.error(String(err.message || err));
    process.exit(1);
  }
}

main();

