import { classNames } from "@/util/classes";

interface TextUnderlineProps {
  enforce?: "black" | "white";
  halfOpacity?: boolean;
  animateFromHalfWidth?: boolean;
  smallMargin?: boolean;
}

export const TextUnderline: React.FC<TextUnderlineProps> = ({
  enforce,
  halfOpacity,
  animateFromHalfWidth: halfWidth,
  smallMargin,
}) => (
  <div
    className={classNames(
      "absolute left-0 right-full bottom-0 h-0 border-0 border-b transition-all",
      "opacity-0 duration-600 group-hover:right-0",
      {
        "border-blackMagic dark:border-whiteMagic": !enforce,
        "border-blackMagic": enforce === "black",
        "border-whiteMagic": enforce === "white",
      },
      {
        "group-hover:opacity-50": halfOpacity,
        "group-hover:opacity-100": !halfOpacity,
      },
      {
        "right-1/2": halfWidth,
        "left-2 group-hover:right-2": smallMargin,
      }
    )}
  />
);
