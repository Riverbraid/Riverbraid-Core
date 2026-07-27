# Core Fixture Policy

Riverbraid-Core does not currently treat file presence as contract verification.

The former zero-byte placeholders (`pass.json`, `fail.json`, `riverbraid.behavior.json`, and `riverbraid.contract.json`) were removed because no active Core verifier contract was bound to their contents. Leaving empty files in the trusted surface would conflict with the Core rule that file presence is not verification.

A future Core fixture may be added only when all of the following are declared:

- the consuming verifier and version;
- the schema or structural contract;
- the expected result and exit behavior;
- the positive, negative, malformed, blocked, and unavailable cases that apply;
- the relationship to the Evaluation Kit reproduction path;
- the evidence record produced by execution.

Until then, public reproduction fixtures belong to the versioned Riverbraid-Evaluation-Kit profile rather than to an unconsumed Core placeholder surface.

This file is policy documentation only. It does not establish that a fixture suite has executed or passed.
