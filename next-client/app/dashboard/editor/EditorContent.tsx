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
import Image from "next/image";
import { useTheme } from "next-themes";

export default function EditorContent() {
  const [content] = useAtom(atom_content);
  const [frontMatter] = useAtom(atom_frontMatter);
  const [contentEdited, setContentEdited] = useAtom(atom_contentEdited);
  const [, setHasChanges] = useAtom(atom_hasChanges);
  const [isMounted, setIsMounted] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  useEffect(() => {
    setHasChanges(content !== contentEdited);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, contentEdited]);

  useEffect(() => setIsMounted(true), []);
  useKey("ctrls", () =>
    MarkdownExport.exportMarkdown(contentEdited, frontMatter)
  );

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <div className="flex gap-4">
      <div className={`${isToggled ? "hidden" : "w-1/2 relative"}`}>
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
      </div>
    </div>
  );

  function renderShowEditorToggle(): React.ReactNode {
    return (
      <span
        className="absolute right-4 top-8 cursor-pointer"
        onClick={() => setIsToggled(!isToggled)}
      >
        <Image
          src={`${
            isDarkTheme
              ? "/assets/icons/pencil-icon_dark.svg"
              : "/assets/icons/pencil-icon.svg"
          }`}
          width={16}
          height={16}
          alt="Toggle Editor"
        />
      </span>
    );
  }

  function renderHideEditorToggle(): React.ReactNode {
    return (
      <span
        className="absolute right-4 top-8 cursor-pointer"
        onClick={() => setIsToggled(!isToggled)}
      >
        <Image
          src={`${
            isDarkTheme
              ? "/assets/icons/close-icon_dark.svg"
              : "/assets/icons/close-icon.svg"
          }`}
          width={16}
          height={16}
          alt="Toggle Editor"
        />
      </span>
    );
  }
}
