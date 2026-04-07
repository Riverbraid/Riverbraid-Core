
### Swarm Coherence Protocol (v1.5.0-Hardened)
The 19-petal cluster is unified via a bidirectional cryptographic anchor:
1. Upward Anchor: generate-swarm-manifest.cjs aggregates agent_root.txt from all -Gold repositories.
2. Swarm Root: 4e7d2773e89b75eaf683b4604e5c510a08e8f8c423e18d1420fab0f483b06501
3. Downward Anchor: update-agent-anchors.sh propagates the Swarm Root to swarm_anchor.txt in every petal.

Coherence Invariant: 
ComputeSwarmRoot(All Agents) == manifest.swarm_root == All agent/swarm_anchor.txt
