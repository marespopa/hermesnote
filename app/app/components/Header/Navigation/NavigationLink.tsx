import Link from "next/link";
import React from "react";
import { URL } from "url";

type Props = {
  label: string;
  href: string;
};

const NavigationLink = ({ label, href }: Props) => {
  return (
    <Link className="hover:underline focus:underline" href={href}>
      {label}
    </Link>
  );
};

export default NavigationLink;
