import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const GENERATED_AUDIT_FILES = new Set([
  "audit-output.json",
  "AUDIT-MANIFEST.sha256",
  "AUDIT-TRAIL.ndjson"
]);

const TEXT_EXTENSIONS = new Set([
  ".js", ".mjs", ".cjs", ".json", ".md", ".txt", ".yml", ".yaml",
  ".toml", ".cmake", ".c", ".h", ".cpp", ".hpp", ".ts", ".tsx",
  ".jsx", ".html", ".css", ".gitignore", ".gitattributes"
]);

function fail(message) {
  console.error(JSON.stringify({ status: "FAILED", reason: message }, null, 2));
  process.exit(1);
}

function sha256Bytes(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

function readBytes(filePath) {
  return fs.readFileSync(filePath);
}

function hasBom(bytes) {
  return bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
}

function readJsonNoBom(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
}

function stable(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return "[" + value.map(stable).join(",") + "]";
  }
  const keys = Object.keys(value).sort();
  return "{" + keys.map((key) => JSON.stringify(key) + ":" + stable(value[key])).join(",") + "}";
}

function runGit(repoPath, args, allowFailure = false) {
  try {
    return execFileSync("git", args, {
      cwd: repoPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    });
  } catch (error) {
    if (allowFailure) {
      return "";
    }
    throw error;
  }
}

function parseGitStatus(raw) {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .map((line) => {
      const status = line.slice(0, 2);
      const filePath = line.slice(3).replace(/^"|"$/g, "");
      return { status, path: filePath.replaceAll("\\", "/") };
    })
    .filter((entry) => !GENERATED_AUDIT_FILES.has(entry.path));
}

function gitTrackedFiles(repoPath) {
  const raw = runGit(repoPath, ["ls-files", "-z"], true);
  return raw
    .split("\0")
    .filter(Boolean)
    .map((file) => file.replaceAll("\\", "/"))
    .filter((file) => !GENERATED_AUDIT_FILES.has(file))
    .sort();
}

function isTextCandidate(filePath) {
  const base = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  return TEXT_EXTENSIONS.has(ext) || TEXT_EXTENSIONS.has(base);
}

function safeVerifyOutput(repoPath) {
  const verifyPath = path.join(repoPath, "verify-output.json");
  if (!fs.existsSync(verifyPath)) {
    return {
      present: false,
      parse_ok: false,
      status: "UNAUDITED",
      sha256: null,
      failure_codes: ["VERIFY_OUTPUT_MISSING"]
    };
  }
  const bytes = readBytes(verifyPath);
  try {
    const parsed = readJsonNoBom(verifyPath);
    return {
      present: true,
      parse_ok: true,
      status: parsed.status || "STATUS_MISSING",
      sha256: sha256Bytes(bytes),
      bom_present: hasBom(bytes),
      failure_codes: Array.isArray(parsed.failure_codes) ? parsed.failure_codes : []
    };
  } catch (error) {
    return {
      present: true,
      parse_ok: false,
      status: "FAILED",
      sha256: sha256Bytes(bytes),
      bom_present: hasBom(bytes),
      failure_codes: ["VERIFY_OUTPUT_PARSE_FAILED"],
      error: error.message
    };
  }
}

function auditRepo(repo, rootDir) {
  const repoPath = path.resolve(rootDir, "..", repo.name);
  const exists = fs.existsSync(repoPath);
  const result = {
    name: repo.name,
    ring: repo.ring,
    class: repo.class || null,
    repo_path: repoPath,
    repo_exists: exists,
    git_branch: null,
    git_commit: null,
    dirty: false,
    dirty_entries: [],
    required_files: Array.isArray(repo.required_files) ? repo.required_files.slice().sort() : [],
    missing_required_files: [],
    verify_output: null,
    tracked_file_count: 0,
    tracked_files: [],
    bom_failures: [],
    byte_status: "UNAUDITED"
  };

  if (!exists) {
    result.byte_status = "REPO_MISSING";
    return result;
  }

  result.git_branch = runGit(repoPath, ["branch", "--show-current"], true).trim() || null;
  result.git_commit = runGit(repoPath, ["rev-parse", "HEAD"], true).trim() || null;
  result.dirty_entries = parseGitStatus(runGit(repoPath, ["status", "--porcelain=v1"], true));
  result.dirty = result.dirty_entries.length > 0;

  result.missing_required_files = result.required_files.filter((file) => {
    return !fs.existsSync(path.join(repoPath, file));
  });

  result.verify_output = safeVerifyOutput(repoPath);

  const tracked = gitTrackedFiles(repoPath);
  result.tracked_file_count = tracked.length;

  for (const relPath of tracked) {
    const absolutePath = path.join(repoPath, relPath);
    if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
      continue;
    }
    const bytes = readBytes(absolutePath);
    const bomPresent = hasBom(bytes);
    const fileRecord = {
      path: relPath,
      size_bytes: bytes.length,
      sha256: sha256Bytes(bytes),
      bom_present: bomPresent
    };
    result.tracked_files.push(fileRecord);
    if (bomPresent && isTextCandidate(relPath)) {
      result.bom_failures.push(relPath);
    }
  }

  const failures = [];
  if (result.missing_required_files.length > 0) failures.push("REQUIRED_FILES_MISSING");
  if (!result.verify_output.present) failures.push("VERIFY_OUTPUT_MISSING");
  if (result.verify_output.present && !result.verify_output.parse_ok) failures.push("VERIFY_OUTPUT_PARSE_FAILED");
  if (result.verify_output.bom_present) failures.push("VERIFY_OUTPUT_BOM_PRESENT");
  if (result.verify_output.status !== "VERIFIED") failures.push("VERIFY_OUTPUT_NOT_VERIFIED");
  if (result.bom_failures.length > 0) failures.push("BOM_PRESENT");
  if (result.dirty) failures.push("DIRTY_WORKTREE");

  result.failure_codes = failures;
  result.byte_status = failures.length === 0 ? "BYTE_VERIFIED" : "BYTE_BLOCKED";
  return result;
}

