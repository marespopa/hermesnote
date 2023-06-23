import React from "react";
import { TabListItem } from "../dashboard/constants";
import FileEditor from "./FileEditor";
import FileInfo from "./FileInfo";
import { FileMetadata } from "@/types/markdown";
import FilePreviewPane from "./FilePreviewPane";

type Props = {
  selectedTab: TabListItem;
  isExporting: boolean;
  fileNameEdited: string;
  metadata: FileMetadata;
  contentEdited: string;
  setContentEdited: React.Dispatch<React.SetStateAction<string>>;
  pdfAreaName: string;
  handleFileNameChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleMetadataChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const File = ({
  selectedTab,
  isExporting,
  fileNameEdited,
  contentEdited,
  setContentEdited,
  metadata,
  pdfAreaName,
  handleFileNameChange,
  handleMetadataChange,
}: Props) => {
  return (
    <>
      {selectedTab === "info" && (
        <FileInfo
          fileNameEdited={fileNameEdited}
          handleFileNameChange={handleFileNameChange}
          metadata={metadata}
          handleMetadataChange={handleMetadataChange}
        />
      )}

      {selectedTab === "editor" && (
        <FileEditor
          isExporting={isExporting}
          contentEdited={contentEdited}
          setContentEdited={setContentEdited}
          pdfAreaName={pdfAreaName}
        />
      )}

      {selectedTab === "export" && (
        <FilePreviewPane
          isExporting={isExporting}
          contentEdited={contentEdited}
          pdfAreaName={pdfAreaName}
        />
      )}
    </>
  );
};

export default File;
