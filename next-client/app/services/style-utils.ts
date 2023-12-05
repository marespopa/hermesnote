export function getButtonStylesFromColor(color: string) {
  switch (color) {
    case "cyan":
      return `bg-cyan-500 focus:bg-cyan-600 hover:bg-cyan-600 dark:bg-cyan-700 dark:hover:bg-cyan-800 dark:focus:bg-cyan-800`;
    case "amber":
      return `text-zinc-950 bg-amber-400 focus:bg-amber-500 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 dark:focus:bg-amber-600`;
    case "rose":
      return `bg-rose-500 focus:bg-rose-600 hover:bg-rose-600 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:bg-rose-600`;

    default:
      return `bg-emerald-400 focus:bg-emerald-500 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600`;
  }
}
