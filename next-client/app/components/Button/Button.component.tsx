import React, { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "success";

type Props = {
  children?: ReactNode;
  variant: ButtonVariant;
  label?: string | ReactNode;
  handler: () => void;
  styles?: string;
  isDisabled?: boolean;
};

export default function Button({
  variant,
  label,
  children,
  handler,
  styles = "",
  isDisabled = false,
}: Props) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handler();
      }}
      className={`${variantStyles(variant)} ${styles}`}
      disabled={isDisabled}
    >
      <span className="flex gap-2 items-center">{children || label}</span>
    </button>
  );
}

const variantStyles = (variant: ButtonVariant) => {
  const baseStyles = `rounded-lg shadow-md px-4 py-2 text-lg font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2`;
  const disabledStyles = `disabled:opacity-50 disabled:pointer-events-none`;

  switch (variant) {
    case "primary":
      return `${baseStyles} bg-emerald-600 text-white hover:bg-emerald-700 focus:bg-emerald-700 focus:ring-emerald-500 ${disabledStyles}`;
    case "secondary":
      return `${baseStyles} bg-gray-800 text-white hover:bg-gray-700 focus:bg-gray-700 focus:ring-gray-500 ${disabledStyles}`;
    case "danger":
      return `${baseStyles} bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-red-500 ${disabledStyles}`;
    case "success":
      return `${baseStyles} bg-emerald-600 text-white hover:bg-emerald-700 focus:bg-emerald-700 focus:ring-emerald-500 ${disabledStyles}`;
    default:
      return `${baseStyles} bg-gray-200 text-black hover:bg-gray-300 focus:bg-gray-300 ${disabledStyles}`;
  }
};
