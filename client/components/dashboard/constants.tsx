export const TAB_LIST = [
  { id: "info", label: "Info" },
  { id: "editor", label: "Editor" },
] as const;

export const DEFAULT_CONTENT = "# Title";
export type TabListItem = "info" | "editor";

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
