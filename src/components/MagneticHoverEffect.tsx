"use client";

import React, { type MouseEvent, type PropsWithChildren, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { classNames } from "@/util/classes";

const SPRING_CONFIG = { damping: 100, stiffness: 400 };
const SPRING_EASE_CONFIG = { damping: 50, stiffness: 200 };
const DEFAULT_MAX_DISTANCE_Y = 0.2;
const DEFAULT_MAX_DISTANCE_X = 0.1;

interface MagneticHoverEffectProps {
  className?: string;
  maxDistanceY?: number;
  maxDistanceX?: number;
  easeType?: "default" | "ease";
  direction?: "forward" | "opposite";
  /**
   * If the children element has mix-blend, the hover effect also needs to have it.
   * This is because the motion.div used here has a transform, which creates a layer that would otherwise
   *   not recompute blend properly, leaving us with a white icon only when hovering it.
   */
  withBlend?: boolean;
}

export const MagneticHoverEffect: React.FC<
  PropsWithChildren<MagneticHoverEffectProps>
> = ({
  className,
  withBlend,
  children,
  easeType,
  direction,
  maxDistanceY = DEFAULT_MAX_DISTANCE_Y,
  maxDistanceX = DEFAULT_MAX_DISTANCE_X,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(
    x,
    easeType === "ease" ? SPRING_EASE_CONFIG : SPRING_CONFIG
  );
  const springY = useSpring(
    y,
    easeType === "ease" ? SPRING_EASE_CONFIG : SPRING_CONFIG
  );

  const handlePosition = (posX: number, posY: number) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const distanceX = posX - (left + width / 2);
    const distanceY = posY - (top + height / 2);

    const mult = direction === "opposite" ? -1 : 1;

    x.set(distanceX * maxDistanceX * mult);
    y.set(distanceY * maxDistanceY * mult);
  };

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) {
      return;
    }

    const { clientX, clientY } = e;
    handlePosition(clientX, clientY);
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!ref.current) {
      return;
    }

    const { clientX, clientY } = e.touches[0];
    handlePosition(clientX, clientY);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={classNames({ "mix-blend-difference": withBlend }, className)}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onTouchMove={(e) => handleTouch(e)}
      onMouseUp={reset}
      onTouchEnd={reset}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};
