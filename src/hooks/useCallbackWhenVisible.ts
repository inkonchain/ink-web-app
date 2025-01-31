import { useEffect, useRef } from "react";

export function useCallbackWhenVisible<T extends HTMLElement = HTMLElement>({
  callback,
}: {
  callback: () => void;
}) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target && entry.target instanceof HTMLElement) {
              if (
                entry.isIntersecting &&
                entry.boundingClientRect.top > 0 &&
                entry.boundingClientRect.top < 500
              ) {
                if (entry.target.dataset["intersecting"] === "false") {
                  callback();
                  entry.target.dataset["intersecting"] = "true";
                }
              } else {
                entry.target.dataset["intersecting"] = "false";
              }
            }
          });
        },
        {
          threshold: [0.2, 0.5, 0.8, 0.9, 1],
        }
      );
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [ref, callback]);

  return { ref };
}
