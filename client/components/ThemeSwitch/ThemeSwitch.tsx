import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const elementName = "themeToggle";

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__input"
        id={elementName}
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      {theme === "light" && <span>🌞</span>}
      {theme === "dark" && <span>🌙</span>}
    </label>
  );
};

export default ThemeSwitch;
