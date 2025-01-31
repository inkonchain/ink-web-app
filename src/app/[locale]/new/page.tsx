import { Metadata } from "next";

import { FlyWhenIntoView } from "@/components/FlyWhenIntoView";
import { JsonLd } from "@/components/JsonLd";
import { PageView } from "@/components/PageView";
import { containerClasses } from "@/components/styles/container";
import { classNames } from "@/util/classes";

import { AboutContent } from "../_components/AboutContent";
import { ContactContent } from "../_components/ContactContent/ContactContent";
import { DeveloperContent } from "../_components/DeveloperContent/DeveloperContent";
import { EventContent } from "../_components/EventContent/EventContent";
import { FloatingButtons, MainContent } from "../_components/MainContent";

export const metadata: Metadata = {
  metadataBase: new URL("https://inkonchain.com"),
  title: "Ink - DeFi unleashed by Kraken, built on the Superchain",
  description:
    "Ink is a cutting-edge Layer 2 (L2) blockchain built on Optimism's Superchain and released by Kraken. As a natural evolution of our mission, Ink will serve as a seamless bridge to DeFi, empowering users to move onchain with confidence and ease. Join the community today.",
  openGraph: {
    url: "/",
    images: [
      {
        url: "/goodbye-chaos-hello-ink.png",
        width: 1200,
        height: 630,
        alt: "Ink Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/goodbye-chaos-hello-ink.png"],
  },
};

export default async function HomePage() {
  return (
    <div>
      <JsonLd
        schema={{
          "@type": "Organization",
          name: "Ink",
          alternateName: "Kraken Ink",
          url: "https://inkonchain.com/",
          logo: "https://inkonchain.com/icon.svg?163528741f97f677",
          sameAs: [
            "https://x.com/inkonchain",
            "https://github.com/inkonchain",
            "https://discord.com/invite/inkonchain",
            "https://t.me/inkonchain",
          ],
        }}
      />
      <PageView />
      <div className="flex flex-col gap-12 lg:gap-28 mt-0 mb-12 lg:mb-24">
        <div
          className={containerClasses() + " mb-8 pb-8 sm:min-h-[calc(75vh)]"}
        >
          <MainContent />
          <FloatingButtons />
        </div>

        <div className={classNames(containerClasses(), "gap-16")}>
          <FlyWhenIntoView>
            <EventContent />
          </FlyWhenIntoView>
        </div>

        <div className={containerClasses()}>
          <AboutContent />
        </div>

        <div className={classNames(containerClasses(), "gap-16")}>
          <FlyWhenIntoView>
            <DeveloperContent />
          </FlyWhenIntoView>
        </div>

        <div>
          <div className={containerClasses()}>
            <ContactContent />
          </div>
        </div>
      </div>
    </div>
  );
}
