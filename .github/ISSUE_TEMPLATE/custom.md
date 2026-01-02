---
name: Custom issue template
about: 'Report a verified defect or invariant violation title: "[DEFECT]: " labels:
  ["defect"]  - type: markdown'
title: ''
labels: ''
assignees: ''

---

Riverbraid-Core is a reference standard.
        Only verified defects or invariant violations should be reported.

  - type: textarea
    id: description
    attributes:
      label: Description
      description: What is the exact issue observed?
    validations:
      required: true

  - type: textarea
    id: reproduction
    attributes:
      label: Reproduction Steps
      description: Provide deterministic steps or evidence.
    validations:
      required: true

  - type: input
    id: version
    attributes:
      label: Version / Commit
      description: Tag or commit hash where the issue occurs.
    validations:
      required: true

  - type: checkboxes
    id: verification
    attributes:
      label: Verification
      options:
        - label: I have reviewed the Frozen Core invariants
          required: true
        - label: This is not a feature request
          required: true
