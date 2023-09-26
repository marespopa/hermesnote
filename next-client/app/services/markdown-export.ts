import { FileMetadata } from "./../types/markdown";
import { saveFile } from "./save-utils";
import html2PDF from "jspdf-html2canvas";

const MarkdownExport = {
  exportMarkdown,
  exportToPDF,
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
    `---\n`;

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

function exportToPDF(elementId: string, fileName: string) {
  const reportElement = document.querySelector(elementId) as HTMLElement;

  if (!reportElement) {
    return Promise.reject("Something went wrong");
  }

  return html2PDF(reportElement, {
    jsPDF: {
      format: "a4",
    },
    imageType: "image/jpeg",
    output: "./pdf/generate.pdf",
  });
}

export default MarkdownExport;
