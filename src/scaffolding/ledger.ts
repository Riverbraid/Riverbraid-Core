import { createHmac } from 'node:crypto';
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { canonicalSerialize } from '../utils/canonicalSerialize.js';

export class HardenedLedger {
  private last = '0';
  private secret: string;

  constructor(private path: string) {
    const s = process.env.RIVERBRAID_SECRET;
    if (!s || !s.trim()) throw new Error('SECRET_REQUIRED');
    this.secret = s;
    if (existsSync(path)) this.audit();
  }

  private audit() {
    const lines = readFileSync(this.path,'utf-8').trim().split('\n').filter(Boolean);
    let prev = '0';
    for (const l of lines) {
      const { signature, ...data } = JSON.parse(l);
      const sig = createHmac('sha256', this.secret)
        .update(canonicalSerialize(data)).digest('hex');
      if (sig !== signature || data.prev !== prev)
        throw new Error('LEDGER_RECOVERY_FAILED');
      prev = signature;
    }
    this.last = prev;
  }

  record(e: any) {
    const payload = { ...e, timestamp: Date.now(), prev: this.last };
    const sig = createHmac('sha256', this.secret)
      .update(canonicalSerialize(payload)).digest('hex');
    appendFileSync(this.path, JSON.stringify({ ...payload, signature: sig })+'\n');
    this.last = sig;
  }
}
