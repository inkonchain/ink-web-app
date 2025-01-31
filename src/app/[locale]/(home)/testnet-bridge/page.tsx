import { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { PageView } from "@/components/PageView";
import { containerClasses } from "@/components/styles/container";

import { FloatingButtons } from "../../_components/MainContent";
import { HomeShortcuts } from "../HomeShortcuts";

import { Bridge } from "./_components/Bridge";
import {
  BridgeTransactionModal,
  BridgeTransactionModalContextProvider,
} from "./_components/BridgeTransactionModal";

export const metadata: Metadata = {
  title:
    "Ink Bridge - Seamlessly transfer assets across networks on the Superchain",
  description:
    "Transfer assets securely between networks with Ink Bridge, part of Kraken's Layer 2 (L2) blockchain ecosystem built on the Superchain. Experience fast, cost-effective cross-chain transactions with institutional-grade security. Connect your wallet and start bridging assets today.",
};

export default function BridgePage() {
  return (
    <BridgeTransactionModalContextProvider>
      <JsonLd
        schema={{
          "@type": "WebApplication",
          name: "Ink Bridge",
          alternateName: "Kraken Ink Bridge",
          url: "https://inkonchain.com/testnet-bridge",
          image: "https://inkonchain.com/icon.svg?163528741f97f677",
          applicationCategory: "Blockchain Development Tool",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Transfer assets seamlessly between networks using Ink Bridge",
        }}
      />
      <PageView />
      <HomeShortcuts />
      <div className="flex flex-col gap-8 mt-0 mb-12 lg:mb-24 pt-2 sm:pt-0">
        <div
          className={
            containerClasses() +
            " mb-8 pb-8 sm:min-h-[calc(85vh)] flex flex-col justify-center items-center"
          }
        >
          <Bridge />
          <FloatingButtons showCountdown={false} />
        </div>
      </div>
      <BridgeTransactionModal />
    </BridgeTransactionModalContextProvider>
  );
}
