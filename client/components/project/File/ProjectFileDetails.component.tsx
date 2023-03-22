import ProjectFilePreview from "./Preview";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import styles from "./ProjectFileDetails.module.scss";

type Props = {
  frontMatter: { [key: string]: any };
  content: string;
  fileName: string;
};

const ProjectFileDetails = ({ frontMatter, content, fileName }: Props) => {
  const router = useRouter();

  function goToOverview() {
    router.push(`/project`);
  }

  function goToEdit(fileName: string) {
    router.push(`/project/files/edit/${fileName}`);
  }

  return (
    <Suspense fallback={<Loading />}>
      <article>
        <div onDoubleClick={() => goToEdit(fileName)}>
          <dl>
            <dt>Title</dt>
            <dd>{frontMatter?.title}</dd>
            <dt>Filename</dt>
            <dd>{fileName}.md</dd>
            <dt>Description</dt>
            <dd>
              <span className="small">{frontMatter?.description}</span>
            </dd>
          </dl>
          <div className={`${styles.preview} box`}>
            <ProjectFilePreview content={content} />
          </div>
          <Button
            variant="primary"
            handleClick={() => goToOverview()}
            label="Back"
          />
          <Button
            variant="primary"
            handleClick={() => goToEdit(fileName)}
            label="Edit"
          />
        </div>
      </article>
    </Suspense>
  );
};

export default ProjectFileDetails;
