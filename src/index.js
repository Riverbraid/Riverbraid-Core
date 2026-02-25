import { validateInvariant, checkEntropySources } from './invariants.js';
import { enforceAscii, validateLineEndings } from './ascii.js';
export function failClosedGate(condition) { return condition === true; }
export { validateInvariant, checkEntropySources, enforceAscii, validateLineEndings };
