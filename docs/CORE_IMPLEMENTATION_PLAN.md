# Riverbraid-Core Implementation Plan

**Status**: IMPLEMENTATION PLAN / EVIDENCE-GATED  
**Repository**: Riverbraid-Core  
**Created**: 2026-06-14  
**Protocol mutation**: NONE  
**Workflow mutation**: NONE  
**Registry mutation**: NONE  
**Release/tag mutation**: NONE  
**Secret mutation**: NONE  

## Purpose

This document converts a broad Riverbraid-Core implementation proposal into an evidence-safe execution plan.

It does not apply source-code, workflow, release, registry, branch-protection, package, or security-setting changes.

Riverbraid-Core is currently the canonical audit and protocol authority surface. It should remain small enough to audit directly. New code, workflows, package infrastructure, and release automation must be added only after current Core surfaces are inspected and the proposed changes are proven not to weaken the existing green proof-of-concept state.

## Current Core boundary

Riverbraid-Core currently supports a bounded claim: Riverbraid has a working open-source deterministic integrity floor and governance artifact.

It does not claim:

- certification
- legal approval
- production readiness
- absolute security
- external audit
- complete AI safety
- adoption
- registry freshness
- absence of defects

Any implementation work must keep this boundary intact.

## Coherence correction

The draft phrase `Experimental -> Functional` is useful as an implementation direction, but it must not replace Core's current role.

Use this framing instead:

```text
CORE_AUDIT_SURFACE -> EVIDENCE-POPULATED FUNCTIONAL LANE
```

Meaning:

- Core remains the audit substrate and protocol authority.
- New implementation files must be evidence-gated.
- No claim becomes verified merely because a file was created.
- Functional status requires execution evidence, not scaffolding.

## Do not apply the broad draft verbatim

The broad proposal contains useful structure, but several parts would break Riverbraid claim discipline if applied directly:

1. It includes `Verified`, `Approved`, `Pass`, signed-CER, and percentage-complete claims without attached execution evidence.
2. It proposes workflow and release automation before workflow-hardening review.
3. It proposes branch-protection and ruleset files even though actual GitHub settings remain manual and account-level.
4. It proposes security contact details and response times that have not been confirmed as operational.
5. It replaces the current Core README framing with a generic package/product framing.
6. It introduces source code and package dependencies before a current-state Core API inventory.
7. It creates CERs with placeholder signatures, which would look like evidence but would not be real evidence.

These items should be converted into pending implementation tasks, not treated as completed work.

## Implementation lanes

### Lane 1 - Ledger scaffolds

Allowed after confirmation or in a dedicated low-risk pass:

- `EVIDENCE_LEDGER.md`
- `CLAIM_LEDGER.md`
- `KNOWN_LIMITATIONS.md`
- `templates/CLAIM_EVIDENCE_RECORD.md`

Rules:

- All entries start as `UNKNOWN_PENDING_EVIDENCE`, `NOT_EXECUTED`, `MANUAL_CONFIRMATION_REQUIRED`, or `EVIDENCE_GATED`.
- No `PASS`, `VERIFIED`, `APPROVED`, `SIGNED`, or percentage-complete status unless supported by attached output.
- CER template may exist, but signed CER instances must not be created until signatures and evidence artifacts exist.

### Lane 2 - Documentation and community surfaces

Potentially allowed as documentation-only additions after current file inventory:

- `SECURITY.md`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `.github/BRANCH_PROTECTION.md`
- `.github/ISSUE_TEMPLATE/*`
- `.github/PULL_REQUEST_TEMPLATE.md`

Rules:

- Do not invent email addresses, teams, service-level promises, response times, or security support status.
- Use reporting-boundary language if a real reporting channel is not confirmed.
- State that branch protection and repository rulesets are manual settings unless verified through GitHub settings evidence.

### Lane 3 - Source implementation

Requires separate explicit implementation approval and current-state source inventory before mutation:

- `src/index.js`
- `src/core/VerificationEngine.js`
- `src/core/EvidenceCollector.js`
- `src/core/ClaimManager.js`
- `src/errors/CoreError.js`
- `src/crypto/Hashing.js`
- `src/utils/Validation.js`
- `build.js`
- `package.json`
- `jest.config.js`
- `test/*`

Rules:

- Do not overwrite existing Core protocol files without a diff plan.
- Do not introduce broad dependency surfaces without dependency and lockfile review.
- Do not replace Core's audit-substrate identity with a generic package identity.
- Prefer a branch and pull request for source implementation work.
- Run tests before claiming functionality.

### Lane 4 - Workflow hardening and CI

Requires explicit per-file approval after inventory:

- `.github/workflows/ci.yml`
- `.github/workflows/security.yml`
- `.github/workflows/codeql.yml`
- `.github/workflows/quality-gates.yml`
- `.github/workflows/enforce-branch-protection.yml`

