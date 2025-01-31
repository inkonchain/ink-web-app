import React from "react";

import { ColoredText } from "./ColoredText";

export interface BigScalableTitleProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /**
   * Ratio of the title to the viewport width. TBH just test some values and see what works best.
   * Examples:
   *  Main title "Ink the future" is 8vw
   *  Community page title "Join the Ink Community" is 4vw
   * */
  ratio?: 2 | 4 | 8;
}

export const BigScalableTitle: React.FC<BigScalableTitleProps> = ({
  title,
  subtitle,
  ratio = 8,
}) => {
  return (
    <div
      style={
        {
          "--ratio": `${ratio}vw`,
        } as React.CSSProperties
      }
      className="flex flex-col items-center gap-[calc(clamp(1rem,min(var(--ratio)+1rem,2vh),200px)/3)] px-4"
    >
      <ColoredText
        noisy
        variant="reverse-purple"
        className="font-medium antialiased"
        pulse="md"
      >
        <div className="text-[clamp(3rem,min(var(--ratio)+1rem,15vh),100px)] leading-[clamp(4rem,var(--ratio)*1.75,165px)] text-center">
          {title}
        </div>
      </ColoredText>
      {subtitle}
    </div>
  );
};
