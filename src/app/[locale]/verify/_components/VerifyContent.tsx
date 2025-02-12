"use client";

import { Card, CardContent } from "@inkonchain/ink-kit";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";

export function VerifyContent() {
  const t = useTranslations("Verify");
  const { address: connectedAddress, isConnected } = useAccount();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card variant="secondary" className="flex-1">
        <CardContent.Tiny
          title={t("whatIsVerify.title")}
          description={t("whatIsVerify.description")}
          icon={
            <Image
              src="/verify/info-checkmark.png"
              alt="A coin with a checkmark inside"
              width={100}
              height={100}
            />
          }
        />
      </Card>
      <Card variant="secondary" className="flex-1">
        <CardContent.Tiny
          title={t("whyVerify.title")}
          description={t("whyVerify.description")}
          icon={
            <Image
              src="/verify/info-lock.png"
              alt="A hexagonal coin with a lock inside"
              width={100}
              height={100}
            />
          }
        />
      </Card>
      <Card variant="secondary" className="flex-1">
        <CardContent.Tiny
          title={t("yourPrivacy.title")}
          description={t("yourPrivacy.description")}
          icon={
            <Image
              src="/verify/info-checkmark.png"
              alt="A coin with a checkmark inside"
              width={100}
              height={100}
            />
          }
        />
      </Card>
    </div>
  );
}
