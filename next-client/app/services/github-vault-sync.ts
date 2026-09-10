import {
  createGitHubVaultManifest,
  createGitHubVaultManifestFromFiles,
  deleteGitHubVaultFile,
  getGitHubBlobSha,
  readGitHubVaultFiles,
  type GitHubVaultDescriptor,
  type GitHubVaultManifest,
  type GitHubVaultRemoteFile,
  writeGitHubVaultFile,
} from "./github-vault-workspace";
import { loadGitHubVaultManifest, saveGitHubVaultDescriptor, saveGitHubVaultManifest } from "./idb";
import { countMergeConflicts, threeWayMerge } from "@/app/editor/utils/three-way-merge";

interface SyncResponse {
  headSha: string;
  reconciled?: boolean;
}

async function responseJson(response: Response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(typeof body.error === "string" ? body.error : "GitHub sync failed.");
  return body;
}

export type GitHubVaultChange = {
  path: string;
  status: "added" | "modified" | "deleted";
  content: string | null;
};

export type GitHubVaultPullResult = {
  descriptor: GitHubVaultDescriptor;
  changes: number;
  conflicts: number;
  files: MergedFile[];
};

type MergedFile = { path: string; content: string | null };

function mergeFileContent(base: string | undefined, current: string | undefined, incoming: string | undefined) {
  if (base === undefined) {
    if (current === undefined) return incoming;
    if (incoming === undefined || current === incoming) return current;
    return threeWayMerge("", current, incoming);
  }
  if (current === undefined && incoming === undefined) return undefined;
  if (current === undefined) return incoming === base ? undefined : threeWayMerge(base, "", incoming ?? "");
  if (incoming === undefined) return current === base ? undefined : threeWayMerge(base, current, "");
  return threeWayMerge(base, current, incoming);
}

export function mergeGitHubVaultFiles(
  baseFiles: readonly GitHubVaultRemoteFile[],
  localFiles: readonly { path: string; content: string }[],
  remoteFiles: readonly GitHubVaultRemoteFile[],
): { files: MergedFile[]; conflicts: number } {
  const baseByPath = new Map(baseFiles.map((file) => [file.path, file.content]));
  const localByPath = new Map(localFiles.map((file) => [file.path, file.content]));
  const remoteByPath = new Map(remoteFiles.map((file) => [file.path, file.content]));
  const paths = new Set([...baseByPath.keys(), ...localByPath.keys(), ...remoteByPath.keys()]);
  let conflicts = 0;
  const files = [...paths].sort().map((path) => {
    const content = mergeFileContent(baseByPath.get(path), localByPath.get(path), remoteByPath.get(path));
    if (content !== undefined) conflicts += countMergeConflicts(content);
    return { path, content: content ?? null };
  });
  return { files, conflicts };
}

async function fetchGitHubVaultTree(
  descriptor: GitHubVaultDescriptor,
  parameters: Record<string, string> = {},
): Promise<{ repository: Omit<GitHubVaultDescriptor, "kind" | "version">; files: GitHubVaultRemoteFile[] }> {
  const search = new URLSearchParams({ branch: descriptor.branch, ...parameters });
  return responseJson(await fetch(
    `/api/github/repos/${encodeURIComponent(descriptor.owner)}/${encodeURIComponent(descriptor.repository)}/tree?${search}`,
    { cache: "no-store" },
  ));
}

