import { useRef, useEffect } from "react";

// Define a type for available command names
export type CommandNames = "save" | "open" | "new" | "export" | "home" | "template" | "escape" | "enter";

interface Command {
  key: string;
  hasModifier: boolean;
}

// Command registry defining key combinations
const commandRegistry: Record<CommandNames, Command> = {
  save: { key: "s", hasModifier: true },
  open: { key: "o", hasModifier: true },
  new: { key: "n", hasModifier: true },
  export: { key: "e", hasModifier: true },
  home: { key: "Home", hasModifier: false },
  template: { key: "t", hasModifier: true },
  escape: { key: "Escape", hasModifier: false },
  enter: { key: "Enter", hasModifier: false },
};

export function useCommand(
  command: CommandNames,  // Use CommandNames type here
  cb: (event: KeyboardEvent) => void
) {
  const callback = useRef(cb);

  useEffect(() => {
    callback.current = cb;
  }, [cb]);

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      const { key, hasModifier } = commandRegistry[command];

      const isMatchingKey = event.key === key;
      const isModifierActive = event.metaKey || event.ctrlKey;

      if (isMatchingKey && (!hasModifier || isModifierActive)) {
        cancelDefaultBrowserBehaviour(event);
        callback.current(event);
      }
    }

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [command]);

  function cancelDefaultBrowserBehaviour(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