const rootDir = process.cwd();
const manifestPath = path.join(rootDir, "cluster-manifest-v2.json");

if (!fs.existsSync(manifestPath)) {
  fail("MISSING_CLUSTER_MANIFEST");
}

const manifestBytes = readBytes(manifestPath);
const manifest = readJsonNoBom(manifestPath);
const repos = Array.isArray(manifest.repos) ? manifest.repos : [];

const ringIndex = process.argv.indexOf("--ring");
const targetRing = ringIndex >= 0 ? Number(process.argv[ringIndex + 1]) : null;

if (ringIndex >= 0 && !Number.isInteger(targetRing)) {
  fail("INVALID_RING_ARGUMENT");
}

const selectedRepos = targetRing === null ? repos : repos.filter((repo) => repo.ring === targetRing);
const auditedRepos = selectedRepos.map((repo) => auditRepo(repo, rootDir));

const blocked = auditedRepos.filter((repo) => repo.byte_status !== "BYTE_VERIFIED");

const summary = {
  target_ring: targetRing,
  repo_count: auditedRepos.length,
  byte_verified_count: auditedRepos.length - blocked.length,
  byte_blocked_count: blocked.length,
  byte_gate_status: blocked.length === 0 ? "BYTE_GATE_PASS_VERIFIED" : "BYTE_GATE_BLOCKED"
};

const report = {
  auditor: "Riverbraid Byte Floor Auditor",
  report_version: "1.0.0",
  claim_boundary: "byte-level-local-audit-trail",
  manifest: {
    path: "cluster-manifest-v2.json",
    sha256: sha256Bytes(manifestBytes),
    schema: manifest._schema || null,
    version: manifest._version || null,
    constellation_root: manifest._constellation_root || null,
    cluster_version: manifest._cluster_version || null,
    full_constellation_claimed: manifest.full_constellation_claimed === true
  },
  summary,
  repos: auditedRepos
};

const preimage = stable(report);
report.audit_preimage_sha256 = sha256Bytes(Buffer.from(preimage, "utf8"));

const finalJson = stable(report) + "\n";
const finalDigest = sha256Bytes(Buffer.from(finalJson, "utf8"));

fs.writeFileSync(path.join(rootDir, "audit-output.json"), finalJson, "utf8");
fs.writeFileSync(path.join(rootDir, "AUDIT-MANIFEST.sha256"), finalDigest + "  audit-output.json\n", "utf8");

const trailRecord = {
  generated_at_utc: new Date().toISOString(),
  auditor: report.auditor,
  report_version: report.report_version,
  target_ring: targetRing,
  byte_gate_status: summary.byte_gate_status,
  audit_output_sha256: finalDigest,
  blocked_repos: blocked.map((repo) => ({
    name: repo.name,
    failure_codes: repo.failure_codes
  }))
};

fs.appendFileSync(
  path.join(rootDir, "AUDIT-TRAIL.ndjson"),
  JSON.stringify(trailRecord) + "\n",
  "utf8"
);

console.log(JSON.stringify({
  status: summary.byte_gate_status,
  target_ring: targetRing,
  repo_count: summary.repo_count,
  byte_verified_count: summary.byte_verified_count,
  byte_blocked_count: summary.byte_blocked_count,
  audit_output_sha256: finalDigest,
  blocked_repos: trailRecord.blocked_repos
}, null, 2));

if (blocked.length > 0) {
  process.exit(1);
}
process.exit(0);
