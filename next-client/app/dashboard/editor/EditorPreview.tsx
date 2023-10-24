import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  content: string;
};

const EditorPreview = ({ content }: Props) => {
  return (
    <div className={previewStyles} id={"pdfExport"}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                style={nord}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};

const previewStyles = `w-full max-w-none prose dark:prose-li:marker:text-gray-300 dark:prose-invert p-4 my-4 rounded-md bg-white dark:bg-slate-700 prose-pre:bg-gray-100 prose-pre:dark:bg-slate-600 prose-pre:dark:text-white prose-pre:text-gray-700`;

export default EditorPreview;
