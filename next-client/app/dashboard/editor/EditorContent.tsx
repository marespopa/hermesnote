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

export default function EditorContent() {
  const [content] = useAtom(atom_content);
  const [frontMatter] = useAtom(atom_frontMatter);
  const [contentEdited, setContentEdited] = useAtom(atom_contentEdited);
  const [, setHasChanges] = useAtom(atom_hasChanges);
  const [isMounted, setIsMounted] = useState(false);

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
      <div className="w-1/2">
        <TextareaResizable
          name="content"
          value={contentEdited}
          handleChange={(e) => setContentEdited(e.currentTarget.value)}
        />
      </div>
      <EditorPreview content={contentEdited} />
    </div>
  );
}