Rules:

- Do not add workflow files that will immediately fail without package/source prerequisites.
- Do not use `continue-on-error` to create a false green security signal.
- Do not upload security artifacts to public surfaces without reviewing exposure risk.
- Do not introduce write permissions unless necessary and documented.
- Prefer `permissions: contents: read` by default.
- Add `timeout-minutes` and concurrency where appropriate.
- Treat `ubuntu-latest` and tag-pinned actions as inventory items unless a hardening decision is made.

### Lane 5 - Release and package publication

Not approved for direct mutation from this plan:

- `.github/workflows/release.yml`
- release tags
- GitHub releases
- npm publication
- signed release assets
- SBOM release claims

Rules:

- No release workflow until release discipline and tag policy are defined.
- No `production-ready`, `certified`, `externally audited`, or signed-release claim until evidence exists.

### Lane 6 - Repository settings and rulesets

Manual or separately approved only:

- branch protection
- repository rulesets
- force-push protection
- branch deletion protection
- required PR review
- secret scanning
- push protection
- private vulnerability reporting
- Dependabot settings
- CodeQL/default setup

Documentation may describe desired settings, but actual settings remain manual until verified.

## File classification from the broad proposal

### Convert into evidence-gated scaffolds first

- `EVIDENCE_LEDGER.md`
- `CLAIM_LEDGER.md`
- `KNOWN_LIMITATIONS.md`
- `templates/CLAIM_EVIDENCE_RECORD.md`
- `.github/BRANCH_PROTECTION.md`
- `.github/ISSUE_TEMPLATE/config.yml`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/PULL_REQUEST_TEMPLATE.md`

### Do not create as written

- populated `EVIDENCE_LEDGER.md` with `PASS` statuses
- populated `CLAIM_LEDGER.md` with `VERIFIED` statuses
- `claims/CER-CORE-001.md` through `claims/CER-CORE-005.md` with placeholder signatures
- README replacement claiming badges, coverage, workflows, security scans, discussions, support email, or release status not verified
- CHANGELOG claiming a first tagged release unless tag evidence exists
- SECURITY.md with unconfirmed email address or response-time promises

### Requires current-state source inventory and explicit source mutation approval

- `package.json`
- `src/*`
- `test/*`
- `build.js`
- `jest.config.js`
- `.eslintrc.js`
- `.prettierrc`
- `.nvmrc`
- `.editorconfig`
- `.gitignore`
- `.gitattributes`
- `Dockerfile`
- `.dockerignore`
- `Makefile`
- `.husky/*`

### Requires workflow-hardening approval

- `.github/workflows/ci.yml`
- `.github/workflows/security.yml`
- `.github/workflows/codeql.yml`
- `.github/workflows/quality-gates.yml`
- `.github/workflows/enforce-branch-protection.yml`

### Requires release/tag approval

- `.github/workflows/release.yml`
- release automation
- npm publication
- changelog release claims

### Requires manual GitHub settings confirmation

- `.github/rulesets/main.yml`
- `.github/rulesets/develop.yml`
- `.github/rulesets/tags.yml`
- branch protection enforcement claims
- signed-commit enforcement claims
- code-owner/team enforcement claims

## Safe first implementation batch

The first Core implementation batch should be:

1. Read current Core file tree.
2. Confirm existing protocol files and verifier files.
3. Create ledger scaffolds only, using pending statuses.
4. Create a CER template only.
5. Create a `CORE_IMPLEMENTATION_STATUS.md` report.
6. Do not modify workflows, source files, package files, registry files, releases, tags, hashes, seals, manifests, or secrets.

## Example status vocabulary

Allowed before execution evidence:

- `UNKNOWN_PENDING_EVIDENCE`
- `NOT_EXECUTED`
- `PATCHED_UNVERIFIED`
- `SCAFFOLD_ONLY`
- `MANUAL_CONFIRMATION_REQUIRED`
- `EVIDENCE_GATED`
- `NOT_APPLICABLE`

Not allowed without evidence:

- `PASS`
- `VERIFIED`
- `APPROVED`
- `SIGNED`
- `PRODUCTION_READY`
- `CERTIFIED`
- `EXTERNALLY_AUDITED`

## Next action recommendation

Proceed with a bounded Core ledger pass:

```text
Create EVIDENCE_LEDGER.md, CLAIM_LEDGER.md, KNOWN_LIMITATIONS.md, and templates/CLAIM_EVIDENCE_RECORD.md using only pending/evidence-gated status language.
```

After that, perform source and workflow implementation only through reviewed batches.

## Non-claim

This plan does not implement Core functionality, verify claims, execute tests, create evidence, create signed CERs, harden workflows, configure repository settings, create releases, update registry pins, or claim production readiness.
