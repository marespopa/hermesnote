import { atom, createStore } from "jotai";

export const contentStore = createStore();

export const atom_content = atom("");
export const atom_contentEdited = atom("");
export const atom_hasChanges = atom(false);
export const atom_frontMatter = atom({
  title: "",
  description: "",
  fileName: "file.md",
  tags: "",
});
