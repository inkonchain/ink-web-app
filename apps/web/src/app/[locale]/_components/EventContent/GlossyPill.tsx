import React from "react";

import { IconProps } from "@/components/icons/types";

export interface GlossyPillProps {
  Icon: React.FC<IconProps>;
  text: string;
}

export const GlossyPill = ({ Icon, text }: GlossyPillProps) => {
  return (
    <div className="flex items-center justify-center gap-2 rounded-full bg-glossyPill px-4 py-2 backdrop-blur-[48px]">
      <span className="flex items-center gap-2 py-0.5 text-sm font-bold leading-[18px] text-white">
        {<Icon size="icon-md" className="text-white/50" enforce="inherit" />}
        {text}
      </span>
    </div>
  );
};

GlossyPill.displayName = "GlossyPill";
