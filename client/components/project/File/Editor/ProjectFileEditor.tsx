import Button from "@/components/Button";
import MarkdownExport from "@/utils/markdown-export";
import React, { useState } from "react";
import styles from "./ProjectFileEditor.module.scss";

type Props = {
  content: string;
  frontMatter: { [key: string]: any };
  fileName: string;
};

const ProjectFileEditor = ({ content, frontMatter, fileName }: Props) => {
  const [value, setValue] = useState<string | undefined>(content);
  const baseDataTestId = "ProjectFileEditor";
  const handleExport = () => MarkdownExport.exportMarkdown(value, fileName);

  return (
    <div className={styles.container} data-testid={baseDataTestId}>
      <h1>{frontMatter?.title}</h1>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        variant="primary"
        handleClick={handleExport}
        label={"Export to .md"}
      />
    </div>
  );
};

export default ProjectFileEditor;
