import React, { useState } from "react";

import { useOnInterval } from "@/hooks/useOnInterval";
import { classNames } from "@/util/classes";

export interface RotatingTextProps {
  sections: React.ReactNode[];
}

export const RotatingText: React.FC<RotatingTextProps> = ({ sections }) => {
  const [index, setIndex] = useState(0);
  const previousIndex = index - 1 < 0 ? sections.length - 1 : index - 1;
  useOnInterval(() => {
    setIndex((state) => {
      if (state >= sections.length - 1) return 0;
      return state + 1;
    });
  }, 2000);

  return (
    /** This height absolutely must match the translate-y value in the animation classes. */
    <div className={classNames("inline-block overflow-hidden h-12")}>
      {sections.map((s, i) => {
        return (
          <div
            className={classNames(
              "transition-transform h-0 duration-600 opacity-0 transform rotate-x-0",
              {
                "-translate-y-12": i !== index && i !== previousIndex,
                "-translate-y-0 opacity-100": i === index,
                // Translate animation doesn't work on Safari for some awkward reason, the text flickers in some insane fashion.
                "-rotate-x-90 translate-y-12 opacity-100": i === previousIndex,
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
