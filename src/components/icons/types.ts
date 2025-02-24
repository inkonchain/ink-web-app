import { classNames } from "@/util/classes";

export interface ImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  loader?: (resolverProps: {
    src: string;
    width: number;
    quality?: number;
  }) => string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  placeholder?: "blur-sm" | "empty";
  style?: React.CSSProperties;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (error: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  loading?: "lazy" | "eager";
  blurDataURL?: string;
  overrideSrc?: string;
  enforce?: "dark" | "light";
}

export interface IconProps {
  className?: string;
  size: "icon-xs" | "icon-sm" | "icon-md" | "icon-lg" | "icon-xl" | "icon-full";
  enforce?: "black" | "white" | "inherit" | "blend";
  faded?: boolean;
}

export function iconProps({
  className = "",
  size,
  enforce,
  faded,
}: IconProps): string {
  return classNames(
    {
      "size-3": size === "icon-xs",
      "size-4": size === "icon-sm",
      "size-5": size === "icon-md",
      "size-6": size === "icon-lg",
      "size-7": size === "icon-xl",
      "size-full": size === "icon-full",
    },
    {
      "text-blackMagic dark:text-whiteMagic": !enforce,
      "text-blackMagic": enforce === "black",
      "text-whiteMagic": enforce === "white",
      "text-white mix-blend-difference": enforce === "blend",
    },
    {
      "opacity-75 group-hover:opacity-100": faded,
      "opacity-100 group-hover:opacity-75": !faded,
    },
    /**
     * All those that inherit have a weird delay when the transition occurs.
     * It probably is because it "stacks" the parent transition on top.
     * So we can safely assume that we will inherit the parent's transition as well.
     */
    enforce !== "inherit" ? "transition-all duration-200" : "",
    className
  );
}
