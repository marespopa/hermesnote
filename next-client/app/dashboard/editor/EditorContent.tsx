import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SetStateAction } from "jotai";
import Loading from "@/app/components/Loading/Loading";
import EditorPreview from "./EditorPreview";
import { useKey } from "@/app/hooks/use-key";
import MarkdownExport from "@/app/services/markdown-export";
import CloseIcon from "@/app/components/Icons/CloseIcon";
import PenIcon from "@/app/components/Icons/PenIcon";
import EditorTextarea from "./EditorTextarea";
import EyeIcon from "@/app/components/Icons/EyeIcon";
import { FileMetadata } from "@/app/types/markdown";
import { SetAtom } from "./EditorTypes";

type PanelState = "both" | "editor" | "preview";

interface Props {
  content: string;
  contentEdited: string;
  frontMatter: FileMetadata;
  setFrontMatter: SetAtom<[SetStateAction<any>], void>;
  setContentEdited: SetAtom<[SetStateAction<string>], void>;
  setContent: SetAtom<[SetStateAction<string>], void>;
  hasChanges: boolean;
  setHasChanges: any;
}

export default function EditorContent({
  content,
  setContent,
  contentEdited,
  setContentEdited,
  frontMatter,
  setFrontMatter,
  hasChanges,
  setHasChanges,
}: Props) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [panelState, setPanelState] = useState<PanelState>("editor");

  useEffect(() => {
    setHasChanges(content !== contentEdited);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, contentEdited]);

  useEffect(() => setIsMounted(true), []);
  useKey("ctrls", () =>
    MarkdownExport.exportMarkdown(contentEdited, frontMatter)
  );

  useKey("home", () => {
    setIsMounted(false);
    router.push("/dashboard");
  });

  if (!isMounted) {
    return <Loading />;
  }

  function getClassByPanelState(panel: string) {
    if (panelState === "both") {
      return "w-1/2";
    }

    if (panel === panelState) {
      return "w-full";
    }

    return "hidden";
  }

  return (
    <>
      <div className="flex gap-4 editor-area max-height-[1000px] overflow-y-auto">
        <div
          className={`${getClassByPanelState(
            "editor"
          )} relative transition ease-in-out delay-150`}
        >
          {panelState === "both" && renderHideEditorToggle()}
          {panelState === "editor" && renderShowPreviewToggle()}
          <EditorTextarea
            contentEdited={contentEdited}
            setContentEdited={setContentEdited}
          />
        </div>
        <div
          className={`${getClassByPanelState(
            "preview"
          )} relative transition ease-in-out delay-150`}
        >
          {panelState === "both" && renderHidePreviewToggle()}
          {panelState === "preview" && renderShowEditorToggle()}
          <EditorPreview content={contentEdited} />
        </div>
      </div>
    </>
  );

  function renderShowEditorToggle(): React.ReactNode {
    return (
      <span className={iconStyle} onClick={() => setPanelState("editor")}>
        <PenIcon tooltip="Show Editor" alt="Toggle Editor" size={14} />
      </span>
    );
  }

  function renderShowPreviewToggle(): React.ReactNode {
    return (
      <span className={iconStyle} onClick={() => setPanelState("preview")}>
        <EyeIcon tooltip="Show Preview" alt="Toggle Preview" size={20} />
      </span>
    );
  }

  function renderHidePreviewToggle(): React.ReactNode {
    return (
      <span className={iconStyle} onClick={() => setPanelState("editor")}>
        <CloseIcon
          tooltip="Hide the preview pane"
          alt="Toggle Preview"
          size={14}
        />
      </span>
    );
  }

  function renderHideEditorToggle(): React.ReactNode {
    return (
      <span className={iconStyle} onClick={() => setPanelState("preview")}>
        <CloseIcon
          tooltip="Hide the editor pane"
          alt="Toggle Editor"
          size={14}
        />
      </span>
    );
  }
}

const iconStyle = `absolute right-5 top-8 cursor-pointer`;
