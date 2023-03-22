import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import ProjectFileEditor from "@/components/project/File/Editor";
import Layout from "@/components/layout";
import MarkdownParser from "@/utils/markdown-parser";

interface Props {
  content: string;
  frontMatter: { [key: string]: any };
}

export default function FilePage({ content, frontMatter }: Props) {
  const router = useRouter();
  const fileName = router.query.fileName as string;

  return (
    <Layout>
      <ProjectFileEditor
        content={content}
        frontMatter={frontMatter}
        fileName={fileName}
      />
    </Layout>
  );
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const fileName = Array.isArray(params?.fileName)
    ? params?.fileName.join()
    : params?.fileName;
  const post = await MarkdownParser.getFileDescription(fileName);

  return {
    props: { ...post },
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
