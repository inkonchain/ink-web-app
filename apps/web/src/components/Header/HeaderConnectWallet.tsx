"use client";

import { Suspense } from "react";

import { ConnectWalletButton } from "@/app/[locale]/_components/ConnectWalletButton";

import { OnlyWithFeatureFlag } from "../OnlyWithFeatureFlag";

import { HeaderContent } from "./HeaderContent";

export const HeaderConnectWallet = () => {
  return (
    <Suspense fallback={<></>}>
      <OnlyWithFeatureFlag flag="mainnet" otherwise={<ConnectWalletButton />}>
        <HeaderContent />
      </OnlyWithFeatureFlag>
    </Suspense>
  );
};
