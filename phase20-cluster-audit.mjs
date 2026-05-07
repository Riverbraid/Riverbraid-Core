import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

const workspace = "C:\\Riverbraid";
const corePath = "C:\\Riverbraid\\Riverbraid-Core";

const repos = [
  ["Riverbraid-Core", "Core", "CORE_GOVERNANCE"],
  ["Riverbraid-Crypto-Gold", "Crypto-Gold", "CRYPTOGRAPHIC_INTEGRITY"],
  ["Riverbraid-Judicial-Gold", "Judicial-Gold", "RULE_ADHERENCE"],
  ["Riverbraid-Memory-Gold", "Memory-Gold", "MEMORY_STATIONARY"],
  ["Riverbraid-Integration-Gold", "Integration-Gold", "INTEGRATION_COHERENCE"],
  ["Riverbraid-Refusal-Gold", "Refusal-Gold", "REFUSAL_STATIONARY"],
  ["Riverbraid-Safety-Gold", "Safety-Gold", "SAFETY_FLOOR_STATIONARY"],
  ["Riverbraid-Identity-Gold", "Identity-Gold", "IDENTITY_STATIONARY"],
  ["Riverbraid-Cognition", "Cognition", "COGNITION_STATIONARY"],
  ["Riverbraid-Harness-Gold", "Harness-Gold", "HARNESS_STATIONARY"],
  ["Riverbraid-Temporal-Gold", "Temporal-Gold", "TEMPORAL_STATIONARY"],
  ["Riverbraid-Action-Gold", "Action-Gold", "ACTION_STATIONARY"],
  ["Riverbraid-Audio-Gold", "Audio-Gold", "AUDIO_STATIONARY"],
  ["Riverbraid-Vision-Gold", "Vision-Gold", "VISION_STATIONARY"],
  ["Riverbraid-Interface-Gold", "Interface-Gold", "INTERFACE_STATIONARY"],
  ["Riverbraid-Manifest-Gold", "Manifest-Gold", "MANIFEST_STATIONARY"],
  ["Riverbraid-GPG-Gold", "GPG-Gold", "GPG_STATIONARY"],
  ["Riverbraid-Nexus-Gold", "Nexus-Gold", "NEXUS_STATIONARY"],
  ["Riverbraid-Pulse-Gold", "Pulse-Gold", "PULSE_STATIONARY"],
  ["Riverbraid-Flow-Gold", "Flow-Gold", "FLOW_STATIONARY"],
  ["Riverbraid-Discovery-Gold", "Discovery-Gold", "DISCOVERY_STATIONARY"],
  ["Riverbraid-Bridge-Gold", "Bridge-Gold", "BRIDGE_STATIONARY"],
  ["Riverbraid-Bio-Gold", "Bio-Gold", "BIO_STATIONARY"],
  ["Riverbraid-Network-Gold", "Network-Gold", "NETWORK_STATIONARY"],
  ["Riverbraid-Storage-Gold", "Storage-Gold", "STORAGE_STATIONARY"],
  ["Riverbraid-Spatial-Gold", "Spatial-Gold", "SPATIAL_STATIONARY"],
  ["Riverbraid-Security-Gold", "Security-Gold", "SECURITY_STATIONARY"],
  ["Riverbraid-Resonance-Gold", "Resonance-Gold", "RESONANCE_STATIONARY"],
  ["Riverbraid-Weave-Gold", "Weave-Gold", "WEAVE_STATIONARY"],
  ["Riverbraid-Gold-V2", "Gold-V2", "GOLD_V2_STATIONARY"]
];

function run(cwd, cmd, args) {
  return execFileSync(cmd, args, { cwd, encoding: "utf8" }).trim();
}

function tryRun(cwd, cmd, args) {
  const result = spawnSync(cmd, args, { cwd, encoding: "utf8" });
  return {
    code: result.status,
    stdout: (result.stdout ?? "").trim(),
    stderr: (result.stderr ?? "").trim()
  };
}

function readJsonIfPresent(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
}

function writeJson(fileName, data) {
  fs.writeFileSync(
    path.join(corePath, fileName),
    JSON.stringify(data, null, 2) + "\n",
    "utf8"
  );
}

