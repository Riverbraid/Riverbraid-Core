# Security Policy

Riverbraid-Core is a **reference implementation and governance artifact**.
It is not a hosted service, platform, or production system.

Security concerns are taken seriously **within this scope**.

---

## What Counts as a Security Issue

Please report issues that involve:

- Cryptographic weaknesses or misuse
- Ledger integrity or chain verification failures
- Determinism violations in the Frozen Core
- Invariant-breaking behavior that could cause silent failure
- Supply-chain integrity issues related to published artifacts

---

## What Is Out of Scope

The following are not considered security issues:

- Feature requests or architectural expansion
- Hypothetical threat models not applicable to this code
- Social engineering or user behavior concerns
- Issues arising from downstream integrations
- Deployment-specific misconfigurations

---

## Responsible Disclosure

If you believe you have found a legitimate security issue:

- **Do not open a public GitHub issue**
- Contact the maintainer privately with:
  - A clear description of the issue
  - Reproduction steps or proof
  - The affected version or commit

Contact method:
- GitHub private message or email listed on the maintainer profile

---

## Disclosure Expectations

- There is **no bug bounty program**
- There are **no guaranteed response times**
- Valid issues will be acknowledged and addressed when appropriate
- Fixes may result in a patch release or documentation update

---

## Final Note

Riverbraid-Core is intentionally small and auditable.
Security here means **preserving invariants and integrity**, not expanding scope.

Thank you for acting responsibly.
