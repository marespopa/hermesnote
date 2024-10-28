import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  alt: string;
  tooltip: string;
  size?: number;
};

export default function CloseIcon({ alt, tooltip, size = 16 }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <></>;
  }

  return (
    <Image
      className="cursor-pointer"
      src="/assets/icons/close-icon.svg"
      width={size}
      height={size}
      alt={alt}
      title={tooltip}
    />
  );
}
