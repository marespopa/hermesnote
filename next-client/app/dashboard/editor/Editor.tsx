"use client";

import EditorHeader from "./EditorHeader";
import EditorContent from "./EditorContent";
import Timer from "@/app/components/Timer";
import { useAtom } from "jotai";
import { atom_frontMatter, atom_timerSettings } from "@/app/atoms/atoms";
import { useSearchParams } from "next/navigation";
import { useDocumentTitle } from "@/app/hooks/use-document-title";
import { useEffect } from "react";

export default function Editor() {
  const [timerSettings] = useAtom(atom_timerSettings);
  const [frontMatter] = useAtom(atom_frontMatter);
  const fileTitle = frontMatter.title || "File";
  const [_, setDocumentTitle] = useDocumentTitle("Hermes Notes");

  useEffect(() => {
    setDocumentTitle(fileTitle);
  }, [fileTitle, setDocumentTitle]);

  return (
    <div className="mb-8">
      <Timer settings={timerSettings} />
      <EditorHeader />
      <EditorContent />
    </div>
  );
}
