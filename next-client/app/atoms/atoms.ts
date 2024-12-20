import { WritableAtom, atom, createStore } from "jotai";
import { RESET, atomWithStorage, createJSONStorage } from "jotai/utils";

export type TimerData = {
  workSessionDurationInMin: number;
  shortBreakSessionDurationInMin: number;
  longBreakSessionDurationInMin: number;
};

const storage = createJSONStorage(() => sessionStorage);

export const contentStore = createStore();

export const atom_timerSettings = atomWithStorage("timerSettings", {
  workSessionDurationInMin: 25,
  shortBreakSessionDurationInMin: 5,
  longBreakSessionDurationInMin: 15,
} as TimerData);

type SetStateActionWithReset<Value> =
  | Value
  | typeof RESET
  | ((prev: Value) => Value | typeof RESET);

type FrontmatterAtom = WritableAtom<
  {
    title: string;
    description: string;
    fileName: string;
    tags: string;
  },
  [
    SetStateActionWithReset<{
      title: string;
      description: string;
      fileName: string;
      tags: string;
    }>
  ],
  void
>;

type ContentAtom = WritableAtom<
  string,
  [SetStateActionWithReset<string>],
  void
>;

// File Atoms
export const atom_content = atomWithStorage(
  "content",
  "",
  storage
) as ContentAtom;
export const atom_contentEdited = atomWithStorage(
  "contentEdited",
  "",
  storage
) as ContentAtom;
export const atom_frontMatter = atomWithStorage(
  "frontmatter",
  {
    title: "",
    description: "",
    fileName: "file",
    tags: "",
  },
  storage
) as FrontmatterAtom;

export const atom_searchTerm = atom('');
export const atom_hasChanges = atom(false);
export const atom_isSaved = atom(false);
export const atom_showDashboard = atom(true);

