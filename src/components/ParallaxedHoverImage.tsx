import React from "react";
import Image, { ImageProps } from "next/image";

import { classNames } from "@/util/classes";

import {
  MagneticHoverEffect,
  MagneticHoverEffectProps,
} from "./MagneticHoverEffect";

export interface ParallaxedHoverImageProps extends ImageProps {
  blendMode?: MagneticHoverEffectProps["blendMode"];
}

export const ParallaxedHoverImage: React.FC<ParallaxedHoverImageProps> = ({
  blendMode,
  ...props
}) => {
  return (
    <MagneticHoverEffect
      easeType="ease"
      direction="opposite"
      maxDistanceX={0.1}
      maxDistanceY={0.1}
      className="w-full h-full"
      blendMode={blendMode}
    >
      <Image
        {...props}
        alt={props.alt}
        className={classNames(
          "object-cover scale-110 object-center w-full h-full",
          props.className
        )}
        draggable={false}
      />
    </MagneticHoverEffect>
  );
};
