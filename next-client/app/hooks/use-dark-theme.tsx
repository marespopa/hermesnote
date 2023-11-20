import { useTheme } from "next-themes";

export const useIsDarkTheme = () => {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  return isDarkTheme;
};
