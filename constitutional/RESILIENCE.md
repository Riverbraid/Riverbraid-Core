# RESILIENCE.md
- **Fail-Closed Policy:** Any discrepancy between the local .anchor and the Merkle Root halts the Braid.
- **Heartbeat Requirement:** The heartbeat.mjs must testify to the presence of the Logic Triad every 1000ms.
- **No-Shadow Rule:** Unversioned or "Experimental" artifacts (Entropy Ghosts) trigger a structural reset.
