export interface RiverbraidState {
  timestamp: number;
  payload: any;
}

export function createSignal(payload: any, timestamp: number): RiverbraidState {
  // Determinism: Timestamp is passed in, never sampled.
  return {
    timestamp,
    payload
  };
}
