import { constraints } from '../generated-constraints.js';

export function braidVectors(inputs, invariants) {
  const hierarchy = invariants.hierarchy || [];
  const sorted = inputs.sort((a, b) => hierarchy.indexOf(a.source) - hierarchy.indexOf(b.source));
  
  const result = {};
  const trace = {};

  for (const { source, state } of sorted) {
    for (const key in state) {
      const val = state[key];
      if (constraints[key] && !constraints[key](val, result)) {
        throw new Error(`[Refusal] Invariant violation: ${key} from ${source}`);
      }
      result[key] = val;
      trace[key] = { chosen: val, from: source, reason: "compiled_constraint" };
    }
  }
  return { braided: true, timestamp: Date.now(), state: result, trace };
}
