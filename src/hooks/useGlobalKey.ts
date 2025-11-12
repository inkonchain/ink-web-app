import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";

type KeyboardKey = KeyboardEvent["key"];

interface UseGlobalKeyProps {
  isDisabled?: boolean;
  key: KeyboardKey;
  // Returning `true` here means the escape callback was handled, so don't process the other ones.
  handler: () => boolean;
}

const allHandlersStacks: Record<KeyboardKey, Array<Function>> = {};

function shouldHandleAsNativeEvent(event: KeyboardEvent) {
  return (
    event.key !== "Escape" &&
    event.target instanceof Element &&
    ["wcm-modal", "input"].includes(event.target.tagName.toLowerCase())
  );
}

export function useGlobalKeyCallback() {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey) return;
      const lowerKey = event.key.toLowerCase();
      if (!(lowerKey in allHandlersStacks)) return;
      if (shouldHandleAsNativeEvent(event)) return;
      const handlersStack = allHandlersStacks[lowerKey];
      for (let handler of [...handlersStack].reverse()) {
        if (handler()) {
          event.preventDefault();
          event.stopPropagation();
          sendGTMEvent({ event: "keyboard_shortcut", keyboard_key: lowerKey });
          break;
        }
      }
    }

    document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, []);
}

export const useCallbackOnKey = ({
  isDisabled,
  key,
  handler,
}: UseGlobalKeyProps) => {
  useEffect(() => {
    const lowerKey = key.toLowerCase();
    if (!(lowerKey in allHandlersStacks)) {
      allHandlersStacks[lowerKey] = [];
    }

    if (!isDisabled) {
      allHandlersStacks[lowerKey].push(handler);
    }

    return () => {
      if (!isDisabled) {
        const index = allHandlersStacks[lowerKey].indexOf(handler);
        if (index > -1) {
          allHandlersStacks[lowerKey].splice(index, 1);
        }
      }
    };
  }, [key, handler, isDisabled]);
};
