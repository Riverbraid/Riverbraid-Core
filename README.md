# Riverbraid

Riverbraid is a file integrity verifier.

This repository provides tools to record the state of a directory and verify that state against current files.

## Core Logic

1.  **Record**: Create a snapshot of file hashes.
2.  **Verify**: Compare current file hashes against the snapshot.
3.  **Report**: Fail if any file has changed, been added, or been removed.

## Quick Start

Initialize the directory:
bash ./riverbraid init

Create a snapshot:
bash ./riverbraid snapshot

Verify integrity:
bash ./riverbraid verify

## Documentation Map

* [Getting Started](GETTING_STARTED.md): For new users and installation.
* [Protocol](PROTOCOL.md): For the technical hashing and sorting specification.
* [Limitations](LIMITATIONS.md): For an evaluation of what is and is not checked.
* [Background](BACKGROUND.md): For the design philosophy and origin.
