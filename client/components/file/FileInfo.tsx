import { FileMetadata } from "@/types/markdown";
import React from "react";
import Input from "../Forms/Input";
import Textarea from "../Forms/Textarea";

type Props = {
  fileNameEdited: string;
  metadata: FileMetadata;
  handleFileNameChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleMetadataChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const FileInfo = ({
  fileNameEdited,
  metadata,
  handleFileNameChange,
  handleMetadataChange,
}: Props) => {
  return (
    <form>
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
      <Textarea
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
        helperText="Tags should be delimited by comma, for eg. tag1, tag2"
      />
    </form>
  );
};

export default FileInfo;
