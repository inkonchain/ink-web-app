import { classNames } from "@/util/classes";

import { ArrowRightIcon } from "./icons/ArrowRight";
import { ArrowTopRightIcon } from "./icons/ArrowTopRight";
import { type IconProps } from "./icons/types";

export const ArrowOnHover: React.FC<{
  iconClassName?: string;
  size?: IconProps["size"];
  enforce?: "white" | "black" | "inherit";
  external?: boolean;
}> = ({ size = "icon-sm", enforce, external, iconClassName }) => (
  <span
    className={classNames(
      "inline-block opacity-50 w-0 overflow-hidden h-full transition-[width] duration-300",
      {
        "group-hover:w-3 group-focus-visible:w-3": size === "icon-xs",
        "group-hover:w-4 group-focus-visible:w-4": size === "icon-sm",
        "group-hover:w-5 group-focus-visible:w-5": size === "icon-md",
        "group-hover:w-6 group-focus-visible:w-6": size === "icon-lg",
        "group-hover:w-7 group-focus-visible:w-7": size === "icon-xl",
        "group-hover:w-full group-focus-visible:w-full": size === "icon-full",
      }
    )}
  >
    {external ? (
      <ArrowTopRightIcon
        className={iconClassName}
        size={size}
        enforce={enforce}
      />
    ) : (
      <ArrowRightIcon className={iconClassName} size={size} enforce={enforce} />
    )}
  </span>
);
