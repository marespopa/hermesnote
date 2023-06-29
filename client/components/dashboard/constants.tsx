export const TAB_LIST = [
  { id: "frontmatter", label: "FrontMatter" },
  { id: "content", label: "Content" },
  { id: "export", label: "Export" },
] as const;

export const DEFAULT_CONTENT = "# Title";
export type TabListItem = "frontmatter" | "content" | "export";

export const PICKER_OPTIONS = {
  types: [
    {
      description: "MD Files",
      accept: {
        "text/markdown": [".md", ".txt"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

export const UNSAVED_CHANGES_WARNING_TEXT =
  "You have unsaved changes - are you sure you wish to leave this page?";
