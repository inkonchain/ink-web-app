import { useTranslations } from "next-intl";

import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";
import { newLayoutContainerClasses } from "@/components/styles/container";

import { ConnectWalletButton } from "../../_components/ConnectWalletButton";
import { PageHeader } from "../_components/PageHeader";

import { Verifications } from "./_components/Verifications";
import { VerifyContent } from "./_components/VerifyContent";
import { VerifyHaveASuggestion } from "./_components/VerifyHaveASuggestion";

export default function VerifyPage() {
  const t = useTranslations("Verify");
  return (
    <OnlyWithFeatureFlag flag="verifyPage">
      <div className={newLayoutContainerClasses()}>
        <PageHeader
          title={t("title")}
          description={t("description")}
          cta={
            <div className="relative w-full">
              <ConnectWalletButton connectLabel={t("cta")} />
            </div>
          }
        />
        <VerifyContent />
        <Verifications />
        <VerifyHaveASuggestion />
      </div>
    </OnlyWithFeatureFlag>
  );
}
