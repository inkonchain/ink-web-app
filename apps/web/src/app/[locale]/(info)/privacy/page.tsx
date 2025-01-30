import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";

import PrivacyAfterMainnet from "./privacy-after-mainnet";
import PrivacyBeforeMainnet from "./privacy-before-mainnet";

export default function Privacy() {
  return (
    <>
      <OnlyWithFeatureFlag flag="mainnet" otherwise={<PrivacyBeforeMainnet />}>
        <PrivacyAfterMainnet />
      </OnlyWithFeatureFlag>
    </>
  );
}
