import { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";
import { PageView } from "@/components/PageView";
import { containerClasses } from "@/components/styles/container";

import { FloatingButtons } from "../../_components/MainContent";
import { HomeShortcuts } from "../HomeShortcuts";

import { SmartWallet } from "./_components/SmartWallet";
import { UsernameProvider } from "./context/UsernameContext";
import { ZeroDevProvider } from "./context/ZerodevContext";

export const metadata: Metadata = {
  title: "Ink Smart Wallet - DeFi unleashed by Kraken, built on the Superchain",
  description:
    "Experience the next generation of wallets with Ink Smart Wallet. Built on the Superchain, our smart wallet combines security, flexibility, and ease of use to enhance your DeFi experience.",
};

export default async function SmartWalletPage() {
  return (
    <OnlyWithFeatureFlag flag="experimental">
      <JsonLd
        schema={{
          "@type": "WebApplication",
          name: "Ink Smart Wallet",
          alternateName: "Kraken Ink Smart Wallet",
          url: "https://inkonchain.com/smart-wallet",
          image: "https://inkonchain.com/icon.svg?163528741f97f677",
          applicationCategory: "Blockchain Development Tool",
          operatingSystem: "Any",
          description: "Next generation smart wallet for the Ink ecosystem",
        }}
      />

      <PageView />
      <HomeShortcuts />
      <div className="relative">
        <div className="flex flex-col gap-8 mt-24 sm:mt-32 mb-12 lg:mb-24">
          <div
            className={containerClasses() + " mb-8 pb-8 sm:min-h-[calc(85vh)]"}
          >
            <UsernameProvider>
              <ZeroDevProvider>
                <SmartWallet />
              </ZeroDevProvider>
            </UsernameProvider>
          </div>
        </div>

        <FloatingButtons showCountdown={false} />
      </div>
    </OnlyWithFeatureFlag>
  );
}
