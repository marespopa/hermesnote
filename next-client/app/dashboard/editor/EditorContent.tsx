import TextareaResizable from "@/app/components/TextareaResizable";
import React, { useEffect, useState } from "react";
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
import EditorTableOfContents from "./EditorTableOfContents";
import CloseIcon from "@/app/components/Icons/CloseIcon";
import PenIcon from "@/app/components/Icons/PenIcon";

export default function EditorContent() {
  const [content] = useAtom(atom_content);
  const [frontMatter] = useAtom(atom_frontMatter);
  const [contentEdited, setContentEdited] = useAtom(atom_contentEdited);
  const [, setHasChanges] = useAtom(atom_hasChanges);
  const [isMounted, setIsMounted] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [headings, setHeadings] = useState({});
  useEffect(() => {
    setHasChanges(content !== contentEdited);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, contentEdited]);

  useEffect(() => setIsMounted(true), []);
  useKey("ctrls", () =>
    MarkdownExport.exportMarkdown(contentEdited, frontMatter)
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const result = (await getHeadingsFromMarkdown(contentEdited)) as any;
        console.dir(result);
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

          <TextareaResizable
            name="content"
            value={contentEdited}
            handleChange={(e) => setContentEdited(e.currentTarget.value)}
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

  function renderShowEditorToggle(): React.ReactNode {
    return (
      <span
        className="absolute right-4 top-8 cursor-pointer"
        onClick={() => setIsToggled(!isToggled)}
      >
        <PenIcon alt="Toggle Editor" />
      </span>
    );
  }

  function renderHideEditorToggle(): React.ReactNode {
    return (
      <span
        className="absolute right-4 top-8 cursor-pointer"
        onClick={() => setIsToggled(!isToggled)}
      >
        <CloseIcon alt="Toggle Editor" />
      </span>
    );
  }
}
