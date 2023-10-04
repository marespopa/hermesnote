"use client";

import { useState } from "react";
import EditorForm from "./EditorForm";
import EditorHeader from "./EditorHeader";
import EditorNavigation from "./EditorNavigation";
import EditorContent from "./EditorContent";

export type EditorTabs = "content" | "frontmatter";

export default function Editor() {
  const [tab, setTab] = useState<EditorTabs>("content");

  return (
    <div className="mb-8">
      <EditorHeader />
      <EditorNavigation
        activeTab={tab}
        handler={(selectedTab: EditorTabs) => setTab(selectedTab)}
      />
      {tab === "content" && <EditorContent />}
      {tab === "frontmatter" && <EditorForm />}
    </div>
  );
}
