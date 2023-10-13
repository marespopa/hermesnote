import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

const EditorPreview = ({ content }: Props) => {
  return (
    <div className={previewStyles} id={"pdfExport"}>
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
};

const previewStyles = `w-1/2 prose dark:prose-li:marker:text-gray-300 dark:prose-invert p-4 my-4 rounded-md bg-white dark:bg-slate-700`;

export default EditorPreview;
