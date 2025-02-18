"use client";
import { Card } from "@inkonchain/ink-kit";
import { CardContent } from "@inkonchain/ink-kit";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { ColoredText } from "@/components/ColoredText";
import { FlyWhenIntoView } from "@/components/FlyWhenIntoView";
import { ParallaxedHoverImage } from "@/components/ParallaxedHoverImage";
import { useOnWindowSize } from "@/hooks/useOnWindowSize";
import { EXTERNAL_LINKS } from "@/routing";

import { PartnerCard } from "./PartnerCard";

export function AboutContent() {
  const isMobile = useOnWindowSize({ size: "sm" });
  const t = useTranslations("Landing");

  return (
    <>
      <Card
        image={
          <CardContent.Image>
            <ParallaxedHoverImage
              src={isMobile ? "/mobile-defi.webp" : "/defi.webp"}
              width={2048}
              height={2048}
              alt="ink"
            />
          </CardContent.Image>
        }
        imageLocation="left"
      >
        <CardContent.TitleAndDescription title="DeFi expectations" />
        <CardContent.CardInfos>
          <CardContent.CardInfo
            icon={
              <Image
                src="/icons/1s-block-times.svg"
                width={24}
                height={24}
                alt="Sub-second block times"
              />
            }
            title="Sub-second block times"
            description="1s block times Day 1, sub-second blocks coming soon."
          />

          <CardContent.CardInfo
            icon={
              <Image
                src="/icons/Smol-Gas.svg"
                width={24}
                height={24}
                alt="smol gas"
              />
            }
            title="Smol Gas"
            description="Ape more, pay less."
          />

          <CardContent.CardInfo
            icon={
              <Image
                src="/icons/Security.svg"
                width={24}
                height={24}
                alt="security"
              />
            }
            title="Security"
            description="Sequencer-level security to protect users from malicious intents and exploits."
          />

          <CardContent.CardInfo
            icon={
              <Image
                src="/icons/Interoperability.svg"
                width={24}
                height={24}
                alt="interoperability"
              />
            }
            title="Interoperability"
            description="A commitment to the seamless flow of capital across the Superchain and beyond."
          />

          <CardContent.CardInfo
            icon={
              <Image
                src="/icons/Unleashed-by-Kraken.svg"
                width={24}
                height={24}
                alt="Unleashed by kraken"
              />
            }
            title="Unleashed by Kraken"
            description="Ink will leverage Kraken's security and crypto expertise to support builders and users alike as they move towards independent financial sovereignty."
          />

          <CardContent.CardInfo
            icon={
              <Image
                src="/icons/ethereum-eth-logo.svg"
                width={24}
                height={24}
                alt="Scaling Ethereum"
              />
            }
            title="Scaling Ethereum"
            description="Ink is dedicated to scaling Ethereum with a powerful L2 that enhances performance and accessibility."
          />
        </CardContent.CardInfos>
      </Card>

      <div className="flex flex-col gap-6">
        <FlyWhenIntoView className="flex flex-col items-start gap-6 sm:gap-16">
          <ColoredText className="ink:text-h3" variant="purple">
            <h2>Unleashed by Kraken</h2>
          </ColoredText>
        </FlyWhenIntoView>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4 flex-wrap max-w-[1200px] mx-auto">
            <PartnerCard
              url={EXTERNAL_LINKS.optimism}
              image={
                <Image
                  className="object-contain w-[160px] aspect-square"
                  src="/icons/op.svg"
                  width={160}
                  height={160}
                  alt="op"
                  loading="eager"
                />
              }
              heading="Built on the Superchain"
              text="Built on the OP stack, one of the most trusted, scalable, and interoperable blockchains. Selected due to their commitment to building a better decentralized future for everyone."
            />
            <PartnerCard
              url={EXTERNAL_LINKS.kraken}
              image={
                <Image
                  className="object-contain h-[60px]"
                  src="/icons/kraken.svg"
                  width={512}
                  height={512}
                  alt="kraken logo"
                  loading="eager"
                />
              }
              heading="From the team behind Kraken"
              text="A market-leading exchange built on trust, experience and innovation with over 10 million users. One of the key voices in taking crypto to the world over the last 10+ years."
            />
          </div>
        </div>
      </div>
    </>
  );
}
