import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  content: string;
};

function ProjectFilePreview({ content }: Props) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}

export default ProjectFilePreview;
