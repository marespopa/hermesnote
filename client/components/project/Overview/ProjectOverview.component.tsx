import Input from "@/components/Input";
import { type BacklogFileDescription } from "@/types/markdown";
import React, { useState } from "react";
import ProjectFile from "./ProjectFile";

type Props = {
  files: BacklogFileDescription[];
};

const ProjectOverview = ({ files }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredFiles = searchTerm
    ? files.filter((file) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
          String(file.frontMatter.tags)
            .toLowerCase()
            .startsWith(lowerCaseSearchTerm) ||
          String(file.frontMatter.title)
            .toLowerCase()
            .startsWith(lowerCaseSearchTerm)
        );
      })
    : files;

  return (
    <section>
      <Input
        name={"searchTerm"}
        label="Search"
        placeholder="start typing..."
        value={searchTerm}
        handleChange={handleSearchTermChange}
      />
      <div>
        {filteredFiles.map((file) => (
          <ProjectFile key={file.slug} file={file} />
        ))}
      </div>
    </section>
  );

  function handleSearchTermChange(e: React.FormEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;

    setSearchTerm(newValue);
  }
};

export default ProjectOverview;
