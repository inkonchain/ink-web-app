import { PropsWithChildren } from "react";

import { classNames } from "@/util/classes";

import { NoisyContainer } from "./NoisyContainer";

interface NoisyCardProps extends PropsWithChildren {
  className?: string;
  url: string;
}

export const NoisyCard: React.FC<NoisyCardProps> = ({
  className,
  children,
  url,
}) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex-1">
      <NoisyContainer
        className={classNames(
          "flex gap-8 p-12 bg-whiteMagic/25 dark:bg-blackMagic/25",
          className
        )}
        rounded="events"
      >
        {children}
      </NoisyContainer>
    </a>
  );
};
