import { remark } from "remark";

import { headingTree } from "./headings";

export function getHeadingsFromMarkdown(fileContents: any) {
  if (!fileContents) {
    return {};
  }

  const regexReplaceCode = /(```.+?```)/gms;
  const regexRemoveLinks = /\[(.*?)\]\(.*?\)/g;

  const markdownWithoutLinks = fileContents.replace(regexRemoveLinks, "");
  const markdownWithoutCodeBlocks = markdownWithoutLinks.replace(
    regexReplaceCode,
    ""
  );
  const regXHeader = /#{1,6}.+/g;
  const titles = markdownWithoutCodeBlocks.match(regXHeader);

  if (!titles || !titles.length) {
    return [];
  }

  let globalID = 0;
  let toc: any = [];

  titles.map((tempTitle: string, i: number) => {
    const hashCount = tempTitle.match(/#/g)?.length || 1;
    const level = hashCount - 1;
    const title = tempTitle.replace(/#/g, "").trim();
    const anchor = `#${title.replace(/ /g, "-").toLowerCase()}`;
    level === 1 ? (globalID += 1) : globalID;

    toc.push({
      level: level,
      id: globalID,
      title: title,
      anchor: anchor,
    });
  });

  return toc;
}
