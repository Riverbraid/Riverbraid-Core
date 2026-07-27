# Riverbraid-Core Authority

Repository Ring: 0 — normative protocol authority
Dependent Compatibility Gate: Ring 2 for coupling-sensitive Core changes
Role: Core audit substrate and protocol trust anchor
Status: CORE_AUDIT_SURFACE

## Ring and phase vocabulary

`Ring 0` identifies this repository's authority role in the current cluster manifest.

A required `Ring 2` pass means that a coupling-sensitive Core change must also be checked against the declared Ring 2 infrastructure set. It does not reclassify Riverbraid-Core as a Ring 2 repository.

`Proposed Phase 15` is a historical implementation label and is not current authority vocabulary. Current public descriptions must use the repository role, ring relationship, verification surface, and claim boundary defined here and in `VOCABULARY_LOCK.md`.

## Claim Boundary

Riverbraid-Core is the normative protocol authority and deterministic integrity-audit substrate for the declared Riverbraid governance floor.

This repository may claim `VERIFIED` only for an exact source-bound run whose declared verifier produces the required result and whose evidence remains attributable to the observed commit, configuration, environment, and claim boundary.

A repository file, manifest entry, generated summary, or machine-readable claim declaration does not become verification evidence merely because it exists.

## Refused Claims

This repository does not claim:

- production readiness
- legal compliance or legal approval
- universal safety
- absolute truth or absolute security
- external audit or independent review
- complete AI safety
- full constellation verification
- downstream ring verification by association
- registry freshness
- adoption
- absence of defects

## Mechanical Honesty Rule

File presence is not verification.

Verification requires a real verifier result plus the source, configuration, environment, and evidence relationships needed to interpret that result.

The public reproduction and evaluation entrance is `Riverbraid/Riverbraid-Evaluation-Kit`. Riverbraid-Core remains the normative protocol authority; it is not the public reproduction kit.
