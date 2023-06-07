import React, { useState } from "react";
import { FileMetadata } from "@/types/markdown";
import MarkdownExport from "@/utils/markdown-export";
import matter from "gray-matter";
import { useRouter } from "next/router";
import {
  TabListItem,
  PICKER_OPTIONS,
  DEFAULT_CONTENT,
  UNSAVED_CHANGES_WARNING_TEXT,
} from "./constants";
import DashboardOverview from "./DashboardOverview";
import sanitize from "sanitize-html";
import { useLeavePageConfirmation } from "hooks/use-leave-page-confirmation";

const DashboardContainer = () => {
  const [content, setContent] = useState("");
  const [contentEdited, setContentEdited] = useState<string>(content || "");
  const [fileNameEdited, setFileNameEdited] = useState<string>("");
  const [isSelectedFileParsed, setIsSelectedFileParsed] = useState(false);
  const [metadata, setMetadata] = useState<FileMetadata>({
    title: "",
    description: "",
    tags: "",
  });
  const [selectedTab, setSelectedTab] = useState<TabListItem>("editor");
  const warningText = UNSAVED_CHANGES_WARNING_TEXT;
  const pdfSettings = {
    areaName: "pdfReport",
    fileName: fileNameEdited.replace(".md", "") + ".pdf",
  };

  const fileSelectorLabel = isSelectedFileParsed
    ? "Open another file"
    : "Open file";

  useLeavePageConfirmation(contentEdited !== content, warningText);

  const props = {
    fileSelectorLabel,
    handleOpenFile,
    handleCreateFile,
    isSelectedFileParsed,
    selectedTab,
    setSelectedTab,
    fileNameEdited,
    handleFileNameChange,
    metadata,
    handleMetadataChange,
    contentEdited,
    setContentEdited,
    pdfSettings,
    handleExportToMD,
    handleExportToPDF,
  };

  return <DashboardOverview {...props} />;

  function handleMetadataChange(e: React.FormEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;
    const property = e.currentTarget.name;

    setMetadata({ ...metadata, [property]: newValue });
  }

  /** File Handling  **/
  function handleFileNameChange(e: React.FormEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;

    setFileNameEdited(newValue);
  }

  async function handleOpenFile() {
    const [fileHandle] = await window.showOpenFilePicker(PICKER_OPTIONS);
    const file = await fileHandle.getFile();

    setFileNameEdited(file.name || "");
    setIsSelectedFileParsed(false);
    parseFile(file);
  }

  function handleCreateFile() {
    setFileNameEdited("File");
    setMetadata({
      title: "File",
      tags: "",
      description: "",
    });
    setContent(DEFAULT_CONTENT);
    setContentEdited(DEFAULT_CONTENT);
    setIsSelectedFileParsed(true);
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
        const sanitizedContent = sanitize(content);

        setMetadata({
          title: frontMatter?.title || "",
          description: frontMatter?.description || "",
          tags: frontMatter?.tags.join(","),
        });
        setContent(sanitizedContent);
        setContentEdited(sanitizedContent);
        setIsSelectedFileParsed(true);
      }
    };

    reader.readAsText(file);
  }

  function handleExportToMD(fileName: string) {
    setContent(contentEdited);
    MarkdownExport.exportMarkdown(contentEdited, metadata, fileName);
  }

  function handleExportToPDF() {
    const htmlElementId = `#${pdfSettings.areaName}`;

    setContent(contentEdited);
    MarkdownExport.exportToPDF(htmlElementId, pdfSettings.fileName, metadata);
  }
};

export default DashboardContainer;
