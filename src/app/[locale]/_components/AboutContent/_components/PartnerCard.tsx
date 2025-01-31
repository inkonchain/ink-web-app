import React from "react";

import { ColoredText } from "@/components/ColoredText";
import { FlyWhenIntoView } from "@/components/FlyWhenIntoView";
import { NoisyCard } from "@/components/Noisy";

interface PartnerCardProps {
  image: React.ReactNode;
  heading: string;
  text: string;
  url: string;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  image,
  heading,
  text,
  url,
}) => {
  return (
    <FlyWhenIntoView className="flex-1 min-w-[300px] max-w-[600px] flex flex-col">
      <NoisyCard
        className="flex-1 flex flex-col bg-white/30 dark:bg-black/30 min-h-full [box-shadow:0px_3px_34px_-10px_rgb(0_0_0_/_6%)]"
        url={url}
      >
        <div className="flex items-center justify-center sm:flex-1 h-[244px] sm:h-full">
          {image}
        </div>
        <div className="flex flex-col gap-4 justify-end">
          <ColoredText
            className="text-2xl font-medium"
            dampen="md"
            variant="purple"
          >
            <h3>{heading}</h3>
          </ColoredText>
          <div>{text}</div>
        </div>
      </NoisyCard>
    </FlyWhenIntoView>
  );
};
