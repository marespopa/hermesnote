"use client";

import Button from "@/app/components/Button";
import { useAtom } from "jotai";
import EditorPreviewTrigger from "../EditorPreviewTrigger";
import PenIcon from "@/app/components/Icons/PenIcon";
import { useState } from "react";
import EditorForm from "../EditorForm";
import { FileMetadata } from "@/app/types/markdown";
import { atom_content, atom_showDashboard } from "@/app/atoms/atoms";
import DropdownMenu from "@/app/components/DropdownMenu";
import ExportService from "@/app/services/export-service";
import { FaCaretDown, FaCog, FaEdit, FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useIsMobile from "@/app/hooks/use-is-mobile";

interface Props {
  contentEdited: string;
  frontMatter: FileMetadata;
  hasChanges: boolean;
  actions: {
    handleNewFile: () => void;
    handleOpenFile: () => void;
    handleSelectTemplate: () => void;
    handleOpenFindAndReplace: () => void;
  };
}

export default function EditorHeader({
  contentEdited,
  frontMatter,
  hasChanges,
  actions,
}: Props) {
  const [, setFileContent] = useAtom(atom_content);
  const [_, setShowDashboardOnStartup] = useAtom(atom_showDashboard);

  const [isFormatterDialogOpen, setIsFormatterDialogOpen] = useState(false);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();
  const fileTitle = frontMatter.title;
  const fileName = frontMatter.fileName;
  const hasTitle = fileTitle.length > 0;

  return (
    <>
      <div
        className={`bg-amber-100 p-4 ${
          isMobile ? "mt-20" : "mt-8"
        } flex flex-col md:flex-row justify-between border-b-2 rounded-sm`}
      >
        <div className="flex gap-2 flex-col">
          <h1 className="text-3xl leading-tight flex gap-2 items-center">
            <span>{hasTitle && `${fileTitle}`}</span>
            {
              <span className="cursor-pointer" onClick={() => showFileDialog()}>
                <PenIcon tooltip="File Settings" size={16} alt="Edit Title" />
              </span>
            }
          </h1>
          <h2 className="text-sm leading-tight">{`${
            fileName?.endsWith(".md") ? fileName : fileName + ".md"
          }`}</h2>
        </div>
        <div className="flex flex-col md:items-end mt-2 md:mt-0">
          {renderOptionsMenu()}
          <span
            className={`${
              hasChanges ? "visible" : "invisible"
            } text-xs my-2 text-gray-600`}
          >
            You have unsaved changes.
          </span>
        </div>
      </div>
      <EditorForm
        isOpened={isFormatterDialogOpen}
        handleClose={() => setIsFormatterDialogOpen(false)}
      />
    </>
  );

  function renderOptionsMenu() {
    if (isMobile) {
      return (
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="secondary"
            handler={() => setIsFabMenuOpen(!isFabMenuOpen)}
          >
            <FaCog /> Options
          </Button>
          {isFabMenuOpen && (
            <div className="fixed top-16 right-4 rounded-sm shadow-sm p-2 flex flex-col flex-wrap space-y-4 w-[164px] bg-white border border-gray-200 rounded shadow-sm z-10">
              {renderFileMenu()}
              {renderEditMenu()}
              {renderHelpMenu()}
              <EditorPreviewTrigger />
              <Button variant="primary" label="Save As" handler={exportToMD} />
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 items-start">
        {renderFileMenu()}
        {renderEditMenu()}
        {renderHelpMenu()}
        <EditorPreviewTrigger />
        <Button variant="primary" label="Save As" handler={exportToMD} />
      </div>
    );
  }

  function renderEditMenu() {
    return (
      <DropdownMenu
        label={
          <span className="flex gap-2 items-center">
            Edit <FaCaretDown />
          </span>
        }
        options={[
          {
            label: "Copy as markdown",
            action: () => navigator.clipboard.writeText(contentEdited),
          },
          {
            label: "Find and replace...",
            action: actions.handleOpenFindAndReplace,
          },
        ]}
      />
    );
  }
  function renderHelpMenu() {
    return (
      <DropdownMenu
        label={
          <span className="flex gap-2 items-center">
            Help <FaCaretDown />
          </span>
        }
        options={[
          {
            label: "Welcome",
            action: () => {
              setShowDashboardOnStartup(true);
              router.push("/dashboard");
            },
          },
          {
            label: "Documentation",
            action: () => {
              router.push("/documentation");
            },
          },
        ]}
      />
    );
  }

  function renderFileMenu() {
    return (
      <DropdownMenu
        label={
          <span className="flex gap-2 items-center">
            File <FaCaretDown />
          </span>
        }
        options={[
          {
            label: "New File...",
            action: actions.handleNewFile,
          },
          {
            label: "New from template...",
            action: actions.handleSelectTemplate,
          },
          {
            label: "Open File...",
            action: actions.handleOpenFile,
          },
          {
            label: "Save As...",
            action: exportToMD,
          },
        ]}
      />
    );
  }

  function showFileDialog() {
    setIsFormatterDialogOpen(true);
  }

  function exportToMD() {
    ExportService.exportMarkdown(contentEdited, frontMatter);
    setFileContent(contentEdited);
  }
}
