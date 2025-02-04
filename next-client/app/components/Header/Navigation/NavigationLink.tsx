import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  href: string;
  isEmphasized?: boolean;
  action?: () => void;
};

const NavigationLink = ({
  label,
  href,
  isEmphasized = false,
  action,
}: Props) => {
  const currentRoute = usePathname();
  const isActive =
    href === "/" ? currentRoute === href : currentRoute.startsWith(href);
  const textColor = isActive ? "text-gray-800" : "text-gray-500";

  const emphasizeStyle = isEmphasized
    ? `text-white rounded-sm transition ease-in-out p-2 bg-emerald-600 hover:bg-emerald-700 focus:bg-emerald-700`
    : ``;

  return (
    <Link
      className={`${textColor} underline md:no-underline hover:underline focus:underline ${emphasizeStyle}`}
      href={href}
      onClick={action}
    >
      {label}
    </Link>
  );
};

export default NavigationLink;
