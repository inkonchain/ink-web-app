import { useTranslations } from "next-intl";

import { BigScalableTitle } from "@/components/BigScallableTitle";
import { containerClasses } from "@/components/styles/container";
import { classNames } from "@/util/classes";

import { CommunityBrandKit } from "./_components/CommunityBrandKit";
import { CommunityEvents } from "./_components/CommunityEvents";
import { LetsGetSocial } from "./_components/LetsGetSocial";

export default function CommunityPage() {
  const t = useTranslations("Community");
  return (
    <>
      <div className="flex flex-col gap-12 lg:gap-28 mt-0">
        <div
          className={classNames(
            containerClasses(),
            " mb-8 pb-8 sm:min-h-[calc(85vh)] gap-16"
          )}
        >
          <BigScalableTitle
            title={t("title")}
            subtitle={
              <span className="ink:text-body-1 ink:text-text-muted max-w-lg">
                {t("description")}
              </span>
            }
            ratio={4}
            align="left"
          />

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
