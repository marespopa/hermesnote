"use client";

import EditorHeader from "./EditorHeader";
import EditorContent from "./EditorContent";
import TimerContainer from "@/app/components/Timer/TimerContainer.component";

export default function Editor() {
  return (
    <div className="mb-8">
      <EditorHeader />
      <EditorContent />
      <TimerContainer />
    </div>
  );
}
