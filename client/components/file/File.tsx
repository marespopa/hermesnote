import React from "react";
import { TabListItem } from "../dashboard/constants";
import FileEditor from "./FileEditor";
import FileInfo from "./FileInfo";
import { FileMetadata } from "@/types/markdown";

type Props = {
  selectedTab: TabListItem;
  fileNameEdited: string;
  metadata: FileMetadata;
  contentEdited: string;
  setContentEdited: React.Dispatch<React.SetStateAction<string>>;
  pdfAreaName: string;
  handleFileNameChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleMetadataChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const File = ({
  selectedTab,
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
          contentEdited={contentEdited}
          setContentEdited={setContentEdited}
          pdfAreaName={pdfAreaName}
        />
      )}
    </>
  );
};

export default File;
