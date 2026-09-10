import { describe, expect, it } from "vitest";
import { mergeGitHubVaultFiles } from "./github-vault-sync";
import type { GitHubVaultRemoteFile } from "./github-vault-workspace";

const remoteFile = (path: string, content: string): GitHubVaultRemoteFile => ({
  path,
  content,
  blobSha: "a".repeat(40),
});

describe("mergeGitHubVaultFiles", () => {
  it("combines independent local and remote edits", () => {
    const result = mergeGitHubVaultFiles(
      [remoteFile("note.md", "one\ntwo\nthree")],
      [{ path: "note.md", content: "one\nlocal\nthree" }],
      [remoteFile("note.md", "one\ntwo\nremote")],
    );

    expect(result).toEqual({
      conflicts: 0,
      files: [{ path: "note.md", content: "one\nlocal\nremote" }],
    });
  });

  it("retains both sides when the same region changes", () => {
    const result = mergeGitHubVaultFiles(
      [remoteFile("note.md", "one\ntwo")],
      [{ path: "note.md", content: "one\nlocal" }],
      [remoteFile("note.md", "one\nremote")],
    );

    expect(result.conflicts).toBe(1);
    expect(result.files[0].content).toContain("<<<<<<< Current change");
    expect(result.files[0].content).toContain("local");
    expect(result.files[0].content).toContain("remote");
  });

  it("preserves a locally deleted file when the remote changes it", () => {
    const result = mergeGitHubVaultFiles(
      [remoteFile("note.md", "base")],
      [],
      [remoteFile("note.md", "remote")],
    );

    expect(result.conflicts).toBe(1);
    expect(result.files).toEqual([{
      path: "note.md",
      content: "<<<<<<< Current change\n=======\nremote\n>>>>>>> Incoming change",
    }]);
  });

  it("accepts a remote deletion when the local file is unchanged", () => {
    const result = mergeGitHubVaultFiles(
      [remoteFile("note.md", "base")],
      [{ path: "note.md", content: "base" }],
      [],
    );

    expect(result).toEqual({
      conflicts: 0,
      files: [{ path: "note.md", content: null }],
    });
  });
});
