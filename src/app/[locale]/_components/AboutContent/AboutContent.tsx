"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { BulletCard } from "@/components/BulletCard";
import { ColoredText } from "@/components/ColoredText";
import { FlyWhenIntoView } from "@/components/FlyWhenIntoView";
import { AboutBulletIcon } from "@/components/icons/bullets/About";
import { KeyboardShortcut } from "@/components/KeyboardShortcut";
import { PillLink } from "@/components/PillLink/PillLink";
import { SpotlightSection } from "@/components/SpotlightSection";
import { useOnWindowSize } from "@/hooks/useOnWindowSize";

import { MainCallToActionButton } from "../MainCallToActionButton";

import { PartnerCard } from "./_components/PartnerCard";

export const AboutContent = () => {
  const t = useTranslations("Landing");

  const isMobile = useOnWindowSize({ size: "sm" });

  return (
    <FlyWhenIntoView className="flex flex-col gap-10 lg:gap-8">
      <SpotlightSection
        image={
          <Image
            className="object-cover h-full"
            src={isMobile ? "/mobile-defi.webp" : "/defi.webp"}
            width={2048}
            height={2048}
            alt="ink"
          />
        }
        imagePosition="right"
        title={<h2>DeFi expectations</h2>}
        description={
          <div className="flex flex-col justify-between gap-11 sm:gap-15">
            <div className="grid grid-rows-auto grid-cols-1 sm:grid-cols-2 gap-4">
              <BulletCard
                icon={
                  <Image
                    src="/icons/1s-block-times.svg"
                    width={24}
                    height={24}
                    alt="Sub-second block times"
                  />
                }
                title="Sub-second block times"
              >
                1s block times Day 1, sub-second blocks coming soon.
              </BulletCard>
              <BulletCard
                icon={
                  <Image
                    src="/icons/Smol-Gas.svg"
                    width={24}
                    height={24}
                    alt="smol gas"
                  />
                }
                title="Smol Gas"
              >
                Ape more, pay less.
              </BulletCard>
              <BulletCard
                icon={
                  <Image
                    src="/icons/Security.svg"
                    width={24}
                    height={24}
                    alt="security"
                  />
                }
                title="Security"
              >
                Sequencer-level security to protect users from malicious intents
                and exploits.
              </BulletCard>
              <BulletCard
                icon={
                  <Image
                    src="/icons/Interoperability.svg"
                    width={24}
                    height={24}
                    alt="interoperability"
                  />
                }
                title="Interoperability"
              >
                A commitment to the seamless flow of capital across the
                Superchain and beyond.
              </BulletCard>
              <BulletCard
                icon={
                  <Image
                    src="/icons/Unleashed-by-Kraken.svg"
                    width={24}
                    height={24}
                    alt="Unleashed by kraken"
                  />
                }
                title="Unleashed by Kraken"
              >
                Ink will leverage Kraken{"'"}s security and crypto expertise to
                support builders and users alike as they move towards
                independent financial sovereignty.
              </BulletCard>
              <BulletCard
                icon={
                  <Image
                    src="/icons/ethereum-eth-logo.svg"
                    width={24}
                    height={24}
                    alt="Scaling Ethereum"
                  />
                }
                title="Scaling Ethereum"
              >
                Ink is dedicated to scaling Ethereum with a powerful L2 that
                enhances performance and accessibility.
              </BulletCard>
            </div>
            <div className="w-full sm:w-fit">
              <MainCallToActionButton
                copy={{
                  bridgeNow: t("bridge:cta"),
                  exploreApps: t("exploreApps:cta"),
                }}
              />
            </div>
          </div>
        }
        pill={
          <PillLink href="/#about">
            <AboutBulletIcon enforce="white" size="icon-lg" />
            <div>
              About <KeyboardShortcut enforce="white" letter="A" size="sm" />
            </div>
          </PillLink>
        }
      />

      <FlyWhenIntoView className="flex flex-col items-center gap-6 sm:gap-16 lg:my-20 my-6 px-4">
        <ColoredText
          className="text-5xl sm:text-7xl lg:text-very-large text-center font-medium"
          variant="purple"
        >
          <h2>
            Unleashed by
            <br />
            Kraken
          </h2>
        </ColoredText>

        <ColoredText
          variant="purple"
          className="text-xl sm:text-3xl text-center font-medium"
        >
          <h3>Unlock onchain financial sovereignty</h3>
        </ColoredText>
      </FlyWhenIntoView>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap max-w-[1200px] mx-auto">
          <PartnerCard
            url="https://www.optimism.io/"
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
            url="https://www.kraken.com/"
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
    </FlyWhenIntoView>
  );
};
