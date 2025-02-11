import React from "react";
import { Card } from "@inkonchain/ink-kit";

import { ColoredText } from "@/components/ColoredText";
import { FlyWhenIntoView } from "@/components/FlyWhenIntoView";
import { HrefProp, Link } from "@/routing";

interface PartnerCardProps {
  image: React.ReactNode;
  heading: string;
  text: string;
  url: HrefProp;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  image,
  heading,
  text,
  url,
}) => {
  return (
    <FlyWhenIntoView className="flex-1 min-w-[300px] flex flex-col">
      <Card
        variant="secondary"
        clickable
        className="flex flex-col flex-1"
        asChild
      >
        <Link className="flex-1" href={url}>
          <div className="flex items-center justify-center h-[244px]">
            {image}
          </div>
          <div className="flex flex-col gap-4 justify-end">
            <ColoredText className="ink:text-h5" dampen="md" variant="purple">
              <h3>{heading}</h3>
            </ColoredText>
            <div className="ink:text-body-2-regular ink:text-text-muted">
              {text}
            </div>
          </div>
        </Link>
      </Card>
    </FlyWhenIntoView>
  );
};
