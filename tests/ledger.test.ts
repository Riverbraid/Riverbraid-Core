import { describe, it, expect } from 'vitest';
import { HardenedLedger } from '../src/scaffolding/ledger.js';
import { unlinkSync, existsSync } from 'node:fs';

const LOG = './logs/test.jsonl';

describe('Ledger integrity', () => {
  it('fails without secret', () => {
    delete process.env.RIVERBRAID_SECRET;
    expect(() => new HardenedLedger(LOG)).toThrow();
  });

  it('maintains chain', () => {
    process.env.RIVERBRAID_SECRET = 'test';
    if (existsSync(LOG)) unlinkSync(LOG);
    const l = new HardenedLedger(LOG);
    l.record({ ok: true });
  });
});
