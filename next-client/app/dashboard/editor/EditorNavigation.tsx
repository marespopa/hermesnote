import React from "react";
import { EditorTabs } from "./Editor";

type Props = {
  activeTab: EditorTabs;
  handler: (arg: EditorTabs) => void;
};

export default function EditorNavigation({ activeTab, handler }: Props) {
  return (
    <nav
      role="tablist"
      className="border-b border-gray-300 dark:border-slate-700 flex gap-4 text-sm my-4"
    >
      <button
        className={`${tabStyle} ${
          activeTab === "frontmatter" && "border-b-2 border-blue-500"
        }`}
        onClick={() => handler("frontmatter")}
      >
        FrontMatter
      </button>
      <button
        className={`${tabStyle} ${
          activeTab === "content" && "border-b-2 border-blue-500"
        }`}
        onClick={() => handler("content")}
      >
        Content
      </button>
    </nav>
  );
}

const tabStyle = `-mb-[1px]`;
