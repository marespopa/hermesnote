import { useWindowSize } from "./use-window-size";

const useIsMobile = () => {
  const MAX_WIDTH = 1052;
  const { width: windowWidth } = useWindowSize();
  return !!windowWidth && windowWidth < MAX_WIDTH;
};

export default useIsMobile;