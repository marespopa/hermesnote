import EmojiIcon from "@/app/components/Icons/EmojiIcon";
import Portal from "@/app/components/Portal";
import { useIsDarkTheme } from "@/app/hooks/use-dark-theme";
import { useKey } from "@/app/hooks/use-key";
import EmojiPicker, { Theme } from "emoji-picker-react";
import React, { useEffect, useState } from "react";

type Props = {
  handleAction: (data: any) => void;
};

export default function EmojiControl({ handleAction }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isDarkTheme = useIsDarkTheme();
  const pickerTheme = isDarkTheme ? "dark" : "light";

  useEffect(() => setIsMounted(true), []);

  useKey("escape", () => {
    if (isVisible) {
      setIsVisible(false);
    }
  });

  if (!isMounted) {
    return <></>;
  }

  return (
    <div
      data-testid="EmojiControl"
      onClick={(e) => {
        e.stopPropagation();
        setIsVisible(!isVisible);
      }}
    >
      <span>
        <EmojiIcon tooltip="Emoji Picker" alt="Toggle Emoji Picker" size={16} />{" "}
      </span>
      {isVisible && (
        <Portal>
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
        </Portal>
      )}
    </div>
  );
}
