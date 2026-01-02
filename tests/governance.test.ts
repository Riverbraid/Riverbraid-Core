import { describe, it, expect } from 'vitest';
import { computeCapacityGate } from '../src/core/pureCapacityGate.js';

describe('Governance thresholds', () => {
  it('composite > 0.75 => REST', () => {
    const r = computeCapacityGate({
      coherence_confidence: 0.6,
      pattern_disruption: 0.9,
      interaction_variance: 0.9,
      systemic_load: 0.9
    });
    expect(r.mode).toBe('REST');
  });

  it('coherence < 0.25 => REST', () => {
    const r = computeCapacityGate({
      coherence_confidence: 0.2,
      pattern_disruption: 0.1,
      interaction_variance: 0.1,
      systemic_load: 0.1
    });
    expect(r.mode).toBe('REST');
  });
});
