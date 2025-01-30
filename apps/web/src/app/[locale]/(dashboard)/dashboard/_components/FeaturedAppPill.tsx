import { PropsWithChildren } from "react";

export const FeaturedAppPill: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded-full backdrop-blur-xl px-4 py-2 transition-colors duration-200 bg-[#160F1F4D] dark:bg-[#211A2980] text-[#FFFFFF] dark:text-[#FFFFFF80] text-sm font-bold whitespace-nowrap">
      {children}
    </div>
  );
};

FeaturedAppPill.displayName = "FeaturedAppPill";
