import jsPDF from "jspdf";
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

  const pdfMargin = {
    y: 6,
    x: 0,
  };

  const currentColor = reportElement.style.color;
  reportElement.style.setProperty("color", "#131313", "important");
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
    })
    .finally(() => {
      reportElement.style.color = currentColor;
    });
}

export default MarkdownExport;
