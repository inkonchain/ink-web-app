import { classNames } from "@/util/classes";

export const KeyboardShortcut: React.FC<{
  enforce?: "inherit" | "white" | "black";
  size?: "sm" | "md";
  opacity?: "light" | "normal";
  letter: string;
}> = ({ opacity = "normal", letter, size = "md", enforce = "inherit" }) => (
  <span
    className={classNames(
      "w-fit inline-flex items-center justify-center select-none rounded-[4px]",
      "font-bold backdrop-invert backdrop-grayscale mx-0.5 opacity-60",
      {
        "text-caption size-4": size === "sm",
        "text-body-2 size-6": size === "md",
      },
      {
        "backdrop-opacity-5": opacity === "normal",
        "backdrop-opacity-10": opacity === "light",
      },
      {
        "bg-blackMagic/20 dark:bg-whiteMagic/20": enforce === "inherit",
        "bg-whiteMagic/20": enforce === "white",
        "bg-blackMagic/20": enforce === "black",
      }
    )}
  >{`${letter}`}</span>
);
