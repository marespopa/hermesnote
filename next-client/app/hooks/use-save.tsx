import { useEffect } from "react";

const useCtrlS = (onEvent: () => void) => {
  useEffect(() => {
    // check if the key is "s" with ctrl key
    const keyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        onEvent();
      }
    };

    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  });
};
export default useCtrlS;
