import { useTranslations } from "next-intl";

import { BigScalableTitle } from "@/components/BigScallableTitle";
import { containerClasses } from "@/components/styles/container";
import { classNames } from "@/util/classes";

import { AboutContent } from "./_components/AboutContent";

export default function AboutPage() {
  const t = useTranslations("About");
  return (
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
            <span className="ink:text-body-1 ink:text-text-muted max-w-screen-md">
              {t("description")}
            </span>
          }
          ratio={4}
          align="left"
        />

        <AboutContent />
      </div>
    </div>
  );
}
