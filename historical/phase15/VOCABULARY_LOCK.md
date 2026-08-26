# VOCABULARY_LOCK.md
# Version: 1.0.0
# Authority: Normative (Riverbraid-Core)

## 1. System States
- **Active**: Behavior is proven via deterministic vectors.
- **Parked**: Non-behavior and boundary integrity are proven.
- **Experimental**: Explicitly excluded from the trusted floor.
- **Deprecated**: Authority is scheduled for removal.
- **Archived**: Authority is removed; preserved for historical audit only.

## 2. Core Integrity Terms
- **Verified**: A state confirmed by a passing vector test.
- **Fail-Closed**: A safety state where any ambiguity results in a refusal or "Fail" status.
- **Stationary**: A state where the system is stable and reproducible.
- **Reconstructable**: The ability for a stranger to reproduce the system from the manifest.
- **Claim Boundary**: The declared limit of what a repository is authorized to verify.

## 3. Structural Roles
- **Normative**: Defines meaning and rules for the constellation.
- **Verifier**: Executes tests to prove claims.
- **Support**: Provides shared logic or structures.
- **Informative**: Provides human-legible context without machine authority.
