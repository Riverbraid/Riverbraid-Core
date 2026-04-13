import { createHash } from 'crypto';
import { assertPulse } from './heartbeat.mjs';
const GENESIS_ROOT = 'de2062';
function canonicalize(input) {
  if (typeof input !== 'string') throw new Error('GATE:REJECT — input must be a string');
  const normalized = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (/[\uFEFF]/.test(normalized)) throw new Error('GATE:REJECT — BOM detected');
  return normalized;
}
function computeAuditHash(payload) {
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex').slice(0, 16);
}
export function gate(rawInput, priorHash = null) {
  const canonical = canonicalize(rawInput);
  const AUDIT_HASH = computeAuditHash({ canonical, genesis: GENESIS_ROOT });
  const metrics = { mode: 'engage', coherence: 0.9, AUDIT_HASH };
  const heartbeat = assertPulse(metrics, priorHash);
  return { status: 'OPEN', genesis_root: GENESIS_ROOT, AUDIT_HASH, heartbeat_hash: heartbeat.HEARTBEAT_HASH };
}
