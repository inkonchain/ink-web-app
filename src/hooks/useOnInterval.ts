import { useEffect } from "react";

export function useOnInterval(callback: () => any, timeInMs: number) {
  useEffect(() => {
    let interval: number | null = window.setInterval(callback, timeInMs);
    function clear() {
      interval && clearInterval(interval);
    }
    function start() {
      clear();
      interval = window.setInterval(callback, timeInMs);
    }

    window.removeEventListener("blur", clear);
    window.removeEventListener("focus", start);

    return () => clear();
  }, [callback, timeInMs]);
}
