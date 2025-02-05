import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";

import { VerifyContent } from "./_components/VerifyContent";
import { VerifyHaveASuggestion } from "./_components/VerifyHaveASuggestion";

export default function VerifyPage() {
  return (
    <OnlyWithFeatureFlag flag="verifyPage">
      <div className="flex flex-col gap-12">
        <div>
          <VerifyContent />
        </div>
        <VerifyHaveASuggestion />
      </div>
    </OnlyWithFeatureFlag>
  );
}
