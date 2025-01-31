import React, { PropsWithChildren } from "react";

import { classNames } from "@/util/classes";

import { ColoredText } from "./ColoredText";
import { MagneticHoverEffect } from "./MagneticHoverEffect";
import { NoisyContainer } from "./Noisy";

export interface SpotlightSectionProps {
  title: React.ReactNode;
  description: React.ReactNode;
  image: React.ReactNode;
  imagePosition: "left" | "right";
  pill: React.ReactNode;
}

export const SpotlightSection: React.FC<SpotlightSectionProps> = ({
  title,
  description,
  image,
  imagePosition,
  pill,
}) => {
  return (
    <div
      className={classNames(
        "flex flex-wrap bg-softDarkPurple p-3 pb-6 lg:p-6 rounded-spotlight-mobile lg:rounded-spotlight flex-1 gap-8 lg:gap-0",
        {
          "flex-row-reverse": imagePosition === "right",
        }
      )}
    >
      <ImageContainer>{image}</ImageContainer>
      <div className="flex-1 flex">
        <div
          className={classNames(
            "flex flex-col lg:p-9 gap-11 lg:gap-32 justify-between flex-1",
            {
              "lg:pr-15": imagePosition === "right",
              "lg:pl-15": imagePosition === "left",
            }
          )}
        >
          {pill && <div className="w-fit">{pill}</div>}

          <div className="flex flex-col gap-4 sm:gap-9 relative px-4 lg:px-0">
            <ColoredText
              className="text-4xl sm:text-7xl font-medium"
              dampen="md"
              variant="purple-light"
            >
              {title}
            </ColoredText>
            <div className="flex-1 flex flex-col justify-between gap-6 text-whiteMagic text-lg font-normal">
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageContainer: React.FC<PropsWithChildren> = ({ children }) => (
  <NoisyContainer
    className="overflow-hidden flex flex-1 box-border basis-full lg:basis-0"
    rounded="spotlight"
  >
    <MagneticHoverEffect
      className="w-full h-full flex-1 box-border basis-0"
      easeType="ease"
      direction="opposite"
      maxDistanceX={0.1}
      maxDistanceY={0.1}
    >
      <div className="h-full scale-110">{children}</div>
    </MagneticHoverEffect>
  </NoisyContainer>
);
