import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import ConflictDialog from "./ConflictDialog";
import {
  atom_activeFileHandle,
  atom_activeFilePath,
  atom_content,
  atom_fileConflict,
  atom_fileLastModified,
  atom_lastSavedContent,
  atom_openFiles,
} from "@/app/atoms/atoms";

vi.mock("jotai", async (importOriginal) => {
  const actual = await importOriginal<typeof import("jotai")>();
  return { ...actual, useAtom: vi.fn() };
});

vi.mock("@/app/hooks/use-file-system", () => ({
  useFileSystem: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  default: { success: vi.fn(), error: vi.fn() },
}));

import { useAtom } from "jotai";
import { useFileSystem } from "@/app/hooks/use-file-system";

describe("ConflictDialog", () => {
  const setConflict = vi.fn();
  const setContent = vi.fn();
  const setLastSavedContent = vi.fn();
  const setFileLastModified = vi.fn();
  const setOpenFiles = vi.fn();
  const saveFile = vi.fn();
  const fileHandle = {
    getFile: vi.fn().mockResolvedValue({
      lastModified: 200,
      text: vi.fn().mockResolvedValue("incoming change"),
    }),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useFileSystem as ReturnType<typeof vi.fn>).mockReturnValue({ saveFile });
    const states = new Map<any, any>([
      [atom_activeFileHandle, [fileHandle]],
      [atom_fileConflict, [{ remoteContent: "incoming change" }, setConflict]],
      [atom_content, ["current change", setContent]],
      [atom_lastSavedContent, ["base content", setLastSavedContent]],
      [atom_fileLastModified, [100, setFileLastModified]],
      [atom_activeFilePath, ["test.md"]],
      [atom_openFiles, [{ "test.md": { content: "current change" } }, setOpenFiles]],
    ]);
    (useAtom as ReturnType<typeof vi.fn>).mockImplementation((atom) => states.get(atom) ?? [null, vi.fn()]);
  });

  it("offers incoming, current, and merge-editor choices", () => {
    render(<ConflictDialog />);

    expect(screen.getByRole("button", { name: /accept incoming/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /keep current/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /resolve in merge editor/i })).toBeInTheDocument();
  });

  it("reloads incoming content when accepting incoming changes", async () => {
    render(<ConflictDialog />);
    fireEvent.click(screen.getByRole("button", { name: /accept incoming/i }));

    await waitFor(() => {
      expect(setContent).toHaveBeenCalledWith("incoming change");
      expect(setLastSavedContent).toHaveBeenCalledWith("incoming change");
      expect(setFileLastModified).toHaveBeenCalledWith(200);
      expect(setConflict).toHaveBeenCalledWith(null);
    });
  });

  it("requires resolving merge markers before completing the merge", () => {
    render(<ConflictDialog />);
    fireEvent.click(screen.getByRole("button", { name: /resolve in merge editor/i }));

    expect(screen.getByText(/1 unresolved conflict/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /complete merge/i })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /accept all current/i }));
    expect(screen.getByText(/all conflicts resolved/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /complete merge/i })).toBeEnabled();
  });

  it("saves the resolved result and updates editor content", async () => {
    saveFile.mockResolvedValue(true);
    render(<ConflictDialog />);
    fireEvent.click(screen.getByRole("button", { name: /resolve in merge editor/i }));
    fireEvent.click(screen.getByRole("button", { name: /accept all incoming/i }));
    fireEvent.click(screen.getByRole("button", { name: /complete merge/i }));

    await waitFor(() => {
      expect(saveFile).toHaveBeenCalledWith("incoming change", fileHandle);
      expect(setContent).toHaveBeenCalledWith("incoming change");
      expect(setLastSavedContent).toHaveBeenCalledWith("incoming change");
      expect(setConflict).toHaveBeenCalledWith(null);
    });
  });
});
