import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { FileMetadata } from "../types/markdown";
import { saveFile } from "./save-utils";

class ExportService {
  static formatTags(metadataTags: string) {
    const tags = metadataTags.split(",");
    let formattedTags = ``;

    tags.forEach((tag) => {
      formattedTags += `  - ${tag.toString().trim()}\n`;
    });

    return formattedTags;
  }

  static formatFrontMatter(metadata: FileMetadata) {
    let text = ``;

    text =
      "---\n" +
      `title: ${metadata.title}\n` +
      `description: ${metadata.description}\n` +
      `tags:\n` +
      `${ExportService.formatTags(metadata.tags)}` +
      `---\n`;

    return text;
  }

  static exportMarkdown(content: string | undefined, frontMatter: FileMetadata) {
    if (!content) {
      return;
    }

    const fileName = frontMatter?.fileName || "file.md";
    const blob = new Blob([ExportService.formatFrontMatter(frontMatter), content], {
      type: "text/markdown",
    });

    saveFile({ blob, fileName });
  }

  static exportToPDF(elementId: string, fileName: string = "file.pdf") {
    const reportElement = document.querySelector(elementId) as HTMLElement;

    if (!reportElement) {
      return Promise.reject("Something went wrong");
    }

    return html2canvas(reportElement, {
      logging: true,
      allowTaint: false,
      useCORS: true,
      width: reportElement.scrollWidth,
      height: reportElement.scrollHeight,
      scale: 2,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgWidth = 210;
      const pageHeight = 290;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const doc = new jsPDF('p', 'mm');
      const pageData = canvas.toDataURL('image/jpeg', 1.0);
      const imgData = encodeURIComponent(pageData);

      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      doc.setLineWidth(5);
      doc.setDrawColor(255, 255, 255);
      doc.rect(0, 0, 210, 295);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        doc.setLineWidth(5);
        doc.setDrawColor(255, 255, 255);
        doc.rect(0, 0, 210, 295);
        heightLeft -= pageHeight;
      }
      doc.save(fileName);
    });
  }
}

export default ExportService;
