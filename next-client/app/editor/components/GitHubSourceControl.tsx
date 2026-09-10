"use client";

import { useCallback, useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import Button from "@/app/components/Button";
import { atom_openFiles } from "@/app/atoms/atoms";
import {
  getGitHubVaultChanges,
  type GitHubVaultChange,
} from "@/app/services/github-vault-sync";
import type { GitHubVaultDescriptor } from "@/app/services/github-vault-workspace";

interface Props {
  workspace: FileSystemDirectoryHandle;
  descriptor: GitHubVaultDescriptor;
  onCommit: (message: string) => Promise<{ changes: number }>;
  onPull?: () => void;
}

const changeStyles: Record<GitHubVaultChange["status"], string> = {
  added: "text-emerald-600 dark:text-emerald-400",
  modified: "text-amber-600 dark:text-amber-400",
  deleted: "text-red-600 dark:text-red-400",
};

const changeLabels: Record<GitHubVaultChange["status"], string> = {
  added: "A",
  modified: "M",
  deleted: "D",
};

export default function GitHubSourceControl({ workspace, descriptor, onCommit, onPull }: Props) {
  const openFiles = useAtomValue(atom_openFiles);
  const [message, setMessage] = useState("");
  const [changes, setChanges] = useState<GitHubVaultChange[]>([]);
  const [status, setStatus] = useState("Loading changes…");
  const [isWorking, setIsWorking] = useState(false);

  const refresh = useCallback(async () => {
    setIsWorking(true);
    try {
      const nextChanges = await getGitHubVaultChanges(workspace, descriptor);
      setChanges(nextChanges);
      setStatus(nextChanges.length ? `${nextChanges.length} pending change${nextChanges.length === 1 ? "" : "s"}.` : "No pending changes.");
    } catch (caught) {
      setStatus(caught instanceof Error ? caught.message : "Could not read local changes.");
    } finally {
      setIsWorking(false);
    }
  }, [descriptor, workspace]);

  useEffect(() => {
    void refresh();
  }, [openFiles, refresh]);

  const commit = async () => {
    if (!message.trim() || changes.length === 0) return;
    setIsWorking(true);
    setStatus("Committing changes…");
    try {
      const result = await onCommit(message.trim());
      setMessage("");
      setStatus(`Committed ${result.changes} change${result.changes === 1 ? "" : "s"}.`);
      await refresh();
    } catch (caught) {
      setStatus(caught instanceof Error ? caught.message : "GitHub sync failed.");
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <section className="shrink-0 border-t border-edge-subtle bg-chrome" aria-labelledby="source-control-title">
      <div className="flex items-center justify-between px-3 pt-3">
        <div>
          <h2 id="source-control-title" className="text-ui-caption font-semibold uppercase tracking-[0.12em] text-fg-muted">
            Source Control
          </h2>
          <p className="mt-1 font-mono text-[11px] text-fg-faint" title={`${descriptor.owner}/${descriptor.repository} · ${descriptor.branch}`}>
            <span aria-hidden="true">⑂ </span>{descriptor.branch}
          </p>
        </div>
        <Button variant="pill-icon" onClick={() => void refresh()} disabled={isWorking} aria-label="Refresh pending GitHub changes">
          ↻
        </Button>
      </div>

      <div className="mx-3 mt-3 max-h-36 overflow-y-auto rounded-lg border border-edge-subtle bg-surface" aria-label="GitHub change tree">
        {changes.length === 0 ? (
          <p className="px-3 py-2 text-ui-caption text-fg-faint">No changes.</p>
        ) : (
          <ul className="py-1">
            {changes.map((change) => (
              <li key={`${change.status}:${change.path}`} className="flex items-center gap-2 px-3 py-1 text-ui-caption">
                <span className={`w-3 font-mono font-bold ${changeStyles[change.status]}`} aria-label={change.status}>
                  {changeLabels[change.status]}
                </span>
                <span className="min-w-0 truncate" title={change.path}>{change.path}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-3">
        {onPull && (
          <Button
            variant="secondary"
            className="mb-2 h-9 w-full rounded-lg px-3"
            onClick={onPull}
            disabled={isWorking}
          >
            Pull & Merge
          </Button>
        )}
        <label htmlFor="github-commit-message" className="sr-only">Commit message</label>
        <textarea
          id="github-commit-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message (required)"
          disabled={isWorking}
          maxLength={500}
          rows={2}
          className="w-full resize-none rounded-lg border border-edge bg-surface px-3 py-2 text-ui-footnote outline-none placeholder:text-fg-faint focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-50"
        />
        <Button
          variant="primary"
          className="mt-2 h-9 w-full rounded-lg px-3"
          onClick={() => void commit()}
          disabled={isWorking || !message.trim() || changes.length === 0}
        >
          {isWorking ? "Syncing…" : "Commit & Sync"}
        </Button>
        <p className="sr-only" aria-live="polite">{status}</p>
        <p className="mt-2 text-ui-caption text-fg-faint" aria-hidden="true">{status}</p>
      </div>
    </section>
  );
}
