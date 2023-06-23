import React from "react";
import Button from "../Forms/Button";

type Props = {
  fileNameEdited: string;
  hasUnsavedChanges: boolean;
  handleOpenFile: () => Promise<void>;
  handleCreateFile: () => void;
  handleExportToMD: (a: string) => void;
};

const DashboardActions = ({
  fileNameEdited,
  hasUnsavedChanges,
  handleOpenFile,
  handleCreateFile,
  handleExportToMD,
}: Props) => {
  const fileSelectorLabel = "Open File";

  return (
    <div className="dashboard__actions">
      <Button
        variant="primary"
        label={fileSelectorLabel}
        handleClick={handleOpenFile}
      />
      <Button
        variant="primary"
        label={"New File"}
        handleClick={handleCreateFile}
      />

      {hasUnsavedChanges && (
        <Button
          variant="primary"
          handleClick={() => handleExportToMD(fileNameEdited || "File.md")}
          label={"Save as"}
        />
      )}
    </div>
  );
};

export default DashboardActions;
