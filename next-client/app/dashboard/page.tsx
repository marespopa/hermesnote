"use client";

import { containerStyle } from "@/app/constants/styles";
import EditorEmpty from "./editor/components/EditorEmpty";

export default function AppPage() {
  return (
    <div className={containerStyle}>
      <EditorEmpty />
    </div>
  );
}
