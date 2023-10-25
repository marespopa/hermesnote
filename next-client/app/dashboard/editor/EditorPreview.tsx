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
          h1(props) {
            const { children } = props;
            const anchor = getAnchor(children);

            return <h1 id={anchor}>{children}</h1>;
          },
          h2(props) {
            const { children } = props;
            const anchor = getAnchor(children);

            return <h2 id={anchor}>{children}</h2>;
          },
          h3(props) {
            const { children } = props;
            const anchor = getAnchor(children);

            return <h3 id={anchor}>{children}</h3>;
          },
          h4(props) {
            const { children } = props;
            const anchor = getAnchor(children);

            return <h4 id={anchor}>{children}</h4>;
          },
          h5(props) {
            const { children } = props;
            const anchor = getAnchor(children);

            return <h2 id={anchor}>{children}</h2>;
          },
          h6(props) {
            const { children } = props;
            const anchor = getAnchor(children);

            return <h2 id={anchor}>{children}</h2>;
          },
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

  function getAnchor(children: React.ReactNode & React.ReactNode[]) {
    if (!children || !Array.isArray(children)) {
      return "";
    }

    const text = typeof children[0] === "string" ? children[0] : "heading";

    return `${text.replace(/ /g, "-").toLowerCase()}`;
  }
};

const previewStyles = `w-full max-w-none prose dark:prose-li:marker:text-gray-300 dark:prose-invert p-4 my-4 rounded-md bg-white dark:bg-slate-700 prose-pre:bg-gray-100 prose-pre:dark:bg-slate-600 prose-pre:dark:text-white prose-pre:text-gray-700`;

export default EditorPreview;
