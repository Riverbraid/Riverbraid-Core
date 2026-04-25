# Getting Started

This guide shows you how to use Riverbraid to verify a single folder.

## 1. Installation
Clone this repository and ensure you have a POSIX-compliant shell (like Git Bash on Windows).

## 2. Your First Snapshot
Navigate to a folder you want to track:
cd path/to/your/folder

Initialize Riverbraid:
bash /path/to/riverbraid-core/riverbraid init

Create the record of files:
bash /path/to/riverbraid-core/riverbraid snapshot

## 3. The Test
Change one character in any file in that folder.

Run the verification:
bash /path/to/riverbraid-core/riverbraid verify

The verifier will report a **FAIL** because the file state no longer matches the snapshot.
