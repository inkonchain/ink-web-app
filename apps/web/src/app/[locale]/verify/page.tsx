import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";
import { PageView } from "@/components/PageView";
import { containerClasses } from "@/components/styles/container";

import { HomeShortcuts } from "../(home)/HomeShortcuts";

import { VerifyContent } from "./_components/VerifyContent";
import { VerifyHaveASuggestion } from "./_components/VerifyHaveASuggestion";

export default function VerifyPage() {
  return (
    <OnlyWithFeatureFlag flag="verifyPage">
      <PageView />
      <HomeShortcuts />
      <div className="flex flex-col gap-12 mt-0 mb-12 lg:mb-24 pt-16 sm:pt-0">
        <div className={containerClasses() + " mb-8 pb-8"}>
          <VerifyContent />
        </div>
        <VerifyHaveASuggestion />
      </div>
    </OnlyWithFeatureFlag>
  );
}
