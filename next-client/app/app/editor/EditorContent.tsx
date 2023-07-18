import TextareaResizable from "@/app/components/TextareaResizable";
import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { atom, useAtom } from "jotai";
import {
  atom_content,
  atom_contentEdited,
  atom_hasChanges,
} from "@/app/atoms/atoms";

export default function EditorContent() {
  const [content] = useAtom(atom_content);
  const [contentEdited, setContentEdited] = useAtom(atom_contentEdited);
  const [, setHasChanges] = useAtom(atom_hasChanges);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setHasChanges(content !== contentEdited);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, contentEdited]);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return "Loading...";
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
      <div className="w-1/2 prose p-4 my-4 bg-white">
        <ReactMarkdown>{contentEdited}</ReactMarkdown>
      </div>
    </div>
  );
}
