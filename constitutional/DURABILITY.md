# DURABILITY.md
- **Stationary Invariant:** The system state is valid only when all 15 repositories report [PASS] in the Health Audit.
- **Anchor Persistence:** The Merkle Root (currently adef13) is the only valid state reference.
- **Recovery Path:** In case of drift, use the Global Anchor Sync to force-revert to the Genesis Block.
