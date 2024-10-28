"use client";

import EditorHeader from "./EditorHeader";
import EditorContent from "./EditorContent";
import Timer from "@/app/components/Timer";
import { useAtom } from "jotai";
import { atom_frontMatter, atom_timerSettings } from "@/app/atoms/atoms";
import { useSearchParams } from "next/navigation";
import { useDocumentTitle } from "@/app/hooks/use-document-title";
import { useState, useEffect } from "react";

export default function Editor() {
  const [mounted, setMounted] = useState(false)
  const [timerSettings] = useAtom(atom_timerSettings);
  const searchParams = useSearchParams();
  const isTimerVisible = searchParams.has("timer");
  const [frontMatter] = useAtom(atom_frontMatter);
  const fileTitle = frontMatter.title || "File";
  const [_, setDocumentTitle] = useDocumentTitle("Hermes Notes");

   useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setDocumentTitle(fileTitle);
  }, [fileTitle, setDocumentTitle]);

  if (!mounted) {
    return null
  }
  
  return (
    <div className="mb-8">
      {isTimerVisible && <Timer settings={timerSettings} />}
      <EditorHeader />
      <EditorContent />
    </div>
  );
}
