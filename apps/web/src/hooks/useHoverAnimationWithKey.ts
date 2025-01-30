"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface HoverHandlers<T extends string> {
  props(key: T): {
    [HOVER_KEY_ATTRIBUTE]: T;
    onMouseEnter: (event: MouseEvent) => void;
    onMouseLeave: (event: MouseEvent) => void;
  };
}

type UseHoverAnimationReturns<T extends string> = [
  currentHover: T | undefined,
  HoverHandlers<T>,
];

const HOVER_KEY_ATTRIBUTE = "data-hover-key";

export function useHoverAnimationWithKey<
  T extends string,
>(): UseHoverAnimationReturns<T> {
  const [currentHover, setCurrentHover] = useState<T | undefined>(undefined);
  const hoverTimeout = useRef<number | undefined>(undefined);

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeout.current) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = undefined;
    }
  }, [hoverTimeout]);

  useEffect(() => {
    return () => {
      clearHoverTimeout();
    };
  }, [clearHoverTimeout]);

  const onMouseEnter = (event: MouseEvent) => {
    clearHoverTimeout();

    if (
      event.target &&
      event.target instanceof HTMLElement &&
      event.target.hasAttribute(HOVER_KEY_ATTRIBUTE)
    ) {
      setCurrentHover(event.target.getAttribute(HOVER_KEY_ATTRIBUTE) as T);
    }
  };

  const onMouseLeave = () => {
    clearHoverTimeout();
    hoverTimeout.current = window.setTimeout(
      () => setCurrentHover(undefined),
      650
    );
  };

  return [
    currentHover,
    {
      props(key: T) {
        return {
          onMouseEnter,
          onMouseLeave,
          [HOVER_KEY_ATTRIBUTE]: key,
        };
      },
    },
  ];
}
