import React, { ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "primary-large"
  | "default"
  | "secondary"
  | "small"
  | "small--success"
  | "small--warning"
  | "small--info"
  | "small--error";

type Props = {
  children?: any;
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
      <span className="flex gap-2 items-center">{children ? children : label}</span>
    </button>
  );
}

const variantStyles = (variant: ButtonVariant) => {
  const baseStyles = `rounded-md shadow-sm leading-tight px-3 py-2 text-white transition-colors ease-in`;
  const disabledStyles = ` disabled:opacity-50 disabled:pointer-events-none`;
  const primaryStyles = `${baseStyles} bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-600 ${disabledStyles} dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:bg-emerald-700`;
  const defaultStyles = `${baseStyles} bg-gray-700 focus:bg-gray-800 hover:bg-gray-800 dark:bg-cyan-700 dark:hover:bg-cyan-800 dark:focus:bg-cyan-800
                         ${disabledStyles}`;
  const secondaryStyles = `${baseStyles} bg-slate-800 not:disabled:hover:bg-slate-900 focus:bg-slate-900 ${disabledStyles}`;
  const smallStyles = `text-white p-2 text-xs rounded-md leading-tight ${disabledStyles}`;
  const smallVariants = {
    default: `bg-gray-700 focus:bg-gray-800 hover:bg-gray-800 dark:bg-cyan-700 dark:hover:bg-cyan-800 dark:focus:bg-cyan-800`,
    success: `bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:bg-emerald-700`,
    info: `bg-cyan-500 focus:bg-cyan-600 hover:bg-cyan-600 dark:bg-cyan-700 dark:hover:bg-cyan-800 dark:focus:bg-cyan-800`,
    warning: `text-zinc-950 bg-amber-400 focus:bg-amber-500 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 dark:focus:bg-amber-600`,
    error: `bg-rose-500 focus:bg-rose-600 hover:bg-rose-600 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:bg-rose-600`,
  };

  switch (variant) {
    case "primary":
      return primaryStyles;
    case "primary-large":
      return `${primaryStyles} text-2xl`;
    case "secondary":
      return secondaryStyles;
    case "small":
      return `${smallStyles} ${smallVariants.default}`;
    case "small--success":
      return `${smallStyles} ${smallVariants.success}`;
    case "small--warning":
      return `${smallStyles} ${smallVariants.warning}`;
    case "small--info":
      return `${smallStyles} ${smallVariants.info}`;
    case "small--error":
      return `${smallStyles} ${smallVariants.error}`;
    default:
      return defaultStyles;
  }
};
