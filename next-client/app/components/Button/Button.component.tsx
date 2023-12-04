import React, { ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "primary-large"
  | "default"
  | "secondary"
  | "small";
type Props = {
  variant: ButtonVariant;
  label: string | ReactNode;
  handler: () => void;
  styles?: string;
  isDisabled?: boolean;
};

export default function Button({
  variant,
  label,
  handler,
  styles,
  isDisabled,
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
      <span className="flex gap-2 items-center">{label}</span>
    </button>
  );
}

const variantStyles = (variant: ButtonVariant) => {
  const baseStyles = `rounded-md leading-tight px-6 py-3 text-white transition-colors ease-in`;
  const disabledStyles = ` disabled:opacity-50 disabled:pointer-events-none`;

  const primaryStyles = `${baseStyles} bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-600 ${disabledStyles} dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:bg-emerald-700`;
  const defaultStyles = `${baseStyles} bg-gray-900 hover:bg-emerald-800 focus:bg-gray-800
                        dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600 ${disabledStyles}`;
  const secondaryStyles = `${baseStyles} bg-slate-800 not:disabled:hover:bg-slate-900 focus:bg-slate-900 ${disabledStyles}`;
  const smallStyles = `text-white bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:bg-emerald-700 
                       p-2 text-xs rounded-md leading-tight ${disabledStyles}`;

  switch (variant) {
    case "primary":
      return primaryStyles;
    case "primary-large":
      return `${primaryStyles} text-2xl`;
    case "secondary":
      return secondaryStyles;
    case "small":
      return smallStyles;
    default:
      return defaultStyles;
  }
};
