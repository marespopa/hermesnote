"use client";

import { useState, useCallback } from "react";
import { useFileSystem } from "@/app/hooks/use-file-system";
import { useDialog } from "@/app/hooks/use-dialog";
import {
  atom_activeFilePath,
  atom_activePaneId,
  atom_isCloudVault,
  atom_splitPane,
} from "@/app/atoms/atoms";
import { atom_railPanel, atom_lastSidebarPanel, atom_newVaultFlowOpen, atom_pendingScrollTarget, atom_selectedFileTags, atom_userName, RailPanel } from "@/app/atoms/ui-atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import SmartFolders from "./SmartFolders";
import VaultSidebarTasks from "./VaultSidebarTasks";
import DesktopTasksOverlay from "./DesktopTasksOverlay";
import VaultSidebarTags from "./VaultSidebarTags";
import { useSidebarSearch } from "../hooks/useSidebarSearch";
import VaultSidebarEmpty from "./VaultSidebarEmpty";
import VaultSidebarFiles from "./VaultSidebarFiles";
import UnifiedSearchInput from "./UnifiedSearchInput";
import VaultSidebarHeader from "./VaultSidebarHeader";
import VaultSidebarNavigator from "./VaultSidebarNavigator";
import { useSidebarResize } from "../hooks/useSidebarResize";

// The rail (SidebarRail.tsx) is always visible at a fixed width, so this
// panel's own floor is just whatever its content needs — the search input
// with tag tokens and file-tree rows with hover actions are the narrowest
// things it has to fit, not a footer icon row (that lives in the rail now).
interface VaultSidebarProps {
  panel: RailPanel;
  onClose?: () => void;
  onNewFile?: () => void;
  onNewAIFile?: () => void;
  onSettings?: () => void;
  onDocumentation?: () => void;
  onImport?: () => void;
  onExport?: () => void;
}

