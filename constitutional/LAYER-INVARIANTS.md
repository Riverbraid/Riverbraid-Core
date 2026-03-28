# LAYER-INVARIANTS.md
- **Structural Integrity:** Every repository must maintain a valid .anchor file matching the Core Merkle Root.
- **Scale Separation:** Sensory petals (Action, Audio, Vision) may not execute root-level governance commands.
- **Deterministic Vectors:** All logic in /bin must operate via run-vectors.cjs to ensure reproducible outcomes.
