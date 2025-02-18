import { useTranslations } from "next-intl";

import { newLayoutContainerClasses } from "@/components/styles/container";

import { PageHeader } from "../_components/PageHeader";

import { AboutContent } from "./_components/AboutContent";

export default function AboutPage() {
  const t = useTranslations("About");
  return (
    <div className={newLayoutContainerClasses()}>
      <PageHeader title={t("title")} description={t("description")} />
      <AboutContent />
    </div>
  );
}
