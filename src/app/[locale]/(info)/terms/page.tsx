import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";

import TermsAfterMainnet from "./terms-after-mainnet";
import TermsBeforeMainnet from "./terms-before-mainnet";

export default function Terms() {
  return (
    <>
      <OnlyWithFeatureFlag flag="mainnet" otherwise={<TermsBeforeMainnet />}>
        <TermsAfterMainnet />
      </OnlyWithFeatureFlag>
    </>
  );
}
