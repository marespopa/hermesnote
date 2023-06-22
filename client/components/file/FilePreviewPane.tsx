import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  contentEdited: string;
  pdfAreaName: string;
  isExporting: boolean;
};

const FilePreviewPane = ({
  contentEdited,
  pdfAreaName,
  isExporting,
}: Props) => {
  return (
    <>
      {isExporting && "Exporting..."}
      <article className={`file${isExporting ? " file--on-export" : ""}`}>
        <div className="file__export">
          <div className="file__pdf-export" id={pdfAreaName}>
            <div className="file__pdf-export-window">
              <ReactMarkdown
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              >
                {contentEdited}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default FilePreviewPane;
