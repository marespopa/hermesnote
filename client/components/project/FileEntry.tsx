import Link from "next/link";
import React from "react";
import { type BacklogFile } from "../../types/markdown";
import styles from "./FileEntry.module.css";

type Props = {
  file: BacklogFile;
};

const FileEntry = ({ file }: Props) => {
  return (
    <article className={styles.article} key={file.slug}>
      <p className={styles.tags}>[ {file.frontMatter.tags.join(", ")} ]</p>
      <Link href={`project/files/${file.slug}`}>{file.frontMatter.title}</Link>
      <p>{file.frontMatter.description}</p>
    </article>
  );
};

export default FileEntry;
