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

export function replaceMarkdownWithHtml(input: string): string {
  // Replace Markdown headers inside <div> tags
  input = input.replace(/>(#+)\s*(.*?)<\//g, (_, hashes, content) => {
    const level = hashes.length; // Determine the header level based on the number of hashes
    if (level >= 1 && level <= 6) {
      return `><h${level}>${content}</h${level}></`;
    }
    return `<${hashes} ${content}</`; // Preserve unmatched cases
  });

  // Replace standalone Markdown headers (e.g., # Heading)
  input = input.replace(
    /(^|\n)(#+)\s*(.*?)(\n|$)/g,
    (_, start, hashes, content, end) => {
      const level = hashes.length; // Determine the header level
      if (level >= 1 && level <= 6) {
        return `${start}<h${level}>${content}</h${level}>${end}`;
      }
      return `${start}${hashes} ${content}${end}`; // Preserve unmatched cases
    }
  );

  // Replace unordered lists (- or *) with <ul> and <li>
  input = input.replace(
    /(^|\n)(\s*[-*])\s+(.*?)(?=\n|$)/g,
    (_, start, bullet, content) => {
      return `${start}<ul><li>${content}</li></ul>`;
    }
  );

  // Replace ordered lists (e.g., "1.") with <ol> and <li>
  input = input.replace(
    /(^|\n)(\d+\.)\s+(.*?)(?=\n|$)/g,
    (_, start, number, content) => {
      return `${start}<ol><li>${content}</li></ol>`;
    }
  );

  // Merge consecutive <ul> or <ol> tags into a single list
  input = input.replace(/<\/(ul|ol)>\s*<\1>/g, "");

  // Replace Markdown links [text](url) with <a href="url">text</a>
  input = input.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
    return `<a href="${url}">${text}</a>`;
  });

  // Replace Markdown tables with HTML tables
  const tableRegex = /((?:\|.*?\|(?:\n|$))+)/g;
  input = input.replace(tableRegex, (tableBlock) => {
    const rows = tableBlock.trim().split("\n");
    const headerRow = rows[0];
    const separatorRow = rows[1];

    // Ensure it's a valid Markdown table by checking for separator row
    if (!separatorRow || !/^(\|\s*:?-+:?\s*)+\|$/.test(separatorRow)) {
      return tableBlock; // Not a valid table; return as-is
    }

    const headers = headerRow
      .split("|")
      .slice(1, -1)
      .map((header) => `<th>${header.trim()}</th>`)
      .join("");
    const bodyRows = rows
      .slice(2)
      .map((row) => {
        const cells = row
          .split("|")
          .slice(1, -1)
          .map((cell) => `<td>${cell.trim()}</td>`)
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");

    return `<table><thead><tr>${headers}</tr></thead><tbody>${bodyRows}</tbody></table>`;
  });

  return input;
}
