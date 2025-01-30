import React, { useState } from "react";

import { useOnInterval } from "@/hooks/useOnInterval";
import { usePrevious } from "@/hooks/usePrevious";
import { classNames } from "@/util/classes";

export interface RotatingTextProps {
  sections: React.ReactNode[];
}

export const RotatingText: React.FC<RotatingTextProps> = ({ sections }) => {
  const [index, setIndex] = useState(0);
  const previousIndex = usePrevious(index);
  useOnInterval(() => {
    setIndex((state) => {
      if (state >= sections.length - 1) return 0;
      return state + 1;
    });
  }, 2000);

  /** If we ever need different sizes here, add a `height: '12' | '...'` prop, adapt the height and translate-y classes, they need to match. */
  return (
    <div className={classNames("inline-block overflow-hidden h-6 sm:h-9")}>
      {sections.map((s, i) => {
        return (
          <div
            className={classNames(
              "transform-3d transition-transform h-0 duration-600 opacity-0",
              {
                "-translate-y-6 sm:-translate-y-9":
                  i !== index && i !== previousIndex,
                "-translate-y-0 opacity-100": i === index,
                // Translate animation doesn't work on Safari for some awkward reason, the text flickers in some insane fashion.
                "-rotate-x-180 opacity-100": i === previousIndex,
              }
            )}
            key={i}
          >
            {s}
          </div>
        );
      })}
    </div>
  );
};
