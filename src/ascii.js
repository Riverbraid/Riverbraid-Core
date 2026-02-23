/**
 * Riverbraid Core: ASCII Enforcement
 * Ensures all processed strings are within the safe institutional range (32-126).
 */
export function enforceASCII(input) {
  if (typeof input !== 'string') throw new Error('SIGNAL_DISTORTION: Input must be string');
  
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    if (charCode < 32 || charCode > 126) {
      throw new Error(`ENTROPY_DETECTED: Character ${input[i]} (code ${charCode}) is non-stationary`);
    }
  }
  return true;
}
