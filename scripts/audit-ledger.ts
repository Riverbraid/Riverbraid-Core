import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { canonicalSerialize } from '../src/utils/canonicalSerialize.js';

const s = process.env.RIVERBRAID_SECRET;
if (!s) throw new Error('SECRET_REQUIRED');

const lines = readFileSync('./logs/riverbraid.jsonl','utf-8')
  .trim().split('\n').filter(Boolean);

let prev = '0';
lines.forEach((l,i)=>{
  const { signature, ...data } = JSON.parse(l);
  const sig = createHmac('sha256', s)
    .update(canonicalSerialize(data)).digest('hex');
  if (sig !== signature || data.prev !== prev)
    throw new Error(`FAIL ${i}`);
  prev = signature;
});
console.log(`AUDIT_PASSED: ${lines.length}`);
