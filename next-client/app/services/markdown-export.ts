import { jsPDF } from "jspdf";
import { FileMetadata } from "./../types/markdown";
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

function exportToPDF(
  elementId: string,
  reportName: string,
  frontMatter: FileMetadata
) {
  const report = new jsPDF("portrait", "pt", "a4", true);

  const reportElement = document.querySelector(elementId) as HTMLElement;

  if (!reportElement) {
    return Promise.reject("Something went wrong");
  }

  report.setProperties({
    title: frontMatter.title,
    keywords: frontMatter.tags,
  });

  const pdfMargin = {
    y: 6,
    x: 4,
  };

  report.setCharSpace(0.9);
  report.setFont("sans-serif");

  const htmlCanvasScale =
    report.internal.pageSize.getWidth() / reportElement.offsetWidth;

  return report
    .html(reportElement, {
      margin: [pdfMargin.y, pdfMargin.x, pdfMargin.y, pdfMargin.x],
      autoPaging: "text",
      html2canvas: {
        scale: htmlCanvasScale,
      },
    })
    .then(() => {
      report.save(reportName || "File.pdf");
    });
}

export default MarkdownExport;