function findCoreManifest() {
  const candidates = [
    "cluster-manifest-v2.json",
    "cluster-manifest.json",
    "FINAL_REGISTRY.json",
    "manifest.json"
  ];
  for (const candidate of candidates) {
    const p = path.join(corePath, candidate);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function repoAudit(repoName, petal, invariant) {
  const repoPath = path.join(workspace, repoName);
  const base = {
    repo: repoName,
    petal,
    invariant,
    path: repoPath,
    exists: fs.existsSync(repoPath),
    clean: false,
    local_head: null,
    remote_head: null,
    local_remote_aligned: false,
    verify_mjs_present: false,
    verify_exit_code: null,
    verify_stdout: "",
    verify_stderr: "",
    verify_output_present: false,
    verify_output_status: null,
    verify_output_invariant: null,
    verify_output_petal: null,
    verify_output_schema: null,
    post_verify_clean: false,
    status: "NOT_EVALUATED"
  };

  if (!base.exists) {
    base.status = "MISSING_REPO";
    return base;
  }

  run(repoPath, "git", ["fetch", "origin"]);
  const preStatus = run(repoPath, "git", ["status", "--short"]);
  base.clean = preStatus.length === 0;
  base.local_head = run(repoPath, "git", ["rev-parse", "--short", "HEAD"]);
  base.remote_head = run(repoPath, "git", ["rev-parse", "--short", "origin/main"]);
  base.local_remote_aligned = base.local_head === base.remote_head;

  const verifyPath = path.join(repoPath, "verify.mjs");
  base.verify_mjs_present = fs.existsSync(verifyPath);
  if (base.verify_mjs_present) {
    const verifyRun = tryRun(repoPath, "node", ["verify.mjs"]);
    base.verify_exit_code = verifyRun.code;
    base.verify_stdout = verifyRun.stdout;
    base.verify_stderr = verifyRun.stderr;
  }

  const verifyOutputPath = path.join(repoPath, "verify-output.json");
  const verifyOutput = readJsonIfPresent(verifyOutputPath);
  base.verify_output_present = verifyOutput !== null;
  if (verifyOutput) {
    base.verify_output_status = verifyOutput.status ?? null;
    base.verify_output_invariant = verifyOutput.invariant ?? null;
    base.verify_output_petal = verifyOutput.petal ?? null;
    base.verify_output_schema = verifyOutput.schema ?? null;
  }

  const postStatus = run(repoPath, "git", ["status", "--short"]);
  base.post_verify_clean = postStatus.length === 0;

  const ok =
    base.clean &&
    base.local_remote_aligned &&
    base.verify_mjs_present &&
    base.verify_exit_code === 0 &&
    base.verify_output_present &&
    base.verify_output_status === "VERIFIED" &&
    base.post_verify_clean;

  base.status = ok ? "VERIFIED_STATIONARY" : "FAILED_OR_INCOMPLETE";
  return base;
}

console.log("PHASE20_CLUSTER_AUDIT_START");
const results = repos.map(([repo, petal, invariant]) => {
  console.log(`AUDITING: ${repo}`);
  return repoAudit(repo, petal, invariant);
});

const registry = {
  schema: "riverbraid.phase20.cross_repo_anchor_registry",
  version: "1.0.0",
  workspace,
  source: "local git remotes and repo-root verifiers",
  repos: results.map((r) => ({
    repo: r.repo,
    petal: r.petal,
    invariant: r.invariant,
    local_head: r.local_head,
    remote_head: r.remote_head,
    local_remote_aligned: r.local_remote_aligned,
    verify_status: r.verify_output_status,
    status: r.status
  }))
};

const manifestPath = findCoreManifest();
let manifestAlignment = {
  schema: "riverbraid.phase20.core_manifest_alignment",
  version: "1.0.0",
  core_repo: "Riverbraid-Core",
  manifest_file: manifestPath ? path.basename(manifestPath) : null,
  manifest_found: manifestPath !== null,
  checks: []
};

if (manifestPath) {
  const manifestRaw = fs.readFileSync(manifestPath, "utf8");
  manifestAlignment.checks = registry.repos.map((r) => {
    const repoMentioned = manifestRaw.includes(r.repo);
    const anchorMentioned = r.remote_head ? manifestRaw.includes(r.remote_head) : false;
    let alignment = "UNKNOWN";
    if (!repoMentioned) alignment = "REPO_NOT_LISTED_IN_CORE_MANIFEST";
    else if (!anchorMentioned) alignment = "REPO_LISTED_BUT_CURRENT_ANCHOR_NOT_FOUND";
    else alignment = "CORE_MANIFEST_MATCHES_CURRENT_REMOTE_ANCHOR";
    return {
      repo: r.repo,
      remote_head: r.remote_head,
      repo_mentioned: repoMentioned,
      anchor_mentioned: anchorMentioned,
      alignment
    };
  });
} else {
  manifestAlignment.checks = registry.repos.map((r) => ({
    repo: r.repo,
    remote_head: r.remote_head,
    alignment: "NO_CORE_MANIFEST_FOUND"
  }));
}

const clusterVerification = {
  schema: "riverbraid.phase20.cluster_verification",
  version: "1.0.0",
  status: results.every((r) => r.status === "VERIFIED_STATIONARY") ? "CLUSTER_VERIFIED_STATIONARY" : "CLUSTER_HAS_FAILURES",
  totals: {
    expected_repos: repos.length,
    existing_repos: results.filter((r) => r.exists).length,
    missing_repos: results.filter((r) => !r.exists).length,
    verified_stationary: results.filter((r) => r.status === "VERIFIED_STATIONARY").length,
    failed_or_incomplete: results.filter((r) => r.status === "FAILED_OR_INCOMPLETE").length
  },
  failures: results
    .filter((r) => r.status !== "VERIFIED_STATIONARY")
    .map((r) => ({
      repo: r.repo,
      status: r.status,
      exists: r.exists,
      clean: r.clean,
      local_remote_aligned: r.local_remote_aligned,
      verify_mjs_present: r.verify_mjs_present,
      verify_exit_code: r.verify_exit_code,
      verify_output_present: r.verify_output_present,
      verify_output_status: r.verify_output_status,
      post_verify_clean: r.post_verify_clean,
      verify_stderr: r.verify_stderr
    }))
};

writeJson("phase20-cross-repo-anchor-registry.json", registry);
writeJson("phase20-core-manifest-alignment.json", manifestAlignment);
writeJson("phase20-cluster-verification.json", clusterVerification);

console.log("PHASE20_CLUSTER_AUDIT_COMPLETE");
console.log(`CLUSTER_STATUS: ${clusterVerification.status}`);
console.log(`VERIFIED: ${clusterVerification.totals.verified_stationary}/${clusterVerification.totals.existing_repos}`);
console.log(`FAILURES: ${clusterVerification.totals.failed_or_incomplete}`);
