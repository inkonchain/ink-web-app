import { PropsWithChildren } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/Button/ButtonLink";
import { ColoredText } from "@/components/ColoredText";
import { FlyWhenIntoView } from "@/components/FlyWhenIntoView";
import { CalendarIcon } from "@/components/icons/Calendar";
import { DotsInCircleIcon } from "@/components/icons/DotsInCircle";
import { LocationIcon } from "@/components/icons/Location";
import { MailIcon } from "@/components/icons/Mail";
import { ParallaxedHoverImage } from "@/components/ParallaxedHoverImage";
import { EXTERNAL_LINKS, HrefProp } from "@/routing";
import { classNames } from "@/util/classes";

import { GlossyPill } from "./GlossyPill";

export const EventContent = () => {
  const t = useTranslations("events.ethdenver");
  return (
    <div
      className={
        "px-6 flex flex-col md:flex-row gap-10 md:gap-6 mb-16 mt-16 sm:mt-0"
      }
    >
      <div className="flex-1 flex items-center justify-center">
        <Image src="/moose.webp" width={671} height={468} alt={"Moose"} />
      </div>
      <div className="flex-1 flex flex-col md:items-start items-center gap-8">
        <div className="flex gap-4 items-center flex-wrap justify-center sm:justify-start">
          <EventPill>Event</EventPill>
          <div className="flex gap-4 items-center">
            <EventPill icon={<CalendarIcon size="icon-md" />}>
              {t("date")}
            </EventPill>
            <EventPill icon={<LocationIcon size="icon-md" />}>
              {t("location")}
            </EventPill>
          </div>
        </div>
        <div className="space-y-5 max-w-[450px]">
          <ColoredText
            className="text-5xl lg:text-7xl text-center md:text-left font-medium"
            variant="purple"
          >
            <h2>{t("title")}</h2>
          </ColoredText>
          <p className="text-center md:text-left text-lg">{t("description")}</p>
        </div>
        <div className="flex justify-start">
          <ButtonLink
            href={EXTERNAL_LINKS.inkdenver}
            aria-label="Apply for House of Ink"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant={"primary"}
            compact
            icon={
              <MailIcon className="shrink-0" size="icon-lg" enforce="inherit" />
            }
          >
            {t("cta")}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export interface EventPillProps {
  icon?: React.ReactNode;
}

export const EventPill: React.FC<EventPillProps & PropsWithChildren> = ({
  icon = <DotsInCircleIcon size="icon-md" enforce="inherit" />,
  children,
}) => {
  return (
    <div className="text-default text-xs flex items-center justify-center gap-2 px-4 py-2 font-bold rounded-full overflow-hidden z-10 bg-event-pill-gradient dark:bg-event-pill-gradient-dark dark:text-whiteMagic backdrop-blur-[32px] shadow">
      <span className="flex gap-2 items-center py-0.5">
        {icon}
        {children}
      </span>
    </div>
  );
};

export interface SpecificEventCardProps {
  title: string;
  description: string;
  cta: string;
  link: HrefProp;
  date: string;
  location: string;
  pillLabel: string;
  image: string;
  imageAlt: string;
  className?: string;
  layout: "horizontal" | "vertical";
  color?: "purple" | "purple-dark";
}

export const SpecificEventCard = ({
  title,
  description,
  cta,
  link,
  date,
  location,
  pillLabel,
  image,
  imageAlt,
  layout = "vertical",
  color = "purple",
  className,
}: SpecificEventCardProps) => {
  return (
    <EventCard
      className={className}
      title={
        <h2 className="text-4xl xl:text-5xl xl:leading-normal">{title}</h2>
      }
      description={
        <div className="flex flex-col items-start gap-8 text-base font-normal flex-1">
          <div>{description}</div>
          <div className="items-center w-full sm:w-fit">
            <div className="self-start">
              <ButtonLink
                href={link}
                aria-label="Apply for House of Ink"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant={color === "purple" ? "primary" : "spotlight"}
                compact
                icon={
                  <MailIcon
                    className="shrink-0"
                    size="icon-lg"
                    enforce="inherit"
                  />
                }
              >
                {cta}
              </ButtonLink>
            </div>
          </div>
        </div>
      }
      image={
        <div
          className={classNames(
            "relative",
            layout === "horizontal" ? "h-full" : "w-full"
          )}
        >
          <div className="absolute top-0 left-0 right-0 px-4 sm:px-6 md:px-9 pt-4 sm:pt-5 md:pt-7 z-10 flex justify-between items-start">
            <EventPill>{pillLabel}</EventPill>
            <div className="flex gap-2 flex-wrap flex-1 justify-end">
              <GlossyPill text={date} Icon={CalendarIcon} />
              <GlossyPill text={location} Icon={LocationIcon} />
            </div>
          </div>
          <ParallaxedHoverImage
            className={classNames(
              "object-cover scale-[1.3] aspect-video min-w-80 max-w-xl",
              layout === "horizontal" ? "h-full" : "w-full"
            )}
            src={image}
            alt={imageAlt}
            width={1456}
            height={816}
          />
        </div>
      }
      layout={layout}
      color={color}
    />
  );
};

export interface EventCardProps {
  title: React.ReactNode;
  description: React.ReactNode;
  image: React.ReactNode;
  layout?: "horizontal" | "vertical";
  color?: "purple" | "purple-dark";
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  image,
  layout = "vertical",
  color = "purple",
  className,
}) => {
  return (
    <FlyWhenIntoView
      className={classNames(
        "flex flex-wrap p-4 pb-6 lg:p-6 gap-6 rounded-spotlight-mobile lg:rounded-events justify-center",
        layout === "horizontal" ? "flex-row" : "flex-col ",
        color === "purple-dark" ? "bg-darkPurple" : "bg-lightPurple",
        className
      )}
    >
      <div className="rounded-spotlight-mobile-content lg:rounded-events-content overflow-hidden">
        {image}
      </div>
      <div className={classNames("flex flex-col flex-1 gap-4 xl:gap-9 p-6")}>
        <ColoredText
          className="text-4xl lg:text-7xl font-medium"
          dampen="md"
          variant={color === "purple" ? "purple-dark" : "purple"}
        >
          {title}
        </ColoredText>
        <div
          className={classNames(
            "flex-1 flex flex-col justify-between gap-6 text-blackMagic",
            color === "purple-dark" ? "dark:text-whiteMagic" : "text-blackMagic"
          )}
        >
          {description}
        </div>
      </div>
    </FlyWhenIntoView>
  );
};
