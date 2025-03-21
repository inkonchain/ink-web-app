import { useTranslations } from "next-intl";

import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";
import { newLayoutContainerClasses } from "@/components/styles/container";

import { PageHeader } from "../_components/PageHeader";

import { VerifyCta } from "./_components/VerifyCta";

export default function VerifyPage() {
  const t = useTranslations("Verify");
  return (
    <OnlyWithFeatureFlag flag="verifyPage">
      <div className={newLayoutContainerClasses()}>
        <PageHeader
          title={t("title")}
          description={t("description")}
          cta={<VerifyCta />}
        />
        {/* <VerifyContent /> */}
        {/* <Verifications /> */}
        {/* <VerifyHaveASuggestion /> */}
      </div>
    </OnlyWithFeatureFlag>
  );
}
