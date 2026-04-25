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
