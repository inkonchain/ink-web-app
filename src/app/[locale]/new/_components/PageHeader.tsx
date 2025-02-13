import React from "react";

import { ColoredText } from "@/components/ColoredText";
import { classNames } from "@/util/classes";

interface PageHeaderProps {
  title: React.ReactNode;
  description: React.ReactNode;
  cta?: React.ReactNode;
  size?: "default" | "home";
}

export const PageHeader = ({
  title,
  description,
  cta,
  size = "default",
}: PageHeaderProps) => {
  return (
    <div
      className={classNames("flex flex-col flex-1", {
        "lg:gap-12 gap-6": size === "default",
        "lg:gap-16 gap-8": size === "home",
      })}
    >
      <div
        className={classNames("flex flex-col items-start gap-4", {
          "max-w-screen-lg": size === "default",
          "max-w-screen-2xl": size === "home",
        })}
      >
        <ColoredText
          className={classNames({
            "font-medium text-4xl sm:text-6xl": size === "default",
            "font-medium text-5xl sm:text-6xl md:text-[110px] lg:text-[120px] sm:leading-[95%] xl:text-[130px]":
              size === "home",
          })}
          variant="purple"
          dampen="md"
        >
          <h2>{title}</h2>
        </ColoredText>
        <div
          className={classNames("max-w-screen-lg", {
            "ink:text-body-1-regular ink:text-text-muted": size === "default",
            "ink:text-h5 ink:xl:text-h3": size === "home",
          })}
        >
          {description}
        </div>
      </div>
      {cta && <div className="flex flex-col items-start w-full">{cta}</div>}
    </div>
  );
};
