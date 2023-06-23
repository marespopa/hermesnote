import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

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
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__input"
        id={elementName}
        checked={resolvedTheme === "dark"}
        onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      />
      {resolvedTheme === "light" && <span>🌞</span>}
      {resolvedTheme === "dark" && <span>🌙</span>}
    </label>
  );
};

export default ThemeSwitch;
