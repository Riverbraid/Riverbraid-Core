#!/bin/bash
MANIFEST="./swarm-manifest.json"
if [ ! -f "$MANIFEST" ]; then
    echo "Error: swarm-manifest.json not found."
    exit 1
fi

SWARM_ROOT=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$MANIFEST')).swarm_root)")

for agent_dir in /workspaces/Riverbraid-*-Gold; do
    if [ -d "$agent_dir" ]; then
        echo "$SWARM_ROOT" > "$agent_dir/swarm_anchor.txt"
        echo "Anchored $agent_dir -> $SWARM_ROOT"
    fi
done
