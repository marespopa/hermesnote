import OverviewPage from "@/components/files/Overview";
import Layout from "@/components/layout";
import { BacklogFileDescription } from "@/types/markdown";
import MarkdownParser from "@/utils/markdown-parser";

interface Props {
  files: BacklogFileDescription[];
}

export default function Files({ files }: Props) {
  return (
    <Layout>
      <OverviewPage files={files} />
    </Layout>
  );
}

export async function getStaticProps() {
  const files = MarkdownParser.getAllFilesDescriptions();

  return {
    props: { files },
  };
}
