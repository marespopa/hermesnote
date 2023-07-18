import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  href: string;
};

const NavigationLink = ({ label, href }: Props) => {
  const currentRoute = usePathname();
  const isActive =
    href === "/" ? currentRoute === href : currentRoute.startsWith(href);
  const textColor = isActive
    ? "text-gray-800 dark:text-white"
    : "text-gray-500 dark:text-gray-300";

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
