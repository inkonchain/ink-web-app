import Image from "next/image";
import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/Button/ButtonLink";
import { ColoredText } from "@/components/ColoredText";
import { Header } from "@/components/Header";

import { FloatingButtons } from "./_components/MainContent";
import { HomeShortcuts } from "./(home)/HomeShortcuts";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  const t = useTranslations("404");

  return (
    <div className="relative overflow-hidden">
      <HomeShortcuts />
      <Header />
      <Image
        src="/404-blob.webp"
        alt={t("alt")}
        width={1500}
        height={1500}
        className="absolute right-0 bottom-0 w-[400px] md:w-[500px] lg:w-[700px] xl:w-[900px] translate-x-[10%] translate-y-[20%] lg:translate-y-0"
      />
      <div className="flex flex-col h-screen mx-8 sm:mx-24 md:mx-32">
        <div className="flex items-center flex-1">
          <div className="flex flex-col gap-8 md:gap-9 items-center sm:items-start w-full sm:w-[500px]">
            <ColoredText
              className="text-6xl md:text-7xl font-medium text-center sm:text-start"
              variant="purple"
            >
              <h2>{t("title")}</h2>
            </ColoredText>
            <div>
              <ButtonLink href="/" variant="primary" size={"lg"}>
                {t("cta")}
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="relative mb-12 dark">
          <FloatingButtons showCountdown={false} />
        </div>
      </div>
    </div>
  );
}
