import EmojiIcon from "@/app/components/Icons/EmojiIcon";
import PenIcon from "@/app/components/Icons/PenIcon";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

type Props = {
  handleAction: (data: any) => void;
};

export default function EmojiControl({ handleAction }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const pickerTheme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <></>;
  }

  return (
    <section
      data-testid="EmojiControl"
      className={sectionStyle}
      onClick={(e) => {
        e.stopPropagation();
        setIsVisible(!isVisible);
      }}
    >
      <span>
        <EmojiIcon tooltip="Emoji Picker" alt="Toggle Emoji Picker" size={48} />
      </span>
      {isVisible && (
        <div
          className="fixed top-0 left-0 w-screen h-screen flex
        items-center justify-center z-10 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto"
          onClick={() => setIsVisible(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <EmojiPicker
              theme={pickerTheme as Theme}
              onEmojiClick={(data) => {
                handleAction(data.emoji);
                setIsVisible(!isVisible);
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

const sectionStyle = `z-10 fixed top-48 left-0 bg-slate-200 hover:bg-slate-300 focus:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:bg-slate-700 p-2 h-12 w-12 rounded-r-md border border-slate-300 dark:border-slate-500 cursor-pointer`;
