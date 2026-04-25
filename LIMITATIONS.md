# Limitations

This document provides a realistic assessment of the verifier's scope.

## What is NOT Verified
* **File Content Quality**: Riverbraid checks if a file changed, not if the change was "good" or "correct."
* **System Memory**: This tool only verifies files on disk. It does not monitor active processes or RAM.
* **External Dependencies**: If a script pulls data from the internet at runtime, Riverbraid only verifies the script file, not the external data.

## Boundaries
* **Mechanism**: Comparison is based on SHA-256 hashing.
* **Input**: Limited to the directory tree where the manifest resides.
* **Logic**: If the manifest itself is tampered with without a secondary signature check, the "Ground Truth" is compromised.
