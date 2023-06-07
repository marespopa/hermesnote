import jsPDF from "jspdf";
import { FileMetadata, FrontMatterGeneric } from "./../types/markdown";
import { saveFile } from "./save-utils";

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

function exportToPDF(
  elementId: string,
  reportName: string,
  metadata: FileMetadata
) {
  const report = new jsPDF("portrait", "pt", "a4");

  const reportElement = document.querySelector(elementId) as HTMLElement;

  if (!reportElement) {
    return;
  }

  report.setProperties({
    title: metadata.title,
    keywords: metadata.tags,
  });
  report.setFont("Times");
  report
    .html(reportElement, {
      margin: [2, 0, 2, 10],
      width: reportElement.offsetWidth * 0.9,
      windowWidth: reportElement.offsetWidth * 0.95,
      autoPaging: "text",
    })
    .then(() => {
      report.save(reportName || "File.pdf");
    });
}

export default MarkdownExport;
