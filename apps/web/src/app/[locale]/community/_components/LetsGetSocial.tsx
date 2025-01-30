"use client";
import { InkIcon } from "@inkonchain/ink-kit";
import { useTranslations } from "next-intl";

import { BigScalableTitle } from "@/components/BigScallableTitle";
import { FlyWhenIntoView } from "@/components/FlyWhenIntoView";
import { DiscordIcon } from "@/components/icons/Discord";
import { FarcasterIcon } from "@/components/icons/Farcaster";
import { TelegramIcon } from "@/components/icons/Telegram";
import { TwitterIcon } from "@/components/icons/Twitter";
import { EXTERNAL_LINKS, HrefProp, Link } from "@/routing";

export const LetsGetSocial = () => {
  const t = useTranslations("Community");

  return (
    <FlyWhenIntoView className="flex flex-col items-center gap-10 py-16 px-4">
      <div className="flex flex-col items-center gap-6">
        <BigScalableTitle
          title={t("letsGetSocial.title")}
          subtitle={
            <span className="ink:text-body-1 ink:text-text-muted text-center max-w-lg">
              {t("letsGetSocial.description")}
            </span>
          }
          ratio={2}
        />
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
        <SocialCard
          title={t("twitter.title")}
          description={t("twitter.description")}
          href={EXTERNAL_LINKS.twitter}
          icon={<SocialIcon name="twitter" />}
        />
        <SocialCard
          title={t("discord.title")}
          description={t("discord.description")}
          href={EXTERNAL_LINKS.discord}
          icon={<SocialIcon name="discord" />}
        />
        <SocialCard
          title={t("telegram.title")}
          description={t("telegram.description")}
          href={EXTERNAL_LINKS.telegram}
          icon={<SocialIcon name="telegram" />}
        />
        <SocialCard
          title={t("farcaster.title")}
          description={t("farcaster.description")}
          href={EXTERNAL_LINKS.farcaster}
          icon={<SocialIcon name="farcaster" />}
        />
      </div>
    </FlyWhenIntoView>
  );
};

const SocialIcon = ({
  name,
}: {
  name: "farcaster" | "twitter" | "discord" | "telegram";
}) => {
  const Component = {
    twitter: TwitterIcon,
    discord: DiscordIcon,
    telegram: TelegramIcon,
    farcaster: FarcasterIcon,
  }[name];
  return (
    <Component
      className="text-darkPurple dark:text-lightPurple p-1"
      size="icon-full"
      enforce="inherit"
    />
  );
};

interface SocialCardProps {
  title: string;
  description: string;
  href: HrefProp;
  icon: React.ReactNode;
}

const SocialCard = ({ href, title, description, icon }: SocialCardProps) => {
  return (
    <Link
      href={href}
      className="flex flex-col justify-start gap-6 px-4 pt-6 pb-8 bg-featuredCardPurple relative rounded-spotlight-mobile"
    >
      <div className="size-12 flex items-center justify-center">{icon}</div>
      <div className="flex flex-col gap-4">
        <div className="ink:text-body-1 font-bold ink:text-text-default whitespace-nowrap">
          {title}
        </div>
        <div className="ink:text-body-3-regular ink:text-text-muted">
          {description}
        </div>
      </div>
      <div className="absolute top-4 right-4 p-2">
        <InkIcon.Arrow className="size-5 rotate-225" />
      </div>
    </Link>
  );
};
