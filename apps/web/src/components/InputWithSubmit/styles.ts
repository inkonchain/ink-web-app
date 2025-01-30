import { classNames } from "@/util/classes";

export type InputVariants =
  | "default"
  | "transparent"
  | "transparent-on-dark"
  | "gray";
export type InputSize = "md" | "lg";

interface InputContainerClassNameOptions {
  variant: InputVariants;
  hasIcon?: boolean;
  hasError?: boolean;
  size?: InputSize;
  extraClassName?: string;
}

export const inputContainerClassNames = ({
  variant,
  size,
  hasIcon = false,
  hasError = false,
  extraClassName,
}: InputContainerClassNameOptions) => {
  return classNames(
    "relative flex w-full h-full bg-clip-padding min-w-56",
    "rounded-full overflow-hidden border",
    "shadow-transparent shadow-inner-form duration-200 transition-[background-color,box-shadow]",
    "hover:bg-white",
    {
      "bg-transparent hover:bg-white focus-within:bg-white hover:shadow-black/25 hover:dark:bg-blackMagic/50 dark:focus-within:bg-blackMagic/50":
        variant === "transparent",
      "bg-transparent hover:bg-whiteMagic/10 focus-within:bg-whiteMagic/5 hover:shadow-black/25":
        variant === "transparent-on-dark",
      "bg-white hover:shadow-black/50": variant === "default",
      "bg-zinc-100": variant === "gray",
      "bg-white": hasError,
    },
    {
      "pl-6": hasIcon,
      "border-blackMagic/50": variant === "transparent",
      "border-whiteMagic/50": variant === "transparent-on-dark",
      "border-whiteMagic focus-within:border-whiteMagic": variant === "default",
      "border-redMagic-400 focus-within:border-redMagic-400 ": hasError,
    },
    {
      "h-12": size == "lg",
      "h-10": size == "md",
    },
    extraClassName
  );
};

interface InputClassNameOptions {
  variant: InputVariants;
  extraClassName?: string;
}

export const inputClassNames = ({
  variant,
  extraClassName,
}: InputClassNameOptions) => {
  return classNames(
    "h-auto w-full px-6 text-blackMagic placeholder:text-body-2 placeholder:text-blackMagic/40 focus-visible:placeholder:text-blackMagic/50 focus-visible:outline-none disabled:opacity-50 bg-transparent placeholder:font-normal placeholder:antialiased placeholder:text-sm",
    {
      "dark:text-whiteMagic placeholder:text-blackMagic/50 dark:placeholder:text-whiteMagic/50":
        variant == "transparent",
      "text-whiteMagic placeholder:text-whiteMagic/30 focus-visible:placeholder:text-whiteMagic/50":
        variant === "transparent-on-dark",
      "placeholder:text-blackMagic/80": variant == "gray",
    },
    extraClassName
  );
};

export const inputIconClassNames = ({
  variant,
}: { variant?: InputVariants } = {}) =>
  classNames(
    `absolute h-full left-4 top-0 bottom-0 flex items-center justify-center`,
    {
      "opacity-40": variant !== "gray",
    }
  );
