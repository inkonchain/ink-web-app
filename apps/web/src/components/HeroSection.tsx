"use client";
import React, { PropsWithChildren } from "react";
import { MotionValue, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";

export interface HeroSectionProps extends PropsWithChildren {}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 500], [0, distance]);
}

export const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  const { scrollY } = useScroll();
  const y = useParallax(scrollY, 100);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  return (
    <motion.div
      className="flex flex-col items-center gap-8 flex-1"
      style={{ y, opacity }}
    >
      <div className="flex flex-col items-center sm:justify-center sm:gap-10 gap-6 flex-1">
        {children}
      </div>
    </motion.div>
  );
};
