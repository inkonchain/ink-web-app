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
        "text-h4",
        "text-h5",
        "text-body-2",
        "text-body-3",
        "text-body-1-regular",
        "text-body-1-bold",
        "text-body-2-regular",
        "text-body-2-bold",
        "text-body-3-regular",
        "text-body-3-bold",
        "text-caption-1-regular",
        "text-caption-1-bold",
        "text-caption-2-regular",
        "text-caption-2-bold",
      ],
      shadow: ["shadow-large-pop", "shadow-inner-form", "box-shadow"],
    },
  },
});

export function classNames(...classes: ClassValue[]) {
  return customTwMerge(clsx(...classes));
}
