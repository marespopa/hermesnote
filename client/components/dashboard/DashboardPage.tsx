import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "../Forms/Button";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import matter from "gray-matter";
import styles from "./Dashboard.module.scss";
import TextareaResizable from "../Forms/TextareaResizable";
import Input from "../Forms/Input";
import { FileMetadata } from "@/types/markdown";
import MarkdownExport from "@/utils/markdown-export";

const PICKER_OPTIONS = {
  types: [
    {
      description: "MD Files",
      accept: {
        "text/markdown": [".md", ".txt"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

const DashboardPage = () => {
  const [content, setContent] = useState("");
  const [value, setValue] = useState<string | undefined>(content);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isSelectedFileParsed, setIsSelectedFileParsed] = useState(false);
  const [finishStatus, setFinishStatus] = useState(false);
  const [metadata, setMetadata] = useState<FileMetadata>({
    title: "",
    description: "",
    tags: "",
  });

  const hasFileSelected = !!selectedFile;
  const fileSelectorLabel = isSelectedFileParsed
    ? "Open another file"
    : "Open file";
  const showPreview = !isEditMode && value;

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackAction);

    return () => {
      window.removeEventListener("popstate", handleBackAction);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Button
        variant="primary"
        label={fileSelectorLabel}
        handleClick={openFile}
      />
      {hasFileSelected && <h1>{selectedFile && selectedFile.name}</h1>}

      {isSelectedFileParsed && (
        <div>
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
          <article
            className={styles.preview}
            onDoubleClick={() => setIsEditMode(!isEditMode)}
          >
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

            {showPreview && <ReactMarkdown>{value}</ReactMarkdown>}
          </article>

          <div className={styles.fileControls}>
            <Button
              variant="primary"
              handleClick={() => handleExport(selectedFile?.name || "file")}
              label={"Export to .md"}
            />
          </div>
        </div>
      )}
    </div>
  );

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
        resetSelectedFile();
      } else {
        window.history.pushState(null, "", window.location.pathname);
        setFinishStatus(false);
      }
    }
  }

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;
    const property = e.currentTarget.name;

    setMetadata({ ...metadata, [property]: newValue });
  }

  function resetSelectedFile() {
    setValue("");
    setContent("");
    setSelectedFile(undefined);
    setIsSelectedFileParsed(false);
  }
  async function openFile() {
    const [fileHandle] = await window.showOpenFilePicker(PICKER_OPTIONS);
    const file = await fileHandle.getFile();

    setSelectedFile(file);
    setIsSelectedFileParsed(false);
    parseFile(file);
  }

  function handleExport(fileName: string) {
    MarkdownExport.exportMarkdown(value, metadata, fileName);
  }
  async function parseFile(file: File) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const fileContent = String(reader.result);
        const { data: frontMatter, content } = matter(fileContent);

        setMetadata({
          title: frontMatter?.title || "",
          description: frontMatter?.description || "",
          tags: frontMatter?.tags.join(","),
        });
        setContent(content);
        setValue(content);
        setIsSelectedFileParsed(true);
      }
    };

    reader.readAsText(file);
  }
};

export default DashboardPage;
