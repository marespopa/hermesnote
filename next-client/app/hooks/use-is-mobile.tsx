import { useWindowSize } from "./use-window-size";

const useIsMobile = () => {
  const { width: windowWidth } = useWindowSize();
  return !!windowWidth && windowWidth < 768;
};

export default useIsMobile;