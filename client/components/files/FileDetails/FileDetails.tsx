import Button from "@/components/Forms/Button";
import Input from "@/components/Forms/Input";
import TextareaResizable from "@/components/Forms/TextareaResizable";
import { FileMetadata } from "@/types/markdown";
import MarkdownExport from "@/utils/markdown-export";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styles from "./FileDetails.module.scss";

type Props = {
  content: string;
  frontMatter: { [key: string]: any };
  fileName: string;
};

const FileDetails = ({ content, frontMatter, fileName }: Props) => {
  const [value, setValue] = useState<string | undefined>(content);
  const [finishStatus, setFinishStatus] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [metadata, setMetadata] = useState<FileMetadata>({
    title: frontMatter?.title || fileName,
    description: frontMatter?.description || "",
    tags: frontMatter?.tags?.join(",") || [],
  });
  const baseDataTestId = "FileDetails";
  const handleExport = () =>
    MarkdownExport.exportMarkdown(value, metadata, fileName);
  const router = useRouter();

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackAction);

    return () => {
      window.removeEventListener("popstate", handleBackAction);
    };
  }, []);

  function handleBackAction(e: any) {
    e.preventDefault();
    if (!finishStatus) {
      if (
        window.confirm(
          "If the file was not exported and overwritten, you will lose all your changes to the file.\n\n" +
            "Are you sure you want to continue?"
        )
      ) {
        setFinishStatus(true);
        // your logic
        goToOverview();
      } else {
        window.history.pushState(null, "", window.location.pathname);
        setFinishStatus(false);
      }
    }
  }

  function goToOverview() {
    router.push(`/files`);
  }

  //TODO - save frontmatter info
  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;
    const property = e.currentTarget.name;

    setMetadata({ ...metadata, [property]: newValue });
  }

  return (
    <div className={styles.container} data-testid={baseDataTestId}>
      <h1>{`${fileName}.md`}</h1>
      <Input
        name={"title"}
        label="Title"
        value={metadata.title}
        handleChange={handleInputChange}
      />
      <Input
        name={"description"}
        label="Description"
        value={metadata.description}
        handleChange={handleInputChange}
      />
      <Input
        name={"tags"}
        label="Tags"
        value={metadata.tags}
        handleChange={handleInputChange}
      />
      <label>Content</label>
      <article onDoubleClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode && (
          <div>
            <TextareaResizable
              name={"filecontent"}
              label={"File"}
              value={value}
              handleChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
                setValue(e.currentTarget.value)
              }
            ></TextareaResizable>
          </div>
        )}

        {!isEditMode && (
          <div className={styles.preview}>
            {value && <ReactMarkdown>{value}</ReactMarkdown>}
          </div>
        )}
      </article>

      <div>
        <Button
          variant="primary"
          handleClick={handleBackAction}
          label={"Back"}
        />
        <Button
          variant="primary"
          handleClick={handleExport}
          label={"Export to .md"}
        />
      </div>
    </div>
  );
};

export default FileDetails;
