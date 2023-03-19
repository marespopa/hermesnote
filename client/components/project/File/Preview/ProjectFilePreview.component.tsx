import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  frontMatter: { [key: string]: any };
  content: string;
};

function ProjectFilePreview({ frontMatter, content }: Props) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}

export default ProjectFilePreview;
