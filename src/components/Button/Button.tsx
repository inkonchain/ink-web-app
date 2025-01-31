"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Loader } from "@/components/Loader";

import {
  buttonClassName,
  ButtonSizes,
  ButtonVariants,
  IconPositions,
} from "./styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariants;
  icon?: React.ReactNode;
  iconPosition?: IconPositions;
  iconOnly?: boolean;
  size: ButtonSizes;
  compact?: boolean;
  pending?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      icon,
      iconPosition = "left",
      size,
      compact = false,
      iconOnly = false,
      pending = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={buttonClassName({
          iconOnly,
          compact,
          variant,
          size,
          extraClassName: className,
        })}
        disabled={pending}
        {...props}
      >
        <div className="relative flex items-center justify-center gap-3 select-none">
          {!pending && icon && iconPosition === "left" && icon}

          <div className="relative flex items-center gap-3 font-bold">
            <AnimatePresence initial={false}>
              {pending ? (
                <motion.div
                  className="absolute -left-[30px] flex flex-col items-center gap-14 "
                  transition={{
                    duration: 0.4,
                    stiffness: 2,
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                >
                  <Loader />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.div
              animate={{ x: pending ? 10 : 0 }}
              transition={{
                duration: 0.4,
                stiffness: 2,
              }}
            >
              {children}
            </motion.div>
          </div>

          {!pending && icon && iconPosition === "right" && icon}
        </div>
      </button>
    );
  }
);

Button.displayName = "Button";
