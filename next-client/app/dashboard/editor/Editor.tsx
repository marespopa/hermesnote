"use client";

import { useState } from "react";
import EditorForm from "./EditorForm";
import EditorHeader from "./EditorHeader";
import EditorContent from "./EditorContent";

export default function Editor() {
  return (
    <div className="mb-8">
      <EditorHeader />
      <EditorContent />
    </div>
  );
}