export async function pullGitHubVault(
  workspace: FileSystemDirectoryHandle,
  descriptor: GitHubVaultDescriptor,
): Promise<GitHubVaultPullResult> {
  const manifest = await loadGitHubVaultManifest(descriptor);
  if (!manifest?.baseHeadSha) {
    throw new Error("This vault has no remote baseline. Reconnect it before pulling.");
  }

  const [remote, base, localFiles] = await Promise.all([
    fetchGitHubVaultTree(descriptor),
    fetchGitHubVaultTree(descriptor, { ref: manifest.baseHeadSha }),
    readGitHubVaultFiles(workspace),
  ]);
  if (remote.repository.baseHeadSha === manifest.baseHeadSha) {
    return { descriptor, changes: 0, conflicts: 0, files: [] };
  }

  const merged = mergeGitHubVaultFiles(base.files, localFiles, remote.files);
  for (const file of merged.files) {
    if (file.content === null) await deleteGitHubVaultFile(workspace, file.path);
    else await writeGitHubVaultFile(workspace, file.path, file.content);
  }

  const nextDescriptor = { ...descriptor, baseHeadSha: remote.repository.baseHeadSha };
  const nextManifest = createGitHubVaultManifestFromFiles(remote.repository.baseHeadSha, remote.files);
  await Promise.all([
    saveGitHubVaultManifest(nextDescriptor, nextManifest),
    saveGitHubVaultDescriptor(nextDescriptor),
  ]);
  return {
    descriptor: nextDescriptor,
    changes: merged.files.length,
    conflicts: merged.conflicts,
    files: merged.files,
  };
}

export async function getGitHubVaultChanges(
  workspace: FileSystemDirectoryHandle,
  descriptor: GitHubVaultDescriptor,
): Promise<GitHubVaultChange[]> {
  const manifest = await loadGitHubVaultManifest(descriptor) ?? createGitHubVaultManifest(descriptor.baseHeadSha);
  const localFiles = await readGitHubVaultFiles(workspace);
  const localEntries = await Promise.all(localFiles.map(async ({ path, content }) => ({
    path,
    content,
    blobSha: await getGitHubBlobSha(content),
  })));
  const localByPath = new Map(localEntries.map((file) => [file.path, file]));
  return [
    ...localEntries
      .filter((file) => manifest.entries[file.path]?.blobSha !== file.blobSha)
      .map(({ path, content, blobSha }) => ({
        path,
        content,
        status: manifest.entries[path] ? "modified" as const : "added" as const,
        blobSha,
      })),
    ...Object.keys(manifest.entries)
      .filter((path) => !localByPath.has(path))
      .map((path) => ({ path, content: null, status: "deleted" as const })),
  ].map(({ path, content, status }) => ({ path, content, status }));
}

export async function syncGitHubVault(
  workspace: FileSystemDirectoryHandle,
  descriptor: GitHubVaultDescriptor,
  message: string,
): Promise<{ descriptor: GitHubVaultDescriptor; changes: number }> {
  const manifest = await loadGitHubVaultManifest(descriptor) ?? createGitHubVaultManifest(descriptor.baseHeadSha);
  const localFiles = await readGitHubVaultFiles(workspace);
  const localEntries = await Promise.all(localFiles.map(async ({ path, content }) => ({
    path,
    content,
    blobSha: await getGitHubBlobSha(content),
  })));
  const changes = await getGitHubVaultChanges(workspace, descriptor);

  if (changes.length === 0) return { descriptor, changes: 0 };

  const operationId = manifest.pendingSyncOperationId ?? crypto.randomUUID();
  await saveGitHubVaultManifest(descriptor, { ...manifest, pendingSyncOperationId: operationId });
  const body = await responseJson(await fetch(
    `/api/github/repos/${encodeURIComponent(descriptor.owner)}/${encodeURIComponent(descriptor.repository)}/sync?branch=${encodeURIComponent(descriptor.branch)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        baseHeadSha: manifest.baseHeadSha,
        message,
        operationId,
        changes: changes.map(({ path, content }) => ({ path, content })),
      }),
    },
  )) as SyncResponse;

  const nextManifest: GitHubVaultManifest = {
    version: 1,
    baseHeadSha: body.headSha,
    entries: Object.fromEntries(localEntries.map(({ path, blobSha }) => [path, { blobSha }])),
    pendingSyncOperationId: null,
  };
  const nextDescriptor = { ...descriptor, baseHeadSha: body.headSha };
  await Promise.all([
    saveGitHubVaultManifest(nextDescriptor, nextManifest),
    saveGitHubVaultDescriptor(nextDescriptor),
  ]);
  return { descriptor: nextDescriptor, changes: changes.length };
}
