import EmojiIcon from "@/app/components/Icons/EmojiIcon";
import PenIcon from "@/app/components/Icons/PenIcon";
import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";

type Props = {
  handleAction: (data: any) => void;
};

export default function EmojiControl({ handleAction }: Props) {
  const [isVisible, setIsVisible] = useState(false);

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

const sectionStyle = `z-10 fixed top-48 left-8 bg-cyan-100 hover:bg-cyan-200 focus:bg-cyan-200 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:bg-slate-700 p-2 h-12 w-12 rounded-md border border-cyan-300 dark:border-slate-500 cursor-pointer`;
