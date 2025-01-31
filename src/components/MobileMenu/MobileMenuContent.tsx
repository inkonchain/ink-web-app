"use client";
import React, { PropsWithChildren } from "react";

import { useModal } from "@/hooks/useModal";
import { classNames } from "@/util/classes";

import { Backdrop } from "../Backdrop";

import { useMobileMenuContext } from "./MobileMenuContext";

export interface MobileMenuContentProps extends PropsWithChildren {}

export const MobileMenuContent: React.FC<MobileMenuContentProps> = ({
  children,
}) => {
  const { isOpen, setIsOpen } = useMobileMenuContext();
  useModal({
    isOpen,
    closeModal: () => setIsOpen(false),
    modalKey: "mobile-menu",
  });

  return (
    <div className="lg:hidden">
      <Backdrop
        isVisible={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        closeOnDragUp
      />
      <div
        className={classNames(
          "fixed inset-0 bottom-auto backdrop-blur-lg flex flex-col opacity-0 transition-opacity z-40",
          {
            "opacity-100": isOpen,
          }
        )}
      >
        <div className="pt-32 pb-16 p-8 flex flex-col gap-4 bg-whiteMagic/60 dark:bg-blackMagic/25 backdrop-blur-lg drop-shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};
