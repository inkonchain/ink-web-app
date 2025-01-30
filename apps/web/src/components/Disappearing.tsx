"use client";
import React, { PropsWithChildren } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface DisappearingProps extends PropsWithChildren {
  className?: string;
  scrollMin: number;
  scrollMax: number;
  disabled?: boolean | undefined;
}

export const Disappearing: React.FC<DisappearingProps> = ({
  scrollMin,
  scrollMax,
  className,
  disabled,
  children,
}) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [scrollMin, scrollMax], [1, 0]);
  const pointerEvents = useTransform(
    scrollY,
    [scrollMin, scrollMax],
    ["auto", "none"]
  );

  const wrappedChildren = <div className={className}>{children}</div>;

  if (disabled) return wrappedChildren;

  return (
    <motion.div className={className} style={{ opacity, pointerEvents }}>
      {children}
    </motion.div>
  );
};
