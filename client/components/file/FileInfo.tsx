import { FileMetadata } from "@/types/markdown";
import React from "react";
import Input from "../Forms/Input";

type Props = {
  fileNameEdited: string;
  metadata: FileMetadata;
  handleFileNameChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleMetadataChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const FileInfo = ({
  fileNameEdited,
  metadata,
  handleFileNameChange,
  handleMetadataChange,
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
        handleChange={handleMetadataChange}
      />
      <Input
        name={"description"}
        label="Description"
        value={metadata.description}
        handleChange={handleMetadataChange}
      />
      <Input
        name={"tags"}
        label="Tags"
        value={metadata.tags}
        handleChange={handleMetadataChange}
      />
    </div>
  );
};

export default FileInfo;
