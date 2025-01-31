"use client";

import React, { PropsWithChildren } from "react";

import { HrefProp, Link } from "@/routing";
import { classNames } from "@/util/classes";

import {
  buttonClassName,
  ButtonSizes,
  ButtonVariants,
  IconPositions,
} from "./styles";

export interface ButtonLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  className?: string;
  href: HrefProp;
  variant: ButtonVariants;
  icon?: React.ReactNode;
  iconPosition?: IconPositions;
  size: ButtonSizes;
  compact?: boolean;
}

export const ButtonLink: React.FC<PropsWithChildren<ButtonLinkProps>> = ({
  className,
  variant,
  icon,
  iconPosition = "left",
  children,
  size,
  compact = false,
  ...props
}) => {
  return (
    <Link
      className={classNames(
        "w-full flex-1 select-none cursor-pointer",
        buttonClassName({
          compact,
          variant,
          size,
          extraClassName: className,
        })
      )}
      {...props}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </Link>
  );
};
