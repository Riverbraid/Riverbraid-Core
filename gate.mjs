// gate.mjs — Riverbraid-Core v1.5.0
// Fail-closed gate. Exits process on any invariant violation.

import { createHash } from 'crypto';
import { readFileSync } from 'fs';

const ANCHOR_PATH = new URL('.anchor', import.meta.url);
const SNAPSHOT_PATH = new URL('constitution.snapshot.json', import.meta.url);

try {
  const ANCHOR = readFileSync(ANCHOR_PATH, 'utf8').trim();
  const SNAPSHOT = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8'));

  const computed = createHash('sha256')
    .update(JSON.stringify(SNAPSHOT, null, 2))
    .digest('hex')
    .slice(0, 6);

  if (computed !== ANCHOR) {
    console.error(`[GATE FAIL] Anchor mismatch. Expected ${ANCHOR}, got ${computed}`);
    process.exit(1);
  }
} catch (e) {
  console.error(`[GATE FAIL] Critical system file missing or corrupt.`);
  process.exit(1);
}

export const GATE_PASSED = true;

// Continuous Heartbeat: Re-verify every 60 seconds
export const startHeartbeat = () => {
  setInterval(() => {
    try {
      const currentAnchor = readFileSync(ANCHOR_PATH, 'utf8').trim();
      const currentSnapshot = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8'));
      const verify = createHash('sha256')
        .update(JSON.stringify(currentSnapshot, null, 2))
        .digest('hex')
        .slice(0, 6);

      if (verify !== currentAnchor) {
        console.error("[RUNTIME ALERT] Invariant Drift Detected. Emergency Shutdown.");
        process.exit(1);
      }
    } catch (e) {
      process.exit(1);
    }
  }, 60000);
};
