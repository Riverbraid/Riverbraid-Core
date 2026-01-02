---
name: Documentation Mismatch
about: Report discrepancies between documentation and implementation
title: ''
labels: ''
assignees: ''

---

title: "[DOC]: "
labels: ["documentation"]
body:
  - type: textarea
    id: mismatch
    attributes:
      label: Mismatch Description
      description: What does the documentation claim vs what the code does?
    validations:
      required: true

  - type: input
    id: location
    attributes:
      label: Affected File(s)
      description: README, GOVERNANCE, source file paths, etc.
