import Image from "next/image";
import React from "react";

type Props = {
  alt: string;
  tooltip: string;
  size?: number;
};

export default function EmojiIcon({ alt, tooltip, size = 16 }: Props) {
  return (
    <Image
      className="cursor-pointer"
      src={"/assets/icons/emoji-icon.svg"}
      width={size}
      height={size}
      alt={alt}
      title={tooltip}
    />
  );
}
