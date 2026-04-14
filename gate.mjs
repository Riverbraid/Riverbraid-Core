import { createHash } from 'crypto';
import { readFileSync } from 'fs';

// Root anchor for state transitions
const ANCHOR = readFileSync('.anchor', 'utf8').trim();

export function gate(input) {
  if (!input || typeof input !== 'object') {
    throw new Error('GATE: null or invalid input — FAIL-CLOSED');
  }
  
  // 128-bit security threshold (Audit Hash)
  const hash = createHash('sha256')
    .update(JSON.stringify(input))
    .digest('hex')
    .slice(0, 32); 

  if (!input.AUDIT_HASH) {
    throw new Error('GATE: missing AUDIT_HASH — FAIL-CLOSED');
  }
  
  if (input.AUDIT_HASH !== hash) {
    throw new Error(`GATE: hash mismatch — FAIL-CLOSED`);
  }
  
  return { passed: true, anchor: ANCHOR, hash };
}
