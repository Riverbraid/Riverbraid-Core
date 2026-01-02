export function computeCapacityGate(i: {
  coherence_confidence: number;
  pattern_disruption: number;
  interaction_variance: number;
  systemic_load: number;
}) {
  const c = Math.max(0, Math.min(1, i.coherence_confidence));
  const p = Math.max(0, Math.min(1, i.pattern_disruption));
  const v = Math.max(0, Math.min(1, i.interaction_variance));
  const s = Math.max(0, Math.min(1, i.systemic_load));

  const composite = 0.4*s + 0.3*p + 0.2*v + 0.1*(1-c);
  const isDeterministic = Number.isFinite(composite);

  let mode: 'ENGAGE' | 'SOFTEN' | 'REST' = 'ENGAGE';
  if (!isDeterministic || c < 0.25 || composite > 0.75) mode = 'REST';
  else if (composite > 0.45) mode = 'SOFTEN';

  return { mode, composite, isDeterministic, version: '1.0.0' };
}
