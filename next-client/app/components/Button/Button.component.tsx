import React from "react";

type ButtonVariant = "primary" | "primary-large" | "default" | "secondary";
type Props = {
  variant: ButtonVariant;
  label: string;
  handler: () => void;
  isDisabled?: boolean;
};

export default function Button({ variant, label, handler, isDisabled }: Props) {
  return (
    <button
      onClick={() => handler()}
      className={variantStyles(variant)}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}

const variantStyles = (variant: ButtonVariant) => {
  const baseStyles = `rounded-md leading-tight px-6 py-3  text-white transition-colors ease-in disabled:bg-slate-50 disabled:text-slate-500`;
  const primaryStyles = `${baseStyles} bg-blue-500 hover:bg-blue-600 focus:bg-blue-600`;
  const defaultStyles = `${baseStyles} bg-gray-900 hover:bg-gray-800 focus:bg-gray-800
                        dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600`;
  const secondaryStyles = `${baseStyles} bg-slate-800 hover:bg-slate-900 focus:bg-slate-900`;

  switch (variant) {
    case "primary":
      return primaryStyles;
    case "primary-large":
      return `${primaryStyles} text-2xl`;
    case "secondary":
      return secondaryStyles;

    default:
      return defaultStyles;
  }
};
