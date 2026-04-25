import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const GENESIS_ANCHOR = '01a777';
const anchor = existsSync(resolve(__dirname, '.anchor')) ? readFileSync(resolve(__dirname, '.anchor'), 'utf8').trim() : null;
const state = existsSync(resolve(__dirname, 'state')) ? readFileSync(resolve(__dirname, 'state'), 'utf8').trim() : null;
if (anchor === GENESIS_ANCHOR && state === 'STATIONARY') {
  console.log('[GATE] PASS: Anchor verified (' + anchor + ') | State: STATIONARY');
  process.exit(0);
} else {
  console.error('[GATE] FAIL-CLOSED: Anchor drift or state invalid.');
  process.exit(1);
}
