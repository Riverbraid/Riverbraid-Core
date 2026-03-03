export const LEDGER_IDENTITY = "rb-core-ledger-v1.3.0";
export function createEntry(action, actor, payload) {
  return {
    ledger: LEDGER_IDENTITY,
    action,
    actor,
    payload,
    integrity: "LOCKED"
  };
}
