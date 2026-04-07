import { readFileSync } from 'fs';
import { join } from 'path';

const EXPECTED_ROOT = 'adef13';
// Define the absolute path to the core memory
const MEMORY_PATH = '/workspaces/Riverbraid-Core/MEMORY.json';

export const checkIntegrity = () => {
  try {
    const data = JSON.parse(readFileSync(MEMORY_PATH, 'utf8'));
    const currentAnchor = data.anchor.trim();
    
    if (currentAnchor !== EXPECTED_ROOT) {
      console.error(`ENTROPY_DETECTED: Anchor Mismatch (Found: "${currentAnchor}", Expected: "${EXPECTED_ROOT}")`);
      process.exit(1); 
    }
    console.log("PULSE_NOMINAL: adef13");
  } catch (err) {
    console.error(`PULSE_FAILURE: Could not read or parse ${MEMORY_PATH}`);
    process.exit(1);
  }
};

checkIntegrity();
