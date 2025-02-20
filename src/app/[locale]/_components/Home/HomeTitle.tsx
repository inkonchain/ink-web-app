"use client";
import { Button, InkIcon } from "@inkonchain/ink-kit";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { ColoredText } from "@/components/ColoredText";
import { RotatingText } from "@/components/RotatingText";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";

import { PageHeader } from "../PageHeader";

export const HomeTitle = () => {
  const t = useTranslations("Home");
  const query = useRouterQuery();
  return (
    <>
      <PageHeader
        pre={
          <div className="flex items-center justify-center ink:gap-1">
            <Image
              alt="a lighting bolt in a circle"
              src="/icons/1s-block-times.svg"
              width={20}
              height={20}
            />
            <div>{t("pre")}</div>
          </div>
        }
        title="Ink the future"
        description={<TagLineWithHighlight text={t("tagLine")} />}
        cta={
          <Button
            variant="primary"
            size="lg"
            iconRight={<InkIcon.Arrow className="rotate-270" />}
          >
            <Link href={{ pathname: "/apps", query }}>
              {t("cta:exploreApps")}
            </Link>
          </Button>
        }
        size="home"
      />
    </>
  );
};

const TagLineWithHighlight: React.FC<{
  text?: string;
  disableRotating?: boolean;
}> = ({ text }) => {
  const [first, second] = text?.split("|") || [];
  const sections = second?.split(",") || [];
  return (
    <div className="flex items-baseline ink:text-h3 flex-wrap justify-start ink:text-button-primary">
      {/** Height should match the height of the PillContainer+Rotating text for the text to be aligned. */}
      <ColoredText
        className="whitespace-normal flex justify-center mr-2"
        variant="ink"
        noAnimation
      >
        {first}
      </ColoredText>
      <RotatingText
        sections={sections.map((s, i) => {
          return i === sections.length - 1 ? (
            <ColoredText variant="reverse-purple">{s}</ColoredText>
          ) : (
            s
          );
        })}
      />
    </div>
  );
};
