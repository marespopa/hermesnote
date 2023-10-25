import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

type Props = {
  alt: string;
  size?: number;
};

export default function CloseIcon({ alt, size = 16 }: Props) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  return (
    <Image
      className="cursor-pointer"
      src={`${
        isDarkTheme
          ? "/assets/icons/close-icon_dark.svg"
          : "/assets/icons/close-icon.svg"
      }`}
      width={size}
      height={size}
      alt={alt}
    />
  );
}
