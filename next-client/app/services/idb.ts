import type { GitHubVaultDescriptor, GitHubVaultManifest } from "./github-vault-workspace";

const DB_NAME = "HermesMDVaultDB";
const STORE_NAME = "handles";
const KEY_VAULT = "lastVaultHandle";
const KEY_GITHUB_VAULT = "lastGithubVault";
const KEY_GITHUB_MANIFEST_PREFIX = "githubManifest:";

function getGitHubManifestKey(descriptor: Pick<GitHubVaultDescriptor, "repositoryId" | "branch">) {
  return `${KEY_GITHUB_MANIFEST_PREFIX}${descriptor.repositoryId}:${descriptor.branch}`;
}

const isSupported = () => typeof window !== "undefined" && !!window.indexedDB;

export async function getDB() {
  if (!isSupported()) {
    throw new Error("IndexedDB not supported");
  }

  return new Promise<IDBDatabase>((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, 2);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    } catch (err) {
      reject(err);
    }
  });
}

export async function saveVaultHandle(handle: FileSystemDirectoryHandle) {
  if (!isSupported()) return;
  
  try {
    const db = await getDB();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(handle, KEY_VAULT);
      store.delete(KEY_GITHUB_VAULT);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn("Failed to save vault handle to IDB:", err);
  }
}

export async function saveGitHubVaultDescriptor(descriptor: GitHubVaultDescriptor) {
  if (!isSupported()) return;

  try {
    const db = await getDB();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(descriptor, KEY_GITHUB_VAULT);
      store.delete(KEY_VAULT);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn("Failed to save GitHub vault descriptor to IDB:", err);
  }
}

export async function loadGitHubVaultDescriptor(): Promise<GitHubVaultDescriptor | null> {
  if (!isSupported()) return null;

  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(KEY_GITHUB_VAULT);
      request.onsuccess = () => {
        const descriptor = request.result;
        const valid = descriptor &&
          descriptor.version === 1 &&
          descriptor.kind === "github" &&
          Number.isSafeInteger(descriptor.repositoryId) &&
          typeof descriptor.owner === "string" &&
          typeof descriptor.repository === "string" &&
          typeof descriptor.branch === "string" &&
          typeof descriptor.displayName === "string" &&
          (typeof descriptor.baseHeadSha === "string" || descriptor.baseHeadSha === null);
        resolve(valid ? descriptor as GitHubVaultDescriptor : null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn("Failed to load GitHub vault descriptor from IDB:", err);
    return null;
  }

}

export async function saveGitHubVaultManifest(
  descriptor: Pick<GitHubVaultDescriptor, "repositoryId" | "branch">,
  manifest: GitHubVaultManifest,
) {
  if (!isSupported()) return;
  const db = await getDB();
  return new Promise<void>((resolve, reject) => {
    const request = db.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME)
      .put(manifest, getGitHubManifestKey(descriptor));
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function loadGitHubVaultManifest(
  descriptor: Pick<GitHubVaultDescriptor, "repositoryId" | "branch">,
): Promise<GitHubVaultManifest | null> {
  if (!isSupported()) return null;
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME)
      .get(getGitHubManifestKey(descriptor));
    request.onsuccess = () => {
      const manifest = request.result;
      const valid = manifest && manifest.version === 1 &&
        (typeof manifest.baseHeadSha === "string" || manifest.baseHeadSha === null) &&
        manifest.entries && typeof manifest.entries === "object" &&
        (typeof manifest.pendingSyncOperationId === "string" || manifest.pendingSyncOperationId === null);
      resolve(valid ? manifest as GitHubVaultManifest : null);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function loadVaultHandle(): Promise<FileSystemDirectoryHandle | null> {
  if (!isSupported()) return null;

  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(KEY_VAULT);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn("Failed to load vault handle from IDB:", err);
    return null;
  }
}

export async function clearVaultHandle() {
  if (!isSupported()) return;

  try {
    const db = await getDB();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(KEY_VAULT);
      store.delete(KEY_GITHUB_VAULT);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn("Failed to clear vault handle from IDB:", err);
  }
}

export async function verifyPermission(handle: FileSystemHandle, readWrite = true) {
  const options: any = {};
  if (readWrite) {
    options.mode = "readwrite";
  }
  if ((await (handle as any).queryPermission(options)) === "granted") {
    return true;
  }
  // requestPermission requires a user gesture — only call it when inside one.
  if ((await (handle as any).requestPermission(options)) === "granted") {
    return true;
  }
  return false;
}

export async function queryPermission(handle: FileSystemHandle, readWrite = true): Promise<boolean> {
  const options: any = readWrite ? { mode: "readwrite" } : {};
  return (await (handle as any).queryPermission(options)) === "granted";
}
