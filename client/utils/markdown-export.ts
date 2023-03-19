const MarkdownExport = {
  exportMarkdown,
};

function exportMarkdown(content: string | undefined, fileName: string) {
  if (!content) {
    return;
  }

  const fileData = JSON.stringify(content);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${fileName}.md`;
  link.href = url;
  link.click();
}

export default MarkdownExport;
