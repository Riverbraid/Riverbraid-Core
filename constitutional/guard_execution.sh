#!/bin/bash
# Riverbraid Execution Guard
# Only allows files with a valid entry in the stationary snapshot.

FILE_TO_EXEC=$1
if [ -z "$FILE_TO_EXEC" ]; then
  echo "Usage: ./guard_execution.sh <filename>"
  exit 1
fi

grep -q "$FILE_TO_EXEC" constitution.snapshot.json
if [ $? -eq 0 ]; then
  echo "✅ EXECUTION PERMITTED: File is in stationary floor."
  bash "$FILE_TO_EXEC"
else
  echo "❌ EXECUTION DENIED: File is outside the Merkle root."
  exit 1
fi
