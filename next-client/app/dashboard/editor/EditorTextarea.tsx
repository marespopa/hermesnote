import TextareaResizable from "@/app/components/TextareaResizable";
import React from "react";

type Props = {
  contentEdited: string;
  setContentEdited: (e: string) => void;
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>;
};

export default function EditorTextarea({
  contentEdited,
  setContentEdited,
  setCursorPosition,
}: Props) {
  return (
    <TextareaResizable
      name="content"
      value={contentEdited}
      handleChange={(e) => setContentEdited(e.currentTarget.value)}
      handleCursorPositionUpdate={(pos: number) => setCursorPosition(pos)}
    />
  );
}
