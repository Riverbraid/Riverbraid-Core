import { createHash } from 'node:crypto';

export function canonicalSerialize(obj: any, seen = new WeakSet<object>()): string {
  if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
  if (seen.has(obj)) throw new Error('CANONICAL_SERIALIZE_FAILURE');
  seen.add(obj);

  if (Array.isArray(obj)) {
    return `[${obj.map(v => canonicalSerialize(v, seen)).join(',')}]`;
  }

  return `{${Object.keys(obj).sort()
    .map(k => `${JSON.stringify(k)}:${canonicalSerialize(obj[k], seen)}`)
    .join(',')}}`;
}

export function getPayloadIntegrity(payload: any): string {
  return createHash('sha256')
    .update(canonicalSerialize(payload))
    .digest('hex');
}
