import { useEffect } from "react";

export function useOnInterval(callback: () => any, timeInMs: number) {
  useEffect(() => {
    let interval = window.setInterval(callback, timeInMs);
    return () => clearInterval(interval);
  }, [callback, timeInMs]);
}
