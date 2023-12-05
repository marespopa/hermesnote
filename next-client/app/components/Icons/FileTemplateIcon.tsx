import { useIsDarkTheme } from "@/app/hooks/use-dark-theme";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  alt: string;
  tooltip: string;
  size?: number;
};

export default function FileTemplateIcon({ alt, tooltip, size = 16 }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const isDarkTheme = useIsDarkTheme();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <></>;
  }

  return (
    <Image
      src={`${
        isDarkTheme
          ? "/assets/icons/file-template-icon__dark.svg"
          : "/assets/icons/file-template-icon.svg"
      }`}
      width={size}
      height={size}
      alt={alt}
      title={tooltip}
    />
  );
}
