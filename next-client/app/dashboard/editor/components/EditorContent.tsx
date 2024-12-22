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
import { replaceMarkdownWithHtml } from "../EditorUtils";

interface Props {
  contentEdited: string;
  frontMatter: FileMetadata;
  setContentEdited: SetAtom<[SetStateAction<string>], void>;
  setHasChanges: (hasChanges: boolean) => void;
}

interface CursorPosition {
  x: number;
  y: number;
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
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const sanitizeHTMLConfig = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "a"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      p: ["style"],
      div: ["style"],
      a: ["href"],
    },
    allowedStyles: {
      "*": {
        color: [
          /^#(0x)?[0-9a-f]+$/i,
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        ],
        "text-align": [/^left$/, /^right$/, /^center$/],
        "font-size": [/^\d+(?:px|em|%)$/],
      },
      p: {
        "font-size": [/^\d+rem$/],
      },
    },
  };

  const htmlEdit = `<article>${
    markdownRef?.current?.innerHTML || ""
  }</article>`;

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
          {/* Editable Content */}
          {renderEditor()}

          {/* Markdown Preview */}
          {renderPreview()}
        </div>
      </div>
    </div>
  );

  function isChildOf(node: Node | null, parentId: string): boolean {
    while (node !== null) {
      if ((node as HTMLElement).id === parentId) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  function createRange(
    node: Node,
    chars: { count: number },
    range?: Range
  ): Range {
    if (!range) {
      range = document.createRange();
      range.selectNode(node);
      range.setStart(node, 0);
    }

    if (chars.count === 0) {
      range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if ((node.textContent?.length || 0) < chars.count) {
          chars.count -= node.textContent?.length || 0;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          range = createRange(node.childNodes[i], chars, range);

          if (chars.count === 0) break;
        }
      }
    }

    return range;
  }

  function scrollToCursorPosition(
    contentEditableElement: HTMLElement | null
  ): void {
    if (!contentEditableElement) {
      return;
    }

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    // Get the current range
    const range = selection.getRangeAt(0);

    // Create a temporary span element at the cursor position
    const tempSpan = document.createElement("span");
    range.insertNode(tempSpan);

    // Scroll to the temporary span
    tempSpan.scrollIntoView({
      block: "center",
      inline: "nearest",
      behavior: "instant",
    });

    // Clean up by removing the temporary span
    const parent = tempSpan.parentNode;
    if (parent) {
      parent.removeChild(tempSpan);
    }
  }

  function setCurrentCursorPosition(chars: number): void {
    if (chars >= 0 && contentRef.current) {
      const selection = window.getSelection();
      const range = createRange(contentRef.current.parentNode as Node, {
        count: chars,
      });

      if (range) {
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }

  function getCurrentCursorPosition(parentId: string): number {
    const selection = window.getSelection();
    let charCount = -1;
    let node;

    if (selection?.focusNode) {
      if (isChildOf(selection.focusNode, parentId)) {
        node = selection.focusNode;
        charCount = selection.focusOffset;

        while (node) {
          if ((node as HTMLElement).id === parentId) break;

          if (node.previousSibling) {
            node = node.previousSibling;
            charCount += node.textContent?.length || 0;
          } else {
            node = node.parentNode;
            if (!node) break;
          }
        }
      }
    }

    return charCount;
  }

  function renderPreview() {
    return (
      <div
        ref={markdownRef}
        id="previewId"
        onClick={(e) => handlePreviewClick(e)}
        className={`${isEdit ? "hidden" : ""} p-4`}
      >
        <MarkdownPreview content={contentEdited} />
      </div>
    );
  }

  function handlePreviewClick(e: React.MouseEvent<HTMLDivElement>): void {
    setIsEdit(true);
    setCursorPosition(getCurrentCursorPosition("previewId"));
    setTimeout(() => contentRef.current?.focus(), 200);
  }

  function renderEditor() {
    return (
      <div
        onFocus={(e) => {
          e.preventDefault();
          setCurrentCursorPosition(cursorPosition);
          scrollToCursorPosition(contentRef.current);
        }}
        className={`${
          !isEdit ? "hidden" : ""
        } border-none border-gray-300 rounded-lg p-4 shadow-sm focus:outline-none`}
        ref={contentRef}
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={syncMarkdown}
        dangerouslySetInnerHTML={{ __html: htmlEdit }}
      ></div>
    );
  }

  function syncMarkdown(e: React.FocusEvent<HTMLDivElement>): void {
    const html = replaceMarkdownWithHtml(e.currentTarget.innerHTML);
    const cleanHTML = sanitizeHtml(html, sanitizeHTMLConfig);
    const md = html2markdown(cleanHTML);

    setContentEdited(md); // Update markdown state
    setHasChanges(true); // Mark changes as saved
    setIsEdit(false); // Exit edit mode
  }
}

const previewStyles =
  "w-full max-w-none prose my-6 rounded-sm bg-white prose-pre:bg-amber-100 prose-pre:text-gray-700";
