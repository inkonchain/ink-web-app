import { PropsWithChildren } from "react";
import { Card, CardContent, Tag } from "@inkonchain/ink-kit";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/Button/ButtonLink";
import { ColoredText } from "@/components/ColoredText";
import { CalendarIcon } from "@/components/icons/Calendar";
import { DotsInCircleIcon } from "@/components/icons/DotsInCircle";
import { LocationIcon } from "@/components/icons/Location";
import { MailIcon } from "@/components/icons/Mail";
import { ParallaxedHoverImage } from "@/components/ParallaxedHoverImage";
import { EXTERNAL_LINKS, HrefProp } from "@/routing";
import { classNames } from "@/util/classes";

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
  image,
  imageAlt,
  layout = "vertical",
  color = "purple",
  className,
}: SpecificEventCardProps) => {
  return (
    <Card
      className={className}
      image={
        <CardContent.Image
          mainLabels={
            <>
              <Tag variant="event">
                <CalendarIcon size="icon-md" enforce="inherit" />
                {date}
              </Tag>
              <Tag variant="event">
                <LocationIcon size="icon-md" enforce="inherit" />
                {location}
              </Tag>
            </>
          }
        >
          <ParallaxedHoverImage
            className={classNames(
              "max-w-xl sm:max-w-full",
              layout === "horizontal" ? "h-full" : "w-full"
            )}
            src={image}
            alt={imageAlt}
            width={1456}
            height={816}
          />
        </CardContent.Image>
      }
      imageLocation={layout === "horizontal" ? "left" : "top"}
      variant={color === "purple" ? "light-purple" : "secondary"}
    >
      <CardContent.CallToAction
        title={title}
        description={description}
        button={
          <div>
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
        }
      />
    </Card>
  );
};
