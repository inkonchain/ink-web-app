import React, { PropsWithChildren } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const pillContainerVariants = cva(
  "rounded-full backdrop-blur-xl px-6 py-2 transition-colors duration-200",
  {
    variants: {
      variant: {
        transparent: "bg-white/25 dark:bg-black/25",
        purple: "bg-purple-pill-gradient text-blackMagic",
        "ink-kit":
          "ink:bg-background-container ink:text-text-primary px-3 py-1",
      },
      withHover: {
        true: "hover:text-blackMagic/50 dark:hover:text-whiteMagic/50",
      },
    },
    defaultVariants: {
      variant: "transparent",
    },
  }
);

export interface PillContainerProps
  extends PropsWithChildren,
    VariantProps<typeof pillContainerVariants> {
  className?: string;
}

export const PillContainer: React.FC<PillContainerProps> = ({
  className,
  withHover,
  variant,
  ...props
}) => {
  return (
    <div
      className={cn(
        pillContainerVariants({
          variant,
          withHover,
        }),
        className
      )}
      {...props}
    />
  );
};

PillContainer.displayName = "PillContainer";
