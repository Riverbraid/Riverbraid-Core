// @linear
/**
 * Riverbraid-Core: Foundational Invariants
 * Standards: ASCII-only, Zero-Dependencies, Deterministic.
 */

/**
 * Validates that a string contains only safe ASCII characters (0x20-0x7E, 0x09, 0x0A).
 * @param {string} input 
 * @returns {boolean}
 */
export function isSafeASCII(input) {
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    const ok = (code === 0x09) || (code === 0x0A) || (code >= 0x20 && code <= 0x7E);
    if (!ok) return false;
  }
  return true;
}

/**
 * Enforces Fail-Closed semantics for system state checks.
 * @param {boolean} condition 
 * @param {string} message 
 */
export function enforceInvariant(condition, message) {
  if (!condition) {
    console.error(`FATAL:INVARIANT_VIOLATION:${message}`);
    process.exit(1);
  }
}
