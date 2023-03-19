import Link from "next/link";
import { type BacklogFileDescription } from "@/types/markdown";
import styles from "./ProjectFile.module.scss";

type Props = {
  file: BacklogFileDescription;
};

const ProjectFile = ({ file }: Props) => {
  return (
    <article className={styles.article} key={file.slug}>
      <p className={styles.tags}>[ {file.frontMatter.tags.join(", ")} ]</p>
      <Link href={`project/files/${file.slug}`}>{file.frontMatter.title}</Link>
      <p>{file.frontMatter.description}</p>
    </article>
  );
};

export default ProjectFile;
