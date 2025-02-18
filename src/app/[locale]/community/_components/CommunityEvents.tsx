"use client";

import { useTranslations } from "next-intl";

import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { EXTERNAL_LINKS } from "@/routing";
import { classNames } from "@/util/classes";

import { EventCard, EventCardProps } from "../../../../components/EventCard";

export const CommunityEvents = () => {
  const featureFlag = useFeatureFlag("fakeEvents");

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
    layout: "vertical",
  };

  // Just to easily test multiple events.
  const extraEventsFromFeatureFlag = Array.from({
    length: typeof featureFlag === "number" ? featureFlag : 0,
  }).map((_) => ethDenverEventProps);

  const events = [ethDenverEventProps, ...extraEventsFromFeatureFlag];

  return (
    <div
      className={classNames("grid gap-6", {
        "grid-cols-1": events.length === 1,
        "md:grid-cols-2": events.length >= 2,
        "md:[grid-template-areas:'left_first''left_second']":
          events.length === 3,
      })}
    >
      {events.map((event, index) => (
        <EventCard
          key={index}
          {...event}
          className={classNames({
            "md:[grid-area:left]": events.length >= 3 && index === 0,
          })}
          /** TODO:
           * Once "SpecificEventCard" is updated to accept a "compact" layout,
           *   change this to `events.length >= 3 && index >= 1 ? "compact" : events.length === 1 ? "horizontal" : "vertical"`
           *   to get the layout closer to the mockups */
          layout={events.length === 1 ? "horizontal" : "vertical"}
          color={index === 0 ? "purple" : "purple-dark"}
        />
      ))}
    </div>
  );
};
