# Riverbraid-Core

**Signal:** FROZEN_CORE  
**Role:** Authority logic anchor for the Riverbraid cluster

## Purpose
Core serves as the foundational invariant layer that all other Gold petals must respect. It is dependency-free by design, ensuring it remains the root of the trust chain.

## Core Invariants
1. **DETERMINISTIC_REPRODUCIBILITY** - Identical inputs → Identical outputs.
2. **ZERO_EXTERNAL_DEPENDENCIES** - Core imports nothing.
3. **ASCII_FLOOR** - 7-bit ASCII only with LF line endings.

## Verification
\`\`\`bash
node src/index.js     # Self-test logic
\`\`\`
