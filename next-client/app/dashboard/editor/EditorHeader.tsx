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

export default function EditorHeader() {
  const [hasChanges] = useAtom(atom_hasChanges);
  const [content] = useAtom(atom_contentEdited);
  const [, setFileContent] = useAtom(atom_content);
  const [frontMatter] = useAtom(atom_frontMatter);

  const router = useRouter();

  return (
    <>
      <div className="mt-8 flex justify-between">
        <h1 className="text-5xl leading-tight">Edit File</h1>
        <div className="flex flex-col items-end">
          <div className="flex gap-4">
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
    </>
  );

  function exportToMD() {
    MarkdownExport.exportMarkdown(content, frontMatter);
    setFileContent(content);
  }
}
