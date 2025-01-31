"use client";
import React, { useEffect } from "react";
import { AnimatePresence, useAnimate, usePresence } from "framer-motion";

import { classNames } from "@/util/classes";

import { buttonClassName } from "../Button/styles";

export interface ButtonIntoInputOverlayProps {
  className?: string;
  children: React.ReactNode;
  isClosed: boolean;
  setIsClosed: (isClosed: boolean) => void;
}

export const ButtonIntoInputOverlay: React.FC<ButtonIntoInputOverlayProps> = ({
  className,
  children,
  isClosed,
  setIsClosed,
}) => {
  return (
    <div
      className={classNames(
        "absolute inset-0 flex justify-end items-center",
        className
      )}
    >
      <AnimatePresence initial={false}>
        {!isClosed && (
          <ButtonWithExit key="button" onClick={() => setIsClosed(true)}>
            {children}
          </ButtonWithExit>
        )}
      </AnimatePresence>
    </div>
  );
};

const ButtonWithExit: React.FC<{
  children: React.ReactNode;
  onClick: Function;
}> = ({ children, onClick }) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate<HTMLButtonElement>();

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        await Promise.all([
          animate("div", { opacity: 0 }, { duration: 0.3, ease: "easeInOut" }),
          animate(
            scope.current,
            // In this animation, we use `borderWidth with a white border to "hide" the actual real button for a little while`
            { width: 60, height: 60, margin: 4, borderWidth: 20 },
            { duration: 0.3, ease: "easeInOut" }
          ),
        ]);

        await animate(
          scope.current,
          {
            width: 60,
            height: 60,
            margin: 4,
            opacity: 0,
            borderWidth: 0,
          },
          {
            duration: 0.3,
            ease: "easeInOut",
          }
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, [animate, safeToRemove, scope, isPresent]);

  return (
    <button
      ref={scope}
      key="button-with-exit"
      className={buttonClassName({
        variant: "primary",
        size: "lg",
        extraClassName: "p-0",
      })}
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      <div
        className={classNames(
          "flex items-center justify-center gap-1 whitespace-nowrap"
        )}
      >
        {children}
      </div>
    </button>
  );
};
