"use client";

import { useState } from "react";
import EditorForm from "./EditorForm";
import EditorHeader from "./EditorHeader";
import EditorNavigation from "./EditorNavigation";
import EditorContent from "./EditorContent";

export type EditorTabs = "frontmatter" | "content";

export default function Editor() {
  const [tab, setTab] = useState<EditorTabs>("frontmatter");

  return (
    <>
      <EditorHeader />
      <EditorNavigation
        activeTab={tab}
        handler={(selectedTab: EditorTabs) => setTab(selectedTab)}
      />
      {tab === "frontmatter" && <EditorForm />}
      {tab === "content" && <EditorContent />}
    </>
  );
}
