import React from "react";

import { ConnectWalletButton } from "@/app/[locale]/_components/ConnectWalletButton";

import { HomeAppsToggle } from "../HomeAppsToggle/HomeAppsToggle";

export const HeaderContent: React.FC = () => {
  return (
    <div className="flex gap-2.5">
      <HomeAppsToggle />
      <ConnectWalletButton shrinkOnMobile />
    </div>
  );
};
