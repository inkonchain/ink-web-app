import { useTranslations } from "next-intl";

import { newLayoutContainerClasses } from "@/components/styles/container";

import { PageHeader } from "../_components/PageHeader";

import { DefiExpectations } from "./_components/DefiExpectations";
import { InkTheFuture } from "./_components/InkTheFuture";
import { PartnerCards } from "./_components/PartnerCards";

export default function AboutPage() {
  const t = useTranslations("About");
  return (
    <div className={newLayoutContainerClasses()}>
      <PageHeader title={t("title")} description={t("description")} />
      <InkTheFuture />
      <DefiExpectations />
      <PartnerCards />
    </div>
  );
}
