import ProjectFilePreview from "./Preview";
import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/router";

type Props = {
  frontMatter: { [key: string]: any };
  content: string;
  fileName: string;
};

const ProjectFileDetails = ({ frontMatter, content, fileName }: Props) => {
  const router = useRouter();

  function goToOverview() {
    router.push(`/api/auth/signin`);
  }

  function goToEdit(fileName: string) {
    router.push(`/project/files/edit/${fileName}`);
  }

  return (
    <article>
      <h1>{frontMatter?.title}</h1>
      <div>
        <span>{frontMatter?.description}</span>
        <ProjectFilePreview content={content} frontMatter={frontMatter} />
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
  );
};

export default ProjectFileDetails;
