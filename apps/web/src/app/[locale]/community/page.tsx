import { useTranslations } from "next-intl";

import { BigScalableTitle } from "@/components/BigScallableTitle";
import { PageView } from "@/components/PageView";
import { containerClasses } from "@/components/styles/container";
import { classNames } from "@/util/classes";

import { HomeShortcuts } from "../(home)/HomeShortcuts";

import { CommunityBrandKit } from "./_components/CommunityBrandKit";
import { CommunityEvents } from "./_components/CommunityEvents";
import { LetsGetSocial } from "./_components/LetsGetSocial";

export default function CommunityPage() {
  const t = useTranslations("Community");
  return (
    <>
      <PageView />
      <HomeShortcuts />
      <div className="flex flex-col gap-12 lg:gap-28 mt-0 mb-12 lg:mb-24 pt-16">
        <div
          className={classNames(
            containerClasses(),
            " mb-8 pb-8 sm:min-h-[calc(85vh)] gap-16"
          )}
        >
          <div className="flex flex-col items-center">
            <BigScalableTitle
              title={t("title")}
              subtitle={
                <span className="ink:text-body-1 ink:text-text-muted text-center max-w-lg">
                  {t("description")}
                </span>
              }
              ratio={4}
            />
          </div>

          <div className="px-4">
            <CommunityEvents />
          </div>

          <LetsGetSocial />
          <CommunityBrandKit />
        </div>
      </div>
    </>
  );
}
