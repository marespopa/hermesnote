import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SetStateAction } from "jotai";

import Loading from "@/app/components/Loading/Loading";
import MarkdownPreview from "../../components/MarkdownPreview";
import ExportService from "@/app/services/export-service";
import { useCommand } from "@/app/hooks/use-command";
import { FileMetadata } from "@/app/types/markdown";
import { SetAtom } from "../EditorTypes";

import html2markdown from "@notable/html2markdown";
import sanitizeHtml from "sanitize-html";
import { FaCopy } from "react-icons/fa";

interface Props {
  contentEdited: string;
  frontMatter: FileMetadata;
  setContentEdited: SetAtom<[SetStateAction<string>], void>;
  setHasChanges: any;
}

export default function EditorContent({
  contentEdited,
  setContentEdited,
  frontMatter,
  setHasChanges,
}: Props) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const markdownRef = useRef<HTMLDivElement>(null);

  const htmlEdit = `<article>${markdownRef?.current?.innerHTML}</article>`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Save command using `useCommand` hook
  useCommand("save", () =>
    ExportService.exportMarkdown(contentEdited, frontMatter)
  );

  // Navigate to home/dashboard
  useCommand("home", () => {
    setIsMounted(false);
    router.push("/dashboard");
  });

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <div className="flex gap-4 editor-area max-height-[1000px] overflow-y-auto">
      <div className="w-full relative transition ease-in-out delay-150">
        <div className={previewStyles} id="pdfExport">
          <>
            {/* Editable Content */}
            {renderEditor()}

            {/* Markdown Preview */}
            {renderPreview()}
          </>
        </div>
      </div>
    </div>
  );

  function renderPreview() {
    return (
      <div
        ref={markdownRef}
        onClick={() => setIsEdit(true)}
        className={`${isEdit && "hidden"} p-4`}
      >
        <MarkdownPreview content={contentEdited} />
      </div>
    );
  }

  function renderEditor() {
    return (
      <>
        <div
          className={`${
            !isEdit && "hidden"
          } border-none border-gray-300 rounded-lg p-4 shadow-sm focus:outline-none`}
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={syncMarkdown} // Sync markdown on blur
          dangerouslySetInnerHTML={{ __html: htmlEdit }}
        ></div>
      </>
    );
  }

  function syncMarkdown(e: React.FocusEvent<HTMLDivElement, Element>) {
    const html = e.currentTarget.innerHTML;
    const cleanHTML = sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "table",
        "tr",
        "tr",
      ]),
    });
    const md = html2markdown(cleanHTML);
    
    setContentEdited(md); // Update markdown state
    setHasChanges(true);
    setIsEdit(false); // Exit edit mode
  }
}

const previewStyles = `w-full max-w-none prose my-6 rounded-sm bg-white prose-pre:bg-amber-100 prose-pre:text-gray-700`;
const iconStyle = `absolute right-5 top-8 cursor-pointer transition-all duration-200 ease-in-out focus:scale-105 hover:scale-105`;
