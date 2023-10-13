import { useRef, useEffect } from "react";

export function useKey(key: string, cb: (event: KeyboardEvent) => void) {
  const callback = useRef(cb);

  useEffect(() => {
    callback.current = cb;
  });

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      event.preventDefault();
      event.stopPropagation();

      const isSaveCommand =
        key === "ctrls" && event.key === "s" && event.ctrlKey;
      const isExportCommand =
        key === "ctrle" && event.key === "e" && event.ctrlKey;

      if (isSaveCommand) {
        callback.current(event);
      } else if (isExportCommand) {
        callback.current(event);
      }
    }

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [key]);
}
