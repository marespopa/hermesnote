import { FileMetadata } from "@/types/markdown";
import React from "react";
import useCtrlS from "hooks/use-save";
import Link from "next/link";
import DashboardBlankState from "./DashboardBlankState/DashboardBlankState";
import DashboardFile from "./DashboardFile";

type Props = {
  hasUnsavedChanges: boolean;
  isSelectedFileParsed: boolean;
  isExporting: boolean;
  metadata: FileMetadata;
  contentEdited: string;
  pdfSettings: { areaName: string; fileName: string };
  fileNameEdited: string;
  setContentEdited: React.Dispatch<React.SetStateAction<string>>;
  handleOpenFile: () => Promise<void>;
  handleCreateFile: () => void;
  handleFileNameChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleMetadataChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleExportToMD: (fileName: string) => void;
  handleExportToPDF: () => void;
};

const DashboardOverview = (props: Props) => {
  const {
    hasUnsavedChanges,
    isExporting,
    isSelectedFileParsed,
    fileNameEdited,
    metadata,
    contentEdited,
    setContentEdited,
    pdfSettings,
    handleOpenFile,
    handleCreateFile,
    handleFileNameChange,
    handleMetadataChange,
    handleExportToMD,
    handleExportToPDF,
  } = props;

  useCtrlS(() => {
    handleExportToMD(fileNameEdited);
  });

  return (
    <main className="container dashboard">
      {!isSelectedFileParsed && (
        <DashboardBlankState
          handleCreateFile={handleCreateFile}
          handleOpenFile={handleOpenFile}
        />
      )}

      {isSelectedFileParsed && (
        <DashboardFile
          pdfAreaName={pdfSettings.areaName}
          isExporting={isExporting}
          contentEdited={contentEdited}
          setContentEdited={setContentEdited}
          metadata={metadata}
          fileNameEdited={fileNameEdited}
          handleCreateFile={handleCreateFile}
          handleOpenFile={handleOpenFile}
          handleMetadataChange={() => handleMetadataChange}
          handleFileNameChange={() => handleFileNameChange}
          hasUnsavedChanges={hasUnsavedChanges}
          handleExportToPDF={() => handleExportToPDF()}
          handleSaveAs={() => handleExportToMD(fileNameEdited)}
        />
      )}

      <section className="dashboard__helper-text">
        <p>
          Want to learn more about how to write markdown.{" "}
          <Link href={"/documentation"}>Access the documentation page.</Link>
        </p>
      </section>
    </main>
  );
};

export default DashboardOverview;
