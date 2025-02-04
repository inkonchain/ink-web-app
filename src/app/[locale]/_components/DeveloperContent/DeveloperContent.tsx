"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/Button/ButtonLink";
import { ColoredText } from "@/components/ColoredText";
import { ArrowRightIcon } from "@/components/icons/ArrowRight";
import { BridgeBulletIcon } from "@/components/icons/bullets/Bridge";
import { BuildersBulletIcon } from "@/components/icons/bullets/Builders";
import { DocsBulletIcon } from "@/components/icons/bullets/Docs";
import { FaucetBulletIcon } from "@/components/icons/bullets/Faucet";
import { GitHubBulletIcon } from "@/components/icons/bullets/GitHub";
import { StatusBulletIcon } from "@/components/icons/bullets/Status";
import { TestnetBulletIcon } from "@/components/icons/bullets/Testnet";
import { KeyboardShortcut } from "@/components/KeyboardShortcut";
import { PillLink } from "@/components/PillLink/PillLink";
import { SpotlightSection } from "@/components/SpotlightSection";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { useOnWindowSize } from "@/hooks/useOnWindowSize";
import { EXTERNAL_LINKS } from "@/routing";

import { MailButton } from "../MailButton/MailButton";
import { MainCallToActionButton } from "../MainCallToActionButton";
import { SubscribeButton } from "../SubscribeButton/SubscribeButton";

