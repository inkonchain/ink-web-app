import React, { useState } from "react";

import { classNames } from "@/util/classes";

export interface BackdropProps {
  isVisible: boolean;
  closeOnDragUp?: boolean;
  onClick?(): void;
  noBlur?: boolean;
}

export const Backdrop: React.FC<BackdropProps> = ({
  isVisible,
  closeOnDragUp,
  noBlur,
  onClick,
}) => {
  const [touchY, setTouchY] = useState<number>(0);
  function onTouchStart(e: React.TouchEvent) {
    if (closeOnDragUp) {
      setTouchY(e.touches[0].clientY);
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    if (closeOnDragUp && onClick) {
      const y = e.touches[0].clientY;
      if (touchY - y > 100) {
        onClick();
        setTouchY(0);
      }
    }
  }

  return (
    <div
      className={classNames(
        "fixed sm:inset-0 transition-all duration-150 z-[40] opacity-0 backdrop-blur-none",
        {
          "opacity-95 backdrop-blur-sm": !noBlur && isVisible,
        }
      )}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    />
  );
};
