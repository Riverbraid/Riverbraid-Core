# Riverbraid Protocol

This document defines the mechanical rules for state verification.

## 1. Input Processing
* The verifier reads the filesystem starting at the root of the repository.
* Every file is processed to generate a unique hash (SHA-256).

## 2. Deterministic Sorting
* To ensure reproducibility, file paths are sorted alphabetically before being recorded in the manifest.
* This prevents different operating systems from reporting different results for the same file set.

## 3. The Manifest (Snapshot)
* A snapshot consists of a list of file paths and their corresponding hashes.
* This manifest is the "Ground Truth" against which future states are compared.

## 4. Verification Logic
Verification succeeds ONLY if:
1. Every file listed in the manifest exists and matches its recorded hash.
2. No new files have been added to the directory (unless explicitly ignored).
3. No recorded files have been removed.

## PowerShell Discipline (SOP)
To maintain determinism on Windows, the following invariants must be observed:
1. Treat PowerShell as a thin transport layer, not an execution environment.
2. Launch with -NoProfile to prevent state leakage.
3. Use only POSIX tools (via Git Bash) and forward slashes.
4. Disable ambiguity: no aliases (ls, cat), no cmdlets.
5. Fail Closed: Always set $ErrorActionPreference = "Stop".
6. Atomic Commands: Every command must encode its own prerequisites.
