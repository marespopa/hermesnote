import { FileMetadata } from "@/types/markdown";
import React from "react";
import Input from "../Forms/Input";

type Props = {
  fileNameEdited: string;
  handleFileNameChange: (e: React.FormEvent<HTMLInputElement>) => void;
  metadata: FileMetadata;
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const FileInfo = ({
  fileNameEdited,
  handleFileNameChange,
  metadata,
  handleInputChange,
}: Props) => {
  return (
    <div>
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
        handleChange={handleInputChange}
      />
      <Input
        name={"description"}
        label="Description"
        value={metadata.description}
        handleChange={handleInputChange}
      />
      <Input
        name={"tags"}
        label="Tags"
        value={metadata.tags}
        handleChange={handleInputChange}
      />
    </div>
  );
};

export default FileInfo;
