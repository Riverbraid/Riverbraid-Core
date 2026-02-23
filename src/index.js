// @linear
/**
 * Riverbraid-Core: Foundational Invariants
 * Standards: ASCII-only, Zero-Dependencies, Deterministic.
 */
export function isSafeASCII(input) {
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    const ok = (code === 0x09) || (code === 0x0A) || (code >= 0x20 && code <= 0x7E);
    if (!ok) return false;
  }
  return true;
}
export function enforceInvariant(condition, message) {
  if (!condition) {
    console.error(`FATAL:INVARIANT_VIOLATION:${message}`);
    process.exit(1);
  }
}
