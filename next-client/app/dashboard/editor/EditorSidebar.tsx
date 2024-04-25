"use client";
import React, { useEffect, useState } from "react";
import EmojiControl from "../components/EmojiControl";
import FileNewIcon from "@/app/components/Icons/FileNewIcon";
import FileTemplateIcon from "@/app/components/Icons/FileTemplateIcon";
import FileOpenIcon from "@/app/components/Icons/FileOpenIcon";
import { useWindowSize } from "@/app/hooks/use-mobile";

type Props = {
  actions: {
    emoji: (data: any) => void;
    newFile: () => void;
    openFile: () => void;
    templateFile: () => void;
  };
};

const EditorSidebar = ({ actions }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { width: windowWidth } = useWindowSize();
  const isBrowserMobile = !!windowWidth && windowWidth < 768;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isBrowserMobile) {
    return null;
  }

  return (
    <aside className={sidebarStyle}>
      <ul>
        <li className={sidebarItemStyle} onClick={actions.newFile}>
          <FileNewIcon alt="New File" tooltip="Create a new file" size={24} />
        </li>
        <li className={sidebarItemStyle} onClick={actions.openFile}>
          <FileOpenIcon alt="New File" tooltip="Open a file" size={24} />
        </li>
        <li className={sidebarItemStyle} onClick={actions.templateFile}>
          <FileTemplateIcon
            alt="New File"
            tooltip="Create from template"
            size={24}
          />
        </li>
        <li className={sidebarItemStyle}>
          <EmojiControl handleAction={actions.emoji} />
        </li>
      </ul>
    </aside>
  );
};

const sidebarStyle = `opacity-70 z-10 fixed top-48 -left-2 bg-slate-200 dark:bg-slate-600 rounded-r-md border border-slate-300 dark:border-slate-500`;
const sidebarItemStyle =
  "hover:bg-slate-300 p-2 pl-4 focus:bg-slate-300  dark:hover:bg-slate-700 dark:focus:bg-slate-700  cursor-pointer";
export default EditorSidebar;
