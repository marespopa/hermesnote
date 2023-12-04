import { atom, createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type TimerData = {
  workSessionDurationInMin: number;
  shortBreakSessionDurationInMin: number;
  longBreakSessionDurationInMin: number;
};

export const contentStore = createStore();
export const atom_content = atomWithStorage("content", "");
export const atom_timerSettings = atomWithStorage("timerSettings", {
  workSessionDurationInMin: 25,
  shortBreakSessionDurationInMin: 5,
  longBreakSessionDurationInMin: 15,
} as TimerData);

export const atom_contentEdited = atomWithStorage("contentEdited", "");
export const atom_hasChanges = atom(false);
export const atom_isSaved = atom(false);
export const atom_frontMatter = atomWithStorage("frontmatter", {
  title: "",
  description: "",
  fileName: "file",
  tags: "",
});
