import { classNames } from "@/util/classes";

export interface TwoOverlappingLayoutProps {
  className?: string;
  first: React.ReactNode;
  second: React.ReactNode;
  shown: "first" | "second";
}

/** Use this component if you want to switch between two sides within the same space, with a fade-in-out animation */
export const TwoOverlappingLayout: React.FC<TwoOverlappingLayoutProps> = ({
  className,
  first,
  second,
  shown,
}) => (
  <div className={classNames("relative w-full h-full", className)}>
    <div
      className={classNames(
        "absolute inset-0 opacity-100 transition-all duration-150 ",
        {
          "opacity-0 ": shown !== "first",
        }
      )}
      aria-hidden={shown !== "first"}
    >
      {first}
    </div>
    <div
      className={classNames(
        "absolute inset-0 opacity-100 transition-all duration-150 ",
        {
          "opacity-0 ": shown !== "second",
        }
      )}
      aria-hidden={shown !== "second"}
    >
      {second}
    </div>
  </div>
);
