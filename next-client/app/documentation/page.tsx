import React from "react";
import { containerStyle } from "../constants/styles";

export default function Prices() {
  const code = {
    headers: `# Heading 1
                  ## Heading 2
                  ### Heading 3 `,
    emphasis: `**Bold Text**
                  *Italic Text*
                  ~~Strikethrough Text~~`,
    lists: {
      unordered: `- Item 1
                      - Item 2
                      - Item 3`,
      ordered: `1. Item 1
                  2. Item 2
                  3. Item 3`,
    },
    links: `[Visit Hermes Markdown](https://hermesmd.netlify.app/)`,
    images: `![Alt Text](Image URL)`,
    codeBlocks: `~~~
                  console.log("Hello, world!")
                  ~~~`,
    tables: `| Header 1 | Header 2 |
                | -------- | -------- |
                | Cell 1   | Cell 2   |
                | Cell 3   | Cell 4   |`,
  } as const;

  return (
    <main className="py-4 bg-white dark:bg-slate-800">
      <div className={`${containerStyle}`}>
        <div className="prose dark:prose-invert">
          <section>
            <h1>Documentation</h1>
            <p>
              Welcome to the <strong>Hermes Markdown</strong> Markdown Syntax
              Guide. This documentation will provide you with a comprehensive
              overview of the Markdown syntax supported by Hermes Markdown.
            </p>
            <p>
              Markdown is a lightweight markup language that allows you to
              format text and add elements such as headers, lists, links, and
              more.
            </p>
            <h3>Table of Contents</h3>
            <ol>
              <li>
                <a href="#headers">Headers</a>
              </li>
              <li>
                <a href="#emphasis">Emphasis and Styling</a>
              </li>
              <li>
                <a href="#lists">Lists</a>
              </li>
              <li>
                <a href="#links">Links</a>
              </li>
              <li>
                <a href="#images">Images</a>
              </li>
              <li>
                <a href="#code-blocks">Lists</a>
              </li>
              <li>
                <a href="#tables">Tables</a>
              </li>
            </ol>
          </section>

          <section id="headers">
            <h3>1. Headers</h3>
            <p>
              Headers in Markdown are used to denote different levels of section
              headings. To create headers, use the hash symbol (<em>#</em>)
              followed by a space. The number of hash symbols determines the
              header level:
            </p>
            <code>{code.headers}</code>
          </section>

          <section id="emphasis">
            <h3>2. Emphasis and Styling</h3>
            <p>
              You can add emphasis and styling to your text using a variety of
              Markdown syntax:
            </p>
            <ul>
              <li>
                <strong>Bold:</strong> Enclose the text in double asterisks (**)
                or double underscores (__).
              </li>
              <li>
                <strong>Italic:</strong> Enclose the text in single asterisks
                (*) or single underscores (_).
              </li>
              <li>
                <strong>Strikethrough:</strong> Enclose the text in double
                tildes (~~).
              </li>
            </ul>
            <code>{code.emphasis}</code>
          </section>

          <section id="lists">
            <h3>3. Lists</h3>
            <p>Markdown supports both ordered and unordered lists.</p>
            <p>
              To create an unordered list, use hyphens (-), plus signs (+), or
              asterisks (*) followed by a space:
            </p>
            <code>{code.lists.unordered}</code>
            <p className="mt-md">
              To create an ordered list, use numbers followed by periods (.) and
              a space:
            </p>
            <code>{code.lists.ordered}</code>
          </section>

          <section id="links">
            <h3>4. Links</h3>
            <p>
              You can add hyperlinks to your Markdown files using the following
              syntax:
            </p>
            <code>{code.links}</code>
          </section>

          <section id="images">
            <h3>5. Images</h3>
            <p>
              To insert images into your Markdown files, use the following
              syntax:
            </p>
            <code>{code.images}</code>
          </section>

          <section id="code-blocks">
            <h3>6. Code Blocks</h3>
            <p>
              To display code blocks or inline code, use backticks ( `) to
              enclose the code:
            </p>
            <p>For code blocks, you can use triple tilde character (~):</p>
            <code>{code.codeBlocks}</code>
          </section>

          <section id="tables">
            <h3>7. Tables</h3>
            <p>
              To create tables, use hyphens (-) to separate the header row and
              pipes (|) to separate the columns:
            </p>
            <code>{code.tables}</code>
          </section>

          <section>
            <p>
              This concludes the Hermes{" "}
              <strong>Notes Markdown Syntax Guide.</strong> With these Markdown
              syntax elements at your disposal, you can create well-structured
              and visually appealing content in Hermes Markdown.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
