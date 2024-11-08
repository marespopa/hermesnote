import matter from "gray-matter";
import toast from "react-hot-toast";

export function isSelectedFileValid(file: File) {
  return file && (file?.name.endsWith(".md") || file?.name.endsWith(".txt"));
}

export async function getFileDataFromInput(file: File) {
  try {
    if (!file) {
      toast.error("File could not be loaded");

      return;
    }
    const text = await file.text();

    const { data: frontMatter, content } = matter(text);

    return {
      frontMatter: frontMatter,
      content: content,
      filename: file.name,
    };
  } catch (error) {
    console.error(error);
  }
}