export default function VaultSidebar({
  panel,
  onClose,
  onNewFile,
  onSettings,
  onDocumentation,
  onImport,
  onExport,
}: VaultSidebarProps) {
  const {
    openFile,
    vaultHandle,
    deleteFile,
    renameFile,
    duplicateFile,
    moveItem,
    createNewFile,
    isMounted,
    openVault,
    isVaultSupported,
    scanVault,
  } = useFileSystem();

  const dialog = useDialog();
  const setNewVaultFlowOpen = useSetAtom(atom_newVaultFlowOpen);
  const setPendingScrollTarget = useSetAtom(atom_pendingScrollTarget);
  // Resolves a directory handle for an arbitrary nested path (e.g. "a/b/c").
  // Tree nodes only carry path strings (built from the flat indexed file list),
  // so folder actions (rename/delete/new file/move) need this to get a real handle.
  const resolveFolderHandle = useCallback(async (path: string): Promise<any | null> => {
    if (!path) return vaultHandle;
    if (!vaultHandle) return null;
    let dir: any = vaultHandle;
    for (const segment of path.split("/")) {
      try {
        dir = await dir.getDirectoryHandle(segment);
      } catch {
        return null;
      }
    }
    return dir;
  }, [vaultHandle]);

  const [activeFilePath, setActiveFilePath] = useAtom(atom_activeFilePath);
  const activePaneId = useAtomValue(atom_activePaneId);
  const [, splitPane] = useAtom(atom_splitPane);
  const isCloudVault = useAtomValue(atom_isCloudVault);
  const userName = useAtomValue(atom_userName);
  const setRailPanel = useSetAtom(atom_railPanel);
  const setLastSidebarPanel = useSetAtom(atom_lastSidebarPanel);
  const { sidebarWidth, isResizing, startResizing } = useSidebarResize();

  const [selectedTags, setSelectedTags] = useAtom(atom_selectedFileTags);
  const [isTasksExpanded, setIsTasksExpanded] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    processedFiles,
    totalResultsCount,
    hasMoreResults,
    setShowAllResults,
    allFiles,
    tags,
    tagCounts,
  } = useSidebarSearch({ selectedTags, panel });

  const isSearching = searchQuery.trim().length > 0 || selectedTags.length > 0;

  const openFileInPane = useCallback((handle: FileSystemFileHandle, path?: string) => {
    if (!path || !activePaneId) return;
    splitPane({ id: activePaneId, direction: "horizontal", filePath: path });
    openFile(handle, path);
    onClose?.();
  }, [activePaneId, onClose, openFile, splitPane]);

  if (!isMounted) return null;

  return (
      <div
        className="flex flex-col h-full relative group/sidebar bg-chrome border-r border-edge-subtle"
        style={{ width: `${sidebarWidth}px` }}
      >
      {/* Resize Handle */}
      <div
        onMouseDown={startResizing}
        className={`
          absolute top-0 right-0 bottom-0 w-1 cursor-col-resize z-[100]
          hover:bg-sage/20 transition-colors
          ${isResizing ? "bg-sage/40" : "bg-transparent"}
        `}
      />

      <VaultSidebarHeader
        vaultName={vaultHandle?.name}
        userName={userName}
        isCloudVault={isCloudVault}
        hasVault={Boolean(vaultHandle)}
        onSettings={onSettings}
        onDocumentation={onDocumentation}
        onCollapse={() => setRailPanel(null)}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        {!vaultHandle ? (
          <div className="flex-1 overflow-y-auto overscroll-none p-3 custom-scrollbar">
            <VaultSidebarEmpty
              isVaultSupported={isVaultSupported}
              openVault={openVault}
              onCreateVault={() => setNewVaultFlowOpen(true)}
              onImport={onImport}
              onExport={onExport}
              setActiveFilePath={setActiveFilePath}
              activeFilePath={activeFilePath}
              onClose={onClose}
            />
          </div>
        ) : (
          <VaultSidebarNavigator
            panel={panel}
            onSelectPanel={(nextPanel) => {
              setLastSidebarPanel(nextPanel);
              setRailPanel(nextPanel);
            }}
            onNewFile={onNewFile}
            onNewFolder={async () => {
              if (!vaultHandle) return;
              const folderName = await dialog.prompt("Enter folder name:", "", "New Folder");
              if (!folderName) return;
              await vaultHandle.getDirectoryHandle(folderName, { create: true });
              await scanVault(vaultHandle);
            }}
            search={
              <UnifiedSearchInput
                autoFocus={panel === "search"}
                tokens={selectedTags}
                text={searchQuery}
                allTags={tags}
                onTokenAdd={(tag) => {
                  setSelectedTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
                  setLastSidebarPanel("search");
                  setRailPanel("search");
                }}
                onTokenRemove={(tag) => setSelectedTags((prev) => prev.filter((t) => t !== tag))}
                onTextChange={(text) => {
                  setSearchQuery(text);
                  setLastSidebarPanel("search");
                  setRailPanel("search");
                }}
              />
            }
          >
            {panel === "tags" ? (
          <VaultSidebarTags
            tags={tags}
            tagCounts={tagCounts}
            selectedTags={selectedTags}
            onSelectTag={(tag) => {
              setSelectedTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
              setRailPanel("search");
            }}
          />
        ) : panel === "views" ? (
          <div className="flex-1 overflow-y-auto">
            <SmartFolders
              onFileSelect={(handle, path) => {
                openFile(handle, path);
                if (onClose && window.innerWidth < 1024) onClose();
              }}
              renameFile={renameFile}
              deleteFile={deleteFile}
              duplicateFile={duplicateFile}
            />
          </div>
        ) : panel === "tasks" ? (
          <div className="flex-1 overflow-y-auto">
            <VaultSidebarTasks
              onFileSelect={(handle, path, line) => {
                openFile(handle, path);
                setPendingScrollTarget({ path, line });
                if (onClose && window.innerWidth < 1024) onClose();
              }}
              onExpand={() => setIsTasksExpanded(true)}
            />
            <DesktopTasksOverlay isOpen={isTasksExpanded} onClose={() => setIsTasksExpanded(false)} />
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-hidden flex flex-col">
              <VaultSidebarFiles
                processedFiles={panel === "search" ? processedFiles : allFiles}
                activeFilePath={activeFilePath}
                openFile={openFile}
                openFileInPane={openFileInPane}
                renameFile={renameFile}
                deleteFile={deleteFile}
                duplicateFile={duplicateFile}
                onClose={onClose}
                isSearchActive={panel === "search" && isSearching}
                highlightQuery={panel === "search" ? searchQuery : ""}
                treeView={panel === "files"}
                resolveFolderHandle={resolveFolderHandle}
                createNewFile={createNewFile}
                moveItem={moveItem}
              />
              {panel === "search" && hasMoreResults && (
                <button
                  type="button"
                  onClick={() => setShowAllResults(true)}
                  className="shrink-0 w-full py-2 text-ui-footnote text-center text-fg-faint hover:text-fg-muted transition-colors"
                >
                  Show all {totalResultsCount} results
                </button>
              )}
            </div>
          </div>
            )}
            </VaultSidebarNavigator>
        )}
      </div>
      </div>
  );
}
