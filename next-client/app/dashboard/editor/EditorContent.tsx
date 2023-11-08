import React, { useEffect, useRef, useState } from "react";
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
import EmojiControl from "../components/EmojiControl";

export default function EditorContent() {
  const router = useRouter();
  const [content] = useAtom(atom_content);
  const [frontMatter] = useAtom(atom_frontMatter);
  const [contentEdited, setContentEdited] = useAtom(atom_contentEdited);
  const [, setHasChanges] = useAtom(atom_hasChanges);
  const [isMounted, setIsMounted] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [headings, setHeadings] = useState({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);

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

  return (
    <>
      <div className="flex gap-4">
        <div className={`${isToggled ? "hidden" : "w-1/2"} relative`}>
          {!isToggled && renderHideEditorToggle()}
          <EmojiControl handleAction={handleAddEmoji} />
          <TextareaResizable
            name="content"
            value={contentEdited}
            handleChange={(e) => setContentEdited(e.currentTarget.value)}
            handleCursorPositionUpdate={(pos: number) => setCursorPosition(pos)}
          />
        </div>
        <div className={`${isToggled ? "w-full" : "w-1/2"} relative`}>
          {isToggled && renderShowEditorToggle()}
          <EditorPreview content={contentEdited} />
          <EditorTableOfContents headings={headings}></EditorTableOfContents>
        </div>
      </div>
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

  function renderShowEditorToggle(): React.ReactNode {
    return (
      <span
        className="absolute right-4 top-8 cursor-pointer"
        onClick={() => setIsToggled(!isToggled)}
      >
        <PenIcon tooltip="Show Editor" alt="Toggle Editor" />
      </span>
    );
  }

  function renderHideEditorToggle(): React.ReactNode {
    return (
      <span
        className="absolute right-4 top-8 cursor-pointer"
        onClick={() => setIsToggled(!isToggled)}
      >
        <CloseIcon tooltip="Hide the editor pane" alt="Toggle Editor" />
      </span>
    );
  }
}
