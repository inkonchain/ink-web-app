"use client";
import React from "react";
import { Button } from "@inkonchain/ink-kit";

import { BurgerIcon } from "../icons/Burger";
import { CloseIcon } from "../icons/Close";

import { useMobileMenuContext } from "./MobileMenuContext";

export interface MobileMenuButtonProps {}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = () => {
  const { isOpen, setIsOpen } = useMobileMenuContext();

  return (
    <>
      <Button
        variant="wallet"
        rounded="full"
        size="md"
        aria-label="Menu"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <CloseIcon size="icon-sm" enforce="inherit" />
        ) : (
          <BurgerIcon size="icon-md" enforce="inherit" />
        )}
      </Button>
    </>
  );
};
