"use client";
import React, { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export interface FlyWhenIntoViewProps extends PropsWithChildren {
  className?: string;
}

export const FlyWhenIntoView: React.FC<FlyWhenIntoViewProps> = ({
  className,
  children,
}) => {
  return (
    <motion.div
      className={className}
      transition={{ delay: 0.2, duration: 0.2 }}
      initial={{ opacity: 0, translateY: "75px" }}
      whileInView={{ opacity: 1, translateY: "0px" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};
