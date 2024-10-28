import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  alt: string;
  tooltip: string;
  size?: number;
};

export default function EyeIcon({ alt, tooltip, size = 16 }: Props) {
  return (
    <Image
      className="cursor-pointer"
      src="/assets/icons/eye-icon.svg"
      width={size}
      height={size}
      alt={alt}
      title={tooltip}
    />
  );
}
