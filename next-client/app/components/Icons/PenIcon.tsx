import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

type Props = {
  alt: string;
  size?: number;
};

export default function PenIcon({ alt, size = 16 }: Props) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  return (
    <Image
      src={`${
        isDarkTheme
          ? "/assets/icons/pen-icon_dark.svg"
          : "/assets/icons/pen-icon.svg"
      }`}
      width={size}
      height={size}
      alt={alt}
    />
  );
}
