"use client";

import CloseIcon from "@/app/components/Icons/CloseIcon";
import ListIcon from "@/app/components/Icons/ListIcon";
import React, { useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

type Props = {
  headings: any;
};

interface TOCItem {
  level: number;
  id: number;
  title: string;
  anchor: string;
}

const EditorTableOfContents = ({ headings }: Props) => {
  const [isToggled, setIsToggled] = useState(true);

  function renderToggle() {
    return (
      <span
        className="absolute -right-[16px] top-0 cursor-pointer rounded-full bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:bg-emerald-700 shadow-md"
        onClick={() => setIsToggled(false)}
      >
        <ListIcon
          tooltip="Show table of contents"
          alt="Table of Contents"
          size={32}
        />
      </span>
    );
  }

  function renderTableOfContents(tableOfContents: TOCItem[]) {
    function getPadding(level: number) {
      switch (level) {
        case 0:
          return "pl-0 font-bold";
        case 1:
          return "pl-4";
        case 2:
          return "pl-8";
        case 3:
          return "pl-16";
        case 4:
          return "pl-32";
        case 5:
          return "pl-64";
        default:
          return "pl-0";
      }
    }

    return (
      <div className="overflow-y-auto max-h-40 mt-4 pr-2 text-sm flex flex-col gap-2">
        {tableOfContents.map(({ level, id, title, anchor }) => {
          const inlinePadding = getPadding(level);
          const anchorText = level > 0 ? `― ${title}` : title;
          const elementId = anchor.replace("#", "");

          return (
            <div key={`${level} ${id} ${title}`} className={`${inlinePadding}`}>
              <ScrollLink
                className="cursor-pointer"
                to={elementId}
                smooth={true}
                offset={-32}
                duration={500}
              >
                {anchorText}
              </ScrollLink>
            </div>
          );
        })}
      </div>
    );
  }

  if (isToggled) {
    return renderToggle();
  }

  return (
    <div className="fixed shadow-sm opacity-95 p-4 rounded-md right-4 bottom-64 max-w-sm bg-slate-200 dark:bg-slate-600">
      <h3
        className={"flex justify-between gap-4"}
        onClick={() => setIsToggled(true)}
      >
        <span>Table of contents</span>
        <CloseIcon tooltip="Close this dialog" alt="Close Table" />
      </h3>
      {headings?.length > 0 ? renderTableOfContents(headings) : <>No content</>}
    </div>
  );
};

export default EditorTableOfContents;
