import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  href: string;
};

const NavigationLink = ({ label, href }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  const textColor = isActive
    ? "text-gray-700 dark:text-white"
    : "text-gray-600 dark:text-gray-200";
  return (
    <Link
      className={`${textColor} hover:underline focus:underline`}
      href={href}
    >
      {label}
    </Link>
  );
};

export default NavigationLink;
