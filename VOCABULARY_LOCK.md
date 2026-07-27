# VOCABULARY_LOCK.md
# Version: 1.1.0
# Authority: Normative (Riverbraid-Core)

## 1. System States

- **Active**: Behavior is proven via deterministic vectors under a declared contract.
- **Parked**: Non-behavior and boundary integrity are proven.
- **Experimental**: Explicitly excluded from the trusted floor.
- **Deprecated**: Authority is scheduled for removal.
- **Archived**: Authority is removed; preserved for historical audit only.

## 2. Core Integrity Terms

- **Verified**: A state confirmed by a passing, source-bound vector or evaluator result under declared conditions.
- **Fail-Closed**: A safety state where ambiguity, missing required evidence, or an invalid condition produces a bounded non-pass result.
- **Stationary**: A state where the declared system surface is stable and reproducible under its comparison contract.
- **Reconstructable**: The ability for a stranger to reproduce the declared system state from the manifest and required evidence.
- **Claim Boundary**: The declared limit of what an exact repository, profile, run, or authority disposition may assert.

## 3. Structural Roles

- **Normative**: Defines meaning and rules for the declared Riverbraid protocol surface.
- **Verifier**: Executes declared tests and emits a bounded mechanical result.
- **Support**: Provides shared logic, tooling, structures, or public infrastructure without redefining protocol semantics.
- **Informative**: Provides human-legible context without machine authority.

## 4. Ring Vocabulary

- **Repository Ring**: The repository's declared structural position in the current cluster manifest.
- **Dependent Ring Gate**: A required compatibility or coupling check against another declared ring. It does not change the repository's own ring.
- **Ring 0**: Current normative protocol-authority and trust-anchor class in `cluster-manifest-v2.json`.
- **Ring 1**: Current declared Gold or domain-petal class.
- **Ring 2**: Current declared infrastructure compatibility class.
- **Ring 3**: Current declared peripheral or best-effort class.

Riverbraid-Core is a Ring 0 repository. A required Ring 2 compatibility pass for coupling-sensitive Core changes is a dependent gate, not a second repository classification.

## 5. Historical Phase Labels

Phase-number labels describe historical implementation sequences. They do not define current authority, verification, lifecycle, or public claim status unless an active source-bound control record explicitly adopts them.

`Proposed Phase 15` is retired from current Core authority language and must not be used as a substitute for the active repository role, ring, verification surface, or claim boundary.

## 6. Vocabulary Separation Rules

- Role is not lifecycle.
- Lifecycle is not registry membership.
- Registry membership is not verification depth.
- Verification depth is not execution evidence.
- Execution evidence is not authority disposition.
- A dependent compatibility gate is not repository reclassification.
- Historical phase sequence is not current applicability.
