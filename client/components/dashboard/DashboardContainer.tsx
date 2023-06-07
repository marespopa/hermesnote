import React, { useEffect, useState } from "react";
import Button from "../Forms/Button";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import TextareaResizable from "../Forms/TextareaResizable";
import Input from "../Forms/Input";
import { FileMetadata } from "@/types/markdown";
import MarkdownExport from "@/utils/markdown-export";
import matter from "gray-matter";
import { useRouter } from "next/router";
import FileInfo from "../file/FileInfo";
import FileEditor from "../file/FileEditor";
import jsPDF from "jspdf";

const TAB_LIST = [
  { id: "info", label: "Info" },
  { id: "editor", label: "Editor" },
];

type TabListItem = "info" | "error";

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

const DashboardContainer = () => {
  const [content, setContent] = useState("");
  const router = useRouter();
  const [contentEdited, setContentEdited] = useState<string>(content || "");
  const [fileNameEdited, setFileNameEdited] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isSelectedFileParsed, setIsSelectedFileParsed] = useState(false);
  const [metadata, setMetadata] = useState<FileMetadata>({
    title: "",
    description: "",
    tags: "",
  });
  const pdfAreaId = "pdfReport";

  const [selectedTab, setSelectedTab] = useState("editor");

  const fileSelectorLabel = isSelectedFileParsed
    ? "Open another file"
    : "Open file";

  const unsavedChanges = contentEdited !== content;

  // prompt the user if they try and leave with unsaved changes
  useEffect(() => {
    const warningText =
      "You have unsaved changes - are you sure you wish to leave this page?";

    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!unsavedChanges) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };

    const handleBrowseAway = () => {
      if (!unsavedChanges) return;
      if (window.confirm(warningText)) return;
      router.events.emit("routeChangeError");

      throw "routeChange aborted.";
    };

    window.addEventListener("beforeunload", handleWindowClose);
    router.events.on("routeChangeStart", handleBrowseAway);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleBrowseAway);
    };
  }, [unsavedChanges]);

  return (
    <div className="dashboard-container">
      <Button
        variant="primary"
        label={fileSelectorLabel}
        handleClick={openFile}
      />
      {isSelectedFileParsed && (
        <div>
          <nav className="tabs">
            <ul>
              {TAB_LIST.map((tab) => {
                return (
                  <li
                    className={`tab ${
                      tab.id === selectedTab ? "tab--is-active" : ""
                    }`}
                  >
                    <button onClick={() => setSelectedTab(tab.id)}>
                      {tab.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          {selectedTab === "info" && (
            <FileInfo
              fileNameEdited={fileNameEdited}
              handleFileNameChange={handleFileNameChange}
              metadata={metadata}
              handleInputChange={handleInputChange}
            />
          )}

          {selectedTab === "editor" && (
            <FileEditor
              contentEdited={contentEdited}
              setContentEdited={setContentEdited}
              pdfAreaId={pdfAreaId}
            />
          )}
          {selectedTab === "editor" && (
            <div className="dashboard-container__file-controls">
              <Button
                variant="primary"
                handleClick={() =>
                  handleExportToMD(fileNameEdited || "File.md")
                }
                label={"Export to .md"}
              />

              <Button
                variant="primary"
                handleClick={() => handleExportToPDF(`#${pdfAreaId}`)}
                label={"Export to .pdf"}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );

  function handleFileNameChange(e: React.FormEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;

    setFileNameEdited(newValue);
  }

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;
    const property = e.currentTarget.name;

    setMetadata({ ...metadata, [property]: newValue });
  }

  async function openFile() {
    const [fileHandle] = await window.showOpenFilePicker(PICKER_OPTIONS);
    const file = await fileHandle.getFile();

    setFileNameEdited(file.name || "");
    setIsSelectedFileParsed(false);
    parseFile(file);
  }

  function handleExportToMD(fileName: string) {
    MarkdownExport.exportMarkdown(contentEdited, metadata, fileName);
  }

  function handleExportToPDF(elementId: string) {
    const report = new jsPDF("portrait", "pt", "a4");

    const reportElement = document.querySelector(elementId) as HTMLElement;
    const reportName = fileNameEdited.replace(".md", ".pdf");

    if (!reportElement) {
      return;
    }

    console.dir(report.getFontList());
    report.setProperties({
      title: metadata.title,
      keywords: metadata.tags,
    });
    report.setFont("Times");
    report
      .html(reportElement, {
        margin: [2, 0, 2, 10],
        width: reportElement.offsetWidth * 0.9,
        windowWidth: reportElement.offsetWidth * 0.95,
        autoPaging: "text",
      })
      .then(() => {
        report.save(reportName);
      });
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
};

export default DashboardContainer;
