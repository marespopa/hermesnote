import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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
  frontMatter: FileMetadata
) {
  if (!content) {
    return;
  }

  const fileName = frontMatter?.fileName || "file.md";
  const blob = new Blob([formatFrontMatter(frontMatter), content], {
    type: "text/markdown",
  });

  saveFile({ blob, fileName });
}

function exportToPDF(elementId: string, fileName: string = "file.pdf") {
  const reportElement = document.querySelector(elementId) as HTMLElement;

  if (!reportElement) {
    return Promise.reject("Something went wrong");
  }

  return html2canvas(reportElement).then((canvas: any) => {
    const doc = formatPDF();
    doc.save(fileName);

    function formatPDF() {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      heightLeft -= pageHeight;
      const doc = new jsPDF("p", "mm");
      doc.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight, "", "FAST");
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(
          canvas,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          "",
          "FAST"
        );
        heightLeft -= pageHeight;
      }
      return doc;
    }
  });
}

export default MarkdownExport;
