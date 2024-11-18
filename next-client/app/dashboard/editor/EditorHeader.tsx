"use client";

import Button from "@/app/components/Button";
import { useAtom } from "jotai";
import EditorPreviewTrigger from "./EditorPreviewTrigger";
import PenIcon from "@/app/components/Icons/PenIcon";
import { useState } from "react";
import EditorForm from "./EditorForm";
import { FileMetadata } from "@/app/types/markdown";
import { atom_content } from "@/app/atoms/atoms";
import DropdownMenu from "@/app/components/DropdownMenu";
import ExportService from "@/app/services/export-service";

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
  const [isFormatterDialogOpen, setIsFormatterDialogOpen] = useState(false);

  const fileTitle = frontMatter.title;
  const fileName = frontMatter.fileName;
  const hasTitle = fileTitle.length > 0;

  return (
    <>
      <div className="bg-amber-100 p-4 mt-8 flex flex-col md:flex-row justify-between border-b-2 rounded-md">
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
          <div className="flex gap-4 flex-wrap">
            <DropdownMenu
              label="File"
              options={[
                {
                  label: "New File...",
                  action: actions.handleNewFile,
                },
                {
                  label: "Open File...",
                  action: actions.handleOpenFile,
                },
                {
                  label: "Save As...",
                  action: exportToMD
                },
                {
                  label: "Use a template...",
                  action: actions.handleSelectTemplate,
                },
                {
                  label: "Find and replace...",
                  action: actions.handleOpenFindAndReplace,
                },
              ]}
            />
            <EditorPreviewTrigger />
            <Button variant="primary" label="Save As" handler={exportToMD} />
          </div>
          <span
            className={`${
              hasChanges ? "visible" : "invisible"
            } text-xs my-2 text-gray-600 dark:text-gray-200`}
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

  function showFileDialog() {
    setIsFormatterDialogOpen(true);
  }

  function exportToMD() {
    ExportService.exportMarkdown(contentEdited, frontMatter);
    setFileContent(contentEdited);
  }
}
