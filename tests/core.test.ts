import { describe, it, expect } from 'vitest';
import { computeCapacityGate } from '../src/core/pureCapacityGate.js';

describe('Frozen Core v1.0.0', () => {
  it('same input yields same output', () => {
    const input = {
      coherence_confidence: 0.8,
      pattern_disruption: 0.3,
      interaction_variance: 0.2,
      systemic_load: 0.5
    };
    const r1 = computeCapacityGate(input);
    const r2 = computeCapacityGate(input);
    expect(r1.composite).toBe(r2.composite);
    expect(r1.mode).toBe(r2.mode);
    expect(r1.isDeterministic).toBe(true);
  });
});
