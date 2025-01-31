import { useCallback, useEffect, useState } from "react";

const sizes = {
  sm: 640,
  lg: 1024,
  xl: 1280,
};

export const useOnWindowSize = ({ size }: { size: "sm" | "lg" | "xl" }) => {
  const [isUnderWindowSize, setIsUnderWindowSize] = useState(false);

  const areWeUnderWindowSize = useCallback(() => {
    return !window.matchMedia(`(min-width: ${sizes[size]}px)`).matches;
  }, [size]);

  useEffect(() => {
    function onResize() {
      const newMobile = areWeUnderWindowSize();
      if (isUnderWindowSize !== newMobile) {
        setIsUnderWindowSize(newMobile);
      }
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isUnderWindowSize, areWeUnderWindowSize]);

  useEffect(() => {
    setIsUnderWindowSize(areWeUnderWindowSize());
  }, [areWeUnderWindowSize]);

  return isUnderWindowSize;
};
