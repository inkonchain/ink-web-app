import { useTranslations } from "next-intl";

import { newLayoutContainerClasses } from "@/components/styles/container";

import { PageHeader } from "../_components/PageHeader";

import { DeveloperContent } from "./_components/DeveloperContent";

export default function BuildersPage() {
  const t = useTranslations("Builders");
  return (
    <div className={newLayoutContainerClasses()}>
      <PageHeader title={t("title")} description={t("description")} />
      <DeveloperContent />
    </div>
  );
}
