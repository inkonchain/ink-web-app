import { Button, Card, CardContent, InkIcon, Tag } from "@inkonchain/ink-kit";

import { ParallaxedHoverImage } from "@/components/ParallaxedHoverImage";
import { HrefProp, Link } from "@/routing";
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
                <div className="ink:size-3">
                  <InkIcon.Calendar />
                </div>
                {date}
              </Tag>
              <Tag variant="event">
                <div className="ink:size-3">
                  <InkIcon.Location />
                </div>
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
          <Button
            variant="primary"
            size="lg"
            iconLeft={<InkIcon.Mail size="icon-lg" />}
            asChild
          >
            <Link href={link} target="_blank" rel="noopener noreferrer">
              {cta}
            </Link>
          </Button>
        }
      />
    </Card>
  );
};
