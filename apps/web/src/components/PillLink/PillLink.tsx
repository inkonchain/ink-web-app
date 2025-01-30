import React from "react";

import { HrefProp, Link } from "@/routing";
import { classNames } from "@/util/classes";

import { NoisyContainer } from "../Noisy";

import "./PillLink.css";

export interface PillLinkProps {
  href: HrefProp;
  className?: string;
  children: React.ReactNode;
}

export const PillLink: React.FC<PillLinkProps> = ({
  href,
  className,
  children,
}) => {
  return (
    <Link className="w-full" href={href}>
      <NoisyContainer
        className={classNames(
          "pill-gradient w-full flex items-center gap-2 text-xs font-bold px-2 py-2 backdrop-blur-xl rounded-full text-whiteMagic hover:brightness-125",
          className
        )}
        rounded="events"
      >
        {children}
      </NoisyContainer>
    </Link>
  );
};
