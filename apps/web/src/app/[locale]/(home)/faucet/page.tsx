import { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { PageView } from "@/components/PageView";
import { containerClasses } from "@/components/styles/container";

import { FloatingButtons } from "../../_components/MainContent";
import { HomeShortcuts } from "../HomeShortcuts";

import { Faucet } from "./_components/Faucet";

export const metadata: Metadata = {
  metadataBase: new URL("https://inkonchain.com"),
  title: "Ink Faucet - DeFi unleashed by Kraken, built on the Superchain",
  description:
    "Get started with Ink, Kraken's cutting-edge Layer 2 (L2) blockchain built on the Superchain. Our faucet provides free testnet ETH tokens to help developers and users explore DeFi possibilities in a safe environment. Start building and testing your applications on Ink today.",
  openGraph: {
    images: [
      {
        url: "/faucet.png",
        width: 1200,
        height: 630,
        alt: "Ink Faucet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/faucet.png"],
  },
};

export default function FaucetPage() {
  return (
    <>
      <JsonLd
        schema={{
          "@type": "WebApplication",
          name: "Ink Faucet",
          alternateName: "Kraken Ink Faucet",
          url: "https://inkonchain.com/faucet",
          image: "https://inkonchain.com/icon.svg?163528741f97f677",
          applicationCategory: "Blockchain Development Tool",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Get testnet ETH tokens for development and testing on Ink, Kraken's Layer 2 (L2) blockchain",
        }}
      />
      <PageView />
      <HomeShortcuts />
      <div className="flex flex-col gap-8 mt-0 mb-12 lg:mb-24 pt-16 sm:pt-0">
        <div
          className={containerClasses() + " mb-8 pb-8 sm:min-h-[calc(85vh)]"}
        >
          <Faucet />
          <FloatingButtons showCountdown={false} />
        </div>
      </div>
    </>
  );
}
