import { FileMetadata, FrontMatterGeneric } from "./../types/markdown";
import { saveFile } from "./save-utils";

const MarkdownExport = {
  exportMarkdown,
};

function formatTags(metadataTags: string) {
  const tags = metadataTags.split(",");
  let formattedTags = ``;

  tags.forEach((tag) => {
    formattedTags += `  - ${tag.toString().trim()}\n`;
  });

  return formattedTags;
}

function formatFrontMatter(metadata: FileMetadata) {
  let text = ``;

  text =
    "---\n" +
    `title: ${metadata.title}\n` +
    `description: ${metadata.description}\n` +
    `tags:\n` +
    `${formatTags(metadata.tags)}` +
    `---\n\n`;

  return text;
}

function exportMarkdown(
  content: string | undefined,
  frontMatter: FileMetadata,
  fileName: string
) {
  if (!content) {
    return;
  }

  const blob = new Blob([formatFrontMatter(frontMatter), content], {
    type: "text/markdown",
  });

  saveFile({ blob, fileName });
}

export default MarkdownExport;
