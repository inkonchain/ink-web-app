"use client";
import { useTranslations } from "next-intl";

import {
  SpecificEventCard,
  SpecificEventCardProps,
} from "@/app/[locale]/_components/EventContent/EventContent";
import { EXTERNAL_LINKS } from "@/routing";

export const HomeEvent = () => {
  const t = useTranslations("events");

  const ethDenverEventProps: SpecificEventCardProps = {
    title: t("ethdenver.cardTitle"),
    description: t("ethdenver.description"),
    cta: t("ethdenver.cta"),
    link: EXTERNAL_LINKS.inkdenver,
    date: t("ethdenver.date"),
    location: t("ethdenver.location"),
    image: "/ethdenver.webp",
    imageAlt: "ETHDenver",
    layout: "horizontal",
  };
  return <SpecificEventCard {...ethDenverEventProps} color="purple" />;
};
