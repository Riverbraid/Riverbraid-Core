import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const auditor = fileURLToPath(new URL("../byte-audit.mjs", import.meta.url));

function fixture(t) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), "riverbraid-byte-audit-"));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  const auditDir = path.join(base, "audit");
  const repoDir = path.join(base, "Sample");
  fs.mkdirSync(auditDir);
  fs.mkdirSync(repoDir);
  fs.writeFileSync(path.join(auditDir, "cluster-manifest-v2.json"), JSON.stringify({
    repos: [{ name: "Sample", ring: 2, required_files: ["README.md"] }]
  }));
  fs.writeFileSync(path.join(repoDir, "README.md"), "sample\n");
  fs.writeFileSync(path.join(repoDir, "verify-output.json"), JSON.stringify({
    status: "VERIFIED", failure_codes: []
  }));
  return { base, auditDir, repoDir };
}

function git(cwd, args) {
  const result = spawnSync("git", args, { cwd, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
}

function commit(cwd, paths) {
  git(cwd, ["add", ...paths]);
  git(cwd, ["-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid",
    "commit", "-qm", "fixture"]);
}

function audit(auditDir) {
  const run = spawnSync(process.execPath, [auditor, "--ring", "2"], {
    cwd: auditDir, encoding: "utf8"
  });
  assert.equal(run.error, undefined);
  const report = JSON.parse(fs.readFileSync(path.join(auditDir, "audit-output.json"), "utf8"));
  return { run, report, repo: report.repos[0] };
}

test("non-Git directory cannot receive a byte-verified result", (t) => {
  const f = fixture(t);
  const { run, report, repo } = audit(f.auditDir);
  assert.equal(run.status, 1);
  assert.equal(report.summary.byte_gate_status, "BYTE_GATE_BLOCKED");
  assert.equal(repo.byte_status, "BYTE_BLOCKED");
  assert.equal(repo.git_commit, null);
  assert.equal(repo.tracked_file_count, 0);
  assert.ok(repo.failure_codes.includes("GIT_ROOT_UNAVAILABLE"));
  assert.ok(repo.failure_codes.includes("GIT_COMMIT_UNAVAILABLE"));
  assert.ok(repo.failure_codes.includes("GIT_TRACKED_FILES_UNAVAILABLE"));
});

test("an outer Git repository does not supply a sibling's identity", (t) => {
  const f = fixture(t);
  git(f.base, ["init", "-q"]);
  commit(f.base, ["Sample/README.md", "Sample/verify-output.json"]);
  const { run, repo } = audit(f.auditDir);
  assert.equal(run.status, 1);
  assert.ok(repo.failure_codes.includes("GIT_ROOT_MISMATCH"));
});

test("clean repository with observed tracked bytes can pass", (t) => {
  const f = fixture(t);
  git(f.repoDir, ["init", "-q"]);
  commit(f.repoDir, ["README.md", "verify-output.json"]);
  const { run, report, repo } = audit(f.auditDir);
  assert.equal(run.status, 0, run.stderr + run.stdout);
  assert.equal(report.summary.byte_gate_status, "BYTE_GATE_PASS_VERIFIED");
  assert.match(repo.git_commit, /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/);
  assert.equal(repo.tracked_file_count, 2);
  assert.equal(repo.tracked_files.length, 2);
  assert.deepEqual(repo.failure_codes, []);
});

test("a tracked file absent from the worktree blocks byte coverage", (t) => {
  const f = fixture(t);
  git(f.repoDir, ["init", "-q"]);
  commit(f.repoDir, ["README.md", "verify-output.json"]);
  fs.unlinkSync(path.join(f.repoDir, "README.md"));
  const { run, repo } = audit(f.auditDir);
  assert.equal(run.status, 1);
  assert.ok(repo.failure_codes.includes("TRACKED_FILES_INCOMPLETE"));
  assert.deepEqual(repo.unhashed_tracked_files, ["README.md"]);
});

test("detached HEAD retains a valid commit identity", (t) => {
  const f = fixture(t);
  git(f.repoDir, ["init", "-q"]);
  commit(f.repoDir, ["README.md", "verify-output.json"]);
  git(f.repoDir, ["checkout", "--detach", "-q"]);
  const { run, repo } = audit(f.auditDir);
  assert.equal(run.status, 0, run.stderr + run.stdout);
  assert.equal(repo.git_branch, null);
  assert.match(repo.git_commit, /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/);
});
