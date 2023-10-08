import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const isWindowClient: boolean = typeof window === "object";
  const [windowSize, setWindowSize] = useState<number | undefined>(
    isWindowClient ? window.innerWidth : undefined
  );

  useEffect(() => {
    // handler called on change of the screen resize
    const setSize = () => {
      setWindowSize(window.innerWidth);
    };
    const handleOrientationChange = () => {
      setTimeout(setSize, 100); //Add a delay to allow the orientation change to complete
    };

    if (isWindowClient) {
      //register the window resize listener
      window.addEventListener("resize", setSize);
      window.addEventListener("orientationchange", handleOrientationChange);

      //un-register the listener
      return () => {
        window.removeEventListener("resize", setSize);
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      };
    }
  }, [isWindowClient]);

  return windowSize;
};
