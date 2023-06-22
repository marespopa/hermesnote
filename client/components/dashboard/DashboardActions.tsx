import React from "react";
import Button from "../Forms/Button";

type Props = {
  handleOpenFile: () => Promise<void>;
  handleCreateFile: () => void;
};

const DashboardActions = ({ handleOpenFile, handleCreateFile }: Props) => {
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
    </div>
  );
};

export default DashboardActions;
