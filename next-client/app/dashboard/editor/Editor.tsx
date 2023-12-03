"use client";

import EditorHeader from "./EditorHeader";
import EditorContent from "./EditorContent";
import Timer from "@/app/components/Timer";

const DEFAULTS_TIMES = {
  work: 25 * 60,
  shortRest: 5 * 60,
  longRest: 15 * 60,
  cycles: 4,
};

export default function Editor() {
  return (
    <div className="mb-8">
      <EditorHeader />
      <EditorContent />
      <Timer
        pomodoroTime={DEFAULTS_TIMES.work}
        shortRestTime={DEFAULTS_TIMES.shortRest}
        longRestTime={DEFAULTS_TIMES.longRest}
        cycles={DEFAULTS_TIMES.cycles}
      />
    </div>
  );
}
