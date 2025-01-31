import { classNames } from "@/util/classes";

export type ButtonVariants =
  | "primary"
  | "outline"
  | "dark"
  | "black"
  | "spotlight"
  | "developer"
  | "link";
export type ButtonSizes = "xs" | "md" | "lg";
export type IconPositions = "left" | "right";

const BACKGROUND_PRIMARY =
  "text-whiteMagic bg-krakenPurple hover:brightness-110 duration-300 transition-[box-shadow] hover:shadow-krakenPurple/50 hover:shadow-large-pop text-whiteMagic";

const BACKGROUND_DARK =
  "text-whiteMagic bg-[length:110%,100%] text-white bg-blackMagic hover:bg-[linear-gradient(129.5deg,#0B0D12_14.89%,#101114_14.9%,#2B1463_58.71%,#7132F5_83.46%,#C6C7D2_103.36%),radial-gradient(73.68%_66.96%_at_1.95%_4.66%,#101114_0%,rgba(16,17,20,0)_100%)]";

const BACKGROUND_OUTLINE =
  "text-whiteMagic bg-blackMagic outline outline-2 outline-whiteMagic hover:brightness-90";

const BACKGROUND_SPOTLIGHT =
  "text-purpleMagic bg-whiteMagic hover:brightness-90";

const BACKGROUND_LINK =
  "text-whiteMagic bg-blackMagic/25 hover:brightness-110 duration-300 transition-[box-shadow] hover:shadow-krakenPurple/50 hover:shadow-large-pop text-whiteMagic";

const BACKGROUND_BLACK =
  "bg-blackMagic shadow-blue-glow backdrop-blur-2xl hover:bg-blackMagic/80 dark:hover:bg-blackMagic/40 transition-all duration-300 text-white";

interface ButtonClassNameOptions {
  iconOnly?: boolean;
  compact?: boolean;
  variant: ButtonVariants;
  size: ButtonSizes;
  extraClassName?: string;
}

export const buttonClassName = ({
  variant,
  iconOnly = false,
  compact = false,
  size,
  extraClassName,
}: ButtonClassNameOptions) => {
  return classNames(
    "cursor-pointer opacity-100 rounded-full w-full h-full border-white overflow-hidden flex items-center justify-center gap-2 font-bold shadow",
    "transition-colors",
    "relative flex items-center gap-3 select-none w-full",
    {
      "justify-center": variant !== "link",
      "justify-between": variant === "link",
    },
    {
      "py-2": size === "xs",
      "py-4": size === "md",
      "py-5": size === "lg",
    },
    compact
      ? {
          "px-2": size === "xs",
          "px-4": size === "md",
          "px-8": size === "lg",
        }
      : {
          "px-4": size === "xs",
          "px-8": size === "md",
          "px-16": size === "lg",
        },
    {
      "text-base": size === "md",
      "text-xl": size === "lg",
    },
    {
      "px-4 py-4": variant === "link",
    },
    iconOnly && {
      "aspect-square": true,
      "px-4": size === "xs",
      "px-5": size === "md",
      "px-6": size === "lg",
    },
    {
      [BACKGROUND_PRIMARY]: variant === "primary" || variant === "developer",
      [BACKGROUND_DARK]: variant === "dark",
      [BACKGROUND_OUTLINE]: variant === "outline",
      [BACKGROUND_SPOTLIGHT]: variant === "spotlight",
      [BACKGROUND_LINK]: variant === "link",
      [BACKGROUND_BLACK]: variant === "black",
    },
    extraClassName
  );
};
