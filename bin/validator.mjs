import fs from 'fs';
import path from 'path';
import { verifySwarm } from './verify-swarm.cjs';

export function validateStationary(label) {
    const expected = fs.readFileSync(path.join(process.cwd(), 'MERKLE_ROOT'), 'utf8').trim();
    
    if (verifySwarm(expected)) {
        console.log(`✅ Validator OK: ${label} (${expected})`);
        return true;
    } else {
        console.error(`❌ Riverbraid: ${label} failed stationary check (Quorum not reached)`);
        return false;
    }
}
