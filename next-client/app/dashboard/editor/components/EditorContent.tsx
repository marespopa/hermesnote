import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SetStateAction } from "jotai";

import Loading from "@/app/components/Loading/Loading";
import MarkdownPreview from "../../components/MarkdownPreview";
import ExportService from "@/app/services/export-service";
import { useCommand } from "@/app/hooks/use-command";
import { FileMetadata } from "@/app/types/markdown";
import { SetAtom } from "../EditorTypes";

import EditorTextarea from "./EditorTextarea";
import { FaColumns, FaEye, FaPen } from "react-icons/fa";

interface Props {
  contentEdited: string;
  frontMatter: FileMetadata;
  setContentEdited: SetAtom<[SetStateAction<string>], void>;
  setHasChanges: (hasChanges: boolean) => void;
}

type PanelState = "both" | "editor" | "preview";

export default function EditorContent({
  contentEdited,
  setContentEdited,
  frontMatter,
  setHasChanges,
}: Props) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [panelState, setPanelState] = useState<PanelState>("editor");
  const markdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useCommand("save", () =>
    ExportService.exportMarkdown(contentEdited, frontMatter)
  );

  useCommand("home", () => {
    setIsMounted(false);
    router.push("/dashboard");
  });

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 editor-area max-height-[1000px] overflow-y-auto">
      {/* Toggle Buttons */}
      {renderToggleButtons()}

      {/* Panels */}
      <div
        className={`w-full relative transition ease-in-out grid ${
          panelState === "both" ? "grid-cols-2 gap-2" : "grid-cols-1"
        }`}
      >
        {(panelState === "both" || panelState === "editor") && renderEditor()}
        {(panelState === "both" || panelState === "preview") && renderPreview()}
      </div>
    </div>
  );

  function renderToggleButtons() {
    return (
      <div className="flex justify-end gap-2 mb-2 p-4 bg-amber-100 rounded-b-lg">
        <ToggleButton
          icon={<FaPen />}
          title="Editor Only"
          isActive={panelState === "editor"}
          onClick={() => setPanelState("editor")}
        />
        <ToggleButton
          icon={<FaEye />}
          title="Preview Only"
          isActive={panelState === "preview"}
          onClick={() => setPanelState("preview")}
        />
        <ToggleButton
          icon={<FaColumns />}
          title="Split View (Editor + Preview)"
          isActive={panelState === "both"}
          onClick={() => setPanelState("both")}
        />
      </div>
    );
  }

  function renderPreview() {
    return (
      <div className={previewStyles} id="pdfExport">
        <div ref={markdownRef} id="previewId" className="p-4">
          <MarkdownPreview content={contentEdited} />
        </div>
      </div>
    );
  }

  function renderEditor() {
    return (
      <EditorTextarea
        contentEdited={contentEdited}
        setContentEdited={(newContent) => {
          setContentEdited(newContent); // Update content
          setHasChanges(true); // Mark changes as true
        }}
      />
    );
  }
}

const ToggleButton = ({
  icon,
  title,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    title={title} // Tooltip for hover users
    aria-label={title} // Screen reader support
    aria-pressed={isActive} // Indicates toggle state
    className={`px-4 py-2 border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
      isActive
        ? "bg-emerald-600 text-white border-transparent"
        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
    }`}
  >
    {icon}
  </button>
);
const previewStyles =
  "w-full max-w-none prose my-6 rounded-sm bg-white prose-pre:bg-amber-100 prose-pre:text-gray-700";
