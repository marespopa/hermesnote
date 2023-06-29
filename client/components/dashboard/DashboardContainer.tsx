import React, { useState } from "react";
import { FileMetadata } from "@/types/markdown";
import MarkdownExport from "@/utils/markdown-export";
import matter from "gray-matter";
import {
  TabListItem,
  PICKER_OPTIONS,
  DEFAULT_CONTENT,
  UNSAVED_CHANGES_WARNING_TEXT,
} from "./constants";
import DashboardOverview from "./DashboardOverview";
import { useLeavePageConfirmation } from "hooks/use-leave-page-confirmation";

const DashboardContainer = () => {
  const [content, setContent] = useState("");
  const [contentEdited, setContentEdited] = useState<string>(content || "");
  const [fileNameEdited, setFileNameEdited] = useState<string>("");
  const [isSelectedFileParsed, setIsSelectedFileParsed] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [metadata, setMetadata] = useState<FileMetadata>({
    title: "",
    description: "",
    tags: "",
  });
  const warningText = UNSAVED_CHANGES_WARNING_TEXT;
  const pdfSettings = {
    areaName: "pdfReport",
    fileName: fileNameEdited.replace(".md", "") + ".pdf",
  };

  const hasUnsavedChanges = contentEdited !== content;

  useLeavePageConfirmation(hasUnsavedChanges, warningText);

  const props = {
    handleOpenFile,
    handleCreateFile,
    isSelectedFileParsed,
    isExporting,
    hasUnsavedChanges,
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

  function handleMetadataChange(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
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

  async function handleCreateFile() {
    if (!hasUnsavedChanges) {
      createFile();

      return;
    }

    let confirmed = window.confirm(
      "You have unsaved changes. Do you want to create a new file?"
    );

    if (!confirmed) {
      return;
    }

    createFile();
  }

  function createFile() {
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

        setMetadata({
          title: frontMatter?.title || "",
          description: frontMatter?.description || "",
          tags: frontMatter?.tags.join(","),
        });
        setContent(content);
        setContentEdited(content);
        setIsSelectedFileParsed(true);
      }
    };

    reader.readAsText(file);
  }

  function handleExportToMD(fileName: string) {
    setContent(contentEdited);
    MarkdownExport.exportMarkdown(contentEdited, metadata, fileName);
  }

  async function handleExportToPDF() {
    const htmlElementId = `#${pdfSettings.areaName}`;

    setContent(contentEdited);
    setIsExporting(true);
    await MarkdownExport.exportToPDF(
      htmlElementId,
      pdfSettings.fileName,
      metadata
    );
    setIsExporting(false);
  }
};

export default DashboardContainer;
