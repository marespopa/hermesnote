import Link from "next/link";
import {
  FrontMatterGeneric,
  type BacklogFileDescription,
} from "@/types/markdown";
import styles from "./ProjectFile.module.scss";
import { Router, useRouter } from "next/router";

type Props = {
  file: BacklogFileDescription;
};

const ProjectFile = ({ file }: Props) => {
  const router = useRouter();
  function getFileTags(frontMatter: FrontMatterGeneric) {
    if (!frontMatter.tags) {
      return "No tags";
    }

    return `[ ${file.frontMatter.tags.join(", ")} ]`;
  }

  function goToFileDetails() {
    router.push(`project/files/${file.slug}`);
  }

  return (
    <article
      onDoubleClick={goToFileDetails}
      className={styles.article}
      key={file.slug}
    >
      <p className={styles.tags}>{getFileTags(file.frontMatter)}</p>
      <Link href={`project/files/${file.slug}`}>
        {file.frontMatter.title || file.slug}
      </Link>
      <p>{file.frontMatter.description}</p>
    </article>
  );
};

export default ProjectFile;
