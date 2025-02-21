import React from "react";

import { ColoredText } from "@/components/ColoredText";
import { classNames } from "@/util/classes";

interface PageHeaderProps {
  title: React.ReactNode;
  description: React.ReactNode;
  cta?: React.ReactNode;
  size?: "default" | "home" | "section";
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
        "gap-4": size === "section",
      })}
    >
      <div
        className={classNames("flex flex-col items-start gap-4", {
          "max-w-screen-lg": size === "default" || size === "section",
          "max-w-screen-2xl": size === "home",
        })}
      >
        <ColoredText
          className={classNames({
            "ink:text-h2": size === "default",
            "font-medium text-5xl sm:text-6xl md:text-[110px] lg:text-[120px] sm:leading-[95%] xl:text-[130px] lg:tracking-tight":
              size === "home",
            "ink:text-h3": size === "section",
          })}
          variant="ink"
        >
          <h2>{title}</h2>
        </ColoredText>
        <div
          className={classNames("max-w-screen-lg", {
            "ink:text-body-2-regular sm:text-[length:var(--ink-text-body-1-regular)] sm:leading-[var(--ink-text-body-1-regular--line-height)] ink:text-text-muted":
              size === "default" || size === "section",
            "ink:text-h5 lg:text-[length:var(--ink-text-h3)] lg:leading-[var(--ink-text-h3--line-height)]":
              size === "home",
          })}
        >
          {description}
        </div>
      </div>
      {cta && <div className="flex flex-col items-start w-full">{cta}</div>}
    </div>
  );
};
