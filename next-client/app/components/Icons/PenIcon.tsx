import Image from "next/image";
import React from "react";

type Props = {
  alt: string;
  tooltip: string;
  size?: number;
};

export default function PenIcon({ alt, tooltip, size = 16 }: Props) {
  return (
    <Image
      src="/assets/icons/pencil-icon.svg"
      width={size}
      height={size}
      alt={alt}
      title={tooltip}
    />
  );
}
