"use client";

import {
  atom_content,
  atom_contentEdited,
  atom_frontMatter,
  atom_hasChanges,
} from "@/app/atoms/atoms";
import Button from "@/app/components/Button";
import MarkdownExport from "@/app/services/markdown-export";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import EditorPreviewTrigger from "./EditorPreviewTrigger";
import PenIcon from "@/app/components/Icons/PenIcon";
import { useState } from "react";
import EditorForm from "./EditorForm";

export default function EditorHeader() {
  const [hasChanges] = useAtom(atom_hasChanges);
  const [content] = useAtom(atom_contentEdited);
  const [, setFileContent] = useAtom(atom_content);
  const [frontMatter] = useAtom(atom_frontMatter);
  const [isFormatterDialogOpen, setIsFormatterDialogOpen] = useState(false);

  const router = useRouter();
  const fileTitle = frontMatter.title;
  const fileName = frontMatter.fileName;
  const hasTitle = fileTitle.length > 0;

  return (
    <>
      <div className="mt-8 flex flex-col md:flex-row justify-between">
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
            fileName.endsWith(".md") ? fileName : fileName + ".md"
          }`}</h2>
        </div>
        <div className="flex flex-col md:items-end mt-2 md:mt-0">
          <div className="flex gap-4 flex-wrap">
            <Button
              variant="default"
              label="Back to Main"
              handler={() => router.push("/dashboard")}
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
    MarkdownExport.exportMarkdown(content, frontMatter);
    setFileContent(content);
  }
}
