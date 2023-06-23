import React, { useState } from "react";
import TextareaResizable from "../Forms/TextareaResizable";
import FilePreviewPane from "./FilePreviewPane";

type Props = {
  contentEdited: string;
  isExporting: boolean;
  setContentEdited: React.Dispatch<React.SetStateAction<string>>;
  pdfAreaName: string;
};

const FileEditor = ({
  contentEdited,
  isExporting,
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
          label={"Raw file"}
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
        isExporting={isExporting}
        contentEdited={contentEdited}
        pdfAreaName={pdfAreaName}
      />
    );
  }
};

export default FileEditor;
