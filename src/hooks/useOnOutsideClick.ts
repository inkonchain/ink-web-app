import { useEffect } from "react";

interface UseOutsideClickListenerProps {
  ref: React.RefObject<HTMLElement | null>;
  handler: VoidFunction;
  padding?: number;
}

export const useOutsideClickListener = ({
  ref,
  handler,
  padding = 0,
}: UseOutsideClickListenerProps) => {
  useEffect(() => {
    const determineIfClickedOutside = (event: MouseEvent) => {
      if (
        !ref.current ||
        !(event.target instanceof Node) ||
        ref.current.contains(event.target)
      ) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const { clientX, clientY } = event;
      const { left, right, top, bottom } = rect;

      if (
        clientX < left - padding ||
        clientX > right + padding ||
        clientY < top - padding ||
        clientY > bottom + padding
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", determineIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", determineIfClickedOutside);
    };
  }, [ref, handler, padding]);
};
