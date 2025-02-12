"use client";
import { Button } from "@inkonchain/ink-kit";
import { useTranslations } from "next-intl";

import { ColoredText } from "@/components/ColoredText";
import { FlyWhenIntoView } from "@/components/FlyWhenIntoView";
import { ParallaxedHoverImage } from "@/components/ParallaxedHoverImage";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { EXTERNAL_LINKS, Link } from "@/routing";
import { classNames } from "@/util/classes";

export const CommunityBrandKit = () => {
  const newNav = useFeatureFlag("newNav");
  const t = useTranslations("Community");

  return (
    <FlyWhenIntoView>
      <div
        className={classNames(
          "flex flex-col-reverse lg:flex-row items-center justify-between lg:gap-6 bg-featuredCardPurple relative rounded-spotlight-mobile overflow-hidden",
          newNav ? "" : "mx-4"
        )}
      >
        <div className="flex flex-col gap-4 px-14 py-16">
          <ColoredText
            variant="purple"
            className="ink:text-h2 -my-4 ink:text-text-default"
          >
            {t("brandKit.title")}
          </ColoredText>
          <div className="ink:text-body-1 ink:text-text-primary">
            {t("brandKit.description")}
          </div>
          <div className="w-fit">
            <Button variant="primary" size="md" asChild>
              <Link
                href={EXTERNAL_LINKS.brandKit}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("brandKit.cta")}
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-spotlight-mobile overflow-visible w-full h-full max-w-[700px]">
          <ParallaxedHoverImage
            src="/brand-kit.png"
            alt="Brand Kit"
            className="object-cover"
            width={700}
            height={395}
          />
        </div>
      </div>
    </FlyWhenIntoView>
  );
};
