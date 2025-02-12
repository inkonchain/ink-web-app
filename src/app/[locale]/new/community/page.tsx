import { useTranslations } from "next-intl";

import { newLayoutContainerClasses } from "@/components/styles/container";

import { PageHeader } from "../_components/PageHeader";

import { CommunityBrandKit } from "./_components/CommunityBrandKit";
import { CommunityEvents } from "./_components/CommunityEvents";
import { LetsGetSocial } from "./_components/LetsGetSocial";

export default function CommunityPage() {
  const t = useTranslations("Community");
  return (
    <>
      <div className={newLayoutContainerClasses()}>
        <PageHeader title={t("title")} description={t("description")} />

        <CommunityEvents />
        <LetsGetSocial />
        <CommunityBrandKit />
      </div>
    </>
  );
}