export const DeveloperContent = () => {
  const t = useTranslations("Landing");
  const isMainnet = useFeatureFlag("mainnet");

  const isMobile = useOnWindowSize({ size: "sm" });

  return (
    <>
      <div className="flex flex-col gap-8 relative">
        <SpotlightSection
          title={<h2>Write your code with Ink</h2>}
          image={
            <Image
              className="object-cover h-full"
              src={isMobile ? "/mobile-builder.webp" : "/builder.webp"}
              width={2048}
              height={2048}
              alt="ink"
            />
          }
          imagePosition="left"
          description={
            <div className="flex flex-col justify-between gap-11 leading-6">
              <div className="gap-3 flex flex-col">
                <p>
                  The next chapter of DeFi will be written with Ink. Ink is the
                  bridge between users and the builders shaping DeFi. Powered by
                  the Superchain and fortified by over a decade of crypto
                  expertise, this is where visionary builders turn code into
                  financial revolutions.
                </p>
                <p>
                  Our commitment to builders: Ink will provide you with a world-
                  class development environment, complete with the tools,
                  support, and users you need to bring your ideas to life.
                </p>
                <p>
                  {isMainnet ? (
                    <>
                      Ink mainnet has now been unleashed! To stay updated, join
                      below.
                    </>
                  ) : (
                    <>
                      Ink&apos;s testnet will be released soon. To stay updated,
                      join below.
                    </>
                  )}
                </p>
              </div>
              <div className="flex flex-col items-start justify-center gap-4">
                <div className="flex flex-wrap gap-6 lg:gap-4">
                  <div className="w-full sm:w-[300px]">
                    <ButtonLink
                      href={EXTERNAL_LINKS.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                      variant="link"
                    >
                      <div className="flex items-center gap-3">
                        <DocsBulletIcon
                          enforce="white"
                          className="shrink-0"
                          size="icon-lg"
                        />
                        <ColoredText variant="purple-light" dampen="lg">
                          Docs
                        </ColoredText>
                      </div>
                      <ArrowRightIcon enforce="white" size="icon-xl" />
                    </ButtonLink>
                  </div>
                  <div className="w-full sm:w-[300px]">
                    <ButtonLink
                      href={EXTERNAL_LINKS.inkKit}
                      rel="noopener noreferrer"
                      target="_blank"
                      size="lg"
                      variant="link"
                    >
                      <div className="flex items-center gap-3">
                        <GitHubBulletIcon
                          enforce="white"
                          className="shrink-0"
                          size="icon-lg"
                        />
                        <ColoredText variant="purple-light" dampen="lg">
                          Ink Kit
                        </ColoredText>
                      </div>
                      <ArrowRightIcon enforce="white" size="icon-xl" />
                    </ButtonLink>
                  </div>
                  <div className="w-full sm:w-[300px]">
                    <ButtonLink
                      href={EXTERNAL_LINKS.status}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                      variant="link"
                    >
                      <div className="flex items-center gap-3">
                        <StatusBulletIcon
                          enforce="white"
                          className="shrink-0"
                          size="icon-lg"
                        />
                        <ColoredText variant="purple-light" dampen="lg">
                          Status
                        </ColoredText>
                      </div>
                      <ArrowRightIcon enforce="white" size="icon-xl" />
                    </ButtonLink>
                  </div>
                  <div className="w-full sm:w-[300px]">
                    <ButtonLink
                      href={
                        isMainnet
                          ? EXTERNAL_LINKS.mainnetExplorerBlockscout
                          : EXTERNAL_LINKS.testnetExplorerBlockscout
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                      variant="link"
                    >
                      <div className="flex items-center gap-3">
                        <TestnetBulletIcon
                          enforce="white"
                          className="shrink-0"
                          size="icon-lg"
                        />
                        <ColoredText variant="purple-light" dampen="lg">
                          Explorer
                        </ColoredText>
                      </div>
                      <ArrowRightIcon enforce="white" size="icon-xl" />
                    </ButtonLink>
                  </div>
                  <div className="w-full sm:w-[300px]">
                    <ButtonLink
                      href="/faucet"
                      rel="noopener noreferrer"
                      size="lg"
                      variant="link"
                    >
                      <div className="flex items-center gap-3">
                        <FaucetBulletIcon
                          enforce="white"
                          className="shrink-0"
                          size="icon-lg"
                        />
                        <ColoredText variant="purple-light" dampen="lg">
                          Testnet Faucet
                        </ColoredText>
                      </div>
                      <ArrowRightIcon enforce="white" size="icon-xl" />
                    </ButtonLink>
                  </div>
                  <div className="w-full sm:w-[300px]">
                    <ButtonLink
                      href={EXTERNAL_LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                      variant="link"
                    >
                      <div className="flex items-center gap-3">
                        <GitHubBulletIcon
                          enforce="white"
                          className="shrink-0"
                          size="icon-lg"
                        />
                        <ColoredText variant="purple-light" dampen="lg">
                          Github
                        </ColoredText>
                      </div>
                      <ArrowRightIcon enforce="white" size="icon-xl" />
                    </ButtonLink>
                  </div>
                  {!isMainnet && (
                    <div className="w-full sm:w-[300px]">
                      <ButtonLink
                        href="/testnet-bridge"
                        rel="noopener noreferrer"
                        size="lg"
                        variant="link"
                      >
                        <div className="flex items-center gap-3">
                          <BridgeBulletIcon
                            enforce="white"
                            className="shrink-0"
                            size="icon-lg"
                          />
                          <ColoredText variant="purple-light" dampen="lg">
                            Bridge
                          </ColoredText>
                        </div>
                        <ArrowRightIcon enforce="white" size="icon-xl" />
                      </ButtonLink>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-4">
                <div className="flex flex-wrap gap-6 lg:gap-4">
                  <div className="w-full sm:w-fit">
                    <MainCallToActionButton
                      copy={{
                        bridgeNow: t("bridge:cta"),
                        exploreApps: t("exploreApps:cta"),
                      }}
                    />
                  </div>
                  <div className="w-full sm:w-fit">
                    <SubscribeButton />
                  </div>
                  <div className="w-full sm:w-auto">
                    <MailButton />
                  </div>
                </div>
              </div>
            </div>
          }
          pill={
            <PillLink href="/#builders">
              <BuildersBulletIcon enforce="white" size="icon-lg" />
              <div>
                Builders{" "}
                <KeyboardShortcut enforce="white" letter="D" size="sm" />
              </div>
            </PillLink>
          }
        />
      </div>
    </>
  );
};
