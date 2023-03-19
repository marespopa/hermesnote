import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BacklogFile } from "../types/markdown";

const FILE_FOLDER = "docs";

export const getPath = (folder: string) => {
  console.log("getPath");
  return path.join(process.cwd(), `/${folder}`); // Get full path
};

export const getFileContent = (filename: string) => {
  const POSTS_PATH = getPath(FILE_FOLDER);
  return fs.readFileSync(path.join(POSTS_PATH, filename), "utf8");
};

export const getAllFiles = () => {
  const POSTS_PATH = getPath(FILE_FOLDER);
  console.log("Get from folder:" + POSTS_PATH);
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

export const getSinglePost = (slug: string, folder: string) => {
  const source = getFileContent(`${slug}.md`);
  const { data: frontMatter, content } = matter(source);
  const file: BacklogFile = {
    frontMatter,
    content,
  };

  return file;
};
