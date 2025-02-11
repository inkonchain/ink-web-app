import { PropsWithChildren } from "react";

import { classNames } from "@/util/classes";

import { ColoredText } from "./ColoredText";
import { NoisyContainer } from "./Noisy";

export interface BulletCardProps extends PropsWithChildren {
  className?: string;
  icon: React.ReactNode;
  title: React.ReactNode;
}

export const BulletCard: React.FC<BulletCardProps> = ({
  title,
  className,
  icon,
  children,
}) => {
  return (
    <NoisyContainer
      className={classNames(
        "flex flex-col justify-start items-start flex-1 gap-2 p-4 px-6",
        className
      )}
      rounded="3xl"
    >
      <div className="flex items-center sm:flex-col sm:items-start gap-4 sm:gap-2">
        <div className="self-start mt-1.5 sm:mt-0 sm:self-auto aspect-square w-6 shrink-0">
          {icon}
        </div>
        <div className="flex flex-col">
          <ColoredText className="text-2xl font-medium" variant="purple-light">
            <h3>{title}</h3>
          </ColoredText>
          <div className="text-whiteMagic text-base">{children}</div>
        </div>
      </div>
    </NoisyContainer>
  );
};
