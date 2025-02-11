"use client";
import { Card, CardContent, InkIcon } from "@inkonchain/ink-kit";
import { useTranslations } from "next-intl";

import { BigScalableTitle } from "@/components/BigScallableTitle";
import { FlyWhenIntoView } from "@/components/FlyWhenIntoView";
import { newLayoutSectionClasses } from "@/components/styles/container";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { EXTERNAL_LINKS, Link } from "@/routing";
import { classNames } from "@/util/classes";

export const LetsGetSocial = () => {
  const newNav = useFeatureFlag("newNav");
  const t = useTranslations("Community");

  return (
    <FlyWhenIntoView
      className={classNames(newLayoutSectionClasses(), {
        "items-start": newNav,
        "items-center": !newNav,
      })}
    >
      <div
        className={classNames("flex flex-col gap-6", {
          "items-start": newNav,
          "items-center": !newNav,
        })}
      >
        <BigScalableTitle
          title={t("letsGetSocial.title")}
          subtitle={
            <span
              className={classNames("ink:text-body-1 ink:text-text-muted", {
                "text-center": newNav,
                "text-left": !newNav,
              })}
            >
              {t("letsGetSocial.description")}
            </span>
          }
          ratio={2}
          align={newNav ? "left" : "center"}
        />
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6 self-center">
        <Card className="w-full" variant="secondary" clickable asChild>
          <Link href={EXTERNAL_LINKS.twitter}>
            <CardContent.Link
              title={t("twitter.title")}
              description={t("twitter.description")}
              icon={<InkIcon.Social.X />}
              linkIcon={<ExternalLinkArrow />}
            />
          </Link>
        </Card>
        <Card variant="secondary" clickable asChild>
          <Link href={EXTERNAL_LINKS.discord}>
            <CardContent.Link
              title={t("discord.title")}
              description={t("discord.description")}
              icon={<InkIcon.Social.Discord />}
              linkIcon={<ExternalLinkArrow />}
            />
          </Link>
        </Card>
        <Card variant="secondary" clickable asChild>
          <Link href={EXTERNAL_LINKS.telegram}>
            <CardContent.Link
              title={t("telegram.title")}
              description={t("telegram.description")}
              icon={<InkIcon.Social.Telegram />}
              linkIcon={<ExternalLinkArrow />}
            />
          </Link>
        </Card>
        <Card variant="secondary" clickable asChild>
          <Link href={EXTERNAL_LINKS.farcaster}>
            <CardContent.Link
              title={t("farcaster.title")}
              description={t("farcaster.description")}
              icon={<InkIcon.Social.Farcaster />}
              linkIcon={<ExternalLinkArrow />}
            />
          </Link>
        </Card>
      </div>
    </FlyWhenIntoView>
  );
};

export const ExternalLinkArrow = () => {
  return <InkIcon.Arrow className="size-4 rotate-225" />;
};
