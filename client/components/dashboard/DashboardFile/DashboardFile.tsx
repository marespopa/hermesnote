import Button from "@/components/Forms/Button";
import React, { useState } from "react";
import { TAB_LIST, TabListItem } from "../constants";
import Textarea from "@/components/Forms/Textarea";
import Input from "@/components/Forms/Input";
import { FileMetadata } from "@/types/markdown";
import TextareaResizable from "@/components/Forms/TextareaResizable";
import FilePreviewPane from "@/components/file/FilePreviewPane";
import { useRouter } from "next/router";

type Props = {
  pdfAreaName: string;
  isExporting: boolean;
  contentEdited: string;
  setContentEdited: React.Dispatch<React.SetStateAction<string>>;
  fileNameEdited: string;
  metadata: FileMetadata;
  handleOpenFile: () => void;
  handleCreateFile: () => void;
  handleMetadataChange: () => void;
  handleFileNameChange: () => void;
  handleExportToPDF: () => void;
  handleSaveAs: () => void;
  hasUnsavedChanges: boolean;
};

const DashboardFile = ({
  pdfAreaName,
  isExporting,
  contentEdited,
  setContentEdited,
  fileNameEdited,
  metadata,
  handleOpenFile,
  handleCreateFile,
  handleMetadataChange,
  handleFileNameChange,
  handleExportToPDF,
  handleSaveAs,
  hasUnsavedChanges,
}: Props) => {
  const [selectedTab, setSelectedTab] = useState<TabListItem>("frontmatter");
  const router = useRouter();

  return (
    <div className="dashboard">
      <header className="dashboard__header-wrapper">
        <div className="dashboard__header">
          <h1>Edit File</h1>
          <div className="dashboard__actions">
            <Button
              variant="default"
              label="Open File"
              handleClick={() => handleOpenFile()}
            />
            <Button
              variant="default"
              label="New File"
              handleClick={() => handleCreateFile()}
            />

            <Button
              variant="primary"
              label="Save As"
              handleClick={handleSaveAs}
            />
          </div>
        </div>
        {hasUnsavedChanges && (
          <div className="dashboard__info-messages">
            <span className="small">You have unsaved changes.</span>
          </div>
        )}
      </header>
      {renderTabs()}
      {selectedTab === "frontmatter" && renderFrontMatterEditor()}
      {selectedTab === "content" && renderContentEditor()}
    </div>
  );

  function renderTabs() {
    return (
      <nav className="dashboard__tabs">
        <ul>
          {TAB_LIST.map((tab) => {
            return (
              <li
                key={tab.id}
                className={`dashboard__tab ${
                  tab.id === selectedTab ? "dashboard__tab--is-active" : ""
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
    );
  }

  function renderFrontMatterEditor() {
    return (
      <div className="dashboard__file">
        <div className="dashboard__info-panel">
          <h2>What is FrontMatter?</h2>
          <p className="mt-md">
            Frontmatter is metadata that provides essential information about
            your Markdown file. It sits at the beginning of your document and is
            enclosed within triple dashes.
            <code className="mt-sm">{`---
            frontmatter goes here
            ---`}</code>
          </p>
          <dl className="dashboard__definitions">
            <dt>Filename</dt>
            <dd>
              Enter a unique name for your Markdown file. This name helps you
              identify and organize your files within Hermes Notes.
            </dd>

            <dt>Title</dt>
            <dd>
              Enter a unique name for your Markdown file. This name helps you
              identify and organize your files within Hermes Notes.
            </dd>

            <dt>Description</dt>
            <dd>
              Write a concise summary or description of your Markdown file. This
              field allows you to provide a brief overview or introduction to
              your document.
            </dd>

            <dt>Tags</dt>
            <dd>
              Add relevant tags or keywords to categorize your Markdown file.
              Tags help with organizing and searching for specific content
              within your collection of files.
            </dd>
          </dl>
        </div>
        <div>
          <h2>FrontMatter Info</h2>
          <form className="mt-lg">
            <Input
              name={"filename"}
              label="File Name"
              value={fileNameEdited}
              handleChange={handleFileNameChange}
            />
            <Input
              name={"title"}
              label="Title"
              value={metadata.title}
              handleChange={handleMetadataChange}
            />
            <Textarea
              name={"description"}
              label="Description"
              value={metadata.description}
              handleChange={handleMetadataChange}
            />
            <Input
              name={"tags"}
              label="Tags"
              value={metadata.tags}
              handleChange={handleMetadataChange}
              helperText="Tags should be delimited by comma, for eg. tag1, tag2"
            />
            <div className="mt-md">
              <Button
                variant="default"
                label="Go to content"
                handleClick={() => setSelectedTab("content")}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }

  function renderContentEditor() {
    return (
      <div className="dashboard__file">
        <div className="file__editor">
          <TextareaResizable
            name={"fileContent"}
            label={"Raw file"}
            value={contentEdited}
            handleChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
              setContentEdited(e.currentTarget.value)
            }
          ></TextareaResizable>
        </div>
        <FilePreviewPane
          isExporting={isExporting}
          contentEdited={contentEdited}
          pdfAreaName={pdfAreaName}
        />
      </div>
    );
  }
};

export default DashboardFile;
