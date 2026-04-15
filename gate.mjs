// gate.mjs — Riverbraid-Core v1.5.0
import { createHash } from 'crypto';
import { readFileSync } from 'fs';

export const ANCHOR_PATH = new URL('.anchor', import.meta.url);
export const SNAPSHOT_PATH = new URL('constitution.snapshot.json', import.meta.url);

export const verifyLocal = () => {
  try {
    const ANCHOR = readFileSync(ANCHOR_PATH, 'utf8').trim();
    const SNAPSHOT = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8'));
    const computed = createHash('sha256')
      .update(JSON.stringify(SNAPSHOT, null, 2))
      .digest('hex')
      .slice(0, 6);
    return computed === ANCHOR;
  } catch (e) { return false; }
};

if (!verifyLocal()) {
  console.error("[GATE FAIL] Invariant violation.");
  process.exit(1);
}

export const startHeartbeat = () => {
  setInterval(() => {
    if (!verifyLocal()) {
      console.error("[RUNTIME ALERT] Drift Detected.");
      process.exit(1);
    }
  }, 60000);
};

export const GATE_PASSED = true;
