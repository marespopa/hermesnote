import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BacklogFile } from "../types/markdown";

const FILE_FOLDER = "docs";

const getPath = (folder: string) => {
  return path.join(process.cwd(), `/${folder}`); // Get full path
};

const getFileContent = (filename: string) => {
  const POSTS_PATH = getPath(FILE_FOLDER);
  return fs.readFileSync(path.join(POSTS_PATH, filename), "utf8");
};

const getAllFilesDescriptions = () => {
  const POSTS_PATH = getPath(FILE_FOLDER);

  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      // map over each file
      const source = getFileContent(fileName); // retrieve the file contents
      const slug = fileName.replace(".md", ""); // get the slug from the filename
      const { data } = matter(source); // extract frontmatter
      return {
        frontMatter: data,
        slug: slug,
      };
    });
};

const getFileDescription = (slug: string, folder: string) => {
  const source = getFileContent(`${slug}.md`);
  const { data: frontMatter, content } = matter(source);
  const file: BacklogFile = {
    frontMatter,
    content,
  };

  return file;
};

const MarkdownParser = {
  getAllFilesDescriptions,
  getFileDescription,
};

export default MarkdownParser;
