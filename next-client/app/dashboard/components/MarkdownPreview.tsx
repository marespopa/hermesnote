import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  content: string;
};

const MarkdownPreview = ({ content }: Props) => {
  return (
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

          return <h5 id={anchor}>{children}</h5>;
        },
        h6(props) {
          const { children } = props;
          const anchor = getAnchor(children);

          return <h6 id={anchor}>{children}</h6>;
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
  );

  function getAnchor(children: React.ReactNode & React.ReactNode[]) {
    if (!children || !Array.isArray(children)) {
      return "";
    }

    const text = typeof children[0] === "string" ? children[0] : "heading";

    return `${text.replace(/ /g, "-").toLowerCase()}`;
  }
};

export default MarkdownPreview;
