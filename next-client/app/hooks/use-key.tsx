import { useRef, useEffect } from "react";

export type KeyEvents = "ctrls" | "ctrle" | "home" | "escape";

export function useKey(key: KeyEvents, cb: (event: KeyboardEvent) => void) {
  const callback = useRef(cb);

  useEffect(() => {
    callback.current = cb;
  });

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      const isSaveCommand =
        key === "ctrls" &&
        event.key === "s" &&
        (event.metaKey || event.ctrlKey);
      const isExportCommand =
        key === "ctrle" &&
        event.key === "e" &&
        (event.metaKey || event.ctrlKey);
      const isHomeCommand = key === "home" && event.key === "Home";
      const isEscapeCommand = key === "escape" && event.key === "Escape";
      const isKnownCommand =
        isHomeCommand || isSaveCommand || isExportCommand || isEscapeCommand;

      if (isKnownCommand) {
        cancelDefaultBrowserBehaviour(event);
        callback.current(event);
      }
    }

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [key]);

  function cancelDefaultBrowserBehaviour(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
