import Image from "next/image";
import React from "react";

type Props = {
  alt: string;
  size?: number;
};

export default function ListIcon({ alt, size = 16 }: Props) {
  return (
    <Image
      className="cursor-pointer"
      src={"/assets/icons/list-icon.svg"}
      width={size}
      height={size}
      alt={alt}
    />
  );
}
