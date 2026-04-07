import { readFileSync } from 'fs';
const MEMORY_PATH = '/workspaces/Riverbraid-Core/MEMORY.json';
const EXPECTED_ROOT = 'adef13';

export const getSystemStatus = () => {
  try {
    const data = JSON.parse(readFileSync(MEMORY_PATH, 'utf8'));
    const isNominal = data.anchor.trim() === EXPECTED_ROOT;
    
    return {
      status: isNominal ? "NOMINAL" : "DECOUPLED",
      anchor: data.anchor.trim(),
      timestamp: new Date().toISOString(),
      integrity_gate: "1.5.0-Genesis"
    };
  } catch (err) {
    return { status: "FAILURE", error: "Core Memory Unreachable" };
  }
};

// Output for CLI/Polling use
console.log(JSON.stringify(getSystemStatus(), null, 2));
