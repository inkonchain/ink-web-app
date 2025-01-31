"use client";

import { BridgeButton } from "@/components/BridgeButton";
import { ColoredText } from "@/components/ColoredText";
import { WalletConnector } from "@/components/WalletConnector";

import { HeaderFaucetButton } from "./HeaderFaucetButton";

export const WalletHeader = () => {
  return (
    <>
      <div className="absolute top-32 left-0 right-0 flex items-center justify-center mx-auto gap-8 z-[5]">
        <ColoredText className="text-3xl select-none" variant="purple">
          EXPERIMENTAL:
        </ColoredText>
        <HeaderFaucetButton />
        <WalletConnector />
        <BridgeButton />
      </div>
    </>
  );
};
