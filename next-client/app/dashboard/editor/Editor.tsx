"use client";

import EditorHeader from "./EditorHeader";
import EditorContent from "./EditorContent";
import Timer from "@/app/components/Timer";
import { useAtom } from "jotai";
import { atom_timerSettings } from "@/app/atoms/atoms";

const DEFAULTS_TIMES = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
  cycles: 4,
};

export default function Editor() {
  const [timerSettings] = useAtom(atom_timerSettings);

  return (
    <div className="mb-8">
      <EditorHeader />
      <EditorContent />
      <Timer
        settings={{
          pomodoroTime:
            timerSettings.workSessionDurationInMin || DEFAULTS_TIMES.work,
          shortRestTime:
            timerSettings.shortBreakSessionDurationInMin ||
            DEFAULTS_TIMES.shortBreak,
          longRestTime:
            timerSettings.longBreakSessionDurationInMin ||
            DEFAULTS_TIMES.longBreak,
          cycles: DEFAULTS_TIMES.cycles,
        }}
      />
    </div>
  );
}
