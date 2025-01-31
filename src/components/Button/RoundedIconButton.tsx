import { PropsWithChildren } from "react";

import { classNames } from "@/util/classes";

import { MagneticHoverEffect } from "../MagneticHoverEffect";

interface RoundedIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "blur";
}

export const RoundedIconButton: React.FC<
  PropsWithChildren<RoundedIconButtonProps>
> = ({ children, className, variant, ...rest }) => {
  return (
    <MagneticHoverEffect maxDistanceX={0.2} maxDistanceY={0.3}>
      <button
        className={classNames(
          "relative text-xl rounded-full p-2",
          {
            "backdrop-blur-xl bg-whiteMagic/15 p-4": variant === "blur",
          },
          className
        )}
        {...rest}
      >
        {/* <div className="absolute inset-0 blur-3xl" /> */}
        <MagneticHoverEffect maxDistanceX={0.3} maxDistanceY={0.5}>
          {children}
        </MagneticHoverEffect>
      </button>
    </MagneticHoverEffect>
  );
};
