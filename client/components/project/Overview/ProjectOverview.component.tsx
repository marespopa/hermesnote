import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { type BacklogFileDescription } from "@/types/markdown";
import React, { Suspense, useState } from "react";
import ProjectFile from "./ProjectFile";
import styles from "./ProjectOverview.module.scss";

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
    <Suspense fallback={<Loading />}>
      <section className={styles.container}>
        <Input
          name={"searchTerm"}
          label="Search"
          placeholder="start typing..."
          value={searchTerm}
          handleChange={handleSearchTermChange}
        />
        <div className={styles.files}>
          {filteredFiles.map((file) => (
            <ProjectFile key={file.slug} file={file} />
          ))}
        </div>
      </section>
    </Suspense>
  );

  function handleSearchTermChange(e: React.FormEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;

    setSearchTerm(newValue);
  }
};

export default ProjectOverview;
