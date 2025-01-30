import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Required, otherwise the class gets assigned to a color
      "font-size": [
        "text-h1",
        "text-h2",
        "text-h3",
        "text-header",
        "text-footer",
        "text-very-large",
        "text-label",
        "text-body-2",
        "text-body-3",
      ],
      shadow: ["shadow-large-pop", "shadow-inner-form", "box-shadow"],
    },
  },
});

export function classNames(...classes: ClassValue[]) {
  return customTwMerge(clsx(...classes));
}
