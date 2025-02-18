"use client";
import { useTranslations } from "next-intl";

import { EXTERNAL_LINKS } from "@/routing";

import { EventCard, EventCardProps } from "../../../../components/EventCard";

export const HomeEvent = () => {
  const t = useTranslations("events");

  const ethDenverEventProps: EventCardProps = {
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
  return <EventCard {...ethDenverEventProps} color="purple" />;
};
