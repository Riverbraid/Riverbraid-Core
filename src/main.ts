import { validateAnchor } from './scaffolding/anchor.js';
import { computeCapacityGate } from './core/pureCapacityGate.js';
import { HardenedLedger } from './scaffolding/ledger.js';

const ledger = new HardenedLedger('./logs/riverbraid.jsonl');

const signal = {
  anchorId: 'GO_44_RES_01',
  timestamp: Date.now(),
  latency_ms: 450,
  payload: { flow: 44 }
};

const norm = validateAnchor(signal);
const res = computeCapacityGate(norm);
if (!res.isDeterministic) throw new Error('CORE_ABORT');
ledger.record(res);

console.log(`[v1.0.0] Mode: ${res.mode}`);
