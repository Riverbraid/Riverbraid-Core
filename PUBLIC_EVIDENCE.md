# Riverbraid Public Evidence Manifest

This document records the current public evidence surface for Riverbraid.
It is intended for external review of the repository system's structural and workflow evidence. It does not claim third party certification, absolute security, absence of bugs, or universal correctness.

## Verification Summary

| Evidence Layer | Status | Result |
|---|---:|---:|
| Registry size | Verified | 30 repositories |
| Phase 20 stationarity | Pass | 30 stationary, 0 failed or incomplete |
| Phase 21 workflows | Pass | 30 remote passing, 0 failed |
| Third party certification | Not asserted | Pending external process |

## Evidence Anchors

| Artifact | Status |
|---|---|
| phase20-cross-repo-anchor-registry.json | present |
| phase20-cluster-verification.json | present |
| phase21-final-workflow-audit.json | present |
| phase22-evidence-inventory.json | anchored |

## Core Anchors

- Phase 21 workflow evidence commit: e207787873fb1a7351d1320f56eec6605a9c58ec
- Phase 22 evidence inventory commit: fadcb1c14affcaeafe12ecc3a50eded3987c9a9d
- Core repository: https://github.com/Riverbraid/Riverbraid-Core

## Verified Scope

Riverbraid currently verifies:

1. The registry contains exactly 30 repositories.
2. Phase 20 recorded the registry as stationary.
3. Phase 21 recorded all 30 repositories as having completed successful GitHub Actions runs on their current remote heads.
4. The evidence inventory explicitly does not assert third party certification.

## Not Claimed

Riverbraid does not claim:

1. Third party certification.
2. Absolute security.
3. Absence of defects.
4. Legal, compliance, SOC 2, ISO, or formal audit approval.
5. That workflow success proves all future behavior.

## External Reproduction

The intended reproduction path is:

    git clone https://github.com/Riverbraid/Riverbraid-Core.git
    cd Riverbraid-Core
    node cluster-verify.mjs

The verifier requires sibling local checkouts of the 30 registry repositories and GitHub CLI access through gh.
