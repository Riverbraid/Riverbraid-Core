import { readFileSync } from 'fs';
const EXPECTED_ROOT = 'adef13';

export const checkIntegrity = () => {
  try {
    const data = JSON.parse(readFileSync('./MEMORY.json', 'utf8'));
    // Use .trim() to ensure hidden spaces don't break the seal
    const currentAnchor = data.anchor.trim();
    
    if (currentAnchor !== EXPECTED_ROOT) {
      console.error(`ENTROPY_DETECTED: Anchor Mismatch (Found: "${currentAnchor}", Expected: "${EXPECTED_ROOT}")`);
      process.exit(1); 
    }
    console.log("PULSE_NOMINAL: adef13");
  } catch (err) {
    console.error("PULSE_FAILURE: Could not read or parse MEMORY.json");
    process.exit(1);
  }
};

checkIntegrity();
