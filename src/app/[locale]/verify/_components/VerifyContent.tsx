"use client";

import { Card, CardContent } from "@inkonchain/ink-kit";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";

import { ConnectWalletButton } from "@/app/[locale]/_components/ConnectWalletButton";
import { ColoredText } from "@/components/ColoredText";

import { Verifications } from "./Verifications";

export function VerifyContent() {
  const t = useTranslations("Verify");
  const { address: connectedAddress, isConnected } = useAccount();

  return (
    <div className="flex flex-col gap-8 flex-1 px-4">
      <div className="flex flex-col sm:gap-10 gap-6 flex-1">
        <div className="flex flex-col items-start gap-4 max-w-2xl">
          <ColoredText
            className="text-4xl sm:text-6xl font-medium"
            variant="purple"
            dampen="md"
          >
            <h2>{t("title")}</h2>
          </ColoredText>
          <div className="text-blackMagic/50 dark:text-whiteMagic/50 text-md max-w-screen-lg">
            {t("description")}
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 sm:gap-6 w-full">
          <div className="relative w-full">
            <ConnectWalletButton connectLabel={t("cta")} />
          </div>
        </div>
      </div>

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

      <Verifications />
    </div>
  );
}
