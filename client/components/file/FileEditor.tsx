import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import TextareaResizable from "../Forms/TextareaResizable";
import Button from "../Forms/Button";
import FilePreviewPane from "./FilePreviewPane";

type Props = {
  contentEdited: string;
  setContentEdited: React.Dispatch<React.SetStateAction<string>>;
  pdfAreaName: string;
};

const FileEditor = ({
  contentEdited,
  setContentEdited,
  pdfAreaName,
}: Props) => {
  return (
    <>
      <article className="file">
        {renderEditor()}
        {renderPreviewPane()}
      </article>
    </>
  );

  function renderEditor() {
    return (
      <div className="file__editor">
        <TextareaResizable
          name={"fileContent"}
          label={"Content"}
          value={contentEdited}
          handleChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
            setContentEdited(e.currentTarget.value)
          }
        ></TextareaResizable>
      </div>
    );
  }

  function renderPreviewPane() {
    return (
      <FilePreviewPane
        contentEdited={contentEdited}
        pdfAreaName={pdfAreaName}
      />
    );
  }
};

export default FileEditor;
