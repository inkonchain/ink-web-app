import React from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/Button/Button";
import { FlyWhenIntoView } from "@/components/FlyWhenIntoView";
import { TwitterIcon } from "@/components/icons/Twitter";
import { PurpleSpotlightSection } from "@/components/PurpleSpotlightSection";
import { EXTERNAL_LINKS, Link } from "@/routing";

import { MainCallToActionButton } from "../MainCallToActionButton";

export interface ContactContentProps {}

export const ContactContent: React.FC<ContactContentProps> = ({}) => {
  const t = useTranslations("Landing");
  return (
    <FlyWhenIntoView className="w-full">
      <PurpleSpotlightSection
        title={
          <>
            The future isn&apos;t written,
            <br />
            it&apos;s waiting to be inked.
          </>
        }
        callToAction={
          <>
            <div className="w-full sm:w-fit">
              <MainCallToActionButton
                variant="spotlight"
                copy={{
                  bridgeNow: t("bridge:cta"),
                  exploreApps: t("exploreApps:cta"),
                }}
              />
            </div>
            <Link
              href={EXTERNAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-fit"
            >
              <Button
                variant="spotlight"
                size="lg"
                compact
                icon={<TwitterIcon size="icon-lg" enforce="inherit" />}
                className="font-bold group"
              >
                Follow Us
              </Button>
            </Link>
          </>
        }
      />
    </FlyWhenIntoView>
  );
};
