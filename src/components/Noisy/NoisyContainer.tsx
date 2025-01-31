import React, { PropsWithChildren } from "react";

import { classNames } from "@/util/classes";

export interface NoisyContainerProps extends PropsWithChildren {
  className?: string;
  rounded?: "2xl" | "3xl" | "spotlight" | "events" | "card";
}

export const NoisyContainer: React.FC<NoisyContainerProps> = ({
  className,
  rounded,
  children,
}) => {
  const rounding = {
    "rounded-2xl": rounded === "2xl",
    "rounded-3xl": rounded === "3xl",
    "rounded-events": rounded === "events",
    "rounded-spotlight-mobile-content lg:rounded-spotlight-content":
      rounded === "spotlight",
    "rounded-card": rounded === "card",
  };
  return (
    <div
      className={classNames(
        "relative flex items-center justify-center isolate rounded-2xl",
        rounding,
        className
      )}
    >
      {children}
      <div
        className={classNames(
          "absolute inset-0 bg-noise opacity-10 rounded-3xl z-[-1] ",
          rounding
        )}
      />
    </div>
  );
};
