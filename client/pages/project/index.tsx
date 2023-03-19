import Link from "next/link";
import Layout from "../../components/layout";
import FileEntry from "../../components/project/FileEntry";
import { getAllFiles } from "../../markdown-parser/md";
import { BacklogFile } from "../../types/markdown";

interface Props {
  files: BacklogFile[];
}

export default function Files({ files }: Props) {
  if (!files || files.length === 0) {
    return "No files found.";
  }

  console.dir(files);
  const fileContainer = files.map((file) => <FileEntry file={file} />);

  return (
    <Layout>
      <div>{fileContainer}</div>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = getAllFiles();

  return {
    props: { files },
  };
}
