import { useIsDarkTheme } from "@/app/hooks/use-dark-theme";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  alt: string;
  tooltip: string;
  size?: number;
};

export default function EyeIcon({ alt, tooltip, size = 16 }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const isDarkTheme = useIsDarkTheme();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <></>;
  }

  return (
    <Image
      className="cursor-pointer"
      src={`${
        isDarkTheme
          ? "/assets/icons/eye-icon_dark.svg"
          : "/assets/icons/eye-icon.svg"
      }`}
      width={size}
      height={size}
      alt={alt}
      title={tooltip}
    />
  );
}
