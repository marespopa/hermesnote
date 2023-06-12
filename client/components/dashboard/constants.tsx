export const TAB_LIST = [
  { id: "info", label: "Info" },
  { id: "editor", label: "Editor" },
  { id: "export", label: "Export" },
] as const;

export const DEFAULT_CONTENT = "# Title";
export type TabListItem = "info" | "editor" | "export";

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
