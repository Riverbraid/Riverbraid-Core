import { getPayloadIntegrity } from './canonicalSerialize.js';

export const LIMITS = { MAX_DEPTH: 8, MAX_NODES: 200 };

export function calculateFragility(obj: any, depth = 0, state = { nodes: 0 }): number {
  state.nodes++;
  if (depth > LIMITS.MAX_DEPTH || state.nodes > LIMITS.MAX_NODES) return 1.0;
  if (obj === null || typeof obj !== 'object') return 0.0;

  let max = 0.0;
  for (const v of Object.values(obj)) {
    max = Math.max(max, calculateFragility(v, depth + 1, state));
    if (max === 1.0) break;
  }
  return Math.min(1.0, depth * 0.1 + state.nodes * 0.002);
}

export const payloadHash = getPayloadIntegrity;
