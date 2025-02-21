import { Card, CardContent, Tag } from "@inkonchain/ink-kit";

import { ButtonLink } from "@/components/Button/ButtonLink";
import { CalendarIcon } from "@/components/icons/Calendar";
import { LocationIcon } from "@/components/icons/Location";
import { MailIcon } from "@/components/icons/Mail";
import { ParallaxedHoverImage } from "@/components/ParallaxedHoverImage";
import { HrefProp } from "@/routing";
import { classNames } from "@/util/classes";

export interface EventCardProps {
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

export const EventCard = ({
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
}: EventCardProps) => {
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
