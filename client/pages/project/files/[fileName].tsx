import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { getSinglePost } from "../../../markdown-parser/md";
import ReactMarkdown from "react-markdown";
import Layout from "../../../components/layout";
import Link from "next/link";

interface Props {
  content: any;
  frontmatter: any;
}

export default function FilePage({ content, frontmatter }: Props) {
  const router = useRouter();
  const fileName = router.query.fileName as string;

  return (
    <Layout>
      <article>
        <h1>{frontmatter?.title}</h1>
        <div>
          <span>{frontmatter?.description}</span>
          <ReactMarkdown>{content}</ReactMarkdown>
          <Link href={"/project"}>Back</Link>
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const fileName = Array.isArray(params?.slug)
    ? params?.slug.join()
    : params?.slug;
  const post = await getSinglePost(fileName || "BACKLOG", "docs");

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
