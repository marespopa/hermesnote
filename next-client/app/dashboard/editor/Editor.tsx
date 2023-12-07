"use client";

import EditorHeader from "./EditorHeader";
import EditorContent from "./EditorContent";
import Timer from "@/app/components/Timer";
import { useAtom } from "jotai";
import { atom_frontMatter, atom_timerSettings } from "@/app/atoms/atoms";
import { useSearchParams } from "next/navigation";
import { useDocumentTitle } from "@/app/hooks/use-document-title";
import { useEffect } from "react";

const DEFAULTS_TIMES = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
  cycles: 4,
};

export default function Editor() {
  const [timerSettings] = useAtom(atom_timerSettings);
  const searchParams = useSearchParams();
  const isTimerVisible = searchParams.has("dev");
  const [frontMatter] = useAtom(atom_frontMatter);
  const fileTitle = frontMatter.title || "File";
  const [_, setDocumentTitle] = useDocumentTitle("Hermes Notes");

  useEffect(() => {
    setDocumentTitle(fileTitle);
  }, [fileTitle, setDocumentTitle]);

  return (
    <div className="mb-8">
      <EditorHeader />
      <EditorContent />
    </div>
  );
}
