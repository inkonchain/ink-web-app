import React from "react";

import { classNames } from "@/util/classes";

interface VerifyInfoCardProps {
  className?: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

export const VerifyInfoCard = ({
  className,
  icon,
  title,
  description,
}: VerifyInfoCardProps) => {
  return (
    <div
      className={classNames(
        "flex items-start justify-start gap-4 p-4 pb-6 sm:py-12 bg-featuredCardPurple backdrop-blur-xl relative rounded-spotlight-mobile flex-col sm:flex-row",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex shrink-0">{icon}</div>
        <h3 className="ink:text-h4 font-bold ink:text-text-default pl-2">
          {title}
        </h3>
        <div className="ink:text-body-2-regular ink:text-text-muted ink:text-text-muted pl-2">
          {description}
        </div>
      </div>
    </div>
  );
};
