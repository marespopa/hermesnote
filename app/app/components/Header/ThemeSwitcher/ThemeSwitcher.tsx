"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const elementName = "themeToggle";

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <label
      className="flex bg-blue-300 dark:bg-slate-700 w-8 h-8 align-middle justify-center cursor-pointer rounded-lg
    transition-background ease-in duration-300"
    >
      <input
        type="checkbox"
        className="hidden"
        id={elementName}
        checked={resolvedTheme === "dark"}
        onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      />
      {resolvedTheme === "light" && (
        <span className="inline-flex animate-pop-short">
          <Image
            src="/assets/icons/sun-icon.svg"
            width={24}
            height={24}
            alt="Light Theme"
          />
        </span>
      )}
      {resolvedTheme === "dark" && (
        <span className="inline-flex animate-pop-short">
          <Image
            src="/assets/icons/moon-icon.svg"
            width={24}
            height={24}
            alt="Dark Theme"
          />
        </span>
      )}
    </label>
  );
};

export default ThemeSwitcher;
