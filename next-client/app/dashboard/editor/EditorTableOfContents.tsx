import CloseIcon from "@/app/components/Icons/CloseIcon";
import ListIcon from "@/app/components/Icons/ListIcon";
import React, { useState } from "react";

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

  if (isToggled) {
    return renderToggle();
  }

  return (
    <div className="fixed opacity-90 p-4 rounded-sm right-4 bottom-4 w- max-w-sm bg-gray-300 dark:bg-slate-500">
      <h3
        className={"flex justify-between gap-4"}
        onClick={() => setIsToggled(true)}
      >
        <span>Table of contents</span>
        <CloseIcon alt="Close Table" />
      </h3>
      {headings?.length > 0 ? renderTableOfContents(headings) : <>No content</>}
    </div>
  );

  function renderToggle() {
    return (
      <span
        className="absolute -right-[16px] top-0 cursor-pointer rounded-full bg-green-500 hover:bg-green-600 focus:bg-green-600 shadow-md"
        onClick={() => setIsToggled(false)}
        title="Show table of contents"
      >
        <ListIcon alt="Table of Contents" size={32} />
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

          return (
            <div key={`${level} ${id} ${title}`} className={`${inlinePadding}`}>
              <a href={anchor}>{`- ${title}`}</a>
            </div>
          );
        })}
      </div>
    );
  }
};

export default EditorTableOfContents;
