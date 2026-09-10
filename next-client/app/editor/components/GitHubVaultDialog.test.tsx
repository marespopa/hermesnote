import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GitHubVaultDialog from "./GitHubVaultDialog";
import { atom_githubVaultDialogOpen } from "@/app/atoms/ui-atoms";
import { useFileSystem } from "@/app/hooks/use-file-system";

vi.mock("@/app/hooks/use-file-system", () => ({ useFileSystem: vi.fn() }));

const fetchMock = vi.fn();
const initGitHubVault = vi.fn();

function HydratedProvider({ children }: { children: React.ReactNode }) {
  useHydrateAtoms([[atom_githubVaultDialogOpen, true]]);
  return <>{children}</>;
}

describe("GitHubVaultDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = fetchMock as typeof fetch;
    (useFileSystem as ReturnType<typeof vi.fn>).mockReturnValue({ initGitHubVault });
  });

  it("loads a repository and materializes it through the file-system vault initializer", async () => {
    fetchMock
      .mockResolvedValueOnce(new Response(JSON.stringify({ authenticated: true })))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        repositories: [{
          id: 1, name: "notes", fullName: "octocat/notes", owner: "octocat",
          defaultBranch: "main", private: true,
        }],
      })))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        repository: {
          repositoryId: 1, owner: "octocat", repository: "notes", branch: "main",
          displayName: "notes", baseHeadSha: "a".repeat(40),
        },
        files: [{ path: "today.md", content: "# Today", blobSha: "b".repeat(40) }],
      })));
    initGitHubVault.mockResolvedValue(undefined);

    render(<Provider><HydratedProvider><GitHubVaultDialog /></HydratedProvider></Provider>);

    await screen.findByText("octocat/notes");
    fireEvent.click(screen.getByText("octocat/notes"));

    await waitFor(() => {
      expect(initGitHubVault).toHaveBeenCalledWith({
        version: 1, kind: "github", repositoryId: 1, owner: "octocat", repository: "notes",
        branch: "main", displayName: "notes", baseHeadSha: "a".repeat(40),
      }, [{ path: "today.md", content: "# Today", blobSha: "b".repeat(40) }]);
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/github/repos/octocat/notes/tree",
      { cache: "no-store" },
    );
  });
});
