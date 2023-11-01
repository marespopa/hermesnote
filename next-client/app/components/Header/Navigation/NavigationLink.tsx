import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  href: string;
  isEmphasized?: boolean;
};

const NavigationLink = ({ label, href, isEmphasized = false }: Props) => {
  const currentRoute = usePathname();
  const isActive =
    href === "/" ? currentRoute === href : currentRoute.startsWith(href);
  const textColor = isActive
    ? "text-gray-800 dark:text-white"
    : "text-gray-500 dark:text-gray-300";

  const emphasizeStyle = isEmphasized
    ? `transition ease-in-out border-2 border-cyan-200 dark:border-cyan-400 p-2 hover:bg-cyan-200 focus:bg-cyan-200 dark:hover:bg-cyan-700 dark:focus:bg-cyan-700`
    : ``;

  return (
    <Link
      className={`${textColor} hover:underline focus:underline ${emphasizeStyle}`}
      href={href}
    >
      {label}
    </Link>
  );
};

export default NavigationLink;
