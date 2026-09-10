import type { Command } from "@/app/components/CommandPalette/CommandPaletteContext";
import type { EditorCommandContext } from "./use-editor-command-context";

export function buildGitHubVaultCommands(context: EditorCommandContext): Command[] {
  if (!context.githubVault) return [];

  const runCommit = context.onGitHubCommit ?? (() => undefined);
  return [
    {
      id: "github-commit",
      label: "GitHub: Commit",
      description: "Commit local vault changes to the selected GitHub branch",
      category: "Vault",
      keywords: "git github source control commit",
      action: runCommit,
    },
    {
      id: "github-push",
      label: "GitHub: Push",
      description: "Commit and push local vault changes to GitHub",
      category: "Vault",
      keywords: "git github source control push upload",
      action: context.onGitHubPush ?? runCommit,
    },
    {
      id: "github-sync",
      label: "GitHub: Sync",
      description: "Commit and push the pending GitHub vault changes",
      category: "Vault",
      keywords: "git github source control sync commit push",
      action: context.onGitHubSync ?? runCommit,
    },
    {
      id: "github-pull",
      label: "GitHub: Pull",
      description: "Merge remote changes into the local vault",
      category: "Vault",
      keywords: "git github source control pull download fetch",
      action: context.onGitHubPull ?? (() => undefined),
    },
  ];
}
