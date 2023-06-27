import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeSwitch = () => {
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
    <label className="theme-switcher">
      <input
        type="checkbox"
        className="theme-switcher__input"
        id={elementName}
        checked={resolvedTheme === "dark"}
        onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      />
      {resolvedTheme === "light" && (
        <span className="theme-switcher__icon">
          <Image
            src="/assets/icons/sun-icon.svg"
            width={24}
            height={24}
            alt="Light Theme"
          />
        </span>
      )}
      {resolvedTheme === "dark" && (
        <span className="theme-switcher__icon">
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

export default ThemeSwitch;
