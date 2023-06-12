import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  contentEdited: string;
  pdfAreaName: string;
};

const FileExport = ({ contentEdited, pdfAreaName }: Props) => {
  return (
    <article className="file">
      <div className="file__export">
        <div className="file__pdf-export" id={pdfAreaName}>
          <div className="file__pdf-export-window">
            <ReactMarkdown>{contentEdited}</ReactMarkdown>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FileExport;
