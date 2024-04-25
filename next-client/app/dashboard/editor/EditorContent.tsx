import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import {
  atom_content,
  atom_contentEdited,
  atom_frontMatter,
  atom_hasChanges,
} from "@/app/atoms/atoms";
import Loading from "@/app/components/Loading/Loading";
import EditorPreview from "./EditorPreview";
import { useKey } from "@/app/hooks/use-key";
import MarkdownExport from "@/app/services/markdown-export";
import { getHeadingsFromMarkdown } from "@/app/services/markdown-utils";
import TextareaResizable from "@/app/components/TextareaResizable";
import EditorTableOfContents from "./EditorTableOfContents";
import CloseIcon from "@/app/components/Icons/CloseIcon";
import PenIcon from "@/app/components/Icons/PenIcon";
import EditorSidebar from "./EditorSidebar";
import toast from "react-hot-toast";
import { PICKER_OPTIONS } from "./EditorEmpty";
import { StatusResponse } from "@/app/services/save-utils";
import matter from "gray-matter";
import TemplateSelectionModal from "../templates/TemplateSelectionModal";
import EditorTextarea from "./EditorTextarea";
import EyeIcon from "@/app/components/Icons/EyeIcon";

type PanelState = "both" | "editor" | "preview";

export default function EditorContent() {
  const router = useRouter();
  const [content] = useAtom(atom_content);
  const [frontMatter] = useAtom(atom_frontMatter);
  const [contentEdited, setContentEdited] = useAtom(atom_contentEdited);
  const [, setFrontMatter] = useAtom(atom_frontMatter);
  const [, setContent] = useAtom(atom_content);
  const [, setHasChanges] = useAtom(atom_hasChanges);
  const [isMounted, setIsMounted] = useState(false);
  const [headings, setHeadings] = useState({});
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [panelState, setPanelState] = useState<PanelState>("editor");
  const [isTemplateSelectModalVisible, setIsTemplateSelectModalVisible] =
    useState(false);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const result = (await getHeadingsFromMarkdown(contentEdited)) as any;
        setHeadings(result);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [contentEdited]);

  if (!isMounted) {
    return <Loading />;
  }

  if (isLoading) {
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
      <EditorSidebar
        actions={{
          newFile: handleCreateFile,
          openFile: handleOpenFile,
          templateFile: handleSelectTemplate,
          emoji: handleAddEmoji,
        }}
      />
      <div className="flex gap-4">
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
            setCursorPosition={setCursorPosition}
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
          <EditorTableOfContents headings={headings}></EditorTableOfContents>
        </div>
      </div>

      {isTemplateSelectModalVisible && (
        <TemplateSelectionModal
          isOpen={isTemplateSelectModalVisible}
          handleClose={() => {
            setIsTemplateSelectModalVisible(false);
            setIsLoading(false);
          }}
        ></TemplateSelectionModal>
      )}
    </>
  );

  function handleAddEmoji(emoji: any) {
    let textBeforeCursorPosition = contentEdited.substring(0, cursorPosition);
    let textAfterCursorPosition = contentEdited.substring(
      cursorPosition,
      contentEdited.length
    );
    const newContent = `${textBeforeCursorPosition}${emoji}${textAfterCursorPosition}`;

    setContentEdited(newContent);
  }

  function handleCreateFile() {
    setFrontMatter({
      fileName: "file",
      title: "File",
      description: "",
      tags: "",
    });
    setContent("# Title");
    setContentEdited("# Title");
    router.push("/dashboard/editor");
  }

  async function handleOpenFile() {
    const [fileHandle] = await window.showOpenFilePicker(PICKER_OPTIONS);
    const file = await fileHandle.getFile();

    setIsLoading(true);
    parseFile(file)
      .then(() => {
        toast.success("File has been loaded");
        router.push("/dashboard/editor");
      })
      .catch((error) => {
        toast.success("File could not be loaded");
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function parseFile(file: File): Promise<StatusResponse> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        const result = await loadFileData(reader, file.name);
        resolve(result);
      };

      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  function loadFileData(reader: FileReader, fileName: string) {
    const fileContent = String(reader.result);
    const { data: frontMatter, content } = matter(fileContent);

    let setterPromise = new Promise<StatusResponse>(function (resolve, reject) {
      try {
        setFrontMatter({
          fileName: fileName || "",
          title: frontMatter?.title || "",
          description: frontMatter?.description || "",
          tags: frontMatter?.tags ? frontMatter?.tags.join(",") : "",
        });
        setContent(content);
        setContentEdited(content);

        resolve({
          status: "error",
          message: "File has been loaded successfully",
        });
      } catch (error) {
        reject({
          status: "error",
          message: error,
        });
      }
    });

    return setterPromise;
  }

  function handleSelectTemplate() {
    setIsTemplateSelectModalVisible(true);
  }

  function renderShowEditorToggle(): React.ReactNode {
    return (
      <span
        className="absolute right-4 top-8 cursor-pointer"
        onClick={() => setPanelState("editor")}
      >
        <PenIcon tooltip="Show Editor" alt="Toggle Editor" size={14} />
      </span>
    );
  }

  function renderShowPreviewToggle(): React.ReactNode {
    return (
      <span
        className="absolute right-4 top-8 cursor-pointer"
        onClick={() => setPanelState("preview")}
      >
        <EyeIcon tooltip="Show Preview" alt="Toggle Preview" size={20} />
      </span>
    );
  }

  function renderHidePreviewToggle(): React.ReactNode {
    return (
      <span
        className="absolute right-4 top-8 cursor-pointer"
        onClick={() => setPanelState("editor")}
      >
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
      <span
        className="absolute right-4 top-8 cursor-pointer"
        onClick={() => setPanelState("preview")}
      >
        <CloseIcon
          tooltip="Hide the editor pane"
          alt="Toggle Editor"
          size={14}
        />
      </span>
    );
  }
}
