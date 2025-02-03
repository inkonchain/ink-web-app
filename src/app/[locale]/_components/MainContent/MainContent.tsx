"use client";
import React from "react";
import { Button } from "@inkonchain/ink-kit";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { BigScalableTitle } from "@/components/BigScallableTitle";
import { ColoredText } from "@/components/ColoredText";
import { HeroSection } from "@/components/HeroSection";
import { DotsIcon } from "@/components/icons/Dots";
import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";
import { PillContainer } from "@/components/PillContainer";
import { RotatingText } from "@/components/RotatingText";
import { SocialLinksRow } from "@/components/SocialLinksRow";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { EXTERNAL_LINKS, Link } from "@/routing";

import { MainCallToActionButton } from "../MainCallToActionButton";

import { Countdown } from "./Countdown";

export const MainContent: React.FC<{
  disableRotating?: boolean;
}> = ({ disableRotating }) => {
  const t = useTranslations("Landing");
  const query = useRouterQuery();

  return (
    <HeroSection>
      <BigScalableTitle
        title={<h1>{t("mainContentTagLine")}</h1>}
        subtitle={
          <TagLineWithHighlight
            text={t("mainContentSubTagLine")}
            disableRotating={disableRotating}
          />
        }
      />
      <div className="flex flex-col items-center gap-5 sm:gap-6">
        <div className="flex gap-4 flex-col md:flex-row">
          <OnlyWithFeatureFlag
            flag="newNav"
            otherwise={
              <>
                <MainCallToActionButton
                  copy={{
                    bridgeNow: t("bridge:cta"),
                    exploreApps: t("exploreApps:cta"),
                  }}
                  isMainCallToAction
                />

                <Button
                  className="bg-blackMagic hover:shadow-blue-glow backdrop-blur-2xl hover:bg-blackMagic/80 dark:hover:bg-blackMagic/40 transition-all duration-300 text-white px-20"
                  iconLeft={<DotsIcon size="icon-lg" enforce="inherit" />}
                  size="lg"
                  asChild
                >
                  <Link
                    href={{
                      pathname: "/dashboard",
                      query,
                    }}
                  >
                    {t("exploreApps:cta")}
                  </Link>
                </Button>
              </>
            }
          >
            <MainCallToActionButton
              copy={{
                bridgeNow: t("bridge:cta"),
                exploreApps: t("exploreApps:cta"),
              }}
              isMainCallToAction
            />
          </OnlyWithFeatureFlag>
        </div>
        <SocialLinksRow faded={true} />
      </div>

      <div className="flex flex-col gap-6 items-center sm:hidden">
        <Link
          className="xl:hidden"
          href={EXTERNAL_LINKS.superchain}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/superchain-centered.svg"
            width={140}
            height={34}
            alt="built on the superchain"
            className="dark:invert"
          />
        </Link>
      </div>

      <div className="sm:hidden">
        <Countdown />
      </div>
    </HeroSection>
  );
};

const TagLineWithHighlight: React.FC<{
  text?: string;
  disableRotating?: boolean;
}> = ({ text, disableRotating }) => {
  const [first, second] = text?.split("|") || [];
  const sections = second?.split(",") || [];
  return (
    <div className="flex items-baseline gap-2 text-rotating-pill sm:text-h3 flex-wrap justify-center font-medium">
      {/** Height should match the height of the PillContainer+Rotating text for the text to be aligned. */}
      <ColoredText
        className="whitespace-normal flex justify-center"
        variant="purple"
        dampen="md"
      >
        {first}
      </ColoredText>
      {!disableRotating && (
        <PillContainer className="text-krakenPurple dark:text-gradientPurple text-center flex items-center justify-center">
          <RotatingText
            sections={sections.map((s, i) => {
              return i === sections.length - 1 ? (
                <ColoredText variant="reverse-purple">{s}</ColoredText>
              ) : (
                s
              );
            })}
          />
        </PillContainer>
      )}
    </div>
  );
};
