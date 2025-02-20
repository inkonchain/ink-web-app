import { PropsWithChildren } from "react";

import { classNames } from "@/util/classes";

export interface ColoredTextProps extends PropsWithChildren {
  variant:
    | "purple"
    | "purple-light"
    | "purple-dark"
    | "reverse-purple"
    | "white-to-gray"
    | "white"
    | "ink";
  dampen?: "md" | "lg";
  pulse?: "slow" | "md";
  noisy?: boolean;
  className?: string;
  noAnimation?: boolean;
}

export const ColoredText: React.FC<ColoredTextProps> = ({
  variant,
  dampen,
  noisy,
  pulse,
  className,
  noAnimation,
  children,
}) => {
  return (
    <span
      className={classNames(
        "inline-block w-fit text-transparent bg-clip-text transition-colors relative",
        {
          "from-blackMagic dark:from-whiteMagic to-gradientPurple dark:to-gradientPurple bg-gradient-to-r":
            variant === "purple",
          "from-gradientPurple dark:from-gradientPurple to-blackMagic dark:to-whiteMagic bg-gradient-to-r":
            variant === "reverse-purple",
          "from-whiteMagic to-gradientPurple bg-gradient-to-r":
            variant === "purple-light",
          "from-blackMagic to-gradientPurple bg-gradient-to-r":
            variant === "purple-dark",
          "from-whiteMagic to-[#8049F2] bg-gradient-to-r":
            variant === "white-to-gray",
          "text-white bg-none": variant === "white",
          "from-black dark:from-white to-inkGradient dark:to-inkGradient bg-gradient-to-r":
            variant === "ink",
        },
        {
          "bg-overflow-150 animate-slightPulse": !noAnimation,
          "animate-pulse": pulse === "md",
        },
        {
          "bg-overflow-150": dampen === "md",
          "bg-overflow-200": dampen === "lg",
        },
        {
          '[background-image:url("/noise-mask.svg"),linear-gradient(to_right,_var(--tw-gradient-stops))]':
            noisy,
        },
        className
      )}
    >
      {children}
    </span>
  );
};
